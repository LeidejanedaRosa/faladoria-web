import { fakeUsersApi } from '@/test/fakeUsersApi'
import { LAVRAS_REMOVED, VARGINHA } from '@/test/fixtures/serviceAreas'
import { ANA, CARLA } from '@/test/fixtures/users'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { User } from '../../services/usersApi'
import { AccountDetailsForm } from '../AccountDetailsForm'

const LAVRAS = { ...LAVRAS_REMOVED, removedAt: null }
const ANA_IN_TWO: User = {
  ...ANA,
  assignedCities: [
    { city: 'Varginha', state: 'MG' },
    { city: 'Lavras', state: 'MG' },
  ],
}

type FakeOptions = Parameters<typeof fakeUsersApi>[1]

const renderForm = (
  user: User = ANA_IN_TWO,
  { isSelf = false, ...options }: FakeOptions & { isSelf?: boolean } = {}
) => {
  const api = fakeUsersApi(stubApi(), {
    users: [user, CARLA],
    servedAreas: [LAVRAS, VARGINHA],
    ...options,
  })
  const ui = (account: User) => (
    <MemoryRouter>
      <AccountDetailsForm user={account} isSelf={isSelf} />
    </MemoryRouter>
  )
  const { rerender } = render(ui(user), { wrapper: createQueryWrapper() })
  return { api, rerender: (account: User) => rerender(ui(account)) }
}

const nameField = () => screen.getByRole('textbox', { name: 'Nome' })
const save = () =>
  userEvent.click(screen.getByRole('button', { name: 'Salvar alterações' }))
const statuses = () =>
  screen.getAllByRole('status').map(region => region.textContent)

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('AccountDetailsForm', () => {
  it('starts from the account as it is', () => {
    renderForm()

    expect(nameField()).toHaveValue('Ana Souza')
    expect(screen.getByRole('radio', { name: /Assistente/ })).toBeChecked()
    expect(
      screen.getByRole('button', { name: 'Tirar Lavras/MG' })
    ).toBeInTheDocument()
  })

  it('saves only the new name and says so', async () => {
    const { api } = renderForm()

    await userEvent.clear(nameField())
    await userEvent.type(nameField(), 'Ana Lima')
    await save()

    await waitFor(() =>
      expect(statuses()).toContain('As alterações de Ana Lima foram salvas.')
    )
    expect(api.changes).toEqual([{ name: 'Ana Lima' }])
  })

  it('does not call the API when nothing changed', async () => {
    const { api } = renderForm()

    await save()

    expect(await screen.findByText('Nada foi alterado.')).toBeInTheDocument()
    expect(api.changes).toEqual([])
  })

  it('warns, before saving, which cities an account that becomes admin loses', async () => {
    const { api } = renderForm()

    await userEvent.click(screen.getByRole('radio', { name: /Administração/ }))

    expect(
      screen.getByText(
        'A administração vê todas as cidades. Ao salvar, Varginha/MG, Lavras/MG saem desta conta.'
      )
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()

    await save()
    await waitFor(() =>
      expect(api.changes).toEqual([{ role: 'admin', assignedCities: [] }])
    )
  })

  it('keeps at least one city for an assistant, without calling the API', async () => {
    const { api } = renderForm({
      ...ANA,
      assignedCities: [{ city: 'Varginha', state: 'MG' }],
    })

    await userEvent.click(
      screen.getByRole('button', { name: 'Tirar Varginha/MG' })
    )
    await save()

    expect(
      await screen.findByText(
        'Escolha pelo menos uma cidade: sem cidade, a pessoa não vê nenhuma reclamação.'
      )
    ).toBeInTheDocument()
    expect(api.changes).toEqual([])
  })

  it('says how many cases the change left out of the person’s reach', async () => {
    renderForm(ANA_IN_TWO, { complaintsOutOfReach: 2 })

    await userEvent.click(
      screen.getByRole('button', { name: 'Tirar Lavras/MG' })
    )
    await save()

    await waitFor(() =>
      expect(statuses()).toContain(
        '2 casos em andamento continuam com esta pessoa, mas o papel e as cidades de agora não permitem tratá-los. Eles precisam ser passados para outra pessoa.'
      )
    )
  })

  it('shows no warning when every case stays within reach', async () => {
    renderForm(ANA_IN_TWO, { complaintsOutOfReach: 0 })

    await userEvent.click(
      screen.getByRole('button', { name: 'Tirar Lavras/MG' })
    )
    await save()

    await waitFor(() =>
      expect(statuses()).toEqual([
        '',
        'As alterações de Ana Souza foram salvas.',
        '',
      ])
    )
  })

  it('puts a city the API no longer serves on the cities field, with its name', async () => {
    renderForm(ANA_IN_TWO, {
      failUpdateWith: {
        status: 400,
        code: 'ASSIGNED_CITY_NOT_SERVED',
        details: { cities: [{ city: 'Lavras', state: 'MG' }] },
      },
    })

    await userEvent.clear(nameField())
    await userEvent.type(nameField(), 'Ana Lima')
    await save()

    const search = screen.getByRole('combobox', {
      name: 'Buscar cidade atendida',
    })
    await waitFor(() => expect(search).toHaveFocus())
    expect(search).toHaveAccessibleDescription(
      'Estas cidades deixaram de ser atendidas: Lavras/MG. Tire da lista e tente de novo.'
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('explains a refusal of no field in the alert above the form', async () => {
    renderForm(ANA_IN_TWO, {
      failUpdateWith: { status: 409, code: 'NO_ACTIVE_ADMIN_LEFT' },
    })

    await userEvent.click(screen.getByRole('radio', { name: /Gestão/ }))
    await save()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'o painel ficaria sem administração ativa'
    )
  })

  it('does not offer a change of one’s own role, and says why', () => {
    renderForm(CARLA, { isSelf: true })

    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
    expect(screen.getByText('Administração')).toBeInTheDocument()
    expect(
      screen.getByText('Você não pode trocar o próprio papel.')
    ).toBeInTheDocument()
  })

  describe('when the list refreshes while the page is open', () => {
    const renamedElsewhere = { ...ANA_IN_TWO, name: 'Ana Lima' }

    it('takes the fresher account while nothing was typed', async () => {
      const { rerender } = renderForm()

      rerender(renamedElsewhere)

      await waitFor(() => expect(nameField()).toHaveValue('Ana Lima'))
    })

    // Lost update: compared with the fresher copy, the old name in the form would look like a
    // change, and saving the role would undo the rename another admin just made.
    it('sends only what this person changed, not the old value of another field', async () => {
      const { api, rerender } = renderForm()
      await userEvent.click(screen.getByRole('radio', { name: /Gestão/ }))

      rerender(renamedElsewhere)
      await save()

      await waitFor(() => expect(api.changes).toEqual([{ role: 'manager' }]))
    })
  })
})
