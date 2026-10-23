import { ChartIcon } from '@shared/components/ui'

import { TRANSPARENCY_CONTENT } from '../../../data/transparencyContent'
import { DataFreshnessBadge } from './DataFreshnessBadge'

export const TransparencyHeader = () => (
  <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <ChartIcon className='h-7 w-7 text-white/80' />
        <h3 className='text-2xl font-bold text-white sm:text-3xl lg:text-4xl'>
          {TRANSPARENCY_CONTENT.headline}
        </h3>
      </div>
      <p className='max-w-xl text-sm text-white/70 sm:text-base'>
        {TRANSPARENCY_CONTENT.subtitle.map((line, index) => (
          <span key={index} className='block'>
            {line}
          </span>
        ))}
      </p>
    </div>
    <DataFreshnessBadge />
  </div>
)
