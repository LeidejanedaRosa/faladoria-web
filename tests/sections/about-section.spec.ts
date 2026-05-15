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

    test('should render a visible h2 as the section heading', async ({
      page,
    }) => {
      const h2 = page.locator('h2#about-heading')
      await expect(h2).toBeVisible()
      await expect(h2).toHaveCount(1)
    })

    test('should render the heading with expected content', async ({
      page,
    }) => {
      const h2 = page.locator('h2#about-heading')
      await expect(h2).toContainText('Quem faz acontecer')
    })

    test('should render four trait list items', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const items = about.locator('ul li')
      await expect(items).toHaveCount(4)
    })

    test('should render icon container for each trait', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const icons = about.locator('ul li svg')
      await expect(icons).toHaveCount(4)
    })

    test('should render all trait texts', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      await expect(
        about.getByText('criou o Faladoria, na marra!')
      ).toBeVisible()
      await expect(
        about.getByText('o poder maior, está nas mãos da população')
      ).toBeVisible()
      await expect(about.getByText('direitos respeitados.')).toBeVisible()
      await expect(about.getByText('conta com você.')).toBeVisible()
    })

    test('should render founder name and role overlaying the photo', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      await expect(
        about.locator('p', { hasText: /^Simone Celina$/ })
      ).toBeVisible()
      await expect(
        about.locator('p', { hasText: /^Fundadora do Faladoria$/ })
      ).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('h2 should be the labelling element for the section', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      const labelledbyId = await about.getAttribute('aria-labelledby')
      const h2Id = await about.locator('h2#about-heading').getAttribute('id')
      expect(labelledbyId).toBe(h2Id)
    })

    test('should have screen-reader-only description paragraph', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      const srDescription = about.locator('p.sr-only')
      await expect(srDescription).toBeAttached()

      const descText = await srDescription.textContent()
      expect(descText).toContain('Simone Celina')
      expect(descText).toContain('Faladoria')
      expect(descText).toContain('SUS')
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
      await expect(h2).toBeAttached()
    })

    test('should use figure with figcaption for founder photo', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      const photoFigure = about.locator('figure:has(img)')
      const figcaption = photoFigure.locator('figcaption')
      await expect(photoFigure).toBeAttached()
      await expect(figcaption).toBeAttached()
      await expect(figcaption).toContainText('Simone Celina')
      await expect(figcaption).toContainText('Fundadora do Faladoria')
    })

    test('should have aria-hidden on trait icons', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const icons = about.locator('ul li svg')
      const count = await icons.count()
      expect(count).toBe(4)

      for (let i = 0; i < count; i++) {
        await expect(icons.nth(i)).toHaveAttribute('aria-hidden', 'true')
      }
    })

    test('should have alt text on founder image', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const img = about.locator('img')
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt!.length).toBeGreaterThan(10)
    })

    test('should have aria-label on traits list', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const list = about.locator('ul')
      const label = await list.getAttribute('aria-label')
      expect(label).toBeTruthy()
    })
  })

  test.describe('Responsive Layout', () => {
    test('should render founder image with proper dimensions', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      const img = about.locator('img')
      await expect(img).toHaveAttribute('width', '400')
      await expect(img).toHaveAttribute('height', '751')
      await expect(img).toHaveAttribute('loading', 'lazy')
      await expect(img).toHaveAttribute('decoding', 'async')
    })

    test.describe('Desktop', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(ABOUT_SECTION).waitFor({ timeout: 15000 })
      })

      test('should use full viewport height', async ({ page }) => {
        const about = page.locator(ABOUT_SECTION)
        const box = await about.boundingBox()
        expect(box).toBeTruthy()
        expect(box!.height).toBeGreaterThanOrEqual(800 * 0.9)
      })

      test('should display two-column layout with traits left and photo right', async ({
        page,
      }) => {
        const about = page.locator(ABOUT_SECTION)
        const img = about.locator('img')
        const list = about.locator('ul')

        const imgBox = await img.boundingBox()
        const listBox = await list.boundingBox()

        expect(imgBox).toBeTruthy()
        expect(listBox).toBeTruthy()
        expect(listBox!.x + listBox!.width).toBeLessThan(imgBox!.x)
      })
    })

    test.describe('Mobile', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(ABOUT_SECTION).waitFor({ timeout: 15000 })
      })

      test('should display single-column layout with traits above photo', async ({
        page,
      }) => {
        const about = page.locator(ABOUT_SECTION)
        const img = about.locator('img')
        const list = about.locator('ul')

        const imgBox = await img.boundingBox()
        const listBox = await list.boundingBox()

        expect(imgBox).toBeTruthy()
        expect(listBox).toBeTruthy()
        expect(listBox!.y).toBeLessThan(imgBox!.y)
      })
    })
  })
})
