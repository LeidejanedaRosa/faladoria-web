import { describe, expect, it } from 'vitest'

import { navItemsFor, PANEL_NAV_ITEMS } from '../panelNavItems'

describe('navItemsFor', () => {
  it.each(['admin', 'assistant', 'manager'] as const)(
    'gives %s the panel home',
    role => {
      expect(navItemsFor(role).map(item => item.to)).toContain('/dashboard')
    }
  )

  it('only lists pages that exist: every item points inside the panel', () => {
    for (const item of PANEL_NAV_ITEMS) {
      expect(item.to.startsWith('/dashboard')).toBe(true)
    }
  })
})
