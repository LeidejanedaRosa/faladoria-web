import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import type { ArticleBlock, GuideArticle, GuideCategory } from '../../data'
import { GuideArticleLayout } from '../GuideArticleLayout'

vi.mock('../guideImageMap', () => ({
  GUIDE_ARTICLE_IMAGES: {},
  GUIDE_CATEGORY_IMAGES: {},
  SHARED_STEP_IMAGES: {},
}))

const breadcrumbItems = [
  { name: 'Início', url: '/' },
  { name: 'Guia do SUS', url: '/como-conseguir-pelo-sus' },
  { name: 'Seus Direitos', url: '/como-conseguir-pelo-sus/seus-direitos' },
  { name: 'Direito à saúde' },
]

function makeArticle(overrides: Partial<GuideArticle> = {}): GuideArticle {
  return {
    slug: 'direito-a-saude',
    categorySlug: 'seus-direitos',
    title: 'Direito à saúde',
    summary: 'A saúde é um direito de todos.',
    datePublished: '2026-05-01',
    content: [],
    ...overrides,
  }
}

function renderLayout(article: GuideArticle, category?: GuideCategory) {
  return render(
    <MemoryRouter>
      <GuideArticleLayout
        article={article}
        category={category}
        breadcrumbItems={breadcrumbItems}
      />
    </MemoryRouter>
  )
}

