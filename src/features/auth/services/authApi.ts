import { apiRequest } from '@shared/lib/api'

export type UserRole = 'admin' | 'assistant' | 'manager'

export interface SessionUser {
  id: string
  name: string
  email: string
  role: UserRole
  assignedCities: { city: string; state: string }[]
  /** True while the password is the temporary one: every panel route answers 403 until it changes. */
  mustChangePassword: boolean
  credentialExpiresAt: string | null
}

export interface Session {
  session: { expiresAt: string }
  user: SessionUser
}

export interface SignInInput {
  email: string
  password: string
}

export interface ChangePasswordInput {
  currentPassword: string
  newPassword: string
}

export const signIn = (input: SignInInput) =>
  apiRequest<{ user: SessionUser }>('/api/auth/sign-in/email', {
    method: 'POST',
    body: input,
  })

/** `null` when there is no session: the API answers 200 with an empty session, not 401. */
export const getSession = (signal?: AbortSignal) =>
  apiRequest<Session | null>('/api/auth/get-session', { signal })

export const signOut = () =>
  apiRequest<{ success: boolean }>('/api/auth/sign-out', { method: 'POST' })

export const changePassword = (input: ChangePasswordInput) =>
  apiRequest<{ user: SessionUser }>('/api/auth/change-password', {
    method: 'POST',
    // The temporary password may have been read by someone else: end any other session.
    body: { ...input, revokeOtherSessions: true },
  })
