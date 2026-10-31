import { z } from 'zod'

import { USERS_CONTENT } from '../data/usersContent'
import {
  accountFields,
  CITIES_FOR_ROLE_ERROR,
  hasCitiesForRole,
} from './accountFields'

const { errors } = USERS_CONTENT

export const newAccountSchema = z
  .object({
    name: accountFields.name,
    email: z
      .string()
      .trim()
      .min(1, errors.emailRequired)
      .pipe(z.email(errors.emailInvalid)),
    role: accountFields.role,
    assignedCities: accountFields.assignedCities,
  })
  .refine(hasCitiesForRole, CITIES_FOR_ROLE_ERROR)

export type NewAccountValues = z.input<typeof newAccountSchema>
