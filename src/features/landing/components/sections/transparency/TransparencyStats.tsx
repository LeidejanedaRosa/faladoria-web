import { usePublicComplaintStats } from '../../../hooks/usePublicComplaintStats'
import { useRecoveryFocus } from '../../../hooks/useRecoveryFocus'
import { buildTransparencyStats } from '../../../utils/buildTransparencyStats'
import { StatsGrid } from './StatsGrid'
import { StatsGridSkeleton } from './StatsGridSkeleton'
import { TransparencyLoadError } from './TransparencyLoadError'

export const TransparencyStats = () => {
  const { data, isPending, isError, refetch } = usePublicComplaintStats()
  const { targetRef, isRetrying, retry } =
    useRecoveryFocus<HTMLDivElement>(refetch)

  // Retrying first: a query with no data goes back to pending on refetch, and the skeleton
  // would replace the focused retry button.
  if (isRetrying || isError) {
    return (
      <TransparencyLoadError
        onRetry={() => void retry()}
        isRetrying={isRetrying}
      />
    )
  }
  if (isPending) return <StatsGridSkeleton />

  return (
    <div ref={targetRef} tabIndex={-1}>
      <StatsGrid stats={buildTransparencyStats(data)} totalValue={data.total} />
    </div>
  )
}
