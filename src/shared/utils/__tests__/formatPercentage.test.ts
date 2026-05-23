import { describe, expect, it } from 'vitest'

import { calculatePercentage, formatPercentage } from '../formatPercentage'

describe('calculatePercentage', () => {
  it('returns 0 when total is 0 (division-by-zero guard)', () => {
    expect(calculatePercentage(50, 0)).toBe(0)
  })

  it('returns 100 when value equals total', () => {
    expect(calculatePercentage(10, 10)).toBe(100)
  })

  it('rounds to the nearest integer', () => {
    expect(calculatePercentage(1, 3)).toBe(33)
    expect(calculatePercentage(2, 3)).toBe(67)
  })

  it('handles normal integer result', () => {
    expect(calculatePercentage(25, 100)).toBe(25)
  })

  it('returns 0 when value is 0', () => {
    expect(calculatePercentage(0, 100)).toBe(0)
  })
})

describe('formatPercentage', () => {
  it('returns a string ending with %', () => {
    expect(formatPercentage(50, 100)).toBe('50%')
  })

  it('returns "0%" when total is 0', () => {
    expect(formatPercentage(5, 0)).toBe('0%')
  })

  it('rounds and formats correctly', () => {
    expect(formatPercentage(1, 3)).toBe('33%')
  })
})
