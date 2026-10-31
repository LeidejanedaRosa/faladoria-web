import { useRecoveryFocus } from '@shared/hooks/useRecoveryFocus'
import { cn } from '@shared/utils/cn'

import { USERS_CONTENT } from '../data/usersContent'
import { useUsers } from '../hooks/useUsers'
import { ACCOUNT_COLUMNS } from './accountColumns'
import { AccountItem } from './AccountItem'
import { LoadError } from './LoadError'

const { list } = USERS_CONTENT

// Visual only: each row already names its values for screen readers (dt).
const ColumnHeader = () => (
  <div
    aria-hidden='true'
    className={cn(
      'hidden border-b border-slate-200 px-5 py-3 text-sm font-medium text-slate-600',
      ACCOUNT_COLUMNS
    )}
  >
    <span>{USERS_CONTENT.newAccount.name}</span>
    <span>{list.role}</span>
    <span>{list.cities}</span>
    <span>{list.status}</span>
    <span className='text-right'>{list.openCases}</span>
    <span />
  </div>
)

const ListSkeleton = () => (
  <output className='block rounded-xl border border-slate-200 bg-white'>
    <span className='sr-only'>{list.loading}</span>
    {[0, 1, 2].map(item => (
      <span
        key={item}
        aria-hidden='true'
        className='flex flex-col gap-2 border-b border-slate-100 p-4 last:border-b-0 sm:px-5'
      >
        <span className='h-5 w-48 animate-pulse rounded bg-slate-200 motion-reduce:animate-none' />
        <span className='h-4 w-64 animate-pulse rounded bg-slate-100 motion-reduce:animate-none' />
      </span>
    ))}
  </output>
)

export const AccountList = ({ selfId }: { selfId: string }) => {
  // The list owns its query: useRecoveryFocus needs the data in the render that ends the retry.
  const { data: users, isPending, isError, refetch } = useUsers()
  const { targetRef, isRetrying, retry } =
    useRecoveryFocus<HTMLDivElement>(refetch)

  if (isRetrying || isError) {
    return (
      <LoadError
        message={list.loadError}
        isRetrying={isRetrying}
        onRetry={() => void retry()}
      />
    )
  }
  if (isPending) return <ListSkeleton />

  return (
    <div
      ref={targetRef}
      tabIndex={-1}
      className='rounded-xl border border-slate-200 bg-white focus:outline-none'
    >
      <ColumnHeader />
      <ul>
        {users.map(user => (
          <AccountItem key={user.id} user={user} isSelf={user.id === selfId} />
        ))}
      </ul>
      {users.length <= 1 && (
        <p className='border-t border-slate-100 p-4 text-base text-slate-600 sm:px-5'>
          {list.empty}
        </p>
      )}
    </div>
  )
}
