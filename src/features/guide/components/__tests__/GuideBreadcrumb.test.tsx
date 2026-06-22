import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { GuideBreadcrumb } from '../GuideBreadcrumb'

const items = [
  { name: 'Início', url: '/' },
  { name: 'Guia do SUS', url: '/como-conseguir-pelo-sus' },
  { name: 'Seus Direitos' },
]

function renderBreadcrumb(overrideItems = items) {
  return render(
    <MemoryRouter>
      <GuideBreadcrumb items={overrideItems} />
    </MemoryRouter>
  )
}

describe('GuideBreadcrumb', () => {
  describe('Structure & Semantics', () => {
    it('renders a navigation landmark with label Breadcrumb', () => {
      renderBreadcrumb()
      expect(
        screen.getByRole('navigation', { name: 'Breadcrumb' })
      ).toBeInTheDocument()
    })

    it('renders all items as list elements', () => {
      renderBreadcrumb()
      expect(screen.getAllByRole('listitem')).toHaveLength(items.length)
    })
  })

  describe('Last item — current page', () => {
    it('renders the last item as text, not a link', () => {
      renderBreadcrumb()
      const links = screen.getAllByRole('link')
      const linkNames = links.map(l => l.textContent)
      expect(linkNames).not.toContain('Seus Direitos')
    })

    it('applies aria-current="page" to the last item', () => {
      renderBreadcrumb()
      expect(screen.getByText('Seus Direitos')).toHaveAttribute(
        'aria-current',
        'page'
      )
    })
  })

  describe('Middle items with URL', () => {
    it('renders links for intermediate items with URL', () => {
      renderBreadcrumb()
      expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute(
        'href',
        '/'
      )
      expect(screen.getByRole('link', { name: 'Guia do SUS' })).toHaveAttribute(
        'href',
        '/como-conseguir-pelo-sus'
      )
    })

    it('does not apply aria-current to intermediate items', () => {
      renderBreadcrumb()
      const inicio = screen.getByRole('link', { name: 'Início' })
      expect(inicio).not.toHaveAttribute('aria-current')
    })
  })

  describe('Intermediate item without URL', () => {
    it('renders as text when there is no URL', () => {
      const itemsSemUrl = [
        { name: 'Início', url: '/' },
        { name: 'Sem link' },
        { name: 'Atual' },
      ]
      renderBreadcrumb(itemsSemUrl)
      const semLink = screen.getByText('Sem link')
      expect(semLink.tagName).toBe('SPAN')
      expect(semLink).not.toHaveAttribute('aria-current')
    })
  })
})
