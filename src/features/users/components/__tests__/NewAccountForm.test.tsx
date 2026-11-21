import { fakeUsersApi } from '@/test/fakeUsersApi'
import { LAVRAS_REMOVED, VARGINHA } from '@/test/fixtures/serviceAreas'
import { TEMPORARY_PASSWORD } from '@/test/fixtures/users'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { AccountGroup } from '../../data/accountGroups'
import { NewAccountForm } from '../NewAccountForm'

type FakeOptions = Parameters<typeof fakeUsersApi>[1]

const LAVRAS = { ...LAVRAS_REMOVED, removedAt: null }

const renderForm = (
  options: FakeOptions = {},
  group: AccountGroup = 'team'
) => {
  const api = fakeUsersApi(stubApi(), {
    servedAreas: [LAVRAS, VARGINHA],
    ...options,
  })
  const onCreated = vi.fn()
  const onCancel = vi.fn()
  render(
    <MemoryRouter>
      <NewAccountForm group={group} onCreated={onCreated} onCancel={onCancel} />
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )
  return { api, onCreated, onCancel }
}

const nameField = () => screen.getByRole('textbox', { name: 'Nome' })
const emailField = () => screen.getByRole('textbox', { name: /^E-mail/ })
const search = () =>
  screen.getByRole('combobox', { name: 'Buscar cidade atendida' })
const submit = () =>
  userEvent.click(screen.getByRole('button', { name: 'Criar conta' }))

// In the managers folder: the role comes with the folder, only the cities are chosen.
const fillManager = async () => {
  await userEvent.type(nameField(), ' Fernanda Alves ')
  await userEvent.type(emailField(), 'fernanda@saude.lavras.mg.gov.br')
  await waitFor(() => expect(search()).toBeEnabled())
  await userEvent.type(search(), 'lav')
  await userEvent.click(screen.getByRole('option', { name: 'Lavras/MG' }))
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('NewAccountForm', () => {
  it('starts with focus on the name', () => {
    renderForm()

    expect(nameField()).toHaveFocus()
  })

  it('explains that the e-mail is the login', () => {
    renderForm()

    expect(emailField()).toHaveAccessibleDescription(
      'É o login da pessoa e não pode ser trocado depois.'
    )
  })

  it('shows every missing field at once and sends nothing', async () => {
    const { api } = renderForm()

    await submit()

    expect(await screen.findByText('Escreva o nome.')).toBeInTheDocument()
    expect(screen.getByText('Escreva o e-mail.')).toBeInTheDocument()
    expect(screen.getByText('Escolha o papel.')).toBeInTheDocument()
    expect(nameField()).toHaveFocus()
    expect(api.sent).toEqual([])
  })

  it('offers the team only its own roles: assistant and administration', () => {
    renderForm()

    expect(screen.getAllByRole('radio')).toHaveLength(2)
    expect(
      screen.getByRole('radio', { name: /Assistente/ })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('radio', { name: /Administração/ })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('radio', { name: /Gestão de saúde/ })
    ).not.toBeInTheDocument()
  })

  it('creates managers in their folder without asking for the role', async () => {
    const { api } = renderForm({}, 'managers')

    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
    expect(screen.getByText('Gestão de saúde')).toBeInTheDocument()
    await submit()

    expect(await screen.findByText('Escreva o nome.')).toBeInTheDocument()
    expect(screen.queryByText('Escolha o papel.')).not.toBeInTheDocument()
    expect(api.sent).toEqual([])
  })

  it('asks for a city before sending a manager account', async () => {
    const { api } = renderForm({}, 'managers')
    await userEvent.type(nameField(), 'Fernanda Alves')
    await userEvent.type(emailField(), 'fernanda@saude.lavras.mg.gov.br')

    await submit()

    expect(
      await screen.findByText(/Escolha pelo menos uma cidade/)
    ).toBeInTheDocument()
    expect(api.sent).toEqual([])
  })

  it('creates the account and hands over the trimmed name and the password', async () => {
    const { api, onCreated } = renderForm({}, 'managers')
    await fillManager()

    await submit()

    await waitFor(() =>
      expect(onCreated).toHaveBeenCalledWith({
        userId: 'usr_new',
        email: 'fernanda@saude.lavras.mg.gov.br',
        temporaryPassword: TEMPORARY_PASSWORD,
        name: 'Fernanda Alves',
      })
    )
    expect(api.sent).toEqual([
      {
        name: 'Fernanda Alves',
        email: 'fernanda@saude.lavras.mg.gov.br',
        role: 'manager',
        assignedCities: [{ city: 'Lavras', state: 'MG' }],
      },
    ])
  })

  it('hides the cities for the administration and sends none, even if some were chosen', async () => {
    const { api, onCreated } = renderForm()
    await userEvent.type(nameField(), 'Fernanda Alves')
    await userEvent.type(emailField(), 'fernanda@faladoria.org')
    await userEvent.click(screen.getByRole('radio', { name: /Assistente/ }))
    await waitFor(() => expect(search()).toBeEnabled())
    await userEvent.type(search(), 'lav')
    await userEvent.click(screen.getByRole('option', { name: 'Lavras/MG' }))

    await userEvent.click(screen.getByRole('radio', { name: /Administração/ }))

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    expect(
      screen.getByText(
        'A administração vê todas as cidades: não é preciso escolher.'
      )
    ).toBeInTheDocument()
    await submit()
    await waitFor(() => expect(onCreated).toHaveBeenCalled())
    expect(api.sent[0]).toMatchObject({ role: 'admin', assignedCities: [] })
  })

  it('puts a repeated e-mail on the e-mail field and focuses it', async () => {
    const { onCreated } = renderForm(
      {
        failCreateWith: { status: 409, code: 'USER_EMAIL_ALREADY_EXISTS' },
      },
      'managers'
    )
    await fillManager()

    await submit()

    expect(
      await screen.findByText('Já existe uma conta com este e-mail.')
    ).toBeInTheDocument()
    expect(emailField()).toHaveFocus()
    expect(emailField()).toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(onCreated).not.toHaveBeenCalled()
  })

  it('puts a city that stopped being served on the cities field', async () => {
    renderForm(
      {
        failCreateWith: {
          status: 400,
          code: 'ASSIGNED_CITY_NOT_SERVED',
          details: { cities: [{ city: 'Lavras', state: 'MG' }] },
        },
      },
      'managers'
    )
    await fillManager()

    await submit()

    expect(
      await screen.findByText(/deixaram de ser atendidas: Lavras\/MG/)
    ).toBeInTheDocument()
    expect(search()).toHaveFocus()
  })

  it('shows any other failure above the form, keeping what was typed', async () => {
    renderForm(
      { failCreateWith: { status: 500, code: 'INTERNAL_ERROR' } },
      'managers'
    )
    await fillManager()

    await submit()

    expect(await screen.findByRole('alert')).toHaveTextContent('Erro.')
    expect(nameField()).toHaveValue(' Fernanda Alves ')
  })

  it('cancels without sending', async () => {
    const { api, onCancel } = renderForm()

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onCancel).toHaveBeenCalledOnce()
    expect(api.sent).toEqual([])
  })
})
