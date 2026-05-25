import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import {
  GUIDE_HIGHLIGHT_CONTENT,
  GUIDE_HIGHLIGHT_HEADING_ID,
} from '../../../data/guideHighlightContent'
import { GuideHighlightSection } from '../GuideHighlightSection'

function renderSection() {
  return render(
    <MemoryRouter>
      <GuideHighlightSection />
    </MemoryRouter>
  )
}

describe('GuideHighlightSection', () => {
  describe('Content', () => {
    it('should render the badge', () => {
      renderSection()
      expect(
        screen.getByText(GUIDE_HIGHLIGHT_CONTENT.badge)
      ).toBeInTheDocument()
    })

    it('should render the heading with correct text', () => {
      renderSection()
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: GUIDE_HIGHLIGHT_CONTENT.headline,
        })
      ).toBeInTheDocument()
    })

    it('should render the description', () => {
      renderSection()
      expect(
        screen.getByText(GUIDE_HIGHLIGHT_CONTENT.description)
      ).toBeInTheDocument()
    })

    it('should render the url indicator label', () => {
      renderSection()
      expect(
        screen.getByText(GUIDE_HIGHLIGHT_CONTENT.urlIndicator.label)
      ).toBeInTheDocument()
    })

    it('should render the url in both the indicator and the browser chrome', () => {
      renderSection()
      // URL appears twice: UrlIndicator (visible) + BrowserChrome (aria-hidden)
      const instances = screen.getAllByText(
        GUIDE_HIGHLIGHT_CONTENT.urlIndicator.url
      )
      expect(instances).toHaveLength(2)
    })
  })

  describe('CTA', () => {
    it('should render the CTA link with correct href', () => {
      renderSection()
      const link = screen.getByRole('link', {
        name: GUIDE_HIGHLIGHT_CONTENT.cta.ariaLabel,
      })
      expect(link).toHaveAttribute('href', GUIDE_HIGHLIGHT_CONTENT.cta.href)
    })

    it('should render the CTA link label text', () => {
      renderSection()
      expect(
        screen.getByRole('link', {
          name: GUIDE_HIGHLIGHT_CONTENT.cta.ariaLabel,
        })
      ).toHaveTextContent(GUIDE_HIGHLIGHT_CONTENT.cta.label)
    })
  })

  describe('Accessibility', () => {
    it('should label the section via aria-labelledby pointing to the heading id', () => {
      const { container } = renderSection()
      const section = container.querySelector('section')
      expect(section).toHaveAttribute(
        'aria-labelledby',
        GUIDE_HIGHLIGHT_HEADING_ID
      )
    })

    it('should have the heading id matching aria-labelledby', () => {
      renderSection()
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: GUIDE_HIGHLIGHT_CONTENT.headline,
        })
      ).toHaveAttribute('id', GUIDE_HIGHLIGHT_HEADING_ID)
    })

    it('should hide the browser mockup from screen readers', () => {
      renderSection()
      const img = screen.getByAltText(GUIDE_HIGHLIGHT_CONTENT.bannerAlt)
      const mockup = img.closest('[aria-hidden="true"]')
      expect(mockup).toBeInTheDocument()
    })

    it('should contain no interactive elements inside the browser mockup', () => {
      renderSection()
      const img = screen.getByAltText(GUIDE_HIGHLIGHT_CONTENT.bannerAlt)
      const mockup = img.closest('[aria-hidden="true"]')
      expect(mockup?.querySelectorAll('a, button, [tabindex]')).toHaveLength(0)
    })

    it('should render the screen reader description', () => {
      renderSection()
      expect(
        screen.getByText(GUIDE_HIGHLIGHT_CONTENT.screenReaderDescription)
      ).toBeInTheDocument()
    })
  })

  describe('Banner image', () => {
    it('should render the banner with descriptive alt text', () => {
      renderSection()
      expect(
        screen.getByAltText(GUIDE_HIGHLIGHT_CONTENT.bannerAlt)
      ).toBeInTheDocument()
    })

    it('should render the banner with lazy loading', () => {
      renderSection()
      expect(
        screen.getByAltText(GUIDE_HIGHLIGHT_CONTENT.bannerAlt)
      ).toHaveAttribute('loading', 'lazy')
    })

    it('should render the banner with explicit dimensions to prevent CLS', () => {
      renderSection()
      const img = screen.getByAltText(GUIDE_HIGHLIGHT_CONTENT.bannerAlt)
      expect(img).toHaveAttribute('width', '1280')
      expect(img).toHaveAttribute('height', '720')
    })
  })
})
