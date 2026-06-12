import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GUIDE_CONTENT } from '../../data'
import { GuideCategoryFooter } from '../GuideCategoryFooter'

function renderFooter() {
  return render(<GuideCategoryFooter />)
}

describe('GuideCategoryFooter', () => {
  it('renderiza o bloco de dica', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.categoryPage.tip.title)
    ).toBeInTheDocument()
    expect(
      screen.getByText(GUIDE_CONTENT.categoryPage.tip.description)
    ).toBeInTheDocument()
  })

  it('renderiza o bloco de ajuda', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.categoryPage.help.title)
    ).toBeInTheDocument()
    expect(
      screen.getByText(GUIDE_CONTENT.categoryPage.help.description)
    ).toBeInTheDocument()
  })

  it('o link de ajuda aponta para o WhatsApp e abre em nova aba', () => {
    renderFooter()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'))
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
