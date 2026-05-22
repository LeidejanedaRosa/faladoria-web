import { Container, PageShell } from '@shared/components/layout'
import { BreadcrumbSchema } from '@shared/components/seo'
import { createBreadcrumb } from '@shared/data/structuredData'
import { useDocumentMeta } from '@shared/hooks/useDocumentMeta'
import { useScrollToTop } from '@shared/hooks/useScrollToTop'

import type { LegalSection } from '../data/privacyPolicyContent'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  sections: readonly LegalSection[]
}

export function LegalPageLayout({
  title,
  lastUpdated,
  sections,
}: LegalPageLayoutProps) {
  useDocumentMeta({ title })
  useScrollToTop()

  const breadcrumbItems = createBreadcrumb([
    { name: 'Início', url: '/' },
    { name: title },
  ])

  return (
    <PageShell
      mainContentLabel={title}
      schemas={<BreadcrumbSchema items={breadcrumbItems} />}
    >
      <Container className='py-12 sm:py-16 lg:py-20'>
        <nav aria-label='Breadcrumb' className='mb-8'>
          <a
            href='/'
            className='text-purple-dark hover:text-purple-medium text-sm font-medium transition-colors'
          >
            &larr; Voltar para a página inicial
          </a>
        </nav>

        <article className='mx-auto max-w-3xl'>
          <header className='mb-10'>
            <h1 className='text-purple-deepest text-3xl font-bold sm:text-4xl'>
              {title}
            </h1>
            <p className='mt-2 text-sm text-gray-500'>
              Última atualização: {lastUpdated}
            </p>
          </header>

          <div className='space-y-8'>
            {sections.map(section => (
              <LegalSectionContent key={section.id} section={section} />
            ))}
          </div>
        </article>
      </Container>
    </PageShell>
  )
}

function LegalSectionContent({ section }: { section: LegalSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-heading`}>
      <h2
        id={`${section.id}-heading`}
        className='text-purple-deepest mb-3 text-xl font-semibold sm:text-2xl'
      >
        {section.title}
      </h2>
      {section.paragraphs.map((paragraph, index) => (
        <p key={index} className='mt-2 leading-relaxed text-gray-700'>
          {paragraph}
        </p>
      ))}
    </section>
  )
}
