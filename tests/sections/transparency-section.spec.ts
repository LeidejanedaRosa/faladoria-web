import { expect, type Page, test } from '@playwright/test'

import {
  mockPublicBoard,
  mockPublicBoardDown,
  mockPublicBoardPending,
  PUBLIC_BOARD_COMPLAINTS,
  PUBLIC_BOARD_STATS,
} from '../helpers/publicBoardApi'

const SECTION_SELECTOR = 'section[aria-labelledby="transparency-heading"]'

const gotoSection = async (page: Page) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.locator(SECTION_SELECTOR).waitFor({ timeout: 15000 })
}

test.describe('TransparencySection', () => {
  test.describe('With data from the API', () => {
    test.beforeEach(async ({ page }) => {
      await mockPublicBoard(page)
      await gotoSection(page)
      // Waits for <time>, which only real rows have: the loading skeleton is also a ul > li.
      await page
        .locator(SECTION_SELECTOR)
        .locator('ul > li time')
        .first()
        .waitFor({ timeout: 15000 })
    })

    test.describe('Rendering & Structure', () => {
      test('should render the section with id for navigation anchor', async ({
        page,
      }) => {
        await expect(page.locator('section#transparencia')).toBeVisible()
      })

      test('should render the headline as h3', async ({ page }) => {
        const headline = page.locator(SECTION_SELECTOR).locator('h3').first()

        await expect(headline).toContainText('Transparência Radical')
      })

      test('should render the subtitle text', async ({ page }) => {
        const section = page.locator(SECTION_SELECTOR)

        await expect(
          section.getByText('Acompanhe o andamento das reclamações publicadas.')
        ).toBeVisible()
      })

      test('should state how fresh the data is, not claim real time', async ({
        page,
      }) => {
        const liveIndicator = page
          .locator(SECTION_SELECTOR)
          .locator('[role="status"]')

        await expect(liveIndicator).toContainText('Dados de até 1 minuto atrás')
      })

      test('should render the four stat labels', async ({ page }) => {
        const terms = page
          .locator(SECTION_SELECTOR)
          .locator('dl')
          .first()
          .locator('dt')

        await expect(terms).toHaveText([
          'Total de Demandas',
          'Resolvidas',
          'Em Mediação',
          'Sem Solução (Ainda)',
        ])
      })

      test('should show the totals from the API, mediation being in review plus in progress', async ({
        page,
      }) => {
        const values = page
          .locator(SECTION_SELECTOR)
          .locator('dl')
          .first()
          .locator('dd > span:first-child')

        await expect(values).toHaveText(['48', '19', '23', '6'])
      })

      test('should list the six latest published complaints', async ({
        page,
      }) => {
        const items = page.locator(SECTION_SELECTOR).locator('ul > li')

        await expect(items).toHaveCount(PUBLIC_BOARD_COMPLAINTS.length)
        await expect(items.nth(0)).toContainText(
          'Falta de insulina na farmácia municipal'
        )
        await expect(items.nth(0)).toContainText('Varginha - MG')
      })

      test('should show the day a complaint arrived as dd/mm/yyyy', async ({
        page,
      }) => {
        const firstDate = page
          .locator(SECTION_SELECTOR)
          .locator('ul > li')
          .first()
          .locator('time')

        await expect(firstDate).toHaveText('22/10/2026')
        await expect(firstDate).toHaveAttribute('datetime', '2026-10-22')
      })

      test('should render the LGPD notice', async ({ page }) => {
        await expect(
          page.locator(SECTION_SELECTOR).getByText('Dados anonimizados (LGPD)')
        ).toBeVisible()
      })

      test('should render the CTA card with title and button', async ({
        page,
      }) => {
        const section = page.locator(SECTION_SELECTOR)

        await expect(
          section.getByText('Seu problema não está aqui?')
        ).toBeVisible()
        await expect(
          section.getByRole('link', { name: /registrar problema/i })
        ).toBeVisible()
      })

      test('should render the legend with only the four published statuses', async ({
        page,
      }) => {
        const section = page.locator(SECTION_SELECTOR)
        const legendItems = section.locator('dl').nth(1).locator('dd')

        await expect(section.getByText('Legenda de status')).toBeVisible()
        await expect(legendItems).toHaveCount(4)
        await expect(section.locator('dl').nth(1)).not.toContainText('Aberto')
      })
    })

    test.describe('Accessibility', () => {
      test('should have a screen-reader-only section heading', async ({
        page,
      }) => {
        const srHeading = page
          .locator(SECTION_SELECTOR)
          .locator('#transparency-heading')

        await expect(srHeading).toBeAttached()
        await expect(srHeading).toContainText('Transparência')
      })

      test('should have aria-live="polite" on the live indicator', async ({
        page,
      }) => {
        const liveIndicator = page
          .locator(SECTION_SELECTOR)
          .locator('[role="status"]')

        await expect(liveIndicator).toHaveAttribute('aria-live', 'polite')
      })

      test('should render progressbars with proper ARIA attributes', async ({
        page,
      }) => {
        const progressbars = page
          .locator(SECTION_SELECTOR)
          .locator('[role="progressbar"]')

        await expect(progressbars).toHaveCount(4)
        for (let i = 0; i < 4; i++) {
          const bar = progressbars.nth(i)
          await expect(bar).toHaveAttribute('aria-valuenow', /.+/)
          await expect(bar).toHaveAttribute('aria-valuemin', '0')
          await expect(bar).toHaveAttribute('aria-valuemax', '48')
          await expect(bar).toHaveAttribute('aria-label', /.+/)
        }
      })

      test('should use semantic definition list for stats grid', async ({
        page,
      }) => {
        const dl = page.locator(SECTION_SELECTOR).locator('dl').first()

        await expect(dl.locator('dt')).toHaveCount(4)
        await expect(dl.locator('dd')).toHaveCount(4)
      })

      test('should maintain proper heading hierarchy (h3 > h4)', async ({
        page,
      }) => {
        const section = page.locator(SECTION_SELECTOR)

        await expect(section.locator('h3')).toHaveCount(1)
        await expect(section.locator('h4')).toHaveCount(3)
      })

      test('should have aria-label on the CTA link', async ({ page }) => {
        await expect(
          page
            .locator(SECTION_SELECTOR)
            .getByRole('link', { name: /registrar problema.*whatsapp/i })
        ).toBeVisible()
      })

      test('should have screen-reader separators in interaction items', async ({
        page,
      }) => {
        const srSeparators = page
          .locator(SECTION_SELECTOR)
          .locator('ul li .sr-only')

        await expect(srSeparators).toHaveCount(
          PUBLIC_BOARD_COMPLAINTS.length * 2
        )
      })

      test('should label every status badge for screen readers', async ({
        page,
      }) => {
        const badges = page
          .locator(SECTION_SELECTOR)
          .locator('ul [aria-label^="Status:"]')

        await expect(badges).toHaveCount(PUBLIC_BOARD_COMPLAINTS.length)
      })
    })

    test.describe('Responsive Layout', () => {
      test('should stack stat cards in 2 columns on mobile', async ({
        page,
      }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        const cards = page
          .locator(SECTION_SELECTOR)
          .locator('dl')
          .first()
          .locator('> div')

        const first = await cards.nth(0).boundingBox()
        const second = await cards.nth(1).boundingBox()
        const third = await cards.nth(2).boundingBox()

        expect(Math.abs(first!.y - second!.y)).toBeLessThan(first!.height)
        expect(third!.y).toBeGreaterThan(first!.y)
      })

      test('should display all 4 stat cards in a row on desktop', async ({
        page,
      }) => {
        await page.setViewportSize({ width: 1440, height: 900 })
        const cards = page
          .locator(SECTION_SELECTOR)
          .locator('dl')
          .first()
          .locator('> div')

        const boxes = await Promise.all(
          [0, 1, 2, 3].map(index => cards.nth(index).boundingBox())
        )

        for (const box of boxes.slice(1)) {
          expect(box!.y).toBeCloseTo(boxes[0]!.y, -1)
        }
      })

      test('should stack interactions panel and sidebar vertically on mobile', async ({
        page,
      }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        const section = page.locator(SECTION_SELECTOR)

        const panel = await section.locator('ul').first().boundingBox()
        const cta = await section
          .getByText('Seu problema não está aqui?')
          .boundingBox()

        expect(cta!.y).toBeGreaterThan(panel!.y)
      })

      test('should display interactions panel and sidebar side by side on desktop', async ({
        page,
      }) => {
        await page.setViewportSize({ width: 1440, height: 900 })
        const section = page.locator(SECTION_SELECTOR)

        const panel = await section.locator('ul').first().boundingBox()
        const cta = await section
          .getByText('Seu problema não está aqui?')
          .boundingBox()

        expect(cta!.x).toBeGreaterThan(panel!.x)
      })
    })
  })

  test.describe('Loading, Error & Empty States', () => {
    test('should announce both loading states to screen readers', async ({
      page,
    }) => {
      await mockPublicBoardPending(page)
      await gotoSection(page)
      const section = page.locator(SECTION_SELECTOR)

      await expect(
        section.locator('output', {
          hasText: 'Carregando os números do quadro…',
        })
      ).toBeAttached()
      await expect(
        section.locator('output', {
          hasText: 'Carregando as últimas reclamações…',
        })
      ).toBeAttached()
    })

    test('should not shift the layout when the totals arrive', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      let releaseStats: () => void = () => {}
      const statsReleased = new Promise<void>(resolve => {
        releaseStats = resolve
      })
      await mockPublicBoard(page)
      await page.route('**/api/public/complaints/stats', async route => {
        await statsReleased
        await route.fulfill({ json: PUBLIC_BOARD_STATS })
      })
      await gotoSection(page)
      const firstCard = page
        .locator(SECTION_SELECTOR)
        .locator('div.rounded-xl.p-5')
        .first()

      const loadingHeight = (await firstCard.boundingBox())!.height
      releaseStats()
      await page.locator(SECTION_SELECTOR).locator('dl').first().waitFor()
      const loadedHeight = (await firstCard.boundingBox())!.height

      expect(loadedHeight).toBe(loadingHeight)
    })

    test('should show an error with a retry that recovers when the API comes back', async ({
      page,
    }) => {
      await mockPublicBoardDown(page)
      await gotoSection(page)
      const section = page.locator(SECTION_SELECTOR)

      await expect(section.getByRole('alert')).toHaveCount(2, {
        timeout: 15000,
      })
      await expect(section.getByRole('alert').first()).toContainText(
        'Não foi possível carregar os dados agora.'
      )

      await page.unrouteAll()
      await mockPublicBoard(page)
      await section
        .getByRole('button', { name: 'Tentar de novo' })
        .first()
        .click()

      await expect(section.locator('dl').first().locator('dt')).toHaveCount(4)
    })

    test('should invite the first complaint when nothing is published yet', async ({
      page,
    }) => {
      await mockPublicBoard(page, {
        stats: {
          total: 0,
          byStatus: { inReview: 0, inProgress: 0, unresolved: 0, resolved: 0 },
        },
        complaints: [],
      })
      await gotoSection(page)

      await expect(
        page
          .locator(SECTION_SELECTOR)
          .getByText(
            'Ainda não há reclamações publicadas. A sua pode ser a primeira.'
          )
      ).toBeVisible()
    })
  })
})
