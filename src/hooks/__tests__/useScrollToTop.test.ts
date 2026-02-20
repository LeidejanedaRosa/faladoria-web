import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useScrollToTop } from '../useScrollToTop'

describe('useScrollToTop', () => {
  it('should call window.scrollTo(0, 0) on mount', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(vi.fn())

    renderHook(() => useScrollToTop())

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0)

    scrollToSpy.mockRestore()
  })

  it('should not call scrollTo again on rerender', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(vi.fn())

    const { rerender } = renderHook(() => useScrollToTop())
    rerender()

    expect(scrollToSpy).toHaveBeenCalledTimes(1)

    scrollToSpy.mockRestore()
  })
})
