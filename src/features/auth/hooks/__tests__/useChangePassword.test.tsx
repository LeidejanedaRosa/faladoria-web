import { buildSession, buildSessionUser } from '@/test/fixtures/session'
import {
  apiErrorResponse,
  calledPaths,
  jsonResponse,
  routeApi,
  stubApi,
} from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useChangePassword } from '../useChangePassword'

const user = buildSessionUser()

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useChangePassword', () => {
  it('with a session: changes the password and closes the other sessions', async () => {
    const fetchMock = stubApi()
    routeApi(fetchMock, {
      '/api/auth/change-password': () => jsonResponse({ user }),
      '/api/auth/get-session': () => jsonResponse(buildSession()),
    })
    const { result } = renderHook(() => useChangePassword(), {
      wrapper: createQueryWrapper(),
    })

    await act(() =>
      result.current.mutateAsync({
        currentPassword: 'antiga',
        newPassword: 'nova-senha',
      })
    )

    expect(calledPaths(fetchMock)[0]).toBe('/api/auth/change-password')
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({
      currentPassword: 'antiga',
      newPassword: 'nova-senha',
      revokeOtherSessions: true,
    })
  })

  it('without a session: signs in with the current password first, then changes it', async () => {
    const fetchMock = stubApi()
    routeApi(fetchMock, {
      '/api/auth/sign-in/email': () => jsonResponse({ user }),
      '/api/auth/change-password': () => jsonResponse({ user }),
      '/api/auth/get-session': () => jsonResponse(buildSession()),
    })
    const { result } = renderHook(() => useChangePassword(), {
      wrapper: createQueryWrapper(),
    })

    await act(() =>
      result.current.mutateAsync({
        email: user.email,
        currentPassword: 'antiga',
        newPassword: 'nova-senha',
      })
    )

    expect(calledPaths(fetchMock).slice(0, 2)).toEqual([
      '/api/auth/sign-in/email',
      '/api/auth/change-password',
    ])
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({
      email: user.email,
      password: 'antiga',
    })
  })

  it('does not try to change when the sign-in fails', async () => {
    const fetchMock = stubApi()
    routeApi(fetchMock, {
      '/api/auth/sign-in/email': () =>
        apiErrorResponse(401, 'INVALID_CREDENTIALS'),
      '/api/auth/get-session': () => jsonResponse(null),
    })
    const { result } = renderHook(() => useChangePassword(), {
      wrapper: createQueryWrapper(),
    })

    act(() =>
      result.current.mutate({
        email: user.email,
        currentPassword: 'errada',
        newPassword: 'nova-senha',
      })
    )

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(calledPaths(fetchMock)).not.toContain('/api/auth/change-password')
  })
})
