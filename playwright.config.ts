import { defineConfig, devices } from '@playwright/test'

import { E2E_IBGE_URL } from './tests/helpers/ibgeApi'
import { E2E_API_URL } from './tests/helpers/publicBoardApi'

// Só leem o HTML (meta tags, JSON-LD, estrutura de títulos e landmarks): o resultado é o mesmo em
// qualquer navegador, então rodam só no chromium. accessibility (axe) e performance-keywords
// (APIs de tempo de cada motor, tamanho dos botões na tela) continuam nos cinco projetos.
const HTML_ONLY_SPECS = [
  '**/seo/metadata.spec.ts',
  '**/seo/semantic-html.spec.ts',
]

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  fullyParallel: !process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // A máquina do GitHub para repositório público tem 4 núcleos; 2 workers dividem os arquivos sem
  // disputar CPU com o vite preview. Ver docs/DECISIONS.md (2026-11-26, E2E).
  workers: process.env.CI ? 2 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: HTML_ONLY_SPECS,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: HTML_ONLY_SPECS,
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testIgnore: HTML_ONLY_SPECS,
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testIgnore: HTML_ONLY_SPECS,
    },
  ],

  webServer: {
    // Runs E2E against the real production build, not the dev server — closer
    // to what actually ships (minification, real chunk splitting, no HMR-only
    // behavior). Trade-off: every run rebuilds first, so it's slower than
    // pointing at `pnpm dev`. reuseExistingServer is always false so a stale
    // build never gets served silently.
    command: 'pnpm build && pnpm preview',
    // Fixed here, not read from .env: a developer's .env.local must not change what the
    // tests hit. Tests intercept this address with page.route.
    env: { VITE_API_URL: E2E_API_URL, VITE_IBGE_API_URL: E2E_IBGE_URL },
    url: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4173',
    reuseExistingServer: false,
  },
})
