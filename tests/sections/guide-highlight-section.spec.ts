import { expect, test } from '@playwright/test'

const GUIDE_HIGHLIGHT = 'section[aria-labelledby="guide-highlight-heading"]'

test.describe('GuideHighlightSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator(GUIDE_HIGHLIGHT).waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the guide highlight section', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      await expect(section).toBeVisible()
    })

    test('should render the badge text', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      await expect(section.getByText('Conteúdo gratuito')).toBeVisible()
    })

    test('should render a visible h2 heading', async ({ page }) => {
      const h2 = page.locator('h2#guide-highlight-heading')
      await expect(h2).toBeVisible()
      await expect(h2).toContainText('Como conseguir pelo SUS')
    })

    test('should render the section description', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      await expect(
        section.getByText('Saúde pública é um direito')
      ).toBeVisible()
    })

    test('should render the CTA link', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const cta = section.getByText('Explorar o Guia')

      await expect(cta).toBeVisible()
      await expect(cta).toHaveAttribute('href', '/como-conseguir-pelo-sus')
    })

    test('should render the banner image', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const image = section.locator('img')

      await expect(image).toHaveCount(1)
      await expect(image).toBeVisible()
    })

    test('should render the banner image with descriptive alt text', async ({
      page,
    }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const image = section.locator('img')

      const alt = await image.getAttribute('alt')
      expect(alt?.length).toBeGreaterThan(10)
    })
  })

  test.describe('Accessibility', () => {
    test('should have aria-labelledby pointing to h2', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const labelledbyId = section
      const h2Id = await section
        .locator('h2#guide-highlight-heading')
        .getAttribute('id')

      await expect(labelledbyId).toHaveAttribute('aria-labelledby', h2Id!)
    })

    test('should have screen-reader-only description', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const srDescription = section.locator('p', {
        hasText: 'Seção de destaque do guia do SUS',
      })

      await expect(srDescription).toBeAttached()
    })

    test('should have aria-hidden on decorative arrow icon', async ({
      page,
    }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const arrow = section.locator('span[aria-hidden="true"]', {
        hasText: '→',
      })

      await expect(arrow).toBeAttached()
    })

    test('should have aria-label on the CTA link', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const cta = section.getByText('Explorar o Guia')

      const ariaLabel = await cta.getAttribute('aria-label')
      expect(ariaLabel).toContain('Guia do SUS')
    })

    test('should have only the CTA as interactive element', async ({
      page,
    }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const links = section.locator('a')

      const count = links
      await expect(count).toHaveCount(1)
    })

    test('should render the banner image with lazy loading', async ({
      page,
    }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const image = section.locator('img')

      await expect(image).toHaveAttribute('loading', 'lazy')
    })
  })

  test.describe('Responsive Layout', () => {
    test.describe('Desktop', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(GUIDE_HIGHLIGHT).waitFor({ timeout: 15000 })
      })

      test('should render text and banner image side by side', async ({
        page,
      }) => {
        const section = page.locator(GUIDE_HIGHLIGHT)
        const cta = section.getByText('Explorar o Guia')
        const image = section.locator('img')

        const ctaBox = await cta.boundingBox()
        const imageBox = await image.boundingBox()

        expect(ctaBox).toBeTruthy()
        expect(imageBox).toBeTruthy()

        // Text (CTA) should be to the left of the banner image
        expect(imageBox!.x).toBeGreaterThan(ctaBox!.x)
      })
    })

    test.describe('Mobile', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(GUIDE_HIGHLIGHT).waitFor({ timeout: 15000 })
      })

      test('should render text above the banner image', async ({ page }) => {
        const section = page.locator(GUIDE_HIGHLIGHT)
        const cta = section.getByText('Explorar o Guia')
        const image = section.locator('img')

        const ctaBox = await cta.boundingBox()
        const imageBox = await image.boundingBox()

        expect(ctaBox).toBeTruthy()
        expect(imageBox).toBeTruthy()

        // Text (CTA) should be above the banner image
        expect(imageBox!.y).toBeGreaterThan(ctaBox!.y)
      })
    })
  })
})
