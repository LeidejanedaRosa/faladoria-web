import {
  Button,
  FormAlert,
  PasswordField,
  TextField,
} from '@shared/components/ui'

import { AUTH_CONTENT } from '../data/authContent'
import { useChangePasswordForm } from '../hooks/useChangePasswordForm'

interface ChangePasswordFormProps {
  /** No session yet: ask for the e-mail and sign in before changing. */
  requireEmail: boolean
  /** The mandatory change after signing in with a temporary password. */
  isForced: boolean
  onChanged: () => void
}

export const ChangePasswordForm = ({
  requireEmail,
  isForced,
  onChanged,
}: ChangePasswordFormProps) => {
  const { register, errors, onSubmit, isSubmitting, formError } =
    useChangePasswordForm(requireEmail, onChanged)
  const { changePassword } = AUTH_CONTENT

  return (
    <form
      noValidate
      onSubmit={event => void onSubmit(event)}
      className='flex flex-col gap-5'
    >
      <FormAlert message={formError} />
      {requireEmail && (
        <TextField
          label={changePassword.emailLabel}
          type='email'
          autoComplete='username'
          error={errors.email?.message}
          {...register('email')}
        />
      )}
      <PasswordField
        label={
          isForced
            ? changePassword.forcedCurrentLabel
            : changePassword.currentLabel
        }
        autoComplete='current-password'
        error={errors.currentPassword?.message}
        {...register('currentPassword')}
      />
      <PasswordField
        label={changePassword.newLabel}
        hint={changePassword.newHint}
        autoComplete='new-password'
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />
      <PasswordField
        label={changePassword.confirmLabel}
        autoComplete='new-password'
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button
        type='submit'
        isLoading={isSubmitting}
        loadingText={changePassword.submitting}
        className='w-full'
      >
        {changePassword.submit}
      </Button>
    </form>
  )
}
