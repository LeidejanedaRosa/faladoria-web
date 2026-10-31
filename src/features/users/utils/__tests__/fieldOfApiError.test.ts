import { ApiError } from '@shared/lib/api'
import { describe, expect, it } from 'vitest'

import { fieldOfApiError } from '../fieldOfApiError'

const FIELDS = { ASSIGNED_CITY_NOT_SERVED: 'assignedCities' } as const

describe('fieldOfApiError', () => {
  it('names the field an API error belongs to', () => {
    const error = new ApiError({
      status: 400,
      code: 'ASSIGNED_CITY_NOT_SERVED',
      message: 'Erro.',
    })

    expect(fieldOfApiError(error, FIELDS)).toBe('assignedCities')
  })

  it('leaves to the alert an API error of no field, and any other failure', () => {
    expect(
      fieldOfApiError(
        new ApiError({
          status: 409,
          code: 'NO_ACTIVE_ADMIN_LEFT',
          message: 'Erro.',
        }),
        FIELDS
      )
    ).toBeUndefined()
    expect(fieldOfApiError(new TypeError('offline'), FIELDS)).toBeUndefined()
  })
})
