import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  type AccountChanges,
  updateUser,
  type User,
} from '../services/usersApi'
import { USERS_QUERY_KEY } from './useUsers'

export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (changes: AccountChanges) => updateUser(userId, changes),
    onSuccess: updated => {
      // The page shows the saved account at once; the refetch then brings the list's counts.
      queryClient.setQueryData<User[]>(USERS_QUERY_KEY, users =>
        users?.map(user => (user.id === updated.id ? updated : user))
      )
      return queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY })
    },
  })
}
