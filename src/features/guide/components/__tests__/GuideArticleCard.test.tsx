import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import type { GuideArticle, GuideCategory } from '../../data'
import { GuideArticleCard } from '../GuideArticleCard'

vi.mock('../guideImageMap', () => ({
  GUIDE_ARTICLE_IMAGES: { 'artigo-com-imagem': '/fake-article.png' },
  GUIDE_CATEGORY_IMAGES: {},
  GUIDE_STEP_IMAGES: {},
}))

const mockCategory: GuideCategory = {
  slug: 'consulta',
  label: 'Consultas',
  description: 'Saiba como agendar consultas pelo SUS.',
  iconName: 'clipboard',
  color: 'purple',
}

function makeArticle(overrides: Partial<GuideArticle> = {}): GuideArticle {
  return {
    slug: 'test-artigo',
    categorySlug: 'consulta',
    title: 'Artigo de teste',
    summary: 'Resumo do artigo de teste.',
    datePublished: '2026-01-01',
    content: [],
    ...overrides,
  }
}

function renderCard(article: GuideArticle, category = mockCategory) {
  return render(
    <MemoryRouter>
      <GuideArticleCard article={article} category={category} />
    </MemoryRouter>
  )
}

describe('GuideArticleCard', () => {
  describe('Conteúdo', () => {
    it('renderiza o título do artigo como h2', () => {
      renderCard(makeArticle())
      expect(
        screen.getByRole('heading', { level: 2, name: 'Artigo de teste' })
      ).toBeInTheDocument()
    })

    it('renderiza o resumo do artigo', () => {
      renderCard(makeArticle())
      expect(screen.getByText('Resumo do artigo de teste.')).toBeInTheDocument()
    })

    it('renderiza o link com href correto para o artigo', () => {
      renderCard(makeArticle())
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        '/como-conseguir-pelo-sus/consulta/test-artigo'
      )
    })

    it('o link engloba o título do artigo', () => {
      renderCard(makeArticle())
      const link = screen.getByRole('link')
      expect(link).toContainElement(screen.getByRole('heading', { level: 2 }))
    })
  })

  describe('Highlights', () => {
    it('renderiza a lista de tópicos quando o artigo tem highlights', () => {
      renderCard(makeArticle({ highlights: ['Tópico 1', 'Tópico 2'] }))
      const list = screen.getByRole('list', { name: 'Tópicos abordados' })
      expect(list).toBeInTheDocument()
      expect(screen.getByText('Tópico 1')).toBeInTheDocument()
      expect(screen.getByText('Tópico 2')).toBeInTheDocument()
    })

    it('não renderiza a lista quando o artigo não tem highlights', () => {
      renderCard(makeArticle())
      expect(
        screen.queryByRole('list', { name: 'Tópicos abordados' })
      ).not.toBeInTheDocument()
    })

    it('não renderiza a lista quando highlights é um array vazio', () => {
      renderCard(makeArticle({ highlights: [] }))
      expect(
        screen.queryByRole('list', { name: 'Tópicos abordados' })
      ).not.toBeInTheDocument()
    })
  })

  describe('Imagem condicional', () => {
    it('renderiza a imagem quando o artigo tem uma associada', () => {
      const { container } = renderCard(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toBeInTheDocument()
    })

    it('não renderiza imagem quando o artigo não tem uma associada', () => {
      const { container } = renderCard(makeArticle({ slug: 'sem-imagem' }))
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('a imagem é decorativa e oculta de leitores de tela', () => {
      const { container } = renderCard(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', '')
      expect(img).toHaveAttribute('aria-hidden', 'true')
    })

    it('a imagem tem atributos de dimensão para prevenir CLS', () => {
      const { container } = renderCard(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      const img = container.querySelector('img')
      expect(Number(img?.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(img?.getAttribute('height'))).toBeGreaterThan(0)
    })

    it('a imagem é carregada com lazy loading', () => {
      const { container } = renderCard(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toHaveAttribute('loading', 'lazy')
    })

    it('o link tem aria-label que inclui o título do artigo', () => {
      renderCard(makeArticle())
      expect(screen.getByRole('link')).toHaveAttribute(
        'aria-label',
        'Ver artigo: Artigo de teste'
      )
    })
  })
})
