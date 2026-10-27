import { ScreenReaderOnly } from '@shared/components/ui'

import { PANEL_CONTENT } from '../data/panelContent'

const PLACEHOLDERS = [0, 1, 2, 3]

export const CountsSkeleton = () => (
  <div>
    <ScreenReaderOnly asChild>
      <output>{PANEL_CONTENT.home.loading}</output>
    </ScreenReaderOnly>
    <div
      aria-hidden='true'
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'
    >
      {PLACEHOLDERS.map(placeholder => (
        <div
          key={placeholder}
          className='flex h-32 flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5'
        >
          <span className='h-4 w-2/3 animate-pulse rounded bg-slate-200 motion-reduce:animate-none' />
          <span className='h-8 w-1/4 animate-pulse rounded bg-slate-200 motion-reduce:animate-none' />
          <span className='h-4 w-4/5 animate-pulse rounded bg-slate-200 motion-reduce:animate-none' />
        </div>
      ))}
    </div>
  </div>
)
