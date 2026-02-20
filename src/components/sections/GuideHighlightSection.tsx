import { Link } from 'react-router-dom'

import {
  GUIDE_HIGHLIGHT_CONTENT,
  GUIDE_HIGHLIGHT_HEADING_ID,
} from '@components/data'
import { Container } from '@components/layout'
import { ScreenReaderOnly } from '@components/ui'
import { GuideCategoryCard, GUIDE_CATEGORIES } from '@features/guide'
import type { GuideCategory } from '@features/guide'

const highlightedCategories = GUIDE_HIGHLIGHT_CONTENT.highlightedCategories
  .map(slug => GUIDE_CATEGORIES.find(c => c.slug === slug))
  .filter((c): c is GuideCategory => c !== undefined)

export const GuideHighlightSection = () => {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby={GUIDE_HIGHLIGHT_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <p>{GUIDE_HIGHLIGHT_CONTENT.screenReaderDescription}</p>
      </ScreenReaderOnly>

      <Container>
        <div className="text-center">
          <span className="text-purple-dark mb-3 inline-block text-sm font-semibold tracking-wide uppercase">
            {GUIDE_HIGHLIGHT_CONTENT.badge}
          </span>
          <h2
            id={GUIDE_HIGHLIGHT_HEADING_ID}
            className="text-purple-deepest text-3xl font-bold sm:text-4xl"
          >
            {GUIDE_HIGHLIGHT_CONTENT.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            {GUIDE_HIGHLIGHT_CONTENT.description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {highlightedCategories.map(category => (
            <GuideCategoryCard
              key={category.slug}
              category={category}
              variant="highlight"
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to={GUIDE_HIGHLIGHT_CONTENT.cta.href}
            className="text-purple-dark hover:text-purple-medium focus-visible:ring-purple-medium inline-flex items-center gap-2 rounded text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label={GUIDE_HIGHLIGHT_CONTENT.cta.ariaLabel}
          >
            {GUIDE_HIGHLIGHT_CONTENT.cta.label}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
