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
  describe('Content', () => {
    it('should render the category label as accessible link text', () => {
      renderCard()

      expect(screen.getByText('Seus Direitos')).toBeInTheDocument()
    })

    it('should render a link with the category label as accessible name', () => {
      renderCard()

      expect(
        screen.getByRole('link', { name: mockCategory.label })
      ).toHaveAttribute('href', GUIDE_ROUTES.category(mockCategory.slug))
    })

    it('should render the icon with aria-hidden', () => {
      const { container } = renderCard()

      const icon = container.querySelector('svg')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
