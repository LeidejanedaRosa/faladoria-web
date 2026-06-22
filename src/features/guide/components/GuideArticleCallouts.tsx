import type { ComponentType } from 'react'

import {
  CheckIcon,
  ClipboardIcon,
  InfoCircleIcon,
  LightbulbIcon,
  PhoneIcon,
  WarningIcon,
} from '@shared/components/ui'
import { cn } from '@shared/utils/cn'

import type { ArticleBlock } from '../data'

type CalloutData = Extract<ArticleBlock, { type: 'callout' }>

const SimpleCallout = ({
  block,
  containerClassName,
  iconClassName,
  icon: Icon,
  defaultLabel,
}: {
  block: CalloutData
  containerClassName: string
  iconClassName: string
  icon: ComponentType<{ className?: string }>
  defaultLabel: string
}) => (
  <div
    role='note'
    aria-label={block.title ?? defaultLabel}
    className={cn(
      'flex items-start gap-3 rounded-xl border px-5 py-4',
      containerClassName
    )}
  >
    <span className={cn('shrink-0', iconClassName)} aria-hidden='true'>
      <Icon className='h-4.5 w-4.5' />
    </span>
    <div>
      {block.title && <p className='text-sm font-semibold'>{block.title}</p>}
      {block.text && (
        <p className={cn('text-sm leading-relaxed', block.title && 'mt-0.5')}>
          {block.text}
        </p>
      )}
    </div>
  </div>
)

const TipCallout = ({ block }: { block: CalloutData }) => (
  <SimpleCallout
    block={block}
    containerClassName='border-purple-200 bg-purple-50 text-purple-900'
    iconClassName='text-purple-600'
    icon={LightbulbIcon}
    defaultLabel='Dica'
  />
)

const WarningCallout = ({ block }: { block: CalloutData }) => (
  <SimpleCallout
    block={block}
    containerClassName='border-amber-200 bg-amber-50 text-amber-900'
    iconClassName='text-amber-600'
    icon={WarningIcon}
    defaultLabel='Atenção'
  />
)

const EmergencyCallout = ({ block }: { block: CalloutData }) => (
  <div
    role='note'
    aria-label={block.title ?? 'Atenção'}
    className='flex items-center justify-center gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4'
  >
    <span className='shrink-0 text-red-400' aria-hidden='true'>
      <PhoneIcon className='h-10 w-10' />
    </span>
    <div>
      {block.title && (
        <p className='text-sm font-bold text-red-700'>{block.title}</p>
      )}
      {block.highlight && (
        <p
          className='text-4xl leading-none font-extrabold text-red-600'
          aria-label={`Ligue para ${block.highlight}`}
        >
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
  <div
    role='note'
    aria-label={block.title ?? 'Lista de verificação'}
    className='flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4'
  >
    <span className='shrink-0 text-green-600' aria-hidden='true'>
      <ClipboardIcon className='h-4.5 w-4.5' />
    </span>
    <div className='flex-1'>
      {block.title && (
        <p className='text-sm font-semibold text-green-800'>{block.title}</p>
      )}
      {block.items && block.items.length > 0 && (
        <ul className='mt-2 space-y-1.5'>
          {block.items.map((item, index) => (
            <li key={`cl-item-${index}`} className='flex items-start gap-2'>
              <CheckIcon
                className='mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600'
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
  <SimpleCallout
    block={block}
    containerClassName='border-purple-200 bg-purple-50 text-purple-900'
    iconClassName='text-purple-600'
    icon={InfoCircleIcon}
    defaultLabel='Informação'
  />
)

const CALLOUT_VARIANTS = {
  tip: TipCallout,
  warning: WarningCallout,
  emergency: EmergencyCallout,
  checklist: ChecklistCallout,
  default: DefaultCallout,
} as const

export const Callout = ({ block }: { block: CalloutData }) => {
  const variant = block.variant ?? 'default'
  const Component = CALLOUT_VARIANTS[variant]
  return <Component block={block} />
}
