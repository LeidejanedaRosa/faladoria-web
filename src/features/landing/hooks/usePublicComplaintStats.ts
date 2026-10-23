import { useQuery } from '@tanstack/react-query'

import { fetchPublicComplaintStats } from '../services/publicComplaints'
import { PUBLIC_BOARD_STALE_TIME_MS, publicComplaintKeys } from './queryKeys'

export const usePublicComplaintStats = () =>
  useQuery({
    queryKey: publicComplaintKeys.stats(),
    queryFn: ({ signal }) => fetchPublicComplaintStats(signal),
    staleTime: PUBLIC_BOARD_STALE_TIME_MS,
  })
