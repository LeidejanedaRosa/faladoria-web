import {
  type KeyboardEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
} from 'react'

import { cn } from '@shared/utils/cn'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  /** Names the tab list for screen readers. */
  label: string
  tabs: readonly TabItem[]
}

/** The tab a key leads to (arrows wrap around), or undefined for any other key. */
const targetTab = (key: string, active: number, last: number) => {
  switch (key) {
    case 'ArrowRight':
      return active === last ? 0 : active + 1
    case 'ArrowLeft':
      return active === 0 ? last : active - 1
    case 'Home':
      return 0
    case 'End':
      return last
    default:
      return undefined
  }
}

/**
 * Folder-shaped tabs, following the WAI-ARIA tabs pattern: one tab in the Tab order, arrows and
 * Home/End move between them and show the panel at once. Hidden panels stay mounted, so a form
 * keeps what was typed when the person looks at another tab.
 */
export const Tabs = ({ label, tabs }: TabsProps) => {
  const baseId = useId()
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (index: number) => {
    setActive(index)
    tabRefs.current[index]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const target = targetTab(event.key, active, tabs.length - 1)
    if (target === undefined) return
    event.preventDefault()
    select(target)
  }

  return (
    <div className='flex flex-col'>
      <div
        role='tablist'
        aria-label={label}
        className='flex gap-1 border-b border-slate-300'
      >
        {tabs.map((tab, index) => {
          const isActive = index === active
          return (
            <button
              key={tab.id}
              ref={element => {
                tabRefs.current[index] = element
              }}
              type='button'
              role='tab'
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                '-mb-px min-h-12 rounded-t-lg border px-5 text-base font-semibold lg:min-h-10 lg:text-sm',
                isActive
                  ? 'text-purple-dark border-slate-300 border-b-white bg-white'
                  : 'border-transparent bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role='tabpanel'
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={index !== active}
          className='pt-5'
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
