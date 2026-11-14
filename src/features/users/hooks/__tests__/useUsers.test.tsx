import { fakeUsersApi } from '@/test/fakeUsersApi'
import { ANA, BRUNO, buildUser, CARLA, DORA } from '@/test/fixtures/users'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper, createTestQueryClient } from '@/test/queryClient'

import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useActiveAccountCounts, USERS_QUERY_KEY, useUser } from '../useUsers'

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

describe('useActiveAccountCounts', () => {
  it('counts only the active accounts of each folder', async () => {
    const RITA = buildUser({ id: 'usr_rita', status: 'deactivated' })
    const LUIS = buildUser({ id: 'usr_luis', role: 'manager' })
    fakeUsersApi(stubApi(), { users: [ANA, CARLA, RITA, BRUNO, DORA, LUIS] })

    const { result } = renderHook(() => useActiveAccountCounts(), {
      wrapper: createQueryWrapper(),
    })

    // Team: Ana and Carla (Rita is deactivated). Managers: only Luis (Bruno and Dora have
    // not signed in yet, so they are not active either).
    await waitFor(() =>
      expect(result.current.data).toEqual({ team: 2, managers: 1 })
    )
  })

  it('counts zero in a folder with nobody active', async () => {
    fakeUsersApi(stubApi(), { users: [CARLA] })

    const { result } = renderHook(() => useActiveAccountCounts(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() =>
      expect(result.current.data).toEqual({ team: 1, managers: 0 })
    )
  })
})
