import { Drawer } from '@shared/components/ui'

import { NewAccountForm } from '../components/NewAccountForm'
import { USERS_CONTENT } from '../data/usersContent'
import { useCloseDrawer } from '../hooks/useCloseDrawer'
import { useFolderContext } from '../hooks/useFolderContext'

const { newAccount, drawer } = USERS_CONTENT

/** "Nova conta", in a drawer over the folder's list. The folder decides the roles offered. */
export const NewAccountDrawerPage = () => {
  const { group, onAccountCreated } = useFolderContext()
  const close = useCloseDrawer(group)

  return (
    <Drawer
      title={newAccount.heading}
      closeLabel={drawer.close}
      onClose={close}
    >
      <NewAccountForm
        group={group}
        onCreated={account => {
          // The list shows the password once the drawer is gone: it outlives the form.
          onAccountCreated(account)
          close()
        }}
        onCancel={close}
      />
    </Drawer>
  )
}
