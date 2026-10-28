import { type MouseEvent, type Ref, useEffect, useId, useRef } from 'react'

import { useCombobox } from '@shared/hooks/useCombobox'
import { cn } from '@shared/utils/cn'
import { joinIds } from '@shared/utils/joinIds'

import { FieldMessages } from './FieldMessages'

interface ComboboxProps {
  label: string
  options: readonly string[]
  /** The chosen option, or '' while the typed text matches none. */
  value: string
  onChange: (value: string) => void
  noMatchText: string
  resultsText: (count: number) => string
  moreResultsText: (shown: number, total: number) => string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  inputRef?: Ref<HTMLInputElement>
  /** How many matches the list shows at once; typing more narrows it down. */
  maxResults?: number
  /** Options listed but not choosable, e.g. a city already on the list. */
  isOptionDisabled?: (option: string) => boolean
  /** Why a disabled option cannot be chosen, shown (and read) next to it. */
  disabledOptionLabel?: string
}

type ComboboxState = ReturnType<typeof useCombobox>

interface ComboboxPopupProps {
  listboxId: string
  label: string
  optionId: (index: number) => string
  combobox: ComboboxState
  isExpanded: boolean
  noMatchText: string
  moreResultsText: (shown: number, total: number) => string
  disabledOptionLabel?: string
}

interface ComboboxOptionProps {
  id: string
  index: number
  option: string
  isActive: boolean
  isDisabled: boolean
  disabledLabel?: string
}

const ComboboxOption = ({
  id,
  index,
  option,
  isActive,
  isDisabled,
  disabledLabel,
}: ComboboxOptionProps) => (
  <li
    id={id}
    data-index={index}
    role='option'
    aria-selected={isActive}
    aria-disabled={isDisabled || undefined}
    className={cn(
      'flex min-h-12 items-center justify-between gap-3 px-3 text-base',
      isDisabled
        ? 'cursor-not-allowed text-slate-500'
        : 'cursor-pointer text-slate-800',
      isActive && 'bg-lavender-light',
      isActive && !isDisabled && 'text-purple-dark',
      !isActive && !isDisabled && 'hover:bg-slate-50'
    )}
  >
    {option}
    {isDisabled && disabledLabel && (
      <span className='text-sm text-slate-600'>{disabledLabel}</span>
    )}
  </li>
)

