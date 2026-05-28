import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  name: string
  url?: string
}

interface GuideBreadcrumbProps {
  items: BreadcrumbItem[]
}

export const GuideBreadcrumb = ({ items }: GuideBreadcrumbProps) => (
  <nav aria-label='Breadcrumb' className='mb-8'>
    <ol className='flex flex-wrap items-center text-sm'>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <li
            key={`${item.name}-${index}`}
            className={
              isLast
                ? undefined
                : 'flex items-center after:mx-2 after:text-gray-400 after:content-["/"]'
            }
          >
            {item.url && !isLast ? (
              <Link
                to={item.url}
                className='text-purple-dark hover:text-purple-medium transition-colors'
              >
                {item.name}
              </Link>
            ) : (
              <span
                className='text-gray-600'
                aria-current={isLast ? 'page' : undefined}
              >
                {item.name}
              </span>
            )}
          </li>
        )
      })}
    </ol>
  </nav>
)
