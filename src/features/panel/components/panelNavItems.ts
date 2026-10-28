import type { ComponentType } from 'react'

import type { UserRole } from '@features/auth/services/authApi'
import { HomeIcon, LocationIcon, UsersIcon } from '@shared/components/ui'
import { PANEL_ROUTES } from '@shared/data/routes'
import type { IconProps } from '@shared/types/icon'

import { PANEL_CONTENT } from '../data/panelContent'

export interface PanelNavItem {
  to: string
  label: string
  icon: ComponentType<IconProps>
  roles: readonly UserRole[]
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
    end: true,
  },
  {
    to: PANEL_ROUTES.team,
    label: PANEL_CONTENT.nav.team,
    icon: UsersIcon,
    roles: ['admin'],
  },
  {
    to: PANEL_ROUTES.serviceAreas,
    label: PANEL_CONTENT.nav.serviceAreas,
    icon: LocationIcon,
    roles: ['admin'],
  },
]

export const navItemsFor = (role: UserRole) =>
  PANEL_NAV_ITEMS.filter(item => item.roles.includes(role))
