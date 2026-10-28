import { isApiError } from '@shared/lib/api'

import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'

const { errors } = SERVICE_AREAS_CONTENT

const KNOWN_CODES = [
  'SERVICE_AREA_ALREADY_EXISTS',
  'SERVICE_AREA_NOT_FOUND',
  'SERVICE_AREA_ALREADY_REMOVED',
  'SERVICE_AREA_NOT_REMOVED',
  'SERVICE_AREA_CONCURRENT_CHANGE',
  'FORBIDDEN',
] as const

type KnownCode = (typeof KNOWN_CODES)[number]

const isKnownCode = (code: string): code is KnownCode =>
  (KNOWN_CODES as readonly string[]).includes(code)

/** Codes after which the list on screen is out of date and is fetched again. */
export const STALE_LIST_CODES: readonly string[] = [
  'SERVICE_AREA_NOT_FOUND',
  'SERVICE_AREA_ALREADY_REMOVED',
  'SERVICE_AREA_NOT_REMOVED',
  'SERVICE_AREA_CONCURRENT_CHANGE',
]

/** Decides by the API's stable `code`; anything unknown keeps the API's own message. */
export const serviceAreaErrorMessage = (error: unknown): string | undefined => {
  if (!error) return undefined
  if (!isApiError(error)) return errors.generic
  return isKnownCode(error.code) ? errors[error.code] : error.message
}
