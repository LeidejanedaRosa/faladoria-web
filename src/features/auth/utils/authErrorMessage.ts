import { isApiError } from '@shared/lib/api'

import { AUTH_CONTENT } from '../data/authContent'

const KNOWN_CODES = [
  'INVALID_CREDENTIALS',
  'TEMPORARY_PASSWORD_EXPIRED',
  'ACCOUNT_DEACTIVATED',
  'CURRENT_PASSWORD_INCORRECT',
] as const

type KnownCode = (typeof KNOWN_CODES)[number]

const isKnownCode = (code: string): code is KnownCode =>
  (KNOWN_CODES as readonly string[]).includes(code)

/** Decides by the API's stable `code`, never by its text; anything unknown keeps the API's message. */
export const authErrorMessage = (error: unknown): string | undefined => {
  if (!error) return undefined
  const { errors } = AUTH_CONTENT
  if (!isApiError(error)) return errors.generic
  if (error.code === 'RATE_LIMITED') {
    return error.retryAfterSeconds
      ? errors.rateLimitedWithWait(error.retryAfterSeconds)
      : errors.rateLimited
  }
  return isKnownCode(error.code) ? errors[error.code] : error.message
}
