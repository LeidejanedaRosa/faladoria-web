import { expect, test } from '@playwright/test'

test.describe('HeroSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator('section').first().waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the hero section with aria-labelledby', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      await expect(hero).toBeVisible()
    })

    test('should render exactly one h1 as the hero heading', async ({
      page,
    }) => {
      const h1 = page.locator('h1#hero-heading')
      await expect(h1).toBeVisible()
      await expect(h1).toHaveCount(1)
    })

    test('should render all three headline lines', async ({ page }) => {
      const h1 = page.locator('h1#hero-heading')
      const lines = h1.locator('span.block')

      await expect(lines).toHaveCount(3)

      const expectedLines = ['Você fala.', 'O SUS escuta.', 'Nós resolvemos.']

      for (let i = 0; i < expectedLines.length; i++) {
        const text = await lines.nth(i).textContent()
        expect(text?.trim()).toBe(expectedLines[i])
      }
    })

    test('should render the logo image', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const logo = hero.locator('img')

      await expect(logo).toBeVisible()
      await expect(logo).toHaveAttribute('src', /faladoria_secundaria/)
    })
  })

  test.describe('Accessibility', () => {
    test('should have descriptive alt text on the logo', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const logo = hero.locator('img')
      const alt = await logo.getAttribute('alt')

      expect(alt).toBeTruthy()
      expect(alt!.length).toBeGreaterThan(10)
      expect(alt).toContain('Faladoria')
    })

    test('should use CSS uppercase instead of JS toUpperCase for screen readers', async ({
      page,
    }) => {
      const h1 = page.locator('h1#hero-heading')
      const textContent = await h1.textContent()

      // Text in DOM should be mixed-case (CSS handles visual uppercase)
      expect(textContent).toContain('Você fala.')
      expect(textContent).not.toMatch(/^[A-ZÀ-Ú\s.]+$/)
    })

    test('should have screen-reader-only description', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const srOnly = hero.locator('.sr-only')

      await expect(srOnly).toBeAttached()

      const text = await srOnly.textContent()
      expect(text?.trim().length).toBeGreaterThan(20)
    })

    test('h1 should be the labelling element for the section', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const labelledbyId = await hero.getAttribute('aria-labelledby')
      const h1Id = await page.locator('h1').first().getAttribute('id')

      expect(labelledbyId).toBe(h1Id)
    })
  })

  test.describe('Image Performance', () => {
    test('should have explicit width and height to prevent layout shift', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const logo = hero.locator('img')

      await expect(logo).toHaveAttribute('width')
      await expect(logo).toHaveAttribute('height')
    })

    test('should have eager loading and high fetch priority for above-the-fold image', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const logo = hero.locator('img')

      await expect(logo).toHaveAttribute('loading', 'eager')
      await expect(logo).toHaveAttribute('fetchpriority', 'high')
    })
  })

  test.describe('Responsive Layout', () => {
    test('should stack vertically on mobile (column layout)', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const logo = page.locator('section[aria-labelledby="hero-heading"] img')
      const h1 = page.locator('h1#hero-heading')

      const logoBounds = await logo.boundingBox()
      const h1Bounds = await h1.boundingBox()

      expect(logoBounds).toBeTruthy()
      expect(h1Bounds).toBeTruthy()

      // On mobile, logo should be above the heading
      expect(logoBounds!.y).toBeLessThan(h1Bounds!.y)
    })

    test('should display side by side on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 })

      const logo = page.locator('section[aria-labelledby="hero-heading"] img')
      const h1 = page.locator('h1#hero-heading')

      const logoBounds = await logo.boundingBox()
      const h1Bounds = await h1.boundingBox()

      expect(logoBounds).toBeTruthy()
      expect(h1Bounds).toBeTruthy()

      // On desktop (flex-row-reverse), they should be on the same row
      // Logo should be to the right of the heading
      expect(logoBounds!.x).toBeGreaterThan(h1Bounds!.x)
    })

    test('should occupy at least full viewport height', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const bounds = await hero.boundingBox()
      const viewport = page.viewportSize()

      expect(bounds).toBeTruthy()
      expect(viewport).toBeTruthy()
      expect(bounds!.height).toBeGreaterThanOrEqual(viewport!.height)
    })
  })
})
