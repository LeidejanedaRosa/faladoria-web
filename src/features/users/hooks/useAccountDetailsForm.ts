import { useEffect, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { USERS_CONTENT } from '../data/usersContent'
import {
  accountDetailsSchema,
  type AccountDetailsValues,
} from '../schemas/accountDetailsSchema'
import type { User } from '../services/usersApi'
import { accountChanges } from '../utils/accountChanges'
import { fieldOfApiError } from '../utils/fieldOfApiError'
import { userErrorMessage } from '../utils/userErrorMessage'
import { useUpdateUser } from './useUpdateUser'

const { account: content } = USERS_CONTENT

const FIELD_OF_CODE = { ASSIGNED_CITY_NOT_SERVED: 'assignedCities' } as const

const fieldOf = (error: unknown) => fieldOfApiError(error, FIELD_OF_CODE)

const valuesOf = (user: User): AccountDetailsValues => ({
  name: user.name,
  role: user.role,
  assignedCities: user.assignedCities,
})

export interface SaveResult {
  message: string
  complaintsOutOfReach: number
}

export const useAccountDetailsForm = (user: User) => {
  const form = useForm<AccountDetailsValues>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: valuesOf(user),
  })
  const updateMutation = useUpdateUser(user.id)
  const [result, setResult] = useState<SaveResult | null>(null)
  // The account as the form started: what the person changed is measured against it.
  const baseRef = useRef(valuesOf(user))
  const { isDirty } = form.formState

  const startFrom = (account: User) => {
    baseRef.current = valuesOf(account)
    form.reset(baseRef.current)
  }

  // A fresher copy (the list refreshed) replaces the form only while nothing was typed.
  useEffect(() => {
    if (isDirty) return
    baseRef.current = valuesOf(user)
    form.reset(baseRef.current)
  }, [user, isDirty, form])

  const submit = form.handleSubmit(values => {
    setResult(null)
    const changes = accountChanges(baseRef.current, values)
    if (Object.keys(changes).length === 0) {
      setResult({ message: content.nothingChanged, complaintsOutOfReach: 0 })
      return
    }
    updateMutation.mutate(changes, {
      onSuccess: updated => {
        startFrom(updated)
        setResult({
          message: content.saved(updated.name),
          complaintsOutOfReach: updated.complaintsOutOfReach,
        })
      },
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
    })
  })

  const role = form.watch('role')

  return {
    form,
    submit,
    result,
    isAdmin: role === 'admin',
    // The cities the account loses on saving, to warn before it happens.
    citiesToRemove:
      role === 'admin' && user.role !== 'admin'
        ? user.assignedCities.map(({ city, state }) => `${city}/${state}`)
        : [],
    isSubmitting: updateMutation.isPending,
    formError: fieldOf(updateMutation.error)
      ? undefined
      : userErrorMessage(updateMutation.error),
  }
}
