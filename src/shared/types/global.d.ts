/// <reference types="vite/client" />

declare module '@fontsource-variable/inter'

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_SENTRY_ENVIRONMENT: string
  readonly VITE_SENTRY_TRACES_SAMPLE_RATE: string
  readonly VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE: string
  readonly VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE: string
  readonly VITE_GA_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Extend Window interface for analytics
interface Window {
  gtag?: (...args: unknown[]) => void
}
