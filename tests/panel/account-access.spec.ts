import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { E2E_API_URL } from '../helpers/publicBoardApi'

const MOBILE = { width: 390, height: 844 }
// Made up for the test: only checked to be shown, never stored.
const TEMPORARY_PASSWORD = 'senha-de-teste'

type Status = 'active' | 'deactivated' | 'temporaryCredentialExpired'

const account = (id: string, name: string, status: Status = 'active') => ({
  id,
  name,
  email: `${id}@faladoria.org`,
  role: id === 'usr_carla' ? 'admin' : 'assistant',
  assignedCities: id === 'usr_carla' ? [] : [{ city: 'Varginha', state: 'MG' }],
  status,
  assignedComplaintCount: 3,
})

const STATUS_AFTER = { deactivate: 'deactivated', reactivate: 'active' }

/** The session, the team list, and the reset, deactivate and reactivate routes, each answering
 * as the API would. Returns the actions asked, as "action id". */
const mockApis = async (page: Page, anaStatus: Status = 'active') => {
  const users = [
    account('usr_ana', 'Ana Souza', anaStatus),
    account('usr_carla', 'Carla Dias'),
  ]
  const actions: string[] = []
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: {
        session: { expiresAt: '2026-11-30T12:00:00Z' },
        user: {
          id: 'usr_carla',
          name: 'Carla Dias',
          email: 'carla@faladoria.org',
          role: 'admin',
          assignedCities: [],
          mustChangePassword: false,
          credentialExpiresAt: null,
        },
      },
    })
  )
  await page.route(`${E2E_API_URL}/api/users`, route =>
    route.fulfill({ json: users })
  )
  await page.route(`${E2E_API_URL}/api/users/*/reset-password`, route => {
    actions.push('reset-password usr_ana')
    return route.fulfill({ json: { temporaryPassword: TEMPORARY_PASSWORD } })
  })
  for (const action of ['deactivate', 'reactivate'] as const) {
    await page.route(`${E2E_API_URL}/api/users/*/${action}`, route => {
      const user = users.find(({ id }) => route.request().url().includes(id))!
      actions.push(`${action} ${user.id}`)
      user.status = STATUS_AFTER[action] as Status
      return route.fulfill({ json: user })
    })
  }
  await page.route(`${E2E_API_URL}/api/service-areas**`, route =>
    route.fulfill({ json: { serviceAreas: [] } })
  )
  return actions
}

const openAccount = async (
  page: Page,
  userId = 'usr_ana',
  anaStatus?: Status
) => {
  const actions = await mockApis(page, anaStatus)
  await page.goto(`/dashboard/equipe/${userId}`, {
    waitUntil: 'domcontentloaded',
  })
  await page
    .getByRole('heading', { name: 'Acesso ao painel' })
    .waitFor({ timeout: 15000 })
  return actions
}

const expectNoViolations = async (page: Page) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  expect(results.violations).toEqual([])
}

