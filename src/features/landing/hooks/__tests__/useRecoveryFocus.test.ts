import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { useRecoveryFocus } from '../useRecoveryFocus'

const focusTarget = () => {
  const element = document.createElement('div')
  element.tabIndex = -1
  document.body.append(element)
  return element
}

const renderRecoveryFocus = () => {
  const target = focusTarget()
  const hook = renderHook(
    props => {
      const result = useRecoveryFocus<HTMLDivElement>(props)
      result.targetRef.current = target
      return result
    },
    { initialProps: { isSuccess: false, isFetching: false } }
  )
  return { ...hook, target }
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('useRecoveryFocus', () => {
  it('moves focus to the content when a retry succeeds', () => {
    const { result, rerender, target } = renderRecoveryFocus()

    act(() => result.current.markRecovering())
    rerender({ isSuccess: false, isFetching: true })
    rerender({ isSuccess: true, isFetching: false })

    expect(document.activeElement).toBe(target)
  })

  it('waits for the request to end before moving focus', () => {
    const { result, rerender, target } = renderRecoveryFocus()

    act(() => result.current.markRecovering())
    rerender({ isSuccess: false, isFetching: true })

    expect(document.activeElement).not.toBe(target)
  })

  it('leaves focus alone when the retry fails, so the button keeps it', () => {
    const { result, rerender, target } = renderRecoveryFocus()

    act(() => result.current.markRecovering())
    rerender({ isSuccess: false, isFetching: true })
    rerender({ isSuccess: false, isFetching: false })

    expect(document.activeElement).not.toBe(target)
  })

  it('forgets a failed retry, so a later refresh does not steal focus', () => {
    const { result, rerender, target } = renderRecoveryFocus()

    act(() => result.current.markRecovering())
    rerender({ isSuccess: false, isFetching: true })
    rerender({ isSuccess: false, isFetching: false })
    rerender({ isSuccess: false, isFetching: true })
    rerender({ isSuccess: true, isFetching: false })

    expect(document.activeElement).not.toBe(target)
  })

  it('does not steal focus from a control the person moved to while the retry was pending', () => {
    const { result, rerender, target } = renderRecoveryFocus()
    const retryButton = document.createElement('button')
    const otherLink = document.createElement('a')
    otherLink.href = '#cta'
    document.body.append(retryButton, otherLink)

    retryButton.focus()
    act(() => result.current.markRecovering())
    rerender({ isSuccess: false, isFetching: true })
    otherLink.focus()
    rerender({ isSuccess: true, isFetching: false })

    expect(document.activeElement).toBe(otherLink)
    expect(document.activeElement).not.toBe(target)
  })

  it('still rescues focus left on the retry button itself', () => {
    const { result, rerender, target } = renderRecoveryFocus()
    const retryButton = document.createElement('button')
    document.body.append(retryButton)

    retryButton.focus()
    act(() => result.current.markRecovering())
    rerender({ isSuccess: false, isFetching: true })
    rerender({ isSuccess: true, isFetching: false })

    expect(document.activeElement).toBe(target)
  })

  it('never moves focus on a load the person did not ask for', () => {
    const { rerender, target } = renderRecoveryFocus()

    rerender({ isSuccess: false, isFetching: true })
    rerender({ isSuccess: true, isFetching: false })

    expect(document.activeElement).not.toBe(target)
  })
})
