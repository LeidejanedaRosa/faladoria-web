import { ChatIcon, LocationIcon } from '@shared/components/ui'

import {
  type Interaction,
  TRANSPARENCY_CONTENT,
} from '../../../data/transparencyContent'
import { StatusBadge } from './StatusBadge'

export const InteractionsPanel = () => (
  <div className='bg-purple-deep flex min-w-0 flex-col gap-4 rounded-2xl p-4 sm:p-6'>
    <div className='flex items-center justify-between'>
      <h4 className='text-base font-semibold text-white sm:text-lg'>
        {TRANSPARENCY_CONTENT.interactionsPanelTitle}
      </h4>
      <span className='rounded-full bg-white/10 px-3 py-1 text-xs text-white/60'>
        {TRANSPARENCY_CONTENT.lgpdNotice}
      </span>
    </div>

    <ul className='flex flex-col divide-y divide-white/10'>
      {TRANSPARENCY_CONTENT.interactions.map(interaction => (
        <InteractionItem key={interaction.id} interaction={interaction} />
      ))}
    </ul>
  </div>
)

const InteractionItem = ({ interaction }: { interaction: Interaction }) => (
  <li className='flex gap-3 py-4 first:pt-0 last:pb-0 sm:items-center sm:gap-4'>
    <span
      className='mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 sm:mt-0 sm:flex'
      aria-hidden='true'
    >
      <ChatIcon className='h-5 w-5 text-white/40' />
    </span>

    <div className='flex min-w-0 flex-1 flex-col gap-1 sm:gap-0.5'>
      <div className='flex items-start justify-between gap-2 sm:items-center'>
        <span className='text-sm font-medium text-white sm:truncate sm:text-base'>
          {interaction.title}
        </span>
        <StatusBadge status={interaction.status} />
      </div>
      <span className='flex flex-wrap items-center gap-x-1.5 text-xs text-white/60'>
        <LocationIcon className='h-3.5 w-3.5 shrink-0 text-white/40' />
        <span>{interaction.facility}</span>
        <span className='sr-only'>, </span>
        <span aria-hidden='true'>·</span>
        <span>
          {interaction.city} - {interaction.state}
        </span>
        <span className='sr-only'>, </span>
        <span aria-hidden='true'>·</span>
        <span>{interaction.timeAgo}</span>
      </span>
    </div>
  </li>
)
