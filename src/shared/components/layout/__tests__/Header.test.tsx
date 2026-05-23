import { render, screen, userEvent, within } from '@/test/test-utils'

import { type ReactElement } from 'react'

import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { Header } from '../Header'

const renderWithRouter = (ui: ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>)

vi.mock('@assets/logo_faladoria.svg', () => ({
  default: '/mock-logo.svg',
}))

describe('Header', () => {
  describe('Rendering & Structure', () => {
    it('should render the header element', () => {
      renderWithRouter(<Header />)
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('should render logos with correct alt text and dimensions', () => {
      renderWithRouter(<Header />)
      const logos = screen.getAllByAltText('Logo Faladoria')
      expect(logos.length).toBe(2) // header + sidebar
      logos.forEach(logo => {
        expect(logo).toHaveAttribute('width')
        expect(logo).toHaveAttribute('height')
      })
    })

    it('should render the logo link with accessible label', () => {
      renderWithRouter(<Header />)
      const links = screen.getAllByLabelText(
        'Faladoria - Ir para página inicial'
      )
      expect(links.length).toBeGreaterThanOrEqual(1)
      expect(links[0]).toHaveAttribute('href', '/')
    })

    it('should render desktop navigation with all nav items', () => {
      renderWithRouter(<Header />)
      const desktopNav = screen.getByRole('navigation', {
        name: 'Navegação principal',
      })
      expect(desktopNav).toBeInTheDocument()

      const expectedItems = [
        'Quem somos',
        'Como funciona',
        'Transparência',
        'Contato',
      ]
      expectedItems.forEach(label => {
        expect(within(desktopNav).getByText(label)).toBeInTheDocument()
      })
    })

    it('should render nav links with correct anchor hrefs', () => {
      renderWithRouter(<Header />)
      const desktopNav = screen.getByRole('navigation', {
        name: 'Navegação principal',
      })

      const expectedLinks = [
        { label: 'Quem somos', href: '/#quem-somos' },
        { label: 'Como funciona', href: '/#como-funciona' },
        { label: 'Transparência', href: '/#transparencia' },
        { label: 'Contato', href: '/#contato' },
      ]

      expectedLinks.forEach(({ label, href }) => {
        const link = within(desktopNav).getByText(label)
        expect(link).toHaveAttribute('href', href)
      })
    })

    it('should render mobile menu toggle button', () => {
      renderWithRouter(<Header />)
      expect(
        screen.getByRole('button', { name: 'Abrir menu' })
      ).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have aria-expanded="false" on menu button when closed', () => {
      renderWithRouter(<Header />)
      const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('should have aria-controls pointing to mobile menu', () => {
      renderWithRouter(<Header />)
      const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')
    })

    it('should render mobile sidebar as dialog with correct ARIA', () => {
      renderWithRouter(<Header />)
      const dialog = screen.getByRole('dialog', {
        name: 'Menu de navegação',
      })
      expect(dialog).toBeInTheDocument()
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('should have aria-expanded="true" when sidebar is open', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Header />)

      const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
      await user.click(menuButton)

      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('should render close button inside sidebar', () => {
      renderWithRouter(<Header />)
      expect(
        screen.getByRole('button', { name: 'Fechar menu' })
      ).toBeInTheDocument()
    })

    it('should have distinct aria-labels for desktop and mobile nav', () => {
      renderWithRouter(<Header />)
      expect(
        screen.getByRole('navigation', { name: 'Navegação principal' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('navigation', { name: 'Links do menu' })
      ).toBeInTheDocument()
    })

    it('should have semantic list elements in navigation', () => {
      renderWithRouter(<Header />)
      const desktopNav = screen.getByRole('navigation', {
        name: 'Navegação principal',
      })
      const list = within(desktopNav).getByRole('list')
      const items = within(list).getAllByRole('listitem')
      expect(items).toHaveLength(7)
    })
  })

  describe('Mobile Sidebar Interaction', () => {
    it('should open sidebar on menu button click', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Header />)

      const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
      await user.click(menuButton)

      const dialog = screen.getByRole('dialog', {
        name: 'Menu de navegação',
      })
      expect(dialog).toHaveAttribute('data-state', 'open')
    })

    it('should close sidebar on close button click', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Header />)

      await user.click(screen.getByRole('button', { name: 'Abrir menu' }))

      const closeButton = screen.getByRole('button', { name: 'Fechar menu' })
      await user.click(closeButton)

      const dialog = screen.getByRole('dialog', {
        name: 'Menu de navegação',
      })
      expect(dialog).toHaveAttribute('data-state', 'closed')
    })

    it('should close sidebar on overlay click', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Header />)

      await user.click(screen.getByRole('button', { name: 'Abrir menu' }))

      const dialog = screen.getByRole('dialog', {
        name: 'Menu de navegação',
      })
      const overlay = dialog.querySelector('[role="presentation"]')!
      await user.click(overlay)

      expect(dialog).toHaveAttribute('data-state', 'closed')
    })

    it('should close sidebar on Escape key', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Header />)

      await user.click(screen.getByRole('button', { name: 'Abrir menu' }))

      const dialog = screen.getByRole('dialog', {
        name: 'Menu de navegação',
      })
      expect(dialog).toHaveAttribute('data-state', 'open')

      await user.keyboard('{Escape}')

      expect(dialog).toHaveAttribute('data-state', 'closed')
    })

    it('should close sidebar when a nav link is clicked', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Header />)

      await user.click(screen.getByRole('button', { name: 'Abrir menu' }))

      const mobileNav = screen.getByRole('navigation', {
        name: 'Links do menu',
      })
      const link = within(mobileNav).getByText('Quem somos')
      await user.click(link)

      const dialog = screen.getByRole('dialog', {
        name: 'Menu de navegação',
      })
      expect(dialog).toHaveAttribute('data-state', 'closed')
    })

    it('should render all nav items in mobile sidebar', () => {
      renderWithRouter(<Header />)
      const mobileNav = screen.getByRole('navigation', {
        name: 'Links do menu',
      })

      const expectedItems = [
        'Quem somos',
        'Como funciona',
        'Transparência',
        'Contato',
      ]
      expectedItems.forEach(label => {
        expect(within(mobileNav).getByText(label)).toBeInTheDocument()
      })
    })

    it('should render WhatsAppCTA inside mobile sidebar', () => {
      renderWithRouter(<Header />)
      const dialog = screen.getByRole('dialog', {
        name: 'Menu de navegação',
      })
      expect(within(dialog).getByText('Reclamar Agora')).toBeInTheDocument()
    })

    it('should render logo inside mobile sidebar', () => {
      renderWithRouter(<Header />)
      const dialog = screen.getByRole('dialog', {
        name: 'Menu de navegação',
      })
      const logos = within(dialog).getAllByAltText('Logo Faladoria')
      expect(logos.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('onSidebarToggle callback', () => {
    it('should call onSidebarToggle with true when opened', async () => {
      const onSidebarToggle = vi.fn()
      const user = userEvent.setup()

      renderWithRouter(<Header onSidebarToggle={onSidebarToggle} />)

      await user.click(screen.getByRole('button', { name: 'Abrir menu' }))

      expect(onSidebarToggle).toHaveBeenCalledWith(true)
    })

    it('should call onSidebarToggle with false when closed', async () => {
      const onSidebarToggle = vi.fn()
      const user = userEvent.setup()

      renderWithRouter(<Header onSidebarToggle={onSidebarToggle} />)

      await user.click(screen.getByRole('button', { name: 'Abrir menu' }))
      await user.click(screen.getByRole('button', { name: 'Fechar menu' }))

      expect(onSidebarToggle).toHaveBeenCalledWith(false)
    })
  })
})
