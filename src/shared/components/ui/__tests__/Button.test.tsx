import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../Button'

describe('Button', () => {
  it('is a plain button by default, so it never submits a form by accident', () => {
    render(<Button>Salvar</Button>)

    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveAttribute(
      'type',
      'button'
    )
  })

  it('runs the click handler when not loading', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Salvar</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('shows the loading text and marks itself busy while loading', () => {
    render(
      <Button isLoading loadingText='Salvando…'>
        Salvar
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Salvando…' })
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('ignores clicks while loading, including a form submit', async () => {
    const onClick = vi.fn()
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button type='submit' isLoading onClick={onClick}>
          Salvar
        </Button>
      </form>
    )

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('keeps focus while loading, unlike a disabled button', async () => {
    const { rerender } = render(<Button>Salvar</Button>)
    await userEvent.tab()

    rerender(
      <Button isLoading loadingText='Salvando…'>
        Salvar
      </Button>
    )

    expect(screen.getByRole('button')).toHaveFocus()
    expect(screen.getByRole('button')).not.toBeDisabled()
  })
})
