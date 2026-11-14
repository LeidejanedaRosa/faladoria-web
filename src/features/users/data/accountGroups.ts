import type { UserRole } from '@features/auth'
import { PANEL_ROUTES } from '@shared/data/routes'

/** The admin's folders split the accounts: the Faladoria team, and the health managers. */
export type AccountGroup = 'team' | 'managers'

export const GROUP_ROLES: Record<AccountGroup, readonly UserRole[]> = {
  team: ['admin', 'assistant'],
  managers: ['manager'],
}

export const GROUP_ROUTES: Record<AccountGroup, string> = {
  team: PANEL_ROUTES.team,
  managers: PANEL_ROUTES.managers,
}

export const groupOf = (role: UserRole): AccountGroup =>
  GROUP_ROLES.managers.includes(role) ? 'managers' : 'team'
