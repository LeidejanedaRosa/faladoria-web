import type { ComponentType } from 'react'

import {
  AccessibleLink,
  CheckIcon,
  HeartIcon,
  PhoneIcon,
  ShieldIcon,
  UsersIcon,
} from '@shared/components/ui'
import { WHATSAPP_URL } from '@shared/data/companyInfo'
import { cn } from '@shared/utils/cn'

import {
  type ArticleFooterTrustIconBg,
  type ArticleFooterTrustIconName,
  GUIDE_CONTENT,
} from '../data'

const TRUST_ICON_MAP: Record<
  ArticleFooterTrustIconName,
  ComponentType<{ className?: string }>
> = {
  shield: ShieldIcon,
  heart: HeartIcon,
  users: UsersIcon,
  check: CheckIcon,
}

const TRUST_ICON_BG: Record<ArticleFooterTrustIconBg, string> = {
  purple: 'bg-purple-500',
  rose: 'bg-rose-500',
  indigo: 'bg-indigo-500',
  green: 'bg-green-500',
}

export const GuideArticleFooter = () => {
  const { help, trustSignals } = GUIDE_CONTENT.articlePage

  return (
    <footer className='mt-10 rounded-2xl border border-purple-100 bg-purple-50 p-6'>
      <div className='flex flex-col gap-6 sm:flex-row sm:items-center'>
        <div className='sm:w-2/5 sm:shrink-0'>
          <p className='text-lg font-bold text-purple-900'>{help.title}</p>
          <p className='mt-1 text-sm text-gray-600'>{help.description}</p>
          <AccessibleLink
            href={WHATSAPP_URL}
            external
            showExternalIcon={false}
            aria-label={`${help.cta} pelo WhatsApp (abre em nova aba)`}
            className='mt-4 inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600'
          >
            <PhoneIcon className='h-4 w-4' aria-hidden='true' />
            {help.cta}
          </AccessibleLink>
        </div>

        <div
          className='hidden w-px self-stretch bg-purple-200 sm:block'
          aria-hidden='true'
        />

        <div className='grid grid-cols-2 gap-4 sm:flex-1 lg:grid-cols-4'>
          {trustSignals.map(signal => {
            const Icon = TRUST_ICON_MAP[signal.iconName]
            return (
              <div
                key={signal.title}
                className='flex items-start gap-2 lg:flex-col lg:items-center lg:text-center'
              >
                <div
                  className={cn(
                    'mt-0.5 shrink-0 rounded-full p-2 text-white lg:mt-0 lg:p-2.5',
                    TRUST_ICON_BG[signal.iconBg]
                  )}
                  aria-hidden='true'
                >
                  <Icon className='h-4 w-4 lg:h-5 lg:w-5' />
                </div>
                <div>
                  <p className='text-sm font-semibold text-gray-800'>
                    {signal.title}
                  </p>
                  <p className='mt-0.5 text-xs text-gray-500'>
                    {signal.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
