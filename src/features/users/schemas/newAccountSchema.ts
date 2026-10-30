import { z } from 'zod'

import { NAME_MAX_LENGTH } from '../data/accountRules'
import { USERS_CONTENT } from '../data/usersContent'

const { errors } = USERS_CONTENT

export const newAccountSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, errors.nameRequired)
      .max(NAME_MAX_LENGTH, errors.nameTooLong),
    email: z
      .string()
      .trim()
      .min(1, errors.emailRequired)
      .pipe(z.email(errors.emailInvalid)),
    role: z.enum(['admin', 'assistant', 'manager'], {
      error: errors.roleRequired,
    }),
    assignedCities: z.array(z.object({ city: z.string(), state: z.string() })),
  })
  // The API accepts a team member without a city, but that person would see nothing: the form
  // asks for one. The administration sees every city, so it needs none (and gets none).
  .refine(
    account => account.role === 'admin' || account.assignedCities.length > 0,
    { message: errors.citiesRequired, path: ['assignedCities'] }
  )

export type NewAccountValues = z.input<typeof newAccountSchema>
