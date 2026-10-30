import type { ServiceArea } from '@features/service-areas/services/serviceAreasApi'
import type { NewAccount, User } from '@features/users/services/usersApi'

import { TEMPORARY_PASSWORD } from './fixtures/users'
import { jsonResponse, type stubApi } from './mockFetch'

interface FakeOptions {
  users?: User[]
  servedAreas?: ServiceArea[]
  /** Answers the creation with this error instead of creating the account. */
  failCreateWith?: { status: number; code: string; details?: unknown }
}

/**
 * The users routes and the served cities, with state: a created account really shows up in the
 * next list, so a test follows the whole flow the way the API would answer it.
 */
export const fakeUsersApi = (
  fetchMock: ReturnType<typeof stubApi>,
  { users = [], servedAreas = [], failCreateWith }: FakeOptions = {}
) => {
  const state = {
    users: users.map(user => ({ ...user })),
    sent: [] as NewAccount[],
  }

  fetchMock.mockImplementation(async (input, init) => {
    const url = new URL(String(input))
    if (url.pathname === '/api/service-areas') {
      return jsonResponse({ serviceAreas: servedAreas })
    }
    if (url.pathname !== '/api/users') {
      throw new Error(`Unexpected call: ${url.pathname}`)
    }
    if (init?.method !== 'POST') {
      return jsonResponse(state.users)
    }
    const account = JSON.parse(String(init.body)) as NewAccount
    state.sent.push(account)
    if (failCreateWith) {
      const { status, code, details } = failCreateWith
      return jsonResponse(
        { statusCode: status, code, message: 'Erro.', details },
        status
      )
    }
    state.users.push({
      ...account,
      id: `usr_${state.users.length}`,
      status: 'pendingFirstAccess',
      assignedComplaintCount: 0,
    })
    return jsonResponse(
      {
        userId: 'usr_new',
        email: account.email,
        temporaryPassword: TEMPORARY_PASSWORD,
      },
      201
    )
  })

  return state
}
