import { expect, test } from '@playwright/test'

import { parseJsonLdScripts } from '../helpers/jsonLd'

type JsonLd = Record<string, unknown>

test.describe('GuidePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guia-do-sus', { waitUntil: 'domcontentloaded' })
    await page.locator('h1').waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the hero section with h1', async ({ page }) => {
      const h1 = page.locator('h1#guide-heading')
      await expect(h1).toBeVisible()
      await expect(h1).toContainText('Como conseguir pelo SUS')
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
      const h2 = page.getByText('Escolha um tema para começar')
      await expect(h2).toBeVisible()
    })

    test('should render all 6 category cards', async ({ page }) => {
      const cards = page.locator('a[href^="/guia-do-sus/"]')
      await expect(cards).toHaveCount(6)
    })

    test('should render all category labels', async ({ page }) => {
      const expectedLabels = [
        'Seus Direitos',
        'Como funciona o SUS',
        'Como Conseguir',
        'Vacinação',
        'Prevenção',
        'Denuncie',
      ]

      for (const label of expectedLabels) {
        await expect(page.getByText(label, { exact: true })).toBeVisible()
      }
    })

    test('should have correct card links', async ({ page }) => {
      const expectedSlugs = [
        'seus-direitos',
        'como-funciona-o-sus',
        'como-conseguir',
        'vacinacao',
        'prevencao',
        'denuncie',
      ]

      for (const slug of expectedSlugs) {
        const card = page.locator(`a[href="/guia-do-sus/${slug}"]`)
        await expect(card).toBeAttached()
      }
    })
  })

  test.describe('SEO', () => {
    test('should set the document title', async ({ page }) => {
      await expect(page).toHaveTitle(/Guia do SUS.*Faladoria/)
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
      expect(collectionPage!.name).toBe('Guia do SUS')
      expect(collectionPage!.url).toContain('/guia-do-sus')
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
      expect(ariaLabel).toContain('Guia do SUS')
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

    test('should have aria-hidden on all card icons', async ({ page }) => {
      const icons = page.locator('a[href^="/guia-do-sus/"] svg')
      const count = await icons.count()
      expect(count).toBe(6)

      for (let i = 0; i < count; i++) {
        await expect(icons.nth(i)).toHaveAttribute('aria-hidden', 'true')
      }
    })

    test('should have correct heading hierarchy (h1 > h2 > h3)', async ({
      page,
    }) => {
      const h1 = page.locator('h1')
      const h2 = page.locator('section h2')
      const h3s = page.locator('a[href^="/guia-do-sus/"] h3')

      await expect(h1).toHaveCount(1)
      await expect(h2).toHaveCount(1)
      await expect(h3s).toHaveCount(6)
    })
  })

  test.describe('Navigation', () => {
    test('should navigate to category page when clicking a card', async ({
      page,
    }) => {
      const card = page.locator('a[href="/guia-do-sus/seus-direitos"]')
      await card.click()

      await page.waitForURL('/guia-do-sus/seus-direitos', { timeout: 10000 })

      const h1 = page.locator('h1')
      await expect(h1).toContainText('Seus Direitos')
    })

    test('should navigate back to guide page via breadcrumb', async ({
      page,
    }) => {
      await page.locator('a[href="/guia-do-sus/seus-direitos"]').click()
      await page.waitForURL('/guia-do-sus/seus-direitos', { timeout: 10000 })

      const breadcrumbGuideLink = page
        .locator('nav[aria-label="Breadcrumb"]')
        .getByText('Guia do SUS')
      await breadcrumbGuideLink.click()

      await page.waitForURL('/guia-do-sus', { timeout: 10000 })

      const h1 = page.locator('h1')
      await expect(h1).toContainText('Como conseguir pelo SUS')
    })
  })

  test.describe('Responsive Layout', () => {
    test.describe('Desktop', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto('/guia-do-sus', { waitUntil: 'domcontentloaded' })
        await page.locator('h1').waitFor({ timeout: 15000 })
      })

      test('should render category cards in 3-column grid', async ({
        page,
      }) => {
        const cards = page.locator('a[href^="/guia-do-sus/"]')
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
        await page.goto('/guia-do-sus', { waitUntil: 'domcontentloaded' })
        await page.locator('h1').waitFor({ timeout: 15000 })
      })

      test('should render category cards in 2-column grid', async ({
        page,
      }) => {
        const cards = page.locator('a[href^="/guia-do-sus/"]')
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
