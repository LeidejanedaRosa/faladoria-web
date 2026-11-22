import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchStaffActions } from './services/staffActionsApi'

export const STAFF_ACTIONS_QUERY_KEY = ['staff-actions'] as const

/** A person's actions, one page of 20 at a time: the log only grows, so it is read by cursor. */
export const useStaffActions = (actorId: string) =>
  useInfiniteQuery({
    queryKey: [...STAFF_ACTIONS_QUERY_KEY, actorId],
    queryFn: ({ pageParam, signal }) =>
      fetchStaffActions(actorId, pageParam, signal),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => lastPage.nextCursor,
  })
