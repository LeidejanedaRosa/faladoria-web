import type { UserRole } from '@features/auth/services/authApi'
import { ROLE_LABELS } from '@features/panel/data/panelContent'
import { FieldMessages } from '@shared/components/ui'
import { cn } from '@shared/utils/cn'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { USERS_CONTENT } from '../data/usersContent'

const ROLES: readonly UserRole[] = ['assistant', 'manager', 'admin']
const ERROR_ID = 'role-error'

interface RoleFieldProps {
  registration: UseFormRegisterReturn<'role'>
  error?: string
}

/**
 * Radios, not a select: each role comes with what it allows, read before choosing. The person's
 * reach depends on it, so the difference must be visible, not hidden in a closed list.
 */
export const RoleField = ({ registration, error }: RoleFieldProps) => (
  <fieldset
    aria-describedby={error ? ERROR_ID : undefined}
    className='flex flex-col gap-2'
  >
    <legend className='mb-1.5 text-sm font-medium text-slate-800'>
      {USERS_CONTENT.newAccount.role}
    </legend>
    <div className='grid grid-cols-1 gap-2 md:grid-cols-3'>
      {ROLES.map(role => (
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
