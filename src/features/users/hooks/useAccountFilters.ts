import { useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import {
  type AccountFilters,
  type Places,
  validFilters,
} from '../utils/accountFilters'

const PARAMS = { state: 'estado', city: 'cidade', search: 'busca' } as const

/**
 * The filters live in the address, so a reload, Back from a drawer or a shared link keep them.
 * Each change replaces the entry: Back leaves the list instead of undoing one letter at a time.
 */
export const useAccountFilters = (places: Places) => {
  const [params, setParams] = useSearchParams()
  // React Router applies address changes as transitions, and a text field driven by one can drop
  // letters while typing. The field keeps its own text and copies it to the address.
  const addressSearch = params.get(PARAMS.search) ?? ''
  const [searchText, setSearchText] = useState(addressSearch)
  // The address can also change from outside (the folder link, Back): the field follows it then.
  // Adjusted while rendering, so the list never shows a frame filtered by the old text. Our own
  // writes are the trimmed text, so they never pull the field back.
  const [seenAddress, setSeenAddress] = useState(addressSearch)
  if (addressSearch !== seenAddress) {
    setSeenAddress(addressSearch)
    if (addressSearch !== searchText.trim()) setSearchText(addressSearch)
  }

  const filters = validFilters(
    {
      state: params.get(PARAMS.state) ?? '',
      city: params.get(PARAMS.city) ?? '',
      search: searchText,
    },
    places
  )

  const write = (changes: Partial<AccountFilters>) =>
    setParams(
      current => {
        const next = new URLSearchParams(current)
        for (const [field, value] of Object.entries(changes)) {
          const name = PARAMS[field as keyof AccountFilters]
          if (value) next.set(name, value)
          else next.delete(name)
        }
        return next
      },
      { replace: true, preventScrollReset: true }
    )

  return {
    filters,
    // A city belongs to one state: another state starts with all of its cities.
    setState: (state: string) => write({ state, city: '' }),
    setCity: (city: string) => write({ city }),
    setSearch: (text: string) => {
      setSearchText(text)
      write({ search: text.trim() })
    },
    clear: () => {
      setSearchText('')
      write({ state: '', city: '', search: '' })
    },
  }
}
