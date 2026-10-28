import { useQuery } from '@tanstack/react-query'

import { fetchUsers } from '../services/usersApi'

export const USERS_QUERY_KEY = ['users'] as const

export const useUsers = () =>
  useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: ({ signal }) => fetchUsers(signal),
  })
