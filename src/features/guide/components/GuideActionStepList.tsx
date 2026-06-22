import type { ActionStepBlock } from '../data'
import { GuideActionStepCard } from './GuideActionStepCard'
import type { CategoryTheme } from './guideCategoryTheme'

interface GuideActionStepListProps {
  blocks: ActionStepBlock[]
  theme: CategoryTheme
}

export const GuideActionStepList = ({
  blocks,
  theme,
}: GuideActionStepListProps) => (
  <ol className='space-y-3'>
    {blocks.map((block, index) => (
      <GuideActionStepCard
        key={`action-step-${index}`}
        block={block}
        stepIndex={index + 1}
        theme={theme}
      />
    ))}
  </ol>
)
