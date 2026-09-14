import { render, screen, userEvent } from '@/test/test-utils'

import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { PageShell } from '../PageShell'

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('PageShell', () => {
  it('renders the schemas prop before the skip link', () => {
    renderWithRouter(
      <PageShell
        mainContentLabel='Página de teste'
        schemas={<script data-testid='fake-schema' />}
      >
        <p>Conteúdo</p>
      </PageShell>
    )

    expect(screen.getByTestId('fake-schema')).toBeInTheDocument()
  })

  it('renders children inside the main content region', () => {
    renderWithRouter(
      <PageShell mainContentLabel='Página de teste'>
        <p>Conteúdo da página</p>
      </PageShell>
    )

    expect(
      screen.getByRole('main', { name: 'Página de teste' })
    ).toBeInTheDocument()
    expect(screen.getByText('Conteúdo da página')).toBeInTheDocument()
  })

  it('marks the content region inert while the mobile sidebar is open', async () => {
    const user = userEvent.setup()
    renderWithRouter(
      <PageShell mainContentLabel='Página de teste'>
        <p>Conteúdo</p>
      </PageShell>
    )

    const contentWrapper =
      screen.getByText('Conteúdo').parentElement?.parentElement
    expect(contentWrapper).not.toHaveAttribute('inert')

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }))

    expect(contentWrapper).toHaveAttribute('inert')
  })
})
