import { fakeUsersApi } from '@/test/fakeUsersApi'
import { ALFENAS, LAVRAS_REMOVED, VARGINHA } from '@/test/fixtures/serviceAreas'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { useState } from 'react'

import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { AssignedCity } from '../../services/usersApi'
import { CityTagsField } from '../CityTagsField'

const LAVRAS = { ...LAVRAS_REMOVED, removedAt: null }

// Controlled like the form field: the cities the parent holds are what the tags show.
const Harness = ({ initial = [] }: { initial?: AssignedCity[] }) => {
  const [cities, setCities] = useState(initial)
  return (
    <>
      <CityTagsField value={cities} onChange={setCities} />
      <output aria-label='cidades escolhidas'>
        {cities.map(({ city, state }) => `${city}/${state}`).join(';')}
      </output>
    </>
  )
}

const renderField = (
  servedAreas = [ALFENAS, LAVRAS, VARGINHA],
  initial?: AssignedCity[]
) => {
  fakeUsersApi(stubApi(), { servedAreas })
  render(
    <MemoryRouter>
      <Harness initial={initial} />
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )
}

const search = () =>
  screen.getByRole('combobox', { name: 'Buscar cidade atendida' })
const chosen = () =>
  screen.getByRole('status', { name: 'cidades escolhidas' }).textContent

const pick = async (text: string, option: string) => {
  await waitFor(() => expect(search()).toBeEnabled())
  await userEvent.type(search(), text)
  await userEvent.click(screen.getByRole('option', { name: option }))
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('CityTagsField', () => {
  it('offers only the served cities', async () => {
    renderField()
    await waitFor(() => expect(search()).toBeEnabled())

    await userEvent.type(search(), 'a')

    expect(
      screen.getAllByRole('option').map(option => option.textContent)
    ).toEqual(['Alfenas/MG', 'Lavras/MG', 'Varginha/MG'])
  })

  it('adds each choice as a tag and empties the search for the next one', async () => {
    renderField()

    await pick('lav', 'Lavras/MG')
    await pick('varg', 'Varginha/MG')

    expect(chosen()).toBe('Lavras/MG;Varginha/MG')
    expect(search()).toHaveValue('')
    expect(search()).toHaveFocus()
    expect(
      screen.getByRole('button', { name: 'Tirar Lavras/MG' })
    ).toBeVisible()
  })

  it('keeps a city already chosen in the list, but not choosable', async () => {
    renderField(undefined, [{ city: 'Varginha', state: 'MG' }])
    await waitFor(() => expect(search()).toBeEnabled())

    await userEvent.type(search(), 'varg')
    const option = screen.getByRole('option', {
      name: 'Varginha/MG já escolhida',
    })
    await userEvent.click(option)

    expect(option).toHaveAttribute('aria-disabled', 'true')
    expect(chosen()).toBe('Varginha/MG')
  })

  it('removes a tag with its × and puts focus back in the search', async () => {
    renderField(undefined, [
      { city: 'Lavras', state: 'MG' },
      { city: 'Varginha', state: 'MG' },
    ])
    await waitFor(() => expect(search()).toBeEnabled())

    await userEvent.click(
      screen.getByRole('button', { name: 'Tirar Lavras/MG' })
    )

    expect(chosen()).toBe('Varginha/MG')
    expect(search()).toHaveFocus()
  })

  it('says when no city is chosen yet', async () => {
    renderField()

    expect(screen.getByText('Nenhuma cidade escolhida.')).toBeInTheDocument()
    await waitFor(() => expect(search()).toBeEnabled())
  })

  it('sends the person to the served cities page when there is none', async () => {
    renderField([])

    const link = await screen.findByRole('link', {
      name: 'Cadastrar cidades atendidas',
    })
    expect(link).toHaveAttribute('href', '/dashboard/cidades')
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  it('groups the tags and the search under the field name', async () => {
    renderField()

    const group = screen.getByRole('group', { name: 'Cidades que atende' })
    expect(within(group).getByRole('combobox')).toBe(search())
    await waitFor(() => expect(search()).toBeEnabled())
  })

  // Kept removable: the API refuses to save an account with a city no longer served.
  it('marks a city of the account that is no longer served, and lets it go', async () => {
    renderField(
      [VARGINHA],
      [
        { city: 'Varginha', state: 'MG' },
        { city: 'Lavras', state: 'MG' },
      ]
    )

    const lavras = (await screen.findByText(/deixou de ser atendida/)).closest(
      'li'
    )!
    expect(lavras).toHaveTextContent('Lavras/MG')
    expect(
      screen.getByRole('button', { name: 'Tirar Varginha/MG' }).closest('li')
    ).not.toHaveTextContent('deixou de ser atendida')

    await userEvent.click(
      within(lavras).getByRole('button', { name: 'Tirar Lavras/MG' })
    )
    expect(chosen()).toBe('Varginha/MG')
  })

  it('still shows the cities of an account when no city is served anymore', async () => {
    renderField([], [{ city: 'Lavras', state: 'MG' }])

    expect(
      await screen.findByText(/deixou de ser atendida/)
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Cadastrar cidades atendidas' })
    ).not.toBeInTheDocument()
  })
})
