import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { PasswordField } from '../PasswordField'

describe('PasswordField', () => {
  it('hides the password by default', () => {
    render(<PasswordField label='Senha' />)

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
  })

  it('shows and hides the password, saying the state through aria-pressed', async () => {
    render(<PasswordField label='Senha' />)
    const toggle = screen.getByRole('button', { name: 'Mostrar senha' })

    await userEvent.click(toggle)
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'text')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(toggle)
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('never submits the form from the toggle', () => {
    render(<PasswordField label='Senha' />)

    expect(
      screen.getByRole('button', { name: 'Mostrar senha' })
    ).toHaveAttribute('type', 'button')
  })
})
