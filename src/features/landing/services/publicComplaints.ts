import { apiRequest } from '@shared/lib/api'

export const PUBLIC_COMPLAINT_STATUSES = [
  'inReview',
  'inProgress',
  'unresolved',
  'resolved',
] as const

export type PublicComplaintStatus = (typeof PUBLIC_COMPLAINT_STATUSES)[number]

export interface PublicComplaint {
  id: string
  status: PublicComplaintStatus
  /** Day in Brazil, `YYYY-MM-DD`. Text on purpose: `new Date()` would read it as UTC midnight. */
  receivedOn: string
  curatedData: {
    title: string
    description: string
    city: string
    state: string
    category: string
    occurrencePlace: string
  }
  timeline: { description: string; occurredOn: string }[]
}

export interface PublicComplaintsPage {
  complaints: PublicComplaint[]
  nextCursor?: string
}

export interface PublicComplaintStats {
  total: number
  byStatus: Record<PublicComplaintStatus, number>
}

export const fetchPublicComplaintStats = (signal?: AbortSignal) =>
  apiRequest<PublicComplaintStats>('/api/public/complaints/stats', {
    signal,
  })

export const fetchLatestPublicComplaints = (
  limit: number,
  signal?: AbortSignal
) =>
  apiRequest<PublicComplaintsPage>('/api/public/complaints', {
    query: { limit },
    signal,
  })
