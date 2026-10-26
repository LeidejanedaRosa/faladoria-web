import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TextField } from '../TextField'

describe('TextField', () => {
  it('ties the visible label to the input', () => {
    render(<TextField label='E-mail' />)

    expect(screen.getByLabelText('E-mail').tagName).toBe('INPUT')
  })

  it('reads the hint as part of the field description', () => {
    render(<TextField label='Nova senha' hint='De 8 a 128 caracteres.' />)

    expect(screen.getByLabelText('Nova senha')).toHaveAccessibleDescription(
      'De 8 a 128 caracteres.'
    )
  })

  it('marks the field invalid and reads hint and error together', () => {
    render(
      <TextField
        label='Nova senha'
        hint='De 8 a 128 caracteres.'
        error='A nova senha precisa ter pelo menos 8 caracteres.'
      />
    )

    const input = screen.getByLabelText('Nova senha')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription(
      'De 8 a 128 caracteres. A nova senha precisa ter pelo menos 8 caracteres.'
    )
  })

  it('is neither invalid nor described when there is no hint or error', () => {
    render(<TextField label='E-mail' />)

    const input = screen.getByLabelText('E-mail')
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(input).not.toHaveAttribute('aria-describedby')
  })

  it('keeps an id passed by the caller', () => {
    render(<TextField label='E-mail' id='login-email' />)

    expect(screen.getByLabelText('E-mail')).toHaveAttribute('id', 'login-email')
  })

  it('gives each field its own id, so two fields never share a label', () => {
    render(
      <>
        <TextField label='E-mail' />
        <TextField label='Senha' />
      </>
    )

    expect(screen.getByLabelText('E-mail').id).not.toBe(
      screen.getByLabelText('Senha').id
    )
  })
})
