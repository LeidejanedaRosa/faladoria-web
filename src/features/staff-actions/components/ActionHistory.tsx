import { useEffect, useRef } from 'react'

import { Button, LoadError } from '@shared/components/ui'
import { useRecoveryFocus } from '@shared/hooks/useRecoveryFocus'

import { STAFF_ACTIONS_CONTENT } from '../data/staffActionsContent'
import { useStaffActions } from '../useStaffActions'
import type { TargetNames } from '../utils/describeAction'
import { ActionDays } from './ActionDays'

const content = STAFF_ACTIONS_CONTENT

const HistorySkeleton = () => (
  <output className='flex flex-col gap-3'>
    <span className='sr-only'>{content.loading}</span>
    {[0, 1, 2].map(item => (
      <span
        key={item}
        aria-hidden='true'
        className='h-5 w-full max-w-sm animate-pulse rounded bg-slate-200 motion-reduce:animate-none'
      />
    ))}
  </output>
)

interface ActionHistoryProps {
  actorId: string
  /** Names of the accounts and cities the caller knows: "Alterou a conta de Ana Souza". */
  targetNames: TargetNames
}

/** A person's actions in the panel, by day, newest first; older pages on request. */
export const ActionHistory = ({ actorId, targetNames }: ActionHistoryProps) => {
  const query = useStaffActions(actorId)
  const { targetRef, isRetrying, retry } = useRecoveryFocus<HTMLDivElement>(
    query.refetch
  )
  const listRef = useRef<HTMLDivElement>(null)
  // "Load more" may leave with the last page: focus goes to the first action it brought, once
  // that action is on screen (the fetch resolves before React draws it).
  const firstNewIndex = useRef<number | null>(null)
  const count =
    query.data?.pages.reduce((sum, page) => sum + page.actions.length, 0) ?? 0
  useEffect(() => {
    const index = firstNewIndex.current
    if (index === null || count <= index) return
    firstNewIndex.current = null
    listRef.current?.querySelectorAll('li').item(index)?.focus()
  }, [count])

  if (isRetrying || query.isError) {
    return (
      <LoadError
        message={content.loadError}
        isRetrying={isRetrying}
        onRetry={() => void retry()}
      />
    )
  }
  if (query.isPending) return <HistorySkeleton />

  const actions = query.data.pages.flatMap(page => page.actions)
  if (actions.length === 0) {
    return <p className='text-base text-slate-600'>{content.empty}</p>
  }

  const loadMore = () => {
    firstNewIndex.current = actions.length
    void query.fetchNextPage()
  }

  return (
    <div
      ref={targetRef}
      tabIndex={-1}
      className='flex flex-col gap-4 focus:outline-none'
    >
      <p className='text-base text-slate-600'>{content.intro}</p>
      <ActionDays listRef={listRef} actions={actions} names={targetNames} />
      {query.hasNextPage ? (
        <Button
          variant='secondary'
          className='self-start'
          isLoading={query.isFetchingNextPage}
          loadingText={content.loadingMore}
          onClick={loadMore}
        >
          {content.loadMore}
        </Button>
      ) : (
        <p className='text-sm text-slate-600'>{content.end}</p>
      )}
    </div>
  )
}
