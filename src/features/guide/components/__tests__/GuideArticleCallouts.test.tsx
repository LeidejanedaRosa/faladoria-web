import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { CalloutBlock } from '../../data'
import { Callout } from '../GuideArticleCallouts'

function renderCallout(block: CalloutBlock) {
  return render(<Callout block={block} />)
}

describe('Callout', () => {
  describe('Tip variant', () => {
    it('has role="note" with aria-label from title', () => {
      renderCallout({
        type: 'callout',
        variant: 'tip',
        title: 'Dica importante',
        text: 'Texto.',
      })
      expect(
        screen.getByRole('note', { name: 'Dica importante' })
      ).toBeInTheDocument()
    })

    it('uses default aria-label "Dica" when title is absent', () => {
      renderCallout({ type: 'callout', variant: 'tip', text: 'Alguma dica.' })
      expect(screen.getByRole('note', { name: 'Dica' })).toBeInTheDocument()
    })

    it('renders title as a paragraph, not a heading', () => {
      renderCallout({
        type: 'callout',
        variant: 'tip',
        title: 'Dica importante',
      })
      const el = screen.getByText('Dica importante')
      expect(el.tagName.toLowerCase()).toBe('p')
      expect(
        screen.queryByRole('heading', { name: 'Dica importante' })
      ).not.toBeInTheDocument()
    })

    it('renders the text content', () => {
      renderCallout({ type: 'callout', variant: 'tip', text: 'Texto da dica.' })
      expect(screen.getByText('Texto da dica.')).toBeInTheDocument()
    })

    it('the icon wrapper is hidden from screen readers', () => {
      const { container } = renderCallout({
        type: 'callout',
        variant: 'tip',
        text: 'Dica.',
      })
      expect(
        container.querySelector('span[aria-hidden="true"]')
      ).toBeInTheDocument()
    })
  })

  describe('Warning variant', () => {
    it('has role="note" with aria-label from title', () => {
      renderCallout({
        type: 'callout',
        variant: 'warning',
        title: 'Atenção crítica',
        text: 'Texto.',
      })
      expect(
        screen.getByRole('note', { name: 'Atenção crítica' })
      ).toBeInTheDocument()
    })

    it('uses default aria-label "Atenção" when title is absent', () => {
      renderCallout({
        type: 'callout',
        variant: 'warning',
        text: 'Fique alerta.',
      })
      expect(screen.getByRole('note', { name: 'Atenção' })).toBeInTheDocument()
    })

    it('renders the title', () => {
      renderCallout({
        type: 'callout',
        variant: 'warning',
        title: 'Cuidado',
        text: 'Leia com atenção.',
      })
      expect(screen.getByText('Cuidado')).toBeInTheDocument()
    })

    it('renders the text', () => {
      renderCallout({
        type: 'callout',
        variant: 'warning',
        title: 'Cuidado',
        text: 'Leia com atenção.',
      })
      expect(screen.getByText('Leia com atenção.')).toBeInTheDocument()
    })

    it('the icon wrapper is hidden from screen readers', () => {
      const { container } = renderCallout({
        type: 'callout',
        variant: 'warning',
        text: 'Aviso.',
      })
      expect(
        container.querySelector('span[aria-hidden="true"]')
      ).toBeInTheDocument()
    })
  })

  describe('Emergency variant', () => {
    it('has role="note" with aria-label from title', () => {
      renderCallout({
        type: 'callout',
        variant: 'emergency',
        title: 'SAMU',
        highlight: '192',
      })
      expect(screen.getByRole('note', { name: 'SAMU' })).toBeInTheDocument()
    })

    it('uses default aria-label "Atenção" when title is absent', () => {
      renderCallout({
        type: 'callout',
        variant: 'emergency',
        text: 'Vá ao hospital.',
      })
      expect(screen.getByRole('note', { name: 'Atenção' })).toBeInTheDocument()
    })

    it('renders the highlight number with aria-label for screen readers', () => {
      renderCallout({ type: 'callout', variant: 'emergency', highlight: '192' })
      expect(screen.getByText('192')).toHaveAttribute(
        'aria-label',
        'Ligue para 192'
      )
    })

    it('does not render a highlight number when absent', () => {
      const { container } = renderCallout({
        type: 'callout',
        variant: 'emergency',
        text: 'Procure ajuda.',
      })
      expect(
        container.querySelector('[aria-label^="Ligue para"]')
      ).not.toBeInTheDocument()
    })

    it('renders the text below the highlight', () => {
      renderCallout({
        type: 'callout',
        variant: 'emergency',
        highlight: '192',
        text: 'Ligue agora.',
      })
      expect(screen.getByText('Ligue agora.')).toBeInTheDocument()
    })

    it('the phone icon is hidden from screen readers', () => {
      const { container } = renderCallout({
        type: 'callout',
        variant: 'emergency',
        highlight: '192',
      })
      expect(
        container.querySelector('span[aria-hidden="true"]')
      ).toBeInTheDocument()
    })
  })

  describe('Checklist variant', () => {
    it('has role="note" with aria-label from title', () => {
      renderCallout({
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: ['Item A'],
      })
      expect(
        screen.getByRole('note', { name: 'O que levar' })
      ).toBeInTheDocument()
    })

    it('uses default aria-label "Lista de verificação" when title is absent', () => {
      renderCallout({
        type: 'callout',
        variant: 'checklist',
        items: ['Item A'],
      })
      expect(
        screen.getByRole('note', { name: 'Lista de verificação' })
      ).toBeInTheDocument()
    })

    it('renders items in an unordered list', () => {
      renderCallout({
        type: 'callout',
        variant: 'checklist',
        items: ['Cartão do SUS'],
      })
      expect(screen.getByRole('list').tagName.toLowerCase()).toBe('ul')
    })

    it('renders each item text', () => {
      renderCallout({
        type: 'callout',
        variant: 'checklist',
        items: ['Cartão do SUS', 'Documento com foto'],
      })
      expect(screen.getByText('Cartão do SUS')).toBeInTheDocument()
      expect(screen.getByText('Documento com foto')).toBeInTheDocument()
    })

    it('does not render a list when items is empty', () => {
      renderCallout({
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [],
      })
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })

    it('does not render a list when items is absent', () => {
      renderCallout({
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
      })
      expect(screen.queryByRole('list')).not.toBeInTheDocument()
    })

    it('each item check icon is hidden from screen readers', () => {
      const { container } = renderCallout({
        type: 'callout',
        variant: 'checklist',
        items: ['Item A', 'Item B'],
      })
      const hiddenInItems = container.querySelectorAll(
        'li [aria-hidden="true"]'
      )
      expect(hiddenInItems).toHaveLength(2)
    })

    it('the clipboard icon is hidden from screen readers', () => {
      const { container } = renderCallout({
        type: 'callout',
        variant: 'checklist',
        items: ['Item A'],
      })
      expect(
        container.querySelector('span[aria-hidden="true"]')
      ).toBeInTheDocument()
    })
  })

  describe('Default (no variant)', () => {
    it('has role="note" with aria-label from title', () => {
      renderCallout({ type: 'callout', title: 'Aviso geral', text: 'Texto.' })
      expect(
        screen.getByRole('note', { name: 'Aviso geral' })
      ).toBeInTheDocument()
    })

    it('uses default aria-label "Informação" when title is absent', () => {
      renderCallout({ type: 'callout', text: 'Informação geral.' })
      expect(
        screen.getByRole('note', { name: 'Informação' })
      ).toBeInTheDocument()
    })

    it('renders the title', () => {
      renderCallout({
        type: 'callout',
        title: 'Nota',
        text: 'Texto informativo.',
      })
      expect(screen.getByText('Nota')).toBeInTheDocument()
    })

    it('renders the text', () => {
      renderCallout({
        type: 'callout',
        title: 'Nota',
        text: 'Texto informativo.',
      })
      expect(screen.getByText('Texto informativo.')).toBeInTheDocument()
    })

    it('the icon wrapper is hidden from screen readers', () => {
      const { container } = renderCallout({ type: 'callout', text: 'Texto.' })
      expect(
        container.querySelector('span[aria-hidden="true"]')
      ).toBeInTheDocument()
    })
  })
})
