import { type ComponentProps, useId } from 'react'

import { cn } from '@shared/utils/cn'
import { joinIds } from '@shared/utils/joinIds'

import { FieldMessages } from './FieldMessages'

interface SelectFieldProps extends ComponentProps<'select'> {
  label: string
  hint?: string
  error?: string
}

/** A native select: the phone's own picker and full keyboard and screen-reader support for free. */
export const SelectField = ({
  label,
  hint,
  error,
  id,
  className,
  children,
  ...selectProps
}: SelectFieldProps) => {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const hintId = `${selectId}-hint`
  const errorId = `${selectId}-error`

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={selectId} className='text-sm font-medium text-slate-800'>
        {label}
      </label>
      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={joinIds(hint && hintId, error && errorId)}
        className={cn(
          'min-h-12 w-full rounded-lg border bg-white px-3 text-base text-slate-900',
          error ? 'border-red-600' : 'border-slate-300'
        )}
        {...selectProps}
      >
        {children}
      </select>
      <FieldMessages
        hintId={hintId}
        hint={hint}
        errorId={errorId}
        error={error}
      />
    </div>
  )
}
