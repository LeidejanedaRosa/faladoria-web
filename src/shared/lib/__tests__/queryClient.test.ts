import { describe, expect, it } from 'vitest'

import { ApiError } from '../api'
import { createQueryClient, shouldRetry } from '../queryClient'

const apiError = (status: number) =>
  new ApiError({ status, code: 'X', message: 'x' })

describe('shouldRetry', () => {
  it('retries a lost connection, which can come back on its own', () => {
    expect(shouldRetry(0, apiError(0))).toBe(true)
  })

  it('retries a server error', () => {
    expect(shouldRetry(0, apiError(500))).toBe(true)
    expect(shouldRetry(1, apiError(503))).toBe(true)
  })

  it.each([400, 401, 403, 404, 409, 429])(
    'does not retry %i, which fails the same way every time',
    status => {
      expect(shouldRetry(0, apiError(status))).toBe(false)
    }
  )

  it('stops after two retries', () => {
    expect(shouldRetry(2, apiError(503))).toBe(false)
  })

  it('does not retry an error that is not from the API, like a missing VITE_API_URL', () => {
    expect(shouldRetry(0, new Error('VITE_API_URL is not set'))).toBe(false)
  })
})

describe('createQueryClient', () => {
  it('uses shouldRetry for every query', () => {
    const client = createQueryClient()

    expect(client.getDefaultOptions().queries?.retry).toBe(shouldRetry)
  })
})
