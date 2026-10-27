import type {
  ManagerComplaintCounts,
  TeamComplaintCounts,
} from '@features/panel/services/complaintCounts'

export const TEAM_COUNTS: TeamComplaintCounts = {
  byStatus: {
    open: 2,
    rejected: 1,
    inReview: 3,
    inProgress: 5,
    resolved: 12,
    unresolved: 1,
    outOfServiceArea: 0,
  },
  unread: 4,
  assignedToMe: 6,
  unassigned: 7,
}

export const MANAGER_COUNTS: ManagerComplaintCounts = {
  byStatus: { inReview: 3, inProgress: 5, unresolved: 1, resolved: 12 },
}
