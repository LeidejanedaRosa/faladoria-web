import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { ActionStepBlock } from '../../data'
import { GuideActionStepCard } from '../GuideActionStepCard'
import type { CategoryTheme } from '../guideCategoryTheme'

vi.mock('../guideImageMap', () => ({
  SHARED_STEP_IMAGES: {
    ubs: '/mock-ubs.webp',
    calendar: '/mock-calendar.webp',
  },
}))

const mockTheme: CategoryTheme = {
  iconBg: 'bg-purple-500',
  iconBgLight: 'bg-purple-100',
  softBg: 'bg-purple-50',
  border: 'border-purple-200',
  borderHover: 'hover:border-purple-300',
  text: 'text-purple-700',
  textAccent: 'text-purple-600',
}

function makeBlock(overrides: Partial<ActionStepBlock> = {}): ActionStepBlock {
  return { type: 'action-step', action: 'Vá à UBS', ...overrides }
}

function renderCard(block: ActionStepBlock = makeBlock(), stepIndex = 1) {
  return render(
    <ul>
      <GuideActionStepCard
        block={block}
        stepIndex={stepIndex}
        theme={mockTheme}
      />
    </ul>
  )
}

describe('GuideActionStepCard', () => {
  describe('Content', () => {
    it('renders the action text as h3', () => {
      renderCard(makeBlock({ action: 'Vá à UBS' }))
      expect(
        screen.getByRole('heading', { level: 3, name: 'Vá à UBS' })
      ).toBeInTheDocument()
    })

    it('renders the detail paragraph when provided', () => {
      renderCard(makeBlock({ detail: 'Leve o Cartão do SUS.' }))
      expect(screen.getByText('Leve o Cartão do SUS.')).toBeInTheDocument()
    })

    it('does not render a detail paragraph when omitted', () => {
      const { container } = renderCard(makeBlock({ detail: undefined }))
      expect(container.querySelector('p')).not.toBeInTheDocument()
    })
  })

  describe('Step numbering', () => {
    it('renders the step index inside the badge', () => {
      renderCard(makeBlock(), 3)
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('renders the badge span with aria-hidden', () => {
      const { container } = renderCard(makeBlock(), 2)
      const badge = container.querySelector('span[aria-hidden="true"]')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('2')
    })
  })

  describe('Accessibility', () => {
    it('renders the list item with aria-label "Passo N"', () => {
      renderCard(makeBlock(), 4)
      expect(
        screen.getByRole('listitem', { name: 'Passo 4' })
      ).toBeInTheDocument()
    })
  })

  describe('Conditional link', () => {
    it('renders an accessible link when link is provided', () => {
      renderCard(
        makeBlock({ link: { label: 'Acessar gov.br', href: 'https://gov.br' } })
      )
      expect(
        screen.getByRole('link', { name: /Acessar gov\.br/i })
      ).toBeInTheDocument()
    })

    it('does not render a link when link is omitted', () => {
      renderCard(makeBlock({ link: undefined }))
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('opens the link in a new tab', () => {
      renderCard(
        makeBlock({ link: { label: 'Acessar gov.br', href: 'https://gov.br' } })
      )
      expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    })

    it('has rel noopener noreferrer for security', () => {
      renderCard(
        makeBlock({ link: { label: 'Acessar gov.br', href: 'https://gov.br' } })
      )
      expect(screen.getByRole('link')).toHaveAttribute(
        'rel',
        'noopener noreferrer'
      )
    })
  })

  describe('Conditional image', () => {
    it('renders an image when imageKey is provided', () => {
      const { container } = renderCard(makeBlock({ imageKey: 'ubs' }))
      const img = container.querySelector('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', '/mock-ubs.webp')
    })

    it('does not render an image when imageKey is omitted', () => {
      const { container } = renderCard(makeBlock({ imageKey: undefined }))
      expect(container.querySelector('img')).toBeNull()
    })

    it('the image is decorative: empty alt and aria-hidden', () => {
      const { container } = renderCard(makeBlock({ imageKey: 'ubs' }))
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('alt', '')
      expect(img).toHaveAttribute('aria-hidden', 'true')
    })

    it('the image has explicit dimensions and lazy loading', () => {
      const { container } = renderCard(makeBlock({ imageKey: 'ubs' }))
      const img = container.querySelector('img')
      expect(img).toHaveAttribute('width', '200')
      expect(img).toHaveAttribute('height', '144')
      expect(img).toHaveAttribute('loading', 'lazy')
    })
  })
})
