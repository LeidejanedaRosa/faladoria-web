import type { ServiceArea } from '@features/service-areas/services/serviceAreasApi'
import type { StaffAction } from '@features/staff-actions/services/staffActionsApi'
import type {
  AccountChanges,
  NewAccount,
  User,
} from '@features/users/services/usersApi'

import { TEMPORARY_PASSWORD } from './fixtures/users'
import { jsonResponse, type stubApi } from './mockFetch'

interface FakeOptions {
  users?: User[]
  servedAreas?: ServiceArea[]
  /** Answers the creation with this error instead of creating the account. */
  failCreateWith?: ApiFailure
  /** Answers the change with this error instead of saving it. */
  failUpdateWith?: ApiFailure
  /** What the API counts after a change (cases the person can no longer act on). */
  complaintsOutOfReach?: number
  /** Answers a password reset, a deactivation or a reactivation with this error. */
  failAccessWith?: ApiFailure
  /** Holds the creation's answer until this settles: what happens while it is on its way. */
  holdCreate?: Promise<void>
  /** The history of every account, in one page (the drawer's Acesso tab reads it). */
  staffActions?: StaffAction[]
}

interface ApiFailure {
  status: number
  code: string
  details?: unknown
}

const failure = ({ status, code, details }: ApiFailure) =>
  jsonResponse({ statusCode: status, code, message: 'Erro.', details }, status)

const ACCOUNT_PATH =
  /^\/api\/users\/([^/]+)\/(update|reset-password|deactivate|reactivate)$/

// The status each access action leaves the account in, as the API does.
const STATUS_AFTER = {
  'reset-password': 'pendingFirstAccess',
  deactivate: 'deactivated',
  reactivate: 'active',
} as const

/**
 * The users routes, the served cities and the staff-actions log, with state: a created or changed account really shows
 * up in the next list, so a test follows the whole flow the way the API would answer it.
 */
export const fakeUsersApi = (
  fetchMock: ReturnType<typeof stubApi>,
  {
    users = [],
    servedAreas = [],
    failCreateWith,
    failUpdateWith,
    complaintsOutOfReach = 0,
    failAccessWith,
    holdCreate,
    staffActions = [],
  }: FakeOptions = {}
) => {
  const state = {
    users: users.map(user => ({ ...user })),
    sent: [] as NewAccount[],
    changes: [] as AccountChanges[],
    /** Each access action asked, as "action usr_id". */
    actions: [] as string[],
  }

  const update = (userId: string, changes: AccountChanges) => {
    state.changes.push(changes)
    if (failUpdateWith) return failure(failUpdateWith)
    const user = state.users.find(({ id }) => id === userId)
    if (!user) return failure({ status: 404, code: 'USER_NOT_FOUND' })
    Object.assign(user, changes)
    return jsonResponse({ ...user, complaintsOutOfReach })
  }

  const switchAccess = (userId: string, action: keyof typeof STATUS_AFTER) => {
    state.actions.push(`${action} ${userId}`)
    if (failAccessWith) return failure(failAccessWith)
    const user = state.users.find(({ id }) => id === userId)
    if (!user) return failure({ status: 404, code: 'USER_NOT_FOUND' })
    user.status = STATUS_AFTER[action]
    return jsonResponse(
      action === 'reset-password'
        ? { temporaryPassword: TEMPORARY_PASSWORD }
        : user
    )
  }

  fetchMock.mockImplementation(async (input, init) => {
    const url = new URL(String(input))
    if (url.pathname === '/api/service-areas') {
      const removed = url.searchParams.get('status') === 'removed'
      return jsonResponse({
        serviceAreas: servedAreas.filter(
          area => (area.removedAt !== null) === removed
        ),
      })
    }
    if (url.pathname === '/api/staff-actions') {
      const actorId = url.searchParams.get('actorId')
      return jsonResponse({
        actions: staffActions.filter(action => action.actorId === actorId),
      })
    }
    const [, userId, action] = ACCOUNT_PATH.exec(url.pathname) ?? []
    if (action === 'update') {
      return update(
        decodeURIComponent(userId),
        JSON.parse(String(init?.body)) as AccountChanges
      )
    }
    if (action) {
      return switchAccess(
        decodeURIComponent(userId),
        action as keyof typeof STATUS_AFTER
      )
    }
    if (url.pathname !== '/api/users') {
      throw new Error(`Unexpected call: ${url.pathname}`)
    }
    if (init?.method !== 'POST') {
      return jsonResponse(state.users)
    }
    const account = JSON.parse(String(init.body)) as NewAccount
    state.sent.push(account)
    await holdCreate
    if (failCreateWith) return failure(failCreateWith)
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
