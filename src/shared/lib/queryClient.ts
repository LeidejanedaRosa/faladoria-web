import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

import { isApiError } from './api'

const MAX_RETRIES = 2

/** API codes that mean the session in hand is no longer valid for the panel. */
const SESSION_LOST_CODES: readonly string[] = [
  'UNAUTHENTICATED',
  'MUST_CHANGE_PASSWORD',
]

// Only failures that can pass on their own are retried: no connection or a server error.
// A 4xx (invalid data, no permission, rate limit) fails the same way on every attempt.
export const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (failureCount >= MAX_RETRIES) return false
  if (!isApiError(error)) return false
  return error.status === 0 || error.status >= 500
}

export const isSessionLost = (error: unknown): boolean =>
  isApiError(error) && SESSION_LOST_CODES.includes(error.code)

interface QueryClientOptions {
  /**
   * Called when any request finds the session gone (expired, or the password was reset).
   * Injected by the app: this shared module does not know the auth feature.
   */
  onSessionLost?: () => void
}

export const createQueryClient = ({
  onSessionLost,
}: QueryClientOptions = {}) => {
  const handleError = (error: unknown) => {
    if (isSessionLost(error)) onSessionLost?.()
  }

  return new QueryClient({
    queryCache: new QueryCache({ onError: handleError }),
    mutationCache: new MutationCache({ onError: handleError }),
    defaultOptions: {
      queries: { retry: shouldRetry },
    },
  })
}
