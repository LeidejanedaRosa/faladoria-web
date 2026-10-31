import { ANA, CARLA } from '@/test/fixtures/users'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper, createTestQueryClient } from '@/test/queryClient'

import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { User } from '../../services/usersApi'
import { useUpdateUser } from '../useUpdateUser'
import { USERS_QUERY_KEY } from '../useUsers'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const setup = () => {
  const client = createTestQueryClient()
  client.setQueryData(USERS_QUERY_KEY, [ANA, CARLA])
  const invalidate = vi.spyOn(client, 'invalidateQueries')
  const { result } = renderHook(() => useUpdateUser(ANA.id), {
    wrapper: createQueryWrapper(client),
  })
  return { client, invalidate, result }
}

describe('useUpdateUser', () => {
  it('puts the saved account in the list at once, then refreshes it', async () => {
    const fetchMock = stubApi()
    const saved = { ...ANA, name: 'Ana Lima', complaintsOutOfReach: 0 }
    fetchMock.mockResolvedValue(jsonResponse(saved))
    const { client, invalidate, result } = setup()

    await act(() => result.current.mutateAsync({ name: 'Ana Lima' }))

    const list = client.getQueryData<User[]>(USERS_QUERY_KEY)!
    expect(list.map(user => user.name)).toEqual(['Ana Lima', CARLA.name])
    expect(invalidate).toHaveBeenCalledWith({ queryKey: USERS_QUERY_KEY })
  })

  it('leaves the list as it was when the API refuses the change', async () => {
    stubApi().mockResolvedValue(apiErrorResponse(409, 'NO_ACTIVE_ADMIN_LEFT'))
    const { client, invalidate, result } = setup()

    await act(() =>
      result.current.mutateAsync({ role: 'assistant' }).catch(() => {})
    )

    expect(client.getQueryData(USERS_QUERY_KEY)).toEqual([ANA, CARLA])
    expect(invalidate).not.toHaveBeenCalled()
  })
})
