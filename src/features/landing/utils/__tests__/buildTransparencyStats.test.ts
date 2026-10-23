import {
  EMPTY_PUBLIC_STATS,
  PUBLIC_STATS,
} from '@/test/fixtures/publicComplaints'

import { describe, expect, it } from 'vitest'

import { buildTransparencyStats } from '../buildTransparencyStats'

const cardById = (id: string, stats = PUBLIC_STATS) =>
  buildTransparencyStats(stats).find(card => card.id === id)

describe('buildTransparencyStats', () => {
  it('builds the four cards in display order', () => {
    expect(buildTransparencyStats(PUBLIC_STATS).map(card => card.id)).toEqual([
      'stat-total',
      'stat-resolved',
      'stat-mediation',
      'stat-unsolved',
    ])
  })

  it('shows the API total on the total card, without a percentage', () => {
    expect(cardById('stat-total')).toMatchObject({
      label: 'Total de Demandas',
      value: 48,
      isTotal: true,
    })
    expect(cardById('stat-total')?.detail).toBeUndefined()
  })

  it('counts "Em Mediação" as inReview plus inProgress', () => {
    expect(cardById('stat-mediation')?.value).toBe(9 + 14)
  })

  it('maps resolved and unresolved one to one', () => {
    expect(cardById('stat-resolved')?.value).toBe(19)
    expect(cardById('stat-unsolved')?.value).toBe(6)
  })

  it('shows each share of the total with its suffix', () => {
    expect(cardById('stat-resolved')?.detail).toBe('40% de sucesso')
    expect(cardById('stat-mediation')?.detail).toBe('48% em mediação')
    expect(cardById('stat-unsolved')?.detail).toBe('13% sem solução')
  })

  it('shows 0% instead of dividing by zero when nothing is published yet', () => {
    expect(cardById('stat-resolved', EMPTY_PUBLIC_STATS)).toMatchObject({
      value: 0,
      detail: '0% de sucesso',
    })
  })
})
