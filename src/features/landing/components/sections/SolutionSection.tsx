import type { ComponentType } from 'react'

import { Container } from '@shared/components/layout/Container'
import { ChatIcon, ScreenReaderOnly } from '@shared/components/ui'
import { SECTION_IDS } from '@shared/data/navigation'
import type { IconProps } from '@shared/types/icon'

import {
  SOLUTION_CONTENT,
  SOLUTION_HEADING_ID,
} from '../../data/solutionContent'

type Pillar = (typeof SOLUTION_CONTENT.pillars)[number]
type PillarIcon = Pillar['icon']

const SVG_ICON_MAP = {
  chat: ChatIcon,
} satisfies Record<string, ComponentType<IconProps>>

export const SolutionSection = () => {
  return (
    <section
      id={SECTION_IDS.solution}
      className='bg-white'
      aria-labelledby={SOLUTION_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <h2 id={SOLUTION_HEADING_ID}>{SOLUTION_CONTENT.sectionHeading}</h2>
      </ScreenReaderOnly>

      <Container className='flex flex-col gap-12 py-16 sm:gap-16 sm:py-20 lg:gap-20 lg:py-24'>
        <SolutionHeader />
        <PillarGrid />
      </Container>
    </section>
  )
}

const SolutionHeader = () => (
  <div className='flex flex-col items-center gap-4 text-center'>
    <h3 className='text-purple-dark flex flex-wrap items-center justify-center gap-x-3 text-3xl font-bold sm:text-4xl lg:text-5xl'>
      {SOLUTION_CONTENT.headline.before}
      <img
        src={SOLUTION_CONTENT.headline.logo}
        alt='Faladoria'
        width={600}
        height={485}
        className='inline-block h-8 w-auto sm:h-10 lg:h-12'
        aria-hidden='true'
      />
      <span className='sr-only'>Faladoria</span>
      {SOLUTION_CONTENT.headline.after}
    </h3>
    <p className='text-purple-medium text-lg sm:text-xl'>
      {SOLUTION_CONTENT.subtitle}
    </p>
  </div>
)

const PillarGrid = () => (
  <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
    {SOLUTION_CONTENT.pillars.map(pillar => (
      <PillarCard key={pillar.id} pillar={pillar} />
    ))}
  </ul>
)

const PillarIconRenderer = ({ icon }: { icon: PillarIcon }) => {
  if (icon.kind === 'image') {
    return (
      <img
        src={icon.src}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        loading='lazy'
        decoding='async'
        className='h-16 w-auto'
      />
    )
  }

  const SvgIcon = SVG_ICON_MAP[icon.name]
  return <SvgIcon className='text-purple-dark h-16 w-16' aria-hidden='true' />
}

const PillarCard = ({ pillar }: { pillar: Pillar }) => (
  <li className='bg-gray-light flex flex-col items-center gap-4 rounded-2xl p-6 text-center'>
    <div className='flex h-16 w-16 items-center justify-center'>
      <PillarIconRenderer icon={pillar.icon} />
    </div>
    <h4 className='text-purple-dark text-lg font-semibold sm:text-xl'>
      {pillar.title}
    </h4>
    <p className='text-sm leading-relaxed text-gray-600 sm:text-base'>
      {pillar.description}
    </p>
  </li>
)
