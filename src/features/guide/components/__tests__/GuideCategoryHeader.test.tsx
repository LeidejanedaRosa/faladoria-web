import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { GUIDE_CATEGORY_HEADING_ID, GUIDE_CONTENT } from '../../data'
import type { GuideCategory } from '../../data'
import { GuideCategoryHeader } from '../GuideCategoryHeader'

vi.mock('../guideImageMap', () => ({
  GUIDE_ARTICLE_IMAGES: {},
  GUIDE_CATEGORY_IMAGES: { consulta: '/fake-category.png' },
  GUIDE_STEP_IMAGES: {},
}))

const mockCategoryWithImage: GuideCategory = {
  slug: 'consulta',
  label: 'Consultas',
  description: 'Saiba como agendar consultas pelo SUS.',
  iconName: 'clipboard',
  color: 'purple',
}

const mockCategoryWithoutImage: GuideCategory = {
  slug: 'seus-direitos',
  label: 'Seus Direitos',
  description: 'Conheça seus direitos como usuário do SUS.',
  iconName: 'shield',
  color: 'indigo',
}

describe('GuideCategoryHeader', () => {
  describe('Conteúdo', () => {
    it('renderiza o nome da categoria como h1', () => {
      render(<GuideCategoryHeader category={mockCategoryWithImage} />)
      expect(
        screen.getByRole('heading', { level: 1, name: 'Consultas' })
      ).toBeInTheDocument()
    })

    it('o h1 tem o id correto para aria-labelledby', () => {
      render(<GuideCategoryHeader category={mockCategoryWithImage} />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveAttribute('id', GUIDE_CATEGORY_HEADING_ID)
    })

    it('renderiza a descrição da categoria', () => {
      render(<GuideCategoryHeader category={mockCategoryWithImage} />)
      expect(
        screen.getByText('Saiba como agendar consultas pelo SUS.')
      ).toBeInTheDocument()
    })

    it('renderiza o banner informativo da página de categoria', () => {
      render(<GuideCategoryHeader category={mockCategoryWithImage} />)
      expect(
        screen.getByText(GUIDE_CONTENT.categoryPage.infoBanner)
      ).toBeInTheDocument()
    })
  })

  describe('Imagem condicional', () => {
    it('renderiza a imagem quando a categoria tem uma associada', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'src',
        '/fake-category.png'
      )
    })

    it('não renderiza imagem quando a categoria não tem uma associada', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithoutImage} />
      )
      expect(container.querySelector('img')).not.toBeInTheDocument()
    })

    it('a imagem é carregada com eager para evitar LCP tardio', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      expect(container.querySelector('img')).toHaveAttribute('loading', 'eager')
    })

    it('a imagem tem fetchPriority high para prioridade de carregamento LCP', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      expect(container.querySelector('img')).toHaveAttribute(
        'fetchpriority',
        'high'
      )
    })
  })

  describe('Acessibilidade', () => {
    it('a imagem é decorativa e oculta de leitores de tela', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', '')
      expect(img).toHaveAttribute('aria-hidden', 'true')
    })

    it('a imagem tem atributos de dimensão para prevenir CLS', () => {
      const { container } = render(
        <GuideCategoryHeader category={mockCategoryWithImage} />
      )
      const img = container.querySelector('img')
      expect(Number(img?.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(img?.getAttribute('height'))).toBeGreaterThan(0)
    })
  })
})
