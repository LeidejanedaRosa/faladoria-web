import { isPanelPath } from '@shared/data/routes'

import { AUTH_ROUTES } from '../data/authContent'

export interface ReturnPathState {
  from?: string
}

const AUTH_PATHS: readonly string[] = [
  AUTH_ROUTES.login,
  AUTH_ROUTES.changePassword,
]

/**
 * Where to go after signing in: back to the panel page the guard sent the person away from.
 * Only a panel path is accepted, never another site or the auth pages themselves.
 */
export const returnPathFrom = (state: unknown): string => {
  const from = (state as ReturnPathState | null)?.from
  if (typeof from !== 'string') return AUTH_ROUTES.home
  const pathname = from.split(/[#?]/)[0]
  // isPanelPath only accepts /dashboard or /dashboard/…, which already rules out other sites
  // (https://…, //…): navigation stays inside this app.
  const isSafe = isPanelPath(pathname) && !AUTH_PATHS.includes(pathname)
  return isSafe ? from : AUTH_ROUTES.home
}
