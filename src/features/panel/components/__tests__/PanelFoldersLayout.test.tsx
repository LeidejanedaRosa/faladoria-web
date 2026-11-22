import { TEAM_COUNTS } from '@/test/fixtures/complaintCounts'
import { buildSessionUser } from '@/test/fixtures/session'
import { ANA, CARLA } from '@/test/fixtures/users'
import { jsonResponse, stubApi } from '@/test/mockFetch'
import { renderWithQueryClient } from '@/test/queryClient'

import { screen } from '@testing-library/react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { usePanelUser } from '../../hooks/usePanelUser'
import { PanelFoldersLayout } from '../PanelFoldersLayout'

const PageProbe = () => <h1>página de {usePanelUser().name}</h1>

const renderAs = (role: 'admin' | 'assistant' | 'manager') => {
  const fetchMock = stubApi().mockImplementation(async input =>
    new URL(String(input)).pathname === '/api/complaints/counts'
      ? jsonResponse(TEAM_COUNTS)
      : jsonResponse([ANA, CARLA])
  )
  const user = buildSessionUser({ role })
  renderWithQueryClient(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route element={<Outlet context={{ user }} />}>
          <Route element={<PanelFoldersLayout />}>
            <Route path='/dashboard' element={<PageProbe />} />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  )
  return fetchMock
}

const requestedPaths = (fetchMock: ReturnType<typeof stubApi>) =>
  fetchMock.mock.calls.map(([input]) => new URL(String(input)).pathname)

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('PanelFoldersLayout', () => {
  it('shows the admin the folders above the page', async () => {
    renderAs('admin')

    expect(
      screen.getByRole('navigation', { name: 'Pastas do painel' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'página de Ana Souza' })
    ).toBeInTheDocument()
    await screen.findByRole('link', { name: /contas ativas/ })
  })

  // The API answers 403 to anyone but the admin on /api/users: no folder, no request.
  it.each(['assistant', 'manager'] as const)(
    'shows the %s the page alone, without asking for the accounts',
    role => {
      const fetchMock = renderAs(role)

      expect(
        screen.getByRole('heading', { name: 'página de Ana Souza' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('navigation', { name: 'Pastas do painel' })
      ).not.toBeInTheDocument()
      expect(requestedPaths(fetchMock)).not.toContain('/api/users')
    }
  )
})
