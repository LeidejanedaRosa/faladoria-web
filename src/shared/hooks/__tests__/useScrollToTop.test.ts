import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useScrollToTop } from '../useScrollToTop'

describe('useScrollToTop', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should call window.scrollTo(0, 0) on mount', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(vi.fn())
    vi.spyOn(document, 'getElementById').mockReturnValue(null)

    renderHook(() => useScrollToTop())

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  it('should focus the main content element on mount', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(vi.fn())
    const mockFocus = vi.fn()
    vi.spyOn(document, 'getElementById').mockReturnValue({
      focus: mockFocus,
    } as unknown as HTMLElement)

    renderHook(() => useScrollToTop())

    expect(document.getElementById).toHaveBeenCalledWith('main-content')
    expect(mockFocus).toHaveBeenCalledWith({ preventScroll: true })
  })

  it('should not throw when main content element is absent', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(vi.fn())
    vi.spyOn(document, 'getElementById').mockReturnValue(null)

    expect(() => renderHook(() => useScrollToTop())).not.toThrow()
  })

  it('should not call scrollTo again on rerender', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(vi.fn())
    vi.spyOn(document, 'getElementById').mockReturnValue(null)

    const { rerender } = renderHook(() => useScrollToTop())
    rerender()

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })
})
