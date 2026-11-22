import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { mockComplaintCounts } from '../helpers/complaintCountsApi'
import { E2E_API_URL } from '../helpers/publicBoardApi'

const PAGE = '/dashboard/equipe'
const MOBILE = { width: 390, height: 844 }
const DESKTOP = { width: 1440, height: 900 }

const account = (
  id: string,
  name: string,
  role: 'admin' | 'assistant' | 'manager',
  places: string[]
) => ({
  id,
  name,
  email: `${id.slice(4)}@faladoria.org`,
  role,
  assignedCities: places.map(place => {
    const [city, state] = place.split('/')
    return { city, state }
  }),
  status: 'active',
  assignedComplaintCount: 0,
})

const USERS = [
  account('usr_carla', 'Carla Dias', 'admin', []),
  account('usr_ana', 'Ana Souza', 'assistant', ['Varginha/MG']),
  account('usr_bia', 'Bia Rocha', 'assistant', ['Alfenas/MG']),
  account('usr_jose', 'José Antônio', 'assistant', ['Campinas/SP']),
  account('usr_sara', 'Sara Nunes', 'manager', ['Santos/SP']),
]

/** Mocks the panel's APIs, opens `path` and waits until `ready` (the filters, by default) shows. */
const openPage = async (
  page: Page,
  path = PAGE,
  ready = page.getByRole('search')
) => {
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: {
        session: { expiresAt: '2026-11-01T12:00:00Z' },
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
    route.fulfill({ json: USERS })
  )
  await page.route(`${E2E_API_URL}/api/service-areas**`, route =>
    route.fulfill({ json: { serviceAreas: [] } })
  )
  await mockComplaintCounts(page)
  await page.goto(path, { waitUntil: 'domcontentloaded' })
  await ready.waitFor({ timeout: 15000 })
}

const stateField = (page: Page) =>
  page.getByRole('combobox', { name: 'Estado' })
const cityField = (page: Page) => page.getByRole('combobox', { name: 'Cidade' })
const searchField = (page: Page) =>
  page.getByRole('searchbox', { name: 'Buscar por nome ou e-mail' })
const accounts = (page: Page) =>
  page.getByRole('listitem').filter({ has: page.getByRole('term') })
const count = (page: Page) => page.getByText(/^Mostrando \d+ de \d+ contas?$/)

