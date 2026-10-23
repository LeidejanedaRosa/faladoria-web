import { ScreenReaderOnly } from '@shared/components/ui'

import {
  LATEST_COMPLAINTS_LIMIT,
  TRANSPARENCY_CONTENT,
} from '../../../data/transparencyContent'

const PLACEHOLDER_ROWS = Array.from(
  { length: LATEST_COMPLAINTS_LIMIT },
  (_, index) => index
)

export const InteractionsListSkeleton = () => (
  <div>
    <ScreenReaderOnly asChild>
      <output>{TRANSPARENCY_CONTENT.loadingInteractions}</output>
    </ScreenReaderOnly>
    <ul className='flex flex-col divide-y divide-white/10' aria-hidden='true'>
      {PLACEHOLDER_ROWS.map(row => (
        <li
          key={row}
          className='flex gap-3 py-4 first:pt-0 last:pb-0 sm:items-center sm:gap-4'
        >
          <span className='hidden h-10 w-10 shrink-0 rounded-full bg-white/5 sm:block' />
          <div className='flex min-w-0 flex-1 flex-col gap-2'>
            <span className='h-4 w-3/4 animate-pulse rounded bg-white/10 motion-reduce:animate-none' />
            <span className='h-3 w-1/2 animate-pulse rounded bg-white/10 motion-reduce:animate-none' />
          </div>
        </li>
      ))}
    </ul>
  </div>
)
