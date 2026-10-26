import { buildSession } from '@/test/fixtures/session'
import {
  apiErrorResponse,
  jsonResponse,
  routeApi,
  stubApi,
} from '@/test/mockFetch'
import { createQueryWrapper, createTestQueryClient } from '@/test/queryClient'

import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SESSION_QUERY_KEY } from '../useSession'
import { useSignOut } from '../useSignOut'

const OTHER_KEY = ['complaints', 'list']

const renderWithCachedData = () => {
  const client = createTestQueryClient()
  client.setQueryData(SESSION_QUERY_KEY, buildSession())
  client.setQueryData(OTHER_KEY, ['caso de outra pessoa'])
  const hook = renderHook(() => useSignOut(), {
    wrapper: createQueryWrapper(client),
  })
  return { ...hook, client }
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useSignOut', () => {
  it('drops every cached answer, not just the session', async () => {
    routeApi(stubApi(), {
      '/api/auth/sign-out': () => jsonResponse({ success: true }),
    })
    const { result, client } = renderWithCachedData()

    await act(() => result.current.mutateAsync())

    expect(client.getQueryData(SESSION_QUERY_KEY)).toBeUndefined()
    expect(client.getQueryData(OTHER_KEY)).toBeUndefined()
  })

  it("drops the cache even when the API fails, so the screen never keeps someone else's data", async () => {
    routeApi(stubApi(), {
      '/api/auth/sign-out': () => apiErrorResponse(500),
    })
    const { result, client } = renderWithCachedData()

    await act(() => result.current.mutateAsync().catch(() => undefined))

    expect(client.getQueryData(OTHER_KEY)).toBeUndefined()
  })
})
