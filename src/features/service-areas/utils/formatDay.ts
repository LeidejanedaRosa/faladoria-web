// Brasília time: a city added at 22:00 UTC-3 must not show the next day.
const dayFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo',
})

export const formatDay = (isoDate: string) =>
  dayFormatter.format(new Date(isoDate))
