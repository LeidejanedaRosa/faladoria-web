import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { StatusMessage } from '../StatusMessage'

describe('StatusMessage', () => {
  // A live region added to the page together with its text is often not announced.
  it('keeps its live region in the page, hidden, while there is nothing to say', () => {
    render(<StatusMessage message='' />)

    const region = screen.getByRole('status')
    expect(region).toBeEmptyDOMElement()
    expect(region).toHaveClass('sr-only')
  })

  it('shows the message in the same region once there is one', () => {
    const { rerender } = render(<StatusMessage message='' />)
    const region = screen.getByRole('status')

    rerender(<StatusMessage message='A conta de Bruno Lima foi criada.' />)

    expect(screen.getByRole('status')).toBe(region)
    expect(region).toHaveTextContent('A conta de Bruno Lima foi criada.')
    expect(region).not.toHaveClass('sr-only')
  })

  it('can warn instead of confirming, with the same announcement', () => {
    render(
      <StatusMessage tone='warning' message='2 casos continuam com Ana.' />
    )

    const region = screen.getByRole('status')
    expect(region).toHaveTextContent('2 casos continuam com Ana.')
    expect(region).toHaveClass('bg-amber-50')
    expect(region).not.toHaveClass('bg-green-50')
  })
})
