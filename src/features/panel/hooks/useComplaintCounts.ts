import { useQuery } from '@tanstack/react-query'

import { fetchComplaintCounts } from '../services/complaintCounts'

export const COMPLAINT_COUNTS_QUERY_KEY = ['complaints', 'counts'] as const

export const useComplaintCounts = () =>
  useQuery({
    queryKey: COMPLAINT_COUNTS_QUERY_KEY,
    queryFn: ({ signal }) => fetchComplaintCounts(signal),
  })
