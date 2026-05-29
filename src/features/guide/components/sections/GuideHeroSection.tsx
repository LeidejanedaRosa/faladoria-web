import heroPng from '@assets/guide/hero_section.png'
import { Container } from '@shared/components/layout'
import {
  BookOpenIcon,
  CheckIcon,
  ChevronRightIcon,
  HeartIcon,
  ShieldIcon,
  UsersIcon,
} from '@shared/components/ui'

import {
  GUIDE_CATEGORIES_SECTION_ID,
  GUIDE_CONTENT,
  GUIDE_HEADING_ID,
  type HeroTrustCircleColor,
  type HeroTrustIconName,
} from '../../data'
import type { IconComponent } from '../guideIconMap'

const HERO_TRUST_ICON_MAP: Record<HeroTrustIconName, IconComponent> = {
  users: UsersIcon,
  heart: HeartIcon,
  check: CheckIcon,
}

const HERO_TRUST_CIRCLE_CLASSES: Record<HeroTrustCircleColor, string> = {
  purple: 'bg-purple-medium',
  rose: 'bg-rose-500',
  teal: 'bg-teal-500',
}

const GuideHeroBadge = () => (
  <span className='border-purple-dark/30 text-purple-dark inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-semibold tracking-wide uppercase sm:text-sm'>
    <BookOpenIcon className='h-4 w-4' />
    {GUIDE_CONTENT.hero.badge}
  </span>
)

const GuideHeroHeadline = () => (
  <h1
    id={GUIDE_HEADING_ID}
    className='text-purple-deepest text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl'
  >
    {GUIDE_CONTENT.hero.headline.base}{' '}
    <span className='text-purple-dark'>
      {GUIDE_CONTENT.hero.headline.highlight}
    </span>
  </h1>
)

const GuideHeroDescription = () => (
  <p className='max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg'>
    {GUIDE_CONTENT.hero.description}
  </p>
)

const GuideHeroTrustList = () => (
  <ul className='flex flex-wrap gap-x-8 gap-y-4' aria-label='Destaques do guia'>
    {GUIDE_CONTENT.hero.trustSignals.map(signal => {
      const Icon = HERO_TRUST_ICON_MAP[signal.iconName]
      const circleClass = HERO_TRUST_CIRCLE_CLASSES[signal.circleColor]
      return (
        <li key={signal.label} className='flex items-center gap-3'>
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${circleClass}`}
            aria-hidden='true'
          >
            <Icon className='h-5 w-5 text-white' />
          </div>
          <span className='text-purple-deepest text-sm font-semibold'>
            {signal.label}
          </span>
        </li>
      )
    })}
  </ul>
)

const GuideHeroCTA = () => (
  <a
    href={`#${GUIDE_CATEGORIES_SECTION_ID}`}
    className='bg-purple-dark hover:bg-purple-medium focus-visible:outline-purple-dark inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto sm:justify-start'
  >
    {GUIDE_CONTENT.hero.cta}
    <ChevronRightIcon className='h-4 w-4 rotate-90' aria-hidden='true' />
  </a>
)

const GuideHeroContent = () => (
  <div className='flex flex-col items-start gap-6 lg:py-8'>
    <GuideHeroBadge />
    <GuideHeroHeadline />
    <GuideHeroDescription />
    <GuideHeroTrustList />
    <GuideHeroCTA />
  </div>
)

const GuideHeroImage = () => (
  <div className='flex items-end overflow-hidden rounded-2xl lg:rounded-none'>
    <img
      src={heroPng}
      alt={GUIDE_CONTENT.hero.image.alt}
      width={GUIDE_CONTENT.hero.image.width}
      height={GUIDE_CONTENT.hero.image.height}
      loading='eager'
      decoding='async'
      fetchPriority='high'
      className='h-auto w-full'
    />
  </div>
)

const GuideHeroInfoBar = () => (
  <div className='bg-lavender-light border-lavender border-y'>
    <Container className='py-4'>
      <footer className='flex flex-col items-center gap-2 text-center text-xs text-gray-500 sm:flex-row sm:justify-center sm:gap-6'>
        <p className='flex items-center gap-2'>
          <ShieldIcon
            className='text-purple-medium h-4 w-4 shrink-0'
            aria-hidden='true'
          />
          {GUIDE_CONTENT.hero.infoBar.message}
        </p>
        <span className='hidden text-gray-300 sm:block' aria-hidden='true'>
          |
        </span>
        <p className='text-purple-medium font-semibold'>
          {GUIDE_CONTENT.hero.infoBar.badge}
        </p>
      </footer>
    </Container>
  </div>
)

export const GuideHeroSection = () => (
  <section
    className='bg-lavender-light flex flex-col lg:h-[calc(100dvh-var(--header-height))]'
    aria-labelledby={GUIDE_HEADING_ID}
  >
    <div className='bg-lavender-light flex flex-1 pt-16 pb-10 sm:pt-20 sm:pb-14 lg:py-0'>
      <Container className='flex h-full'>
        <div className='grid h-full w-full grid-cols-1 items-center gap-10 lg:grid-cols-[2fr_3fr] lg:items-stretch lg:gap-12'>
          <div className='flex flex-col justify-center'>
            <GuideHeroContent />
          </div>
          <GuideHeroImage />
        </div>
      </Container>
    </div>
    <GuideHeroInfoBar />
  </section>
)
