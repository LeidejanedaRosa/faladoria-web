import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  type AccessAction,
  resetUserPassword,
  switchUserAccess,
} from '../services/usersApi'
import { storeSavedUser } from './usersCache'
import { USERS_QUERY_KEY } from './useUsers'

export const useResetPassword = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => resetUserPassword(userId),
    // The answer has only the password; the list brings the new status.
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  })
}

export const useSwitchAccess = (userId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (action: AccessAction) => switchUserAccess(userId, action),
    onSuccess: saved => storeSavedUser(queryClient, saved),
    // "Already deactivated / still active": someone else acted first; show the account as it is.
    onError: () => queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY }),
  })
}
