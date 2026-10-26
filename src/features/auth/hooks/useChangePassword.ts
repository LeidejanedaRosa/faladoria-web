import { useMutation, useQueryClient } from '@tanstack/react-query'

import { changePassword, signIn } from '../services/authApi'
import { SESSION_QUERY_KEY } from './useSession'

interface ChangePasswordRequest {
  /** Present when the change starts without a session: sign in first, with the current password. */
  email?: string
  currentPassword: string
  newPassword: string
}

const signInIfNeededAndChange = async ({
  email,
  currentPassword,
  newPassword,
}: ChangePasswordRequest) => {
  if (email) await signIn({ email, password: currentPassword })
  return changePassword({ currentPassword, newPassword })
}

export const useChangePassword = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signInIfNeededAndChange,
    // onSettled, not onSuccess: a sign-in that worked before a failed change still opened a session.
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY }),
  })
}
