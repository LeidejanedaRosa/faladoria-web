import type { StaffAction } from '@features/staff-actions/services/staffActionsApi'

export const buildStaffAction = (
  overrides: Partial<StaffAction> = {}
): StaffAction => ({
  actorId: 'usr_ana',
  actorName: 'Ana Souza',
  action: 'POST /api/complaints/claim',
  targetId: 'cmp_1',
  succeeded: true,
  statusCode: 204,
  occurredAt: '2026-11-21T17:03:00.000Z',
  ...overrides,
})
