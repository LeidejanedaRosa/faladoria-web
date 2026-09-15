import { expect, test } from '@playwright/test'

import { parseJsonLdScripts } from '../helpers/jsonLd'

type JsonLd = Record<string, unknown>

const GUIDE_URL = '/como-conseguir-pelo-sus'
const CATEGORY_URL = `${GUIDE_URL}/seus-direitos`

test.describe('GuideCategoryPage', () => {
  test.describe('Valid category (seus-direitos)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(CATEGORY_URL, { waitUntil: 'domcontentloaded' })
      await page.locator('h1').waitFor({ timeout: 15000 })
    })

    test.describe('Rendering & Structure', () => {
      test('should render the category heading', async ({ page }) => {
        const h1 = page.locator('h1')
        await expect(h1).toBeVisible()
        await expect(h1).toContainText('Seus direitos')
      })

      test('should render the category description', async ({ page }) => {
        await expect(
          page.getByText('Seus direitos no SUS e como exigi-los.')
        ).toBeVisible()
      })

      test('should render article cards and not the coming soon placeholder', async ({
        page,
      }) => {
        await expect(page.getByText('Conteúdo em breve')).toBeHidden()
        const articleLinks = page.locator(`a[href^="${CATEGORY_URL}/"]`)
        await expect(articleLinks.first()).toBeVisible()
      })

      test('should render the breadcrumb navigation', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        await expect(breadcrumb).toBeVisible()

        await expect(breadcrumb.getByText('Início')).toBeVisible()
        await expect(breadcrumb.getByText('Guia do SUS')).toBeVisible()
        await expect(breadcrumb.getByText('Seus direitos')).toBeVisible()
      })

      test('should have correct breadcrumb links', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')

        const homeLink = breadcrumb.getByText('Início')
        await expect(homeLink).toHaveAttribute('href', '/')

        const guideLink = breadcrumb.getByText('Guia do SUS')
        await expect(guideLink).toHaveAttribute('href', GUIDE_URL)
      })

      test('should mark the current page in breadcrumb', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        const currentItem = breadcrumb.locator('[aria-current="page"]')

        await expect(currentItem).toBeVisible()
        await expect(currentItem).toContainText('Seus direitos')
      })
    })

    test.describe('SEO', () => {
      test('should set the document title', async ({ page }) => {
        await expect(page).toHaveTitle(/Seus direitos.*Guia do SUS.*Faladoria/)
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

      test('should render CollectionPage structured data', async ({ page }) => {
        const scripts = await parseJsonLdScripts(page)

        const collectionPage = (scripts as JsonLd[]).find(
          d => d['@type'] === 'CollectionPage'
        )

        expect(collectionPage).toBeTruthy()
        expect(collectionPage!.name).toBe('Seus direitos')
        expect(collectionPage!.inLanguage).toBe('pt-BR')
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
        expect(ariaLabel).toContain('Seus direitos')
      })

      test('should use semantic section element for the category listing', async ({
        page,
      }) => {
        const section = page.locator(
          'section[aria-labelledby="category-heading"]'
        )
        await expect(section).toBeAttached()
      })

      test('should use semantic header inside the category section', async ({
        page,
      }) => {
        const header = page.locator(
          'section[aria-labelledby="category-heading"] header'
        )
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

      test('should have 3 breadcrumb items', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        const items = breadcrumb.locator('ol > li')
        await expect(items).toHaveCount(3)
      })
    })
  })

  test.describe('Responsive Layout', () => {
    test.describe('Desktop', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto(CATEGORY_URL, { waitUntil: 'domcontentloaded' })
        await page.locator('h1').waitFor({ timeout: 15000 })
      })

      test('should render the category content centered with constrained width', async ({
        page,
      }) => {
        const section = page.locator(
          'section[aria-labelledby="category-heading"]'
        )
        const sectionBox = await section.boundingBox()
        const viewportWidth = 1280

        expect(sectionBox).toBeTruthy()
        // Content should be narrower than the viewport (Container's max-w-7xl constraint)
        expect(sectionBox!.width).toBeLessThan(viewportWidth)
        // Content should be horizontally centered. Tolerance is wider than a
        // typical CSS rounding error because WebKit reserves scrollbar space
        // differently from Chromium/Firefox, shifting the measured margins by
        // a few extra pixels without any real visual effect.
        const leftMargin = sectionBox!.x
        const rightMargin = viewportWidth - (sectionBox!.x + sectionBox!.width)
        expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(20)
      })
    })

    test.describe('Mobile', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto(CATEGORY_URL, { waitUntil: 'domcontentloaded' })
        await page.locator('h1').waitFor({ timeout: 15000 })
      })

      test('should render the category content filling most of the viewport width', async ({
        page,
      }) => {
        const section = page.locator(
          'section[aria-labelledby="category-heading"]'
        )
        const sectionBox = await section.boundingBox()

        expect(sectionBox).toBeTruthy()
        // On mobile, content should use most of the available width
        expect(sectionBox!.width).toBeGreaterThan(300)
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
      await page.goto(`${GUIDE_URL}/slug-invalido`, {
        waitUntil: 'domcontentloaded',
      })

      await page.waitForURL(GUIDE_URL, { timeout: 10000 })

      const h1 = page.locator('h1')
      await expect(h1).toContainText('Você tem direito à saúde pública.')
    })
  })
})
