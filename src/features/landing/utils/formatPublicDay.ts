const PUBLIC_DAY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/

// Rearranged as text: `new Date('2026-09-30')` is UTC midnight, which in Brazil is still
// the 29th, so going through Date would show the day before.
export const formatPublicDay = (day: string): string => {
  const match = PUBLIC_DAY_PATTERN.exec(day)
  if (!match) return day
  const [, year, month, date] = match
  return `${date}/${month}/${year}`
}
