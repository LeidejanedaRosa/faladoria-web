import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import type { ArticleBlock, GuideArticle } from '../../data'
import { GuideArticleLayout } from '../GuideArticleLayout'

vi.mock('../guideImageMap', () => ({
  GUIDE_ARTICLE_IMAGES: {},
  GUIDE_CATEGORY_IMAGES: {},
  GUIDE_STEP_IMAGES: { 'imagem-teste': '/fake-step.png' },
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

function renderLayout(article: GuideArticle) {
  return render(
    <MemoryRouter>
      <GuideArticleLayout article={article} breadcrumbItems={breadcrumbItems} />
    </MemoryRouter>
  )
}

describe('GuideArticleLayout', () => {
  describe('Estrutura e semântica', () => {
    it('renderiza o título do artigo como h1', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByRole('heading', { level: 1, name: 'Direito à saúde' })
      ).toBeInTheDocument()
    })

    it('renderiza o landmark article com nome acessível derivado do h1', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByRole('article', { name: 'Direito à saúde' })
      ).toBeInTheDocument()
    })

    it('renderiza o resumo do artigo', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByText('A saúde é um direito de todos.')
      ).toBeInTheDocument()
    })

    it('renderiza a navegação de breadcrumb', () => {
      renderLayout(makeArticle())
      expect(
        screen.getByRole('navigation', { name: 'Breadcrumb' })
      ).toBeInTheDocument()
    })
  })

  describe('Conteúdo em breve', () => {
    it('exibe placeholder quando o artigo não tem conteúdo', () => {
      renderLayout(makeArticle({ content: [] }))
      expect(screen.getByText('Conteúdo em breve')).toBeInTheDocument()
    })

    it('não exibe placeholder quando o artigo tem conteúdo', () => {
      const content: ArticleBlock[] = [{ type: 'paragraph', text: 'Texto.' }]
      renderLayout(makeArticle({ content }))
      expect(screen.queryByText('Conteúdo em breve')).not.toBeInTheDocument()
    })
  })

  describe('Bloco: paragraph', () => {
    it('renderiza o texto como parágrafo', () => {
      const content: ArticleBlock[] = [
        { type: 'paragraph', text: 'Parágrafo de teste.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Parágrafo de teste.')).toBeInTheDocument()
    })
  })

  describe('Bloco: heading', () => {
    it('renderiza nível 2 como passo numerado h2', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Seção principal' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 2, name: '1. Seção principal' })
      ).toBeInTheDocument()
    })

    it('renderiza nível 3 como h3', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 3, text: 'Subseção' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 3, name: 'Subseção' })
      ).toBeInTheDocument()
    })
  })

  describe('Bloco: list', () => {
    it('renderiza cada item da lista', () => {
      const content: ArticleBlock[] = [
        { type: 'list', items: ['Item A', 'Item B', 'Item C'] },
      ]
      renderLayout(makeArticle({ content }))
      const article = screen.getByRole('article')
      const list = within(article).getByRole('list')
      expect(within(list).getAllByRole('listitem')).toHaveLength(3)
      expect(within(list).getByText('Item A')).toBeInTheDocument()
    })

    it('lista não ordenada renderiza como ul', () => {
      const content: ArticleBlock[] = [
        { type: 'list', items: ['Item A', 'Item B'] },
      ]
      renderLayout(makeArticle({ content }))
      const item = screen.getByText('Item A')
      expect(item.closest('ul')).toBeInTheDocument()
      expect(item.closest('ol')).not.toBeInTheDocument()
    })

    it('lista ordenada renderiza como ol', () => {
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

  describe('Bloco: callout', () => {
    it('renderiza o texto de um callout dentro de um passo', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', text: 'Atenção: leia com cuidado.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Atenção: leia com cuidado.')).toBeInTheDocument()
    })

    it('renderiza o título de um callout quando informado', () => {
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

    it('renderiza o número de emergência no callout de emergência', () => {
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

    it('callout de emergência tem role="note" e aria-label com o título', () => {
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

    it('callout de emergência sem título usa aria-label padrão "Atenção"', () => {
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

    it('renderiza callout sem variante (padrão) com título e texto', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', title: 'Aviso geral', text: 'Texto sem variante.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Aviso geral')).toBeInTheDocument()
      expect(screen.getByText('Texto sem variante.')).toBeInTheDocument()
    })

    it('renderiza o texto de um callout de warning', () => {
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

    it('renderiza os itens de um callout de checklist', () => {
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

    it('callout de tip tem role="note" com aria-label derivado do título', () => {
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

    it('callout de tip sem título usa aria-label padrão "Dica"', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', variant: 'tip', text: 'Alguma dica.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByRole('note', { name: 'Dica' })).toBeInTheDocument()
    })

    it('callout de warning tem role="note" com aria-label derivado do título', () => {
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

    it('callout de warning sem título usa aria-label padrão "Atenção"', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', variant: 'warning', text: 'Fique alerta.' },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByRole('note', { name: 'Atenção' })).toBeInTheDocument()
    })

    it('callout de checklist tem role="note" com aria-label derivado do título', () => {
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

    it('callout de checklist sem título usa aria-label padrão "Lista de verificação"', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo' },
        { type: 'callout', variant: 'checklist', items: ['Item A', 'Item B'] },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('note', { name: 'Lista de verificação' })
      ).toBeInTheDocument()
    })

    it('callout padrão tem role="note" com aria-label derivado do título', () => {
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

  describe('Bloco: image', () => {
    it('renderiza a imagem quando a chave existe no mapa', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo com imagem' },
        { type: 'image', imageKey: 'imagem-teste', alt: 'Imagem de teste' },
      ]
      const { container } = renderLayout(makeArticle({ content }))
      expect(container.querySelector('img')).toBeInTheDocument()
    })

    it('não renderiza imagem quando a chave não está no mapa', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo sem imagem' },
        { type: 'image', imageKey: 'inexistente', alt: 'Nada' },
      ]
      const { container } = renderLayout(makeArticle({ content }))
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })

    it('a imagem recebe o alt texto do bloco', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo com imagem' },
        { type: 'image', imageKey: 'imagem-teste', alt: 'Cartão do SUS' },
      ]
      const { container } = renderLayout(makeArticle({ content }))
      expect(container.querySelector('img')).toHaveAttribute(
        'alt',
        'Cartão do SUS'
      )
    })

    it('a imagem é carregada com lazy loading', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo com imagem' },
        { type: 'image', imageKey: 'imagem-teste', alt: 'Imagem de teste' },
      ]
      const { container } = renderLayout(makeArticle({ content }))
      expect(container.querySelector('img')).toHaveAttribute('loading', 'lazy')
    })

    it('a imagem tem atributos de dimensão para prevenir CLS', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Passo com imagem' },
        { type: 'image', imageKey: 'imagem-teste', alt: 'Imagem de teste' },
      ]
      const { container } = renderLayout(makeArticle({ content }))
      const img = container.querySelector('img')
      expect(Number(img?.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(img?.getAttribute('height'))).toBeGreaterThan(0)
    })
  })

  describe('Bloco: info-panel', () => {
    it('renderiza o título e o texto de um info-panel', () => {
      const content: ArticleBlock[] = [
        {
          type: 'info-panel',
          title: 'Você sabia?',
          text: 'O SUS é gratuito para todos.',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(screen.getByText('Você sabia?')).toBeInTheDocument()
      expect(
        screen.getByText('O SUS é gratuito para todos.')
      ).toBeInTheDocument()
    })

    it('info-panel tem role="note" com aria-label derivado do título', () => {
      const content: ArticleBlock[] = [
        {
          type: 'info-panel',
          title: 'Você sabia?',
          text: 'O SUS é gratuito para todos.',
        },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('note', { name: 'Você sabia?' })
      ).toBeInTheDocument()
    })
  })

  describe('Preamble (blocos antes do primeiro h2)', () => {
    it('renderiza callout no preamble', () => {
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

    it('renderiza imagem no preamble', () => {
      const content: ArticleBlock[] = [
        { type: 'image', imageKey: 'imagem-teste', alt: 'Imagem introdutória' },
        { type: 'heading', level: 2, text: 'Passo 1' },
      ]
      const { container } = renderLayout(makeArticle({ content }))
      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('alt', 'Imagem introdutória')
    })
  })

  describe('Numeração de passos', () => {
    it('numera múltiplos passos sequencialmente', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Primeiro' },
        { type: 'heading', level: 2, text: 'Segundo' },
        { type: 'heading', level: 2, text: 'Terceiro' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 2, name: '1. Primeiro' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 2, name: '2. Segundo' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 2, name: '3. Terceiro' })
      ).toBeInTheDocument()
    })

    it('continua numeração após um info-panel intercalado', () => {
      const content: ArticleBlock[] = [
        { type: 'heading', level: 2, text: 'Primeiro' },
        { type: 'info-panel', title: 'Info', text: 'Nota.' },
        { type: 'heading', level: 2, text: 'Segundo' },
      ]
      renderLayout(makeArticle({ content }))
      expect(
        screen.getByRole('heading', { level: 2, name: '1. Primeiro' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 2, name: '2. Segundo' })
      ).toBeInTheDocument()
    })
  })
})
