import { useRef, useState } from 'react'

import { USERS_CONTENT } from '../data/usersContent'
import type { CreatedAccount } from '../services/usersApi'

type ShownAccount = Pick<CreatedAccount, 'temporaryPassword'> & { name: string }

/**
 * Form open → account created → password shown once → done. The password lives only in this
 * state, and is dropped as soon as the dialog closes.
 */
export const useNewAccountFlow = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [createdAccount, setCreatedAccount] = useState<ShownAccount | null>(
    null
  )
  const [announcement, setAnnouncement] = useState('')
  const openButtonRef = useRef<HTMLButtonElement>(null)

  const closeForm = () => {
    setIsFormOpen(false)
    openButtonRef.current?.focus()
  }

  return {
    isFormOpen,
    toggleForm: () => setIsFormOpen(open => !open),
    closeForm,
    openButtonRef,
    createdAccount,
    announcement,
    onCreated: ({ name, temporaryPassword }: ShownAccount) => {
      setIsFormOpen(false)
      setCreatedAccount({ name, temporaryPassword })
    },
    onPasswordNoted: () => {
      setAnnouncement(
        USERS_CONTENT.password.created(createdAccount?.name ?? '')
      )
      setCreatedAccount(null)
    },
  }
}
