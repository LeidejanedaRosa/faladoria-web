import { expect, test } from '@playwright/test'

test.describe('HeroSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator('section').first().waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the hero section with aria-labelledby', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      await expect(hero).toBeVisible()
    })

    test('should render exactly one h1 as the hero heading', async ({
      page,
    }) => {
      const h1 = page.locator('h1#hero-heading')
      await expect(h1).toBeVisible()
      await expect(h1).toHaveCount(1)
    })

    test('should render all three headline lines', async ({ page }) => {
      const h1 = page.locator('h1#hero-heading')
      const lines = h1.locator('span.block')

      await expect(lines).toHaveCount(3)

      const expectedLines = ['Você fala.', 'O SUS escuta.', 'Nós resolvemos.']

      for (let i = 0; i < expectedLines.length; i++) {
        const text = await lines.nth(i).textContent()
        expect(text?.trim()).toBe(expectedLines[i])
      }
    })

    test('should render the logo image', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const logo = hero.locator('img')

      await expect(logo).toBeVisible()
      await expect(logo).toHaveAttribute('src', /faladoria-secondary/)
    })

    test('should render the badge with status indicator', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const badge = hero.locator('p').filter({
        hasText: 'Uma plataforma independente para ouvir, mediar e resolver.',
      })

      await expect(badge).toBeVisible()

      const statusDot = badge.locator('span.rounded-full')
      await expect(statusDot).toBeAttached()
      await expect(statusDot).toHaveAttribute('aria-hidden', 'true')
    })

    test('should render the description paragraph', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const description = hero.locator('p').filter({
        hasText: 'Criamos a faladoria para conectar usuários do SUS',
      })

      await expect(description).toBeVisible()
    })
  })

  test.describe('CTAs & Navigation', () => {
    test('should render a nav landmark with accessible label', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const nav = hero.locator('nav[aria-label="Ações principais"]')

      await expect(nav).toBeVisible()
    })

    test('should render WhatsApp CTA with correct external link attributes', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const whatsappLink = hero.locator(
        'a[aria-label="Reclamar Agora (abre em nova aba)"]'
      )

      await expect(whatsappLink).toBeVisible()
      await expect(whatsappLink).toHaveAttribute(
        'href',
        /^https:\/\/wa\.me\/\d+$/
      )
      await expect(whatsappLink).toHaveAttribute('target', '_blank')
      await expect(whatsappLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('should not show external icon on WhatsApp CTA', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const whatsappLink = hero.locator(
        'a[aria-label="Reclamar Agora (abre em nova aba)"]'
      )
      const whatsappIcon = whatsappLink.locator('svg')

      // Should have exactly 1 SVG (the WhatsAppIcon), not 2 (no ExternalLinkIcon)
      await expect(whatsappIcon).toHaveCount(1)
    })

    test('should render transparency CTA as internal anchor link', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const transparencyLink = hero.locator(
        'a[aria-label="Ver dados em tempo real - ir para seção de transparência"]'
      )

      await expect(transparencyLink).toBeVisible()
      await expect(transparencyLink).toHaveAttribute('href', '/#transparencia')
      await expect(transparencyLink).not.toHaveAttribute('target')
      await expect(transparencyLink).not.toHaveAttribute('rel')
    })
  })

  test.describe('Accessibility', () => {
    test('should have descriptive alt text on the logo', async ({ page }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const logo = hero.locator('img')
      const altText = await logo.getAttribute('alt')

      await expect(logo).toHaveAttribute('alt')
      expect(altText?.length).toBeGreaterThan(10)
      expect(altText).toContain('Faladoria')
    })

    test('should use CSS uppercase instead of JS toUpperCase for screen readers', async ({
      page,
    }) => {
      const h1 = page.locator('h1#hero-heading')
      const textContent = await h1.textContent()

      // Text in DOM should be mixed-case (CSS handles visual uppercase)
      expect(textContent).toContain('Você fala.')
      expect(textContent).not.toMatch(/^[A-ZÀ-Ú\s.]+$/)
    })

    test('should have screen-reader-only company description', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const srDescription = hero.locator('p.sr-only')

      await expect(srDescription).toBeAttached()

      const text = await srDescription.textContent()
      expect(text).toContain('Canal de mediação')
      expect(text).toContain('SUS')
    })

    test('should have screen-reader-only badge status text', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const badge = hero.locator('p').filter({
        hasText: 'Uma plataforma independente',
      })
      const badgeSrOnly = badge.locator('span.sr-only')

      await expect(badgeSrOnly).toBeAttached()

      const text = await badgeSrOnly.textContent()
      expect(text).toContain('Plataforma ativa')
    })

    test('h1 should be the labelling element for the section', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const labelledbyId = hero
      const h1Id = await page.locator('h1').first().getAttribute('id')

      await expect(labelledbyId).toHaveAttribute('aria-labelledby', h1Id!)
    })
  })

  test.describe('Image Performance', () => {
    test('should have explicit width and height to prevent layout shift', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const logo = hero.locator('img')

      await expect(logo).toHaveAttribute('width')
      await expect(logo).toHaveAttribute('height')
    })

    test('should have eager loading and high fetch priority for above-the-fold image', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const logo = hero.locator('img')

      await expect(logo).toHaveAttribute('loading', 'eager')
      await expect(logo).toHaveAttribute('fetchpriority', 'high')
    })

    test('should have async decoding for non-blocking rendering', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const logo = hero.locator('img')

      await expect(logo).toHaveAttribute('decoding', 'async')
    })
  })

  test.describe('Responsive Layout', () => {
    test('should stack vertically on mobile (column layout)', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const logo = page.locator('section[aria-labelledby="hero-heading"] img')
      const h1 = page.locator('h1#hero-heading')

      const logoBounds = await logo.boundingBox()
      const h1Bounds = await h1.boundingBox()

      expect(logoBounds).toBeTruthy()
      expect(h1Bounds).toBeTruthy()

      // On mobile, logo should be above the heading
      expect(logoBounds!.y).toBeLessThan(h1Bounds!.y)
    })

    test('should display side by side on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 })

      const logo = page.locator('section[aria-labelledby="hero-heading"] img')
      const h1 = page.locator('h1#hero-heading')

      const logoBounds = await logo.boundingBox()
      const h1Bounds = await h1.boundingBox()

      expect(logoBounds).toBeTruthy()
      expect(h1Bounds).toBeTruthy()

      // On desktop (flex-row-reverse), they should be on the same row
      // Logo should be to the right of the heading
      expect(logoBounds!.x).toBeGreaterThan(h1Bounds!.x)
    })

    test('should occupy at least viewport height minus header', async ({
      page,
    }) => {
      const hero = page.locator('section[aria-labelledby="hero-heading"]')
      const bounds = await hero.boundingBox()
      const viewport = page.viewportSize()

      const headerHeight = await page.evaluate(() => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--header-height')
          .trim()

        if (!value) {
          throw new Error('CSS variable --header-height is not defined')
        }

        const temp = document.createElement('div')
        temp.style.height = value
        document.body.appendChild(temp)
        const px = temp.getBoundingClientRect().height
        temp.remove()
        return px
      })

      expect(bounds).toBeTruthy()
      expect(viewport).toBeTruthy()
      expect(bounds!.height).toBeGreaterThanOrEqual(
        viewport!.height - headerHeight
      )
    })
  })
})
