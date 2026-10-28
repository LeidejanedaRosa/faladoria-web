import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SelectField } from '../SelectField'

describe('SelectField', () => {
  it('is a native select named by its label, with hint and error linked', () => {
    render(
      <SelectField
        label='Estado'
        hint='Onde fica a cidade'
        error='Escolha o estado.'
      >
        <option value=''>Escolha</option>
      </SelectField>
    )

    const select = screen.getByRole('combobox', { name: 'Estado' })
    expect(select.tagName).toBe('SELECT')
    expect(select).toHaveAccessibleDescription(
      'Onde fica a cidade Escolha o estado.'
    )
    expect(select).toHaveAttribute('aria-invalid', 'true')
  })

  it('is not marked invalid without an error', () => {
    render(
      <SelectField label='Estado'>
        <option value=''>Escolha</option>
      </SelectField>
    )

    expect(
      screen.getByRole('combobox', { name: 'Estado' })
    ).not.toHaveAttribute('aria-invalid')
  })
})
