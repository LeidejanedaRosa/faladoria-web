import type { ComponentType } from 'react'

import type { UserRole } from '@features/auth'
import { HomeIcon, LocationIcon } from '@shared/components/ui'
import { PANEL_ROUTES } from '@shared/data/routes'
import type { IconProps } from '@shared/types/icon'

import { PANEL_CONTENT } from '../data/panelContent'

/** "settings" items go under the Configurações heading, apart from the daily work. */
export type PanelNavGroup = 'main' | 'settings'

export interface PanelNavItem {
  to: string
  label: string
  icon: ComponentType<IconProps>
  roles: readonly UserRole[]
  group: PanelNavGroup
  /** Matches only the exact address (the home would otherwise be "current" everywhere). */
  end?: boolean
}

const EVERY_ROLE: readonly UserRole[] = ['admin', 'assistant', 'manager']

// Only pages that exist: each new panel feature adds its own item here, and no link ever
// leads to an empty page.
export const PANEL_NAV_ITEMS: readonly PanelNavItem[] = [
  {
    to: PANEL_ROUTES.root,
    label: PANEL_CONTENT.nav.home,
    icon: HomeIcon,
    roles: EVERY_ROLE,
    group: 'main',
    end: true,
  },
  {
    to: PANEL_ROUTES.serviceAreas,
    label: PANEL_CONTENT.nav.serviceAreas,
    icon: LocationIcon,
    roles: ['admin'],
    group: 'settings',
  },
]

export const navItemsFor = (role: UserRole, group: PanelNavGroup) =>
  PANEL_NAV_ITEMS.filter(
    item => item.roles.includes(role) && item.group === group
  )
