import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GUIDE_CONTENT } from '../../data'
import { GuideArticleFooter } from '../GuideArticleFooter'

function renderFooter() {
  return render(<GuideArticleFooter />)
}

describe('GuideArticleFooter', () => {
  it('renders the help block', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.articlePage.help.title)
    ).toBeInTheDocument()
    expect(
      screen.getByText(GUIDE_CONTENT.articlePage.help.description)
    ).toBeInTheDocument()
  })

  it('the help link points to WhatsApp and opens in a new tab', () => {
    renderFooter()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'))
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the help CTA button text', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.articlePage.help.cta)
    ).toBeInTheDocument()
  })

  it('renders all four trust signals', () => {
    renderFooter()
    for (const signal of GUIDE_CONTENT.articlePage.trustSignals) {
      expect(screen.getByText(signal.title)).toBeInTheDocument()
    }
  })
})
