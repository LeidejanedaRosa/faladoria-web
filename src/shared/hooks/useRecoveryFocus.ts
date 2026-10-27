import { useEffect, useRef, useState } from 'react'

type Refetch = () => Promise<{ isSuccess: boolean }>

/**
 * Runs a retry and keeps keyboard and screen-reader users where they were (WCAG 2.4.3, 4.1.3).
 *
 * - While the retry runs, `isRetrying` keeps the error block (and its focused button) mounted.
 *   Without it, TanStack Query puts a query that has no data back to `pending`, the skeleton
 *   replaces the button, and focus falls to <body>, even when the retry then fails.
 * - On success, focus moves to the content that replaced the error, but only to rescue a lost
 *   focus: if the person moved to another control while waiting, it stays there.
 */
export const useRecoveryFocus = <T extends HTMLElement>(refetch: Refetch) => {
  const targetRef = useRef<T>(null)
  const [isRetrying, setIsRetrying] = useState(false)
  // Refs, not state: they only carry facts from the retry to the effect below.
  const retryTriggerRef = useRef<Element | null>(null)
  const shouldRestoreFocusRef = useRef(false)

  // Runs after the render that ends the retry, when the content (the target) is mounted.
  useEffect(() => {
    if (isRetrying || !shouldRestoreFocusRef.current) return
    shouldRestoreFocusRef.current = false
    const active = document.activeElement
    const focusWasLost =
      active === null ||
      active === document.body ||
      active === retryTriggerRef.current
    retryTriggerRef.current = null
    if (focusWasLost) targetRef.current?.focus()
  }, [isRetrying])

  const retry = async () => {
    if (isRetrying) return
    retryTriggerRef.current = document.activeElement
    setIsRetrying(true)
    const { isSuccess } = await refetch()
    shouldRestoreFocusRef.current = isSuccess
    setIsRetrying(false)
  }

  return { targetRef, isRetrying, retry }
}
