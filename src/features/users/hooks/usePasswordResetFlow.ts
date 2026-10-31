import { useState } from 'react'

import { USERS_CONTENT } from '../data/usersContent'
import type { User } from '../services/usersApi'
import { userErrorMessage } from '../utils/userErrorMessage'
import { useResetPassword } from './useAccountMutations'

const { passwordSection: content } = USERS_CONTENT

/**
 * Confirm → reset → password shown once → done. As when creating, the password lives only in
 * this state and is dropped when its dialog closes.
 */
export const usePasswordResetFlow = (user: User) => {
  const resetMutation = useResetPassword(user.id)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(
    null
  )
  const [announcement, setAnnouncement] = useState('')

  return {
    isConfirmOpen,
    open: () => {
      resetMutation.reset()
      setAnnouncement('')
      setIsConfirmOpen(true)
    },
    cancel: () => setIsConfirmOpen(false),
    confirm: () =>
      resetMutation.mutate(undefined, {
        onSuccess: ({ temporaryPassword: password }) => {
          setIsConfirmOpen(false)
          setTemporaryPassword(password)
        },
      }),
    isResetting: resetMutation.isPending,
    error: userErrorMessage(resetMutation.error),
    shownPassword: temporaryPassword
      ? { name: user.name, temporaryPassword }
      : null,
    onPasswordNoted: () => {
      setTemporaryPassword(null)
      setAnnouncement(content.done(user.name))
    },
    announcement,
  }
}
