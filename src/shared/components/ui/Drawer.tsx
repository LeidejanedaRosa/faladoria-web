import {
  type ReactNode,
  type SyntheticEvent,
  useId,
  useLayoutEffect,
  useRef,
} from 'react'

import { CloseIcon } from './icons'

interface DrawerProps {
  title: ReactNode
  /** Below the title, still in the fixed header: who or what the drawer is about. */
  description?: ReactNode
  closeLabel: string
  onClose: () => void
  children: ReactNode
}

/**
 * A side panel over the page, open while it is mounted: the route that renders it decides. A
 * native modal <dialog>, so the browser keeps focus inside and makes the page behind inert.
 * Escape and the × close it; a click outside does not, since a form inside would lose its edits.
 */
export const Drawer = ({
  title,
  description,
  closeLabel,
  onClose,
  children,
}: DrawerProps) => {
  const titleId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  // A layout effect, so the dialog is open before the children's effects run: a form that
  // focuses its first field on mount finds it rendered, and takes the focus from the title.
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const opener = document.activeElement
    dialog.showModal()
    // The title, not the first control: the content is long, and is announced from its name.
    titleRef.current?.focus()
    return () => {
      dialog.close()
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [])

  const cancel = (event: SyntheticEvent) => {
    event.preventDefault()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={cancel}
      className='m-0 ml-auto h-dvh max-h-none w-full max-w-none bg-white p-0 shadow-2xl transition-transform duration-200 ease-out backdrop:bg-slate-900/40 motion-reduce:transition-none sm:max-w-lg starting:translate-x-full'
    >
      <div className='flex h-full flex-col'>
        <header className='flex items-start gap-3 border-b border-slate-200 px-4 py-4 sm:px-6'>
          <div className='flex min-w-0 flex-1 flex-col gap-1'>
            <h2
              ref={titleRef}
              id={titleId}
              tabIndex={-1}
              className='text-xl font-bold break-words text-slate-900 focus:outline-none'
            >
              {title}
            </h2>
            {description}
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label={closeLabel}
            className='-mt-1 -mr-2 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:h-10 lg:w-10'
          >
            <CloseIcon className='h-5 w-5' />
          </button>
        </header>
        <div className='flex-1 overflow-y-auto px-4 py-5 sm:px-6'>
          {children}
        </div>
      </div>
    </dialog>
  )
}
