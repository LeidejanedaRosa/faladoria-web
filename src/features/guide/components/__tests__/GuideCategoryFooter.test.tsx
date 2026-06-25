import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GUIDE_CONTENT } from '../../data'
import { GuideCategoryFooter } from '../GuideCategoryFooter'

function renderFooter() {
  return render(<GuideCategoryFooter />)
}

describe('GuideCategoryFooter', () => {
  it('renders the tip block title', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.categoryPage.tip.title)
    ).toBeInTheDocument()
  })

  it('renders the tip block description', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.categoryPage.tip.description)
    ).toBeInTheDocument()
  })

  it('renders the help block title', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.categoryPage.help.title)
    ).toBeInTheDocument()
  })

  it('renders the help block description', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.categoryPage.help.description)
    ).toBeInTheDocument()
  })

  it('the help link points to WhatsApp and opens in a new tab', () => {
    renderFooter()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'))
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('the help link has an accessible label for external navigation', () => {
    renderFooter()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'aria-label',
      expect.stringContaining('abre em nova aba')
    )
  })
})
