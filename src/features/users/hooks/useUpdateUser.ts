import { useMutation, useQueryClient } from '@tanstack/react-query'

import { type AccountChanges, updateUser } from '../services/usersApi'
import { storeSavedUser } from './usersCache'

export const useUpdateUser = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (changes: AccountChanges) => updateUser(userId, changes),
    onSuccess: updated => storeSavedUser(queryClient, updated),
  })
}
