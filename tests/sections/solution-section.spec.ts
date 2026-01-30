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

    test('should render exactly 4 pillar cards', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const pillars = section.locator('ul > li')

      await expect(pillars).toHaveCount(4)
    })

    test('should render each pillar with icon, title and description', async ({
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
    })

    test('should render all 4 pillar titles', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const titles = section.locator('ul h4')

      await expect(titles.nth(0)).toContainText('Canal independente')
      await expect(titles.nth(1)).toContainText('Mediação ativa')
      await expect(titles.nth(2)).toContainText('Transparência')
      await expect(titles.nth(3)).toContainText('Relatórios estratégicos')
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

    test('should have descriptive alt text on all pillar icons', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const images = section.locator('ul img')

      const count = await images.count()
      expect(count).toBe(4)

      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt')
        expect(alt).toBeTruthy()
        expect(alt!.length).toBeGreaterThan(5)
      }
    })

    test('should use semantic list markup for pillars', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const list = section.locator('ul')

      await expect(list).toBeVisible()

      const items = list.locator('> li')
      await expect(items).toHaveCount(4)
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
      await expect(h4s).toHaveCount(4)
    })
  })

  test.describe('Responsive Layout', () => {
    test('should stack pillar cards vertically on mobile', async ({ page }) => {
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

    test('should display pillar cards in 2 columns on tablet', async ({
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

    test('should display all 4 pillar cards in a row on desktop', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 })

      const section = page.locator(
        'section[aria-labelledby="solution-heading"]'
      )
      const pillars = section.locator('ul > li')

      const firstBounds = await pillars.nth(0).boundingBox()
      const secondBounds = await pillars.nth(1).boundingBox()
      const thirdBounds = await pillars.nth(2).boundingBox()
      const fourthBounds = await pillars.nth(3).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()
      expect(thirdBounds).toBeTruthy()
      expect(fourthBounds).toBeTruthy()

      // All 4 should be on the same row
      expect(firstBounds!.y).toBeCloseTo(secondBounds!.y, -1)
      expect(secondBounds!.y).toBeCloseTo(thirdBounds!.y, -1)
      expect(thirdBounds!.y).toBeCloseTo(fourthBounds!.y, -1)
    })
  })
})
