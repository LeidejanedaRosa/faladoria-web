import { useQuery } from '@tanstack/react-query'

import {
  fetchServiceAreas,
  type ServiceAreaStatus,
} from '../services/serviceAreasApi'

export const SERVICE_AREAS_QUERY_KEY = ['service-areas'] as const

export const useServiceAreas = (status: ServiceAreaStatus) =>
  useQuery({
    queryKey: [...SERVICE_AREAS_QUERY_KEY, status],
    queryFn: ({ signal }) => fetchServiceAreas(status, signal),
  })
