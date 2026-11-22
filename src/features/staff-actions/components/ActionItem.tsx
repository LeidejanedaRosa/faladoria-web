import { cn } from '@shared/utils/cn'

import { STAFF_ACTIONS_CONTENT } from '../data/staffActionsContent'
import type { StaffAction } from '../services/staffActionsApi'
import {
  type ActionOutcome,
  describeAction,
  type TargetNames,
} from '../utils/describeAction'
import { formatTime } from '../utils/groupByDay'

// The word says it; the color only helps (WCAG 1.4.1).
const BADGES: Record<Exclude<ActionOutcome, 'done'>, [string, string]> = {
  rejected: [
    STAFF_ACTIONS_CONTENT.rejected,
    'border-amber-300 bg-amber-50 text-amber-900',
  ],
  refused: [
    STAFF_ACTIONS_CONTENT.refused,
    'border-amber-300 bg-amber-50 text-amber-900',
  ],
  denied: [
    STAFF_ACTIONS_CONTENT.denied,
    'border-red-200 bg-red-50 text-red-800',
  ],
}

interface ActionItemProps {
  action: StaffAction
  names: TargetNames
}

export const ActionItem = ({ action, names }: ActionItemProps) => {
  const { text, outcome } = describeAction(action, names)
  const badge = outcome === 'done' ? undefined : BADGES[outcome]

  return (
    // tabIndex -1: "load more" sends focus to the first new action.
    <li tabIndex={-1} className='flex gap-3 py-3 focus:outline-none sm:gap-4'>
      <time
        dateTime={action.occurredAt}
        className='w-12 shrink-0 pt-0.5 text-sm text-slate-600 tabular-nums'
      >
        {formatTime(action.occurredAt)}
      </time>
      <p className='flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-slate-800'>
        {text}
        {badge && (
          <span
            className={cn(
              'inline-flex rounded-md border px-2 py-0.5 text-sm font-medium',
              badge[1]
            )}
          >
            {badge[0]}
          </span>
        )}
      </p>
    </li>
  )
}
