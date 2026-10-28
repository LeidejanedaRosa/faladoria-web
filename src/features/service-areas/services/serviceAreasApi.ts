import { apiRequest } from '@shared/lib/api'

export type ServiceAreaStatus = 'active' | 'removed'

export interface ServiceArea {
  id: string
  city: string
  state: string
  addedAt: string
  /** `null` while the city is served. */
  removedAt: string | null
}

export interface CityLocation {
  city: string
  state: string
}

export const fetchServiceAreas = (
  status: ServiceAreaStatus,
  signal?: AbortSignal
) =>
  apiRequest<{ serviceAreas: ServiceArea[] }>('/api/service-areas', {
    query: { status },
    signal,
  }).then(({ serviceAreas }) => serviceAreas)

export const createServiceArea = (location: CityLocation) =>
  apiRequest<{ serviceAreaId: string }>('/api/service-areas', {
    method: 'POST',
    body: location,
  })

export const updateServiceAreaLocation = ({
  serviceAreaId,
  ...location
}: CityLocation & { serviceAreaId: string }) =>
  apiRequest<{ serviceAreaId: string }>('/api/service-areas/update-location', {
    method: 'POST',
    body: { serviceAreaId, ...location },
  })

export const removeServiceArea = (serviceAreaId: string) =>
  apiRequest<{ serviceAreaId: string; removedAt: string }>(
    '/api/service-areas/remove',
    { method: 'POST', body: { serviceAreaId } }
  )

export const reactivateServiceArea = (serviceAreaId: string) =>
  apiRequest<{ serviceAreaId: string }>('/api/service-areas/reactivate', {
    method: 'POST',
    body: { serviceAreaId },
  })

/**
 * How many accounts have the city assigned. Removing a city does not touch them, so the
 * confirmation says how many will keep a city the bot no longer serves.
 */
export const countAccountsInCity = (
  { city, state }: CityLocation,
  signal?: AbortSignal
) =>
  apiRequest<unknown[]>('/api/users', { query: { city, state }, signal }).then(
    accounts => accounts.length
  )
