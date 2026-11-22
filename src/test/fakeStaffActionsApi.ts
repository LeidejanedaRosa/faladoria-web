import type { StaffAction } from '@features/staff-actions/services/staffActionsApi'

import { apiErrorResponse, jsonResponse, type stubApi } from './mockFetch'

/**
 * GET /api/staff-actions in pages: page N answers `cursor=N` and points to N+1 until the last.
 * `failFirst` answers the first request with a 500, for the retry.
 */
export const fakeStaffActionsApi = (
  fetchMock: ReturnType<typeof stubApi>,
  pages: StaffAction[][],
  { failFirst = false } = {}
) => {
  const requests: URLSearchParams[] = []
  fetchMock.mockImplementation(async input => {
    const url = new URL(String(input))
    if (url.pathname !== '/api/staff-actions') {
      throw new Error(`Unexpected call: ${url.pathname}`)
    }
    requests.push(url.searchParams)
    if (failFirst && requests.length === 1) return apiErrorResponse(500)
    const index = Number(url.searchParams.get('cursor') ?? 0)
    const next =
      index + 1 < pages.length ? { nextCursor: String(index + 1) } : {}
    return jsonResponse({ actions: pages[index] ?? [], ...next })
  })
  return requests
}
