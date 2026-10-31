import { fakeUsersApi } from '@/test/fakeUsersApi'
import { ANA, CARLA, TEMPORARY_PASSWORD } from '@/test/fixtures/users'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useUser } from '../../hooks/useUsers'
import type { User } from '../../services/usersApi'
import { PasswordSection } from '../PasswordSection'

// The page's part: the account comes from the list, so a new status reaches the section.
const Harness = ({ userId, isSelf }: { userId: string; isSelf: boolean }) => {
  const { data: user } = useUser(userId)
  return user ? <PasswordSection user={user} isSelf={isSelf} /> : null
}

const renderSection = (
  user: User = ANA,
  {
    isSelf = false,
    ...options
  }: Parameters<typeof fakeUsersApi>[1] & {
    isSelf?: boolean
  } = {}
) => {
  const api = fakeUsersApi(stubApi(), { users: [user, CARLA], ...options })
  render(
    <MemoryRouter>
      <Harness userId={user.id} isSelf={isSelf} />
    </MemoryRouter>,
    { wrapper: createQueryWrapper() }
  )
  return api
}

const openButton = () =>
  screen.findByRole('button', { name: 'Gerar nova senha' })
const confirmDialog = () =>
  screen.getByRole('dialog', { name: 'Gerar nova senha para Ana Souza?' })

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('PasswordSection', () => {
  it('asks before resetting, and calls nothing on cancel', async () => {
    const api = renderSection()

    await userEvent.click(await openButton())
    expect(confirmDialog()).toHaveTextContent(
      'A senha atual deixa de valer, e as sessões abertas da pessoa são encerradas na hora.'
    )
    await userEvent.click(
      within(confirmDialog()).getByRole('button', { name: 'Cancelar' })
    )

    expect(
      screen.queryByRole('dialog', { name: /Gerar nova senha/ })
    ).not.toBeInTheDocument()
    expect(api.actions).toEqual([])
  })

  it('shows the new password once, then drops it and says it was changed', async () => {
    const api = renderSection()

    await userEvent.click(await openButton())
    await userEvent.click(
      within(confirmDialog()).getByRole('button', { name: 'Gerar nova senha' })
    )
    const shown = await screen.findByRole('dialog', {
      name: 'Nova senha gerada',
    })
    expect(shown).toHaveTextContent(TEMPORARY_PASSWORD)
    expect(api.actions).toEqual(['reset-password usr_ana'])

    await userEvent.click(
      screen.getByRole('button', { name: 'Já anotei a senha' })
    )

    expect(screen.queryByText(TEMPORARY_PASSWORD)).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      'A senha de Ana Souza foi trocada.'
    )
    await waitFor(async () => expect(await openButton()).toHaveFocus())
  })

  it('keeps a refusal inside the confirmation', async () => {
    renderSection(ANA, {
      failAccessWith: { status: 404, code: 'USER_NOT_FOUND' },
    })

    await userEvent.click(await openButton())
    await userEvent.click(
      within(confirmDialog()).getByRole('button', { name: 'Gerar nova senha' })
    )

    expect(await within(confirmDialog()).findByRole('alert')).toHaveTextContent(
      'Esta conta não existe mais. Volte para a equipe.'
    )
  })

  it('explains why, when the temporary password expired', async () => {
    renderSection({ ...ANA, status: 'temporaryCredentialExpired' })

    expect(
      await screen.findByText(
        /A senha temporária venceu antes do primeiro acesso/
      )
    ).toBeInTheDocument()
  })

  it('does not explain an expiry that did not happen', async () => {
    renderSection()

    await openButton()
    expect(screen.queryByText(/venceu/)).not.toBeInTheDocument()
  })

  // The login of a deactivated account is refused: a password would not work yet.
  it('asks to reactivate a deactivated account first', async () => {
    renderSection({ ...ANA, status: 'deactivated' })

    expect(
      await screen.findByText('Reative a conta para gerar uma nova senha.')
    ).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  // A reset would end one's own session: one's own password changes on its own page.
  it('sends the signed-in person to the change-password page instead', async () => {
    renderSection(CARLA, { isSelf: true })

    expect(
      await screen.findByRole('link', { name: 'Trocar a minha senha' })
    ).toHaveAttribute('href', '/dashboard/trocar-senha')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
