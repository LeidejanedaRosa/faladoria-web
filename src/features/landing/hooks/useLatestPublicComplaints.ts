import { useQuery } from '@tanstack/react-query'

import { fetchLatestPublicComplaints } from '../services/publicComplaints'
import { PUBLIC_BOARD_STALE_TIME_MS, publicComplaintKeys } from './queryKeys'

export const useLatestPublicComplaints = (limit: number) =>
  useQuery({
    queryKey: publicComplaintKeys.latest(limit),
    queryFn: ({ signal }) => fetchLatestPublicComplaints(limit, signal),
    select: page => page.complaints,
    staleTime: PUBLIC_BOARD_STALE_TIME_MS,
  })
