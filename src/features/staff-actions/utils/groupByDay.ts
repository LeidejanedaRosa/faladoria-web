import { STAFF_ACTIONS_CONTENT } from '../data/staffActionsContent'
import type { StaffAction } from '../services/staffActionsApi'

// Brasília time, like the rest of the panel: an action at 22:00 UTC-3 belongs to that day.
const TIME_ZONE = 'America/Sao_Paulo'

const dayKey = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})
const longDay = new Intl.DateTimeFormat('pt-BR', {
  timeZone: TIME_ZONE,
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const clock = new Intl.DateTimeFormat('pt-BR', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
})

const ONE_DAY = 24 * 60 * 60 * 1000

export interface ActionDay {
  /** YYYY-MM-DD in Brasília time: the group's key and its machine-readable date. */
  key: string
  label: string
  actions: StaffAction[]
}

const labelOf = (key: string, now: Date, date: Date) => {
  if (key === dayKey.format(now)) return STAFF_ACTIONS_CONTENT.today
  if (key === dayKey.format(new Date(now.getTime() - ONE_DAY)))
    return STAFF_ACTIONS_CONTENT.yesterday
  return longDay.format(date)
}

/** The actions, newest first, under one heading per day. */
export const groupByDay = (
  actions: readonly StaffAction[],
  now = new Date()
): ActionDay[] => {
  const days: ActionDay[] = []
  for (const action of actions) {
    const date = new Date(action.occurredAt)
    const key = dayKey.format(date)
    const last = days.at(-1)
    if (last?.key === key) last.actions.push(action)
    else days.push({ key, label: labelOf(key, now, date), actions: [action] })
  }
  return days
}

export const formatTime = (isoDate: string) => clock.format(new Date(isoDate))
