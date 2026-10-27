import { describe, expect, it, vi } from 'vitest'

import { ApiError } from '../api'
import { createQueryClient, isSessionLost, shouldRetry } from '../queryClient'

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

describe('isSessionLost', () => {
  it.each([
    [401, 'UNAUTHENTICATED'],
    [403, 'MUST_CHANGE_PASSWORD'],
  ])('treats %i %s as a lost session', (status, code) => {
    expect(isSessionLost(new ApiError({ status, code, message: 'x' }))).toBe(
      true
    )
  })

  it.each([
    [401, 'INVALID_CREDENTIALS'],
    [403, 'FORBIDDEN'],
    [403, 'COMPLAINT_OUT_OF_SCOPE'],
    [500, 'INTERNAL_ERROR'],
  ])('keeps the session on %i %s', (status, code) => {
    expect(isSessionLost(new ApiError({ status, code, message: 'x' }))).toBe(
      false
    )
  })

  it('ignores errors that are not from the API', () => {
    expect(isSessionLost(new Error('x'))).toBe(false)
  })
})

describe('createQueryClient: lost session', () => {
  const lostSession = new ApiError({
    status: 401,
    code: 'UNAUTHENTICATED',
    message: 'x',
  })

  it('tells the app when a query finds the session gone', async () => {
    const onSessionLost = vi.fn()
    const client = createQueryClient({ onSessionLost })

    await client
      .fetchQuery({
        queryKey: ['counts'],
        queryFn: () => Promise.reject(lostSession),
        retry: false,
      })
      .catch(() => undefined)

    expect(onSessionLost).toHaveBeenCalledTimes(1)
  })

  it('tells the app when a mutation finds the session gone', async () => {
    const onSessionLost = vi.fn()
    const client = createQueryClient({ onSessionLost })

    await client
      .getMutationCache()
      .build(client, { mutationFn: () => Promise.reject(lostSession) })
      .execute(undefined)
      .catch(() => undefined)

    expect(onSessionLost).toHaveBeenCalledTimes(1)
  })

  it('stays quiet on any other error', async () => {
    const onSessionLost = vi.fn()
    const client = createQueryClient({ onSessionLost })

    await client
      .fetchQuery({
        queryKey: ['counts'],
        queryFn: () =>
          Promise.reject(
            new ApiError({ status: 500, code: 'X', message: 'x' })
          ),
        retry: false,
      })
      .catch(() => undefined)

    expect(onSessionLost).not.toHaveBeenCalled()
  })
})
