import { buildSession } from '@/test/fixtures/session'
import { jsonResponse, routeApi, stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useSession } from '../useSession'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useSession', () => {
  it('returns the signed-in person', async () => {
    const session = buildSession()
    routeApi(stubApi(), {
      '/api/auth/get-session': () => jsonResponse(session),
    })

    const { result } = renderHook(() => useSession(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.user.email).toBe('ana@faladoria.org')
  })

  it('returns null, as a success, when nobody is signed in', async () => {
    routeApi(stubApi(), { '/api/auth/get-session': () => jsonResponse(null) })

    const { result } = renderHook(() => useSession(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toBeNull()
  })
})
