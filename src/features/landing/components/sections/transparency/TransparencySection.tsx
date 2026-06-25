import { Container } from '@shared/components/layout/Container'
import { ScreenReaderOnly } from '@shared/components/ui'
import { SECTION_IDS } from '@shared/data/navigation'

import {
  TOTAL_DEMANDS,
  TRANSPARENCY_CONTENT,
  TRANSPARENCY_HEADING_ID,
} from '../../../data/transparencyContent'
import { CtaCard } from './CtaCard'
import { InteractionsPanel } from './InteractionsPanel'
import { StatsGrid } from './StatsGrid'
import { StatusLegend } from './StatusLegend'
import { TransparencyHeader } from './TransparencyHeader'

export const TransparencySection = () => {
  return (
    <section
      id={SECTION_IDS.transparency}
      className='bg-purple-deepest'
      aria-labelledby={TRANSPARENCY_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <h2 id={TRANSPARENCY_HEADING_ID}>
          {TRANSPARENCY_CONTENT.sectionHeading}
        </h2>
      </ScreenReaderOnly>

      <Container className='flex flex-col gap-10 py-16 sm:gap-12 sm:py-20 lg:py-24'>
        <TransparencyHeader />
        <StatsGrid
          stats={TRANSPARENCY_CONTENT.stats}
          totalValue={TOTAL_DEMANDS}
        />
        <div className='grid min-w-0 gap-8 lg:grid-cols-[2fr_1fr] lg:items-start'>
          <InteractionsPanel />
          <div className='flex flex-col gap-6'>
            <CtaCard />
            <StatusLegend />
          </div>
        </div>
      </Container>
    </section>
  )
}
