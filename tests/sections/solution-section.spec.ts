import { expect, test } from '@playwright/test'

test.describe('SolutionSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page
      .locator('section[aria-labelledby="solution-heading"]')
      .waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the section with aria-labelledby', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      await expect(section).toBeVisible()
    })

    test('should render the section with id for navigation anchor', async ({
      page,
    }) => {
      const section = page.locator('section#solucao')
      await expect(section).toBeVisible()
    })

    test('should render the headline as h3', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const headline = section.locator('h3').first()

      await expect(headline).toBeVisible()
      await expect(headline).toContainText('transforma queixas em soluções')
    })

    test('should render the subtitle', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const subtitle = section.locator('p').filter({
        hasText: 'Dando voz a quem precisa ser ouvido',
      })

      await expect(subtitle).toBeVisible()
    })

    test('should render exactly 5 differentials', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const pillars = section.locator('ul > li')

      await expect(pillars).toHaveCount(5)
    })

    test('should render each differential with an icon, title and description', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const pillars = section.locator('ul > li')

      for (let i = 0; i < 4; i++) {
        const pillar = pillars.nth(i)
        await expect(pillar.locator('img')).toBeVisible()
        await expect(pillar.locator('h4')).toBeVisible()
        await expect(pillar.locator('p')).toBeVisible()
      }

      // 5th differential uses an SVG icon instead of an img
      const lastPillar = pillars.nth(4)
      await expect(lastPillar.locator('svg')).toBeVisible()
      await expect(lastPillar.locator('h4')).toBeVisible()
      await expect(lastPillar.locator('p')).toBeVisible()
    })

    test('should render all 5 differential titles', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const titles = section.locator('ul h4')

      await expect(titles.nth(0)).toContainText('Independência total')
      await expect(titles.nth(1)).toContainText('Atuação ativa')
      await expect(titles.nth(2)).toContainText('Transparência')
      await expect(titles.nth(3)).toContainText('Foco na solução')
      await expect(titles.nth(4)).toContainText('Acessibilidade')
    })
  })

  test.describe('Accessibility', () => {
    test('should have a screen-reader-only section heading', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const srHeading = section.locator('#solution-heading')

      await expect(srHeading).toBeAttached()

      const text = await srHeading.textContent()
      expect(text).toContain('solução')
    })

    test('should have descriptive alt text on image icons', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const images = section.locator('ul img')

      await expect(images).toHaveCount(4)
      const imageCount = await images.count()

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i)
        const altText = await img.getAttribute('alt')
        await expect(img).toHaveAttribute('alt')
        expect(altText?.length).toBeGreaterThan(5)
      }
    })

    test('should use semantic list markup for differentials', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const list = section.locator('ul')

      await expect(list).toBeVisible()

      const items = list.locator('> li')
      await expect(items).toHaveCount(5)
    })

    test('should maintain proper heading hierarchy (h3 > h4)', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const h3 = section.locator('h3')
      const h4s = section.locator('h4')

      await expect(h3).toHaveCount(1)
      await expect(h4s).toHaveCount(5)
    })
  })

  test.describe('Responsive Layout', () => {
    test('should stack differential cards vertically on mobile', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const pillars = section.locator('ul > li')

      const firstBounds = await pillars.nth(0).boundingBox()
      const secondBounds = await pillars.nth(1).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()

      // On mobile, cards should be stacked (second below first)
      expect(secondBounds!.y).toBeGreaterThan(firstBounds!.y)
    })

    test('should display differential cards in 2 columns on tablet', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 768, height: 1024 })

      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const pillars = section.locator('ul > li')

      const firstBounds = await pillars.nth(0).boundingBox()
      const secondBounds = await pillars.nth(1).boundingBox()
      const thirdBounds = await pillars.nth(2).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()
      expect(thirdBounds).toBeTruthy()

      // First and second should be side by side
      expect(firstBounds!.y).toBeCloseTo(secondBounds!.y, -1)

      // Third should be below first
      expect(thirdBounds!.y).toBeGreaterThan(firstBounds!.y)
    })

    test('should display all 5 differential cards in a row on desktop', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 })

      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const pillars = section.locator('ul > li')

      const bounds = await Promise.all(
        Array.from({ length: 5 }, (_, i) => pillars.nth(i).boundingBox())
      )

      bounds.forEach(b => expect(b).toBeTruthy())

      // All 5 should be on the same row
      for (let i = 1; i < 5; i++) {
        expect(bounds[i]!.y).toBeCloseTo(bounds[0]!.y, -1)
      }
    })
  })
})
