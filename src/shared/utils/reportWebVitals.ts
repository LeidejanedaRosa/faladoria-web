import { type Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

export function reportWebVitals(onPerfEntry?: (metric: Metric) => void) {
  const send = onPerfEntry ?? sendToAnalytics

  onCLS(send)
  onFCP(send)
  onINP(send)
  onLCP(send)
  onTTFB(send)
}

function sendToAnalytics(metric: Metric) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(metric)
    return
  }

  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }
}
