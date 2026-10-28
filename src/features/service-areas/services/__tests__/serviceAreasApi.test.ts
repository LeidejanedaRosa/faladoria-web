import { VARGINHA } from '@/test/fixtures/serviceAreas'
import { jsonResponse, stubApi, TEST_API_URL } from '@/test/mockFetch'

import { afterEach, describe, expect, it, type Mock, vi } from 'vitest'

import {
  countAccountsInCity,
  createServiceArea,
  fetchServiceAreas,
  reactivateServiceArea,
  removeServiceArea,
  updateServiceAreaLocation,
} from '../serviceAreasApi'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const lastRequest = (fetchMock: Mock<typeof fetch>) => {
  const [input, init] = fetchMock.mock.calls.at(-1)!
  return {
    url: String(input),
    method: init?.method ?? 'GET',
    body: init?.body ? JSON.parse(String(init.body)) : undefined,
  }
}

describe('serviceAreasApi', () => {
  it('lists the active or the removed areas', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValue(jsonResponse({ serviceAreas: [VARGINHA] }))

    await expect(fetchServiceAreas('removed')).resolves.toEqual([VARGINHA])
    expect(lastRequest(fetchMock).url).toBe(
      `${TEST_API_URL}/api/service-areas?status=removed`
    )
  })

  it.each([
    [
      'adds',
      () => createServiceArea({ city: 'Lavras', state: 'MG' }),
      '/api/service-areas',
      { city: 'Lavras', state: 'MG' },
    ],
    [
      'corrects',
      () =>
        updateServiceAreaLocation({
          serviceAreaId: 'sa_1',
          city: 'Lavras',
          state: 'MG',
        }),
      '/api/service-areas/update-location',
      { serviceAreaId: 'sa_1', city: 'Lavras', state: 'MG' },
    ],
    [
      'removes',
      () => removeServiceArea('sa_1'),
      '/api/service-areas/remove',
      { serviceAreaId: 'sa_1' },
    ],
    [
      'reactivates',
      () => reactivateServiceArea('sa_1'),
      '/api/service-areas/reactivate',
      { serviceAreaId: 'sa_1' },
    ],
  ])(
    '%s a city with a POST to its route',
    async (_action, call, path, body) => {
      const fetchMock = stubApi()
      fetchMock.mockResolvedValue(jsonResponse({ serviceAreaId: 'sa_1' }))

      await call()

      expect(lastRequest(fetchMock)).toEqual({
        url: `${TEST_API_URL}${path}`,
        method: 'POST',
        body,
      })
    }
  )

  it('counts the accounts that have the city assigned', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValue(jsonResponse([{ id: 'u1' }, { id: 'u2' }]))

    await expect(
      countAccountsInCity({ city: 'São Lourenço', state: 'MG' })
    ).resolves.toBe(2)
    expect(lastRequest(fetchMock).url).toBe(
      `${TEST_API_URL}/api/users?city=S%C3%A3o+Louren%C3%A7o&state=MG`
    )
  })
})
