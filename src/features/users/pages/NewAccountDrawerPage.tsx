import { useEffect, useRef } from 'react'

import { Drawer } from '@shared/components/ui'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'

import { NewAccountForm } from '../components/NewAccountForm'
import { USERS_CONTENT } from '../data/usersContent'
import { useCloseDrawer } from '../hooks/useCloseDrawer'
import { useFolderContext } from '../hooks/useFolderContext'

const { newAccount, drawer, groups } = USERS_CONTENT

/** "Nova conta", in a drawer over the folder's list. The folder decides the roles offered. */
export const NewAccountDrawerPage = () => {
  const { group, onAccountCreated } = useFolderContext()
  const close = useCloseDrawer(group)
  useDocumentMeta({
    title: `${newAccount.heading} · ${groups[group].title}`,
    robots: 'noindex, nofollow',
  })
  // The account may be created after the drawer was closed (Escape, ×, Back): the password still
  // reaches the list, but closing again would step back once more. Or after the address moved to
  // the other folder: the folders share this drawer instance, and the drawer now open there is
  // not the one the creation started in.
  const isOpen = useRef(false)
  const openFolder = useRef(group)
  useEffect(() => {
    isOpen.current = true
    return () => {
      isOpen.current = false
    }
  }, [])
  useEffect(() => {
    openFolder.current = group
  }, [group])

  return (
    <Drawer
      title={newAccount.heading}
      closeLabel={drawer.close}
      onClose={close}
    >
      {/* key: another folder starts a fresh form, with that folder's role. */}
      <NewAccountForm
        key={group}
        group={group}
        onCreated={account => {
          // The list shows the password once the drawer is gone: it outlives the form.
          onAccountCreated(account)
          // `group` is the folder of the render that started the creation.
          if (isOpen.current && openFolder.current === group) close()
        }}
        onCancel={close}
      />
    </Drawer>
  )
}
