import { describe, expect, it } from 'vitest'

import { initialsOf } from '../initialsOf'

describe('initialsOf', () => {
  it('takes the first letters of the first and last names, skipping the middle ones', () => {
    expect(initialsOf('Ana Maria Souza')).toBe('AS')
  })

  it('takes a single letter from a single name', () => {
    expect(initialsOf('Ana')).toBe('A')
  })

  it('ignores extra spaces and writes the letters in capitals', () => {
    expect(initialsOf('  ana   souza ')).toBe('AS')
  })

  it('keeps accented letters', () => {
    expect(initialsOf('Élida Ávila')).toBe('ÉÁ')
  })

  it('gives nothing for a blank name', () => {
    expect(initialsOf('   ')).toBe('')
  })
})
