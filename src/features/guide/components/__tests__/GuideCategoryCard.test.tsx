import { GUIDE_ROUTES } from '@shared/data'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import type { GuideCategory } from '../../data'
import { GuideCategoryCard } from '../GuideCategoryCard'

const mockCategory: GuideCategory = {
  slug: 'seus-direitos',
  label: 'Seus Direitos',
  description:
    'Conheça seus direitos como usuário do SUS e saiba como exigi-los.',
  iconName: 'shield',
  color: 'purple',
}

function renderCard() {
  return render(
    <MemoryRouter>
      <GuideCategoryCard category={mockCategory} />
    </MemoryRouter>
  )
}

describe('GuideCategoryCard', () => {
  describe('Conteúdo', () => {
    it('renderiza o nome da categoria', () => {
      renderCard()
      expect(screen.getByText('Seus Direitos')).toBeInTheDocument()
    })

    it('renderiza a descrição da categoria', () => {
      renderCard()
      expect(screen.getByText(mockCategory.description)).toBeInTheDocument()
    })

    it('renderiza o link com href correto para a categoria', () => {
      renderCard()
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        GUIDE_ROUTES.category(mockCategory.slug)
      )
    })

    it('o nome e a descrição compõem o nome acessível do link', () => {
      renderCard()
      expect(
        screen.getByRole('link', {
          name: `${mockCategory.label} ${mockCategory.description}`,
        })
      ).toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('o ícone está oculto de leitores de tela', () => {
      const { container } = renderCard()
      const icon = container.querySelector('svg')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
