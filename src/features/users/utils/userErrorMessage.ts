import { isApiError } from '@shared/lib/api'

import { USERS_CONTENT } from '../data/usersContent'
import type { AssignedCity } from '../services/usersApi'

const { errors } = USERS_CONTENT

const placesIn = (details: unknown): string => {
  const cities =
    (details as { cities?: AssignedCity[] } | undefined)?.cities ?? []
  return cities.map(({ city, state }) => `${city}/${state}`).join(', ')
}

// Codes whose text does not depend on the error's details.
const FIXED_MESSAGES: Partial<Record<string, string>> = {
  USER_EMAIL_ALREADY_EXISTS: errors.USER_EMAIL_ALREADY_EXISTS,
  CANNOT_CHANGE_OWN_ROLE: errors.CANNOT_CHANGE_OWN_ROLE,
  NO_ACTIVE_ADMIN_LEFT: errors.NO_ACTIVE_ADMIN_LEFT,
  USER_NOT_FOUND: errors.USER_NOT_FOUND,
  CANNOT_DEACTIVATE_OWN_ACCOUNT: errors.CANNOT_DEACTIVATE_OWN_ACCOUNT,
  USER_ALREADY_DEACTIVATED: errors.USER_ALREADY_DEACTIVATED,
  USER_NOT_DEACTIVATED: errors.USER_NOT_DEACTIVATED,
  FORBIDDEN: errors.FORBIDDEN,
}

/** Decides by the API's stable `code`; anything unknown keeps the API's own message. */
export const userErrorMessage = (error: unknown): string | undefined => {
  if (!error) return undefined
  if (!isApiError(error)) return errors.generic
  if (error.code === 'ASSIGNED_CITY_NOT_SERVED')
    return errors.ASSIGNED_CITY_NOT_SERVED(placesIn(error.details))
  return FIXED_MESSAGES[error.code] ?? error.message
}
