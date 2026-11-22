import { buildStaffAction } from '@/test/fixtures/staffActions'

import { describe, expect, it } from 'vitest'

import { formatTime, groupByDay } from '../groupByDay'

// 22 Nov 2026, 15:00 in Brasília (UTC-3).
const NOW = new Date('2026-11-22T18:00:00.000Z')
const at = (occurredAt: string) => buildStaffAction({ occurredAt })

describe('groupByDay', () => {
  it('puts the actions under today, yesterday and older dates, keeping their order', () => {
    const days = groupByDay(
      [
        at('2026-11-22T17:00:00.000Z'),
        at('2026-11-22T12:00:00.000Z'),
        at('2026-11-21T14:00:00.000Z'),
        at('2026-11-19T14:00:00.000Z'),
      ],
      NOW
    )

    expect(days.map(day => [day.key, day.label, day.actions.length])).toEqual([
      ['2026-11-22', 'Hoje', 2],
      ['2026-11-21', 'Ontem', 1],
      ['2026-11-19', '19 de novembro de 2026', 1],
    ])
  })

  it('counts the day in Brasília time: 01:30 UTC is still the day before', () => {
    const [day] = groupByDay([at('2026-11-22T01:30:00.000Z')], NOW)

    expect(day).toMatchObject({ key: '2026-11-21', label: 'Ontem' })
  })

  it('keeps one heading per day across pages that meet in the middle of a day', () => {
    const days = groupByDay(
      [at('2026-11-20T15:00:00.000Z'), at('2026-11-20T13:00:00.000Z')],
      NOW
    )

    expect(days).toHaveLength(1)
  })

  it('has nothing to group without actions', () => {
    expect(groupByDay([], NOW)).toEqual([])
  })
})

describe('formatTime', () => {
  it('shows the hour and minute in Brasília time', () => {
    expect(formatTime('2026-11-21T17:03:00.000Z')).toBe('14:03')
  })
})
