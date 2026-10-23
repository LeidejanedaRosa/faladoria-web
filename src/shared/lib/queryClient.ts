import { QueryClient } from '@tanstack/react-query'

import { isApiError } from './api'

const MAX_RETRIES = 2

// Only failures that can pass on their own are retried: no connection or a server error.
// A 4xx (invalid data, no permission, rate limit) fails the same way on every attempt.
export const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (failureCount >= MAX_RETRIES) return false
  if (!isApiError(error)) return false
  return error.status === 0 || error.status >= 500
}

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: shouldRetry },
    },
  })
