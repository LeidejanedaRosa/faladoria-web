import { zodResolver } from '@hookform/resolvers/zod'
import { isApiError } from '@shared/lib/api'
import { useForm } from 'react-hook-form'

import {
  buildChangePasswordSchema,
  type ChangePasswordValues,
} from '../schemas/authSchemas'
import { authErrorMessage } from '../utils/authErrorMessage'
import { useChangePassword } from './useChangePassword'

// A wrong current password belongs to its field, where the person will fix it.
const isWrongCurrentPassword = (error: unknown) =>
  isApiError(error) && error.code === 'CURRENT_PASSWORD_INCORRECT'

/** Validation, submission and where each API error is shown, for ChangePasswordForm. */
export const useChangePasswordForm = (
  requireEmail: boolean,
  onChanged: () => void
) => {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(buildChangePasswordSchema(requireEmail)),
  })
  const mutation = useChangePassword()

  const submit = ({
    email,
    currentPassword,
    newPassword,
  }: ChangePasswordValues) =>
    mutation.mutate(
      { email: requireEmail ? email : undefined, currentPassword, newPassword },
      {
        onSuccess: onChanged,
        onError: error => {
          if (!isWrongCurrentPassword(error)) return
          form.setError(
            'currentPassword',
            { message: authErrorMessage(error) },
            { shouldFocus: true }
          )
        },
      }
    )

  return {
    register: form.register,
    errors: form.formState.errors,
    onSubmit: form.handleSubmit(submit),
    isSubmitting: mutation.isPending,
    formError: isWrongCurrentPassword(mutation.error)
      ? undefined
      : authErrorMessage(mutation.error),
  }
}
