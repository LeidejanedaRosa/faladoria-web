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

export type AccountChanges = Partial<
  Pick<NewAccount, 'name' | 'role' | 'assignedCities'>
>

export interface UpdatedAccount extends User {
  /** Cases in progress with the person that the new role and cities no longer let them handle.
   * The change is saved all the same; they stay with the person until someone reassigns them. */
  complaintsOutOfReach: number
}

export const updateUser = (userId: string, changes: AccountChanges) =>
  apiRequest<UpdatedAccount>(
    `/api/users/${encodeURIComponent(userId)}/update`,
    { method: 'POST', body: changes }
  )
