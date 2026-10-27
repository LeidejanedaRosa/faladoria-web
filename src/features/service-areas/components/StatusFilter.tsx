import { cn } from '@shared/utils/cn'
import { Link } from 'react-router-dom'

import { SERVICE_AREAS_CONTENT } from '../data/serviceAreasContent'
import type { ServiceAreaStatus } from '../services/serviceAreasApi'

const { list } = SERVICE_AREAS_CONTENT

export const REMOVED_QUERY = 'situacao=removidas'

interface StatusFilterProps {
  current: ServiceAreaStatus
  counts: Partial<Record<ServiceAreaStatus, number>>
}

const OPTIONS: { status: ServiceAreaStatus; label: string; search: string }[] =
  [
    { status: 'active', label: list.active, search: '' },
    { status: 'removed', label: list.removed, search: `?${REMOVED_QUERY}` },
  ]

/**
 * Links, not tabs: each list has its own address, so the back button and a shared link work.
 * aria-current says which one is showing.
 */
export const StatusFilter = ({ current, counts }: StatusFilterProps) => (
  <nav aria-label={list.tabsLabel}>
    <ul className='inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1'>
      {OPTIONS.map(({ status, label, search }) => {
        const isCurrent = status === current
        const count = counts[status]
        return (
          <li key={status}>
            <Link
              to={{ search }}
              replace
              aria-current={isCurrent ? 'true' : undefined}
              className={cn(
                'flex min-h-12 items-center rounded-md px-4 text-base font-medium transition-colors motion-reduce:transition-none',
                isCurrent
                  ? 'text-purple-dark bg-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900'
              )}
            >
              {label}
              {count !== undefined && (
                <span className='ml-2 text-sm text-slate-600'>({count})</span>
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  </nav>
)
