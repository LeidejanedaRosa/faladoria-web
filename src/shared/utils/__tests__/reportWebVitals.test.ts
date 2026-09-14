import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Metric } from 'web-vitals'

import { reportWebVitals } from '../reportWebVitals'

vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onINP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}))

function fakeMetric(overrides: Partial<Metric> = {}): Metric {
  return {
    name: 'LCP',
    value: 1234,
    id: 'metric-1',
    ...overrides,
  } as Metric
}

// web-vitals types each onXXX callback param as its own narrowed metric subtype (e.g.
// `onLCP`'s callback only accepts `LCPMetric`, name: 'LCP'), so `tsc -b` (used by `pnpm build`,
// stricter than the `type-check` script's tsconfig) rejects passing the generic `Metric` these
// tests construct. Widening the captured mock callback's own type here is correct: at runtime
// it's always the same `vi.fn()` regardless of which onXXX registered it.
function asGenericCallback(
  callback: unknown
): ((metric: Metric) => void) | undefined {
  return callback as ((metric: Metric) => void) | undefined
}

describe('reportWebVitals', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('wires up all 5 Core Web Vitals hooks', async () => {
    const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals')

    reportWebVitals()

    expect(onCLS).toHaveBeenCalledOnce()
    expect(onFCP).toHaveBeenCalledOnce()
    expect(onINP).toHaveBeenCalledOnce()
    expect(onLCP).toHaveBeenCalledOnce()
    expect(onTTFB).toHaveBeenCalledOnce()
  })

  it('forwards each metric to the provided callback', async () => {
    const { onLCP } = await import('web-vitals')
    const onPerfEntry = vi.fn()

    reportWebVitals(onPerfEntry)
    const registeredCallback = asGenericCallback(
      vi.mocked(onLCP).mock.calls[0]?.[0]
    )
    const metric = fakeMetric()
    registeredCallback?.(metric)

    expect(onPerfEntry).toHaveBeenCalledWith(metric)
  })

  describe('default sendToAnalytics (no callback provided)', () => {
    beforeEach(() => {
      vi.stubEnv('DEV', true)

      vi.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
      vi.unstubAllEnvs()
    })

    it('logs to the console in dev mode instead of sending analytics', async () => {
      const { onLCP } = await import('web-vitals')
      reportWebVitals()
      const registeredCallback = asGenericCallback(
        vi.mocked(onLCP).mock.calls[0]?.[0]
      )
      const metric = fakeMetric()

      registeredCallback?.(metric)

      expect(console.log).toHaveBeenCalledWith(metric)
    })

    it('sends a gtag event in production when gtag is available', async () => {
      vi.stubEnv('DEV', false)
      const gtag = vi.fn()
      Object.assign(window, { gtag })

      const { onCLS } = await import('web-vitals')
      reportWebVitals()
      const registeredCallback = asGenericCallback(
        vi.mocked(onCLS).mock.calls[0]?.[0]
      )
      const metric = fakeMetric({ name: 'CLS', value: 0.05 })

      registeredCallback?.(metric)

      expect(gtag).toHaveBeenCalledWith(
        'event',
        'CLS',
        expect.objectContaining({
          value: 50,
          event_category: 'Web Vitals',
        })
      )

      Reflect.deleteProperty(window, 'gtag')
    })
  })
})
