import { expect, test } from '@playwright/test'

import { parseJsonLdScripts } from '../helpers/jsonLd'

type JsonLd = Record<string, unknown>

test.describe('GuideCategoryPage', () => {
  test.describe('Valid category (seus-direitos)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/guia-do-sus/seus-direitos', {
        waitUntil: 'domcontentloaded',
      })
      await page.locator('h1').waitFor({ timeout: 15000 })
    })

    test.describe('Rendering & Structure', () => {
      test('should render the category heading', async ({ page }) => {
        const h1 = page.locator('h1')
        await expect(h1).toBeVisible()
        await expect(h1).toContainText('Seus Direitos')
      })

      test('should render the category description', async ({ page }) => {
        await expect(
          page.getByText('Conheça seus direitos como usuário do SUS')
        ).toBeVisible()
      })

      test('should render the "coming soon" placeholder', async ({ page }) => {
        await expect(page.getByText('Conteúdo em breve')).toBeVisible()
      })

      test('should render the breadcrumb navigation', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        await expect(breadcrumb).toBeVisible()

        await expect(breadcrumb.getByText('Início')).toBeVisible()
        await expect(breadcrumb.getByText('Guia do SUS')).toBeVisible()
        await expect(breadcrumb.getByText('Seus Direitos')).toBeVisible()
      })

      test('should have correct breadcrumb links', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')

        const homeLink = breadcrumb.getByText('Início')
        await expect(homeLink).toHaveAttribute('href', '/')

        const guideLink = breadcrumb.getByText('Guia do SUS')
        await expect(guideLink).toHaveAttribute('href', '/guia-do-sus')
      })

      test('should mark the current page in breadcrumb', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        const currentItem = breadcrumb.locator('[aria-current="page"]')

        await expect(currentItem).toBeVisible()
        await expect(currentItem).toContainText('Seus Direitos')
      })
    })

    test.describe('SEO', () => {
      test('should set the document title', async ({ page }) => {
        await expect(page).toHaveTitle(/Seus Direitos.*Guia do SUS.*Faladoria/)
      })

      test('should set the meta description', async ({ page }) => {
        const description = await page
          .locator('meta[name="description"]')
          .getAttribute('content')

        expect(description).toContain('direitos')
        expect(description).toContain('SUS')
      })

      test('should render breadcrumb structured data', async ({ page }) => {
        const scripts = await parseJsonLdScripts(page)

        const breadcrumb = (scripts as JsonLd[]).find(
          d => d['@type'] === 'BreadcrumbList'
        )

        expect(breadcrumb).toBeTruthy()
        expect(breadcrumb!.itemListElement).toHaveLength(3)
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
        expect(ariaLabel).toContain('Seus Direitos')
      })

      test('should use semantic article element', async ({ page }) => {
        const article = page.locator('article')
        await expect(article).toBeAttached()
      })

      test('should use semantic header inside article', async ({ page }) => {
        const header = page.locator('article header')
        await expect(header).toBeAttached()
      })

      test('should have breadcrumb with aria-label', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        await expect(breadcrumb).toBeAttached()
      })

      test('should use ordered list for breadcrumb items', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        const ol = breadcrumb.locator('ol')
        await expect(ol).toBeAttached()
      })

      test('should have aria-hidden on breadcrumb separators', async ({
        page,
      }) => {
        const separators = page.locator(
          'nav[aria-label="Breadcrumb"] li[aria-hidden="true"]'
        )
        const count = await separators.count()
        expect(count).toBe(2)
      })
    })
  })

  test.describe('Responsive Layout', () => {
    test.describe('Desktop', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto('/guia-do-sus/seus-direitos', {
          waitUntil: 'domcontentloaded',
        })
        await page.locator('h1').waitFor({ timeout: 15000 })
      })

      test('should render the article centered with constrained width', async ({
        page,
      }) => {
        const article = page.locator('article')
        const articleBox = await article.boundingBox()
        const viewportWidth = 1280

        expect(articleBox).toBeTruthy()
        // Article should be narrower than the viewport (max-w-3xl constraint)
        expect(articleBox!.width).toBeLessThan(viewportWidth)
        // Article should be horizontally centered
        const leftMargin = articleBox!.x
        const rightMargin = viewportWidth - (articleBox!.x + articleBox!.width)
        expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(5)
      })
    })

    test.describe('Mobile', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/guia-do-sus/seus-direitos', {
          waitUntil: 'domcontentloaded',
        })
        await page.locator('h1').waitFor({ timeout: 15000 })
      })

      test('should render the article filling most of the viewport width', async ({
        page,
      }) => {
        const article = page.locator('article')
        const articleBox = await article.boundingBox()

        expect(articleBox).toBeTruthy()
        // On mobile, article should use most of the available width
        expect(articleBox!.width).toBeGreaterThan(300)
      })

      test('should render the breadcrumb without horizontal overflow', async ({
        page,
      }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        const breadcrumbBox = await breadcrumb.boundingBox()

        expect(breadcrumbBox).toBeTruthy()
        expect(breadcrumbBox!.width).toBeLessThanOrEqual(375)
      })
    })
  })

  test.describe('Invalid category', () => {
    test('should redirect to guide page for unknown slugs', async ({
      page,
    }) => {
      await page.goto('/guia-do-sus/slug-invalido', {
        waitUntil: 'domcontentloaded',
      })

      await page.waitForURL('/guia-do-sus', { timeout: 10000 })

      const h1 = page.locator('h1')
      await expect(h1).toContainText('Como conseguir pelo SUS')
    })
  })
})
