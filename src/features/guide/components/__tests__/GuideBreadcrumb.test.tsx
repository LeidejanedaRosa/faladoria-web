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
  describe('Estrutura e semântica', () => {
    it('renderiza um landmark de navegação com label Breadcrumb', () => {
      renderBreadcrumb()
      expect(
        screen.getByRole('navigation', { name: 'Breadcrumb' })
      ).toBeInTheDocument()
    })

    it('renderiza todos os itens como elementos de lista', () => {
      renderBreadcrumb()
      expect(screen.getAllByRole('listitem')).toHaveLength(items.length)
    })
  })

  describe('Último item — página atual', () => {
    it('renderiza o último item como texto, não como link', () => {
      renderBreadcrumb()
      const links = screen.getAllByRole('link')
      const linkNames = links.map(l => l.textContent)
      expect(linkNames).not.toContain('Seus Direitos')
    })

    it('aplica aria-current="page" no último item', () => {
      renderBreadcrumb()
      expect(screen.getByText('Seus Direitos')).toHaveAttribute(
        'aria-current',
        'page'
      )
    })
  })

  describe('Itens intermediários com URL', () => {
    it('renderiza links para itens com URL que não são o último', () => {
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

    it('não aplica aria-current nos itens intermediários', () => {
      renderBreadcrumb()
      const inicio = screen.getByRole('link', { name: 'Início' })
      expect(inicio).not.toHaveAttribute('aria-current')
    })
  })

  describe('Item intermediário sem URL', () => {
    it('renderiza como texto quando não há URL', () => {
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
