import {
  type ReactNode,
  type RefObject,
  type SyntheticEvent,
  useId,
  useRef,
} from 'react'

import { useModalDialog } from '@shared/hooks/useModalDialog'

import { Button } from './Button'
import { FormAlert } from './FormAlert'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  confirmingLabel: string
  cancelLabel: string
  isConfirming: boolean
  error?: string
  onConfirm: () => void
  onCancel: () => void
  /**
   * Where focus goes on close. By default, back to what opened the dialog; pass another target
   * when the action makes that element disappear (a removed row).
   */
  returnFocusRef?: RefObject<HTMLElement | null>
}

/**
 * A modal confirmation for destructive actions, on the native <dialog>: showModal() traps focus
 * and makes the page behind inert. It closes on "Cancelar" and Escape only; a click outside
 * does not dismiss it halfway through a decision.
 */
export const ConfirmDialog = ({
  isOpen,
  title,
  children,
  confirmLabel,
  confirmingLabel,
  cancelLabel,
  isConfirming,
  error,
  onConfirm,
  onCancel,
  returnFocusRef,
}: ConfirmDialogProps) => {
  const titleId = useId()
  const bodyId = useId()
  // The safe choice starts focused: an Enter by reflex must not destroy anything.
  const cancelRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useModalDialog(isOpen, cancelRef, returnFocusRef)

  // Escape fires "cancel": the dialog stays under React's control instead of closing itself.
  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!isConfirming) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      onCancel={handleCancel}
      className='m-auto w-[calc(100%-2rem)] max-w-md rounded-xl bg-white p-0 shadow-xl backdrop:bg-slate-900/50'
    >
      <div className='flex flex-col gap-4 p-6'>
        <h2 id={titleId} className='text-xl font-bold text-slate-900'>
          {title}
        </h2>
        <div
          id={bodyId}
          className='flex flex-col gap-3 text-base text-slate-700'
        >
          {children}
        </div>
        <FormAlert message={error} />
        <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
          <Button ref={cancelRef} variant='secondary' onClick={handleCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant='danger'
            isLoading={isConfirming}
            loadingText={confirmingLabel}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
