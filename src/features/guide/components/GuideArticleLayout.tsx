import { Container } from '@shared/components/layout'
import {
  CheckIcon,
  InfoCircleIcon,
  LightbulbIcon,
  PhoneIcon,
  QuestionIcon,
  WarningIcon,
} from '@shared/components/ui'
import type { BreadcrumbItem } from '@shared/data'
import { cn } from '@shared/utils/cn'

import {
  type ArticleBlock,
  getCategoryBySlug,
  GUIDE_ARTICLE_HEADING_ID,
  GUIDE_CONTENT,
  type GuideArticle,
} from '../data'
import { GuideArticleFooter } from './GuideArticleFooter'
import { GuideArticleHeader } from './GuideArticleHeader'
import { GuideBreadcrumb } from './GuideBreadcrumb'
import { CATEGORY_THEME, type CategoryTheme } from './guideCategoryTheme'
import { ARTICLE_STEP_ICON_MAP, type ArticleStepIconName } from './guideIconMap'
import { GUIDE_STEP_IMAGES } from './guideImageMap'

interface GuideArticleLayoutProps {
  article: GuideArticle
  breadcrumbItems: BreadcrumbItem[]
}

interface StepGroup {
  heading: string
  stepNumber: number
  icon?: string
  blocks: ArticleBlock[]
}

type InfoPanelData = Extract<ArticleBlock, { type: 'info-panel' }>
type CalloutData = Extract<ArticleBlock, { type: 'callout' }>

const RELAXED_TEXT = 'text-sm leading-relaxed'

type StepOrPanelItem =
  | { kind: 'step'; step: StepGroup }
  | { kind: 'panel'; block: InfoPanelData }

function flushStep(current: StepGroup | null, items: StepOrPanelItem[]) {
  if (current) items.push({ kind: 'step', step: current })
}

function groupIntoSteps(blocks: ArticleBlock[]): {
  preamble: ArticleBlock[]
  items: StepOrPanelItem[]
} {
  const preamble: ArticleBlock[] = []
  const items: StepOrPanelItem[] = []
  let stepNumber = 0
  let current: StepGroup | null = null

  for (const block of blocks) {
    if (block.type === 'heading' && block.level === 2) {
      flushStep(current, items)
      stepNumber++
      current = {
        heading: block.text,
        stepNumber,
        icon: block.icon,
        blocks: [],
      }
    } else if (block.type === 'info-panel') {
      flushStep(current, items)
      current = null
      items.push({ kind: 'panel', block })
    } else if (current) {
      current.blocks.push(block)
    } else {
      preamble.push(block)
    }
  }
  flushStep(current, items)

  return { preamble, items }
}

const TipCallout = ({ block }: { block: CalloutData }) => (
  <div className='flex items-start gap-3 rounded-xl border border-purple-200 bg-purple-50 px-5 py-4 text-purple-900'>
    <span className='shrink-0 text-purple-600'>
      <LightbulbIcon className='h-4.5 w-4.5' />
    </span>
    <div>
      {block.title && <p className='text-sm font-semibold'>{block.title}</p>}
      {block.text && (
        <p className={cn(RELAXED_TEXT, block.title && 'mt-0.5')}>
          {block.text}
        </p>
      )}
    </div>
  </div>
)

const WarningCallout = ({ block }: { block: CalloutData }) => (
  <div className='flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900'>
    <span className='shrink-0 text-amber-600'>
      <WarningIcon className='h-4.5 w-4.5' />
    </span>
    <div>
      {block.title && <p className='text-sm font-semibold'>{block.title}</p>}
      {block.text && (
        <p className={cn(RELAXED_TEXT, block.title && 'mt-0.5')}>
          {block.text}
        </p>
      )}
    </div>
  </div>
)

