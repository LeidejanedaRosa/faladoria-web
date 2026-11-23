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
  const endRef = useRef<HTMLParagraphElement>(null)
  // "Load more" may leave with the last page: once the page is on screen (the fetch resolves
  // before React draws it), focus goes to the first action it brought, or, if it brought none,
  // to the "no older actions" message that replaced the button.
  const firstNewIndex = useRef<number | null>(null)
  const { isFetchingNextPage, hasNextPage } = query
  const count =
    query.data?.pages.reduce((sum, page) => sum + page.actions.length, 0) ?? 0
  useEffect(() => {
    const index = firstNewIndex.current
    if (index === null || isFetchingNextPage) return
    firstNewIndex.current = null
    if (count > index)
      listRef.current?.querySelectorAll('li').item(index)?.focus()
    else if (!hasNextPage) endRef.current?.focus()
  }, [count, isFetchingNextPage, hasNextPage])

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
    // Also where a retry lands when it brings nothing: the retry button is gone by then.
    return (
      <div ref={targetRef} tabIndex={-1} className='focus:outline-none'>
        <p className='text-base text-slate-600'>{content.empty}</p>
      </div>
    )
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
          isLoading={isFetchingNextPage}
          loadingText={content.loadingMore}
          onClick={loadMore}
        >
          {content.loadMore}
        </Button>
      ) : (
        <p
          ref={endRef}
          tabIndex={-1}
          className='text-sm text-slate-600 focus:outline-none'
        >
          {content.end}
        </p>
      )}
    </div>
  )
}
