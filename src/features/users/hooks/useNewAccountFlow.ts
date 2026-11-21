import { useRef, useState } from 'react'

import { USERS_CONTENT } from '../data/usersContent'
import type { CreatedAccount } from '../services/usersApi'

export type ShownAccount = Pick<CreatedAccount, 'temporaryPassword'> & {
  name: string
}

/**
 * Account created → password shown once → done. The password lives only in this state, never in
 * the address or the history, and is dropped as soon as the dialog closes.
 */
export const useNewAccountFlow = () => {
  const [createdAccount, setCreatedAccount] = useState<ShownAccount | null>(
    null
  )
  const [announcement, setAnnouncement] = useState('')
  const newAccountLinkRef = useRef<HTMLAnchorElement>(null)

  return {
    newAccountLinkRef,
    createdAccount,
    announcement,
    onCreated: ({ name, temporaryPassword }: ShownAccount) =>
      setCreatedAccount({ name, temporaryPassword }),
    onPasswordNoted: () => {
      setAnnouncement(
        USERS_CONTENT.password.created(createdAccount?.name ?? '')
      )
      setCreatedAccount(null)
    },
  }
}
