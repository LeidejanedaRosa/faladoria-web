import { type RefObject, useId } from 'react'

import type { StaffAction } from '../services/staffActionsApi'
import type { TargetNames } from '../utils/describeAction'
import { groupByDay } from '../utils/groupByDay'
import { ActionItem } from './ActionItem'

interface ActionDaysProps {
  actions: StaffAction[]
  names: TargetNames
  listRef: RefObject<HTMLDivElement | null>
}

/** The actions under one heading per day ("Hoje", "Ontem", "19 de novembro de 2026"). */
export const ActionDays = ({ actions, names, listRef }: ActionDaysProps) => {
  const headingId = useId()
  return (
    <div ref={listRef} className='flex flex-col gap-4'>
      {groupByDay(actions).map(day => (
        <section key={day.key} aria-labelledby={`${headingId}-${day.key}`}>
          <h3
            id={`${headingId}-${day.key}`}
            className='border-b border-slate-200 pb-2 text-sm font-semibold text-slate-700'
          >
            <time dateTime={day.key}>{day.label}</time>
          </h3>
          <ol className='divide-y divide-slate-100'>
            {day.actions.map((action, index) => (
              <ActionItem
                // The log has no id: time, route and position tell the rows apart.
                key={`${action.occurredAt}-${action.action}-${index}`}
                action={action}
                names={names}
              />
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
