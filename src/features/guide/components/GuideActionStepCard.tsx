import { cn } from '@shared/utils/cn'

import type { ActionStepBlock } from '../data'
import type { CategoryTheme } from './guideCategoryTheme'
import { SHARED_STEP_IMAGES } from './guideImageMap'

interface GuideActionStepCardProps {
  block: ActionStepBlock
  stepIndex: number
  theme: CategoryTheme
}

export const GuideActionStepCard = ({
  block,
  stepIndex,
  theme,
}: GuideActionStepCardProps) => {
  const src = block.imageKey ? SHARED_STEP_IMAGES[block.imageKey] : undefined

  return (
    <li className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
      <div className='flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6'>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
            theme.iconBg
          )}
          aria-hidden='true'
        >
          {stepIndex}
        </span>

        <div className='flex-1'>
          <p className='text-lg font-bold text-gray-900'>{block.action}</p>
          {block.detail && (
            <p className='mt-1 text-base leading-relaxed text-gray-600'>
              {block.detail}
            </p>
          )}
        </div>

        {src && (
          <img
            src={src}
            alt=''
            aria-hidden='true'
            className='mx-auto h-auto max-h-32 w-auto shrink-0 object-contain sm:mx-0 sm:max-h-36'
            width={200}
            height={144}
            loading='lazy'
          />
        )}
      </div>
    </li>
  )
}
