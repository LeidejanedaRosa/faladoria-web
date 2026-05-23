import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { HomePage } from '../HomePage'

vi.mock('@shared/hooks/useDocumentMeta', () => ({
  useDocumentMeta: vi.fn(),
}))
vi.mock('@shared/components/layout', () => ({
  PageShell: ({ children }: { children: React.ReactNode }) => (
    <main>{children}</main>
  ),
}))
vi.mock('@shared/components/seo', () => ({
  BreadcrumbSchema: () => null,
  JsonLdScript: () => null,
}))
vi.mock('../../components/sections', () => ({
  HeroSection: () => <section id='hero' />,
  ProblemSection: () => null,
  SolutionSection: () => null,
  HowItWorksSection: () => null,
  TransparencySection: () => null,
  AboutSection: () => null,
  GuideHighlightSection: () => null,
  FaqSection: () => null,
}))
vi.mock('../../data/faqContent', () => ({
  FAQ_CONTENT: { items: [] },
}))
vi.mock('@shared/data/structuredData', () => ({
  createFaqStructuredData: vi.fn(() => ({})),
  HOMEPAGE_BREADCRUMB: [],
  ORGANIZATION_STRUCTURED_DATA: {},
}))
vi.mock('@shared/data/companyInfo', () => ({
  COMPANY_INFO: { shortDescription: 'Faladoria', description: 'Desc' },
}))

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  )
}

describe('HomePage — scroll to anchor on mount', () => {
  let mockScrollIntoView: ReturnType<typeof vi.fn>
  let mockQuerySelector: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0)
      return 0
    })
    mockScrollIntoView = vi.fn()
    mockQuerySelector = vi
      .spyOn(document, 'querySelector')
      .mockImplementation((selector: string) => {
        if (selector === '#hero') {
          return { scrollIntoView: mockScrollIntoView } as unknown as Element
        }
        return null
      })
  })

  afterEach(() => {
    mockQuerySelector.mockRestore()
    vi.unstubAllGlobals()
  })

  it('does nothing when hash is empty', () => {
    vi.stubGlobal('location', { hash: '' })
    renderHomePage()
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })

  it('scrolls to the matching element when hash is present', () => {
    vi.stubGlobal('location', { hash: '#hero' })
    renderHomePage()
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'instant' })
  })

  it('does nothing when the hash element does not exist in the DOM', () => {
    vi.stubGlobal('location', { hash: '#nao-existe' })
    renderHomePage()
    expect(mockScrollIntoView).not.toHaveBeenCalled()
  })
})
