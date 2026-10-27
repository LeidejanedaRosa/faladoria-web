import { useQuery } from '@tanstack/react-query'

import { fetchCitiesOfState } from '../services/ibgeApi'

export const useIbgeCities = (state: string) =>
  useQuery({
    queryKey: ['ibge', 'cities', state],
    queryFn: ({ signal }) => fetchCitiesOfState(state, signal),
    enabled: state !== '',
    // A state's cities change once in years: one request per state for the whole visit.
    staleTime: Infinity,
    // One retry only: if the IBGE is down, the form falls back to free text instead of waiting.
    retry: 1,
  })
