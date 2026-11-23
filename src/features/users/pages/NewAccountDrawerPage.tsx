import { useLayoutEffect, useRef, useState } from 'react'

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
  // another folder, and maybe back: the folders share this drawer instance, so each folder change
  // starts a new form, with a number of its own. Only the form that started the creation closes.
  const [form, setForm] = useState({ group, number: 0 })
  if (form.group !== group) setForm({ group, number: form.number + 1 })
  // Layout effects: they run within the commit. A passive effect runs later, after paint, and a
  // creation answering in between would still read the drawer or form that just left the screen.
  const isOpen = useRef(false)
  const openForm = useRef(form.number)
  useLayoutEffect(() => {
    isOpen.current = true
    return () => {
      isOpen.current = false
    }
  }, [])
  useLayoutEffect(() => {
    openForm.current = form.number
  }, [form.number])

  return (
    <Drawer
      title={newAccount.heading}
      closeLabel={drawer.close}
      onClose={close}
    >
      {/* key: another folder starts a fresh form, with that folder's role. */}
      <NewAccountForm
        key={form.number}
        group={group}
        onCreated={account => {
          // The list shows the password once the drawer is gone: it outlives the form.
          onAccountCreated(account)
          // `form.number` is the form of the render that started the creation.
          if (isOpen.current && openForm.current === form.number) close()
        }}
        onCancel={close}
      />
    </Drawer>
  )
}
