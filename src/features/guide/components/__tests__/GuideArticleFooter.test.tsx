import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GUIDE_CONTENT } from '../../data'
import { GuideArticleFooter } from '../GuideArticleFooter'

function renderFooter() {
  return render(<GuideArticleFooter />)
}

describe('GuideArticleFooter', () => {
  it('renderiza o bloco de ajuda', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.articlePage.help.title)
    ).toBeInTheDocument()
    expect(
      screen.getByText(GUIDE_CONTENT.articlePage.help.description)
    ).toBeInTheDocument()
  })

  it('o link de ajuda aponta para o WhatsApp e abre em nova aba', () => {
    renderFooter()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me'))
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renderiza o texto do botão CTA de ajuda', () => {
    renderFooter()
    expect(
      screen.getByText(GUIDE_CONTENT.articlePage.help.cta)
    ).toBeInTheDocument()
  })

  it('renderiza os quatro sinais de confiança', () => {
    renderFooter()
    for (const signal of GUIDE_CONTENT.articlePage.trustSignals) {
      expect(screen.getByText(signal.title)).toBeInTheDocument()
    }
  })
})
