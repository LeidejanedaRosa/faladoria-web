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
      await expect(h2).toBeAttached()
      await expect(h2).toHaveCount(1)
    })

    test('should render the heading with expected content', async ({
      page,
    }) => {
      const h2 = page.locator('h2#about-heading')
      const text = await h2.textContent()

      expect(text).toContain('Quem somos')
      expect(text).toContain('Faladoria')
    })

    test('should render founder name and role overlaying the photo', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)

      // Target visible <p> elements (excludes sr-only <figcaption>)
      await expect(
        about.locator('p', { hasText: /^Simone Celina$/ })
      ).toBeVisible()
      await expect(about.locator('p', { hasText: /^Fundadora$/ })).toBeVisible()
    })

    test('should render the founder quote block', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const blockquote = about.locator('blockquote')

      await expect(blockquote).toBeVisible()
    })

    test('should render four partnership cards', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const cards = about.locator('ul li')

      await expect(cards).toHaveCount(4)
    })

    test('should render partnership labels', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)

      await expect(about.getByText('Gestão pública')).toBeVisible()
      await expect(about.getByText('Pesquisa acadêmica')).toBeVisible()
      await expect(about.getByText('Tecnologia e saúde')).toBeVisible()
      await expect(about.getByText('Mídia e sociedade civil')).toBeVisible()
    })

    test('should render partnerships label', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)

      await expect(
        about.getByText('Parcerias estratégicas', { exact: true })
      ).toBeVisible()
    })

    test('should render partnership card descriptions', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const cards = about.locator('ul li')

      for (let i = 0; i < 4; i++) {
        const description = cards.nth(i).locator('p')
        await expect(description).toBeAttached()

        const text = await description.textContent()
        expect(text?.trim().length).toBeGreaterThan(10)
      }
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

    test('should have screen-reader-only heading and description', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)

      const srHeading = about.locator('h2.sr-only#about-heading')
      await expect(srHeading).toBeAttached()
      await expect(srHeading).toContainText('Quem somos')

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

    test('should use figure with blockquote for the founder citation', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      const figure = about.locator('figure')
      const blockquote = figure.locator('blockquote')

      await expect(figure).toBeAttached()
      await expect(blockquote).toBeAttached()
      await expect(blockquote).toContainText('saúde pública')
    })

    test('should have figcaption with cite for founder attribution', async ({
      page,
    }) => {
      const about = page.locator(ABOUT_SECTION)
      const figcaption = about.locator('figure figcaption')
      const cite = figcaption.locator('cite')

      await expect(figcaption).toBeAttached()
      await expect(cite).toBeAttached()
      await expect(cite).toContainText('Simone Celina')
    })

    test('should have aria-label on partnership list', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const list = about.locator('ul')

      await expect(list).toHaveAttribute('aria-label', 'Parcerias estratégicas')
    })

    test('should have aria-hidden on partnership card icons', async ({
      page,
    }) => {
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

    test('should render partnership cards as a grid', async ({ page }) => {
      const about = page.locator(ABOUT_SECTION)
      const cards = about.locator('ul li')
      const firstCard = await cards.nth(0).boundingBox()

      expect(firstCard).toBeTruthy()
      expect(firstCard!.width).toBeGreaterThan(100)
      expect(firstCard!.height).toBeGreaterThan(80)
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

      test('should display two-column layout', async ({ page }) => {
        const about = page.locator(ABOUT_SECTION)
        const img = about.locator('img')
        const blockquote = about.locator('blockquote')

        const imgBox = await img.boundingBox()
        const quoteBox = await blockquote.boundingBox()

        expect(imgBox).toBeTruthy()
        expect(quoteBox).toBeTruthy()

        // On desktop, the quote (left) should be to the left of the image (right)
        expect(quoteBox!.x + quoteBox!.width).toBeLessThan(imgBox!.x)
      })

      test('should render partnership cards in 4-column grid', async ({
        page,
      }) => {
        const about = page.locator(ABOUT_SECTION)
        const cards = about.locator('ul li')

        const firstBox = await cards.nth(0).boundingBox()
        const secondBox = await cards.nth(1).boundingBox()

        expect(firstBox).toBeTruthy()
        expect(secondBox).toBeTruthy()

        // Cards should be side by side (same y, different x)
        expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(5)
        expect(secondBox!.x).toBeGreaterThan(firstBox!.x)
      })
    })

    test.describe('Mobile', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(ABOUT_SECTION).waitFor({ timeout: 15000 })
      })

      test('should display single-column layout', async ({ page }) => {
        const about = page.locator(ABOUT_SECTION)
        const img = about.locator('img')
        const blockquote = about.locator('blockquote')

        const imgBox = await img.boundingBox()
        const quoteBox = await blockquote.boundingBox()

        expect(imgBox).toBeTruthy()
        expect(quoteBox).toBeTruthy()

        // On mobile with flex-col, text appears above the photo
        expect(quoteBox!.y).toBeLessThan(imgBox!.y)
      })
    })
  })
})
