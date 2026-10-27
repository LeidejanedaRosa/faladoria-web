import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { E2E_API_URL } from '../helpers/publicBoardApi'

const PANEL = '/dashboard'
const LOGIN = '/dashboard/entrar'
const CHANGE = '/dashboard/trocar-senha'
const DESKTOP = { width: 1440, height: 900 }
const WIDE = { width: 2560, height: 1080 }
const MOBILE = { width: 390, height: 844 }

type Role = 'admin' | 'assistant' | 'manager'

const user = (role: Role = 'assistant', mustChangePassword = false) => ({
  id: 'usr_ana',
  name: 'Ana Souza',
  email: 'ana@faladoria.org',
  role,
  assignedCities: [{ city: 'Varginha', state: 'MG' }],
  mustChangePassword,
  credentialExpiresAt: null,
})

const TEAM_COUNTS = {
  byStatus: {
    open: 2,
    rejected: 1,
    inReview: 3,
    inProgress: 5,
    resolved: 12,
    unresolved: 1,
    outOfServiceArea: 0,
  },
  unread: 4,
  assignedToMe: 6,
  unassigned: 7,
}
const MANAGER_COUNTS = {
  byStatus: { inReview: 3, inProgress: 5, unresolved: 1, resolved: 12 },
}

/**
 * Mocks the session, sign-in and counts routes. `countsStatus: 401` simulates a session that
 * expired on the server: the counts are refused and the next session check finds nobody.
 */
const mockPanelApi = async (
  page: Page,
  {
    signedInAs = null,
    signInAs = user(),
    countsStatus = 200,
  }: {
    signedInAs?: ReturnType<typeof user> | null
    signInAs?: ReturnType<typeof user>
    countsStatus?: 200 | 401
  } = {}
) => {
  let current = signedInAs
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: current && {
        session: { expiresAt: '2026-11-01T12:00:00Z' },
        user: current,
      },
    })
  )
  await page.route(`${E2E_API_URL}/api/auth/sign-in/email`, route => {
    current = signInAs
    return route.fulfill({ json: { user: signInAs } })
  })
  await page.route(`${E2E_API_URL}/api/complaints/counts`, route => {
    if (countsStatus === 401) {
      current = null
      return route.fulfill({
        status: 401,
        json: { statusCode: 401, code: 'UNAUTHENTICATED', message: 'x' },
      })
    }
    return route.fulfill({
      json: current?.role === 'manager' ? MANAGER_COUNTS : TEAM_COUNTS,
    })
  })
}

const panelReady = (page: Page) =>
  expect(page.getByRole('heading', { level: 1 })).toHaveText('Olá, Ana')

