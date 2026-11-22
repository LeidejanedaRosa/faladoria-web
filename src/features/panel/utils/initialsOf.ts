/** "Ana Maria Souza" → "AS": the first letters of the first and last names. */
export const initialsOf = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  const first = words[0]
  const last = words.length > 1 ? words[words.length - 1] : ''
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
}
