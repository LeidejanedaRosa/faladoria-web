import { MANAGER_COUNTS, TEAM_COUNTS } from '@/test/fixtures/complaintCounts'
import { ANA, BRUNO, buildUser, CARLA } from '@/test/fixtures/users'
import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper, createTestQueryClient } from '@/test/queryClient'

import { render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { PanelFolders } from '../PanelFolders'

const ACTIVE_MANAGER = buildUser({
  id: 'usr_luis',
  name: 'Luis Prado',
  role: 'manager',
})

/** Counts and accounts answered by path; `fail` answers 500 instead. */
const mockApi = ({ counts = TEAM_COUNTS as object, fail = false } = {}) =>
  stubApi().mockImplementation(async input => {
    if (fail) return apiErrorResponse(500)
    return new URL(String(input)).pathname === '/api/complaints/counts'
      ? jsonResponse(counts)
      : jsonResponse([ANA, CARLA, BRUNO, ACTIVE_MANAGER])
  })

const renderFolders = (
  path = '/dashboard',
  client = createTestQueryClient()
) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <PanelFolders />
    </MemoryRouter>,
    { wrapper: createQueryWrapper(client) }
  )
  return client
}

const openFolder = () =>
  within(folders())
    .getAllByRole('link')
    .filter(link => link.getAttribute('aria-current') === 'page')
    .map(link => link.querySelector('span:not([aria-hidden])')?.textContent)

const folders = () =>
  screen.getByRole('navigation', { name: 'Pastas do painel' })

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('PanelFolders', () => {
  it('leads to the three folders, each a page of its own', () => {
    mockApi()
    renderFolders()

    const links = within(folders()).getAllByRole('link')
    expect(links.map(link => link.getAttribute('href'))).toEqual([
      '/dashboard',
      '/dashboard/equipe',
      '/dashboard/gestores',
    ])
  })

  it('marks only the open folder as the current page', () => {
    mockApi()
    renderFolders('/dashboard/gestores')

    const current = within(folders())
      .getAllByRole('link')
      .filter(link => link.getAttribute('aria-current') === 'page')
    expect(current).toHaveLength(1)
    expect(current[0]).toHaveTextContent('Gestores')
  })

  it('counts what asks for action: open complaints and active accounts', async () => {
    mockApi()
    renderFolders()

    // Ana and Carla are active in the team; of the managers, Bruno has not signed in yet.
    expect(
      await screen.findByRole('link', { name: 'Reclamações 2 em aberto' })
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('link', { name: 'Equipe 2 contas ativas' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Gestores 1 gestores ativos' })
    ).toBeInTheDocument()
  })

  it('shows no number while the counts are on their way', () => {
    mockApi()
    renderFolders()

    expect(
      screen.getByRole('link', { name: 'Reclamações' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Equipe' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Gestores' })).toBeInTheDocument()
  })

  it('shows no number on any folder once both counts have failed', async () => {
    mockApi({ fail: true })
    const client = renderFolders()

    // The names alone are no proof the requests ended: they read the same while loading.
    await waitFor(() => {
      const queries = client.getQueryCache().getAll()
      expect(queries).toHaveLength(2)
      expect(queries.every(query => query.state.status === 'error')).toBe(true)
    })
    expect(
      screen.queryByText(/em aberto|ativas|ativos/)
    ).not.toBeInTheDocument()
  })

  it('shows no complaint number for counts without the open ones', async () => {
    mockApi({ counts: MANAGER_COUNTS })
    renderFolders()

    await screen.findByRole('link', { name: 'Equipe 2 contas ativas' })
    expect(
      screen.getByRole('link', { name: 'Reclamações' })
    ).toBeInTheDocument()
  })

  it('keeps Equipe open with one of its drawers over it', () => {
    mockApi()
    renderFolders('/dashboard/equipe/usr_ana')

    expect(openFolder()).toEqual(['Equipe'])
  })

  it('opens Reclamações only on the panel home, not on every page under it', () => {
    mockApi()
    renderFolders('/dashboard/gestores/nova')

    expect(openFolder()).toEqual(['Gestores'])
  })
})
