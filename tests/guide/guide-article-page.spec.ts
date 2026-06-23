import { expect, test } from '@playwright/test'

import { parseJsonLdScripts } from '../helpers/jsonLd'

type JsonLd = Record<string, unknown>

const GUIDE_URL = '/como-conseguir-pelo-sus'
const CATEGORY_URL = `${GUIDE_URL}/saude-da-mulher`
const ARTICLE_URL = `${CATEGORY_URL}/pre-natal`

test.describe('GuideArticlePage', () => {
  test.describe('Valid article (pre-natal)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(ARTICLE_URL, { waitUntil: 'domcontentloaded' })
      await page.locator('h1').waitFor({ timeout: 15000 })
    })

    test.describe('Rendering & Structure', () => {
      test('should render the article title as h1', async ({ page }) => {
        const h1 = page.locator('h1')
        await expect(h1).toBeVisible()
        await expect(h1).toContainText('Como fazer pré-natal pelo SUS')
      })

      test('should render the article summary', async ({ page }) => {
        await expect(page.getByText('O SUS garante consultas')).toBeVisible()
      })

      test('should render informational step sections as h2', async ({
        page,
      }) => {
        await expect(
          page.getByRole('heading', {
            level: 2,
            name: /Como iniciar o pré-natal/,
          })
        ).toBeVisible()
      })

      test('should render step sections as labeled regions', async ({
        page,
      }) => {
        const region = page.getByRole('region', {
          name: /Como iniciar o pré-natal/,
        })
        await expect(region).toBeAttached()
      })

      test('should render action step titles as h3', async ({ page }) => {
        await expect(
          page.getByRole('heading', {
            level: 3,
            name: 'Vá à UBS assim que descobrir a gravidez',
          })
        ).toBeVisible()
      })

      test('should render action steps inside an ordered list', async ({
        page,
      }) => {
        const region = page.getByRole('region', {
          name: /Como iniciar o pré-natal/,
        })
        const list = region.locator('ol')
        await expect(list).toBeAttached()
      })

      test('should render the breadcrumb navigation', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        await expect(breadcrumb).toBeVisible()

        await expect(breadcrumb.getByText('Início')).toBeVisible()
        await expect(breadcrumb.getByText('Guia do SUS')).toBeVisible()
        await expect(breadcrumb.getByText('Saúde da mulher')).toBeVisible()
        await expect(
          breadcrumb.getByText('Como fazer pré-natal pelo SUS')
        ).toBeVisible()
      })

      test('should have 4 breadcrumb items', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        const items = breadcrumb.locator('ol > li')
        await expect(items).toHaveCount(4)
      })
    })

    test.describe('SEO', () => {
      test('should set the document title', async ({ page }) => {
        await expect(page).toHaveTitle(
          /Como fazer pré-natal pelo SUS.*Guia do SUS.*Faladoria/
        )
      })

      test('should set the meta description', async ({ page }) => {
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
          'content',
          /pré-natal|SUS|gravidez/
        )
      })

      test('should render Article structured data', async ({ page }) => {
        const scripts = await parseJsonLdScripts(page)

        const article = (scripts as JsonLd[]).find(
          d => d['@type'] === 'Article'
        )

        expect(article).toBeTruthy()
        expect(article!.headline).toBe('Como fazer pré-natal pelo SUS')
        expect(article!.datePublished).toBe('2026-05-01')
        expect(article!.dateModified).toBeDefined()
        expect(article!.inLanguage).toBe('pt-BR')
      })

      test('should render BreadcrumbList structured data with 4 items', async ({
        page,
      }) => {
        const scripts = await parseJsonLdScripts(page)

        const breadcrumb = (scripts as JsonLd[]).find(
          d => d['@type'] === 'BreadcrumbList'
        )

        expect(breadcrumb).toBeTruthy()
        expect(breadcrumb!.itemListElement).toHaveLength(4)
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

      test('should wrap content in an article landmark', async ({ page }) => {
        const article = page.getByRole('article', {
          name: 'Como fazer pré-natal pelo SUS',
        })
        await expect(article).toBeAttached()
      })

      test('should have breadcrumb with aria-label', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        await expect(breadcrumb).toBeAttached()
      })

      test('should mark the current page in breadcrumb', async ({ page }) => {
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]')
        const currentItem = breadcrumb.locator('[aria-current="page"]')
        await expect(currentItem).toContainText('Como fazer pré-natal pelo SUS')
      })

      test('should render callouts with role="note"', async ({ page }) => {
        const notes = page.getByRole('note')
        const count = await notes.count()
        expect(count).toBeGreaterThan(0)
      })

      test('checklist callout should have accessible label', async ({
        page,
      }) => {
        const checklistNote = page.getByRole('note', {
          name: 'O que levar à primeira consulta',
        })
        await expect(checklistNote).toBeAttached()
      })
    })

    test.describe('Image Performance', () => {
      test('header image loads eagerly for LCP optimization', async ({
        page,
      }) => {
        const header = page.locator('article header')
        const img = header.locator('img')
        await expect(img).toHaveAttribute('loading', 'eager')
      })

      test('header image has fetchPriority high', async ({ page }) => {
        const header = page.locator('article header')
        const img = header.locator('img')
        await expect(img).toHaveAttribute('fetchpriority', 'high')
      })

      test('header image is decorative and hidden from screen readers', async ({
        page,
      }) => {
        const header = page.locator('article header')
        const img = header.locator('img')
        await expect(img).toHaveAttribute('alt', '')
        await expect(img).toHaveAttribute('aria-hidden', 'true')
      })

      test('header image has explicit width and height to prevent CLS', async ({
        page,
      }) => {
        const header = page.locator('article header')
        const img = header.locator('img')

        const width = await img.getAttribute('width')
        const height = await img.getAttribute('height')

        expect(Number(width)).toBeGreaterThan(0)
        expect(Number(height)).toBeGreaterThan(0)
      })
    })

    test.describe('Responsive Layout', () => {
      test.describe('Desktop', () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize({ width: 1280, height: 800 })
          await page.goto(ARTICLE_URL, { waitUntil: 'domcontentloaded' })
          await page.locator('h1').waitFor({ timeout: 15000 })
        })

        test('should render the article narrower than the viewport', async ({
          page,
        }) => {
          const article = page.locator('article')
          const articleBox = await article.boundingBox()

          expect(articleBox).toBeTruthy()
          expect(articleBox!.width).toBeLessThan(1280)
        })
      })

      test.describe('Mobile', () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize({ width: 375, height: 667 })
          await page.goto(ARTICLE_URL, { waitUntil: 'domcontentloaded' })
          await page.locator('h1').waitFor({ timeout: 15000 })
        })

        test('should render the article filling most of the viewport', async ({
          page,
        }) => {
          const article = page.locator('article')
          const articleBox = await article.boundingBox()

          expect(articleBox).toBeTruthy()
          expect(articleBox!.width).toBeGreaterThan(300)
        })
      })
    })
  })

  test.describe('Invalid article', () => {
    test('should redirect to guide root for unknown article slug', async ({
      page,
    }) => {
      await page.goto(`${CATEGORY_URL}/slug-invalido`, {
        waitUntil: 'domcontentloaded',
      })

      await page.waitForURL(GUIDE_URL, { timeout: 10000 })

      const h1 = page.locator('h1')
      await expect(h1).toContainText('Você tem direito à')
    })
  })
})
