import { ANA, TEMPORARY_PASSWORD } from '@/test/fixtures/users'
import { jsonResponse, stubApi, TEST_API_URL } from '@/test/mockFetch'

import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  createUser,
  fetchUsers,
  resetUserPassword,
  switchUserAccess,
  updateUser,
} from '../usersApi'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('usersApi', () => {
  it('lists the accounts', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValue(jsonResponse([ANA]))

    await expect(fetchUsers()).resolves.toEqual([ANA])
    expect(String(fetchMock.mock.calls[0][0])).toBe(`${TEST_API_URL}/api/users`)
  })

  it('creates an account with a POST and gets its temporary password back', async () => {
    const fetchMock = stubApi()
    const created = {
      userId: 'usr_new',
      email: 'fernanda@saude.lavras.mg.gov.br',
      temporaryPassword: TEMPORARY_PASSWORD,
    }
    fetchMock.mockResolvedValue(jsonResponse(created, 201))
    const account = {
      name: 'Fernanda Alves',
      email: 'fernanda@saude.lavras.mg.gov.br',
      role: 'manager' as const,
      assignedCities: [{ city: 'Lavras', state: 'MG' }],
    }

    await expect(createUser(account)).resolves.toEqual(created)

    const [input, init] = fetchMock.mock.calls[0]
    expect(String(input)).toBe(`${TEST_API_URL}/api/users`)
    expect(init?.method).toBe('POST')
    expect(JSON.parse(String(init?.body))).toEqual(account)
  })
})

describe('updateUser', () => {
  it('posts only the changes to the account route and gets the saved account back', async () => {
    const fetchMock = stubApi()
    const saved = { ...ANA, role: 'manager', complaintsOutOfReach: 2 }
    fetchMock.mockResolvedValue(jsonResponse(saved))

    await expect(updateUser('usr_ana', { role: 'manager' })).resolves.toEqual(
      saved
    )

    const [input, init] = fetchMock.mock.calls[0]
    expect(String(input)).toBe(`${TEST_API_URL}/api/users/usr_ana/update`)
    expect(init?.method).toBe('POST')
    expect(JSON.parse(String(init?.body))).toEqual({ role: 'manager' })
  })

  it('keeps an id with odd characters inside its path segment', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValue(jsonResponse(ANA))

    await updateUser('a/b', { name: 'Ana' })

    expect(String(fetchMock.mock.calls[0][0])).toBe(
      `${TEST_API_URL}/api/users/a%2Fb/update`
    )
  })
})

describe('account access', () => {
  it('asks for a new password with an empty POST and gets it back', async () => {
    const fetchMock = stubApi()
    fetchMock.mockResolvedValue(
      jsonResponse({ temporaryPassword: TEMPORARY_PASSWORD })
    )

    await expect(resetUserPassword('usr_ana')).resolves.toEqual({
      temporaryPassword: TEMPORARY_PASSWORD,
    })

    const [input, init] = fetchMock.mock.calls[0]
    expect(String(input)).toBe(
      `${TEST_API_URL}/api/users/usr_ana/reset-password`
    )
    expect(init?.method).toBe('POST')
    expect(init?.body).toBeUndefined()
  })

  it.each(['deactivate', 'reactivate'] as const)(
    'posts to /%s and gets the account as it is now',
    async action => {
      const fetchMock = stubApi()
      fetchMock.mockResolvedValue(jsonResponse(ANA))

      await expect(switchUserAccess('usr_ana', action)).resolves.toEqual(ANA)

      const [input, init] = fetchMock.mock.calls[0]
      expect(String(input)).toBe(`${TEST_API_URL}/api/users/usr_ana/${action}`)
      expect(init?.method).toBe('POST')
    }
  )
})
