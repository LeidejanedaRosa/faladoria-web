import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signIn } from '../services/authApi'
import { SESSION_QUERY_KEY } from './useSession'

export const useSignIn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signIn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY }),
  })
}
