import { describe, expect, it } from 'vitest'

import { formatPublicDay } from '../formatPublicDay'

describe('formatPublicDay', () => {
  it('shows the API day as dd/mm/yyyy', () => {
    expect(formatPublicDay('2026-09-30')).toBe('30/09/2026')
  })

  it('keeps the same day, where going through Date in Brazil would show the 29th', () => {
    expect(formatPublicDay('2026-09-30')).not.toBe('29/09/2026')
  })

  it('keeps the first day of the year, the worst case for the UTC shift', () => {
    expect(formatPublicDay('2027-01-01')).toBe('01/01/2027')
  })

  it('returns an unexpected value untouched instead of showing a broken date', () => {
    expect(formatPublicDay('2026-09-30T13:05:00.000Z')).toBe(
      '2026-09-30T13:05:00.000Z'
    )
    expect(formatPublicDay('')).toBe('')
  })
})
