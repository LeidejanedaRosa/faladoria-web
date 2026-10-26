import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { E2E_API_URL } from '../helpers/publicBoardApi'

const LOGIN = '/dashboard/entrar'
const CHANGE = '/dashboard/trocar-senha'

const user = (mustChangePassword: boolean) => ({
  id: 'usr_ana',
  name: 'Ana Souza',
  email: 'ana@faladoria.org',
  role: 'assistant',
  assignedCities: [{ city: 'Varginha', state: 'MG' }],
  mustChangePassword,
  credentialExpiresAt: null,
})

/** Mocks the auth routes. `signInAs` decides who the API recognises; null rejects the password. */
const mockAuthApi = async (
  page: Page,
  { signInAs }: { signInAs: ReturnType<typeof user> | null } = {
    signInAs: null,
  }
) => {
  let session: { user: ReturnType<typeof user> } | null = null
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: session && {
        session: { expiresAt: '2026-11-01T12:00:00Z' },
        ...session,
      },
    })
  )
  await page.route(`${E2E_API_URL}/api/auth/sign-in/email`, route => {
    if (!signInAs) {
      return route.fulfill({
        status: 401,
        json: { statusCode: 401, code: 'INVALID_CREDENTIALS', message: 'x' },
      })
    }
    session = { user: signInAs }
    return route.fulfill({ json: { user: signInAs } })
  })
}

const form = (page: Page) => page.locator('form')

/** Waits for the card's entrance animation and slide to end, instead of a fixed delay. */
const cardAtRest = async (page: Page) => {
  const card = page.locator('section')
  await card.evaluate(element =>
    Promise.all(element.getAnimations().map(animation => animation.finished))
  )
  return (await card.boundingBox())!
}

const signIn = async (page: Page) => {
  await page.getByLabel('E-mail').fill('ana@faladoria.org')
  await page.getByLabel('Senha', { exact: true }).fill('segredo-123')
  await form(page).getByRole('button', { name: 'Entrar' }).click()
}

test.describe('Auth pages', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthApi(page)
  })

  test.describe('Rendering & Structure', () => {
    test('should render the login with a single h1 and labelled fields', async ({
      page,
    }) => {
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })

      await expect(page.locator('h1')).toHaveText('Entrar no painel')
      await expect(page.getByLabel('E-mail')).toBeVisible()
      await expect(page.getByLabel('Senha', { exact: true })).toBeVisible()
    })

    test('should keep the panel out of search engines', async ({ page }) => {
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })

      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, nofollow'
      )
    })

    test('should open the password change directly from its own address', async ({
      page,
    }) => {
      await page.goto(CHANGE, { waitUntil: 'domcontentloaded' })

      await expect(page.locator('h1')).toHaveText('Trocar a senha')
      await expect(page.getByLabel('E-mail')).toBeVisible()
    })

    test('should announce wrong credentials without leaving the page', async ({
      page,
    }) => {
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })

      await signIn(page)

      await expect(page.getByRole('alert')).toHaveText(
        'E-mail ou senha incorretos.'
      )
      await expect(page).toHaveURL(LOGIN)
    })
  })

  test.describe('Flows', () => {
    test('should send a temporary password straight to the mandatory change', async ({
      page,
    }) => {
      await page.unrouteAll()
      await mockAuthApi(page, { signInAs: user(true) })
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })

      await signIn(page)

      await expect(page).toHaveURL(CHANGE)
      await expect(page.locator('h1')).toHaveText('Crie a sua senha')
      await expect(page.getByLabel('Senha temporária')).toBeVisible()
      await expect(page.getByLabel('E-mail')).toHaveCount(0)
      await expect(page.getByRole('button', { name: 'Sair' })).toBeVisible()
    })

    test('should slide between the two sides, changing the address and the focus', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })

      await page
        .locator('aside')
        .getByRole('button', { name: 'Trocar a senha' })
        .click()

      await expect(page).toHaveURL(CHANGE)
      await expect(page.locator('h1')).toBeFocused()
      await expect(page.locator('h1')).toHaveText('Trocar a senha')

      await page.goBack()

      await expect(page).toHaveURL(LOGIN)
      await expect(page.locator('h1')).toHaveText('Entrar no painel')
    })
  })

  test.describe('Accessibility', () => {
    for (const path of [LOGIN, CHANGE]) {
      test(`should pass WCAG 2.1 AA on ${path}`, async ({ page }) => {
        await page.goto(path, { waitUntil: 'domcontentloaded' })
        // Mid-animation the card is half transparent, and its colours are not the real ones.
        await cardAtRest(page)

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()

        expect(results.violations).toEqual([])
      })
    }

    test('should reach the form first and never the hidden half of the band', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })
      await page.locator('h1').waitFor()

      const reached: { name: string; isInert: boolean }[] = []
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab')
        reached.push(
          await page.evaluate(() => {
            const element = document.activeElement
            return {
              name:
                element?.getAttribute('aria-label') ??
                element?.getAttribute('name') ??
                element?.textContent?.trim() ??
                '',
              isInert: Boolean(element?.closest('[inert]')),
            }
          })
        )
      }

      expect(reached.map(({ name }) => name)).toEqual([
        'email',
        'password',
        'Mostrar senha',
        'Entrar',
        'Trocar a senha',
      ])
      expect(reached.some(({ isInert }) => isInert)).toBe(false)
    })

    test('should switch sides without sliding when the system asks for less motion', async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })

      const seconds = await page
        .locator('section')
        .evaluate(card => parseFloat(getComputedStyle(card).transitionDuration))

      // The global reduced-motion rule in index.css leaves 0.01ms: imperceptible, not zero.
      expect(seconds).toBeLessThan(0.01)
    })
  })

  test.describe('Responsive Layout', () => {
    test('should put the card on the left for login and on the right for the change', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })
      const band = (await page.locator('aside').boundingBox())!
      const loginCard = await cardAtRest(page)

      await page
        .locator('aside')
        .getByRole('button', { name: 'Trocar a senha' })
        .click()
      const changeCard = await cardAtRest(page)

      expect(loginCard.x).toBeLessThan(
        band.x + band.width / 2 - loginCard.width / 2
      )
      expect(Math.round(loginCard.x - band.x)).toBe(48)
      expect(
        Math.round(band.x + band.width - (changeCard.x + changeCard.width))
      ).toBe(48)
    })

    test('should hide the band on mobile and keep the switch under the card', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })

      await expect(page.locator('aside')).toBeHidden()
      const card = (await page.locator('section').boundingBox())!
      const switchButton = page.getByRole('button', { name: 'Trocar a senha' })
      await expect(switchButton).toBeVisible()
      expect((await switchButton.boundingBox())!.y).toBeGreaterThan(
        card.y + card.height
      )
    })

    test('should keep fields and buttons at least 48px tall for touch', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto(LOGIN, { waitUntil: 'domcontentloaded' })

      for (const target of [
        page.getByLabel('E-mail'),
        page.getByLabel('Senha', { exact: true }),
        form(page).getByRole('button', { name: 'Entrar' }),
        page.getByRole('button', { name: 'Mostrar senha' }),
      ]) {
        expect((await target.boundingBox())!.height).toBeGreaterThanOrEqual(48)
      }
    })
  })
})
