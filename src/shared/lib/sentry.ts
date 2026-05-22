import * as Sentry from '@sentry/react'

const BROWSER_EXTENSION_SCHEMES = ['chrome-extension://', 'moz-extension://']

const EXTERNAL_SCRIPT_ORIGINS = [
  'google-analytics.com',
  'googletagmanager.com',
  'doubleclick.net',
  'facebook.com',
  'facebook.net',
]

function isExternalOrigin(filename: string): boolean {
  try {
    const { hostname } = new URL(filename)
    const host = hostname.toLowerCase()
    return EXTERNAL_SCRIPT_ORIGINS.some(
      origin => host === origin || host.endsWith('.' + origin)
    )
  } catch {
    return false
  }
}

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  const environment = import.meta.env.VITE_SENTRY_ENVIRONMENT || 'production'

  if (!dsn) {
    // eslint-disable-next-line no-console
    console.warn('Sentry DSN not configured')
    return
  }

  Sentry.init({
    dsn,
    environment,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Performance Monitoring
    tracesSampleRate:
      Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE) || 1.0,

    // Session Replay
    replaysSessionSampleRate:
      Number(import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE) || 0.1,
    replaysOnErrorSampleRate:
      Number(import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE) || 1.0,

    beforeSend(event, _hint) {
      const frames = event.exception?.values?.[0]?.stacktrace?.frames ?? []

      const isBrowserExtension = frames.some(
        f =>
          f.filename &&
          BROWSER_EXTENSION_SCHEMES.some(scheme =>
            f.filename!.startsWith(scheme)
          )
      )
      if (isBrowserExtension) return null

      const isExternal = frames.some(
        f => f.filename && isExternalOrigin(f.filename)
      )
      if (isExternal) return null

      return event
    },
  })
}
