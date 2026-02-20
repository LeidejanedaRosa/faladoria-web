import { Link } from 'react-router-dom'

import { Container } from '@components/layout'

import { GUIDE_CONTENT } from '../data'
import type { GuideCategory } from '../data'

interface GuideCategoryLayoutProps {
  category: GuideCategory
}

export const GuideCategoryLayout = ({ category }: GuideCategoryLayoutProps) => {
  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              to="/"
              className="text-purple-dark hover:text-purple-medium transition-colors"
            >
              Início
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">
            /
          </li>
          <li>
            <Link
              to="/guia-do-sus"
              className="text-purple-dark hover:text-purple-medium transition-colors"
            >
              Guia do SUS
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">
            /
          </li>
          <li>
            <span className="text-gray-600" aria-current="page">
              {category.label}
            </span>
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-3xl">
        <header className="mb-10">
          <h1 className="text-purple-deepest text-3xl font-bold sm:text-4xl">
            {category.label}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-gray-600">
            {category.description}
          </p>
        </header>

        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
          <p className="text-lg font-medium text-gray-500">
            {GUIDE_CONTENT.comingSoon.heading}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {GUIDE_CONTENT.comingSoon.description}
          </p>
        </div>
      </article>
    </Container>
  )
}
