import {
  AccessibleLink,
  ChevronRightIcon,
  LightbulbIcon,
  PhoneIcon,
} from '@shared/components/ui'
import { WHATSAPP_URL } from '@shared/data/companyInfo'

import { GUIDE_CONTENT } from '../data'

export const GuideCategoryFooter = () => {
  const { tip, help } = GUIDE_CONTENT.categoryPage

  return (
    <footer className='mt-8 flex flex-col rounded-2xl border border-purple-100 bg-purple-50 sm:flex-row sm:items-stretch'>
      <div className='flex flex-1 items-center gap-4 px-6 py-5'>
        <div
          className='bg-purple-dark shrink-0 rounded-full p-2.5 text-white'
          aria-hidden='true'
        >
          <LightbulbIcon className='h-5 w-5' />
        </div>
        <div>
          <p className='text-purple-deepest font-semibold'>{tip.title}</p>
          <p className='mt-1 text-sm text-gray-600'>{tip.description}</p>
        </div>
      </div>

      <div
        className='hidden w-px self-center bg-purple-100 sm:block sm:h-16'
        aria-hidden='true'
      />

      <AccessibleLink
        href={WHATSAPP_URL}
        external
        showExternalIcon={false}
        aria-label='Fale com a equipe pelo WhatsApp (abre em nova aba)'
        className='flex flex-1 items-center gap-4 px-6 py-5 transition-colors hover:bg-purple-100/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600'
      >
        <div
          className='bg-purple-dark shrink-0 rounded-full p-2.5 text-white'
          aria-hidden='true'
        >
          <PhoneIcon className='h-5 w-5' />
        </div>
        <div className='flex-1'>
          <p className='text-purple-deepest font-semibold'>{help.title}</p>
          <p className='mt-1 text-sm text-gray-600'>{help.description}</p>
        </div>
        <ChevronRightIcon
          className='text-purple-dark h-5 w-5 shrink-0'
          aria-hidden='true'
        />
      </AccessibleLink>
    </footer>
  )
}
