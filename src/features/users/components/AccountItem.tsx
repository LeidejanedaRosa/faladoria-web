import { ROLE_LABELS } from '@features/panel/data/panelContent'
import { PANEL_ROUTES } from '@shared/data/routes'
import { cn } from '@shared/utils/cn'
import { Link } from 'react-router-dom'

import { USERS_CONTENT } from '../data/usersContent'
import type { User } from '../services/usersApi'
import { ACCOUNT_COLUMNS } from './accountColumns'
import { StatusBadge } from './StatusBadge'

const { list, account } = USERS_CONTENT

const citiesOf = (user: User) => {
  if (user.role === 'admin') return list.allCities
  if (user.assignedCities.length === 0) return list.noCity
  return user.assignedCities
    .map(({ city, state }) => `${city}/${state}`)
    .join(', ')
}

interface AccountItemProps {
  user: User
  isSelf: boolean
}

/**
 * One account: a card on the phone, a row of columns from `lg` up. Each value keeps its label
 * (dt): visible on the phone, read by screen readers everywhere; the desktop shows the header.
 */
export const AccountItem = ({ user, isSelf }: AccountItemProps) => (
  <li
    className={cn(
      'flex flex-col gap-3 border-b border-slate-100 p-4 last:border-b-0 sm:px-5',
      ACCOUNT_COLUMNS
    )}
  >
    <div className='flex min-w-0 flex-col'>
      <p className='text-base font-semibold break-words text-slate-900'>
        {user.name}
        {isSelf && (
          <span className='ml-2 text-sm font-normal text-slate-600'>
            ({list.you})
          </span>
        )}
      </p>
      <p className='text-sm break-all text-slate-600'>{user.email}</p>
    </div>
    {/* subgrid: the values share the row's columns, and the <dl> stays a real list. */}
    <dl className='flex flex-col gap-2 lg:col-span-4 lg:grid lg:grid-cols-subgrid lg:items-center'>
      <div className='flex items-baseline gap-2 lg:block'>
        <dt className='text-sm text-slate-600 lg:sr-only'>{list.role}:</dt>
        <dd className='text-base text-slate-800'>{ROLE_LABELS[user.role]}</dd>
      </div>
      <div className='flex items-baseline gap-2 lg:block'>
        <dt className='text-sm text-slate-600 lg:sr-only'>{list.cities}:</dt>
        <dd className='text-base break-words text-slate-800'>
          {citiesOf(user)}
        </dd>
      </div>
      <div className='flex items-center gap-2 lg:block'>
        <dt className='text-sm text-slate-600 lg:sr-only'>{list.status}:</dt>
        <dd>
          <StatusBadge status={user.status} />
        </dd>
      </div>
      <div className='flex items-baseline gap-2 lg:block lg:text-right'>
        <dt className='text-sm text-slate-600 lg:sr-only'>{list.openCases}:</dt>
        <dd className='text-base text-slate-800 tabular-nums'>
          {user.assignedComplaintCount}
        </dd>
      </div>
    </dl>
    <Link
      to={PANEL_ROUTES.account(user.id)}
      aria-label={account.editLabel(user.name)}
      className='text-purple-dark inline-flex min-h-12 w-fit items-center rounded-lg border border-slate-300 bg-white px-4 text-base font-semibold hover:bg-slate-50'
    >
      {account.edit}
    </Link>
  </li>
)
