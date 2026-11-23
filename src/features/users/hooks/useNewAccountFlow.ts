import { useRef, useState } from 'react'

import { USERS_CONTENT } from '../data/usersContent'
import type { CreatedAccount } from '../services/usersApi'

export type ShownAccount = Pick<CreatedAccount, 'temporaryPassword'> & {
  name: string
}

/**
 * Account created → password shown once → done. The password lives only in this state, never in
 * the address or the history, and is dropped as soon as the dialog closes.
 *
 * A queue, not one slot: a creation can finish while another password is still on screen (the
 * drawer was closed mid-request and a second account created). Each password is shown in turn;
 * none is overwritten before it was noted.
 */
export const useNewAccountFlow = () => {
  const [pending, setPending] = useState<ShownAccount[]>([])
  const [announcement, setAnnouncement] = useState('')
  const newAccountLinkRef = useRef<HTMLAnchorElement>(null)
  const createdAccount = pending[0] ?? null

  return {
    newAccountLinkRef,
    createdAccount,
    announcement,
    onCreated: ({ name, temporaryPassword }: ShownAccount) =>
      setPending(queue => [...queue, { name, temporaryPassword }]),
    onPasswordNoted: () => {
      setAnnouncement(
        USERS_CONTENT.password.created(createdAccount?.name ?? '')
      )
      setPending(([, ...rest]) => rest)
    },
  }
}
