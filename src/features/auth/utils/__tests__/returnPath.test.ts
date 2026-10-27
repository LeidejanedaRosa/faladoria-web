import { describe, expect, it } from 'vitest'

import { returnPathFrom } from '../returnPath'

describe('returnPathFrom', () => {
  it('returns to the panel page the guard sent the person away from', () => {
    expect(returnPathFrom({ from: '/dashboard/reclamacoes' })).toBe(
      '/dashboard/reclamacoes'
    )
  })

  it('keeps the query string, so a filtered list comes back filtered', () => {
    expect(returnPathFrom({ from: '/dashboard/reclamacoes?status=open' })).toBe(
      '/dashboard/reclamacoes?status=open'
    )
  })

  it.each([
    ['nothing was saved', null],
    ['the state has no "from"', {}],
    ['"from" is not text', { from: 42 }],
  ])('goes to the panel home when %s', (_, state) => {
    expect(returnPathFrom(state)).toBe('/dashboard')
  })

  it.each([
    'https://outro-site.com/dashboard',
    '//outro-site.com/dashboard',
    '/como-conseguir-pelo-sus',
    '/dashboardx',
  ])('never sends the person outside the panel: %s', from => {
    expect(returnPathFrom({ from })).toBe('/dashboard')
  })

  it.each(['/dashboard/entrar', '/dashboard/trocar-senha?x=1'])(
    'never returns to the auth pages themselves: %s',
    from => {
      expect(returnPathFrom({ from })).toBe('/dashboard')
    }
  )
})
