import { buildSession, buildSessionUser } from '@/test/fixtures/session'
import {
  apiErrorResponse,
  calledPaths,
  deferredResponse,
  jsonResponse,
  routeApi,
  stubApi,
} from '@/test/mockFetch'
import { createQueryWrapper, createTestQueryClient } from '@/test/queryClient'

import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SESSION_QUERY_KEY, useSession } from '../useSession'
import { useSignIn } from '../useSignIn'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useSignIn', () => {
  it('sends e-mail and password and resolves only after the session is refreshed', async () => {
    const fetchMock = stubApi()
    const user = buildSessionUser()
    const sessionAfterSignIn = deferredResponse()
    let isSignedIn = false
    routeApi(fetchMock, {
      '/api/auth/sign-in/email': () => {
        isSignedIn = true
        return jsonResponse({ user })
      },
      '/api/auth/get-session': () =>
        isSignedIn ? sessionAfterSignIn.promise : jsonResponse(null),
    })
    const client = createTestQueryClient()
    // The login page reads the session too: invalidation only re-fetches an observed query.
    const { result } = renderHook(
      () => ({ signIn: useSignIn(), session: useSession() }),
      { wrapper: createQueryWrapper(client) }
    )
    await waitFor(() => expect(result.current.session.data).toBeNull())

    let hasResolved = false
    let signingIn: Promise<unknown> = Promise.resolve()
    act(() => {
      signingIn = result.current.signIn
        .mutateAsync({ email: user.email, password: 'segredo' })
        .then(() => {
          hasResolved = true
        })
    })
    await waitFor(() =>
      expect(calledPaths(fetchMock).at(-1)).toBe('/api/auth/get-session')
    )
    // The session answer is still held: signing in must not be over yet.
    expect(hasResolved).toBe(false)

    sessionAfterSignIn.release(jsonResponse(buildSession()))
    await act(() => signingIn)

    expect(client.getQueryData(SESSION_QUERY_KEY)).toEqual(buildSession())
    const signInCall = fetchMock.mock.calls.find(([input]) =>
      String(input).endsWith('/sign-in/email')
    )
    expect(JSON.parse(String(signInCall?.[1]?.body))).toEqual({
      email: user.email,
      password: 'segredo',
    })
  })

  it('exposes the API error with its code', async () => {
    routeApi(stubApi(), {
      '/api/auth/sign-in/email': () =>
        apiErrorResponse(401, 'INVALID_CREDENTIALS'),
    })
    const { result } = renderHook(() => useSignIn(), {
      wrapper: createQueryWrapper(),
    })

    act(() => result.current.mutate({ email: 'a@b.co', password: 'x' }))

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toMatchObject({ code: 'INVALID_CREDENTIALS' })
  })
})
