import { useEffect, useRef } from 'react'

interface QueryState {
  isSuccess: boolean
  isFetching: boolean
}

/**
 * After a retry that succeeds, moves focus to the content that replaced the error. The retry
 * button leaves the DOM with the error block, which would otherwise drop focus on <body> and
 * send keyboard and screen-reader users back to the top of the page (WCAG 2.4.3, 4.1.3).
 * It only rescues a lost focus: if the person moved on while the retry was pending, it stays.
 */
export const useRecoveryFocus = <T extends HTMLElement>({
  isSuccess,
  isFetching,
}: QueryState) => {
  const targetRef = useRef<T>(null)
  // Refs, not state: marking the retry changes nothing on screen.
  const isRecoveringRef = useRef(false)
  const retryTriggerRef = useRef<Element | null>(null)

  useEffect(() => {
    if (!isRecoveringRef.current || isFetching) return
    isRecoveringRef.current = false
    const active = document.activeElement
    const focusWasLost =
      active === null ||
      active === document.body ||
      active === retryTriggerRef.current
    retryTriggerRef.current = null
    // A failed retry keeps the error block, and the button keeps its focus.
    if (isSuccess && focusWasLost) targetRef.current?.focus()
  }, [isSuccess, isFetching])

  const markRecovering = () => {
    isRecoveringRef.current = true
    retryTriggerRef.current = document.activeElement
  }

  return { targetRef, markRecovering }
}
