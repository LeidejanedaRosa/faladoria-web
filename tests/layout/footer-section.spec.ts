import { expect, test } from '@playwright/test'

const FOOTER_SECTION = 'footer#contato'

test.describe('FooterSection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator(FOOTER_SECTION).waitFor({ timeout: 15000 })
  })

  test.describe('Rendering & Structure', () => {
    test('should render the footer with implicit contentinfo role', async ({
      page,
    }) => {
      const footer = page.getByRole('contentinfo')
      await expect(footer).toBeVisible()
    })

    test('should render the company logo', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const logo = footer.locator('img[alt*="Logo"]')

      await expect(logo).toBeVisible()
    })

    test('should render the company tagline', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)

      await expect(
        footer.getByText('Conectando cidadãos à gestão pública')
      ).toBeVisible()
    })

    test('should render Institucional link group with heading', async ({
      page,
    }) => {
      const footer = page.locator(FOOTER_SECTION)

      await expect(
        footer.getByRole('heading', { name: 'Institucional' })
      ).toBeVisible()
    })

    test('should render Suporte link group with heading', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)

      await expect(
        footer.getByRole('heading', { name: 'Suporte' })
      ).toBeVisible()
    })

    test('should render Contato heading', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)

      await expect(
        footer.getByRole('heading', { name: 'Contato' })
      ).toBeVisible()
    })

    test('should render institutional links', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)

      await expect(
        footer.getByRole('link', { name: 'Quem somos' })
      ).toBeVisible()
      await expect(
        footer.getByRole('link', { name: 'Transparência' })
      ).toBeVisible()
      await expect(
        footer.getByRole('link', { name: 'Como funciona' })
      ).toBeVisible()
    })

    test('should render support links', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)

      await expect(
        footer.getByRole('link', { name: 'Perguntas frequentes' })
      ).toBeVisible()
      await expect(
        footer.getByRole('link', { name: 'Política de privacidade' })
      ).toBeVisible()
      await expect(
        footer.getByRole('link', { name: 'Termos de uso' })
      ).toBeVisible()
    })

    test('should render contact email', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const emailLink = footer.locator('a[href^="mailto:"]')

      await expect(emailLink).toBeVisible()
      const text = await emailLink.textContent()
      expect(text).toMatch(/@/)
    })

    test('should render contact whatsapp', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const whatsappLink = footer.locator('a[href^="https://wa.me/"]')

      await expect(whatsappLink).toBeVisible()
      await expect(whatsappLink).toContainText('Fale com a gente')
    })

    test('should render contact address', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const addressItems = footer.locator('address li')

      // Third item is the address (no link, just text)
      const addressItem = addressItems.nth(2)
      await expect(addressItem).toBeVisible()
      await expect(addressItem).toContainText('Brasil')
    })

    test('should render copyright text', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const currentYear = new Date().getFullYear()

      await expect(footer.getByText(`© ${currentYear} Faladoria`)).toBeVisible()
    })

    test('should render legal note', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)

      await expect(
        footer.getByText('Plataforma independente de mediação')
      ).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('should have a screen-reader-only h2 heading', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const h2 = footer.locator('h2#footer-heading')

      await expect(h2).toBeAttached()
      await expect(h2).toHaveClass(/sr-only/)
      await expect(h2).toContainText('Rodapé')
      await expect(h2).toContainText('Faladoria')
    })

    test('should reference the h2 via aria-labelledby', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const labelledbyId = await footer.getAttribute('aria-labelledby')

      expect(labelledbyId).toBe('footer-heading')
    })

    test('should use semantic footer element', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const tagName = await footer.evaluate(el => el.tagName.toLowerCase())

      expect(tagName).toBe('footer')
    })

    test('should have navigation landmarks with distinct aria-labels', async ({
      page,
    }) => {
      const footer = page.locator(FOOTER_SECTION)
      const navs = footer.locator('nav')

      await expect(navs).toHaveCount(2)

      const firstLabel = await navs.nth(0).getAttribute('aria-label')
      const secondLabel = await navs.nth(1).getAttribute('aria-label')

      expect(firstLabel).toBeTruthy()
      expect(secondLabel).toBeTruthy()
      expect(firstLabel).not.toBe(secondLabel)
    })

    test('should use h3 headings for link group titles', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const h3s = footer.locator('h3')

      await expect(h3s).toHaveCount(3)
    })

    test('should use address element for contact information', async ({
      page,
    }) => {
      const footer = page.locator(FOOTER_SECTION)
      const address = footer.locator('address')

      await expect(address).toBeAttached()
    })

    test('should have aria-hidden on contact icons', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const contactIcons = footer.locator('address svg')

      const count = await contactIcons.count()
      expect(count).toBe(3)

      for (let i = 0; i < count; i++) {
        await expect(contactIcons.nth(i)).toHaveAttribute('aria-hidden', 'true')
      }
    })

    test('should have aria-labels on contact links', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)

      const emailLink = footer.locator('a[href^="mailto:"]')
      await expect(emailLink).toHaveAttribute('aria-label', /e-mail/)

      const whatsappLink = footer.locator('a[href^="https://wa.me/"]')
      await expect(whatsappLink).toHaveAttribute('aria-label', /WhatsApp/)
    })

    test('should have proper href for email link', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const emailLink = footer.locator('a[href^="mailto:"]')

      const href = await emailLink.getAttribute('href')
      expect(href).toMatch(/^mailto:.+@.+\..+$/)
    })

    test('should have proper href for whatsapp link', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const whatsappLink = footer.locator('a[href^="https://wa.me/"]')

      const href = await whatsappLink.getAttribute('href')
      expect(href).toMatch(/^https:\/\/wa\.me\/\d+$/)
    })

    test('should open whatsapp link in new tab', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const whatsappLink = footer.locator('a[href^="https://wa.me/"]')

      await expect(whatsappLink).toHaveAttribute('target', '_blank')
      await expect(whatsappLink).toHaveAttribute('rel', /noopener/)
    })

    test('should have id for anchor navigation from header', async ({
      page,
    }) => {
      const footer = page.locator(FOOTER_SECTION)
      const id = await footer.getAttribute('id')

      expect(id).toBe('contato')
    })

    test('logo link should have accessible label', async ({ page }) => {
      const footer = page.locator(FOOTER_SECTION)
      const logoLink = footer.locator('a[href="/"]')

      await expect(logoLink).toHaveAttribute(
        'aria-label',
        /Ir para página inicial/
      )
    })
  })

  test.describe('Responsive Layout', () => {
    test.describe('Desktop', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(FOOTER_SECTION).waitFor({ timeout: 15000 })
      })

      test('should display four-column layout', async ({ page }) => {
        const footer = page.locator(FOOTER_SECTION)
        const gridChildren = footer.locator(
          ':scope > div > div:first-child > *'
        )

        const firstBox = await gridChildren.nth(0).boundingBox()
        const secondBox = await gridChildren.nth(1).boundingBox()

        expect(firstBox).toBeTruthy()
        expect(secondBox).toBeTruthy()

        // Columns should be side by side
        expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(5)
        expect(secondBox!.x).toBeGreaterThan(firstBox!.x)
      })
    })

    test.describe('Tablet', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 660, height: 900 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(FOOTER_SECTION).waitFor({ timeout: 15000 })
      })

      test('should display two-column layout', async ({ page }) => {
        const footer = page.locator(FOOTER_SECTION)
        const gridChildren = footer.locator(
          ':scope > div > div:first-child > *'
        )

        const firstBox = await gridChildren.nth(0).boundingBox()
        const secondBox = await gridChildren.nth(1).boundingBox()

        expect(firstBox).toBeTruthy()
        expect(secondBox).toBeTruthy()

        // First two items should be side by side (2-col grid)
        expect(Math.abs(firstBox!.y - secondBox!.y)).toBeLessThan(5)
        expect(secondBox!.x).toBeGreaterThan(firstBox!.x)

        // Third item should wrap to next row
        const thirdBox = await gridChildren.nth(2).boundingBox()
        expect(thirdBox).toBeTruthy()
        expect(thirdBox!.y).toBeGreaterThan(firstBox!.y)
      })
    })

    test.describe('Mobile', () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await page.locator(FOOTER_SECTION).waitFor({ timeout: 15000 })
      })

      test('should stack columns vertically', async ({ page }) => {
        const footer = page.locator(FOOTER_SECTION)
        const gridChildren = footer.locator(
          ':scope > div > div:first-child > *'
        )

        const firstBox = await gridChildren.nth(0).boundingBox()
        const secondBox = await gridChildren.nth(1).boundingBox()

        expect(firstBox).toBeTruthy()
        expect(secondBox).toBeTruthy()

        // Second column should be below the first
        expect(secondBox!.y).toBeGreaterThan(firstBox!.y)
      })
    })
  })
})
