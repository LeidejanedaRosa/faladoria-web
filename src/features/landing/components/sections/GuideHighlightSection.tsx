import bannerImg from '@assets/guide/for-those-who-need.png'
import { Container } from '@shared/components/layout'
import { GlobeIcon, LockIcon, ScreenReaderOnly } from '@shared/components/ui'
import { Link } from 'react-router-dom'

import {
  GUIDE_HIGHLIGHT_CONTENT,
  GUIDE_HIGHLIGHT_HEADING_ID,
} from '../../data/guideHighlightContent'

export const GuideHighlightSection = () => {
  return (
    <section
      className='bg-lavender-light py-16 sm:py-20 lg:py-24'
      aria-labelledby={GUIDE_HIGHLIGHT_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <p>{GUIDE_HIGHLIGHT_CONTENT.screenReaderDescription}</p>
      </ScreenReaderOnly>

      <Container>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          <TextColumn />
          <BrowserMockup />
        </div>
      </Container>
    </section>
  )
}

const TextColumn = () => (
  <div className='flex flex-col items-start gap-6'>
    <span className='text-purple-dark text-sm font-semibold tracking-wide uppercase'>
      {GUIDE_HIGHLIGHT_CONTENT.badge}
    </span>
    <h2
      id={GUIDE_HIGHLIGHT_HEADING_ID}
      className='text-purple-deepest text-3xl leading-tight font-bold sm:text-4xl'
    >
      {GUIDE_HIGHLIGHT_CONTENT.headline}
    </h2>
    <p className='text-lg leading-relaxed text-gray-600'>
      {GUIDE_HIGHLIGHT_CONTENT.description}
    </p>
    <Link
      to={GUIDE_HIGHLIGHT_CONTENT.cta.href}
      className='bg-purple-dark hover:bg-purple-medium focus-visible:ring-purple-medium inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
      aria-label={GUIDE_HIGHLIGHT_CONTENT.cta.ariaLabel}
    >
      {GUIDE_HIGHLIGHT_CONTENT.cta.label}
      <span aria-hidden='true'>&rarr;</span>
    </Link>
    <UrlIndicator />
  </div>
)

const UrlIndicator = () => (
  <div className='border-lavender bg-lavender/20 flex items-center gap-3 rounded-xl border px-4 py-3'>
    <GlobeIcon className='text-purple-dark h-5 w-5 shrink-0' />
    <div>
      <span className='block text-xs text-gray-600'>
        {GUIDE_HIGHLIGHT_CONTENT.urlIndicator.label}
      </span>
      <span className='text-purple-dark block text-sm font-medium'>
        {GUIDE_HIGHLIGHT_CONTENT.urlIndicator.url}
      </span>
    </div>
  </div>
)

const BrowserMockup = () => (
  <div className='overflow-hidden rounded-2xl shadow-xl' aria-hidden='true'>
    <BrowserChrome />
    <img
      src={bannerImg}
      alt={GUIDE_HIGHLIGHT_CONTENT.bannerAlt}
      width={1280}
      height={720}
      loading='lazy'
      className='aspect-video w-full object-cover object-center'
    />
  </div>
)

const BrowserChrome = () => (
  <div className='flex items-center gap-3 bg-white px-4 py-3'>
    <div className='flex gap-1.5'>
      <span className='h-3 w-3 rounded-full bg-red-400' />
      <span className='h-3 w-3 rounded-full bg-yellow-400' />
      <span className='h-3 w-3 rounded-full bg-green-400' />
    </div>
    <div className='flex flex-1 items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5'>
      <LockIcon className='h-3 w-3 shrink-0 text-gray-400' />
      <span className='truncate text-xs text-gray-600'>
        {GUIDE_HIGHLIGHT_CONTENT.urlIndicator.url}
      </span>
    </div>
  </div>
)
