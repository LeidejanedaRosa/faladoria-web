import type { ServiceArea } from '@features/service-areas/services/serviceAreasApi'

import { buildServiceArea, ibgeCities } from './fixtures/serviceAreas'
import { apiErrorResponse, jsonResponse, type stubApi } from './mockFetch'

interface FakeOptions {
  active?: ServiceArea[]
  removed?: ServiceArea[]
  cities?: string[]
  accountsInCity?: number
  /** Answers every change with this error code instead of applying it. */
  failChangesWith?: { status: number; code: string }
  ibgeDown?: boolean
}

const bodyOf = (init?: RequestInit) =>
  (init?.body ? JSON.parse(String(init.body)) : {}) as Record<string, string>

/**
 * The service-area routes, the users count and the IBGE, with state: a removal really moves the
 * city to the removed list, so a test follows the whole flow the way the API would answer it.
 */
export const fakeServiceAreasApi = (
  fetchMock: ReturnType<typeof stubApi>,
  {
    active = [],
    removed = [],
    cities = [],
    accountsInCity = 0,
    failChangesWith,
    ibgeDown = false,
  }: FakeOptions = {}
) => {
  // Copies of each area, not of the arrays only: a correction must not change the fixtures that
  // the next test starts from.
  const state = {
    active: active.map(area => ({ ...area })),
    removed: removed.map(area => ({ ...area })),
  }
  const move = (
    id: string,
    from: ServiceArea[],
    to: ServiceArea[],
    removedAt: string | null
  ) => {
    const index = from.findIndex(area => area.id === id)
    const [area] = from.splice(index, 1)
    to.push({ ...area, removedAt })
  }

  const changes: Record<string, (body: Record<string, string>) => void> = {
    '/api/service-areas': ({ city, state: uf }) =>
      state.active.push(
        buildServiceArea({ id: `sa_${city}`, city, state: uf })
      ),
    '/api/service-areas/update-location': ({
      serviceAreaId,
      city,
      state: uf,
    }) => {
      const area = state.active.find(item => item.id === serviceAreaId)!
      Object.assign(area, { city, state: uf })
    },
    '/api/service-areas/remove': ({ serviceAreaId }) =>
      move(
        serviceAreaId,
        state.active,
        state.removed,
        '2026-10-27T12:00:00.000Z'
      ),
    '/api/service-areas/reactivate': ({ serviceAreaId }) =>
      move(serviceAreaId, state.removed, state.active, null),
  }

  fetchMock.mockImplementation(async (input, init) => {
    const url = new URL(String(input))
    if (url.pathname.includes('/municipios')) {
      return ibgeDown
        ? new Response('down', { status: 503 })
        : jsonResponse(ibgeCities(...cities))
    }
    if (url.pathname === '/api/users') {
      return jsonResponse(
        Array.from({ length: accountsInCity }, (_, i) => ({ id: `u${i}` }))
      )
    }
    if (init?.method === 'POST') {
      if (failChangesWith)
        return apiErrorResponse(failChangesWith.status, failChangesWith.code)
      changes[url.pathname](bodyOf(init))
      return jsonResponse({ serviceAreaId: 'sa_1' })
    }
    if (url.pathname === '/api/service-areas') {
      const list =
        url.searchParams.get('status') === 'removed'
          ? state.removed
          : state.active
      return jsonResponse({ serviceAreas: list })
    }
    throw new Error(`Unexpected call: ${url.pathname}`)
  })

  return state
}