const EmergencyCallout = ({ block }: { block: CalloutData }) => (
  <div
    role='alert'
    className='flex items-center justify-center gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4'
  >
    <span className='shrink-0 text-red-400'>
      <PhoneIcon className='h-10 w-10' />
    </span>
    <div>
      {block.title && (
        <p className='text-sm font-bold text-red-700'>{block.title}</p>
      )}
      {block.highlight && (
        <p className='text-4xl leading-none font-extrabold text-red-600'>
          {block.highlight}
        </p>
      )}
      {block.text && (
        <p className='mt-1 text-sm leading-relaxed text-red-800'>
          {block.text}
        </p>
      )}
    </div>
  </div>
)

const ChecklistCallout = ({ block }: { block: CalloutData }) => (
  <div className='flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4'>
    <span className='shrink-0 text-green-600'>
      <CheckIcon className='h-4.5 w-4.5' />
    </span>
    <div className='flex-1'>
      {block.title && (
        <p className='text-sm font-semibold text-green-800'>{block.title}</p>
      )}
      {block.items && block.items.length > 0 && (
        <ul className='mt-2 space-y-1.5'>
          {block.items.map((item, index) => (
            <li key={`cl-item-${index}`} className='flex items-start gap-2'>
              <span
                className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500'
                aria-hidden='true'
              />
              <span className='text-sm leading-relaxed text-green-800'>
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
)

const DefaultCallout = ({ block }: { block: CalloutData }) => (
  <div className='flex items-start gap-3 rounded-xl border border-purple-200 bg-purple-50 px-5 py-4 text-purple-900'>
    <span className='shrink-0 text-purple-600'>
      <InfoCircleIcon className='h-4.5 w-4.5' />
    </span>
    <div>
      {block.title && <p className='text-sm font-semibold'>{block.title}</p>}
      {block.text && (
        <p className={cn(RELAXED_TEXT, block.title && 'mt-0.5')}>
          {block.text}
        </p>
      )}
    </div>
  </div>
)

const CALLOUT_VARIANTS = {
  tip: TipCallout,
  warning: WarningCallout,
  emergency: EmergencyCallout,
  checklist: ChecklistCallout,
  default: DefaultCallout,
} as const

const Callout = ({ block }: { block: CalloutData }) => {
  const variant = block.variant ?? 'default'
  const Component = CALLOUT_VARIANTS[variant]
  return <Component block={block} />
}

const StepImage = ({ imageKey, alt }: { imageKey: string; alt: string }) => {
  const src = GUIDE_STEP_IMAGES[imageKey]
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt}
      className='mx-auto h-auto max-h-52 w-auto rounded-xl object-contain'
      width={600}
      height={208}
      loading='lazy'
    />
  )
}

const InfoPanel = ({ block }: { block: InfoPanelData }) => (
  <div
    role='note'
    className='flex items-start gap-4 rounded-2xl border border-purple-200 bg-purple-50 px-5 py-4'
  >
    <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100'>
      <QuestionIcon className='h-5 w-5 text-purple-600' />
    </span>
    <div>
      <p className='text-sm font-bold text-purple-800'>{block.title}</p>
      <p className='mt-1 text-sm leading-relaxed text-purple-700'>
        {block.text}
      </p>
    </div>
  </div>
)

const StepBlockRenderer = ({
  block,
  theme,
}: {
  block: ArticleBlock
  theme?: CategoryTheme
}) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className='text-sm leading-relaxed text-gray-700'>{block.text}</p>
      )

    case 'heading':
      return (
        <h3
          className={cn(
            'text-sm font-semibold',
            theme ? theme.text : 'text-gray-800'
          )}
        >
          {block.text}
        </h3>
      )

    case 'list':
      return (
        <ul className='space-y-2'>
          {block.items.map((item, index) => (
            <li key={`list-item-${index}`} className='flex items-start gap-2.5'>
              <span
                className={cn(
                  'mt-2 h-1.5 w-1.5 shrink-0 rounded-full',
                  theme ? theme.iconBg : 'bg-gray-400'
                )}
                aria-hidden='true'
              />
              <span className='text-sm leading-relaxed text-gray-700'>
                {item}
              </span>
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
}

const StepRightColumn = ({ blocks }: { blocks: ArticleBlock[] }) => (
  <div className='space-y-3 sm:flex-1'>
    {blocks.map((block, index) => {
      if (block.type === 'callout') {
        return <Callout key={`right-${index}`} block={block} />
      }
      if (block.type === 'image') {
        return (
          <StepImage
            key={`right-${index}`}
            imageKey={block.imageKey}
            alt={block.alt}
          />
        )
      }
      return null
    })}
  </div>
)

const StepCard = ({
  step,
  theme,
}: {
  step: StepGroup
  theme: CategoryTheme
}) => {
  const Icon =
    step.icon && step.icon in ARTICLE_STEP_ICON_MAP
      ? ARTICLE_STEP_ICON_MAP[step.icon as ArticleStepIconName]
      : null

  const rightBlocks = step.blocks.filter(
    b => b.type === 'callout' || b.type === 'image'
  )
  const contentBlocks = step.blocks.filter(
    b => b.type !== 'callout' && b.type !== 'image'
  )

  return (
    <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'>
      <div className='flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6'>
        <div className='shrink-0'>
          <div
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-2xl',
              theme.iconBgLight
            )}
            aria-hidden='true'
          >
            {Icon ? (
              <Icon className={cn('h-8 w-8', theme.textAccent)} />
            ) : (
              <span className={cn('text-xl font-bold', theme.text)}>
                {step.stepNumber}
              </span>
            )}
          </div>
        </div>

        <div className='flex-1'>
          <h2 className={cn('text-base leading-snug font-bold', theme.text)}>
            {step.stepNumber}. {step.heading}
          </h2>
          {contentBlocks.length > 0 && (
            <div className='mt-3 space-y-3'>
              {contentBlocks.map((block, index) => (
                <StepBlockRenderer
                  key={`${block.type}-${index}`}
                  block={block}
                  theme={theme}
                />
              ))}
            </div>
          )}
        </div>

        {rightBlocks.length > 0 && <StepRightColumn blocks={rightBlocks} />}
      </div>
    </div>
  )
}

export const GuideArticleLayout = ({
  article,
  breadcrumbItems,
}: GuideArticleLayoutProps) => {
  const category = getCategoryBySlug(article.categorySlug)
  const theme = CATEGORY_THEME[category?.color ?? 'purple']
  const { preamble, items } = groupIntoSteps(article.content)

  return (
    <Container className='py-6 sm:py-8 lg:py-10'>
      <GuideBreadcrumb items={breadcrumbItems} />

      <article
        aria-labelledby={GUIDE_ARTICLE_HEADING_ID}
        className='mx-auto max-w-5xl'
      >
        <GuideArticleHeader article={article} />

        {preamble.length > 0 && (
          <div className='mb-6 space-y-4'>
            {preamble.map((block, index) => (
              <StepBlockRenderer key={`preamble-${index}`} block={block} />
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className='space-y-4'>
            {items.map((item, index) =>
              item.kind === 'step' ? (
                <StepCard
                  key={`step-${item.step.stepNumber}`}
                  step={item.step}
                  theme={theme}
                />
              ) : (
                <InfoPanel key={`panel-${index}`} block={item.block} />
              )
            )}
          </div>
        )}

        {preamble.length === 0 && items.length === 0 && (
          <div className='rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center'>
            <p className='text-lg font-medium text-gray-500'>
              {GUIDE_CONTENT.comingSoon.heading}
            </p>
            <p className='mt-2 text-sm text-gray-400'>
              {GUIDE_CONTENT.comingSoon.description}
            </p>
          </div>
        )}
      </article>
      <GuideArticleFooter />
    </Container>
  )
}
