import { apiErrorResponse, jsonResponse, stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { SignOutButton } from '../SignOutButton'

const renderButton = () =>
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path='/dashboard' element={<SignOutButton />} />
        <Route path='/dashboard/entrar' element={<p>tela de login</p>} />
      </Routes>
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('SignOutButton', () => {
  it('signs out and goes to the login', async () => {
    stubApi().mockResolvedValue(jsonResponse({ success: true }))
    renderButton()

    await userEvent.click(screen.getByRole('button', { name: 'Sair' }))

    expect(await screen.findByText('tela de login')).toBeInTheDocument()
  })

  it('still leaves the panel when the API fails, so nobody stays stuck inside', async () => {
    stubApi().mockResolvedValue(apiErrorResponse(503))
    renderButton()

    await userEvent.click(screen.getByRole('button', { name: 'Sair' }))

    expect(await screen.findByText('tela de login')).toBeInTheDocument()
  })
})
