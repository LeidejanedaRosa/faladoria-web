import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { E2E_IBGE_URL } from '../helpers/ibgeApi'
import { E2E_API_URL } from '../helpers/publicBoardApi'

const PAGE = '/dashboard/cidades'
const MOBILE = { width: 390, height: 844 }
const MG_CITIES = [
  'Alfenas',
  'Lavras',
  'São José da Varginha',
  'Vargem Alegre',
  'Varginha',
]

interface Area {
  id: string
  city: string
  state: string
  addedAt: string
  removedAt: string | null
}

const area = (
  id: string,
  city: string,
  removedAt: string | null = null
): Area => ({
  id,
  city,
  state: 'MG',
  addedAt: '2026-10-01T13:00:00.000Z',
  removedAt,
})

const user = (role: 'admin' | 'assistant') => ({
  id: 'usr_carla',
  name: 'Carla Dias',
  email: 'carla@faladoria.org',
  role,
  assignedCities: [],
  mustChangePassword: false,
  credentialExpiresAt: null,
})

/** The session, the service-area routes (with state) and the IBGE. */
const mockApis = async (
  page: Page,
  {
    role = 'admin',
    ibgeDown = false,
  }: { role?: 'admin' | 'assistant'; ibgeDown?: boolean } = {}
) => {
  const lists = {
    active: [area('sa_alfenas', 'Alfenas'), area('sa_varginha', 'Varginha')],
    removed: [area('sa_lavras', 'Lavras', '2026-10-12T15:00:00.000Z')],
  }
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: {
        session: { expiresAt: '2026-11-01T12:00:00Z' },
        user: user(role),
      },
    })
  )
  await page.route(`${E2E_API_URL}/api/service-areas**`, route => {
    const url = new URL(route.request().url())
    if (route.request().method() === 'GET') {
      const status =
        url.searchParams.get('status') === 'removed' ? 'removed' : 'active'
      return route.fulfill({ json: { serviceAreas: lists[status] } })
    }
    const body = route.request().postDataJSON() as Record<string, string>
    if (url.pathname.endsWith('/remove')) {
      const index = lists.active.findIndex(
        item => item.id === body.serviceAreaId
      )
      const [removed] = lists.active.splice(index, 1)
      lists.removed.push({ ...removed, removedAt: '2026-10-27T12:00:00.000Z' })
    } else if (url.pathname === '/api/service-areas') {
      lists.active.push(area(`sa_${body.city}`, body.city))
    }
    return route.fulfill({ json: { serviceAreaId: 'sa_1' } })
  })
  await page.route(`${E2E_API_URL}/api/users?**`, route =>
    route.fulfill({ json: [{ id: 'u1' }, { id: 'u2' }, { id: 'u3' }] })
  )
  await page.route(`${E2E_IBGE_URL}/**`, route =>
    ibgeDown
      ? route.fulfill({ status: 503, body: 'down' })
      : route.fulfill({ json: MG_CITIES.map(nome => ({ nome })) })
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

const cityField = (page: Page) => page.getByRole('combobox', { name: 'Cidade' })

const chooseState = async (page: Page) => {
  await page.getByRole('combobox', { name: 'Estado' }).selectOption('MG')
  await expect(cityField(page)).toBeEnabled()
}

test.describe('Service areas page', () => {
  test.describe('Rendering & Structure', () => {
    test('should list the served cities under a single h1', async ({
      page,
    }) => {
      await openPage(page)

      await expect(page.locator('h1')).toHaveText('Cidades atendidas')
      await expect(page.getByText('Varginha/MG')).toBeVisible()
      await expect(
        page.getByRole('link', { name: 'Ativas (2)' })
      ).toHaveAttribute('aria-current', 'true')
    })

    test('should be in the menu of the administration only', async ({
      page,
    }) => {
      await openPage(page)
      await page.setViewportSize({ width: 1440, height: 900 })

      await expect(
        page
          .getByRole('complementary')
          .getByRole('link', { name: 'Cidades atendidas' })
      ).toHaveAttribute('aria-current', 'page')
    })

    test('should tell another role the page is not for them', async ({
      page,
    }) => {
      await mockApis(page, { role: 'assistant' })
      await page.goto(PAGE, { waitUntil: 'domcontentloaded' })

      await expect(page.locator('h1')).toHaveText('Acesso restrito')
      await expect(
        page.getByRole('link', { name: 'Cidades atendidas' })
      ).toHaveCount(0)
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
      await expect(page.getByText('Varginha/MG')).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations with the city list open', async ({
      page,
    }) => {
      await openPage(page)
      await chooseState(page)
      await cityField(page).fill('varg')
      await expect(page.getByRole('listbox')).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations with the removal dialog open', async ({
      page,
    }) => {
      await openPage(page)
      await page.getByRole('button', { name: 'Remover Varginha/MG' }).click()
      await expect(page.getByText('3 contas atendem')).toBeVisible()

      await expectNoViolations(page)
    })

    test('should add a city with the keyboard only', async ({ page }) => {
      await openPage(page)
      await chooseState(page)

      await cityField(page).focus()
      await page.keyboard.type('lav')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      await expect(cityField(page)).toHaveValue('Lavras')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')

      await expect(
        page.getByRole('status').filter({ hasText: 'adicionada' })
      ).toHaveText('Lavras/MG foi adicionada à lista.')
      await expect(cityField(page)).toBeFocused()
    })

    test('should not let an already served city be chosen', async ({
      page,
    }) => {
      await openPage(page)
      await chooseState(page)

      await cityField(page).fill('varg')
      const served = page.getByRole('option', { name: 'Varginha já atendida' })
      await expect(served).toHaveAttribute('aria-disabled', 'true')
      // Playwright's click() waits for an aria-disabled element to become enabled; the event is
      // sent directly, as a person's click would be.
      await served.dispatchEvent('click')

      await expect(cityField(page)).toHaveValue('varg')
    })

    test('should trap focus in the removal dialog and give it back on Escape', async ({
      page,
    }) => {
      await openPage(page)
      const trigger = page.getByRole('button', { name: 'Remover Varginha/MG' })
      await trigger.click()
      const dialog = page.getByRole('dialog', { name: 'Remover Varginha/MG?' })
      await expect(
        dialog.getByRole('button', { name: 'Cancelar' })
      ).toBeFocused()

      for (let step = 0; step < 4; step++) {
        await page.keyboard.press('Tab')
        const outside = await page.evaluate(() => {
          const active = document.activeElement
          const modal = document.querySelector('dialog[open]')
          return active !== document.body && !modal?.contains(active)
        })
        expect(outside).toBe(false)
      }

      await page.keyboard.press('Escape')
      await expect(dialog).toBeHidden()
      await expect(trigger).toBeFocused()
    })

    test('should remove a city and move focus to the list heading', async ({
      page,
    }) => {
      await openPage(page)
      await page.getByRole('button', { name: 'Remover Varginha/MG' }).click()

      await page.getByRole('button', { name: 'Remover cidade' }).click()

      await expect(
        page.getByRole('heading', { name: 'Lista de cidades' })
      ).toBeFocused()
      await expect(
        page.getByText('Varginha/MG foi removida da lista.')
      ).toBeVisible()
      await expect(page.getByText('Varginha/MG', { exact: true })).toHaveCount(
        0
      )
      await expect(
        page.getByRole('link', { name: 'Removidas (2)' })
      ).toBeVisible()
    })

    test('should fall back to free text when the IBGE is down', async ({
      page,
    }) => {
      await openPage(page, { ibgeDown: true })
      await page.getByRole('combobox', { name: 'Estado' }).selectOption('MG')

      await expect(page.getByRole('textbox', { name: 'Cidade' })).toBeVisible({
        timeout: 10000,
      })
    })
  })

  test.describe('Responsive Layout', () => {
    test('should stack the buttons under the city name on mobile', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openPage(page)

      const name = (await page.getByText('Varginha/MG').boundingBox())!
      const edit = (await page
        .getByRole('button', { name: 'Corrigir Varginha/MG' })
        .boundingBox())!

      expect(edit.y).toBeGreaterThan(name.y + name.height)
      expect(edit.height).toBeGreaterThanOrEqual(48)
    })

    test('should keep the city list within the screen on mobile', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openPage(page)
      await chooseState(page)
      await cityField(page).fill('a')

      const list = (await page.getByRole('listbox').boundingBox())!
      expect(list.x).toBeGreaterThanOrEqual(0)
      expect(list.x + list.width).toBeLessThanOrEqual(MOBILE.width)
    })
  })
})
