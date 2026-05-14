import {
  createBreadcrumb,
  ORGANIZATION_STRUCTURED_DATA,
} from '@components/data'
import { Container, PageShell } from '@components/layout'
import { BreadcrumbSchema, JsonLdScript } from '@components/seo'
import { useDocumentMeta } from '@hooks/useDocumentMeta'
import { useScrollToTop } from '@hooks/useScrollToTop'

import { GuideCategoryCard } from '../components'
import {
  GUIDE_CATEGORIES,
  GUIDE_CATEGORIES_HEADING_ID,
  GUIDE_COLLECTION_PAGE_STRUCTURED_DATA,
  GUIDE_CONTENT,
  GUIDE_HEADING_ID,
} from '../data'

const breadcrumbItems = createBreadcrumb([
  { name: 'Início', url: '/' },
  { name: 'Guia do SUS' },
])

export function GuidePage() {
  useDocumentMeta({
    title: GUIDE_CONTENT.seo.title,
    description: GUIDE_CONTENT.seo.description,
  })
  useScrollToTop()

  return (
    <PageShell
      mainContentLabel={GUIDE_CONTENT.seo.title}
      schemas={
        <>
          <JsonLdScript data={ORGANIZATION_STRUCTURED_DATA} />
          <JsonLdScript data={GUIDE_COLLECTION_PAGE_STRUCTURED_DATA} />
          <BreadcrumbSchema items={breadcrumbItems} />
        </>
      }
    >
      <GuideHero />
      <GuideCategories />
    </PageShell>
  )
}

const GuideHero = () => (
  <section
    className="bg-purple-medium py-16 sm:py-20 lg:py-24"
    aria-labelledby={GUIDE_HEADING_ID}
  >
    <Container className="flex flex-col items-center text-center">
      <span className="mb-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm sm:text-sm">
        {GUIDE_CONTENT.hero.badge}
      </span>
      <h1
        id={GUIDE_HEADING_ID}
        className="text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
      >
        {GUIDE_CONTENT.hero.headline}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
        {GUIDE_CONTENT.hero.description}
      </p>
    </Container>
  </section>
)

const GuideCategories = () => (
  <section
    className="py-12 sm:py-16 lg:py-20"
    aria-labelledby={GUIDE_CATEGORIES_HEADING_ID}
  >
    <Container>
      <div className="mb-10 text-center">
        <h2
          id={GUIDE_CATEGORIES_HEADING_ID}
          className="text-purple-deepest text-2xl font-bold sm:text-3xl"
        >
          {GUIDE_CONTENT.intro.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          {GUIDE_CONTENT.intro.description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {GUIDE_CATEGORIES.map(category => (
          <GuideCategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </Container>
  </section>
)
