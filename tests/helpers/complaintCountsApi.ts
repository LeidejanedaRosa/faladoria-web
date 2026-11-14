import type { Page } from '@playwright/test'

import { E2E_API_URL } from './publicBoardApi'

/** The team's numbers: the admin's "Reclamações" folder shows the open ones (2). */
export const TEAM_COUNTS = {
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

/** Answers /api/complaints/counts, which every page under the admin's folders asks for. Without
 * it the folder shows no number, as it does when the API is down. */
export const mockComplaintCounts = (page: Page) =>
  page.route(`${E2E_API_URL}/api/complaints/counts`, route =>
    route.fulfill({ json: TEAM_COUNTS })
  )
