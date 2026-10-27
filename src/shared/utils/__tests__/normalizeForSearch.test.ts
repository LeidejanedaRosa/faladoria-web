import { describe, expect, it } from 'vitest'

import { normalizeForSearch } from '../normalizeForSearch'

describe('normalizeForSearch', () => {
  it('ignores accents, case and outer spaces', () => {
    expect(normalizeForSearch('  São João del-Rei ')).toBe('sao joao del-rei')
  })

  it('makes the spellings people type equal to the official one', () => {
    expect(normalizeForSearch('TRES CORACOES')).toBe(
      normalizeForSearch('Três Corações')
    )
  })
})
