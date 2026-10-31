import { usePanelUser } from '@features/panel/hooks/usePanelUser'
import { ChevronRightIcon } from '@shared/components/ui'
import { PANEL_ROUTES } from '@shared/data/routes'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { useRecoveryFocus } from '@shared/hooks/useRecoveryFocus'
import { Link, useParams } from 'react-router-dom'

import { AccessSection } from '../components/AccessSection'
import { AccountDetailsForm } from '../components/AccountDetailsForm'
import { AccountSection } from '../components/AccountSection'
import { LoadError } from '../components/LoadError'
import { PasswordSection } from '../components/PasswordSection'
import { StatusBadge } from '../components/StatusBadge'
import { USERS_CONTENT } from '../data/usersContent'
import { useUser } from '../hooks/useUsers'
import type { User } from '../services/usersApi'

const { account: content, list } = USERS_CONTENT
// Text links drawn small; the ::after reaches the 48px touch target.
const linkStyle =
  'text-purple-dark relative font-semibold underline underline-offset-4 after:absolute after:-inset-x-2 after:-inset-y-3.5'

const Breadcrumb = ({ current }: { current: string }) => (
  <nav aria-label={content.breadcrumb}>
    <ol className='flex flex-wrap items-center gap-1 text-sm text-slate-600'>
      <li className='flex items-center gap-1'>
        <Link to={PANEL_ROUTES.team} className={linkStyle}>
          {USERS_CONTENT.title}
        </Link>
        <ChevronRightIcon className='h-4 w-4' />
      </li>
      <li aria-current='page' className='wrap-words'>
        {current}
      </li>
    </ol>
  </nav>
)

const AccountHeader = ({ user, isSelf }: { user: User; isSelf: boolean }) => (
  <header className='flex flex-col gap-3'>
    <Breadcrumb current={user.name} />
    <div className='flex flex-col gap-2'>
      <div className='flex flex-wrap items-center gap-3'>
        <h1 className='wrap-words wrap-words text-2x text-slate-900 sm:text-3xl'>
          {user.name}
          {isSelf && (
            <span className='ml-2 text-base font-normal text-slate-600'>
              ({list.you})
            </span>
          )}
        </h1>
        <StatusBadge status={user.status} />
      </div>
      <dl className='flex flex-col gap-0.5'>
        <dt className='text-sm text-slate-600'>{content.emailLabel}</dt>
        <dd className='text-base break-all text-slate-900'>{user.email}</dd>
        <dd className='text-sm text-slate-600'>{content.emailFixed}</dd>
      </dl>
    </div>
  </header>
)

const NotFound = () => (
  <div className='flex flex-col gap-3'>
    <h1 className='text-2xl font-bold text-slate-900 sm:text-3xl'>
      {content.notFoundTitle}
    </h1>
    <p className='text-base text-slate-600'>{content.notFound}</p>
    <Link to={PANEL_ROUTES.team} className={`${linkStyle} w-fit text-base`}>
      {content.backToTeam}
    </Link>
  </div>
)

const PageSkeleton = () => (
  <output className='flex flex-col gap-3'>
    <span className='sr-only'>{content.loading}</span>
    <span
      aria-hidden='true'
      className='h-8 w-64 animate-pulse rounded bg-slate-200 motion-reduce:animate-none'
    />
    <span
      aria-hidden='true'
      className='h-5 w-80 max-w-full animate-pulse rounded bg-slate-100 motion-reduce:animate-none'
    />
  </output>
)

export const AccountPage = () => {
  const { userId = '' } = useParams()
  const self = usePanelUser()
  // The page owns its query: useRecoveryFocus needs the data in the render that ends the retry.
  const { data: user, isPending, isError, refetch } = useUser(userId)
  const { targetRef, isRetrying, retry } =
    useRecoveryFocus<HTMLDivElement>(refetch)
  useDocumentMeta({
    title: user ? `${user.name} · ${USERS_CONTENT.title}` : USERS_CONTENT.title,
    robots: 'noindex, nofollow',
  })

  if (isRetrying || isError) {
    return (
      <LoadError
        message={content.loadError}
        isRetrying={isRetrying}
        onRetry={() => void retry()}
      />
    )
  }
  if (isPending) return <PageSkeleton />
  if (!user) return <NotFound />

  const isSelf = user.id === self.id
  return (
    <div
      ref={targetRef}
      tabIndex={-1}
      className='flex flex-col gap-8 focus:outline-none'
    >
      <AccountHeader user={user} isSelf={isSelf} />
      <AccountSection heading={content.detailsHeading}>
        {/* key: another account starts a fresh form. */}
        <AccountDetailsForm key={user.id} user={user} isSelf={isSelf} />
      </AccountSection>
      <PasswordSection user={user} isSelf={isSelf} />
      <AccessSection user={user} isSelf={isSelf} />
    </div>
  )
}
