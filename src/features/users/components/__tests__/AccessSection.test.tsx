import { fakeUsersApi } from '@/test/fakeUsersApi'
import { ANA, CARLA } from '@/test/fixtures/users'
import { stubApi } from '@/test/mockFetch'
import { createQueryWrapper } from '@/test/queryClient'

import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useUser } from '../../hooks/useUsers'
import type { User } from '../../services/usersApi'
import { AccessSection } from '../AccessSection'

// The page's part: the account comes from the list, so a new status reaches the section.
const Harness = ({ userId, isSelf }: { userId: string; isSelf: boolean }) => {
  const { data: user } = useUser(userId)
  return user ? <AccessSection user={user} isSelf={isSelf} /> : null
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
  render(<Harness userId={user.id} isSelf={isSelf} />, {
    wrapper: createQueryWrapper(),
  })
  return api
}

const confirmDialog = () =>
  screen.getByRole('dialog', { name: 'Desativar a conta de Ana Souza?' })
const confirmDeactivate = async () => {
  await userEvent.click(
    await screen.findByRole('button', { name: 'Desativar conta' })
  )
  await userEvent.click(
    within(confirmDialog()).getByRole('button', { name: 'Desativar conta' })
  )
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('AccessSection', () => {
  it('says, before deactivating, how many cases stay with the person', async () => {
    renderSection({ ...ANA, assignedComplaintCount: 4 })

    await userEvent.click(
      await screen.findByRole('button', { name: 'Desativar conta' })
    )

    expect(confirmDialog()).toHaveTextContent(
      '4 casos em andamento continuam com esta pessoa até alguém passá-los para outra.'
    )
  })

  it('says nothing about cases when there are none', async () => {
    renderSection({ ...ANA, assignedComplaintCount: 0 })

    await userEvent.click(
      await screen.findByRole('button', { name: 'Desativar conta' })
    )

    expect(confirmDialog()).not.toHaveTextContent('casos em andamento')
  })

  it('deactivates nothing on cancel, and gives focus back to the button', async () => {
    const api = renderSection()
    const deactivate = await screen.findByRole('button', {
      name: 'Desativar conta',
    })

    await userEvent.click(deactivate)
    await userEvent.click(
      within(confirmDialog()).getByRole('button', { name: 'Cancelar' })
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(deactivate).toHaveFocus()
    expect(api.actions).toEqual([])
  })

  it('deactivates once confirmed, says so, and moves focus to "Reativar"', async () => {
    const api = renderSection()

    await confirmDeactivate()

    const reactivate = await screen.findByRole('button', {
      name: 'Reativar conta',
    })
    await waitFor(() => expect(reactivate).toHaveFocus())
    expect(screen.getByRole('status')).toHaveTextContent(
      'A conta de Ana Souza foi desativada.'
    )
    expect(api.actions).toEqual(['deactivate usr_ana'])
  })

  // Reactivating only gives access back, and can be undone: no confirmation.
  it('reactivates at once, without a confirmation', async () => {
    const api = renderSection({ ...ANA, status: 'deactivated' })

    await userEvent.click(
      await screen.findByRole('button', { name: 'Reativar conta' })
    )

    const deactivate = await screen.findByRole('button', {
      name: 'Desativar conta',
    })
    await waitFor(() => expect(deactivate).toHaveFocus())
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      'A conta de Ana Souza foi reativada.'
    )
    expect(api.actions).toEqual(['reactivate usr_ana'])
  })

  // On deactivating, this refusal also ended the person's sessions: the text must say so.
  it('says the sessions ended when no active admin would be left', async () => {
    renderSection(ANA, {
      failAccessWith: { status: 409, code: 'NO_ACTIVE_ADMIN_LEFT' },
    })

    await confirmDeactivate()

    expect(await within(confirmDialog()).findByRole('alert')).toHaveTextContent(
      'A conta continua ativa, mas as sessões dela foram encerradas.'
    )
  })

  it('shows a refused reactivation next to the button', async () => {
    renderSection(
      { ...ANA, status: 'deactivated' },
      { failAccessWith: { status: 409, code: 'USER_NOT_DEACTIVATED' } }
    )

    await userEvent.click(
      await screen.findByRole('button', { name: 'Reativar conta' })
    )

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Esta conta já estava ativa. A página foi atualizada.'
    )
  })

  it('does not offer to deactivate one’s own account, and says why', async () => {
    renderSection(CARLA, { isSelf: true })

    expect(
      await screen.findByText('Você não pode desativar a própria conta.')
    ).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
