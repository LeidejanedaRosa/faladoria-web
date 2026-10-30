import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { E2E_API_URL } from '../helpers/publicBoardApi'

const PAGE = '/dashboard/equipe'
const MOBILE = { width: 390, height: 844 }
const DESKTOP = { width: 1440, height: 900 }
// Made up for the test: only checked to be shown, never stored.
const TEMPORARY_PASSWORD = 'senha-de-teste'

type Role = 'admin' | 'assistant' | 'manager'

const account = (
  id: string,
  name: string,
  role: Role,
  cities: string[],
  status: string
) => ({
  id,
  name,
  email: `${id}@faladoria.org`,
  role,
  assignedCities: cities.map(city => ({ city, state: 'MG' })),
  status,
  assignedComplaintCount: 0,
})

const area = (city: string) => ({
  id: `sa_${city}`,
  city,
  state: 'MG',
  addedAt: '2026-10-01T13:00:00.000Z',
  removedAt: null,
})

/** The session, the users routes (a created account joins the list) and the served cities. */
const mockApis = async (
  page: Page,
  { role = 'admin' }: { role?: Role } = {}
) => {
  const users = [
    account('usr_ana', 'Ana Souza', 'assistant', ['Varginha'], 'active'),
    account('usr_carla', 'Carla Dias', 'admin', [], 'active'),
    account(
      'usr_dora',
      'Dora Matos',
      'manager',
      ['Alfenas'],
      'pendingFirstAccess'
    ),
  ]
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: {
        session: { expiresAt: '2026-11-01T12:00:00Z' },
        user: {
          id: 'usr_carla',
          name: 'Carla Dias',
          email: 'carla@faladoria.org',
          role,
          assignedCities: [],
          mustChangePassword: false,
          credentialExpiresAt: null,
        },
      },
    })
  )
  await page.route(`${E2E_API_URL}/api/users`, route => {
    if (route.request().method() !== 'POST')
      return route.fulfill({ json: users })
    const body = route.request().postDataJSON() as {
      name: string
      role: Role
      assignedCities: { city: string }[]
    }
    users.push(
      account(
        'usr_new',
        body.name,
        body.role,
        body.assignedCities.map(({ city }) => city),
        'pendingFirstAccess'
      )
    )
    return route.fulfill({
      status: 201,
      json: {
        userId: 'usr_new',
        email: 'x',
        temporaryPassword: TEMPORARY_PASSWORD,
      },
    })
  })
  await page.route(`${E2E_API_URL}/api/service-areas**`, route =>
    route.fulfill({
      json: {
        serviceAreas: [area('Alfenas'), area('Lavras'), area('Varginha')],
      },
    })
  )
}

const openPage = async (
  page: Page,
  options?: Parameters<typeof mockApis>[1]
) => {
  await mockApis(page, options)
  await page.goto(PAGE, { waitUntil: 'domcontentloaded' })
  await page.locator('h1').waitFor({ timeout: 15000 })
}

const citySearch = (page: Page) =>
  page.getByRole('combobox', { name: 'Buscar cidade atendida' })

const fillManager = async (page: Page) => {
  await page.getByRole('button', { name: 'Nova conta' }).click()
  await page.getByRole('textbox', { name: 'Nome' }).fill('Bruno Lima')
  await page
    .getByRole('textbox', { name: /^E-mail/ })
    .fill('bruno@saude.varginha.mg.gov.br')
  await page.getByRole('radio', { name: /Gestão de saúde/ }).check()
  await expect(citySearch(page)).toBeEnabled()
  await citySearch(page).fill('varg')
  await page.getByRole('option', { name: 'Varginha/MG' }).click()
}

const passwordDialog = (page: Page) =>
  page.getByRole('dialog', { name: 'Conta criada' })

