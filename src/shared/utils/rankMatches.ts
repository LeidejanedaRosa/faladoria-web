import { normalizeForSearch } from './normalizeForSearch'

/**
 * The options that match the text, ignoring case and accents: those that start with it first
 * ("var" → Varginha before Itanhandu-Varzea), then those that contain it.
 */
export const rankMatches = (options: readonly string[], text: string) => {
  const needle = normalizeForSearch(text)
  if (!needle) return [...options]
  const startsWith: string[] = []
  const contains: string[] = []
  for (const option of options) {
    const haystack = normalizeForSearch(option)
    if (haystack.startsWith(needle)) startsWith.push(option)
    else if (haystack.includes(needle)) contains.push(option)
  }
  return [...startsWith, ...contains]
}
