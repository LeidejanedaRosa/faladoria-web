import { useRef } from 'react'

import { Button } from '@shared/components/ui'
import { cn } from '@shared/utils/cn'

import { type AccountGroup } from '../data/accountGroups'
import { USERS_CONTENT } from '../data/usersContent'
import { useAccountFilters } from '../hooks/useAccountFilters'
import type { User } from '../services/usersApi'
import { filterAccounts, isFiltering, placesOf } from '../utils/accountFilters'
import { ACCOUNT_COLUMNS } from './accountColumns'
import { AccountFilters } from './AccountFilters'
import { AccountItem } from './AccountItem'

const { list, filters: filtersContent } = USERS_CONTENT

// Visual only: each row already names its values for screen readers (dt).
const ColumnHeader = () => (
  <div
    aria-hidden='true'
    className={cn(
      'hidden border-b border-slate-200 px-5 py-3 text-sm font-medium text-slate-600',
      ACCOUNT_COLUMNS
    )}
  >
    <span>{USERS_CONTENT.newAccount.name}</span>
    <span>{list.role}</span>
    <span>{list.cities}</span>
    <span>{list.status}</span>
    <span className='text-right'>{list.openCases}</span>
    <span />
  </div>
)

interface FilterSummaryProps {
  filtering: boolean
  shown: number
  total: number
  onClear: () => void
}

// Always mounted, so each new count is announced; out of the layout while unfiltered.
const FilterSummary = ({
  filtering,
  shown,
  total,
  onClear,
}: FilterSummaryProps) => (
  <div
    className={cn(
      'flex flex-wrap items-center gap-x-4 gap-y-2',
      !filtering && 'sr-only'
    )}
  >
    <p role='status' className='text-sm text-slate-600'>
      {filtering ? filtersContent.showing(shown, total) : ''}
    </p>
    {filtering && (
      <Button variant='secondary' onClick={onClear}>
        {filtersContent.clear}
      </Button>
    )}
  </div>
)

interface FilteredAccountListProps {
  /** The folder's accounts, already loaded. */
  users: User[]
  group: AccountGroup
  selfId: string
}

export const FilteredAccountList = ({
  users,
  group,
  selfId,
}: FilteredAccountListProps) => {
  const places = placesOf(users)
  const { filters, setState, setCity, setSearch, clear } =
    useAccountFilters(places)
  const firstFilterRef = useRef<HTMLSelectElement>(null)
  // The signed-in admin is always in the team: "empty" means nobody else, and nothing to filter.
  const hasOthers = users.some(user => user.id !== selfId)
  const filtering = hasOthers && isFiltering(filters)
  const shown = filtering ? filterAccounts(users, filters) : users

  return (
    <div className='flex flex-col gap-4'>
      {hasOthers && (
        <AccountFilters
          filters={filters}
          places={places}
          stateRef={firstFilterRef}
          onStateChange={setState}
          onCityChange={setCity}
          onSearchChange={setSearch}
        />
      )}

      <FilterSummary
        filtering={filtering}
        shown={shown.length}
        total={users.length}
        onClear={() => {
          clear()
          // The button leaves with the filters: focus would fall on the page.
          firstFilterRef.current?.focus()
        }}
      />

      <div className='rounded-xl border border-slate-200 bg-white'>
        {shown.length > 0 && (
          <>
            <ColumnHeader />
            <ul>
              {shown.map(user => (
                <AccountItem
                  key={user.id}
                  user={user}
                  isSelf={user.id === selfId}
                />
              ))}
            </ul>
          </>
        )}
        {(!hasOthers || shown.length === 0) && (
          <p className='border-t border-slate-100 p-4 text-base text-slate-600 first:border-t-0 sm:px-5'>
            {hasOthers
              ? filtersContent.empty
              : USERS_CONTENT.groups[group].empty}
          </p>
        )}
      </div>
    </div>
  )
}
