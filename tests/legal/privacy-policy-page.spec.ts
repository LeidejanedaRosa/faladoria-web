import { expect, test } from '@playwright/test'

test.describe('PrivacyPolicyPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/politica-de-privacidade', {
      waitUntil: 'domcontentloaded',
    })
    await page.locator('main').waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the page title as h1', async ({ page }) => {
      const h1 = page.locator('h1')

      await expect(h1).toBeVisible()
      await expect(h1).toContainText('Política de Privacidade')
    })

    test('should render the last updated text', async ({ page }) => {
      await expect(page.getByText('Última atualização:')).toBeVisible()
    })

    test('should render the back link to homepage', async ({ page }) => {
      const backLink = page.locator('nav[aria-label="Breadcrumb"] a[href="/"]')

      await expect(backLink).toBeVisible()
      await expect(backLink).toContainText('Voltar para a página inicial')
    })

    test('should render all placeholder sections with h2 headings', async ({
      page,
    }) => {
      const article = page.locator('article')
      const h2s = article.locator('h2')

      const count = await h2s.count()
      expect(count).toBeGreaterThanOrEqual(6)
    })

    test('should set the correct document title', async ({ page }) => {
      const title = await page.title()

      expect(title).toContain('Política de Privacidade')
      expect(title).toContain('Faladoria')
    })

    test('should render header and footer', async ({ page }) => {
      await expect(page.getByRole('banner')).toBeVisible()
      await expect(page.getByRole('contentinfo')).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('should have a skip link', async ({ page }) => {
      const skipLink = page.locator('a[href="#main-content"]')

      await expect(skipLink).toBeAttached()
    })

    test('should have a main landmark with aria-label', async ({ page }) => {
      const main = page.getByRole('main')

      await expect(main).toBeAttached()
      await expect(main).toHaveAttribute(
        'aria-label',
        'Política de Privacidade'
      )
    })

    test('should have exactly one h1', async ({ page }) => {
      const h1 = page.locator('h1')

      await expect(h1).toHaveCount(1)
    })

    test('should have proper heading hierarchy (h1 > h2)', async ({ page }) => {
      const article = page.locator('article')
      const h1 = page.locator('h1')
      const h2s = article.locator('h2')

      await expect(h1).toBeVisible()

      const count = await h2s.count()
      expect(count).toBeGreaterThan(0)
    })

    test('should have breadcrumb navigation with aria-label', async ({
      page,
    }) => {
      const nav = page.locator('nav[aria-label="Breadcrumb"]')

      await expect(nav).toBeVisible()
    })

    test('sections should have aria-labelledby attributes', async ({
      page,
    }) => {
      const sections = page.locator('article section[aria-labelledby]')

      const count = await sections.count()
      expect(count).toBeGreaterThanOrEqual(6)
    })
  })

  test.describe('Navigation', () => {
    test('should navigate back to homepage via back link', async ({ page }) => {
      await page.locator('nav[aria-label="Breadcrumb"] a[href="/"]').click()

      await expect(page).toHaveURL('/')
    })

    test('header nav links should point to homepage sections', async ({
      page,
    }) => {
      const headerNav = page.locator('header nav')
      const navLinks = headerNav.locator('a[href^="/#"]')

      const count = await navLinks.count()
      expect(count).toBeGreaterThan(0)

      for (let i = 0; i < count; i++) {
        const href = await navLinks.nth(i).getAttribute('href')
        expect(href).toMatch(/^\/#/)
      }
    })
  })
})
