import { Suspense } from 'react'

import { usePanelUser } from '@features/panel/hooks/usePanelUser'
import { StatusMessage } from '@shared/components/ui'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { Link, useOutlet } from 'react-router-dom'

import { AccountList } from '../components/AccountList'
import { TemporaryPasswordDialog } from '../components/TemporaryPasswordDialog'
import { type AccountGroup, newAccountRoute } from '../data/accountGroups'
import { USERS_CONTENT } from '../data/usersContent'
import { OPENED_FROM_LIST } from '../hooks/useCloseDrawer'
import type { FolderOutletContext } from '../hooks/useFolderContext'
import { useNewAccountFlow } from '../hooks/useNewAccountFlow'

const content = USERS_CONTENT

// Mounted whenever no drawer is open: closing one puts the folder's title back on the tab.
const FolderTitle = ({ title }: { title: string }) => {
  useDocumentMeta({ title, robots: 'noindex, nofollow' })
  return null
}

/** A folder's list. The drawers (an account, a new account) are child routes drawn over it. */
export const TeamPage = ({ group }: { group: AccountGroup }) => {
  const { title, intro } = content.groups[group]
  const self = usePanelUser()
  const flow = useNewAccountFlow()
  const drawerContext: FolderOutletContext = {
    user: self,
    group,
    onAccountCreated: flow.onCreated,
  }
  const drawer = useOutlet(drawerContext)

  return (
    <div className='flex flex-col gap-8'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
            {title}
          </h1>
          <p className='max-w-3xl text-base text-slate-600'>{intro}</p>
        </div>
        <Link
          ref={flow.newAccountLinkRef}
          to={newAccountRoute(group)}
          state={OPENED_FROM_LIST}
          className='bg-purple-dark hover:bg-purple-medium inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-lg px-5 text-base font-semibold text-white transition-colors motion-reduce:transition-none'
        >
          {content.newAccount.open}
        </Link>
      </header>

      <StatusMessage message={flow.announcement} />

      <section
        aria-labelledby='accounts-heading'
        className='flex flex-col gap-4'
      >
        <h2
          id='accounts-heading'
          className='text-lg font-semibold text-slate-900'
        >
          {content.list.heading}
        </h2>
        <AccountList group={group} selfId={self.id} />
      </section>

      {!drawer && <FolderTitle title={title} />}
      {/* Its own boundary: a drawer's chunk loading keeps the list on screen. */}
      <Suspense fallback={null}>{drawer}</Suspense>

      <TemporaryPasswordDialog
        account={flow.createdAccount}
        onDone={flow.onPasswordNoted}
        returnFocusRef={flow.newAccountLinkRef}
      />
    </div>
  )
}
