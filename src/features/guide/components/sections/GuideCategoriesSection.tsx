import { Container } from '@shared/components/layout'

import {
  GUIDE_CATEGORIES,
  GUIDE_CATEGORIES_HEADING_ID,
  GUIDE_CATEGORIES_SECTION_ID,
  GUIDE_CONTENT,
} from '../../data'
import { GuideCategoryCard } from '../GuideCategoryCard'

export const GuideCategoriesSection = () => (
  <section
    id={GUIDE_CATEGORIES_SECTION_ID}
    className='py-12 sm:py-16 lg:py-20'
    aria-labelledby={GUIDE_CATEGORIES_HEADING_ID}
  >
    <Container>
      <div className='mb-10 text-center'>
        <h2
          id={GUIDE_CATEGORIES_HEADING_ID}
          className='text-purple-deepest text-2xl font-bold sm:text-3xl'
        >
          {GUIDE_CONTENT.intro.heading}
        </h2>
        <p className='mx-auto mt-3 max-w-2xl text-gray-600'>
          {GUIDE_CONTENT.intro.description}
        </p>
      </div>
      <div className='grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3'>
        {GUIDE_CATEGORIES.map(category => (
          <GuideCategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </Container>
  </section>
)
