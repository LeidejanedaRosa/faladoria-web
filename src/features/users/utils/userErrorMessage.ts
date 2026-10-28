import { isApiError } from '@shared/lib/api'

import { USERS_CONTENT } from '../data/usersContent'
import type { AssignedCity } from '../services/usersApi'

const { errors } = USERS_CONTENT

const placesIn = (details: unknown): string => {
  const cities =
    (details as { cities?: AssignedCity[] } | undefined)?.cities ?? []
  return cities.map(({ city, state }) => `${city}/${state}`).join(', ')
}

/** Decides by the API's stable `code`; anything unknown keeps the API's own message. */
export const userErrorMessage = (error: unknown): string | undefined => {
  if (!error) return undefined
  if (!isApiError(error)) return errors.generic
  switch (error.code) {
    case 'USER_EMAIL_ALREADY_EXISTS':
    case 'FORBIDDEN':
      return errors[error.code]
    case 'ASSIGNED_CITY_NOT_SERVED':
      return errors.ASSIGNED_CITY_NOT_SERVED(placesIn(error.details))
    default:
      return error.message
  }
}
