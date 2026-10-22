export const NETWORK_ERROR_CODE = 'NETWORK_ERROR'
export const UNEXPECTED_RESPONSE_CODE = 'UNEXPECTED_RESPONSE'

interface ApiErrorInit {
  status: number
  code: string
  message: string
  details?: unknown
  retryAfterSeconds?: number
}

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly details?: unknown
  readonly retryAfterSeconds?: number

  constructor({
    status,
    code,
    message,
    details,
    retryAfterSeconds,
  }: ApiErrorInit) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
    this.retryAfterSeconds = retryAfterSeconds
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError
