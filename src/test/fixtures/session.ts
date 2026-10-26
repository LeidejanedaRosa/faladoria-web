import type { Session, SessionUser } from '@features/auth/services/authApi'

export const buildSessionUser = (
  overrides: Partial<SessionUser> = {}
): SessionUser => ({
  id: 'usr_ana',
  name: 'Ana Souza',
  email: 'ana@faladoria.org',
  role: 'assistant',
  assignedCities: [{ city: 'Varginha', state: 'MG' }],
  mustChangePassword: false,
  credentialExpiresAt: null,
  ...overrides,
})

export const buildSession = (
  overrides: Partial<SessionUser> = {}
): Session => ({
  session: { expiresAt: '2026-11-01T12:00:00.000Z' },
  user: buildSessionUser(overrides),
})
