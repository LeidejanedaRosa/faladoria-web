import { fakeServiceAreasApi } from '@/test/fakeServiceAreasApi'
import {
  ALFENAS,
  LAVRAS_REMOVED,
  MG_CITIES,
  VARGINHA,
} from '@/test/fixtures/serviceAreas'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ServiceAreasPage } from '../ServiceAreasPage'

type FakeOptions = Parameters<typeof fakeServiceAreasApi>[1]

const renderPage = (options: FakeOptions = {}, url = '/dashboard/cidades') => {
  const state = fakeServiceAreasApi(stubApi(), {
    active: [ALFENAS, VARGINHA],
    removed: [LAVRAS_REMOVED],
    cities: MG_CITIES,
    ...options,
  })
  render(
    <MemoryRouter initialEntries={[url]}>
      <ServiceAreasPage />
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )
  return state
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

const cityField = (index = 0) =>
  screen.getAllByRole('combobox', { name: 'Cidade' })[index]
const stateField = (index = 0) =>
  screen.getAllByRole('combobox', { name: 'Estado' })[index]
const announcement = () =>
  screen
    .getAllByRole('status')
    .find(element => element.tagName === 'P' && element.textContent)
const listHeading = () =>
  screen.getByRole('heading', { name: 'Lista de cidades' })

const chooseCity = async (text: string, option: string, index = 0) => {
  await waitFor(() => expect(cityField(index)).toBeEnabled())
  await userEvent.clear(cityField(index))
  await userEvent.type(cityField(index), text)
  await userEvent.click(screen.getByRole('option', { name: option }))
}

describe('ServiceAreasPage', () => {
  describe('the lists', () => {
    it('shows the served cities, each with the day it was added', async () => {
      renderPage()

      expect(await screen.findByText('Varginha/MG')).toBeInTheDocument()
      expect(screen.getByText('Atendida desde 01/10/2026')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Ativas (2)' })).toHaveAttribute(
        'aria-current',
        'true'
      )
      expect(
        await screen.findByRole('link', { name: 'Removidas (1)' })
      ).toHaveAttribute('href', '/dashboard/cidades?situacao=removidas')
    })

    it('shows the removed cities from their own address, with the way back', async () => {
      renderPage({}, '/dashboard/cidades?situacao=removidas')

      expect(await screen.findByText('Lavras/MG')).toBeInTheDocument()
      expect(screen.getByText('Removida em 12/10/2026')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Reativar Lavras/MG' })
      ).toBeInTheDocument()
      expect(screen.queryByText('Varginha/MG')).not.toBeInTheDocument()
    })

    it('says what to do when no city is served yet', async () => {
      renderPage({ active: [] })

      expect(
        await screen.findByText(
          'Nenhuma cidade atendida ainda. Adicione a primeira acima.'
        )
      ).toBeInTheDocument()
    })
  })

  describe('adding a city', () => {
    it('adds the city chosen from the IBGE list and gets ready for the next one', async () => {
      renderPage()
      await screen.findByText('Varginha/MG')

      await userEvent.selectOptions(stateField(), 'MG')
      await chooseCity('lav', 'Lavras')
      await userEvent.click(
        screen.getByRole('button', { name: 'Adicionar cidade' })
      )

      await waitFor(() =>
        expect(announcement()).toHaveTextContent(
          'Lavras/MG foi adicionada à lista.'
        )
      )
      expect(await screen.findByText('Lavras/MG')).toBeInTheDocument()
      // Same state kept; the city field is empty and focused for the next city.
      expect(stateField()).toHaveValue('MG')
      expect(cityField()).toHaveValue('')
      expect(cityField()).toHaveFocus()
    })

    it('asks for the state and the city before sending anything', async () => {
      const state = renderPage()
      await screen.findByText('Varginha/MG')

      await userEvent.click(
        screen.getByRole('button', { name: 'Adicionar cidade' })
      )

      expect(await screen.findByText('Escolha o estado.')).toBeInTheDocument()
      expect(screen.getByText('Escolha a cidade na lista.')).toBeInTheDocument()
      expect(state.active).toHaveLength(2)
    })

    it('marks the cities already served, so they cannot be added twice', async () => {
      renderPage()
      await screen.findByText('Varginha/MG')

      await userEvent.selectOptions(stateField(), 'MG')
      await waitFor(() => expect(cityField()).toBeEnabled())
      await userEvent.type(cityField(), 'varg')

      expect(
        screen.getByRole('option', { name: 'Varginha já atendida' })
      ).toHaveAttribute('aria-disabled', 'true')
      expect(
        screen.getByRole('option', { name: 'São José da Varginha' })
      ).not.toHaveAttribute('aria-disabled')
    })

    it('clears the city when another state is chosen', async () => {
      renderPage()
      await screen.findByText('Varginha/MG')
      await userEvent.selectOptions(stateField(), 'MG')
      await chooseCity('lav', 'Lavras')

      await userEvent.selectOptions(stateField(), 'SP')

      expect(cityField()).toHaveValue('')
    })

    it('shows on the city field when the API says it was added meanwhile', async () => {
      renderPage({
        failChangesWith: { status: 409, code: 'SERVICE_AREA_ALREADY_EXISTS' },
      })
      await screen.findByText('Varginha/MG')

      await userEvent.selectOptions(stateField(), 'MG')
      await chooseCity('lav', 'Lavras')
      await userEvent.click(
        screen.getByRole('button', { name: 'Adicionar cidade' })
      )

      expect(
        await screen.findByText('Esta cidade já está na lista.')
      ).toBeInTheDocument()
      expect(cityField()).toHaveAttribute('aria-invalid', 'true')
      expect(cityField()).toHaveFocus()
    })

    it('falls back to free text, with the spelling rule, when the IBGE is down', async () => {
      renderPage({ ibgeDown: true })
      await screen.findByText('Varginha/MG')

      await userEvent.selectOptions(stateField(), 'MG')

      const field = await screen.findByRole(
        'textbox',
        { name: 'Cidade' },
        { timeout: 3000 }
      )
      expect(field).toHaveAccessibleDescription(
        /Digite o nome como está no IBGE, com acentos/
      )
    })
  })

  describe('correcting a city', () => {
    it('corrects in the row itself and gives focus back to "Corrigir"', async () => {
      renderPage()
      await userEvent.click(
        await screen.findByRole('button', { name: 'Corrigir Varginha/MG' })
      )

      const form = screen.getByRole('form', { name: 'Corrigindo Varginha/MG' })
      expect(
        within(form).getByRole('combobox', { name: 'Estado' })
      ).toHaveValue('MG')
      await chooseCity('vargem', 'Vargem Alegre', 1)
      await userEvent.click(
        within(form).getByRole('button', { name: 'Salvar' })
      )

      await waitFor(() =>
        expect(announcement()).toHaveTextContent(
          'A cidade foi corrigida para Vargem Alegre/MG.'
        )
      )
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: 'Corrigir Vargem Alegre/MG' })
        ).toHaveFocus()
      )
    })

    it('does not count the city being corrected as a repeat of itself', async () => {
      renderPage()
      await userEvent.click(
        await screen.findByRole('button', { name: 'Corrigir Varginha/MG' })
      )

      await waitFor(() => expect(cityField(1)).toBeEnabled())
      await userEvent.clear(cityField(1))
      await userEvent.type(cityField(1), 'varg')

      expect(
        screen.getByRole('option', { name: 'Varginha' })
      ).not.toHaveAttribute('aria-disabled')
    })

    it('cancels without saving and gives focus back to "Corrigir"', async () => {
      const state = renderPage()
      await userEvent.click(
        await screen.findByRole('button', { name: 'Corrigir Varginha/MG' })
      )

      await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

      expect(
        screen.getByRole('button', { name: 'Corrigir Varginha/MG' })
      ).toHaveFocus()
      expect(state.active.map(area => area.city)).toEqual([
        'Alfenas',
        'Varginha',
      ])
    })
  })

  describe('removing a city', () => {
    it('warns how many accounts keep the city before removing it', async () => {
      renderPage({ accountsInCity: 3 })
      await userEvent.click(
        await screen.findByRole('button', { name: 'Remover Varginha/MG' })
      )

      const dialog = screen.getByRole('dialog', {
        name: 'Remover Varginha/MG?',
      })
      expect(
        await within(dialog).findByText(
          '3 contas atendem esta cidade e continuam com ela até alguém editar as contas.'
        )
      ).toBeInTheDocument()
      expect(
        within(dialog).getByRole('button', { name: 'Cancelar' })
      ).toHaveFocus()
    })

    it('says when no account has the city', async () => {
      renderPage({ accountsInCity: 0 })
      await userEvent.click(
        await screen.findByRole('button', { name: 'Remover Varginha/MG' })
      )

      expect(
        await screen.findByText('Nenhuma conta atende esta cidade.')
      ).toBeInTheDocument()
    })

    it('removes, says so, and moves focus to the list heading (the row is gone)', async () => {
      const state = renderPage()
      await userEvent.click(
        await screen.findByRole('button', { name: 'Remover Varginha/MG' })
      )

      await userEvent.click(
        screen.getByRole('button', { name: 'Remover cidade' })
      )

      await waitFor(() =>
        expect(announcement()).toHaveTextContent(
          'Varginha/MG foi removida da lista.'
        )
      )
      expect(listHeading()).toHaveFocus()
      await waitFor(() =>
        expect(screen.queryByText('Varginha/MG')).not.toBeInTheDocument()
      )
      expect(state.removed.map(area => area.city)).toContain('Varginha')
      expect(
        await screen.findByRole('link', { name: 'Removidas (2)' })
      ).toBeInTheDocument()
    })

    it('keeps the dialog open with the reason when the removal fails', async () => {
      renderPage({
        failChangesWith: {
          status: 409,
          code: 'SERVICE_AREA_CONCURRENT_CHANGE',
        },
      })
      await userEvent.click(
        await screen.findByRole('button', { name: 'Remover Varginha/MG' })
      )

      await userEvent.click(
        screen.getByRole('button', { name: 'Remover cidade' })
      )

      const dialog = screen.getByRole('dialog')
      expect(await within(dialog).findByRole('alert')).toHaveTextContent(
        'Outra pessoa alterou esta cidade agora mesmo.'
      )
      expect(dialog).toHaveAttribute('open')
    })
  })

  it('reactivates a removed city, says so and moves focus to the list heading', async () => {
    const state = renderPage({}, '/dashboard/cidades?situacao=removidas')

    await userEvent.click(
      await screen.findByRole('button', { name: 'Reativar Lavras/MG' })
    )

    await waitFor(() =>
      expect(announcement()).toHaveTextContent(
        'Lavras/MG voltou para a lista de cidades atendidas.'
      )
    )
    expect(listHeading()).toHaveFocus()
    expect(state.active.map(area => area.city)).toContain('Lavras')
  })
})
