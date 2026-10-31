import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { E2E_API_URL } from '../helpers/publicBoardApi'

const MOBILE = { width: 390, height: 844 }
const DESKTOP = { width: 1440, height: 900 }

type Role = 'admin' | 'assistant' | 'manager'

const account = (id: string, name: string, role: Role, cities: string[]) => ({
  id,
  name,
  email: `${id}@faladoria.org`,
  role,
  assignedCities: cities.map(city => ({ city, state: 'MG' })),
  status: 'active',
  assignedComplaintCount: 3,
})

const area = (city: string) => ({
  id: `sa_${city}`,
  city,
  state: 'MG',
  addedAt: '2026-10-01T13:00:00.000Z',
  removedAt: null,
})

/** The session, the team list, the account change (it answers the saved account) and the
 * served cities. Lavras is no longer served, though Ana still has it. */
const mockApis = async (
  page: Page,
  { role = 'admin', outOfReach = 0 }: { role?: Role; outOfReach?: number } = {}
) => {
  const users = [
    account('usr_ana', 'Ana Souza', 'assistant', ['Varginha', 'Lavras']),
    account('usr_carla', 'Carla Dias', 'admin', []),
  ]
  const sent: unknown[] = []
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: {
        session: { expiresAt: '2026-11-30T12:00:00Z' },
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
  await page.route(`${E2E_API_URL}/api/users`, route =>
    route.fulfill({ json: users })
  )
  await page.route(`${E2E_API_URL}/api/users/*/update`, route => {
    const changes = route.request().postDataJSON() as object
    sent.push(changes)
    const user = users.find(({ id }) => route.request().url().includes(id))!
    Object.assign(user, changes)
    return route.fulfill({
      json: { ...user, complaintsOutOfReach: outOfReach },
    })
  })
  await page.route(`${E2E_API_URL}/api/service-areas**`, route =>
    route.fulfill({
      json: { serviceAreas: [area('Alfenas'), area('Varginha')] },
    })
  )
  return sent
}

const openAccount = async (
  page: Page,
  userId = 'usr_ana',
  options?: Parameters<typeof mockApis>[1]
) => {
  const sent = await mockApis(page, options)
  await page.goto(`/dashboard/equipe/${userId}`, {
    waitUntil: 'domcontentloaded',
  })
  await page.locator('h1').waitFor({ timeout: 15000 })
  return sent
}

const save = (page: Page) =>
  page.getByRole('button', { name: 'Salvar alterações' }).click()

test.describe('Account page', () => {
  test.describe('Rendering & Structure', () => {
    test('should open from the Edit link of the team list', async ({
      page,
    }) => {
      await mockApis(page)
      await page.goto('/dashboard/equipe', { waitUntil: 'domcontentloaded' })

      await page
        .getByRole('link', { name: 'Editar a conta de Ana Souza' })
        .click()

      await expect(page).toHaveURL(/\/dashboard\/equipe\/usr_ana$/)
      await expect(page.locator('h1')).toHaveText('Ana Souza')
    })

    test('should keep Team marked in the menu and lead back through the breadcrumb', async ({
      page,
    }) => {
      await page.setViewportSize(DESKTOP)
      await openAccount(page)

      await expect(
        page.getByRole('complementary').getByRole('link', { name: 'Equipe' })
      ).toHaveAttribute('aria-current', 'page')
      await page
        .getByRole('navigation', { name: 'Trilha de navegação' })
        .getByRole('link', { name: 'Equipe' })
        .click()
      await expect(page).toHaveURL(/\/dashboard\/equipe$/)
    })

    test('should tell another role the page is not for them', async ({
      page,
    }) => {
      await openAccount(page, 'usr_ana', { role: 'manager' })

      await expect(page.locator('h1')).toHaveText('Acesso restrito')
    })

    test('should say when the account does not exist', async ({ page }) => {
      await openAccount(page, 'usr_nobody')

      await expect(page.locator('h1')).toHaveText('Conta não encontrada')
    })
  })

  test.describe('Accessibility', () => {
    const expectNoViolations = async (page: Page) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      expect(results.violations).toEqual([])
    }

    test('should have no axe violations with a city no longer served', async ({
      page,
    }) => {
      await openAccount(page)
      await expect(page.getByText('(deixou de ser atendida)')).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations with the admin warning', async ({
      page,
    }) => {
      await openAccount(page)
      await page.getByRole('radio', { name: /Administração/ }).check()
      await expect(page.getByText(/Ao salvar, Varginha\/MG/)).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations with the out-of-reach warning', async ({
      page,
    }) => {
      await openAccount(page, 'usr_ana', { outOfReach: 2 })
      await page.getByRole('button', { name: 'Tirar Lavras/MG' }).click()
      await save(page)
      await expect(page.getByText(/2 casos em andamento/)).toBeVisible()

      await expectNoViolations(page)
    })

    test('should rename an account with the keyboard only, and announce it', async ({
      page,
    }) => {
      const sent = await openAccount(page)
      await page.getByRole('textbox', { name: 'Nome' }).focus()

      await page.keyboard.press('ControlOrMeta+a')
      await page.keyboard.type('Ana Lima')
      await page.keyboard.press('Enter')

      await expect(
        page.getByRole('status').filter({ hasText: 'foram salvas' })
      ).toHaveText('As alterações de Ana Lima foram salvas.')
      expect(sent).toEqual([{ name: 'Ana Lima' }])
    })
  })

  test.describe('Business rules', () => {
    test('should take every city from an account that becomes admin', async ({
      page,
    }) => {
      const sent = await openAccount(page)

      await page.getByRole('radio', { name: /Administração/ }).check()
      await save(page)

      await expect(page.getByText(/foram salvas/)).toBeVisible()
      expect(sent).toEqual([{ role: 'admin', assignedCities: [] }])
    })

    test('should not offer a change of one’s own role', async ({ page }) => {
      await openAccount(page, 'usr_carla')

      await expect(page.getByRole('radio')).toHaveCount(0)
      await expect(
        page.getByText('Você não pode trocar o próprio papel.')
      ).toBeVisible()
    })
  })

  test.describe('Responsive Layout', () => {
    test('should fit the phone without sideways scrolling', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openAccount(page)

      const width = await page.evaluate(
        () => document.documentElement.scrollWidth
      )
      expect(width).toBeLessThanOrEqual(MOBILE.width)
    })

    test('should give the breadcrumb link a 48px touch target on mobile', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openAccount(page)

      const link = page
        .getByRole('navigation', { name: 'Trilha de navegação' })
        .getByRole('link', { name: 'Equipe' })
      const box = (await link.boundingBox())!
      // The ::after reaches past the drawn text: a tap 10px below still follows the link.
      await page.mouse.click(box.x + box.width / 2, box.y + box.height + 10)

      await expect(page).toHaveURL(/\/dashboard\/equipe$/)
    })
  })
})
