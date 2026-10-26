import { type ComponentProps, type ReactNode, useId } from 'react'

import { cn } from '@shared/utils/cn'

export interface TextFieldProps extends ComponentProps<'input'> {
  label: string
  hint?: string
  error?: string
  /** Placed inside the field, on the right (e.g. the show-password button). */
  endAdornment?: ReactNode
}

const joinIds = (...ids: (string | false | undefined)[]) =>
  ids.filter(Boolean).join(' ') || undefined

export const TextField = ({
  label,
  hint,
  error,
  endAdornment,
  id,
  className,
  ...inputProps
}: TextFieldProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const describedBy = joinIds(hint && hintId, error && errorId)

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={inputId} className='text-sm font-medium text-slate-800'>
        {label}
      </label>
      <div className='relative'>
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            // 16px text: below that, iOS zooms into the field when it gets focus.
            'min-h-12 w-full rounded-lg border bg-white px-3 text-base text-slate-900 placeholder:text-slate-400',
            error ? 'border-red-600' : 'border-slate-300',
            endAdornment && 'pr-12'
          )}
          {...inputProps}
        />
        {endAdornment && (
          <div className='absolute inset-y-0 right-0 flex items-center'>
            {endAdornment}
          </div>
        )}
      </div>
      {hint && (
        <p id={hintId} className='text-sm text-slate-600'>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className='text-sm font-medium text-red-700'>
          {error}
        </p>
      )}
    </div>
  )
}
