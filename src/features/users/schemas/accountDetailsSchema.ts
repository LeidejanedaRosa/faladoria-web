import { z } from 'zod'

import {
  accountFields,
  CITIES_FOR_ROLE_ERROR,
  hasCitiesForRole,
} from './accountFields'

/** Editing an account: the e-mail is the login and cannot change, so it is not here. */
export const accountDetailsSchema = z
  .object(accountFields)
  .refine(hasCitiesForRole, CITIES_FOR_ROLE_ERROR)

export type AccountDetailsValues = z.input<typeof accountDetailsSchema>
