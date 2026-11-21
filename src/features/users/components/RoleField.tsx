import type { UserRole } from '@features/auth'
import { ROLE_LABELS } from '@features/panel/data/panelContent'
import { FieldMessages } from '@shared/components/ui'
import { cn } from '@shared/utils/cn'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { USERS_CONTENT } from '../data/usersContent'

const ALL_ROLES: readonly UserRole[] = ['assistant', 'manager', 'admin']
const ERROR_ID = 'role-error'

export interface RoleFieldProps {
  registration: UseFormRegisterReturn<'role'>
  error?: string
  /** The roles offered; every one by default. */
  roles?: readonly UserRole[]
}

/** A role that cannot be chosen here, shown as text with the reason. */
export const FixedRole = ({ role, hint }: { role: UserRole; hint: string }) => (
  <div className='flex flex-col gap-1'>
    <p className='text-sm font-medium text-slate-800'>
      {USERS_CONTENT.newAccount.role}
    </p>
    <p className='text-base font-semibold text-slate-900'>
      {ROLE_LABELS[role]}
    </p>
    <p className='text-sm text-slate-600'>{hint}</p>
  </div>
)

/**
 * Radios, not a select: each role comes with what it allows, read before choosing. The person's
 * reach depends on it, so the difference must be visible, not hidden in a closed list.
 */
export const RoleField = ({
  registration,
  error,
  roles = ALL_ROLES,
}: RoleFieldProps) => (
  <fieldset
    aria-describedby={error ? ERROR_ID : undefined}
    className='flex flex-col gap-2'
  >
    <legend className='mb-1.5 text-sm font-medium text-slate-800'>
      {USERS_CONTENT.newAccount.role}
    </legend>
    <div className='flex flex-col gap-2'>
      {ALL_ROLES.filter(role => roles.includes(role)).map(role => (
        <label
          key={role}
          className={cn(
            'has-[:checked]:border-purple-dark has-[:checked]:bg-lavender-light flex cursor-pointer gap-3 rounded-lg border bg-white p-3',
            error ? 'border-red-600' : 'border-slate-300'
          )}
        >
          <input
            type='radio'
            value={role}
            className='accent-purple-dark mt-1 h-5 w-5 shrink-0'
            {...registration}
          />
          <span className='flex flex-col gap-0.5'>
            <span className='text-base font-semibold text-slate-900'>
              {ROLE_LABELS[role]}
            </span>
            <span className='text-sm text-slate-600'>
              {USERS_CONTENT.roleDescriptions[role]}
            </span>
          </span>
        </label>
      ))}
    </div>
    <FieldMessages errorId={ERROR_ID} error={error} />
  </fieldset>
)
