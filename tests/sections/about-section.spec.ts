import { expect, test } from '@playwright/test'

const ABOUT_SECTION = 'section[aria-labelledby="about-heading"]'

test.describe('AboutSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator(ABOUT_SECTION).waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the about section with aria-labelledby', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      await expect(about).toBeVisible()
    })

    test('should render an h2 as the section heading', async ({ page }) => {
      const h2 = page.locator('h2#about-heading')
      await expect(h2).toBeVisible()
      await expect(h2).toHaveCount(1)
    })

    test('should render the heading with expected content', async ({
      page,
    }) => {
      const h2 = page.locator('h2#about-heading')
      const text = await h2.textContent()

      expect(text).toContain('faladoria')
      expect(text).toContain('SUS')
      expect(text).toContain('gestão pública')
    })

    test('should render the tagline paragraph', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const tagline = about.locator('p:not(.sr-only p)')

      await expect(tagline).toBeVisible()

      const text = await tagline.textContent()
      expect(text).toContain('Uma plataforma independente')
      expect(text).toContain('para ouvir, mediar e resolver.')
    })
  })

  test.describe('Accessibility', () => {
    test('h2 should be the labelling element for the section', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      const labelledbyId = await about.getAttribute('aria-labelledby')
      const h2Id = await about.locator('h2').getAttribute('id')

      expect(labelledbyId).toBe(h2Id)
    })

    test('should have screen-reader-only description', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const srOnly = about.locator('.sr-only')

      await expect(srOnly).toBeAttached()

      const text = await srOnly.textContent()
      expect(text?.trim().length).toBeGreaterThan(20)
    })

    test('should use semantic section element', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const tagName = await about.evaluate(el => el.tagName.toLowerCase())

      expect(tagName).toBe('section')
    })

    test('should maintain correct heading hierarchy (h2 under h1)', async ({
      page,
    }) => {
      const h1 = page.locator('h1')
      const h2 = page.locator('h2#about-heading')

      await expect(h1).toHaveCount(1)
      await expect(h2).toBeVisible()

      // h2 should appear after h1 in DOM order
      const h1Bounds = await h1.boundingBox()
      const h2Bounds = await h2.boundingBox()

      expect(h1Bounds).toBeTruthy()
      expect(h2Bounds).toBeTruthy()
      expect(h2Bounds!.y).toBeGreaterThan(h1Bounds!.y)
    })
  })

  test.describe('Responsive Layout', () => {
    test('should occupy full viewport height', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const bounds = await about.boundingBox()
      const viewport = page.viewportSize()

      expect(bounds).toBeTruthy()
      expect(viewport).toBeTruthy()
      expect(bounds!.height).toBeGreaterThanOrEqual(viewport!.height)
    })

    test('should keep tagline aligned to the right', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const tagline = about.locator('p:not(.sr-only p)')
      const aboutBounds = await about.boundingBox()
      const taglineBounds = await tagline.boundingBox()

      expect(aboutBounds).toBeTruthy()
      expect(taglineBounds).toBeTruthy()

      // Tagline right edge should be near the section right edge
      const taglineRight = taglineBounds!.x + taglineBounds!.width
      const aboutRight = aboutBounds!.x + aboutBounds!.width
      expect(aboutRight - taglineRight).toBeLessThan(100)
    })

    test('should keep tagline at the bottom of the section', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      const tagline = about.locator('p:not(.sr-only p)')
      const h2 = about.locator('h2')

      const taglineBounds = await tagline.boundingBox()
      const h2Bounds = await h2.boundingBox()

      expect(taglineBounds).toBeTruthy()
      expect(h2Bounds).toBeTruthy()

      // Tagline should be below the heading
      expect(taglineBounds!.y).toBeGreaterThan(h2Bounds!.y)
    })

    test('should center the heading vertically', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const h2 = about.locator('h2')

      const aboutBounds = await about.boundingBox()
      const h2Bounds = await h2.boundingBox()

      expect(aboutBounds).toBeTruthy()
      expect(h2Bounds).toBeTruthy()

      const headingCenter = h2Bounds!.y + h2Bounds!.height / 2
      const sectionCenter = aboutBounds!.y + aboutBounds!.height / 2

      // Heading center should be roughly at section center (within 20% tolerance)
      const tolerance = aboutBounds!.height * 0.2
      expect(Math.abs(headingCenter - sectionCenter)).toBeLessThan(tolerance)
    })
  })
})