describe('GuideArticleLayout', () => {
  describe('Structure & Semantics', () => {
    it('renders the article title as h1', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByRole('heading', { level: 1, name: 'Direito à saúde' })
      ).toBeInTheDocument()
    })

    it('renders the article landmark with accessible name from h1', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByRole('article', { name: 'Direito à saúde' })
      ).toBeInTheDocument()
    })

    it('renders the article summary', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByText('A saúde é um direito de todos.')
      ).toBeInTheDocument()
    })

    it('renders a procedural section followed by an informational section', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como fazer' },
        { type: 'action-step', action: 'Primeiro passo' },
        { type: 'heading', level: 2, text: 'O que saber' },
        { type: 'list', items: ['Item A'] },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 2, name: 'Como fazer' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 3, name: 'Primeiro passo' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 2, name: 'O que saber' })
      ).toBeInTheDocument()
      expect(screen.getByText('Item A')).toBeInTheDocument()
    })

    it('renders breadcrumb navigation', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByRole('navigation', { name: 'Breadcrumb' })
      ).toBeInTheDocument()
    })
  })

  describe('Coming soon placeholder', () => {
    it('shows placeholder when article has no content', () => {
      renderLayout(makeArticle({ content: [] }))
      expect(screen.getByText('Conteúdo em breve')).toBeInTheDocument()
    })

    it('hides placeholder when article has content', () => {
      const content: ArticleBlock[] = [{ type: 'paragraph', text: 'Texto.' }]
      renderLayout(makeArticle({ content }))
      expect(screen.queryByText('Conteúdo em breve')).not.toBeInTheDocument()
    })
  })

  describe('Block: paragraph', () => {
    it('renders text as a <p> element', () => {
      const content: ArticleBlock[] = [
        { type: 'paragraph', text: 'Parágrafo de teste.' },
      ]
      renderLayout(makeArticle({ content }))
      const el = screen.getByText('Parágrafo de teste.')
      expect(el.tagName.toLowerCase()).toBe('p')
    })
  })

  describe('Block: heading', () => {
    it('renders level 2 as an h2 step section', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Seção principal' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 2, name: 'Seção principal' })
      ).toBeInTheDocument()
    })

    it('wraps each informational step in a labeled region', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Seção principal' },
        { type: 'paragraph', text: 'Conteúdo.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('region', { name: 'Seção principal' })
      ).toBeInTheDocument()
    })
  })

  describe('Block: list', () => {
    it('renders each list item', () => {
      const content: ArticleBlock[] = [
        { type: 'list', items: ['Item A', 'Item B', 'Item C'] },
      ]
      renderLayout(makeArticle({ content }))
      const article = screen.getByRole('article')
      const list = within(article).getByRole('list')
      expect(within(list).getAllByRole('listitem')).toHaveLength(3)
      expect(within(list).getByText('Item A')).toBeInTheDocument()
    })

    it('renders an unordered list as ul', () => {
      const content: ArticleBlock[] = [
        { type: 'list', items: ['Item A', 'Item B'] },
      ]
      renderLayout(makeArticle({ content }))
      const item = screen.getByText('Item A')
      expect(item.closest('ul')).toBeInTheDocument()
      expect(item.closest('ol')).not.toBeInTheDocument()
    })

    it('renders an ordered list as ol', () => {
      const content: ArticleBlock[] = [
        {
          type: 'list',
          ordered: true,
          items: ['Primeiro passo', 'Segundo passo'],
        },
      ]
      renderLayout(makeArticle({ content }))
      const item = screen.getByText('Primeiro passo')
      expect(item.closest('ol')).toBeInTheDocument()
      expect(item.closest('ul')).not.toBeInTheDocument()
    })
  })

  describe('Block: callout', () => {
    it('renders callout text inside a step', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', text: 'Atenção: leia com cuidado.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Atenção: leia com cuidado.')).toBeInTheDocument()
    })

    it('renders callout title when provided', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Dica importante',
          text: 'Texto da dica.',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Dica importante')).toBeInTheDocument()
      expect(screen.getByText('Texto da dica.')).toBeInTheDocument()
    })

    it('renders the callout title as a paragraph, not a heading', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Dica importante',
          text: 'Texto.',
        },
      ]
      renderLayout(makeArticle({ content }))
      const el = screen.getByText('Dica importante')
      expect(el.tagName.toLowerCase()).toBe('p')
      expect(
        screen.queryByRole('heading', { name: 'Dica importante' })
      ).not.toBeInTheDocument()
    })

    it('renders the emergency number in an emergency callout', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Urgência' },
        {
          type: 'callout',
          variant: 'emergency',
          title: 'SAMU',
          highlight: '192',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('SAMU')).toBeInTheDocument()
      expect(screen.getByText('192')).toBeInTheDocument()
    })

    it('emergency callout highlight has aria-label with phone context', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Urgência' },
        {
          type: 'callout',
          variant: 'emergency',
          title: 'SAMU',
          highlight: '192',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('192')).toHaveAttribute(
        'aria-label',
        'Ligue para 192'
      )
    })

    it('emergency callout has role="note" with aria-label from title', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Urgência' },
        {
          type: 'callout',
          variant: 'emergency',
          title: 'SAMU',
          highlight: '192',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByRole('note', { name: 'SAMU' })).toBeInTheDocument()
    })

    it('emergency callout without title uses default aria-label "Atenção"', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Urgência' },
        {
          type: 'callout',
          variant: 'emergency',
          text: 'Vá ao hospital mais próximo.',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByRole('note', { name: 'Atenção' })).toBeInTheDocument()
    })

    it('renders default callout with title and text', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', title: 'Aviso geral', text: 'Texto sem variante.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Aviso geral')).toBeInTheDocument()
      expect(screen.getByText('Texto sem variante.')).toBeInTheDocument()
    })

    it('renders warning callout text', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Atenção',
          text: 'Fique alerta.',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Atenção')).toBeInTheDocument()
      expect(screen.getByText('Fique alerta.')).toBeInTheDocument()
    })

    it('renders checklist callout items', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        {
          type: 'callout',
          variant: 'checklist',
          title: 'O que levar',
          items: ['Cartão SUS', 'Documento com foto'],
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('O que levar')).toBeInTheDocument()
      expect(screen.getByText('Cartão SUS')).toBeInTheDocument()
      expect(screen.getByText('Documento com foto')).toBeInTheDocument()
    })

    it('tip callout has role="note" with aria-label from title', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Dica importante',
          text: 'Texto.',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('note', { name: 'Dica importante' })
      ).toBeInTheDocument()
    })

    it('tip callout without title uses default aria-label "Dica"', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', variant: 'tip', text: 'Alguma dica.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByRole('note', { name: 'Dica' })).toBeInTheDocument()
    })

    it('warning callout has role="note" with aria-label from title', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Atenção',
          text: 'Fique alerta.',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByRole('note', { name: 'Atenção' })).toBeInTheDocument()
    })

    it('warning callout without title uses default aria-label "Atenção"', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', variant: 'warning', text: 'Fique alerta.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByRole('note', { name: 'Atenção' })).toBeInTheDocument()
    })

    it('checklist callout has role="note" with aria-label from title', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        {
          type: 'callout',
          variant: 'checklist',
          title: 'O que levar',
          items: ['Item A'],
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('note', { name: 'O que levar' })
      ).toBeInTheDocument()
    })

    it('checklist callout without title uses default aria-label "Lista de verificação"', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', variant: 'checklist', items: ['Item A', 'Item B'] },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('note', { name: 'Lista de verificação' })
      ).toBeInTheDocument()
    })

    it('default callout has role="note" with aria-label from title', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', title: 'Aviso geral', text: 'Texto sem variante.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('note', { name: 'Aviso geral' })
      ).toBeInTheDocument()
    })
  })

  describe('Block: action-step', () => {
    it('renders action text and detail inside a step', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como solicitar' },
        {
          type: 'action-step',
          action: 'Vá à UBS',
          detail: 'Leve seu cartão SUS.',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Vá à UBS')).toBeInTheDocument()
      expect(screen.getByText('Leve seu cartão SUS.')).toBeInTheDocument()
    })

    it('renders action-steps inside an ordered list', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como solicitar' },
        { type: 'action-step', action: 'Primeiro passo' },
        { type: 'action-step', action: 'Segundo passo' },
      ]
      renderLayout(makeArticle({ content }))
      const article = screen.getByRole('article')
      const list = within(article).getByRole('list')
      expect(list.tagName).toBe('OL')
    })

    it('renders one list item per action-step', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como solicitar' },
        { type: 'action-step', action: 'Passo um' },
        { type: 'action-step', action: 'Passo dois' },
        { type: 'action-step', action: 'Passo três' },
      ]
      renderLayout(makeArticle({ content }))
      const article = screen.getByRole('article')
      const list = within(article).getByRole('list')
      expect(within(list).getAllByRole('listitem')).toHaveLength(3)
    })

    it('wraps the action-step section in a labeled region', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como solicitar' },
        { type: 'action-step', action: 'Vá à UBS' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('region', { name: 'Como solicitar' })
      ).toBeInTheDocument()
    })

    it('renders the step heading without the step number prefix', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como solicitar' },
        { type: 'action-step', action: 'Vá à UBS' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 2, name: 'Como solicitar' })
      ).toBeInTheDocument()
    })

    it('renders no image when action-step has no imageKey', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como solicitar' },
        { type: 'action-step', action: 'Vá à UBS' },
      ]
      const { container } = renderLayout(makeArticle({ content }))
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })

    it('does not render a detail paragraph when detail is omitted', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como solicitar' },
        { type: 'action-step', action: 'Vá à UBS' },
      ]
      renderLayout(makeArticle({ content }))
      const listItem = screen.getByRole('listitem', { name: 'Passo 1' })
      expect(listItem.querySelector('p')).not.toBeInTheDocument()
    })

    it('renders the action title as h3 for correct heading hierarchy', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como solicitar' },
        { type: 'action-step', action: 'Vá à UBS' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 3, name: 'Vá à UBS' })
      ).toBeInTheDocument()
    })

    it('renders non-action-step blocks after the action list in a procedural section', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Como fazer' },
        { type: 'action-step', action: 'Vá à UBS' },
        {
          type: 'callout',
          variant: 'tip',
          title: 'Dica extra',
          text: 'Informação adicional.',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Vá à UBS')).toBeInTheDocument()
      expect(
        screen.getByRole('note', { name: 'Dica extra' })
      ).toBeInTheDocument()
    })
  })

  describe('Preamble blocks (before first h2)', () => {
    it('renders a callout in the preamble', () => {
      const content: ArticleBlock[] = [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Dica inicial',
          text: 'Leia antes de começar.',
        },
        { type: 'heading', level: 2, text: 'Passo 1' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Dica inicial')).toBeInTheDocument()
      expect(screen.getByText('Leia antes de começar.')).toBeInTheDocument()
    })

    it('renders multiple preamble blocks before the first step section', () => {
      const content: ArticleBlock[] = [
        {
          type: 'callout',
          variant: 'tip',
          title: 'Dica inicial',
          text: 'Info geral.',
        },
        {
          type: 'callout',
          variant: 'warning',
          title: 'Prazo crítico',
          text: 'Atenção ao prazo.',
        },
        { type: 'heading', level: 2, text: 'Como garantir' },
        { type: 'action-step', action: 'Vá à UBS' },
      ]
      renderLayout(makeArticle({ content }))
      const tip = screen.getByRole('note', { name: 'Dica inicial' })
      const warning = screen.getByRole('note', { name: 'Prazo crítico' })
      const section = screen.getByRole('region', { name: 'Como garantir' })
      expect(tip).toBeInTheDocument()
      expect(warning).toBeInTheDocument()
      expect(
        warning.compareDocumentPosition(section) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy()
    })
  })

  describe('Multiple informational steps', () => {
    it('renders each step heading without a numeric prefix', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Primeiro' },
        { type: 'heading', level: 2, text: 'Segundo' },
        { type: 'heading', level: 2, text: 'Terceiro' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 2, name: 'Primeiro' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 2, name: 'Segundo' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 2, name: 'Terceiro' })
      ).toBeInTheDocument()
    })

    it('does not render a numeric badge for informational sections without an icon', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Primeira seção' },
        { type: 'paragraph', text: 'Conteúdo da seção.' },
        { type: 'heading', level: 2, text: 'Segunda seção' },
        { type: 'paragraph', text: 'Mais conteúdo.' },
      ]
      renderLayout(makeArticle({ content }))
      const secondSection = screen.getByRole('region', {
        name: 'Segunda seção',
      })
      expect(within(secondSection).queryByText('2')).not.toBeInTheDocument()
    })

    it('renders the icon box when the step heading has an explicit icon', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Seção com ícone', icon: 'syringe' },
      ]
      renderLayout(makeArticle({ content }))
      const section = screen.getByRole('region', { name: 'Seção com ícone' })
      expect(section.querySelector('svg')).toBeInTheDocument()
    })
  })
})
