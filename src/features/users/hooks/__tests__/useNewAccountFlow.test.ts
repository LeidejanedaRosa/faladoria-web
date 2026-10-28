import { TEMPORARY_PASSWORD } from '@/test/fixtures/users'

import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useNewAccountFlow } from '../useNewAccountFlow'

const CREATED = {
  name: 'Fernanda Alves',
  temporaryPassword: TEMPORARY_PASSWORD,
}

describe('useNewAccountFlow', () => {
  it('opens and closes the form with the same button', () => {
    const { result } = renderHook(useNewAccountFlow)

    act(() => result.current.toggleForm())
    expect(result.current.isFormOpen).toBe(true)

    act(() => result.current.toggleForm())
    expect(result.current.isFormOpen).toBe(false)
  })

  it('gives focus back to the button when the form is cancelled', () => {
    const { result } = renderHook(useNewAccountFlow)
    const button = document.createElement('button')
    document.body.append(button)
    result.current.openButtonRef.current = button

    act(() => result.current.toggleForm())
    act(() => result.current.closeForm())

    expect(result.current.isFormOpen).toBe(false)
    expect(button).toHaveFocus()
    button.remove()
  })

  it('closes the form and holds the password once the account is created', () => {
    const { result } = renderHook(useNewAccountFlow)
    act(() => result.current.toggleForm())

    act(() => result.current.onCreated(CREATED))

    expect(result.current.isFormOpen).toBe(false)
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
})
