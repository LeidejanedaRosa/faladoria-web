import type { Page } from '@playwright/test'

export async function parseJsonLdScripts(page: Page): Promise<unknown[]> {
  const elements = await page
    .locator('script[type="application/ld+json"]')
    .all()

  return Promise.all(
    elements.map(async el => {
      const text = await el.textContent()
      try {
        return JSON.parse(text ?? '')
      } catch {
        return null
      }
    })
  )
}
