import { expect, test } from '@playwright/test'

test.describe('ProblemSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page
      .locator('section[aria-labelledby="problem-heading"]')
      .waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the section with aria-labelledby', async ({ page }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      await expect(section).toBeVisible()
    })

    test('should render the news headline as h3', async ({ page }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const newsHeadline = section.locator('h3').first()

      await expect(newsHeadline).toBeVisible()
      await expect(newsHeadline).toContainText('desafios enfrentados')
    })

    test('should render exactly 3 news article cards', async ({ page }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const articles = section.locator('article')

      await expect(articles).toHaveCount(3)
    })

    test('should render each news card with image, title and source', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const articles = section.locator('article')

      for (let i = 0; i < 3; i++) {
        const article = articles.nth(i)

        await expect(article.locator('img')).toBeVisible()
        await expect(article.locator('a')).toBeVisible()
        await expect(article.locator('strong')).toContainText('Fonte:')
      }
    })

    test('should render the statistic value', async ({ page }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const statValue = section.locator('p[aria-hidden="true"]')

      await expect(statValue).toBeVisible()
      await expect(statValue).toHaveText('93%')
    })

    test('should render the people grid visualization', async ({ page }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const grid = section.locator('[role="img"]')

      await expect(grid).toBeVisible()
    })

    test('should render the CTA block with h3, description and button', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const ctaHeading = section.locator('h3').filter({
        hasText: 'Você já viveu algum desses problemas?',
      })

      await expect(ctaHeading).toBeVisible()

      const ctaDescription = section.locator('p').filter({
        hasText: 'Sua história importa',
      })
      await expect(ctaDescription).toBeVisible()

      const ctaButton = section.locator(
        'a[aria-label="Compartilhar sua experiência no WhatsApp (abre em nova aba)"]'
      )
      await expect(ctaButton).toBeVisible()
    })

    test('should render the intro description paragraph', async ({ page }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const intro = section.locator('p').filter({
        hasText: 'Milhões de brasileiros enfrentam filas',
      })

      await expect(intro).toBeVisible()
    })
  })

  test.describe('CTAs & Navigation', () => {
    test('should render WhatsApp CTA with correct external link attributes', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const cta = section.locator(
        'a[aria-label="Compartilhar sua experiência no WhatsApp (abre em nova aba)"]'
      )

      await expect(cta).toHaveAttribute('href', /^https:\/\/wa\.me\/\d+$/)
      await expect(cta).toHaveAttribute('target', '_blank')
      await expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('should render news article links as external links', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const articleLinks = section.locator('article a')

      for (let i = 0; i < 3; i++) {
        const link = articleLinks.nth(i)

        await expect(link).toHaveAttribute('target', '_blank')
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        await expect(link).toHaveAttribute('href', /^https:\/\//)
      }
    })

    test('should render the Datafolha source link as external', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const sourceLink = section.locator('a').filter({
        hasText: 'Pesquisa Datafolha',
      })

      await expect(sourceLink).toHaveAttribute('target', '_blank')
      await expect(sourceLink).toHaveAttribute('rel', 'noopener noreferrer')
      await expect(sourceLink).toHaveAttribute('href', /poder360\.com\.br/)
    })
  })

  test.describe('Accessibility', () => {
    test('should have a screen-reader-only section heading', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const srHeading = section.locator('#problem-heading')

      await expect(srHeading).toBeAttached()

      const text = await srHeading.textContent()
      expect(text).toContain('93%')
      expect(text).toContain('insatisfeita')
    })

    test('should have aria-label on the people grid with descriptive text', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const grid = section.locator('[role="img"]')

      await expect(grid).toHaveAttribute(
        'aria-label',
        /93 de 100 pessoas insatisfeitas/
      )
    })

    test('should render exactly 100 person icons in the grid', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const grid = section.locator('[role="img"]')
      const icons = grid.locator('svg')

      await expect(icons).toHaveCount(100)
    })

    test('should mark all person icons as aria-hidden', async ({ page }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const grid = section.locator('[role="img"]')
      const icons = grid.locator('svg')

      const count = await icons.count()
      for (let i = 0; i < count; i++) {
        await expect(icons.nth(i)).toHaveAttribute('aria-hidden', 'true')
      }
    })

    test('should have screen-reader-only text alternative for the statistic', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const srText = section.locator('.sr-only').filter({
        hasText: '93 de 100 pessoas',
      })

      await expect(srText).toBeAttached()

      const text = await srText.textContent()
      expect(text).toContain('93 de 100 pessoas')
    })

    test('should hide the visual statistic value from screen readers', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const statValue = section.locator('p[aria-hidden="true"]')

      await expect(statValue).toHaveText('93%')
    })

    test('should have descriptive aria-labels on all news article links', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const articleLinks = section.locator('article a')

      for (let i = 0; i < 3; i++) {
        const ariaLabel = await articleLinks.nth(i).getAttribute('aria-label')

        expect(ariaLabel).toBeTruthy()
        expect(ariaLabel).toContain('Fonte:')
        expect(ariaLabel).toContain('abre em nova aba')
      }
    })

    test('should have descriptive alt text on all news images', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const images = section.locator('article img')

      for (let i = 0; i < 3; i++) {
        const alt = await images.nth(i).getAttribute('alt')

        expect(alt).toBeTruthy()
        expect(alt!.length).toBeGreaterThan(10)
      }
    })
  })

  test.describe('Image Performance', () => {
    test('should use picture element with AVIF and WebP sources', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const pictures = section.locator('article picture')

      await expect(pictures).toHaveCount(3)

      for (let i = 0; i < 3; i++) {
        const picture = pictures.nth(i)
        const sources = picture.locator('source')

        await expect(sources).toHaveCount(2)
        await expect(sources.nth(0)).toHaveAttribute('type', 'image/avif')
        await expect(sources.nth(1)).toHaveAttribute('type', 'image/webp')
      }
    })

    test('should have explicit width and height on all images', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const images = section.locator('article img')

      for (let i = 0; i < 3; i++) {
        await expect(images.nth(i)).toHaveAttribute('width')
        await expect(images.nth(i)).toHaveAttribute('height')
      }
    })

    test('should have lazy loading on all images (below the fold)', async ({
      page,
    }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const images = section.locator('article img')

      for (let i = 0; i < 3; i++) {
        await expect(images.nth(i)).toHaveAttribute('loading', 'lazy')
      }
    })

    test('should have async decoding on all images', async ({ page }) => {
      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const images = section.locator('article img')

      for (let i = 0; i < 3; i++) {
        await expect(images.nth(i)).toHaveAttribute('decoding', 'async')
      }
    })
  })

  test.describe('Responsive Layout', () => {
    test('should stack news cards vertically on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const articles = section.locator('article')

      const firstBounds = await articles.nth(0).boundingBox()
      const secondBounds = await articles.nth(1).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()

      // On mobile, articles should be stacked (second below first)
      expect(secondBounds!.y).toBeGreaterThan(firstBounds!.y)
    })

    test('should display news cards in a grid on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })

      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const articles = section.locator('article')

      const firstBounds = await articles.nth(0).boundingBox()
      const secondBounds = await articles.nth(1).boundingBox()
      const thirdBounds = await articles.nth(2).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()
      expect(thirdBounds).toBeTruthy()

      // On xl desktop, all 3 articles should be on the same row
      expect(firstBounds!.y).toBeCloseTo(secondBounds!.y, -1)
      expect(secondBounds!.y).toBeCloseTo(thirdBounds!.y, -1)
    })

    test('should stack statistic blocks vertically on mobile', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const introText = section.locator('p').filter({
        hasText: 'Milhões de brasileiros',
      })
      const grid = section.locator('[role="img"]')

      const introBounds = await introText.boundingBox()
      const gridBounds = await grid.boundingBox()

      expect(introBounds).toBeTruthy()
      expect(gridBounds).toBeTruthy()

      // Intro text should be above the people grid
      expect(gridBounds!.y).toBeGreaterThan(introBounds!.y)
    })

    test('should display statistic blocks side by side on desktop', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 })

      const section = page.locator('section[aria-labelledby="problem-heading"]')
      const introText = section.locator('p').filter({
        hasText: 'Milhões de brasileiros',
      })
      const grid = section.locator('[role="img"]')

      const introBounds = await introText.boundingBox()
      const gridBounds = await grid.boundingBox()

      expect(introBounds).toBeTruthy()
      expect(gridBounds).toBeTruthy()

      // On desktop (md:flex-row), grid should be to the right of intro
      expect(gridBounds!.x).toBeGreaterThan(introBounds!.x)
    })
  })
})