test.describe('Team page', () => {
  test.describe('Rendering & Structure', () => {
    test('should list the accounts under a single h1', async ({ page }) => {
      await openPage(page)

      await expect(page.locator('h1')).toHaveText('Equipe')
      await expect(page.getByText('Ana Souza')).toBeVisible()
      await expect(page.getByText('(você)')).toBeVisible()
    })

    test('should be in the menu of the administration, marked as current', async ({
      page,
    }) => {
      await page.setViewportSize(DESKTOP)
      await openPage(page)

      await expect(
        page.getByRole('complementary').getByRole('link', { name: 'Equipe' })
      ).toHaveAttribute('aria-current', 'page')
    })

    test('should tell another role the page is not for them', async ({
      page,
    }) => {
      await mockApis(page, { role: 'manager' })
      await page.goto(PAGE, { waitUntil: 'domcontentloaded' })

      await expect(page.locator('h1')).toHaveText('Acesso restrito')
      await expect(page.getByRole('link', { name: 'Equipe' })).toHaveCount(0)
    })
  })

  test.describe('Accessibility', () => {
    const expectNoViolations = async (page: Page) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      expect(results.violations).toEqual([])
    }

    test('should have no axe violations on the list', async ({ page }) => {
      await openPage(page)
      await expect(page.getByText('Ana Souza')).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations with the errors and the city list open', async ({
      page,
    }) => {
      await openPage(page)
      await page.getByRole('button', { name: 'Nova conta' }).click()
      await page.getByRole('radio', { name: /Assistente/ }).check()
      await page.getByRole('button', { name: 'Criar conta' }).click()
      await expect(page.getByText('Escreva o nome.')).toBeVisible()
      await citySearch(page).fill('a')
      await expect(page.getByRole('listbox')).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations with the password dialog open', async ({
      page,
    }) => {
      await openPage(page)
      await fillManager(page)
      await page.getByRole('button', { name: 'Criar conta' }).click()
      await expect(passwordDialog(page)).toBeVisible()

      await expectNoViolations(page)
    })

    test('should create an account with the keyboard only', async ({
      page,
    }) => {
      await openPage(page)
      await page.getByRole('button', { name: 'Nova conta' }).focus()

      await page.keyboard.press('Enter')
      await expect(page.getByRole('textbox', { name: 'Nome' })).toBeFocused()
      await page.keyboard.type('Bruno Lima')
      await page.keyboard.press('Tab')
      await page.keyboard.type('bruno@saude.varginha.mg.gov.br')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Space')
      await expect(
        page.getByRole('radio', { name: /Assistente/ })
      ).toBeChecked()
      await page.keyboard.press('Tab')
      await expect(citySearch(page)).toBeFocused()
      await page.keyboard.type('varg')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      await expect(citySearch(page)).toHaveValue('')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')

      await expect(passwordDialog(page)).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'Copiar senha' })
      ).toBeFocused()
    })

    test('should keep the password dialog on Escape, with focus trapped inside', async ({
      page,
    }) => {
      await openPage(page)
      await fillManager(page)
      await page.getByRole('button', { name: 'Criar conta' }).click()
      await expect(passwordDialog(page)).toBeVisible()

      await page.keyboard.press('Escape')
      await expect(passwordDialog(page)).toBeVisible()
      for (let step = 0; step < 4; step++) {
        await page.keyboard.press('Tab')
        const outside = await page.evaluate(() => {
          const active = document.activeElement
          const modal = document.querySelector('dialog[open]')
          return active !== document.body && !modal?.contains(active)
        })
        expect(outside).toBe(false)
      }
    })

    test('should announce the account and give focus back once the password is noted', async ({
      page,
    }) => {
      await openPage(page)
      await fillManager(page)
      await page.getByRole('button', { name: 'Criar conta' }).click()
      await expect(
        passwordDialog(page).getByText(TEMPORARY_PASSWORD)
      ).toBeVisible()

      await page.getByRole('button', { name: 'Já anotei a senha' }).click()

      await expect(passwordDialog(page)).toBeHidden()
      await expect(page.getByText(TEMPORARY_PASSWORD)).toHaveCount(0)
      await expect(
        page.getByRole('status').filter({ hasText: 'foi criada' })
      ).toHaveText('A conta de Bruno Lima foi criada.')
      await expect(
        page.getByRole('button', { name: 'Nova conta' })
      ).toBeFocused()
      await expect(page.getByText('Bruno Lima', { exact: true })).toBeVisible()
    })
  })

  test.describe('Responsive Layout', () => {
    test('should show a column header on desktop, aligned with the rows', async ({
      page,
    }) => {
      await page.setViewportSize(DESKTOP)
      await openPage(page)

      const header = (await page
        .getByText('Casos em andamento', { exact: true })
        .first()
        .boundingBox())!
      const status = (await page
        .getByText('Ativa', { exact: true })
        .first()
        .boundingBox())!
      const role = (await page
        .getByText('Assistente', { exact: true })
        .first()
        .boundingBox())!
      expect(header.y).toBeLessThan(role.y)
      // Values sit side by side in one row.
      expect(Math.abs(status.y - role.y)).toBeLessThan(16)
    })

    test('should stack each account as a card with visible labels on mobile', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openPage(page)

      const ana = page.getByRole('listitem').filter({ hasText: 'Ana Souza' })
      const roleLabel = (await ana.getByText('Papel:').boundingBox())!
      const statusLabel = (await ana.getByText('Situação:').boundingBox())!
      expect(statusLabel.y).toBeGreaterThan(roleLabel.y)
      const width = await page.evaluate(
        () => document.documentElement.scrollWidth
      )
      expect(width).toBeLessThanOrEqual(MOBILE.width)
    })

    test('should give the tag × a 48px touch target on mobile', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openPage(page)
      await fillManager(page)

      const remove = page.getByRole('button', { name: 'Tirar Varginha/MG' })
      const box = (await remove.boundingBox())!
      // The ::after reaches past the drawn button: a tap 5px outside still removes the tag.
      await page.mouse.click(box.x - 5, box.y + box.height / 2)

      await expect(remove).toHaveCount(0)
    })
  })
})
