import { jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useAccountsInCity } from '../useAccountsInCity'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useAccountsInCity', () => {
  it('asks nothing while no removal is being confirmed', () => {
    const fetchMock = stubApi()

    renderHook(() => useAccountsInCity(null), { wrapper: createQueryWrapper() })

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('counts the accounts of the city being removed', async () => {
    stubApi().mockResolvedValue(
      jsonResponse([{ id: 'u1' }, { id: 'u2' }, { id: 'u3' }])
    )

    const { result } = renderHook(
      () => useAccountsInCity({ city: 'Varginha', state: 'MG' }),
      { wrapper: createQueryWrapper() }
    )

    await waitFor(() => expect(result.current.data).toBe(3))
  })
})
