import { apiRequest } from '@shared/lib/api'

export interface StaffAction {
  actorId: string
  /** Missing when the account no longer exists. */
  actorName?: string
  /** Method and route pattern, e.g. "POST /api/users/:id/update". */
  action: string
  /** The case, account or city acted on; missing for actions without one. */
  targetId?: string
  succeeded: boolean
  statusCode: number
  occurredAt: string
}

export interface StaffActionsPage {
  actions: StaffAction[]
  /** Missing on the last page. */
  nextCursor?: string
}

/** One person's actions, newest first. Admin only. */
export const fetchStaffActions = (
  actorId: string,
  cursor: string | undefined,
  signal?: AbortSignal
) =>
  apiRequest<StaffActionsPage>('/api/staff-actions', {
    query: { actorId, cursor },
    signal,
  })
