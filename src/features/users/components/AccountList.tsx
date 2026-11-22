import { useRecoveryFocus } from '@shared/hooks/useRecoveryFocus'

import { type AccountGroup, GROUP_ROLES } from '../data/accountGroups'
import { USERS_CONTENT } from '../data/usersContent'
import { useUsers } from '../hooks/useUsers'
import { FilteredAccountList } from './FilteredAccountList'
import { LoadError } from './LoadError'

const { list } = USERS_CONTENT

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

interface AccountListProps {
  group: AccountGroup
  selfId: string
}

export const AccountList = ({ group, selfId }: AccountListProps) => {
  // The list owns its query: useRecoveryFocus needs the data in the render that ends the retry.
  const { data: all, isPending, isError, refetch } = useUsers()
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
    <div ref={targetRef} tabIndex={-1} className='focus:outline-none'>
      <FilteredAccountList
        users={all.filter(user => GROUP_ROLES[group].includes(user.role))}
        group={group}
        selfId={selfId}
      />
    </div>
  )
}
