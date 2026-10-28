import { type KeyboardEvent, useMemo, useState } from 'react'

import { normalizeForSearch } from '@shared/utils/normalizeForSearch'
import { rankMatches } from '@shared/utils/rankMatches'

interface UseComboboxOptions {
  options: readonly string[]
  value: string
  onChange: (value: string) => void
  maxResults: number
  /** Options shown but not choosable (with the reason next to them, in the list). */
  isOptionDisabled?: (option: string) => boolean
}

const sameText = (a: string, b: string) =>
  normalizeForSearch(a) === normalizeForSearch(b)

// A new value from outside (form reset, another state chosen) replaces the typed text, unless
// the person is mid-typing: then it was their own edit that cleared the value.
const useTextFollowingValue = (value: string) => {
  const [text, setText] = useState(value)
  const [syncedValue, setSyncedValue] = useState(value)
  if (value !== syncedValue) {
    setSyncedValue(value)
    if (value !== '' || sameText(text, syncedValue)) setText(value)
  }
  return [text, setText] as const
}

/** The typed text, the open list and the highlighted option of a combobox, and its keys. */
export const useCombobox = ({
  options,
  value,
  onChange,
  maxResults,
  isOptionDisabled = () => false,
}: UseComboboxOptions) => {
  const [text, setText] = useTextFollowingValue(value)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const matches = useMemo(() => rankMatches(options, text), [options, text])
  const shown = matches.slice(0, maxResults)

  const close = () => {
    setIsOpen(false)
    setActiveIndex(-1)
  }

  const choose = (option: string) => {
    if (isOptionDisabled(option)) return
    setText(option)
    close()
    onChange(option)
  }

  const type = (newText: string) => {
    setText(newText)
    setIsOpen(true)
    setActiveIndex(-1)
    if (value !== '') onChange('')
  }

  // Leaving with the exact name typed counts as choosing it: nobody should have to open the
  // list to confirm what they already wrote.
  const leave = () => {
    close()
    const exact = options.find(option => sameText(option, text))
    if (value === '' && exact) choose(exact)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setIsOpen(true)
      setActiveIndex(index =>
        Math.min(Math.max(index + step, 0), shown.length - 1)
      )
    } else if (event.key === 'Enter' && isOpen && activeIndex >= 0) {
      // Enter picks the highlighted option instead of submitting the form.
      event.preventDefault()
      choose(shown[activeIndex])
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      close()
    }
  }

  const open = () => setIsOpen(true)

  return {
    text,
    isOpen,
    open,
    activeIndex,
    matches,
    shown,
    choose,
    type,
    leave,
    handleKeyDown,
    isOptionDisabled,
  }
}
