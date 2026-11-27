import type { ReactElement, ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

// One client per test: a shared cache would hand one test the data of the previous one.
// No retries, so an error state shows up at once instead of after the backoff. A hook that
// sets its own `retry` (useIbgeCities) overrides that, so the delay is zeroed too: the retry
// still happens and can be asserted, without a real one-second wait.
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, retryDelay: 0 } },
  })

export const createQueryWrapper = (client = createTestQueryClient()) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
  return Wrapper
}

export const renderWithQueryClient = (
  ui: ReactElement
): ReturnType<typeof render> => render(ui, { wrapper: createQueryWrapper() })
