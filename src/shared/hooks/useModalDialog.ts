import { type RefObject, useEffect, useRef } from 'react'

/**
 * Opens and closes a native <dialog> as a modal from React state. On open, focus goes to
 * `initialFocusRef`; on close, to `returnFocusRef` or else back to what opened it.
 */
export const useModalDialog = (
  isOpen: boolean,
  initialFocusRef: RefObject<HTMLElement | null>,
  returnFocusRef?: RefObject<HTMLElement | null>
) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || isOpen === dialog.open) return
    if (isOpen) {
      openerRef.current = document.activeElement as HTMLElement | null
      dialog.showModal()
      initialFocusRef.current?.focus()
      return
    }
    dialog.close()
    const target = returnFocusRef?.current ?? openerRef.current
    if (target?.isConnected) target.focus()
  }, [isOpen, initialFocusRef, returnFocusRef])

  return dialogRef
}
