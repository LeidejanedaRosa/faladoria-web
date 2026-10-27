import { describe, expect, it } from 'vitest'

import { rankMatches } from '../rankMatches'

const CITIES = [
  'Alfenas',
  'São José da Varginha',
  'Vargem Alegre',
  'Varginha',
  'Lavras',
]

describe('rankMatches', () => {
  it('lists the names that start with the text before those that only contain it', () => {
    expect(rankMatches(CITIES, 'varg')).toEqual([
      'Vargem Alegre',
      'Varginha',
      'São José da Varginha',
    ])
  })

  it('finds a name typed without accents or capitals', () => {
    expect(rankMatches(CITIES, 'sao jose')).toEqual(['São José da Varginha'])
  })

  it('returns every option, in order, when nothing is typed', () => {
    expect(rankMatches(CITIES, '  ')).toEqual(CITIES)
  })

  it('returns nothing when no name matches', () => {
    expect(rankMatches(CITIES, 'xyz')).toEqual([])
  })
})
