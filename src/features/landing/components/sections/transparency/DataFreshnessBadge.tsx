import { TRANSPARENCY_CONTENT } from '../../../data/transparencyContent'
import { usePublicComplaintStats } from '../../../hooks/usePublicComplaintStats'
import { formatClockTime } from '../../../utils/formatClockTime'

// Shares the stats query (same cache key): no extra request. Rendered in every state so
// the header keeps its height on mobile, where the badge sits above the cards.
export const DataFreshnessBadge = () => {
  const { isSuccess, isError, dataUpdatedAt } = usePublicComplaintStats()
  const { freshness } = TRANSPARENCY_CONTENT

  return (
    <span className='inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80'>
      <span
        className={`h-2 w-2 rounded-full ${isSuccess ? 'bg-green-400' : 'bg-white/40'}`}
        aria-hidden='true'
      />
      {isSuccess && (
        <span>
          {freshness.updatedAtPrefix}{' '}
          <time dateTime={new Date(dataUpdatedAt).toISOString()}>
            {formatClockTime(dataUpdatedAt)}
          </time>
        </span>
      )}
      {isError && <span>{freshness.failed}</span>}
      {!isSuccess && !isError && <span>{freshness.loading}</span>}
    </span>
  )
}
