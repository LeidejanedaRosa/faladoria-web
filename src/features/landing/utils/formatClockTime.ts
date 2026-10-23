const CLOCK_FORMAT = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
})

/** `14:32`, in the visitor's own time zone: it answers "when did my screen get this?". */
export const formatClockTime = (timestamp: number): string =>
  CLOCK_FORMAT.format(timestamp)
