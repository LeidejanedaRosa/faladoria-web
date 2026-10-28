import { defineConfig, devices } from '@playwright/test'

import { E2E_IBGE_URL } from './tests/helpers/ibgeApi'
import { E2E_API_URL } from './tests/helpers/publicBoardApi'

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  fullyParallel: !process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
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
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
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
