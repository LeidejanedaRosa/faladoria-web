import { TEMPORARY_PASSWORD } from '@/test/fixtures/users'

import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useNewAccountFlow } from '../useNewAccountFlow'

const CREATED = {
  name: 'Fernanda Alves',
  temporaryPassword: TEMPORARY_PASSWORD,
}

describe('useNewAccountFlow', () => {
  it('holds the name and the password once the account is created, nothing else', () => {
    const { result } = renderHook(useNewAccountFlow)

    act(() =>
      result.current.onCreated({
        ...CREATED,
        userId: 'usr_fernanda',
        email: 'fernanda@faladoria.org',
      } as typeof CREATED)
    )

    expect(result.current.createdAccount).toEqual(CREATED)
    expect(result.current.announcement).toBe('')
  })

  it('drops the password and announces the account once it is noted', () => {
    const { result } = renderHook(useNewAccountFlow)
    act(() => result.current.onCreated(CREATED))

    act(() => result.current.onPasswordNoted())

    expect(result.current.createdAccount).toBeNull()
    expect(result.current.announcement).toBe(
      'A conta de Fernanda Alves foi criada.'
    )
  })

  it('shows a second password only after the first is noted, never over it', () => {
    const { result } = renderHook(useNewAccountFlow)
    const SECOND = {
      name: 'Bruno Lima',
      temporaryPassword: 'outra-senha-de-teste',
    }
    act(() => result.current.onCreated(CREATED))
    act(() => result.current.onCreated(SECOND))

    expect(result.current.createdAccount).toEqual(CREATED)

    act(() => result.current.onPasswordNoted())
    expect(result.current.createdAccount).toEqual(SECOND)
    expect(result.current.announcement).toBe(
      'A conta de Fernanda Alves foi criada.'
    )

    act(() => result.current.onPasswordNoted())
    expect(result.current.createdAccount).toBeNull()
    expect(result.current.announcement).toBe(
      'A conta de Bruno Lima foi criada.'
    )
  })
})
