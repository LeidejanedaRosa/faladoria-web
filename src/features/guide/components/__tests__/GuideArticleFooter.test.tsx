import { WHATSAPP_URL } from '@shared/data/companyInfo'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { GUIDE_CONTENT } from '../../data'
import { GuideArticleFooter } from '../GuideArticleFooter'

function renderFooter() {
  return render(<GuideArticleFooter />)
}

describe('GuideArticleFooter', () => {
  describe('Seção de ajuda', () => {
    it('renderiza o título da seção de ajuda', () => {
      renderFooter()
      expect(
        screen.getByText(GUIDE_CONTENT.articlePage.help.title)
      ).toBeInTheDocument()
    })

    it('renderiza a descrição da seção de ajuda', () => {
      renderFooter()
      expect(
        screen.getByText(GUIDE_CONTENT.articlePage.help.description)
      ).toBeInTheDocument()
    })

    it('renderiza o link de CTA com o texto correto', () => {
      renderFooter()
      expect(
        screen.getByRole('link', { name: GUIDE_CONTENT.articlePage.help.cta })
      ).toBeInTheDocument()
    })

    it('o link aponta para o WHATSAPP_URL', () => {
      renderFooter()
      expect(
        screen.getByRole('link', { name: GUIDE_CONTENT.articlePage.help.cta })
      ).toHaveAttribute('href', WHATSAPP_URL)
    })
  })

  describe('Segurança do link externo', () => {
    it('o link abre em nova aba', () => {
      renderFooter()
      expect(
        screen.getByRole('link', { name: GUIDE_CONTENT.articlePage.help.cta })
      ).toHaveAttribute('target', '_blank')
    })

    it('o link tem rel="noopener noreferrer"', () => {
      renderFooter()
      expect(
        screen.getByRole('link', { name: GUIDE_CONTENT.articlePage.help.cta })
      ).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Trust signals', () => {
    it('renderiza todos os trust signals', () => {
      renderFooter()
      const { trustSignals } = GUIDE_CONTENT.articlePage
      trustSignals.forEach(signal => {
        expect(screen.getByText(signal.title)).toBeInTheDocument()
      })
    })

    it('renderiza a descrição de cada trust signal', () => {
      renderFooter()
      const { trustSignals } = GUIDE_CONTENT.articlePage
      trustSignals.forEach(signal => {
        expect(screen.getByText(signal.description)).toBeInTheDocument()
      })
    })
  })
})
