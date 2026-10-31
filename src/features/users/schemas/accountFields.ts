import { z } from 'zod'

import { NAME_MAX_LENGTH } from '../data/accountRules'
import { USERS_CONTENT } from '../data/usersContent'

const { errors } = USERS_CONTENT

/** The fields an account is created and edited with, so both forms check them the same way. */
export const accountFields = {
  name: z
    .string()
    .trim()
    .min(1, errors.nameRequired)
    .max(NAME_MAX_LENGTH, errors.nameTooLong),
  role: z.enum(['admin', 'assistant', 'manager'], {
    error: errors.roleRequired,
  }),
  assignedCities: z.array(z.object({ city: z.string(), state: z.string() })),
}

// The API accepts a team member without a city, but that person would see nothing: the forms
// ask for one. The administration sees every city, so it needs none (and gets none).
export const hasCitiesForRole = (account: {
  role?: string
  assignedCities: unknown[]
}) => account.role === 'admin' || account.assignedCities.length > 0

export const CITIES_FOR_ROLE_ERROR = {
  message: errors.citiesRequired,
  path: ['assignedCities'],
}
