import { describe, expect, it } from 'vitest'

import { isPanelPath } from '../routes'

describe('isPanelPath', () => {
  it.each(['/dashboard', '/dashboard/entrar', '/dashboard/reclamacoes/abc'])(
    'treats %s as a panel page',
    path => {
      expect(isPanelPath(path)).toBe(true)
    }
  )

  it.each(['/Dashboard', '/DASHBOARD/entrar', '/dashBoard/Trocar-Senha'])(
    'treats %s as a panel page, since the router ignores letter case',
    path => {
      expect(isPanelPath(path)).toBe(true)
    }
  )

  it.each(['/%64ashboard/entrar', '/dash%62oard', '/%44ASHBOARD'])(
    'treats %s as a panel page, since the router decodes the address',
    path => {
      expect(isPanelPath(path)).toBe(true)
    }
  )

  it('treats an address it cannot decode as a panel page, so it is never recorded', () => {
    expect(isPanelPath('/%E0%A4%A')).toBe(true)
  })

  it.each(['/', '/como-conseguir-pelo-sus', '/dashboardx', '/x/dashboard'])(
    'treats %s as the public site, even when it only looks alike',
    path => {
      expect(isPanelPath(path)).toBe(false)
    }
  )
})
