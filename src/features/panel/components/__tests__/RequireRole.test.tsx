import { buildSessionUser } from '@/test/fixtures/session'

import type { UserRole } from '@features/auth/services/authApi'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { RequireRole } from '../RequireRole'

const renderAs = (role: UserRole) =>
  render(
    <MemoryRouter initialEntries={['/dashboard/cidades']}>
      <Routes>
        <Route
          path='/dashboard'
          element={<Outlet context={{ user: buildSessionUser({ role }) }} />}
        >
          <Route
            path='cidades'
            element={
              <RequireRole roles={['admin']}>
                <h1>Cidades atendidas</h1>
              </RequireRole>
            }
          />
        </Route>
      </Routes>
    </MemoryRouter>
  )

describe('RequireRole', () => {
  it('shows the page to the roles that may use it', () => {
    renderAs('admin')

    expect(
      screen.getByRole('heading', { level: 1, name: 'Cidades atendidas' })
    ).toBeInTheDocument()
  })

  it.each(['assistant', 'manager'] as const)(
    'tells %s the page is not for them, with a way back',
    role => {
      renderAs(role)

      expect(
        screen.getByRole('heading', { level: 1, name: 'Acesso restrito' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: 'Voltar ao início do painel' })
      ).toHaveAttribute('href', '/dashboard')
      expect(screen.queryByText('Cidades atendidas')).not.toBeInTheDocument()
    }
  )
})
