import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormAlert } from '../FormAlert'

describe('FormAlert', () => {
  it('renders nothing without a message', () => {
    const { container } = render(<FormAlert />)

    expect(container).toBeEmptyDOMElement()
  })

  it('announces the message as soon as it appears', () => {
    render(<FormAlert message='E-mail ou senha incorretos.' />)

    expect(screen.getByRole('alert')).toHaveTextContent(
      'E-mail ou senha incorretos.'
    )
  })
})
