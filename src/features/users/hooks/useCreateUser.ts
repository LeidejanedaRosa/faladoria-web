import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createUser } from '../services/usersApi'
import { USERS_QUERY_KEY } from './useUsers'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    // Also refreshes the "accounts in this city" counts of the served-cities page (['users', …]).
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  })
}
