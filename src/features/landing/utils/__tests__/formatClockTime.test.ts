import { describe, expect, it } from 'vitest'

import { formatClockTime } from '../formatClockTime'

// Dates built from local parts, so the expectation holds in any machine's time zone.
const localTime = (hours: number, minutes: number) =>
  new Date(2026, 9, 23, hours, minutes).getTime()

describe('formatClockTime', () => {
  it('shows hours and minutes in the 24-hour clock', () => {
    expect(formatClockTime(localTime(14, 32))).toBe('14:32')
  })

  it('keeps the leading zero, so the badge width does not jump', () => {
    expect(formatClockTime(localTime(9, 5))).toBe('09:05')
  })

  it('shows midnight as 00:00, not 24:00', () => {
    expect(formatClockTime(localTime(0, 0))).toBe('00:00')
  })
})
