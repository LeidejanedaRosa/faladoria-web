import { usePublicComplaintStats } from '../../../hooks/usePublicComplaintStats'
import { buildTransparencyStats } from '../../../utils/buildTransparencyStats'
import { StatsGrid } from './StatsGrid'
import { StatsGridSkeleton } from './StatsGridSkeleton'
import { TransparencyLoadError } from './TransparencyLoadError'

export const TransparencyStats = () => {
  const { data, isPending, isError, refetch } = usePublicComplaintStats()

  if (isPending) return <StatsGridSkeleton />
  if (isError) return <TransparencyLoadError onRetry={() => void refetch()} />

  return (
    <StatsGrid stats={buildTransparencyStats(data)} totalValue={data.total} />
  )
}
