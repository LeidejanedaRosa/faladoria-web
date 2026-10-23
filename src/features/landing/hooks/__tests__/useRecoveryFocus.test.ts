import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useRecoveryFocus } from '../useRecoveryFocus'

const appendFocusable = <K extends keyof HTMLElementTagNameMap>(tag: K) => {
  const element = document.createElement(tag)
  element.tabIndex = tag === 'div' ? -1 : 0
  document.body.append(element)
  return element
}

/** A refetch the test settles by hand, to look at the state in the middle of the retry. */
const controllableRefetch = () => {
  let settle: (isSuccess: boolean) => void = () => {}
  const refetch = vi.fn(
    () =>
      new Promise<{ isSuccess: boolean }>(resolve => {
        settle = isSuccess => resolve({ isSuccess })
      })
  )
  return { refetch, settle: (isSuccess: boolean) => settle(isSuccess) }
}

const renderRecoveryFocus = () => {
  const target = appendFocusable('div')
  const retryButton = appendFocusable('button')
  const { refetch, settle } = controllableRefetch()
  const hook = renderHook(() => {
    const result = useRecoveryFocus<HTMLDivElement>(refetch)
    result.targetRef.current = target
    return result
  })
  const startRetry = () => {
    retryButton.focus()
    let pending: Promise<void> = Promise.resolve()
    act(() => {
      pending = hook.result.current.retry()
    })
    return pending
  }
  const finishRetry = async (pending: Promise<void>, isSuccess: boolean) => {
    await act(async () => {
      settle(isSuccess)
      await pending
    })
  }
  return { ...hook, target, retryButton, refetch, startRetry, finishRetry }
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('useRecoveryFocus', () => {
  it('reports the retry while it runs, so the error block stays mounted', async () => {
    const { result, startRetry, finishRetry } = renderRecoveryFocus()

    const pending = startRetry()
    expect(result.current.isRetrying).toBe(true)

    await finishRetry(pending, false)
    expect(result.current.isRetrying).toBe(false)
  })

  it('moves focus to the content when the retry works', async () => {
    const { target, startRetry, finishRetry } = renderRecoveryFocus()

    await finishRetry(startRetry(), true)

    expect(document.activeElement).toBe(target)
  })

  it('rescues focus that fell to <body> when the button left the page', async () => {
    const { target, retryButton, startRetry, finishRetry } =
      renderRecoveryFocus()

    const pending = startRetry()
    retryButton.remove()
    await finishRetry(pending, true)

    expect(document.activeElement).toBe(target)
  })

  it('leaves focus on the retry button when the retry fails again', async () => {
    const { retryButton, startRetry, finishRetry } = renderRecoveryFocus()

    await finishRetry(startRetry(), false)

    expect(document.activeElement).toBe(retryButton)
  })

  it('does not steal focus from a control the person moved to while waiting', async () => {
    const { target, startRetry, finishRetry } = renderRecoveryFocus()
    const otherLink = appendFocusable('a')

    const pending = startRetry()
    otherLink.focus()
    await finishRetry(pending, true)

    expect(document.activeElement).toBe(otherLink)
    expect(document.activeElement).not.toBe(target)
  })

  it('ignores a second press while the retry is running', async () => {
    const { result, refetch, startRetry, finishRetry } = renderRecoveryFocus()

    const pending = startRetry()
    await act(async () => {
      await result.current.retry()
    })
    await finishRetry(pending, true)

    expect(refetch).toHaveBeenCalledTimes(1)
  })
})
