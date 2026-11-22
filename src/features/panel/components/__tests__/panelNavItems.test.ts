import { describe, expect, it } from 'vitest'

import { navItemsFor, PANEL_NAV_ITEMS } from '../panelNavItems'

const ROLES = ['admin', 'assistant', 'manager'] as const
const paths = (...args: Parameters<typeof navItemsFor>) =>
  navItemsFor(...args).map(item => item.to)

describe('navItemsFor', () => {
  it.each(ROLES)('gives %s the panel home in the main group', role => {
    expect(paths(role, 'main')).toContain('/dashboard')
  })

  // The admin reaches Equipe and Gestores through the folders, not the side menu.
  it.each(ROLES)('keeps the folders out of the side menu of %s', role => {
    expect(paths(role, 'main')).toEqual(['/dashboard'])
  })

  it('puts the served cities under settings, for the administration only', () => {
    expect(paths('admin', 'settings')).toEqual(['/dashboard/cidades'])
    expect(paths('admin', 'main')).not.toContain('/dashboard/cidades')
    expect(paths('assistant', 'settings')).toEqual([])
    expect(paths('manager', 'settings')).toEqual([])
  })

  it.each(ROLES)('loses no item of %s by splitting them in groups', role => {
    const allowed = PANEL_NAV_ITEMS.filter(item => item.roles.includes(role))

    expect([...paths(role, 'main'), ...paths(role, 'settings')]).toEqual(
      allowed.map(item => item.to)
    )
  })

  it('only lists pages that exist: every item points inside the panel', () => {
    for (const item of PANEL_NAV_ITEMS) {
      expect(item.to.startsWith('/dashboard')).toBe(true)
    }
  })
})
