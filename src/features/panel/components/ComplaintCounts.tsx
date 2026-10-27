import { Button } from '@shared/components/ui'
import { useRecoveryFocus } from '@shared/hooks/useRecoveryFocus'

import { PANEL_CONTENT } from '../data/panelContent'
import { useComplaintCounts } from '../hooks/useComplaintCounts'
import {
  type ComplaintCounts as Counts,
  isTeamCounts,
  type TeamComplaintCounts,
} from '../services/complaintCounts'
import { CountCard } from './CountCard'
import { CountsSkeleton } from './CountsSkeleton'

const { home } = PANEL_CONTENT
const ACTION_KEYS = ['unread', 'assignedToMe', 'unassigned'] as const
const STATUS_KEYS = [
  'inReview',
  'inProgress',
  'unresolved',
  'resolved',
] as const

const SectionHeading = ({ id, children }: { id: string; children: string }) => (
  <h2 id={id} className='text-lg font-semibold text-slate-900'>
    {children}
  </h2>
)

const TeamActionCards = ({ counts }: { counts: TeamComplaintCounts }) => (
  <section aria-labelledby='panel-actions' className='flex flex-col gap-4'>
    <SectionHeading id='panel-actions'>{home.actionHeading}</SectionHeading>
    <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <CountCard
        {...home.actionCards.open}
        value={counts.byStatus.open}
        isHighlighted
      />
      {ACTION_KEYS.map(key => (
        <CountCard
          key={key}
          {...home.actionCards[key]}
          value={counts[key]}
          isHighlighted
        />
      ))}
    </dl>
  </section>
)

const StatusCards = ({ counts }: { counts: Counts }) => (
  <section aria-labelledby='panel-statuses' className='flex flex-col gap-4'>
    <SectionHeading id='panel-statuses'>{home.statusHeading}</SectionHeading>
    {/* Two columns already on the phone: a short label and a number fit side by side. */}
    <dl className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
      {STATUS_KEYS.map(key => (
        <CountCard
          key={key}
          label={home.statuses[key]}
          value={counts.byStatus[key]}
        />
      ))}
    </dl>
  </section>
)

export const ComplaintCounts = () => {
  const { data, isPending, isError, refetch } = useComplaintCounts()
  const { targetRef, isRetrying, retry } =
    useRecoveryFocus<HTMLDivElement>(refetch)

  if (isRetrying || isError) {
    return (
      <div
        role='alert'
        className='flex flex-col items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between'
      >
        <p className='text-base text-red-800'>{home.loadError}</p>
        <Button
          variant='secondary'
          onClick={() => void retry()}
          isLoading={isRetrying}
          loadingText={home.retrying}
        >
          {home.retry}
        </Button>
      </div>
    )
  }
  if (isPending) return <CountsSkeleton />

  return (
    <div ref={targetRef} tabIndex={-1} className='flex flex-col gap-8'>
      {/* The manager only gets the published statuses: the team's inbox does not apply. */}
      {isTeamCounts(data) && <TeamActionCards counts={data} />}
      <StatusCards counts={data} />
    </div>
  )
}
