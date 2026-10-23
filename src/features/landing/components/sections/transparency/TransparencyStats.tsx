import { usePublicComplaintStats } from '../../../hooks/usePublicComplaintStats'
import { useRecoveryFocus } from '../../../hooks/useRecoveryFocus'
import { buildTransparencyStats } from '../../../utils/buildTransparencyStats'
import { StatsGrid } from './StatsGrid'
import { StatsGridSkeleton } from './StatsGridSkeleton'
import { TransparencyLoadError } from './TransparencyLoadError'

export const TransparencyStats = () => {
  const { data, isPending, isError, isSuccess, isFetching, refetch } =
    usePublicComplaintStats()
  const { targetRef, markRecovering } = useRecoveryFocus<HTMLDivElement>({
    isSuccess,
    isFetching,
  })

  if (isPending) return <StatsGridSkeleton />
  if (isError) {
    return (
      <TransparencyLoadError
        onRetry={() => {
          markRecovering()
          void refetch()
        }}
      />
    )
  }

  return (
    <div ref={targetRef} tabIndex={-1}>
      <StatsGrid stats={buildTransparencyStats(data)} totalValue={data.total} />
    </div>
  )
}
