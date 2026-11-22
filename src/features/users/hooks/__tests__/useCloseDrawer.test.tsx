import { act, render, screen } from '@testing-library/react'
import {
  MemoryRouter,
  type NavigateFunction,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { OPENED_FROM_LIST, useCloseDrawer } from '../useCloseDrawer'

const DRAWER = '/dashboard/equipe/usr_ana'

let close: () => void
let navigate: NavigateFunction

const Probe = () => {
  close = useCloseDrawer('team')
  navigate = useNavigate()
  const { pathname, search } = useLocation()
  return <p data-testid='path'>{pathname + search}</p>
}

const renderAt = (entries: (string | { pathname: string; state: unknown })[]) =>
  render(
    <MemoryRouter initialEntries={entries}>
      <Routes>
        <Route path='*' element={<Probe />} />
      </Routes>
    </MemoryRouter>
  )

const path = () => screen.getByTestId('path').textContent

describe('useCloseDrawer', () => {
  it('steps back to the list that opened the drawer', () => {
    renderAt([
      '/dashboard/equipe',
      { pathname: DRAWER, state: OPENED_FROM_LIST },
    ])

    act(() => close())

    expect(path()).toBe('/dashboard/equipe')
  })

  it('replaces a drawer reached by a link with its folder, so Back does not reopen it', () => {
    renderAt(['/elsewhere', DRAWER])

    act(() => close())
    expect(path()).toBe('/dashboard/equipe')

    act(() => void navigate(-1))
    expect(path()).toBe('/elsewhere')
  })

  it('keeps the list’s filters when a drawer reached by a link closes', () => {
    renderAt([`${DRAWER}?estado=MG&cidade=Varginha`])

    act(() => close())

    expect(path()).toBe('/dashboard/equipe?estado=MG&cidade=Varginha')
  })
})
