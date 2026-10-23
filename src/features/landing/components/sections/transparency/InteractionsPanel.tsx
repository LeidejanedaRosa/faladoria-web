import {
  LATEST_COMPLAINTS_LIMIT,
  TRANSPARENCY_CONTENT,
} from '../../../data/transparencyContent'
import { useLatestPublicComplaints } from '../../../hooks/useLatestPublicComplaints'
import { InteractionItem } from './InteractionItem'
import { InteractionsListSkeleton } from './InteractionsListSkeleton'
import { TransparencyLoadError } from './TransparencyLoadError'

const InteractionsList = () => {
  const {
    data: complaints,
    isPending,
    isError,
    refetch,
  } = useLatestPublicComplaints(LATEST_COMPLAINTS_LIMIT)

  if (isPending) return <InteractionsListSkeleton />
  if (isError) return <TransparencyLoadError onRetry={() => void refetch()} />
  if (complaints.length === 0) {
    return (
      <p className='py-6 text-center text-sm text-white/70'>
        {TRANSPARENCY_CONTENT.emptyInteractions}
      </p>
    )
  }

  return (
    <ul className='flex flex-col divide-y divide-white/10'>
      {complaints.map(complaint => (
        <InteractionItem key={complaint.id} complaint={complaint} />
      ))}
    </ul>
  )
}

export const InteractionsPanel = () => (
  <div className='bg-purple-deep flex min-w-0 flex-col gap-4 rounded-2xl p-4 sm:p-6'>
    <div className='flex items-center justify-between'>
      <h4 className='text-base font-semibold text-white sm:text-lg'>
        {TRANSPARENCY_CONTENT.interactionsPanelTitle}
      </h4>
      <span className='rounded-full bg-white/10 px-3 py-1 text-xs text-white/60'>
        {TRANSPARENCY_CONTENT.lgpdNotice}
      </span>
    </div>

    <InteractionsList />
  </div>
)
