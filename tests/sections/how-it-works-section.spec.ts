import { expect, test } from '@playwright/test'

test.describe('HowItWorksSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page
      .locator('section[aria-labelledby="how-it-works-heading"]')
      .waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the section with aria-labelledby', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      await expect(section).toBeVisible()
    })

    test('should render the section with id for navigation anchor', async ({
      page,
    }) => {
      const section = page.locator('section#como-funciona')
      await expect(section).toBeVisible()
    })

    test('should render the headline as h3', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const headline = section.locator('h3').first()

      await expect(headline).toBeVisible()
      await expect(headline).toContainText('Da denúncia à solução')
    })

    test('should render the subtitle mentioning WhatsApp', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const subtitle = section.locator('p').filter({
        hasText: 'WhatsApp',
      })

      await expect(subtitle).toBeVisible()
    })

    test('should render exactly 4 step cards', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const steps = section.locator('ol > li')

      await expect(steps).toHaveCount(4)
    })

    test('should render each step with image, title and description', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const steps = section.locator('ol > li')

      for (let i = 0; i < 4; i++) {
        const step = steps.nth(i)

        await expect(step.locator('img')).toBeVisible()
        await expect(step.locator('h4')).toBeVisible()
        await expect(step.locator('p').last()).toBeVisible()
      }
    })

    test('should render all 4 step titles', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const titles = section.locator('ol h4')

      await expect(titles.nth(0)).toContainText('Conte seu problema')
      await expect(titles.nth(1)).toContainText('A gente leva pra quem resolve')
      await expect(titles.nth(2)).toContainText('Acompanhe de perto')
      await expect(titles.nth(3)).toContainText('Seu problema resolvido')
    })

    test('should render step numbers 1 through 4', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const numbers = section.locator('ol > li span[aria-hidden="true"]')

      await expect(numbers).toHaveCount(4)
      await expect(numbers.nth(0)).toHaveText('1')
      await expect(numbers.nth(1)).toHaveText('2')
      await expect(numbers.nth(2)).toHaveText('3')
      await expect(numbers.nth(3)).toHaveText('4')
    })
  })

  test.describe('Accessibility', () => {
    test('should have a screen-reader-only section heading', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const srHeading = section.locator('#how-it-works-heading')

      await expect(srHeading).toBeAttached()

      const text = await srHeading.textContent()
      expect(text).toContain('funciona')
    })

    test('should have descriptive alt text on all step images', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const images = section.locator('ol img')

      const count = await images.count()
      expect(count).toBe(4)

      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt')
        expect(alt).toBeTruthy()
        expect(alt!.length).toBeGreaterThan(10)
      }
    })

    test('should use ordered list markup for sequential steps', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const list = section.locator('ol')

      await expect(list).toBeVisible()

      const items = list.locator('> li')
      await expect(items).toHaveCount(4)
    })

    test('should maintain proper heading hierarchy (h3 > h4)', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const h3 = section.locator('h3')
      const h4s = section.locator('h4')

      await expect(h3).toHaveCount(1)
      await expect(h4s).toHaveCount(4)
    })

    test('should hide step numbers from screen readers', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const numbers = section.locator('ol > li span[aria-hidden="true"]')

      const count = await numbers.count()
      expect(count).toBe(4)
    })
  })

  test.describe('Image Performance', () => {
    test('should have explicit width and height on all images', async ({
      page,
    }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const images = section.locator('ol img')

      for (let i = 0; i < 4; i++) {
        await expect(images.nth(i)).toHaveAttribute('width')
        await expect(images.nth(i)).toHaveAttribute('height')
      }
    })

    test('should have lazy loading on all images', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const images = section.locator('ol img')

      for (let i = 0; i < 4; i++) {
        await expect(images.nth(i)).toHaveAttribute('loading', 'lazy')
      }
    })

    test('should have async decoding on all images', async ({ page }) => {
      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const images = section.locator('ol img')

      for (let i = 0; i < 4; i++) {
        await expect(images.nth(i)).toHaveAttribute('decoding', 'async')
      }
    })
  })

  test.describe('Responsive Layout', () => {
    test('should stack step cards vertically on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const steps = section.locator('ol > li')

      const firstBounds = await steps.nth(0).boundingBox()
      const secondBounds = await steps.nth(1).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()

      expect(secondBounds!.y).toBeGreaterThan(firstBounds!.y)
    })

    test('should display step cards in 2 columns on tablet', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 768, height: 1024 })

      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const steps = section.locator('ol > li')

      const firstBounds = await steps.nth(0).boundingBox()
      const secondBounds = await steps.nth(1).boundingBox()
      const thirdBounds = await steps.nth(2).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()
      expect(thirdBounds).toBeTruthy()

      expect(firstBounds!.y).toBeCloseTo(secondBounds!.y, -1)
      expect(thirdBounds!.y).toBeGreaterThan(firstBounds!.y)
    })

    test('should display all 4 step cards in a row on desktop', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 })

      const section = page.locator(
        'section[aria-labelledby="how-it-works-heading"]'
      )
      const steps = section.locator('ol > li')

      const firstBounds = await steps.nth(0).boundingBox()
      const secondBounds = await steps.nth(1).boundingBox()
      const thirdBounds = await steps.nth(2).boundingBox()
      const fourthBounds = await steps.nth(3).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()
      expect(thirdBounds).toBeTruthy()
      expect(fourthBounds).toBeTruthy()

      expect(firstBounds!.y).toBeCloseTo(secondBounds!.y, -1)
      expect(secondBounds!.y).toBeCloseTo(thirdBounds!.y, -1)
      expect(thirdBounds!.y).toBeCloseTo(fourthBounds!.y, -1)
    })
  })
})
