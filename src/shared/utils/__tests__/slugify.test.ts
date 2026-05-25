import { describe, expect, it } from 'vitest'

import { slugify } from '../slugify'

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world')
  })

  it('lowercases the result', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('removes diacritics', () => {
    expect(slugify('Coração')).toBe('coracao')
    expect(slugify('Atenção')).toBe('atencao')
    expect(slugify('São Paulo')).toBe('sao-paulo')
  })

  it('removes special characters', () => {
    expect(slugify('hello! world?')).toBe('hello-world')
    expect(slugify('foo & bar')).toBe('foo-bar')
  })

  it('collapses multiple separators into one hyphen', () => {
    expect(slugify('foo   bar')).toBe('foo-bar')
    expect(slugify('foo -- bar')).toBe('foo-bar')
  })

  it('strips leading and trailing hyphens', () => {
    expect(slugify('  hello  ')).toBe('hello')
    expect(slugify('!hello!')).toBe('hello')
  })

  it('preserves numbers', () => {
    expect(slugify('step 2 of 3')).toBe('step-2-of-3')
  })

  it('returns empty string for blank input', () => {
    expect(slugify('')).toBe('')
    expect(slugify('   ')).toBe('')
  })
})
