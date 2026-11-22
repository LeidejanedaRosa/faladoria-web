import { act, render, screen } from '@testing-library/react'
import {
  MemoryRouter,
  type NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import type { Places } from '../../utils/accountFilters'
import { useAccountFilters } from '../useAccountFilters'

const PLACES: Places = new Map([
  ['MG', ['Alfenas', 'Varginha']],
  ['SP', ['Campinas']],
])

let result: ReturnType<typeof useAccountFilters>
let navigate: NavigateFunction

const Probe = () => {
  result = useAccountFilters(PLACES)
  navigate = useNavigate()
  const { pathname, search } = useLocation()
  return (
    <>
      <p data-testid='path'>{pathname}</p>
      <p data-testid='search'>{search}</p>
    </>
  )
}

const renderAt = (...entries: string[]) =>
  render(
    <MemoryRouter initialEntries={entries}>
      <Probe />
    </MemoryRouter>
  )

const address = () => screen.getByTestId('search').textContent

describe('useAccountFilters', () => {
  it('reads the filters from the address, so a reload or a shared link keeps them', () => {
    renderAt('/dashboard/equipe?estado=MG&cidade=Varginha&busca=ana')

    expect(result.filters).toEqual({
      state: 'MG',
      city: 'Varginha',
      search: 'ana',
    })
  })

  it('ignores a place from the address that no account has', () => {
    renderAt('/dashboard/equipe?estado=RJ&cidade=Niteroi')

    expect(result.filters).toEqual({ state: '', city: '', search: '' })
  })

  it('writes each choice to the address', () => {
    renderAt('/dashboard/equipe')

    act(() => result.setState('MG'))
    act(() => result.setCity('Varginha'))

    expect(address()).toBe('?estado=MG&cidade=Varginha')
    expect(result.filters).toMatchObject({ state: 'MG', city: 'Varginha' })
  })

  it('starts another state with all of its cities', () => {
    renderAt('/dashboard/equipe?estado=MG&cidade=Varginha')

    act(() => result.setState('SP'))

    expect(address()).toBe('?estado=SP')
  })

  it('shows the typed text at once and keeps it trimmed in the address', () => {
    renderAt('/dashboard/equipe')

    act(() => result.setSearch(' ana '))

    expect(result.filters.search).toBe(' ana ')
    expect(address()).toBe('?busca=ana')
  })

  it('takes a filter out of the address when it is emptied', () => {
    renderAt('/dashboard/equipe?estado=MG&busca=ana')

    act(() => result.setSearch(''))
    act(() => result.setState(''))

    expect(address()).toBe('')
  })

  it('clears every filter, the typed text too', () => {
    renderAt('/dashboard/equipe?estado=MG&cidade=Varginha&busca=ana')

    act(() => result.clear())

    expect(address()).toBe('')
    expect(result.filters).toEqual({ state: '', city: '', search: '' })
  })

  it('keeps the other parts of the address', () => {
    renderAt('/dashboard/equipe?origem=painel')

    act(() => result.setState('MG'))

    expect(address()).toBe('?origem=painel&estado=MG')
  })

  it('replaces the entry: Back leaves the list instead of undoing a filter', () => {
    renderAt('/dashboard', '/dashboard/equipe')

    act(() => result.setState('MG'))
    act(() => result.setSearch('ana'))
    act(() => void navigate(-1))

    expect(screen.getByTestId('path').textContent).toBe('/dashboard')
    expect(address()).toBe('')
  })
})
