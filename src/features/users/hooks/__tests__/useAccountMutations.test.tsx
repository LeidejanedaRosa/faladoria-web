import { ANA, CARLA, TEMPORARY_PASSWORD } from '@/test/fixtures/users'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper, createTestQueryClient } from '@/test/queryClient'

import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { User } from '../../services/usersApi'
import { useResetPassword, useSwitchAccess } from '../useAccountMutations'
import { USERS_QUERY_KEY } from '../useUsers'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const setup = <T,>(hook: () => T) => {
  const client = createTestQueryClient()
  client.setQueryData(USERS_QUERY_KEY, [ANA, CARLA])
  const invalidate = vi.spyOn(client, 'invalidateQueries')
  const { result } = renderHook(hook, {
    wrapper: createQueryWrapper(client),
  })
  return { client, invalidate, result }
}

describe('useResetPassword', () => {
  // The answer carries only the password: the new status comes with the list.
  it('refreshes the list once the password is reset', async () => {
    stubApi().mockResolvedValue(
      jsonResponse({ temporaryPassword: TEMPORARY_PASSWORD })
    )
    const { invalidate, result } = setup(() => useResetPassword(ANA.id))

    let answer: unknown
    await act(async () => {
      answer = await result.current.mutateAsync()
    })

    expect(answer).toEqual({ temporaryPassword: TEMPORARY_PASSWORD })
    expect(invalidate).toHaveBeenCalledWith({ queryKey: USERS_QUERY_KEY })
  })
})

describe('useSwitchAccess', () => {
  it('puts the deactivated account in the list at once', async () => {
    stubApi().mockResolvedValue(jsonResponse({ ...ANA, status: 'deactivated' }))
    const { client, result } = setup(() => useSwitchAccess(ANA.id))

    await act(() => result.current.mutateAsync('deactivate'))

    const list = client.getQueryData<User[]>(USERS_QUERY_KEY)!
    expect(list.map(user => user.status)).toEqual(['deactivated', 'active'])
  })

  // "Already deactivated": someone else acted first, so the page must show the account as it is.
  it('refreshes the list when the API refuses, too', async () => {
    stubApi().mockResolvedValue(
      apiErrorResponse(409, 'USER_ALREADY_DEACTIVATED')
    )
    const { client, invalidate, result } = setup(() => useSwitchAccess(ANA.id))

    await act(() => result.current.mutateAsync('deactivate').catch(() => {}))

    expect(client.getQueryData(USERS_QUERY_KEY)).toEqual([ANA, CARLA])
    expect(invalidate).toHaveBeenCalledWith({ queryKey: USERS_QUERY_KEY })
  })
})
