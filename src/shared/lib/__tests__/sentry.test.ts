import * as Sentry from '@sentry/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { initSentry } from '../sentry'

vi.mock('@sentry/react', () => ({
  init: vi.fn(),
  browserTracingIntegration: vi.fn(() => 'browserTracingIntegration'),
  replayIntegration: vi.fn(() => 'replayIntegration'),
}))

describe('initSentry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('VITE_SENTRY_DSN', '')

    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('does not call Sentry.init when no DSN is configured', () => {
    initSentry()

    expect(Sentry.init).not.toHaveBeenCalled()

    expect(console.warn).toHaveBeenCalledWith('Sentry DSN not configured')
  })

  it('calls Sentry.init with the configured DSN and environment', () => {
    vi.stubEnv('VITE_SENTRY_DSN', 'https://key@example.ingest.sentry.io/1')
    vi.stubEnv('VITE_SENTRY_ENVIRONMENT', 'staging')

    initSentry()

    expect(Sentry.init).toHaveBeenCalledWith(
      expect.objectContaining({
        dsn: 'https://key@example.ingest.sentry.io/1',
        environment: 'staging',
      })
    )
  })

  it('defaults environment to production when unset', () => {
    vi.stubEnv('VITE_SENTRY_DSN', 'https://key@example.ingest.sentry.io/1')
    vi.stubEnv('VITE_SENTRY_ENVIRONMENT', '')

    initSentry()

    expect(Sentry.init).toHaveBeenCalledWith(
      expect.objectContaining({ environment: 'production' })
    )
  })

  describe('beforeSend filter', () => {
    function getBeforeSend(): (
      event: Sentry.ErrorEvent,
      hint: Sentry.EventHint
    ) => Sentry.ErrorEvent | null {
      vi.stubEnv('VITE_SENTRY_DSN', 'https://key@example.ingest.sentry.io/1')
      initSentry()
      const call = vi.mocked(Sentry.init).mock.calls[0]?.[0]
      return call!.beforeSend as never
    }

    function eventWithFrames(
      frames: { filename?: string }[]
    ): Sentry.ErrorEvent {
      return {
        exception: { values: [{ stacktrace: { frames } }] },
      } as unknown as Sentry.ErrorEvent
    }

    it('drops events originating from a browser extension', () => {
      const beforeSend = getBeforeSend()
      const event = eventWithFrames([
        { filename: 'chrome-extension://abc/content.js' },
      ])

      expect(beforeSend(event, {})).toBeNull()
    })

    it('drops events originating from a known external script', () => {
      const beforeSend = getBeforeSend()
      const event = eventWithFrames([
        { filename: 'https://www.googletagmanager.com/gtm.js' },
      ])

      expect(beforeSend(event, {})).toBeNull()
    })

    it('keeps events originating from the app itself', () => {
      const beforeSend = getBeforeSend()
      const event = eventWithFrames([
        { filename: 'https://faladoria-web.vercel.app/assets/index.js' },
      ])

      expect(beforeSend(event, {})).toBe(event)
    })

    it('keeps events with no stack frames at all', () => {
      const beforeSend = getBeforeSend()
      const event = {} as Sentry.ErrorEvent

      expect(beforeSend(event, {})).toBe(event)
    })
  })
})
