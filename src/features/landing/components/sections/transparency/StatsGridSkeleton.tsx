import { ScreenReaderOnly } from '@shared/components/ui'

import { TRANSPARENCY_CONTENT } from '../../../data/transparencyContent'

export const StatsGridSkeleton = () => (
  <div>
    <ScreenReaderOnly asChild>
      <output>{TRANSPARENCY_CONTENT.loadingStats}</output>
    </ScreenReaderOnly>
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4' aria-hidden='true'>
      {TRANSPARENCY_CONTENT.stats.map(stat => (
        <div
          key={stat.id}
          className='bg-purple-deep flex flex-col gap-3 rounded-xl p-5'
        >
          <span className='h-4 w-2/3 animate-pulse rounded bg-white/10 motion-reduce:animate-none sm:h-5' />
          <span className='h-9 w-1/2 animate-pulse rounded bg-white/10 motion-reduce:animate-none sm:h-10' />
          {/* Holds the place of the percentage line, so the cards keep their height (CLS). */}
          <span className='h-4 w-2/5 animate-pulse rounded bg-white/10 motion-reduce:animate-none' />
          <span className='h-1 w-full rounded-full bg-white/10' />
        </div>
      ))}
    </div>
  </div>
)
