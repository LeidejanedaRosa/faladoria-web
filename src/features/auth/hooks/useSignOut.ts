import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signOut } from '../services/authApi'

export const useSignOut = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signOut,
    // Drops every cached answer, not just the session: the next person on this computer
    // must not see the previous one's complaints for a moment before the guard redirects.
    onSettled: () => queryClient.clear(),
  })
}
