import { useQuery } from '@tanstack/react-query'

import { getSession } from '../services/authApi'

export const SESSION_QUERY_KEY = ['session'] as const

export const useSession = () =>
  useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: ({ signal }) => getSession(signal),
    // The session is read on every guarded screen; re-reading it on each navigation would
    // only repeat the same answer. Sign-in, sign-out and password change refresh it on purpose.
    staleTime: 5 * 60_000,
  })
