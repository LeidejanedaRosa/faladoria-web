import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useSidebar } from '../useSidebar'

afterEach(() => {
  document.body.style.overflow = ''
})

describe('useSidebar', () => {
  describe('initial state', () => {
    it('should start closed', () => {
      const { result } = renderHook(() => useSidebar())
      expect(result.current.isOpen).toBe(false)
    })

    it('should provide ref objects', () => {
      const { result } = renderHook(() => useSidebar())
      expect(result.current.triggerRef).toBeDefined()
      expect(result.current.sidebarRef).toBeDefined()
    })
  })

  describe('open/close', () => {
    it('should open the sidebar', () => {
      const { result } = renderHook(() => useSidebar())

      act(() => result.current.open())

      expect(result.current.isOpen).toBe(true)
    })

    it('should close the sidebar', () => {
      const { result } = renderHook(() => useSidebar())

      act(() => result.current.open())
      act(() => result.current.close())

      expect(result.current.isOpen).toBe(false)
    })

    it('should return focus to trigger on close', () => {
      const { result } = renderHook(() => useSidebar())

      const button = document.createElement('button')
      document.body.appendChild(button)

      Object.defineProperty(result.current.triggerRef, 'current', {
        value: button,
        writable: true,
      })

      const focusSpy = vi.spyOn(button, 'focus')

      act(() => result.current.open())
      act(() => result.current.close())

      expect(focusSpy).toHaveBeenCalled()

      document.body.removeChild(button)
    })
  })

  describe('onOpenChange callback', () => {
    it('should call onOpenChange when opened', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => useSidebar({ onOpenChange }))

      act(() => result.current.open())

      expect(onOpenChange).toHaveBeenCalledWith(true)
    })

    it('should call onOpenChange when closed', () => {
      const onOpenChange = vi.fn()
      const { result } = renderHook(() => useSidebar({ onOpenChange }))

      act(() => result.current.open())
      act(() => result.current.close())

      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('should not call onOpenChange on initial render', () => {
      const onOpenChange = vi.fn()
      renderHook(() => useSidebar({ onOpenChange }))

      expect(onOpenChange).not.toHaveBeenCalled()
    })
  })

  describe('body scroll lock', () => {
    it('should lock body scroll when opened', () => {
      const { result } = renderHook(() => useSidebar())

      act(() => result.current.open())

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should restore body scroll when closed', () => {
      document.body.style.overflow = 'auto'
      const { result } = renderHook(() => useSidebar())

      act(() => result.current.open())
      act(() => result.current.close())

      expect(document.body.style.overflow).toBe('auto')
    })
  })

  describe('Escape key', () => {
    it('should close sidebar on Escape key', () => {
      const { result } = renderHook(() => useSidebar())

      act(() => result.current.open())
      expect(result.current.isOpen).toBe(true)

      act(() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
        )
      })

      expect(result.current.isOpen).toBe(false)
    })

    it('should not respond to Escape when closed', () => {
      const onOpenChange = vi.fn()
      renderHook(() => useSidebar({ onOpenChange }))

      act(() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
        )
      })

      expect(onOpenChange).not.toHaveBeenCalled()
    })

    it('should ignore other keys', () => {
      const { result } = renderHook(() => useSidebar())

      act(() => result.current.open())

      act(() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
        )
      })

      expect(result.current.isOpen).toBe(true)
    })
  })

  describe('cleanup', () => {
    it('should restore body scroll on unmount while open', () => {
      document.body.style.overflow = 'auto'
      const { result, unmount } = renderHook(() => useSidebar())

      act(() => result.current.open())
      expect(document.body.style.overflow).toBe('hidden')

      unmount()
      expect(document.body.style.overflow).toBe('auto')
    })

    it('should remove keydown listener on unmount', () => {
      const { result, unmount } = renderHook(() => useSidebar())

      act(() => result.current.open())
      unmount()

      const spy = vi.spyOn(document, 'removeEventListener')
      // No error should occur when dispatching events after unmount
      expect(() => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
        )
      }).not.toThrow()
      spy.mockRestore()
    })
  })

  describe('stable references', () => {
    it('should return stable open and close functions', () => {
      const { result, rerender } = renderHook(() => useSidebar())

      const firstOpen = result.current.open
      const firstClose = result.current.close

      rerender()

      expect(result.current.open).toBe(firstOpen)
      expect(result.current.close).toBe(firstClose)
    })
  })
})
