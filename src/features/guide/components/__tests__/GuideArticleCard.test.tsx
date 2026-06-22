import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import type { GuideArticle, GuideCategory } from '../../data'
import { GuideArticleCard } from '../GuideArticleCard'

vi.mock('../guideImageMap', () => ({
  GUIDE_ARTICLE_IMAGES: { 'artigo-com-imagem': '/fake-article.png' },
  GUIDE_CATEGORY_IMAGES: { consulta: '/fake-category.png' },
  SHARED_STEP_IMAGES: {},
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
  describe('Content', () => {
    it('renders the article title as h2', () => {
      renderCard(makeArticle())
      expect(
        screen.getByRole('heading', { level: 2, name: 'Artigo de teste' })
      ).toBeInTheDocument()
    })

    it('renders the article summary', () => {
      renderCard(makeArticle())
      expect(screen.getByText('Resumo do artigo de teste.')).toBeInTheDocument()
    })

    it('renders the link with the correct href for the article', () => {
      renderCard(makeArticle())
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        '/como-conseguir-pelo-sus/consulta/test-artigo'
      )
    })

    it('the link wraps the article title', () => {
      renderCard(makeArticle())
      const link = screen.getByRole('link')
      expect(link).toContainElement(screen.getByRole('heading', { level: 2 }))
    })
  })

  describe('Conditional image', () => {
    it('renders the article image when one is associated', () => {
      const { container } = renderCard(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toBeInTheDocument()
    })

    it('renders the category image as fallback when the article has no specific image', () => {
      const { container } = renderCard(makeArticle({ slug: 'sem-imagem' }))
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        '/fake-category.png'
      )
    })

    it('renders no image when neither article nor category has one', () => {
      const categoryWithoutImage: GuideCategory = {
        ...mockCategory,
        slug: 'sem-categoria-imagem',
      }
      const { container } = renderCard(
        makeArticle({
          slug: 'sem-imagem',
          categorySlug: 'sem-categoria-imagem',
        }),
        categoryWithoutImage
      )
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('the image is decorative and hidden from screen readers', () => {
      const { container } = renderCard(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', '')
      expect(img).toHaveAttribute('aria-hidden', 'true')
    })

    it('the image has dimension attributes to prevent CLS', () => {
      const { container } = renderCard(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      const img = container.querySelector('img')
      expect(Number(img?.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(img?.getAttribute('height'))).toBeGreaterThan(0)
    })

    it('the image is loaded with lazy loading', () => {
      const { container } = renderCard(
        makeArticle({ slug: 'artigo-com-imagem' })
      )
      expect(container.querySelector('img')).toHaveAttribute('loading', 'lazy')
    })

    it('the link is accessible by the article title', () => {
      renderCard(makeArticle())
      expect(
        screen.getByRole('link', { name: /Artigo de teste/i })
      ).toBeInTheDocument()
    })
  })
})
