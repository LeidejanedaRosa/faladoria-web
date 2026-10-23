import type {
  PublicComplaint,
  PublicComplaintStats,
} from '@features/landing/services/publicComplaints'

export const buildPublicComplaint = (
  overrides: Partial<PublicComplaint> = {}
): PublicComplaint => ({
  id: 'c1',
  status: 'inProgress',
  receivedOn: '2026-10-21',
  curatedData: {
    title: 'Demora para marcar cirurgia de catarata',
    description: 'Paciente aguarda há 4 meses.',
    city: 'Alfenas',
    state: 'MG',
    category: 'Cirurgia eletiva',
    occurrencePlace: 'Hospital Regional',
  },
  timeline: [],
  ...overrides,
})

export const PUBLIC_STATS: PublicComplaintStats = {
  total: 48,
  byStatus: { inReview: 9, inProgress: 14, unresolved: 6, resolved: 19 },
}

export const EMPTY_PUBLIC_STATS: PublicComplaintStats = {
  total: 0,
  byStatus: { inReview: 0, inProgress: 0, unresolved: 0, resolved: 0 },
}
