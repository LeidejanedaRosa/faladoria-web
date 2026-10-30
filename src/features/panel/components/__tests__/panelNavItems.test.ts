import { describe, expect, it } from 'vitest'

import { navItemsFor, PANEL_NAV_ITEMS } from '../panelNavItems'

describe('navItemsFor', () => {
  it.each(['admin', 'assistant', 'manager'] as const)(
    'gives %s the panel home',
    role => {
      expect(navItemsFor(role).map(item => item.to)).toContain('/dashboard')
    }
  )

  it('shows the served cities only to the administration', () => {
    expect(navItemsFor('admin').map(item => item.to)).toContain(
      '/dashboard/cidades'
    )
    expect(navItemsFor('assistant').map(item => item.to)).not.toContain(
      '/dashboard/cidades'
    )
    expect(navItemsFor('manager').map(item => item.to)).not.toContain(
      '/dashboard/cidades'
    )
  })

  it('shows the team only to the administration, before the served cities', () => {
    const adminPaths = navItemsFor('admin').map(item => item.to)
    expect(adminPaths.indexOf('/dashboard/equipe')).toBeGreaterThan(-1)
    expect(adminPaths.indexOf('/dashboard/equipe')).toBeLessThan(
      adminPaths.indexOf('/dashboard/cidades')
    )
    expect(navItemsFor('assistant').map(item => item.to)).not.toContain(
      '/dashboard/equipe'
    )
    expect(navItemsFor('manager').map(item => item.to)).not.toContain(
      '/dashboard/equipe'
    )
  })

  it('only lists pages that exist: every item points inside the panel', () => {
    for (const item of PANEL_NAV_ITEMS) {
      expect(item.to.startsWith('/dashboard')).toBe(true)
    }
  })
})
