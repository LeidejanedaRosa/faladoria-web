import { PUBLIC_STATS } from '@/test/fixtures/publicComplaints'
import {
  apiErrorResponse,
  jsonResponse,
  requestedUrl,
  stubApi,
  TEST_API_URL,
} from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { renderHook, waitFor } from '@testing-library/react'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest'

import { usePublicComplaintStats } from '../usePublicComplaintStats'

let fetchMock: Mock<typeof fetch>

beforeEach(() => {
  fetchMock = stubApi()
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('usePublicComplaintStats', () => {
  it('reads the totals from the public stats route', async () => {
    fetchMock.mockResolvedValue(jsonResponse(PUBLIC_STATS))

    const { result } = renderHook(() => usePublicComplaintStats(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(PUBLIC_STATS)
    expect(requestedUrl(fetchMock)).toBe(
      `${TEST_API_URL}/api/public/complaints/stats`
    )
  })

  it('exposes a failed request as an error state, not as a thrown exception', async () => {
    fetchMock.mockResolvedValue(apiErrorResponse(503))

    const { result } = renderHook(() => usePublicComplaintStats(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toMatchObject({ status: 503 })
  })

  it('does not ask again within a minute, the window the API caches for', async () => {
    fetchMock.mockResolvedValue(jsonResponse(PUBLIC_STATS))
    const wrapper = createQueryWrapper()

    const first = renderHook(() => usePublicComplaintStats(), { wrapper })
    await waitFor(() => expect(first.result.current.isSuccess).toBe(true))
    const second = renderHook(() => usePublicComplaintStats(), { wrapper })

    expect(second.result.current.data).toEqual(PUBLIC_STATS)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
