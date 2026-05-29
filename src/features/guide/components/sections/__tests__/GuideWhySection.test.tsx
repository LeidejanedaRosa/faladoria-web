import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GUIDE_CONTENT } from '../../../data'
import { GuideWhySection } from '../GuideWhySection'

function renderSection() {
  return render(<GuideWhySection />)
}

describe('GuideWhySection', () => {
  describe('Structure & Accessibility', () => {
    it('should render a region landmark labeled by the section heading', () => {
      renderSection()

      expect(
        screen.getByRole('region', { name: GUIDE_CONTENT.why.heading })
      ).toBeInTheDocument()
    })

    it('should render h2 with the section heading', () => {
      renderSection()

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: GUIDE_CONTENT.why.heading,
        })
      ).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should render one list item per why item', () => {
      renderSection()

      expect(screen.getAllByRole('listitem')).toHaveLength(
        GUIDE_CONTENT.why.items.length
      )
    })

    it('should render the title of each why item', () => {
      renderSection()

      GUIDE_CONTENT.why.items.forEach(item => {
        expect(screen.getByText(item.title)).toBeInTheDocument()
      })
    })

    it('should render the description of each why item', () => {
      renderSection()

      GUIDE_CONTENT.why.items.forEach(item => {
        expect(screen.getByText(item.description)).toBeInTheDocument()
      })
    })

    it('should render icons with aria-hidden', () => {
      const { container } = renderSection()

      container.querySelectorAll('svg').forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })
})
