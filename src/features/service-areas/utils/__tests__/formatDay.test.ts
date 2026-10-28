import { describe, expect, it } from 'vitest'

import { formatDay } from '../formatDay'

describe('formatDay', () => {
  it('shows the day in Brasília time, not in UTC', () => {
    // 01:30 UTC on the 2nd is still 22:30 on the 1st in Brasília.
    expect(formatDay('2026-10-02T01:30:00.000Z')).toBe('01/10/2026')
  })
})
