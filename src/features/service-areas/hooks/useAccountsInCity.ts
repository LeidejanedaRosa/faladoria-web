import { useQuery } from '@tanstack/react-query'

import {
  type CityLocation,
  countAccountsInCity,
} from '../services/serviceAreasApi'

/** Only asks while the removal dialog is open for a city (`null` otherwise). */
export const useAccountsInCity = (location: CityLocation | null) =>
  useQuery({
    queryKey: ['users', 'count-in-city', location?.city, location?.state],
    queryFn: ({ signal }) => countAccountsInCity(location!, signal),
    enabled: location !== null,
    retry: false,
  })
