import { type ReactNode, useEffect } from 'react'

import { Drawer, LoadError, Tabs } from '@shared/components/ui'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { useRecoveryFocus } from '@shared/hooks/useRecoveryFocus'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { AccessSection } from '../components/AccessSection'
import { AccountDetailsForm } from '../components/AccountDetailsForm'
import { HistorySection } from '../components/HistorySection'
import { PasswordSection } from '../components/PasswordSection'
import { StatusBadge } from '../components/StatusBadge'
import { accountRoute, groupOf } from '../data/accountGroups'
import { USERS_CONTENT } from '../data/usersContent'
import { useCloseDrawer } from '../hooks/useCloseDrawer'
import { useFolderContext } from '../hooks/useFolderContext'
import { useUser } from '../hooks/useUsers'
import type { User } from '../services/usersApi'

const { account: content, drawer, list } = USERS_CONTENT

const Title = ({ user, isSelf }: { user: User; isSelf: boolean }) => (
  <>
    {user.name}
    {isSelf && (
      <span className='ml-2 text-base font-normal text-slate-600'>
        ({list.you})
      </span>
    )}
  </>
)

const Summary = ({ user }: { user: User }) => (
  <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
    <StatusBadge status={user.status} />
    <span className='text-sm break-all text-slate-600'>{user.email}</span>
  </div>
)

const Skeleton = () => (
  <output className='flex flex-col gap-3'>
    <span className='sr-only'>{content.loading}</span>
    <span
      aria-hidden='true'
      className='h-10 w-48 animate-pulse rounded bg-slate-200 motion-reduce:animate-none'
    />
    <span
      aria-hidden='true'
      className='h-12 w-full animate-pulse rounded bg-slate-100 motion-reduce:animate-none'
    />
  </output>
)

interface AccountTabsProps {
  user: User
  isSelf: boolean
  onCancel: () => void
}

const AccountTabs = ({ user, isSelf, onCancel }: AccountTabsProps) => (
  <Tabs
    label={drawer.tabs}
    tabs={[
      {
        id: 'details',
        label: drawer.details,
        content: (
          <div className='flex flex-col gap-5'>
            <p className='text-sm text-slate-600'>{content.emailFixed}</p>
            {/* key: another account starts a fresh form. */}
            <AccountDetailsForm
              key={user.id}
              user={user}
              isSelf={isSelf}
              onCancel={onCancel}
            />
          </div>
        ),
      },
      {
        id: 'access',
        label: drawer.access,
        content: (
          <div className='flex flex-col gap-6'>
            <PasswordSection user={user} isSelf={isSelf} />
            <AccessSection user={user} isSelf={isSelf} />
            <HistorySection user={user} />
          </div>
        ),
      },
    ]}
  />
)

/** One account, in a drawer over its folder's list: Dados to edit it, Acesso for the password and
 * the access itself. */
export const AccountDrawerPage = () => {
  const { userId = '' } = useParams()
  const { user: self, group } = useFolderContext()
  const close = useCloseDrawer(group)
  const navigate = useNavigate()
  const location = useLocation()
  // The drawer owns its query: useRecoveryFocus needs the data in the render that ends the retry.
  const { data: user, isPending, isError, refetch } = useUser(userId)
  const { targetRef, isRetrying, retry } =
    useRecoveryFocus<HTMLDivElement>(refetch)
  useDocumentMeta({
    title: user
      ? `${user.name} · ${USERS_CONTENT.groups[groupOf(user.role)].title}`
      : USERS_CONTENT.groups[group].title,
    robots: 'noindex, nofollow',
  })

  // The address names the folder: an old link, or a role just changed, moves to the right one.
  // From an effect, with the drawer still drawn: the form stays mounted, so the save message and
  // the cases-out-of-reach warning travel with it to the other folder.
  const ownGroup = user ? groupOf(user.role) : group
  useEffect(() => {
    if (!user || ownGroup === group) return
    // The filters ride along: a shared link keeps them in the account's own folder.
    void navigate(
      { pathname: accountRoute(ownGroup, user.id), search: location.search },
      { replace: true, state: location.state }
    )
  }, [user, ownGroup, group, navigate, location.state, location.search])

  const shell = (title: string, body: ReactNode) => (
    <Drawer title={title} closeLabel={drawer.close} onClose={close}>
      {body}
    </Drawer>
  )

  if (isRetrying || isError) {
    return shell(
      drawer.accountTitle,
      <LoadError
        message={content.loadError}
        isRetrying={isRetrying}
        onRetry={() => void retry()}
      />
    )
  }
  if (isPending) return shell(drawer.accountTitle, <Skeleton />)
  if (!user) {
    return shell(
      content.notFoundTitle,
      <p className='text-base text-slate-600'>{content.notFound}</p>
    )
  }

  const isSelf = user.id === self.id
  return (
    <Drawer
      title={<Title user={user} isSelf={isSelf} />}
      description={<Summary user={user} />}
      closeLabel={drawer.close}
      onClose={close}
    >
      <div ref={targetRef} tabIndex={-1} className='focus:outline-none'>
        <AccountTabs user={user} isSelf={isSelf} onCancel={close} />
      </div>
    </Drawer>
  )
}