test.describe('Panel shell', () => {
  test.describe('Route guard', () => {
    test('should send a visitor without session to the login, and back after signing in', async ({
      page,
    }) => {
      await mockPanelApi(page)
      await page.goto(PANEL, { waitUntil: 'domcontentloaded' })

      await expect(page).toHaveURL(LOGIN)
      await page.getByLabel('E-mail').fill('ana@faladoria.org')
      await page.getByLabel('Senha', { exact: true }).fill('segredo-123')
      await page.locator('form').getByRole('button', { name: 'Entrar' }).click()

      await expect(page).toHaveURL(PANEL)
      await panelReady(page)
    })

    test('should hold someone with a temporary password on the password change', async ({
      page,
    }) => {
      await mockPanelApi(page, { signedInAs: user('assistant', true) })
      await page.goto(PANEL, { waitUntil: 'domcontentloaded' })

      await expect(page).toHaveURL(CHANGE)
    })

    test('should take a signed-in person away from the login to the panel', async ({
      page,
    }) => {
      await mockPanelApi(page, { signedInAs: user() })
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })

      await expect(page).toHaveURL(PANEL)
      await panelReady(page)
    })

    test('should go back to the login when the server says the session is gone', async ({
      page,
    }) => {
      await mockPanelApi(page, { signedInAs: user(), countsStatus: 401 })
      await page.goto(PANEL, { waitUntil: 'domcontentloaded' })

      await expect(page).toHaveURL(LOGIN)
    })
  })

  test.describe('Accessibility', () => {
    for (const role of ['assistant', 'manager'] as const) {
      test(`should have no axe violations on the ${role} home`, async ({
        page,
      }) => {
        await mockPanelApi(page, { signedInAs: user(role) })
        await page.goto(PANEL, { waitUntil: 'domcontentloaded' })
        await expect(
          page.getByRole('heading', { name: 'Reclamações por status' })
        ).toBeVisible()

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()

        expect(results.violations).toEqual([])
      })
    }

    for (const [where, url] of [
      ['panel', PANEL],
      ['public site', '/'],
    ] as const) {
      test(`should paint the skip link when it gets focus on the ${where}`, async ({
        page,
      }) => {
        await mockPanelApi(page, { signedInAs: user() })
        await page.goto(url, { waitUntil: 'domcontentloaded' })
        const skipLink = page.getByRole('link', {
          name: 'Pular para o conteúdo principal',
        })

        await skipLink.focus()

        // rgb(…) of a theme colour, never the transparent default of a class that does not exist.
        await expect(skipLink).not.toHaveCSS(
          'background-color',
          'rgba(0, 0, 0, 0)'
        )
        await expect(skipLink).toHaveCSS('color', 'rgb(255, 255, 255)')
      })
    }
  })

  test.describe('Mobile menu', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(MOBILE)
      await mockPanelApi(page, { signedInAs: user() })
      await page.goto(PANEL, { waitUntil: 'domcontentloaded' })
      await panelReady(page)
    })

    test('should keep keyboard focus inside the open menu', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Abrir menu' }).click()
      const dialog = page.getByRole('dialog', { name: 'Menu do painel' })
      await expect(
        dialog.getByRole('button', { name: 'Fechar menu' })
      ).toBeFocused()

      for (let step = 0; step < 6; step++) {
        await page.keyboard.press('Tab')
        expect(
          await dialog.evaluate(element =>
            element.contains(document.activeElement)
          )
        ).toBe(true)
      }
    })

    test('should close on Escape and give focus back to ☰', async ({
      page,
    }) => {
      const trigger = page.getByRole('button', { name: 'Abrir menu' })
      await trigger.click()

      await page.keyboard.press('Escape')

      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(trigger).toBeFocused()
    })
  })

  test.describe('Responsive Layout', () => {
    test.beforeEach(async ({ page }) => {
      await mockPanelApi(page, { signedInAs: user() })
    })

    test('should show the side navigation on desktop, without ☰', async ({
      page,
    }) => {
      await page.setViewportSize(DESKTOP)
      await page.goto(PANEL, { waitUntil: 'domcontentloaded' })
      await panelReady(page)

      await expect(
        page.getByRole('complementary').getByRole('link', { name: 'Início' })
      ).toBeVisible()
      await expect(
        page.getByRole('button', { name: 'Abrir menu' })
      ).toBeHidden()
    })

    test('should hide the side navigation on mobile behind ☰', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await page.goto(PANEL, { waitUntil: 'domcontentloaded' })
      await panelReady(page)

      await expect(page.getByRole('complementary')).toBeHidden()
      await expect(
        page.getByRole('button', { name: 'Abrir menu' })
      ).toBeVisible()
    })

    test('should centre the content on very wide screens', async ({ page }) => {
      await page.setViewportSize(WIDE)
      await page.goto(PANEL, { waitUntil: 'domcontentloaded' })
      await panelReady(page)

      const main = (await page.getByRole('main').boundingBox())!
      const content = (await page
        .getByRole('main')
        .locator('> div')
        .boundingBox())!

      expect(content.width).toBeLessThanOrEqual(1152)
      const leftGap = content.x - main.x
      const rightGap = main.x + main.width - (content.x + content.width)
      expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(1)
    })
  })
})
