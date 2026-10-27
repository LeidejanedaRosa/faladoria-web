import { MANAGER_COUNTS } from '@/test/fixtures/complaintCounts'
import {
  apiErrorResponse,
  jsonResponse,
  requestedUrl,
  stubApi,
  TEST_API_URL,
} from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { isTeamCounts } from '../../services/complaintCounts'
import { useComplaintCounts } from '../useComplaintCounts'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useComplaintCounts', () => {
  it('reads the counts route and keeps the shape the API sent for the role', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValue(jsonResponse(MANAGER_COUNTS))

    const { result } = renderHook(useComplaintCounts, {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(requestedUrl(fetchMock)).toBe(
      `${TEST_API_URL}/api/complaints/counts`
    )
    expect(isTeamCounts(result.current.data!)).toBe(false)
  })

  it('reports the failure instead of showing zeros', async () => {
    stubApi().mockResolvedValue(apiErrorResponse(503))

    const { result } = renderHook(useComplaintCounts, {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.data).toBeUndefined()
  })
})
