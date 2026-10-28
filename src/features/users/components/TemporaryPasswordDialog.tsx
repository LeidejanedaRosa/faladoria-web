import {
  type RefObject,
  type SyntheticEvent,
  useId,
  useRef,
  useState,
} from 'react'

import { Button, WarningIcon } from '@shared/components/ui'
import { useModalDialog } from '@shared/hooks/useModalDialog'

import { USERS_CONTENT } from '../data/usersContent'

const { password: content } = USERS_CONTENT

interface TemporaryPasswordDialogProps {
  /** `null` while there is no password to show. */
  account: { name: string; temporaryPassword: string } | null
  onDone: () => void
  returnFocusRef?: RefObject<HTMLElement | null>
}

/**
 * The temporary password, shown once. Escape and clicks outside do not close it: losing it by
 * accident would mean generating another. Only "Já anotei a senha" does.
 */
export const TemporaryPasswordDialog = ({
  account,
  onDone,
  returnFocusRef,
}: TemporaryPasswordDialogProps) => {
  const titleId = useId()
  const copyRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useModalDialog(account !== null, copyRef, returnFocusRef)
  const [copyMessage, setCopyMessage] = useState('')

  const copy = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password)
      setCopyMessage(content.copied)
    } catch {
      setCopyMessage(content.copyFailed)
    }
  }

  const finish = () => {
    setCopyMessage('')
    onDone()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event: SyntheticEvent) => event.preventDefault()}
      className='m-auto w-[calc(100%-2rem)] max-w-md rounded-xl bg-white p-0 shadow-xl backdrop:bg-slate-900/50'
    >
      {account && (
        <div className='flex flex-col gap-4 p-6'>
          <h2 id={titleId} className='text-xl font-bold text-slate-900'>
            {content.title}
          </h2>
          <p className='text-base text-slate-700'>
            {content.intro(account.name)}
          </p>
          <div className='flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between'>
            <p>
              <span className='sr-only'>{content.label}: </span>
              {/* Monospace and spaced out: a password read aloud or retyped by hand. */}
              <code className='font-mono text-xl font-semibold tracking-wider break-all text-slate-900'>
                {account.temporaryPassword}
              </code>
            </p>
            <Button
              ref={copyRef}
              variant='secondary'
              onClick={() => void copy(account.temporaryPassword)}
            >
              {content.copy}
            </Button>
          </div>
          <p role='status' className='min-h-6 text-sm text-slate-700'>
            {copyMessage}
          </p>
          <p className='flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900'>
            <WarningIcon className='mt-0.5 h-5 w-5 shrink-0' />
            {content.onlyNow}
          </p>
          <Button onClick={finish} className='sm:self-end'>
            {content.done}
          </Button>
        </div>
      )}
    </dialog>
  )
}
