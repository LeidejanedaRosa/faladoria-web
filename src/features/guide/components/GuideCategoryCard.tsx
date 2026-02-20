import { Link } from 'react-router-dom'

import type { GuideCategory } from '../data'
import { GUIDE_ICON_MAP } from './guideIconMap'

interface GuideCategoryCardProps {
  category: GuideCategory
  variant?: 'default' | 'highlight'
}

const VARIANT_STYLES = {
  default: {
    link: 'group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-purple-dark hover:shadow-lg focus-visible:ring-2 focus-visible:ring-purple-medium focus-visible:ring-offset-2 focus-visible:outline-none',
    heading: 'text-purple-deepest mb-2 text-lg font-semibold',
  },
  highlight: {
    link: 'group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all hover:border-purple-dark hover:shadow-lg focus-visible:ring-2 focus-visible:ring-purple-medium focus-visible:ring-offset-2 focus-visible:outline-none',
    heading: 'text-purple-deepest mb-1 text-lg font-semibold',
  },
} as const

export const GuideCategoryCard = ({
  category,
  variant = 'default',
}: GuideCategoryCardProps) => {
  const Icon = GUIDE_ICON_MAP[category.iconName]
  const styles = VARIANT_STYLES[variant]

  return (
    <Link
      to={`/guia-do-sus/${category.slug}`}
      aria-label={category.label}
      aria-describedby={`guide-card-desc-${category.slug}`}
      className={styles.link}
    >
      <div className="bg-lavender-light text-purple-dark group-hover:bg-purple-dark mb-4 inline-flex rounded-xl p-3 transition-colors group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className={styles.heading}>{category.label}</h3>
      <p
        id={`guide-card-desc-${category.slug}`}
        className="text-sm leading-relaxed text-gray-600"
      >
        {category.description}
      </p>
    </Link>
  )
}
