import { useRef, useState } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ConfirmDialog } from '../ConfirmDialog'

interface HarnessProps {
  onConfirm?: () => void
  isConfirming?: boolean
  error?: string
  useReturnTarget?: boolean
}

const Harness = ({
  onConfirm = vi.fn(),
  isConfirming = false,
  error,
  useReturnTarget = false,
}: HarnessProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  return (
    <>
      <h2 ref={headingRef} tabIndex={-1}>
        Lista
      </h2>
      <button type='button' onClick={() => setIsOpen(true)}>
        Remover
      </button>
      <ConfirmDialog
        isOpen={isOpen}
        title='Remover Varginha/MG?'
        confirmLabel='Remover cidade'
        confirmingLabel='Removendo…'
        cancelLabel='Cancelar'
        isConfirming={isConfirming}
        error={error}
        onConfirm={onConfirm}
        onCancel={() => setIsOpen(false)}
        returnFocusRef={useReturnTarget ? headingRef : undefined}
      >
        <p>O bot deixa de aceitar reclamações.</p>
      </ConfirmDialog>
    </>
  )
}

const open = () =>
  userEvent.click(screen.getByRole('button', { name: 'Remover' }))

describe('ConfirmDialog', () => {
  it('opens named by its title and described by its text', async () => {
    render(<Harness />)
    await open()

    const dialog = screen.getByRole('dialog', { name: 'Remover Varginha/MG?' })
    expect(dialog).toHaveAttribute('open')
    expect(dialog).toHaveAccessibleDescription(
      'O bot deixa de aceitar reclamações.'
    )
  })

  it('starts on "Cancelar", so an Enter by reflex destroys nothing', async () => {
    render(<Harness />)
    await open()

    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveFocus()
  })

  it('gives focus back to what opened it when cancelled', async () => {
    render(<Harness />)
    await open()

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute(
      'open'
    )
    expect(screen.getByRole('button', { name: 'Remover' })).toHaveFocus()
  })

  it('sends focus to another target when asked (the opener may be gone)', async () => {
    render(<Harness useReturnTarget />)
    await open()

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(screen.getByRole('heading', { name: 'Lista' })).toHaveFocus()
  })

  it('closes on Escape (the browser fires "cancel")', async () => {
    render(<Harness />)
    await open()

    fireEvent(
      screen.getByRole('dialog'),
      new Event('cancel', { cancelable: true })
    )

    expect(screen.getByRole('dialog', { hidden: true })).not.toHaveAttribute(
      'open'
    )
  })

  it('stays open on Escape while the action runs', async () => {
    render(<Harness isConfirming />)
    await open()

    fireEvent(
      screen.getByRole('dialog'),
      new Event('cancel', { cancelable: true })
    )
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(screen.getByRole('dialog')).toHaveAttribute('open')
  })

  it('confirms, and shows the failure inside the dialog', async () => {
    const onConfirm = vi.fn()
    render(
      <Harness
        onConfirm={onConfirm}
        error='Outra pessoa alterou esta cidade.'
      />
    )
    await open()

    await userEvent.click(
      screen.getByRole('button', { name: 'Remover cidade' })
    )

    expect(onConfirm).toHaveBeenCalledOnce()
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Outra pessoa alterou esta cidade.'
    )
  })
})
