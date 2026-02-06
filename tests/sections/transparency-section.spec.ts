import { expect, test } from '@playwright/test'

const SECTION_SELECTOR = 'section[aria-labelledby="transparency-heading"]'

test.describe('TransparencySection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator(SECTION_SELECTOR).waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the section with aria-labelledby', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      await expect(section).toBeVisible()
    })

    test('should render the section with id for navigation anchor', async ({
      page,
    }) => {
      const section = page.locator('section#transparencia')
      await expect(section).toBeVisible()
    })

    test('should render the headline as h3', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const headline = section.locator('h3').first()

      await expect(headline).toBeVisible()
      await expect(headline).toContainText('Transparência Radical')
    })

    test('should render the subtitle text', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const subtitle = section.locator('p').filter({
        hasText: 'Não escondemos os problemas',
      })

      await expect(subtitle).toBeVisible()
    })

    test('should render the live status indicator', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const liveIndicator = section.locator('[role="status"]')

      await expect(liveIndicator).toBeVisible()
      await expect(liveIndicator).toContainText('Atualizado em tempo real')
    })

    test('should render exactly 4 stat cards', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const stats = section.locator('dl').first().locator('> div')

      await expect(stats).toHaveCount(4)
    })

    test('should render all stat labels', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const terms = section.locator('dl').first().locator('dt')

      await expect(terms.nth(0)).toContainText('Total de Demandas')
      await expect(terms.nth(1)).toContainText('Resolvidas')
      await expect(terms.nth(2)).toContainText('Em Mediação')
      await expect(terms.nth(3)).toContainText('Sem Solução (Ainda)')
    })

    test('should render exactly 6 interaction items', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const interactions = section.locator('ul > li')

      await expect(interactions).toHaveCount(6)
    })

    test('should render interaction titles', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const items = section.locator('ul > li')

      await expect(items.nth(0)).toContainText('Falta de Medicamento')
      await expect(items.nth(1)).toContainText('Demora no Atendimento')
      await expect(items.nth(2)).toContainText(
        'Fila de espera para cirurgia ortopédica'
      )
    })

    test('should render the LGPD notice', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const lgpdNotice = section.getByText('Dados anonimizados (LGPD)')

      await expect(lgpdNotice).toBeVisible()
    })

    test('should render the CTA card with title and button', async ({
      page,
    }) => {
      const section = page.locator(SECTION_SELECTOR)

      const ctaTitle = section.getByText('Seu problema não está aqui?')
      await expect(ctaTitle).toBeVisible()

      const ctaButton = section.getByRole('link', {
        name: /registrar problema/i,
      })
      await expect(ctaButton).toBeVisible()
    })

    test('should render the status legend with all 5 statuses', async ({
      page,
    }) => {
      const section = page.locator(SECTION_SELECTOR)
      const legendTitle = section.getByText('Legenda de status')
      await expect(legendTitle).toBeVisible()

      const legendDl = section.locator('dl').nth(1)
      const legendItems = legendDl.locator('dd')

      await expect(legendItems).toHaveCount(5)
    })
  })

  test.describe('Accessibility', () => {
    test('should have a screen-reader-only section heading', async ({
      page,
    }) => {
      const section = page.locator(SECTION_SELECTOR)
      const srHeading = section.locator('#transparency-heading')

      await expect(srHeading).toBeAttached()

      const text = await srHeading.textContent()
      expect(text).toContain('Transparência')
    })

    test('should have aria-live="polite" on the live indicator', async ({
      page,
    }) => {
      const section = page.locator(SECTION_SELECTOR)
      const liveIndicator = section.locator('[role="status"]')

      await expect(liveIndicator).toHaveAttribute('aria-live', 'polite')
    })

    test('should render progressbars with proper ARIA attributes', async ({
      page,
    }) => {
      const section = page.locator(SECTION_SELECTOR)
      const progressbars = section.locator('[role="progressbar"]')

      await expect(progressbars).toHaveCount(4)

      for (let i = 0; i < 4; i++) {
        const bar = progressbars.nth(i)
        await expect(bar).toHaveAttribute('aria-valuenow', /.+/)
        await expect(bar).toHaveAttribute('aria-valuemin', '0')
        await expect(bar).toHaveAttribute('aria-valuemax', /.+/)
        await expect(bar).toHaveAttribute('aria-label', /.+/)
      }
    })

    test('should use semantic definition list for stats grid', async ({
      page,
    }) => {
      const section = page.locator(SECTION_SELECTOR)
      const dl = section.locator('dl').first()

      await expect(dl).toBeVisible()

      const dts = dl.locator('dt')
      const dds = dl.locator('dd')

      await expect(dts).toHaveCount(4)
      await expect(dds).toHaveCount(4)
    })

    test('should use semantic list for interactions', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const list = section.locator('ul')

      await expect(list).toBeVisible()
      await expect(list.locator('> li')).toHaveCount(6)
    })

    test('should maintain proper heading hierarchy (h3 > h4)', async ({
      page,
    }) => {
      const section = page.locator(SECTION_SELECTOR)

      const h3 = section.locator('h3')
      await expect(h3).toHaveCount(1)

      const h4s = section.locator('h4')
      await expect(h4s).toHaveCount(3)
    })

    test('should have decorative icons hidden from screen readers', async ({
      page,
    }) => {
      const section = page.locator(SECTION_SELECTOR)
      const decorativeIcons = section.locator('svg[aria-hidden="true"]')

      const count = await decorativeIcons.count()
      expect(count).toBeGreaterThanOrEqual(1)
    })

    test('should have aria-label on the CTA link', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const ctaLink = section.getByRole('link', {
        name: /registrar problema.*whatsapp/i,
      })

      await expect(ctaLink).toBeVisible()
    })

    test('should have screen-reader separators in interaction items', async ({
      page,
    }) => {
      const section = page.locator(SECTION_SELECTOR)
      const srSeparators = section.locator('ul li .sr-only')

      const count = await srSeparators.count()
      expect(count).toBeGreaterThanOrEqual(6)
    })

    test('should have status badges with aria-label', async ({ page }) => {
      const section = page.locator(SECTION_SELECTOR)
      const statusBadges = section.locator('[aria-label^="Status:"]')

      const count = await statusBadges.count()
      expect(count).toBeGreaterThanOrEqual(6)
    })
  })

  test.describe('Responsive Layout', () => {
    test('should stack stat cards in 2 columns on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const section = page.locator(SECTION_SELECTOR)
      const statCards = section.locator('dl').first().locator('> div')

      const firstBounds = await statCards.nth(0).boundingBox()
      const secondBounds = await statCards.nth(1).boundingBox()
      const thirdBounds = await statCards.nth(2).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()
      expect(thirdBounds).toBeTruthy()

      // First and second should be side by side (same row, not stacked)
      expect(Math.abs(firstBounds!.y - secondBounds!.y)).toBeLessThan(
        firstBounds!.height
      )

      // Third should be below first
      expect(thirdBounds!.y).toBeGreaterThan(firstBounds!.y)
    })

    test('should display all 4 stat cards in a row on desktop', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 })

      const section = page.locator(SECTION_SELECTOR)
      const statCards = section.locator('dl').first().locator('> div')

      const firstBounds = await statCards.nth(0).boundingBox()
      const secondBounds = await statCards.nth(1).boundingBox()
      const thirdBounds = await statCards.nth(2).boundingBox()
      const fourthBounds = await statCards.nth(3).boundingBox()

      expect(firstBounds).toBeTruthy()
      expect(secondBounds).toBeTruthy()
      expect(thirdBounds).toBeTruthy()
      expect(fourthBounds).toBeTruthy()

      // All 4 should be on the same row
      expect(firstBounds!.y).toBeCloseTo(secondBounds!.y, -1)
      expect(secondBounds!.y).toBeCloseTo(thirdBounds!.y, -1)
      expect(thirdBounds!.y).toBeCloseTo(fourthBounds!.y, -1)
    })

    test('should stack interactions panel and sidebar vertically on mobile', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const section = page.locator(SECTION_SELECTOR)
      const interactionsPanel = section.locator('ul').first()
      const ctaCard = section.getByText('Seu problema não está aqui?')

      const panelBounds = await interactionsPanel.boundingBox()
      const ctaBounds = await ctaCard.boundingBox()

      expect(panelBounds).toBeTruthy()
      expect(ctaBounds).toBeTruthy()

      // CTA should be below interactions panel on mobile
      expect(ctaBounds!.y).toBeGreaterThan(panelBounds!.y)
    })

    test('should display interactions panel and sidebar side by side on desktop', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1440, height: 900 })

      const section = page.locator(SECTION_SELECTOR)
      const interactionsPanel = section.locator('ul').first()
      const ctaCard = section.getByText('Seu problema não está aqui?')

      const panelBounds = await interactionsPanel.boundingBox()
      const ctaBounds = await ctaCard.boundingBox()

      expect(panelBounds).toBeTruthy()
      expect(ctaBounds).toBeTruthy()

      // On desktop, CTA card should be to the right (not below)
      expect(ctaBounds!.x).toBeGreaterThan(panelBounds!.x)
    })
  })
})
