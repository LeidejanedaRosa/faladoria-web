import { useState } from 'react'

import { isApiError } from '@shared/lib/api'

import { USERS_CONTENT } from '../data/usersContent'
import type { AccessAction, User } from '../services/usersApi'
import { userErrorMessage } from '../utils/userErrorMessage'
import { useSwitchAccess } from './useAccountMutations'

const { accessSection: content } = USERS_CONTENT

const DONE: Record<AccessAction, (name: string) => string> = {
  deactivate: content.deactivated,
  reactivate: content.reactivated,
}

// On deactivating, the API's "no admin left" also ended the person's sessions: say so.
const accessErrorMessage = (error: unknown) =>
  isApiError(error) && error.code === 'NO_ACTIVE_ADMIN_LEFT'
    ? content.noAdminLeft
    : userErrorMessage(error)

/** Deactivate (confirmed in a dialog) and reactivate (direct). */
export const useAccessFlow = (user: User) => {
  const switchMutation = useSwitchAccess(user.id)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const isDeactivated = user.status === 'deactivated'

  const run = (action: AccessAction) => {
    setAnnouncement('')
    switchMutation.mutate(action, {
      onSuccess: saved => {
        setIsConfirmOpen(false)
        setAnnouncement(DONE[action](saved.name))
      },
    })
  }

  const error = accessErrorMessage(switchMutation.error)
  return {
    isDeactivated,
    isConfirmOpen,
    openConfirm: () => {
      switchMutation.reset()
      setIsConfirmOpen(true)
    },
    cancel: () => setIsConfirmOpen(false),
    deactivate: () => run('deactivate'),
    reactivate: () => run('reactivate'),
    isSwitching: switchMutation.isPending,
    // Inside the dialog while it is open; next to the button otherwise.
    dialogError: isConfirmOpen ? error : undefined,
    pageError: isConfirmOpen ? undefined : error,
    announcement,
  }
}
