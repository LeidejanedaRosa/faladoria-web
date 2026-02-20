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
        section.getByText('Um guia prático e completo')
      ).toBeVisible()
    })

    test('should render exactly 3 highlight cards', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const cards = section.locator('a[href^="/guia-do-sus/"]')
      await expect(cards).toHaveCount(3)
    })

    test('should render card labels for highlighted categories', async ({
      page,
    }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)

      await expect(
        section.getByRole('heading', { name: 'Seus Direitos', level: 3 })
      ).toBeVisible()
      await expect(
        section.getByRole('heading', { name: 'Como Conseguir', level: 3 })
      ).toBeVisible()
      await expect(
        section.getByRole('heading', { name: 'Vacinação', level: 3 })
      ).toBeVisible()
    })

    test('should render card descriptions', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const cards = section.locator('a[href^="/guia-do-sus/"]')

      for (let i = 0; i < 3; i++) {
        const description = cards.nth(i).locator('p')
        const text = await description.textContent()
        expect(text?.trim().length).toBeGreaterThan(10)
      }
    })

    test('should render the CTA link', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const cta = section.getByText('Explorar o Guia')

      await expect(cta).toBeVisible()
      await expect(cta).toHaveAttribute('href', '/guia-do-sus')
    })
  })

  test.describe('Accessibility', () => {
    test('should have aria-labelledby pointing to h2', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const labelledbyId = await section.getAttribute('aria-labelledby')
      const h2Id = await section
        .locator('h2#guide-highlight-heading')
        .getAttribute('id')

      expect(labelledbyId).toBe(h2Id)
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

    test('should have aria-hidden on all card icons', async ({ page }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const icons = section.locator('a[href^="/guia-do-sus/"] svg')

      const count = await icons.count()
      expect(count).toBe(3)

      for (let i = 0; i < count; i++) {
        await expect(icons.nth(i)).toHaveAttribute('aria-hidden', 'true')
      }
    })

    test('should have correct heading hierarchy (h2 > h3)', async ({
      page,
    }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const h2 = section.locator('h2')
      const h3s = section.locator('h3')

      await expect(h2).toHaveCount(1)
      await expect(h3s).toHaveCount(3)
    })

    test('should have focus indicators on all interactive elements', async ({
      page,
    }) => {
      const section = page.locator(GUIDE_HIGHLIGHT)
      const links = section.locator('a')

      const count = await links.count()
      expect(count).toBe(4) // 3 cards + 1 CTA
    })
  })

  test.describe('Responsive Layout', () => {
    test.describe('Desktop', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(GUIDE_HIGHLIGHT).waitFor({ timeout: 15000 })
      })

      test('should render cards in a 3-column grid', async ({ page }) => {
        const section = page.locator(GUIDE_HIGHLIGHT)
        const cards = section.locator('a[href^="/guia-do-sus/"]')

        const firstBox = await cards.nth(0).boundingBox()
        const secondBox = await cards.nth(1).boundingBox()

        expect(firstBox).toBeTruthy()
        expect(secondBox).toBeTruthy()

        // Cards should be side by side
        expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(5)
        expect(secondBox!.x).toBeGreaterThan(firstBox!.x)
      })
    })

    test.describe('Mobile', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(GUIDE_HIGHLIGHT).waitFor({ timeout: 15000 })
      })

      test('should render cards in a single column', async ({ page }) => {
        const section = page.locator(GUIDE_HIGHLIGHT)
        const cards = section.locator('a[href^="/guia-do-sus/"]')

        const firstBox = await cards.nth(0).boundingBox()
        const secondBox = await cards.nth(1).boundingBox()

        expect(firstBox).toBeTruthy()
        expect(secondBox).toBeTruthy()

        // Cards should be stacked vertically
        expect(secondBox!.y).toBeGreaterThan(firstBox!.y + firstBox!.height - 5)
      })
    })
  })
})
