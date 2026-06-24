import type { ReactNode } from 'react'

import * as Sentry from '@sentry/react'
import { Container } from '@shared/components/layout'
import type { BreadcrumbItem } from '@shared/data'
import { cn } from '@shared/utils/cn'

import {
  type ActionStepBlock,
  type ArticleBlock,
  type ArticleStepIconName,
  GUIDE_ARTICLE_HEADING_ID,
  GUIDE_CONTENT,
  type GuideArticle,
  type GuideCategory,
} from '../data'
import { GuideActionStepList } from './GuideActionStepList'
import { Callout } from './GuideArticleCallouts'
import { GuideArticleFooter } from './GuideArticleFooter'
import { GuideArticleHeader } from './GuideArticleHeader'
import { GuideBreadcrumb } from './GuideBreadcrumb'
import { CATEGORY_THEME, type CategoryTheme } from './guideCategoryTheme'
import { ARTICLE_STEP_ICON_MAP } from './guideIconMap'

interface GuideArticleLayoutProps {
  article: GuideArticle
  category: GuideCategory | undefined
  breadcrumbItems: BreadcrumbItem[]
}

interface StepGroup {
  heading: string
  stepNumber: number
  icon?: ArticleStepIconName
  blocks: ArticleBlock[]
}

function groupIntoSteps(blocks: ArticleBlock[]): {
  preamble: ArticleBlock[]
  steps: StepGroup[]
} {
  const preamble: ArticleBlock[] = []
  const steps: StepGroup[] = []
  let stepNumber = 0
  let current: StepGroup | null = null

  for (const block of blocks) {
    if (block.type === 'heading' && block.level === 2) {
      if (current) steps.push(current)
      stepNumber++
      current = {
        heading: block.text,
        stepNumber,
        icon: block.icon,
        blocks: [],
      }
    } else if (current) {
      current.blocks.push(block)
    } else {
      preamble.push(block)
    }
  }
  if (current) steps.push(current)

  return { preamble, steps }
}

type BlockRenderer = (block: ArticleBlock, theme?: CategoryTheme) => ReactNode

const CONTENT_BLOCK_RENDERERS: Partial<
  Record<ArticleBlock['type'], BlockRenderer>
> = {
  paragraph: block => (
    <p className='text-sm leading-relaxed text-gray-700'>
      {(block as Extract<ArticleBlock, { type: 'paragraph' }>).text}
    </p>
  ),
  list: (block, theme) => {
    const { ordered, items } = block as Extract<ArticleBlock, { type: 'list' }>
    const Tag = ordered ? 'ol' : 'ul'
    return (
      <Tag className='space-y-2'>
        {items.map((item, index) => (
          <li key={`list-item-${index}`} className='flex items-start gap-2.5'>
            {ordered ? (
              <span
                className='mt-0.5 w-5 shrink-0 text-sm font-semibold text-gray-500'
                aria-hidden='true'
              >
                {index + 1}.
              </span>
            ) : (
              <span
                className={cn(
                  'mt-2 h-1.5 w-1.5 shrink-0 rounded-full',
                  theme ? theme.iconBg : 'bg-gray-400'
                )}
                aria-hidden='true'
              />
            )}
            <span className='text-sm leading-relaxed text-gray-700'>
              {item}
            </span>
          </li>
        ))}
      </Tag>
    )
  },
  callout: block => (
    <Callout block={block as Extract<ArticleBlock, { type: 'callout' }>} />
  ),
}

const StepBlockRenderer = ({
  block,
  theme,
}: {
  block: ArticleBlock
  theme?: CategoryTheme
}) => {
  const render = CONTENT_BLOCK_RENDERERS[block.type]
  if (!render) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        `GuideArticleLayout: no renderer for block type "${block.type}". Check groupIntoSteps or add a renderer to CONTENT_BLOCK_RENDERERS.`
      )
    } else {
      Sentry.captureMessage(
        `GuideArticleLayout: unknown block type "${block.type}"`,
        'warning'
      )
    }
    return null
  }
  return <>{render(block, theme)}</>
}

type CalloutBlock = Extract<ArticleBlock, { type: 'callout' }>

