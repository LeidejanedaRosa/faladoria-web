import { expect, test } from '@playwright/test'

import { parseJsonLdScripts } from '../helpers/jsonLd'

type JsonLd = Record<string, unknown>

const GUIDE_URL = '/como-conseguir-pelo-sus'

test.describe('GuidePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(GUIDE_URL, { waitUntil: 'domcontentloaded' })
    await page.locator('h1').waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the hero section with h1', async ({ page }) => {
      const h1 = page.locator('h1#guide-heading')
      await expect(h1).toBeVisible()
      await expect(h1).toContainText('Você tem direito à')
    })

    test('should render the hero badge', async ({ page }) => {
      await expect(page.getByText('Guia completo e gratuito')).toBeVisible()
    })

    test('should render the hero description', async ({ page }) => {
      await expect(
        page.getByText('Tudo o que você precisa saber')
      ).toBeVisible()
    })

    test('should render the categories heading', async ({ page }) => {
      const h2 = page.getByText('Encontre o serviço que você precisa')
      await expect(h2).toBeVisible()
    })

    test('should render all 17 category cards', async ({ page }) => {
      const cards = page.locator(`a[href^="${GUIDE_URL}/"]`)
      await expect(cards).toHaveCount(17)
    })

    test('should render representative category labels from each group', async ({
      page,
    }) => {
      const expectedLabels = [
        'Consulta',
        'Saúde da mulher',
        'Vacinação',
        'Seus direitos',
      ]

      for (const label of expectedLabels) {
        await expect(page.getByText(label, { exact: true })).toBeVisible()
      }
    })

    test('should have correct card links for representative categories', async ({
      page,
    }) => {
      const expectedSlugs = [
        'consulta',
        'saude-da-mulher',
        'vacinacao',
        'seus-direitos',
      ]

      for (const slug of expectedSlugs) {
        const card = page.locator(`a[href="${GUIDE_URL}/${slug}"]`)
        await expect(card).toBeAttached()
      }
    })
  })

  test.describe('SEO', () => {
    test('should set the document title', async ({ page }) => {
      await expect(page).toHaveTitle(/Como conseguir pelo SUS.*Faladoria/)
    })

    test('should set the meta description', async ({ page }) => {
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content')

      expect(description).toContain('Guia completo')
      expect(description).toContain('SUS')
    })

    test('should render breadcrumb structured data', async ({ page }) => {
      const scripts = await parseJsonLdScripts(page)

      const breadcrumb = (scripts as JsonLd[]).find(
        d => d['@type'] === 'BreadcrumbList'
      )

      expect(breadcrumb).toBeTruthy()
      expect(breadcrumb!.itemListElement).toHaveLength(2)
    })

    test('should render organization structured data', async ({ page }) => {
      const scripts = await parseJsonLdScripts(page)

      const hasOrg = (scripts as JsonLd[]).some(
        d =>
          d['@type'] === 'Organization' ||
          (d['@graph'] as JsonLd[])?.some(
            item => item['@type'] === 'Organization'
          )
      )
      expect(hasOrg).toBe(true)
    })

    test('should render CollectionPage structured data', async ({ page }) => {
      const scripts = await parseJsonLdScripts(page)

      const collectionPage = (scripts as JsonLd[]).find(
        d => d['@type'] === 'CollectionPage'
      )

      expect(collectionPage).toBeTruthy()
      expect(collectionPage!.name).toBe('Como conseguir pelo SUS')
      expect(collectionPage!.url).toContain('/como-conseguir-pelo-sus')
    })
  })

  test.describe('Accessibility', () => {
    test('should have skip link', async ({ page }) => {
      const skipLink = page.getByText('Pular para o conteúdo principal')
      await expect(skipLink).toBeAttached()
    })

    test('should have main content with aria-label', async ({ page }) => {
      const main = page.locator('main#main-content')
      await expect(main).toBeAttached()

      const ariaLabel = await main.getAttribute('aria-label')
      expect(ariaLabel).toContain('Como conseguir pelo SUS')
    })

    test('should have aria-labelledby on hero section', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="guide-heading"]')
      await expect(hero).toBeAttached()
    })

    test('should have aria-labelledby on categories section', async ({
      page,
    }) => {
      const categories = page.locator(
        'section[aria-labelledby="guide-categories-heading"]'
      )
      await expect(categories).toBeAttached()
    })

    test('should have aria-hidden icon wrappers for all category cards', async ({
      page,
    }) => {
      const iconWrappers = page.locator(
        `a[href^="${GUIDE_URL}/"] div[aria-hidden="true"]`
      )
      await expect(iconWrappers).toHaveCount(17)
    })

    test('should have correct heading hierarchy (h1 > h3 groups > h4 cards)', async ({
      page,
    }) => {
      const h1 = page.locator('h1')
      const groupHeadings = page.locator('section h3')
      const cardHeadings = page.locator(`a[href^="${GUIDE_URL}/"] h4`)

      await expect(h1).toHaveCount(1)
      await expect(groupHeadings).toHaveCount(4)
      await expect(cardHeadings).toHaveCount(17)
    })
  })

  test.describe('Navigation', () => {
    test('should navigate to category page when clicking a card', async ({
      page,
    }) => {
      const card = page.locator(`a[href="${GUIDE_URL}/consulta"]`)
      await card.click()

      await page.waitForURL(`${GUIDE_URL}/consulta`, { timeout: 10000 })

      const h1 = page.locator('h1')
      await expect(h1).toContainText('Consulta')
    })

    test('should navigate back to guide page via breadcrumb', async ({
      page,
    }) => {
      await page.locator(`a[href="${GUIDE_URL}/consulta"]`).click()
      await page.waitForURL(`${GUIDE_URL}/consulta`, { timeout: 10000 })

      const breadcrumbGuideLink = page
        .locator('nav[aria-label="Breadcrumb"]')
        .getByText('Guia do SUS')
      await breadcrumbGuideLink.click()

      await page.waitForURL(GUIDE_URL, { timeout: 10000 })

      const h1 = page.locator('h1')
      await expect(h1).toContainText('Como conseguir pelo SUS')
    })
  })

  test.describe('Responsive Layout', () => {
    test.describe('Desktop', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto(GUIDE_URL, { waitUntil: 'domcontentloaded' })
        await page.locator('h1').waitFor({ timeout: 15000 })
      })

      test('should render category cards in 3-column grid', async ({
        page,
      }) => {
        const cards = page.locator(`a[href^="${GUIDE_URL}/"]`)
        const firstBox = await cards.nth(0).boundingBox()
        const secondBox = await cards.nth(1).boundingBox()
        const thirdBox = await cards.nth(2).boundingBox()

        expect(firstBox).toBeTruthy()
        expect(secondBox).toBeTruthy()
        expect(thirdBox).toBeTruthy()

        // All three should be on the same row
        expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(5)
        expect(Math.abs(secondBox!.y - thirdBox!.y)).toBeLessThan(5)
      })
    })

    test.describe('Mobile', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto(GUIDE_URL, { waitUntil: 'domcontentloaded' })
        await page.locator('h1').waitFor({ timeout: 15000 })
      })

      test('should render category cards in 2-column grid', async ({
        page,
      }) => {
        const cards = page.locator(`a[href^="${GUIDE_URL}/"]`)
        const firstBox = await cards.nth(0).boundingBox()
        const secondBox = await cards.nth(1).boundingBox()

        expect(firstBox).toBeTruthy()
        expect(secondBox).toBeTruthy()

        // First two cards should be side by side
        expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(5)
        expect(secondBox!.x).toBeGreaterThan(firstBox!.x)
      })
    })
  })
})