test.describe('Account filters', () => {
  test.describe('Rendering & Structure', () => {
    test('should narrow the team by state, then city, keeping the admin', async ({
      page,
    }) => {
      await openPage(page)
      await expect(accounts(page)).toHaveCount(4)
      await expect(cityField(page)).toBeDisabled()

      await stateField(page).selectOption('MG')
      await cityField(page).selectOption('Varginha')

      await expect(accounts(page)).toHaveCount(2)
      await expect(accounts(page).nth(0)).toContainText('Carla Dias')
      await expect(accounts(page).nth(1)).toContainText('Ana Souza')
      await expect(count(page)).toHaveText('Mostrando 2 de 4 contas')
    })

    test('should find by name without accents and say when nothing matches', async ({
      page,
    }) => {
      await openPage(page)

      await searchField(page).fill('jose antonio')
      await expect(accounts(page)).toHaveCount(1)
      await expect(accounts(page)).toContainText('José Antônio')

      await searchField(page).fill('zzz')
      await expect(accounts(page)).toHaveCount(0)
      await expect(
        page.getByText('Nenhuma conta com esses filtros.')
      ).toBeVisible()
    })

    test('should offer only the places of the folder’s accounts', async ({
      page,
    }) => {
      await openPage(page, '/dashboard/gestores')

      await expect(stateField(page).getByRole('option')).toHaveText([
        'Todos os estados',
        'SP',
      ])
    })
  })

  test.describe('Address', () => {
    test('should keep the filters in the address across a reload', async ({
      page,
    }) => {
      await openPage(page)
      await stateField(page).selectOption('SP')
      await searchField(page).fill('jose')

      await expect(page).toHaveURL(/\/dashboard\/equipe\?estado=SP&busca=jose$/)
      await page.reload({ waitUntil: 'domcontentloaded' })

      await expect(stateField(page)).toHaveValue('SP')
      await expect(searchField(page)).toHaveValue('jose')
      // The admin serves SP too, but her name and e-mail do not match "jose".
      await expect(accounts(page)).toHaveCount(1)
    })

    test('should clear every filter, the typed text too, when the folder is opened again', async ({
      page,
    }) => {
      await openPage(page, `${PAGE}?estado=MG&busca=ana`)
      await expect(accounts(page)).toHaveCount(1)

      await page
        .getByRole('navigation', { name: 'Pastas do painel' })
        .getByRole('link', { name: /^Equipe/ })
        .click()

      await expect(page).toHaveURL(/\/dashboard\/equipe$/)
      await expect(stateField(page)).toHaveValue('')
      await expect(searchField(page)).toHaveValue('')
      await expect(accounts(page)).toHaveCount(4)
    })

    test('should keep every letter when typing fast', async ({ page }) => {
      await openPage(page)

      await searchField(page).pressSequentially('jose antonio')

      await expect(searchField(page)).toHaveValue('jose antonio')
      await expect(page).toHaveURL(/\?busca=jose\+antonio$/)
      await expect(accounts(page)).toHaveCount(1)
    })

    test('should leave the list on Back instead of undoing each filter', async ({
      page,
    }) => {
      await openPage(page, '/dashboard', page.locator('h1'))
      await page
        .getByRole('navigation', { name: 'Pastas do painel' })
        .getByRole('link', { name: /^Equipe/ })
        .click()
      await stateField(page).selectOption('MG')
      await searchField(page).fill('ana')

      await page.goBack()

      await expect(page).toHaveURL(/\/dashboard$/)
    })

    test('should bring the same filtered list back when an account drawer closes', async ({
      page,
    }) => {
      await openPage(page, `${PAGE}?estado=MG&cidade=Alfenas`)

      await page
        .getByRole('link', { name: 'Editar a conta de Bia Rocha' })
        .click()
      // waitFor, not expect: the drawer's chunk loads on the first open, past expect's 5s.
      await page.getByRole('dialog', { name: 'Bia Rocha' }).waitFor()
      await page.keyboard.press('Escape')

      await expect(page.getByRole('dialog')).toHaveCount(0)
      await expect(page).toHaveURL(/\?estado=MG&cidade=Alfenas$/)
      await expect(cityField(page)).toHaveValue('Alfenas')
      await expect(accounts(page)).toHaveCount(2)
    })

    test('should carry the filters in the drawer’s address', async ({
      page,
    }) => {
      await openPage(page, `${PAGE}?estado=MG&cidade=Alfenas`)

      await page
        .getByRole('link', { name: 'Editar a conta de Bia Rocha' })
        .click()

      await page.getByRole('dialog', { name: 'Bia Rocha' }).waitFor()
      await expect(page).toHaveURL(/\/usr_bia\?estado=MG&cidade=Alfenas$/)
    })

    // A pasted link has no list behind it in the history (a reload keeps the history, and its
    // state): closing rebuilds the list from the drawer's own address, filters included.
    test('should keep the filters when a pasted drawer link is closed', async ({
      page,
    }) => {
      await openPage(
        page,
        `${PAGE}/usr_bia?estado=MG&cidade=Alfenas`,
        page.getByRole('dialog', { name: 'Bia Rocha' })
      )

      await page.keyboard.press('Escape')

      await expect(page.getByRole('dialog')).toHaveCount(0)
      await expect(page).toHaveURL(/\/equipe\?estado=MG&cidade=Alfenas$/)
      await expect(accounts(page)).toHaveCount(2)
    })
  })

  test.describe('Accessibility', () => {
    test('should have no axe violations, unfiltered and with nothing found', async ({
      page,
    }) => {
      const expectNoViolations = async () => {
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()
        expect(results.violations).toEqual([])
      }
      await openPage(page)
      await expectNoViolations()

      await searchField(page).fill('zzz')
      await expect(count(page)).toBeVisible()
      await expectNoViolations()
    })

    test('should skip the disabled city on Tab, and explain why', async ({
      page,
    }) => {
      await openPage(page)

      await stateField(page).focus()
      await page.keyboard.press('Tab')

      await expect(searchField(page)).toBeFocused()
      await expect(cityField(page)).toHaveAccessibleDescription(
        'Escolha o estado primeiro.'
      )
    })

    test('should give focus to the first filter after clearing them', async ({
      page,
    }) => {
      await openPage(page, `${PAGE}?busca=ana`)

      await page.getByRole('button', { name: 'Limpar filtros' }).click()

      await expect(stateField(page)).toBeFocused()
      await expect(searchField(page)).toHaveValue('')
      await expect(accounts(page)).toHaveCount(4)
    })
  })

  test.describe('Responsive Layout', () => {
    test('should stack the filters full width on the phone, with 48px targets', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openPage(page)

      const boxes = await Promise.all(
        [stateField(page), cityField(page), searchField(page)].map(field =>
          field.boundingBox()
        )
      )
      const [state, city, search] = boxes.map(box => box!)
      expect(city.y).toBeGreaterThan(state.y + state.height)
      expect(search.y).toBeGreaterThan(city.y + city.height)
      for (const box of [state, city, search]) {
        expect(box.width).toBe(state.width)
        expect(box.height).toBeGreaterThanOrEqual(48)
      }
    })

    test('should put the filters side by side on the desktop', async ({
      page,
    }) => {
      await page.setViewportSize(DESKTOP)
      await openPage(page)

      const [state, city, search] = (
        await Promise.all(
          [stateField(page), cityField(page), searchField(page)].map(field =>
            field.boundingBox()
          )
        )
      ).map(box => box!)
      expect(city.y).toBe(state.y)
      expect(search.y).toBe(state.y)
      expect(city.x).toBeGreaterThan(state.x + state.width)
      expect(search.x).toBeGreaterThan(city.x + city.width)
    })
  })
})