test.describe('Account password and access', () => {
  test.describe('Rendering & Structure', () => {
    test('should show data, password and access, in that order', async ({
      page,
    }) => {
      await openAccount(page)

      await expect(page.getByRole('heading', { level: 2 })).toHaveText([
        'Dados da conta',
        'Senha',
        'Acesso ao painel',
      ])
    })

    test('should point one’s own account to the change-password page', async ({
      page,
    }) => {
      await openAccount(page, 'usr_carla')

      await expect(
        page.getByRole('link', { name: 'Trocar a minha senha' })
      ).toHaveAttribute('href', '/dashboard/trocar-senha')
      await expect(
        page.getByRole('button', { name: /Gerar nova senha|Desativar conta/ })
      ).toHaveCount(0)
    })
  })

  test.describe('Accessibility', () => {
    test('should have no axe violations on a deactivated account', async ({
      page,
    }) => {
      await openAccount(page, 'usr_ana', 'deactivated')
      await expect(page.getByText('Desativada', { exact: true })).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations with the deactivate confirmation open', async ({
      page,
    }) => {
      await openAccount(page)
      await page.getByRole('button', { name: 'Desativar conta' }).click()
      await expect(page.getByRole('dialog')).toBeVisible()

      await expectNoViolations(page)
    })

    test('should reset a password with the keyboard only, starting on "Cancelar"', async ({
      page,
    }) => {
      const actions = await openAccount(page)
      await page.getByRole('button', { name: 'Gerar nova senha' }).focus()

      await page.keyboard.press('Enter')
      const confirm = page.getByRole('dialog', {
        name: 'Gerar nova senha para Ana Souza?',
      })
      await expect(
        confirm.getByRole('button', { name: 'Cancelar' })
      ).toBeFocused()
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')

      const shown = page.getByRole('dialog', { name: 'Nova senha gerada' })
      await expect(shown).toContainText(TEMPORARY_PASSWORD)
      await expect(
        page.getByRole('button', { name: 'Copiar senha' })
      ).toBeFocused()
      expect(actions).toEqual(['reset-password usr_ana'])

      await page.getByRole('button', { name: 'Já anotei a senha' }).click()
      await expect(page.getByText(TEMPORARY_PASSWORD)).toHaveCount(0)
      await expect(
        page.getByRole('button', { name: 'Gerar nova senha' })
      ).toBeFocused()
    })

    test('should keep focus on the button that replaces the one pressed', async ({
      page,
    }) => {
      const actions = await openAccount(page)

      await page.getByRole('button', { name: 'Desativar conta' }).click()
      await page
        .getByRole('dialog')
        .getByRole('button', { name: 'Desativar conta' })
        .click()

      await expect(
        page.getByRole('button', { name: 'Reativar conta' })
      ).toBeFocused()
      await expect(
        page.getByRole('status').filter({ hasText: 'desativada' })
      ).toHaveText('A conta de Ana Souza foi desativada.')

      await page.getByRole('button', { name: 'Reativar conta' }).click()
      await expect(
        page.getByRole('button', { name: 'Desativar conta' })
      ).toBeFocused()
      expect(actions).toEqual(['deactivate usr_ana', 'reactivate usr_ana'])
    })
  })

  test.describe('Business rules', () => {
    test('should not offer a new password to a deactivated account', async ({
      page,
    }) => {
      await openAccount(page, 'usr_ana', 'deactivated')

      await expect(
        page.getByText('Reative a conta para gerar uma nova senha.')
      ).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'Gerar nova senha' })
      ).toHaveCount(0)
    })

    test('should say an expired temporary password needs a new one', async ({
      page,
    }) => {
      await openAccount(page, 'usr_ana', 'temporaryCredentialExpired')

      await expect(
        page.getByText(/A senha temporária venceu antes do primeiro acesso/)
      ).toBeVisible()
    })

    test('should mark the account deactivated in the team list', async ({
      page,
    }) => {
      await openAccount(page)
      await page.getByRole('button', { name: 'Desativar conta' }).click()
      await page
        .getByRole('dialog')
        .getByRole('button', { name: 'Desativar conta' })
        .click()
      await expect(page.getByText('foi desativada')).toBeVisible()

      await page
        .getByRole('navigation', { name: 'Trilha de navegação' })
        .getByRole('link', { name: 'Equipe' })
        .click()

      await expect(
        page.getByRole('listitem').filter({ hasText: 'Ana Souza' })
      ).toContainText('Desativada')
    })
  })

  test.describe('Responsive Layout', () => {
    test('should fit the confirmation on the phone, actions stacked', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openAccount(page)
      await page.getByRole('button', { name: 'Desativar conta' }).click()

      const dialog = page.getByRole('dialog')
      const box = (await dialog.boundingBox())!
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(MOBILE.width)
      const confirm = (await dialog
        .getByRole('button', { name: 'Desativar conta' })
        .boundingBox())!
      const cancel = (await dialog
        .getByRole('button', { name: 'Cancelar' })
        .boundingBox())!
      expect(confirm.y).toBeLessThan(cancel.y)
      expect(confirm.height).toBeGreaterThanOrEqual(48)
    })
  })
})
