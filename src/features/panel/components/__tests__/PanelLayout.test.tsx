import { buildSessionUser } from '@/test/fixtures/session'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { usePanelUser } from '../../hooks/usePanelUser'
import { PanelLayout } from '../PanelLayout'

vi.mock('@assets/logo_faladoria.svg', () => ({ default: '/logo.svg' }))

const PageProbe = () => <p>página de {usePanelUser().email}</p>

const renderLayout = (role: 'admin' | 'assistant' | 'manager' = 'assistant') =>
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route
          path='/dashboard'
          element={<PanelLayout user={buildSessionUser({ role })} />}
        >
          <Route index element={<PageProbe />} />
        </Route>
      </Routes>
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )

describe('PanelLayout', () => {
  it('hands the signed-in person to the page inside it', () => {
    renderLayout()

    expect(screen.getByText('página de ana@faladoria.org')).toBeInTheDocument()
  })

  it('shows who is signed in and in which role', () => {
    renderLayout('manager')

    const header = screen.getByRole('banner')
    expect(within(header).getByText('Ana Souza')).toBeInTheDocument()
    expect(within(header).getByText('Gestão de saúde')).toBeInTheDocument()
  })

  it('offers a skip link to the main content', () => {
    renderLayout()

    expect(
      screen.getByRole('link', { name: 'Pular para o conteúdo principal' })
    ).toHaveAttribute('href', '#main-content')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })

  it('marks the current page in the navigation for screen readers', () => {
    renderLayout()

    const [desktopNav] = screen.getAllByRole('navigation', {
      name: 'Navegação do painel',
    })
    expect(
      within(desktopNav).getByRole('link', { name: 'Início' })
    ).toHaveAttribute('aria-current', 'page')
  })

  describe('mobile menu', () => {
    it('opens as a modal dialog, saying so on the ☰ button', async () => {
      renderLayout()
      const trigger = screen.getByRole('button', { name: 'Abrir menu' })

      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await userEvent.click(trigger)

      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      const dialog = screen.getByRole('dialog', { name: 'Menu do painel' })
      expect(dialog).toHaveAttribute('aria-modal', 'true')
      expect(trigger).toHaveAttribute('aria-controls', dialog.id)
    })

    it('moves focus inside when it opens, and back to ☰ when Escape closes it', async () => {
      renderLayout()
      const trigger = screen.getByRole('button', { name: 'Abrir menu' })

      await userEvent.click(trigger)
      expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveFocus()

      await userEvent.keyboard('{Escape}')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(trigger).toHaveFocus()
    })

    it('closes itself when a page is chosen', async () => {
      renderLayout()
      await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }))

      const dialog = screen.getByRole('dialog', { name: 'Menu do painel' })
      await userEvent.click(
        within(dialog).getByRole('link', { name: 'Início' })
      )

      expect(
        screen.getByRole('button', { name: 'Abrir menu' })
      ).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
