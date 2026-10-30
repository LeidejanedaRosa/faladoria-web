import type { UserRole } from '@features/auth/services/authApi'
import { apiRequest } from '@shared/lib/api'

export type UserStatus =
  'active' | 'pendingFirstAccess' | 'temporaryCredentialExpired' | 'deactivated'

export interface AssignedCity {
  city: string
  state: string
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  assignedCities: AssignedCity[]
  status: UserStatus
  /** Complaints still in progress with the person (to reassign if the account is closed). */
  assignedComplaintCount: number
}

export interface NewAccount {
  name: string
  email: string
  role: UserRole
  assignedCities: AssignedCity[]
}

export interface CreatedAccount {
  userId: string
  email: string
  /** Only in this answer: the API keeps no readable copy. */
  temporaryPassword: string
}

export const fetchUsers = (signal?: AbortSignal) =>
  apiRequest<User[]>('/api/users', { signal })

export const createUser = (account: NewAccount) =>
  apiRequest<CreatedAccount>('/api/users', { method: 'POST', body: account })
