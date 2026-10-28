import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper, createTestQueryClient } from '@/test/queryClient'

import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  useCreateServiceArea,
  useReactivateServiceArea,
  useRemoveServiceArea,
  useUpdateServiceAreaLocation,
} from '../useServiceAreaMutations'
import { SERVICE_AREAS_QUERY_KEY } from '../useServiceAreas'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const setup = () => {
  const client = createTestQueryClient()
  const invalidate = vi.spyOn(client, 'invalidateQueries')
  return { invalidate, wrapper: createQueryWrapper(client) }
}

describe('service area mutations', () => {
  it.each([
    ['adding', useCreateServiceArea, { city: 'Lavras', state: 'MG' }],
    [
      'correcting',
      useUpdateServiceAreaLocation,
      { serviceAreaId: 'sa_1', city: 'Lavras', state: 'MG' },
    ],
    ['removing', useRemoveServiceArea, 'sa_1'],
    ['reactivating', useReactivateServiceArea, 'sa_1'],
  ] as const)(
    'refetch both lists after %s a city',
    async (_action, useAction, input) => {
      stubApi().mockResolvedValue(jsonResponse({ serviceAreaId: 'sa_1' }))
      const { invalidate, wrapper } = setup()
      const { result } = renderHook(() => useAction(), { wrapper })

      await act(() =>
        (result.current.mutateAsync as (input: unknown) => Promise<unknown>)(
          input
        )
      )

      expect(invalidate).toHaveBeenCalledWith({
        queryKey: SERVICE_AREAS_QUERY_KEY,
      })
    }
  )

  it('refetches the lists when someone else changed the city meanwhile', async () => {
    stubApi().mockResolvedValue(
      apiErrorResponse(409, 'SERVICE_AREA_CONCURRENT_CHANGE')
    )
    const { invalidate, wrapper } = setup()
    const { result } = renderHook(useRemoveServiceArea, { wrapper })

    act(() => result.current.mutate('sa_1'))

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: SERVICE_AREAS_QUERY_KEY,
    })
  })

  it('keeps the lists as they are after an error that does not make them stale', async () => {
    stubApi().mockResolvedValue(apiErrorResponse(503))
    const { invalidate, wrapper } = setup()
    const { result } = renderHook(useRemoveServiceArea, { wrapper })

    act(() => result.current.mutate('sa_1'))

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(invalidate).not.toHaveBeenCalled()
  })
})
