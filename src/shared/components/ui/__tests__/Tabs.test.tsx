import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Tabs } from '../Tabs'

const renderTabs = () =>
  render(
    <Tabs
      label='Seções da conta'
      tabs={[
        { id: 'details', label: 'Dados', content: <input aria-label='Nome' /> },
        { id: 'access', label: 'Acesso', content: <p>Senha</p> },
        { id: 'log', label: 'Histórico', content: <p>Ações</p> },
      ]}
    />
  )

const tab = (name: string) => screen.getByRole('tab', { name })

describe('Tabs', () => {
  it('names the tab list and starts on the first tab, the only one in the Tab order', () => {
    renderTabs()

    expect(
      screen.getByRole('tablist', { name: 'Seções da conta' })
    ).toBeInTheDocument()
    expect(tab('Dados')).toHaveAttribute('aria-selected', 'true')
    expect(tab('Dados')).toHaveAttribute('tabindex', '0')
    expect(tab('Acesso')).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('tabpanel', { name: 'Dados' })).toBeVisible()
  })

  it('ties each tab to its panel', () => {
    renderTabs()

    const panel = screen.getByRole('tabpanel', { name: 'Dados' })
    expect(tab('Dados')).toHaveAttribute('aria-controls', panel.id)
  })

  it('shows the clicked tab and hides the others', async () => {
    renderTabs()

    await userEvent.click(tab('Acesso'))

    expect(tab('Acesso')).toHaveAttribute('aria-selected', 'true')
    expect(tab('Dados')).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByText('Senha')).toBeVisible()
    expect(screen.queryByRole('tabpanel', { name: 'Dados' })).toBeNull()
  })

  it('moves with the arrows, wrapping at both ends, and focuses the tab it shows', async () => {
    renderTabs()
    tab('Dados').focus()

    await userEvent.keyboard('{ArrowLeft}')
    expect(tab('Histórico')).toHaveFocus()
    expect(tab('Histórico')).toHaveAttribute('aria-selected', 'true')

    await userEvent.keyboard('{ArrowRight}')
    expect(tab('Dados')).toHaveFocus()

    await userEvent.keyboard('{ArrowRight}')
    expect(tab('Acesso')).toHaveFocus()
  })

  it('jumps to the first and the last tab with Home and End', async () => {
    renderTabs()
    tab('Dados').focus()

    await userEvent.keyboard('{End}')
    expect(tab('Histórico')).toHaveFocus()

    await userEvent.keyboard('{Home}')
    expect(tab('Dados')).toHaveFocus()
  })

  it('ignores any other key, leaving the tab where it is', async () => {
    renderTabs()
    await userEvent.click(tab('Acesso'))

    await userEvent.keyboard('a{ArrowDown}{Enter}')

    expect(tab('Acesso')).toHaveFocus()
    expect(tab('Acesso')).toHaveAttribute('aria-selected', 'true')
  })

  it('keeps a hidden panel mounted, with what was typed in it', async () => {
    renderTabs()
    await userEvent.type(screen.getByRole('textbox', { name: 'Nome' }), 'Ana')

    await userEvent.click(tab('Acesso'))
    await userEvent.click(tab('Dados'))

    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveValue('Ana')
  })
})
