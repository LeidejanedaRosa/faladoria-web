import { ibgeCities } from '@/test/fixtures/serviceAreas'
import { jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useIbgeCities } from '../useIbgeCities'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useIbgeCities', () => {
  it('asks nothing before a state is chosen', () => {
    const fetchMock = stubApi()

    const { result } = renderHook(() => useIbgeCities(''), {
      wrapper: createQueryWrapper(),
    })

    expect(fetchMock).not.toHaveBeenCalled()
    expect(result.current.fetchStatus).toBe('idle')
  })

  it('lists the cities of the chosen state', async () => {
    stubApi().mockResolvedValue(jsonResponse(ibgeCities('Alfenas', 'Varginha')))

    const { result } = renderHook(() => useIbgeCities('MG'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() =>
      expect(result.current.data).toEqual(['Alfenas', 'Varginha'])
    )
  })

  it('tries once more and then reports the failure, so the form can offer free text', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValue(new Response('down', { status: 503 }))

    const { result } = renderHook(() => useIbgeCities('MG'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true), {
      timeout: 3000,
    })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
