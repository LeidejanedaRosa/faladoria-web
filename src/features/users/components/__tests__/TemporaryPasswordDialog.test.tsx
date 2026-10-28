import { TEMPORARY_PASSWORD } from '@/test/fixtures/users'

import { useRef, useState } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { TemporaryPasswordDialog } from '../TemporaryPasswordDialog'

const ACCOUNT = {
  name: 'Fernanda Alves',
  temporaryPassword: TEMPORARY_PASSWORD,
}

// The page's part: holds the account, drops it on "done", and names where focus goes back to.
const Harness = ({ onDone = () => {} }: { onDone?: () => void }) => {
  const [account, setAccount] = useState<typeof ACCOUNT | null>(ACCOUNT)
  const returnRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <button ref={returnRef} type='button'>
        Nova conta
      </button>
      <TemporaryPasswordDialog
        account={account}
        returnFocusRef={returnRef}
        onDone={() => {
          onDone()
          setAccount(null)
        }}
      />
    </>
  )
}

const dialog = () => screen.getByRole('dialog', { name: 'Conta criada' })

afterEach(() => {
  vi.restoreAllMocks()
})

describe('TemporaryPasswordDialog', () => {
  it('stays closed while there is no password to show', () => {
    render(<TemporaryPasswordDialog account={null} onDone={() => {}} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText(/senha/i)).not.toBeInTheDocument()
  })

  it('shows the password for the person named, with focus on "Copiar senha"', () => {
    render(<Harness />)

    expect(dialog()).toHaveAttribute('open')
    expect(
      screen.getByText('Passe esta senha temporária para Fernanda Alves:')
    ).toBeInTheDocument()
    expect(screen.getByText(TEMPORARY_PASSWORD)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copiar senha' })).toHaveFocus()
    expect(screen.getByText(/Ela só aparece agora/)).toBeInTheDocument()
  })

  it('copies the password and says so', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole('button', { name: 'Copiar senha' }))

    await expect(navigator.clipboard.readText()).resolves.toBe(
      TEMPORARY_PASSWORD
    )
    expect(screen.getByRole('status')).toHaveTextContent('Senha copiada.')
  })

  it('tells how to copy by hand when the browser refuses', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
      new DOMException('denied', 'NotAllowedError')
    )
    render(<Harness />)

    await user.click(screen.getByRole('button', { name: 'Copiar senha' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Não foi possível copiar. Selecione a senha e copie.'
    )
  })

  it('does not close on Escape: losing the password would mean making another', () => {
    const onDone = vi.fn()
    render(<Harness onDone={onDone} />)
    const escape = new Event('cancel', { cancelable: true })

    fireEvent(dialog(), escape)

    expect(escape.defaultPrevented).toBe(true)
    expect(onDone).not.toHaveBeenCalled()
    expect(dialog()).toHaveAttribute('open')
  })

  it('closes on "Já anotei a senha", forgets the password and gives focus back', async () => {
    const user = userEvent.setup()
    const onDone = vi.fn()
    render(<Harness onDone={onDone} />)

    await user.click(screen.getByRole('button', { name: 'Já anotei a senha' }))

    expect(onDone).toHaveBeenCalledOnce()
    expect(screen.queryByText(TEMPORARY_PASSWORD)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Nova conta' })).toHaveFocus()
  })
})
