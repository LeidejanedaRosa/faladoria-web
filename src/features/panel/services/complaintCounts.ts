import { apiRequest } from '@shared/lib/api'

type PublishedStatus = 'inReview' | 'inProgress' | 'unresolved' | 'resolved'
type HiddenStatus = 'open' | 'rejected' | 'outOfServiceArea'

/** admin and assistant: every status plus the inbox numbers (docs/API.md, 6.3). */
export interface TeamComplaintCounts {
  byStatus: Record<PublishedStatus | HiddenStatus, number>
  unread: number
  assignedToMe: number
  unassigned: number
}

/** manager: only the four published statuses. */
export interface ManagerComplaintCounts {
  byStatus: Record<PublishedStatus, number>
}

export type ComplaintCounts = TeamComplaintCounts | ManagerComplaintCounts

export const isTeamCounts = (
  counts: ComplaintCounts
): counts is TeamComplaintCounts => 'unread' in counts

export const fetchComplaintCounts = (signal?: AbortSignal) =>
  apiRequest<ComplaintCounts>('/api/complaints/counts', { signal })
