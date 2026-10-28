import { ibgeCities } from '@/test/fixtures/serviceAreas'
import { jsonResponse, stubApi, TEST_IBGE_URL } from '@/test/mockFetch'

import { afterEach, describe, expect, it, vi } from 'vitest'

import { fetchCitiesOfState } from '../ibgeApi'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('fetchCitiesOfState', () => {
  it('asks the IBGE for the cities of the state, in alphabetical order, and keeps only the names', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValue(jsonResponse(ibgeCities('Alfenas', 'Varginha')))

    await expect(fetchCitiesOfState('MG')).resolves.toEqual([
      'Alfenas',
      'Varginha',
    ])
    expect(String(fetchMock.mock.calls[0][0])).toBe(
      `${TEST_IBGE_URL}/estados/MG/municipios?orderBy=nome`
    )
  })

  it('does not send the session cookie to another service', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValue(jsonResponse([]))

    await fetchCitiesOfState('MG')

    expect(fetchMock.mock.calls[0][1]?.credentials).toBeUndefined()
  })

  it('fails when the IBGE answers with an error, so the form can fall back to free text', async () => {
    stubApi().mockResolvedValue(new Response('down', { status: 503 }))

    await expect(fetchCitiesOfState('MG')).rejects.toThrow('IBGE answered 503')
  })

  it('fails loudly when the address is not configured', async () => {
    stubApi()
    vi.stubEnv('VITE_IBGE_API_URL', '')

    await expect(fetchCitiesOfState('MG')).rejects.toThrow(
      'VITE_IBGE_API_URL is not set'
    )
  })
})
