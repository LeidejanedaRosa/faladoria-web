import type { QueryClient } from '@tanstack/react-query'

import type { User } from '../services/usersApi'
import { USERS_QUERY_KEY } from './useUsers'

/** The account as the API saved it goes into the list at once; the refetch then brings the rest
 * (the counts of other pages, the status a password reset changes). */
export const storeSavedUser = (queryClient: QueryClient, saved: User) => {
  queryClient.setQueryData<User[]>(USERS_QUERY_KEY, users =>
    users?.map(user => (user.id === saved.id ? saved : user))
  )
  return queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
}
