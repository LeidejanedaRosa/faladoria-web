import { GUIDE_ROUTES } from '@shared/data'
import { Link } from 'react-router-dom'

import type { GuideArticle } from '../data'

interface GuideArticleCardProps {
  article: GuideArticle
}

export const GuideArticleCard = ({ article }: GuideArticleCardProps) => (
  <Link
    to={GUIDE_ROUTES.article(article.categorySlug, article.slug)}
    aria-label={article.title}
    className='group focus-visible:ring-purple-dark flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
  >
    <span className='text-purple-deepest group-hover:text-purple-medium text-base font-semibold transition-colors'>
      {article.title}
    </span>
    <p className='text-sm leading-relaxed text-gray-600'>{article.summary}</p>
  </Link>
)
