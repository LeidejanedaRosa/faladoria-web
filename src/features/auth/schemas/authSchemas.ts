import { z } from 'zod'

import { AUTH_CONTENT } from '../data/authContent'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../data/passwordRules'

const { validation } = AUTH_CONTENT

const emailField = z
  .string({ error: validation.emailRequired })
  .trim()
  .min(1, validation.emailRequired)
  .pipe(z.email(validation.emailInvalid))

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, validation.passwordRequired),
})

export type LoginValues = z.infer<typeof loginSchema>

/**
 * `requireEmail` when there is no session yet (the change starts from the login screen): the
 * API only changes the password of a signed-in person, so the form signs in first.
 */
export const buildChangePasswordSchema = (requireEmail: boolean) =>
  z
    .object({
      email: requireEmail ? emailField : z.string().optional(),
      currentPassword: z.string().min(1, validation.currentRequired),
      newPassword: z
        .string()
        .min(PASSWORD_MIN_LENGTH, validation.newTooShort)
        .max(PASSWORD_MAX_LENGTH, validation.newTooLong),
      confirmPassword: z.string(),
    })
    .refine(values => values.newPassword !== values.currentPassword, {
      message: validation.newSameAsCurrent,
      path: ['newPassword'],
    })
    .refine(values => values.confirmPassword === values.newPassword, {
      message: validation.confirmMismatch,
      path: ['confirmPassword'],
    })

export type ChangePasswordValues = z.infer<
  ReturnType<typeof buildChangePasswordSchema>
>
