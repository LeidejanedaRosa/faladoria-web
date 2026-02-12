import { expect, test } from '@playwright/test'

const FAQ_SECTION = 'section[aria-labelledby="faq-heading"]'
const FAQ_ITEM_COUNT = 6

test.describe('FaqSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator(FAQ_SECTION).waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the faq section with aria-labelledby', async ({
      page,
    }) => {
      const faq = page.locator(FAQ_SECTION)
      await expect(faq).toBeVisible()
    })

    test('should render an h2 as the section heading', async ({ page }) => {
      const h2 = page.locator('h2#faq-heading')
      await expect(h2).toBeAttached()
      await expect(h2).toHaveCount(1)
    })

    test('should render the heading with expected content', async ({
      page,
    }) => {
      const h2 = page.locator('h2#faq-heading')
      const text = await h2.textContent()

      expect(text).toContain('Perguntas frequentes')
      expect(text).toContain('Faladoria')
    })

    test('should render the visual heading and description', async ({
      page,
    }) => {
      const faq = page.locator(FAQ_SECTION)

      await expect(
        faq.locator('h3', { hasText: 'Perguntas frequentes' })
      ).toBeVisible()
      await expect(
        faq.locator('p', { hasText: 'Tire suas dúvidas' })
      ).toBeVisible()
    })

    test('should render all FAQ items', async ({ page }) => {
      const faq = page.locator(FAQ_SECTION)
      const items = faq.locator('details')

      await expect(items).toHaveCount(FAQ_ITEM_COUNT)
    })

    test('each FAQ item should have a question in the summary', async ({
      page,
    }) => {
      const faq = page.locator(FAQ_SECTION)
      const summaries = faq.locator('details summary')

      const count = await summaries.count()
      expect(count).toBe(FAQ_ITEM_COUNT)

      for (let i = 0; i < count; i++) {
        const text = await summaries.nth(i).textContent()
        expect(text?.trim().length).toBeGreaterThan(10)
      }
    })

    test('each FAQ item should have an answer', async ({ page }) => {
      const faq = page.locator(FAQ_SECTION)
      const answers = faq.locator('details p')

      const count = await answers.count()
      expect(count).toBe(FAQ_ITEM_COUNT)

      for (let i = 0; i < count; i++) {
        const text = await answers.nth(i).textContent()
        expect(text?.trim().length).toBeGreaterThan(20)
      }
    })
  })

  test.describe('Accessibility', () => {
    test('h2 should be the labelling element for the section', async ({
      page,
    }) => {
      const faq = page.locator(FAQ_SECTION)
      const labelledbyId = await faq.getAttribute('aria-labelledby')
      const h2Id = await faq.locator('h2#faq-heading').getAttribute('id')

      expect(labelledbyId).toBe(h2Id)
    })

    test('should have screen-reader-only heading', async ({ page }) => {
      const faq = page.locator(FAQ_SECTION)
      const srHeading = faq.locator('h2.sr-only#faq-heading')

      await expect(srHeading).toBeAttached()
      await expect(srHeading).toContainText('Perguntas frequentes')
    })

    test('should use semantic section element', async ({ page }) => {
      const faq = page.locator(FAQ_SECTION)
      const tagName = await faq.evaluate(el => el.tagName.toLowerCase())

      expect(tagName).toBe('section')
    })

    test('should maintain correct heading hierarchy (h2 under h1)', async ({
      page,
    }) => {
      const h1 = page.locator('h1')
      const h2 = page.locator('h2#faq-heading')

      await expect(h1).toHaveCount(1)
      await expect(h2).toBeAttached()
    })

    test('should have aria-hidden chevron icons', async ({ page }) => {
      const faq = page.locator(FAQ_SECTION)
      const icons = faq.locator('details summary svg')

      const count = await icons.count()
      expect(count).toBe(FAQ_ITEM_COUNT)

      for (let i = 0; i < count; i++) {
        await expect(icons.nth(i)).toHaveAttribute('aria-hidden', 'true')
      }
    })

    test('visual heading should have aria-hidden', async ({ page }) => {
      const faq = page.locator(FAQ_SECTION)
      const visualHeading = faq.locator('h3')

      await expect(visualHeading).toHaveAttribute('aria-hidden', 'true')
    })
  })

  test.describe('Interactivity', () => {
    test('all FAQ items should be closed initially', async ({ page }) => {
      const faq = page.locator(FAQ_SECTION)
      const items = faq.locator('details')

      const count = await items.count()
      for (let i = 0; i < count; i++) {
        const isOpen = await items.nth(i).getAttribute('open')
        expect(isOpen).toBeNull()
      }
    })

    test('clicking a summary should open the FAQ item', async ({ page }) => {
      const faq = page.locator(FAQ_SECTION)
      const firstItem = faq.locator('details').first()
      const firstSummary = firstItem.locator('summary')

      await firstSummary.click()

      await expect(firstItem).toHaveAttribute('open', '')
    })

    test('clicking an open summary should close the FAQ item', async ({
      page,
    }) => {
      const faq = page.locator(FAQ_SECTION)
      const firstItem = faq.locator('details').first()
      const firstSummary = firstItem.locator('summary')

      await firstSummary.click()
      await expect(firstItem).toHaveAttribute('open', '')

      await firstSummary.click()
      const isOpen = await firstItem.getAttribute('open')
      expect(isOpen).toBeNull()
    })

    test('opening a new item should close the previous one (exclusive accordion)', async ({
      page,
    }) => {
      const faq = page.locator(FAQ_SECTION)
      const items = faq.locator('details')

      const firstSummary = items.nth(0).locator('summary')
      const secondSummary = items.nth(1).locator('summary')

      await firstSummary.click()
      await expect(items.nth(0)).toHaveAttribute('open', '')

      await secondSummary.click()
      await expect(items.nth(1)).toHaveAttribute('open', '')

      const firstOpen = await items.nth(0).getAttribute('open')
      expect(firstOpen).toBeNull()
    })

    test('should be keyboard accessible (Enter opens/closes)', async ({
      page,
    }) => {
      const faq = page.locator(FAQ_SECTION)
      const firstSummary = faq.locator('details summary').first()
      const firstItem = faq.locator('details').first()

      await firstSummary.focus()
      await page.keyboard.press('Enter')

      await expect(firstItem).toHaveAttribute('open', '')

      await page.keyboard.press('Enter')
      const isOpen = await firstItem.getAttribute('open')
      expect(isOpen).toBeNull()
    })
  })

  test.describe('SEO', () => {
    test('should have FAQPage JSON-LD structured data', async ({ page }) => {
      const scripts = page.locator('script[type="application/ld+json"]')
      const count = await scripts.count()

      let faqSchema = null
      for (let i = 0; i < count; i++) {
        const content = await scripts.nth(i).textContent()
        if (content) {
          const data = JSON.parse(content)
          if (data['@type'] === 'FAQPage') {
            faqSchema = data
            break
          }
        }
      }

      expect(faqSchema).not.toBeNull()
      expect(faqSchema['@context']).toBe('https://schema.org')
      expect(faqSchema['@type']).toBe('FAQPage')
    })

    test('FAQPage schema should contain all questions and answers', async ({
      page,
    }) => {
      const scripts = page.locator('script[type="application/ld+json"]')
      const count = await scripts.count()

      let faqSchema = null
      for (let i = 0; i < count; i++) {
        const content = await scripts.nth(i).textContent()
        if (content) {
          const data = JSON.parse(content)
          if (data['@type'] === 'FAQPage') {
            faqSchema = data
            break
          }
        }
      }

      expect(faqSchema).not.toBeNull()
      expect(faqSchema.mainEntity).toHaveLength(FAQ_ITEM_COUNT)

      for (const entity of faqSchema.mainEntity) {
        expect(entity['@type']).toBe('Question')
        expect(entity.name).toBeTruthy()
        expect(entity.acceptedAnswer['@type']).toBe('Answer')
        expect(entity.acceptedAnswer.text).toBeTruthy()
      }
    })

    test('should have section id for anchor navigation', async ({ page }) => {
      const faq = page.locator(FAQ_SECTION)
      await expect(faq).toHaveAttribute('id', 'perguntas-frequentes')
    })
  })

  test.describe('Responsive Layout', () => {
    test('FAQ items should be contained within max-width for readability', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto('/', { waitUntil: 'domcontentloaded' })
      await page.locator(FAQ_SECTION).waitFor({ timeout: 15000 })

      const faq = page.locator(FAQ_SECTION)
      const firstItem = faq.locator('details').first()
      const itemBox = await firstItem.boundingBox()

      expect(itemBox).toBeTruthy()
      // max-w-3xl = 768px, items should not exceed this
      expect(itemBox!.width).toBeLessThanOrEqual(780)
    })

    test.describe('Mobile', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(FAQ_SECTION).waitFor({ timeout: 15000 })
      })

      test('should render FAQ items full-width on mobile', async ({ page }) => {
        const faq = page.locator(FAQ_SECTION)
        const firstItem = faq.locator('details').first()
        const sectionBox = await faq.boundingBox()
        const itemBox = await firstItem.boundingBox()

        expect(sectionBox).toBeTruthy()
        expect(itemBox).toBeTruthy()

        // Item should occupy most of the section width (accounting for padding)
        expect(itemBox!.width).toBeGreaterThan(sectionBox!.width * 0.8)
      })
    })
  })
})
