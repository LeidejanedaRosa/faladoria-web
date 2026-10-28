import { TEMPORARY_PASSWORD } from '@/test/fixtures/users'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper, createTestQueryClient } from '@/test/queryClient'

import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useCreateUser } from '../useCreateUser'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const ACCOUNT = {
  name: 'Fernanda Alves',
  email: 'fernanda@saude.lavras.mg.gov.br',
  role: 'manager' as const,
  assignedCities: [{ city: 'Lavras', state: 'MG' }],
}

const setup = () => {
  const client = createTestQueryClient()
  const invalidate = vi.spyOn(client, 'invalidateQueries')
  const { result } = renderHook(useCreateUser, {
    wrapper: createQueryWrapper(client),
  })
  return { invalidate, result }
}

describe('useCreateUser', () => {
  // ['users'] is also the prefix of the "accounts in this city" counts of the served cities.
  it('refetches every users query after creating an account', async () => {
    stubApi().mockResolvedValue(
      jsonResponse(
        {
          userId: 'usr_new',
          email: ACCOUNT.email,
          temporaryPassword: TEMPORARY_PASSWORD,
        },
        201
      )
    )
    const { invalidate, result } = setup()

    await act(() => result.current.mutateAsync(ACCOUNT))

    expect(invalidate).toHaveBeenCalledWith({ queryKey: ['users'] })
  })

  it('leaves the list alone when the account was not created', async () => {
    stubApi().mockResolvedValue(
      apiErrorResponse(409, 'USER_EMAIL_ALREADY_EXISTS')
    )
    const { invalidate, result } = setup()

    await act(() => result.current.mutateAsync(ACCOUNT).catch(() => {}))

    expect(invalidate).not.toHaveBeenCalled()
  })
})
