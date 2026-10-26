import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormAlert,
  PasswordField,
  TextField,
} from '@shared/components/ui'
import { useForm } from 'react-hook-form'

import { AUTH_CONTENT } from '../data/authContent'
import { useSignIn } from '../hooks/useSignIn'
import { loginSchema, type LoginValues } from '../schemas/authSchemas'
import type { SessionUser } from '../services/authApi'
import { authErrorMessage } from '../utils/authErrorMessage'

interface LoginFormProps {
  onSignedIn: (user: SessionUser) => void
}

export const LoginForm = ({ onSignedIn }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })
  const signInMutation = useSignIn()
  const { login } = AUTH_CONTENT

  const onSubmit = (values: LoginValues) =>
    signInMutation.mutate(values, {
      onSuccess: ({ user }) => onSignedIn(user),
    })

  return (
    <form
      noValidate
      onSubmit={event => void handleSubmit(onSubmit)(event)}
      className='flex flex-col gap-5'
    >
      <FormAlert message={authErrorMessage(signInMutation.error)} />
      <TextField
        label={login.emailLabel}
        type='email'
        autoComplete='username'
        error={errors.email?.message}
        {...register('email')}
      />
      <PasswordField
        label={login.passwordLabel}
        autoComplete='current-password'
        error={errors.password?.message}
        {...register('password')}
      />
      <Button
        type='submit'
        isLoading={signInMutation.isPending}
        loadingText={login.submitting}
        className='w-full'
      >
        {login.submit}
      </Button>
      <p className='text-sm text-slate-600'>{login.forgotPassword}</p>
    </form>
  )
}
