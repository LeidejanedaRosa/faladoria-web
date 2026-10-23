import { buildPublicComplaint } from '@/test/fixtures/publicComplaints'
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

import { useLatestPublicComplaints } from '../useLatestPublicComplaints'

let fetchMock: Mock<typeof fetch>

beforeEach(() => {
  fetchMock = stubApi()
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useLatestPublicComplaints', () => {
  it('asks the public list route for the requested number of complaints', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ complaints: [] }))

    const { result } = renderHook(() => useLatestPublicComplaints(6), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(requestedUrl(fetchMock)).toBe(
      `${TEST_API_URL}/api/public/complaints?limit=6`
    )
  })

  it('returns only the complaints, leaving the page cursor behind', async () => {
    const complaint = buildPublicComplaint()
    fetchMock.mockResolvedValue(
      jsonResponse({ complaints: [complaint], nextCursor: 'abc' })
    )

    const { result } = renderHook(() => useLatestPublicComplaints(6), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual([complaint])
  })

  it('caches each limit apart, so two lists of different sizes do not mix', async () => {
    fetchMock.mockImplementation(async () => jsonResponse({ complaints: [] }))
    const wrapper = createQueryWrapper()

    const six = renderHook(() => useLatestPublicComplaints(6), { wrapper })
    const three = renderHook(() => useLatestPublicComplaints(3), { wrapper })

    await waitFor(() => expect(six.result.current.isSuccess).toBe(true))
    await waitFor(() => expect(three.result.current.isSuccess).toBe(true))
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('exposes a failed request as an error state', async () => {
    fetchMock.mockResolvedValue(apiErrorResponse(500))

    const { result } = renderHook(() => useLatestPublicComplaints(6), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
