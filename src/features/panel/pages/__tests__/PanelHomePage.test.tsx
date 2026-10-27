import { TEAM_COUNTS } from '@/test/fixtures/complaintCounts'
import { buildSessionUser } from '@/test/fixtures/session'
import { jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import type { SessionUser } from '@features/auth/services/authApi'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { PanelHomePage } from '../PanelHomePage'

const renderHome = (user: SessionUser) =>
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path='/dashboard' element={<Outlet context={{ user }} />}>
          <Route index element={<PanelHomePage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('PanelHomePage', () => {
  it('greets by first name and states role and cities', () => {
    stubApi().mockResolvedValue(jsonResponse(TEAM_COUNTS))

    renderHome(
      buildSessionUser({
        role: 'manager',
        assignedCities: [
          { city: 'Varginha', state: 'MG' },
          { city: 'Alfenas', state: 'MG' },
        ],
      })
    )

    expect(
      screen.getByRole('heading', { level: 1, name: 'Olá, Ana' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Gestão de saúde · Varginha/MG, Alfenas/MG')
    ).toBeInTheDocument()
  })

  it('says the administration sees every city', () => {
    stubApi().mockResolvedValue(jsonResponse(TEAM_COUNTS))

    renderHome(buildSessionUser({ role: 'admin', assignedCities: [] }))

    expect(
      screen.getByText('Administração · todas as cidades')
    ).toBeInTheDocument()
  })

  it('explains why someone without a city sees nothing, and does not ask for zeros', () => {
    const fetchMock = stubApi()

    renderHome(buildSessionUser({ role: 'assistant', assignedCities: [] }))

    expect(
      screen.getByText(/Você ainda não tem cidade atribuída/)
    ).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('keeps the page out of search engines', () => {
    stubApi().mockResolvedValue(jsonResponse(TEAM_COUNTS))

    renderHome(buildSessionUser())

    expect(
      document.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content
    ).toBe('noindex, nofollow')
  })
})
