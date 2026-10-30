import { useEffect, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { isApiError } from '@shared/lib/api'
import { useForm } from 'react-hook-form'

import {
  newAccountSchema,
  type NewAccountValues,
} from '../schemas/newAccountSchema'
import type { CreatedAccount } from '../services/usersApi'
import { userErrorMessage } from '../utils/userErrorMessage'
import { useCreateUser } from './useCreateUser'

// Errors that belong to one field are shown on it; the rest go to the alert above the form.
const FIELD_OF_CODE = {
  USER_EMAIL_ALREADY_EXISTS: 'email',
  ASSIGNED_CITY_NOT_SERVED: 'assignedCities',
} as const

const fieldOf = (error: unknown) =>
  isApiError(error) && error.code in FIELD_OF_CODE
    ? FIELD_OF_CODE[error.code as keyof typeof FIELD_OF_CODE]
    : undefined

export const useNewAccountForm = (
  onCreated: (account: CreatedAccount & { name: string }) => void
) => {
  const form = useForm<NewAccountValues>({
    resolver: zodResolver(newAccountSchema),
    defaultValues: { name: '', email: '', assignedCities: [] },
  })
  const createMutation = useCreateUser()
  const nameRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const submit = form.handleSubmit(values =>
    createMutation.mutate(
      {
        ...values,
        // The administration sees every city: a list sent along would mean nothing.
        assignedCities: values.role === 'admin' ? [] : values.assignedCities,
      },
      {
        onSuccess: created =>
          onCreated({ ...created, name: values.name.trim() }),
        onError: error => {
          const field = fieldOf(error)
          if (field) {
            form.setError(
              field,
              { message: userErrorMessage(error) },
              { shouldFocus: true }
            )
          }
        },
      }
    )
  )

  return {
    form,
    submit,
    nameRef,
    isAdmin: form.watch('role') === 'admin',
    isSubmitting: createMutation.isPending,
    // A field error is already on its field; anything else goes to the alert.
    formError: fieldOf(createMutation.error)
      ? undefined
      : userErrorMessage(createMutation.error),
  }
}
