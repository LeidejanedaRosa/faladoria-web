import { fakeUsersApi } from '@/test/fakeUsersApi'
import { ANA, CARLA } from '@/test/fixtures/users'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper, createTestQueryClient } from '@/test/queryClient'

import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { USERS_QUERY_KEY, useUser } from '../useUsers'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useUser', () => {
  it('finds the account in the team list', async () => {
    fakeUsersApi(stubApi(), { users: [ANA, CARLA] })

    const { result } = renderHook(() => useUser('usr_carla'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.data).toEqual(CARLA))
  })

  it('answers null, not an error, for an account not in the list', async () => {
    fakeUsersApi(stubApi(), { users: [ANA] })

    const { result } = renderHook(() => useUser('usr_nobody'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBeNull()
  })

  // Opened from the list: no loading screen, and the refresh brings what changed meanwhile.
  it('shows the cached account at once, then the refreshed one', async () => {
    fakeUsersApi(stubApi(), {
      users: [{ ...ANA, name: 'Ana Lima' }, CARLA],
    })
    const client = createTestQueryClient()
    client.setQueryData(USERS_QUERY_KEY, [ANA, CARLA])

    const { result } = renderHook(() => useUser('usr_ana'), {
      wrapper: createQueryWrapper(client),
    })

    expect(result.current.data).toEqual(ANA)
    await waitFor(() => expect(result.current.data?.name).toBe('Ana Lima'))
  })
})
