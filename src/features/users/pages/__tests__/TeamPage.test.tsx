import { fakeUsersApi } from '@/test/fakeUsersApi'
import { VARGINHA } from '@/test/fixtures/serviceAreas'
import { buildSessionUser } from '@/test/fixtures/session'
import { ANA, CARLA, TEMPORARY_PASSWORD } from '@/test/fixtures/users'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { TeamPage } from '../TeamPage'

const SELF = buildSessionUser({
  id: CARLA.id,
  name: CARLA.name,
  email: CARLA.email,
  role: 'admin',
  assignedCities: [],
})

// The panel layout's part: the signed-in person reaches the page through the outlet context.
const renderPage = () => {
  const api = fakeUsersApi(stubApi(), {
    users: [ANA, CARLA],
    servedAreas: [VARGINHA],
  })
  render(
    <MemoryRouter initialEntries={['/dashboard/equipe']}>
      <Routes>
        <Route element={<Outlet context={{ user: SELF }} />}>
          <Route path='/dashboard/equipe' element={<TeamPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )
  return api
}

const openButton = () => screen.getByRole('button', { name: 'Nova conta' })
const announcement = () =>
  screen
    .getAllByRole('status')
    .find(element => element.tagName === 'P' && !element.closest('dialog'))!

const createBruno = async () => {
  await userEvent.click(openButton())
  await userEvent.type(
    screen.getByRole('textbox', { name: 'Nome' }),
    'Bruno Lima'
  )
  await userEvent.type(
    screen.getByRole('textbox', { name: /^E-mail/ }),
    'bruno@saude.varginha.mg.gov.br'
  )
  await userEvent.click(screen.getByRole('radio', { name: /Gestão de saúde/ }))
  const search = screen.getByRole('combobox', {
    name: 'Buscar cidade atendida',
  })
  await waitFor(() => expect(search).toBeEnabled())
  await userEvent.type(search, 'varg')
  await userEvent.click(screen.getByRole('option', { name: 'Varginha/MG' }))
  await userEvent.click(screen.getByRole('button', { name: 'Criar conta' }))
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('TeamPage', () => {
  it('lists the accounts under a single h1, with the form closed', async () => {
    renderPage()

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Equipe'
    )
    expect(await screen.findByText('Ana Souza')).toBeInTheDocument()
    expect(openButton()).toHaveAttribute('aria-expanded', 'false')
    expect(
      screen.queryByRole('textbox', { name: 'Nome' })
    ).not.toBeInTheDocument()
  })

  it('opens the form from the button, which then says it is open', async () => {
    renderPage()

    await userEvent.click(openButton())

    expect(openButton()).toHaveAttribute('aria-expanded', 'true')
    expect(
      document.getElementById(openButton().getAttribute('aria-controls')!)
    ).toBe(screen.getByRole('region', { name: 'Nova conta' }))
    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveFocus()
  })

  it('closes the form on "Cancelar" and gives focus back to the button', async () => {
    renderPage()
    await userEvent.click(openButton())

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(
      screen.queryByRole('region', { name: 'Nova conta' })
    ).not.toBeInTheDocument()
    expect(openButton()).toHaveFocus()
  })

  it('creates an account, shows the password once, then lists the account', async () => {
    renderPage()
    await screen.findByText('Ana Souza')

    await createBruno()

    const dialog = await screen.findByRole('dialog', { name: 'Conta criada' })
    expect(within(dialog).getByText(TEMPORARY_PASSWORD)).toBeInTheDocument()
    expect(
      screen.queryByRole('region', { name: 'Nova conta' })
    ).not.toBeInTheDocument()

    await userEvent.click(
      within(dialog).getByRole('button', { name: 'Já anotei a senha' })
    )

    expect(announcement()).toHaveTextContent(
      'A conta de Bruno Lima foi criada.'
    )
    expect(screen.queryByText(TEMPORARY_PASSWORD)).not.toBeInTheDocument()
    expect(openButton()).toHaveFocus()
    const bruno = (await screen.findByText('Bruno Lima')).closest('li')!
    expect(
      within(bruno).getByText('Aguardando primeiro acesso')
    ).toBeInTheDocument()
  })
})
