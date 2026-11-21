import { useEffect, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type AccountGroup, GROUP_ROLES } from '../data/accountGroups'
import {
  newAccountSchema,
  type NewAccountValues,
} from '../schemas/newAccountSchema'
import type { CreatedAccount } from '../services/usersApi'
import { fieldOfApiError } from '../utils/fieldOfApiError'
import { userErrorMessage } from '../utils/userErrorMessage'
import { useCreateUser } from './useCreateUser'

// Errors that belong to one field are shown on it; the rest go to the alert above the form.
const FIELD_OF_CODE = {
  USER_EMAIL_ALREADY_EXISTS: 'email',
  ASSIGNED_CITY_NOT_SERVED: 'assignedCities',
} as const

const fieldOf = (error: unknown) => fieldOfApiError(error, FIELD_OF_CODE)

export const useNewAccountForm = (
  group: AccountGroup,
  onCreated: (account: CreatedAccount & { name: string }) => void
) => {
  const roles = GROUP_ROLES[group]
  const form = useForm<NewAccountValues>({
    resolver: zodResolver(newAccountSchema),
    // A folder with a single role has nothing to choose: the account is created with it.
    defaultValues: {
      name: '',
      email: '',
      role: roles.length === 1 ? roles[0] : undefined,
      assignedCities: [],
    },
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
    roles,
    isAdmin: form.watch('role') === 'admin',
    isSubmitting: createMutation.isPending,
    // A field error is already on its field; anything else goes to the alert.
    formError: fieldOf(createMutation.error)
      ? undefined
      : userErrorMessage(createMutation.error),
  }
}
