import { useCallback, useEffect, useRef, useState } from 'react'

import { useFocusTrap } from '@hooks/useFocusTrap'

interface UseSidebarOptions {
  onOpenChange?: (isOpen: boolean) => void
}

export const useSidebar = ({ onOpenChange }: UseSidebarOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const isFirstRender = useRef(true)
  const onOpenChangeRef = useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  const open = useCallback(() => setIsOpen(true), [])

  const close = useCallback(() => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onOpenChangeRef.current?.(isOpen)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  useFocusTrap(sidebarRef, isOpen, { autoFocusFirst: true })

  return { isOpen, open, close, triggerRef, sidebarRef }
}
