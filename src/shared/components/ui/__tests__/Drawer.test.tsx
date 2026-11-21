import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from '../Drawer'

const renderDrawer = (onClose = vi.fn()) => {
  const result = render(
    <Drawer
      title='Ana Souza'
      description={<p>ana@faladoria.org</p>}
      closeLabel='Fechar'
      onClose={onClose}
    >
      <button type='button'>Salvar</button>
    </Drawer>
  )
  return { ...result, onClose }
}

describe('Drawer', () => {
  it('opens as a dialog named by its title, with the description and the content', () => {
    renderDrawer()

    const drawer = screen.getByRole('dialog', { name: 'Ana Souza' })
    expect(drawer).toHaveAttribute('open')
    expect(within(drawer).getByText('ana@faladoria.org')).toBeInTheDocument()
    expect(
      within(drawer).getByRole('button', { name: 'Salvar' })
    ).toBeInTheDocument()
  })

  it('starts the focus on the title, not on the first control', () => {
    renderDrawer()

    expect(screen.getByRole('heading', { name: 'Ana Souza' })).toHaveFocus()
  })

  it('asks to close on the ×', async () => {
    const { onClose } = renderDrawer()

    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('asks to close on Escape, without closing by itself: the route decides', () => {
    const { onClose } = renderDrawer()
    const drawer = screen.getByRole('dialog', { name: 'Ana Souza' })

    // jsdom has no real modal: Escape reaches a dialog as its `cancel` event.
    const escape = new Event('cancel', { cancelable: true })
    fireEvent(drawer, escape)

    expect(escape.defaultPrevented).toBe(true)
    expect(onClose).toHaveBeenCalledOnce()
    expect(drawer).toHaveAttribute('open')
  })

  it('gives the focus back to what opened it when it goes away', () => {
    const opener = document.createElement('button')
    document.body.append(opener)
    opener.focus()
    const { unmount } = renderDrawer()

    unmount()

    expect(opener).toHaveFocus()
    opener.remove()
  })
})