const ComboboxPopup = ({
  listboxId,
  label,
  optionId,
  combobox,
  isExpanded,
  noMatchText,
  moreResultsText,
  disabledOptionLabel,
}: ComboboxPopupProps) => {
  const { shown, matches, activeIndex, choose, isOptionDisabled } = combobox
  const listboxRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (activeIndex < 0) return
    listboxRef.current?.children[activeIndex]?.scrollIntoView?.({
      block: 'nearest',
    })
  }, [activeIndex])

  const handleClick = (event: MouseEvent<HTMLUListElement>) => {
    // By index, not by text: a disabled option's text also carries its reason.
    const option = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-index]'
    )
    if (option) choose(shown[Number(option.dataset.index)])
  }

  return (
    <div
      hidden={!isExpanded}
      className='absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg'
    >
      {/* The keyboard never reaches the options: it stays in the field, which moves the
          highlight through aria-activedescendant (the WAI-ARIA combobox pattern). The rule
          cannot see that, so the mouse is the only input handled here. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <ul
        ref={listboxRef}
        id={listboxId}
        role='listbox'
        aria-label={label}
        tabIndex={-1}
        // mousedown would take focus from the field before the click lands.
        onMouseDown={event => event.preventDefault()}
        onClick={handleClick}
        className='max-h-64 overflow-y-auto py-1'
      >
        {shown.map((option, index) => (
          <ComboboxOption
            key={option}
            id={optionId(index)}
            index={index}
            option={option}
            isActive={index === activeIndex}
            isDisabled={isOptionDisabled(option)}
            disabledLabel={disabledOptionLabel}
          />
        ))}
      </ul>
      {matches.length === 0 && (
        <p className='px-3 py-3 text-sm text-slate-600'>{noMatchText}</p>
      )}
      {matches.length > shown.length && (
        <p className='border-t border-slate-100 px-3 py-2 text-sm text-slate-600'>
          {moreResultsText(shown.length, matches.length)}
        </p>
      )}
    </div>
  )
}

interface ComboboxInputProps {
  id: string
  listboxId: string
  activeId?: string
  describedBy?: string
  combobox: ComboboxState
  isExpanded: boolean
  error?: string
  placeholder?: string
  disabled: boolean
  inputRef?: Ref<HTMLInputElement>
}

const ComboboxInput = ({
  id,
  listboxId,
  activeId,
  describedBy,
  combobox,
  isExpanded,
  error,
  placeholder,
  disabled,
  inputRef,
}: ComboboxInputProps) => (
  <input
    ref={inputRef}
    id={id}
    type='text'
    role='combobox'
    autoComplete='off'
    aria-autocomplete='list'
    aria-expanded={isExpanded}
    aria-controls={listboxId}
    aria-activedescendant={activeId}
    aria-invalid={Boolean(error) || undefined}
    aria-describedby={describedBy}
    value={combobox.text}
    placeholder={placeholder}
    disabled={disabled}
    onChange={event => combobox.type(event.target.value)}
    onClick={combobox.open}
    onBlur={combobox.leave}
    onKeyDown={combobox.handleKeyDown}
    className={cn(
      'min-h-12 w-full rounded-lg border bg-white px-3 text-base text-slate-900 placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100',
      error ? 'border-red-600' : 'border-slate-300'
    )}
  />
)

/**
 * A text field that suggests options from a list (WAI-ARIA 1.2 combobox with a listbox popup).
 * Focus stays in the field; the arrows move the highlighted option.
 */
export const Combobox = ({
  label,
  options,
  value,
  onChange,
  noMatchText,
  resultsText,
  moreResultsText,
  hint,
  error,
  disabled = false,
  maxResults = 50,
  isOptionDisabled,
  disabledOptionLabel,
  ...inputProps
}: ComboboxProps) => {
  const baseId = useId()
  const ids = {
    input: `${baseId}-input`,
    listbox: `${baseId}-listbox`,
    hint: `${baseId}-hint`,
    error: `${baseId}-error`,
  }
  const optionId = (index: number) => `${baseId}-option-${index}`
  const combobox = useCombobox({
    options,
    value,
    onChange,
    maxResults,
    isOptionDisabled,
  })
  const isExpanded = combobox.isOpen && !disabled
  const hasActive = isExpanded && combobox.activeIndex >= 0

  return (
    <div className='flex flex-col gap-1.5'>
      <label htmlFor={ids.input} className='text-sm font-medium text-slate-800'>
        {label}
      </label>
      <div className='relative'>
        <ComboboxInput
          {...inputProps}
          id={ids.input}
          listboxId={ids.listbox}
          activeId={hasActive ? optionId(combobox.activeIndex) : undefined}
          describedBy={joinIds(hint && ids.hint, error && ids.error)}
          combobox={combobox}
          isExpanded={isExpanded}
          error={error}
          disabled={disabled}
        />
        <ComboboxPopup
          listboxId={ids.listbox}
          label={label}
          optionId={optionId}
          combobox={combobox}
          isExpanded={isExpanded}
          noMatchText={noMatchText}
          moreResultsText={moreResultsText}
          disabledOptionLabel={disabledOptionLabel}
        />
      </div>
      {/* The count is announced as the person types; the list itself is not read aloud. */}
      <p role='status' className='sr-only'>
        {isExpanded && combobox.text
          ? resultsText(combobox.matches.length)
          : ''}
      </p>
      <FieldMessages
        hintId={ids.hint}
        hint={hint}
        errorId={ids.error}
        error={error}
      />
    </div>
  )
}
