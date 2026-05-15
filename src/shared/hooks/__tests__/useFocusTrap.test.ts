import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { FOCUSABLE_SELECTOR, useFocusTrap } from '../useFocusTrap'

const createContainer = (...elements: HTMLElement[]) => {
  const container = document.createElement('div')
  elements.forEach(el => container.appendChild(el))
  document.body.appendChild(container)
  return container
}

const createButton = (label: string) => {
  const btn = document.createElement('button')
  btn.textContent = label
  return btn
}

const createLink = (label: string) => {
  const link = document.createElement('a')
  link.href = '#'
  link.textContent = label
  return link
}

const pressTab = (container: HTMLElement, shiftKey = false) => {
  const event = new KeyboardEvent('keydown', {
    key: 'Tab',
    shiftKey,
    bubbles: true,
    cancelable: true,
  })
  container.dispatchEvent(event)
  return event
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('useFocusTrap', () => {
  describe('FOCUSABLE_SELECTOR', () => {
    it('should match common focusable elements', () => {
      const container = document.createElement('div')
      container.innerHTML = `
        <a href="#">Link</a>
        <button>Button</button>
        <input type="text" />
        <select><option>Option</option></select>
        <textarea></textarea>
        <div tabindex="0">Custom</div>
      `
      const matches = container.querySelectorAll(FOCUSABLE_SELECTOR)
      expect(matches).toHaveLength(6)
    })

    it('should exclude disabled elements and tabindex="-1"', () => {
      const container = document.createElement('div')
      container.innerHTML = `
        <button disabled>Disabled</button>
        <input disabled />
        <div tabindex="-1">Not focusable</div>
      `
      const matches = container.querySelectorAll(FOCUSABLE_SELECTOR)
      expect(matches).toHaveLength(0)
    })
  })

  describe('activation', () => {
    it('should not trap focus when inactive', () => {
      const btn = createButton('First')
      const container = createContainer(btn)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, false))

      const spy = vi.spyOn(btn, 'focus')
      pressTab(container)
      expect(spy).not.toHaveBeenCalled()
    })

    it('should not throw when ref is null', () => {
      const ref = { current: null }

      expect(() => {
        renderHook(() => useFocusTrap(ref, true))
      }).not.toThrow()
    })
  })

  describe('autoFocusFirst', () => {
    it('should focus the first focusable element when autoFocusFirst is true', () => {
      const btn1 = createButton('First')
      const btn2 = createButton('Second')
      const container = createContainer(btn1, btn2)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, true, { autoFocusFirst: true }))

      expect(document.activeElement).toBe(btn1)
    })

    it('should not auto-focus when autoFocusFirst is false', () => {
      const btn = createButton('First')
      const container = createContainer(btn)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, true, { autoFocusFirst: false }))

      expect(document.activeElement).not.toBe(btn)
    })

    it('should not auto-focus by default', () => {
      const btn = createButton('First')
      const container = createContainer(btn)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, true))

      expect(document.activeElement).not.toBe(btn)
    })
  })

  describe('Tab cycling', () => {
    it('should cycle focus from last to first element on Tab', () => {
      const btn1 = createButton('First')
      const btn2 = createButton('Last')
      const container = createContainer(btn1, btn2)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, true))

      btn2.focus()
      expect(document.activeElement).toBe(btn2)

      const event = pressTab(container)
      expect(event.defaultPrevented).toBe(true)
    })

    it('should cycle focus from first to last element on Shift+Tab', () => {
      const btn1 = createButton('First')
      const btn2 = createButton('Last')
      const container = createContainer(btn1, btn2)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, true))

      btn1.focus()
      expect(document.activeElement).toBe(btn1)

      const event = pressTab(container, true)
      expect(event.defaultPrevented).toBe(true)
    })

    it('should not prevent default when focus is in the middle', () => {
      const btn1 = createButton('First')
      const btn2 = createButton('Middle')
      const btn3 = createButton('Last')
      const container = createContainer(btn1, btn2, btn3)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, true))

      btn2.focus()
      const event = pressTab(container)
      expect(event.defaultPrevented).toBe(false)
    })

    it('should handle container with no focusable elements', () => {
      const div = document.createElement('div')
      div.textContent = 'No focusable'
      const container = createContainer(div)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, true))

      expect(() => pressTab(container)).not.toThrow()
    })

    it('should ignore non-Tab keys', () => {
      const btn = createButton('Only')
      const container = createContainer(btn)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, true))

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      })
      container.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
    })

    it('should work with mixed focusable elements', () => {
      const link = createLink('Link')
      const btn = createButton('Button')
      const container = createContainer(link, btn)
      const ref = { current: container }

      renderHook(() => useFocusTrap(ref, true))

      btn.focus()
      const event = pressTab(container)
      expect(event.defaultPrevented).toBe(true)
    })
  })

  describe('cleanup', () => {
    it('should remove event listener when deactivated', () => {
      const btn1 = createButton('First')
      const btn2 = createButton('Last')
      const container = createContainer(btn1, btn2)
      const ref = { current: container }

      const { rerender } = renderHook(
        ({ active }) => useFocusTrap(ref, active),
        { initialProps: { active: true } }
      )

      rerender({ active: false })

      btn2.focus()
      const event = pressTab(container)
      expect(event.defaultPrevented).toBe(false)
    })
  })
})
