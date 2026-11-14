import { useQuery } from '@tanstack/react-query'

import { type AccountGroup, GROUP_ROLES } from '../data/accountGroups'
import { fetchUsers, type User } from '../services/usersApi'

export const USERS_QUERY_KEY = ['users'] as const

const usersQuery = {
  queryKey: USERS_QUERY_KEY,
  queryFn: ({ signal }: { signal: AbortSignal }) => fetchUsers(signal),
}

export const useUsers = () => useQuery(usersQuery)

/** One account, read from the team list: the API has no route for a single account. Opened from
 * the list, the page shows the cached account at once while the list refreshes, so the form
 * starts from what another admin may have just changed. `null`: not found. */
export const useUser = (userId: string) =>
  useQuery({
    ...usersQuery,
    select: (users: User[]) => users.find(user => user.id === userId) ?? null,
  })

const countActive = (users: User[], group: AccountGroup) =>
  users.filter(
    user => user.status === 'active' && GROUP_ROLES[group].includes(user.role)
  ).length

/** Active accounts per folder, from the same cached list the pages use: no extra request. */
export const useActiveAccountCounts = () =>
  useQuery({
    ...usersQuery,
    select: (users: User[]): Record<AccountGroup, number> => ({
      team: countActive(users, 'team'),
      managers: countActive(users, 'managers'),
    }),
  })
