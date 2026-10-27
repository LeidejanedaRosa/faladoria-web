import { isApiError } from '@shared/lib/api'
import {
  type MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createServiceArea,
  reactivateServiceArea,
  removeServiceArea,
  updateServiceAreaLocation,
} from '../services/serviceAreasApi'
import { STALE_LIST_CODES } from '../utils/serviceAreaErrorMessage'
import { SERVICE_AREAS_QUERY_KEY } from './useServiceAreas'

// Every change moves a city between the two lists (or renames it), so both are refetched; a
// conflict means someone else changed the list, so it is refetched too.
const useServiceAreaMutation = <TResult, TInput>(
  mutationFn: MutationFunction<TResult, TInput>
) => {
  const queryClient = useQueryClient()
  const refreshLists = () =>
    queryClient.invalidateQueries({ queryKey: SERVICE_AREAS_QUERY_KEY })

  return useMutation({
    mutationFn,
    onSuccess: refreshLists,
    onError: error => {
      if (isApiError(error) && STALE_LIST_CODES.includes(error.code)) {
        void refreshLists()
      }
    },
  })
}

export const useCreateServiceArea = () =>
  useServiceAreaMutation(createServiceArea)

export const useUpdateServiceAreaLocation = () =>
  useServiceAreaMutation(updateServiceAreaLocation)

export const useRemoveServiceArea = () =>
  useServiceAreaMutation(removeServiceArea)

export const useReactivateServiceArea = () =>
  useServiceAreaMutation(reactivateServiceArea)