const StepRightColumn = ({ blocks }: { blocks: CalloutBlock[] }) => (
  <div className='space-y-3 sm:flex-1'>
    {blocks.map((block, index) => (
      <Callout key={`right-${index}`} block={block} />
    ))}
  </div>
)

const InformationalStepCard = ({
  step,
  theme,
}: {
  step: StepGroup
  theme: CategoryTheme
}) => {
  const Icon = step.icon ? ARTICLE_STEP_ICON_MAP[step.icon] : null
  const headingId = `step-${step.stepNumber}-heading`

  const rightBlocks = step.blocks.filter(
    (b): b is CalloutBlock => b.type === 'callout'
  )
  const contentBlocks = step.blocks.filter(b => b.type !== 'callout')

  return (
    <section
      aria-labelledby={headingId}
      className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'
    >
      <div className='flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6'>
        {Icon && (
          <div className='shrink-0'>
            <div
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-2xl',
                theme.iconBgLight
              )}
              aria-hidden='true'
            >
              <Icon className={cn('h-8 w-8', theme.textAccent)} />
            </div>
          </div>
        )}

        <div className='flex-1'>
          <h2
            id={headingId}
            className={cn('text-base leading-snug font-bold', theme.text)}
          >
            {step.heading}
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
    </section>
  )
}

const ProceduralStepSection = ({
  step,
  actionSteps,
  otherBlocks,
  theme,
}: {
  step: StepGroup
  actionSteps: ActionStepBlock[]
  otherBlocks: ArticleBlock[]
  theme: CategoryTheme
}) => {
  const headingId = `step-${step.stepNumber}-heading`
  return (
    <section
      aria-labelledby={headingId}
      className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm'
    >
      <div className='p-5 sm:p-6'>
        <h2
          id={headingId}
          className={cn('mb-4 text-base leading-snug font-bold', theme.text)}
        >
          {step.heading}
        </h2>
        <GuideActionStepList blocks={actionSteps} theme={theme} />
        {otherBlocks.length > 0 && (
          <div className='mt-4 space-y-3'>
            {otherBlocks.map((block, index) => (
              <StepBlockRenderer
                key={`other-${index}`}
                block={block}
                theme={theme}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const StepCard = ({
  step,
  theme,
}: {
  step: StepGroup
  theme: CategoryTheme
}) => {
  const actionSteps = step.blocks.filter(
    (b): b is ActionStepBlock => b.type === 'action-step'
  )

  if (actionSteps.length > 0) {
    const otherBlocks = step.blocks.filter(b => b.type !== 'action-step')
    return (
      <ProceduralStepSection
        step={step}
        actionSteps={actionSteps}
        otherBlocks={otherBlocks}
        theme={theme}
      />
    )
  }

  return <InformationalStepCard step={step} theme={theme} />
}

export const GuideArticleLayout = ({
  article,
  category,
  breadcrumbItems,
}: GuideArticleLayoutProps) => {
  const theme = CATEGORY_THEME[category?.color ?? 'purple']
  const { preamble, steps } = groupIntoSteps(article.content)

  return (
    <Container className='py-6 sm:py-8 lg:py-10'>
      <GuideBreadcrumb items={breadcrumbItems} />

      <article aria-labelledby={GUIDE_ARTICLE_HEADING_ID}>
        <GuideArticleHeader article={article} category={category} />

        {preamble.length > 0 && (
          <div className='mb-6 space-y-4'>
            {preamble.map((block, index) => (
              <StepBlockRenderer key={`preamble-${index}`} block={block} />
            ))}
          </div>
        )}

        {steps.length > 0 && (
          <div className='space-y-4'>
            {steps.map(step => (
              <StepCard
                key={`step-${step.stepNumber}`}
                step={step}
                theme={theme}
              />
            ))}
          </div>
        )}

        {preamble.length === 0 && steps.length === 0 && (
          <div className='rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center'>
            <p className='text-lg font-medium text-gray-500'>
              {GUIDE_CONTENT.comingSoon.heading}
            </p>
            <p className='mt-2 text-sm text-gray-500'>
              {GUIDE_CONTENT.comingSoon.description}
            </p>
          </div>
        )}
      </article>
      <GuideArticleFooter />
    </Container>
  )
}
