import { ABOUT_CONTENT, ABOUT_HEADING_ID } from '@components/data/aboutContent'
import { SECTION_IDS } from '@components/data/navigation'
import { Container } from '@components/layout/Container'
import { ScreenReaderOnly } from '@components/ui/Accessibility'
import { FounderPhoto } from './FounderPhoto'
import { FounderQuote } from './FounderQuote'
import { PartnershipsBlock } from './PartnershipsBlock'

export const AboutSection = () => {
  return (
    <section
      id={SECTION_IDS.aboutUs}
      className="via-lavender-light to-lavender overflow-hidden bg-linear-to-b from-white lg:flex lg:min-h-screen lg:items-center"
      aria-labelledby={ABOUT_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <h2 id={ABOUT_HEADING_ID}>{ABOUT_CONTENT.screenReaderHeading}</h2>
      </ScreenReaderOnly>
      <ScreenReaderOnly asChild>
        <p>{ABOUT_CONTENT.screenReaderDescription}</p>
      </ScreenReaderOnly>

      <Container className="flex w-full flex-col py-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <span
              className="text-purple-dark text-5xl font-bold sm:px-20 sm:text-6xl lg:px-0"
              aria-hidden="true"
            >
              {ABOUT_CONTENT.headline}
            </span>
            <FounderQuote />
          </div>
          <FounderPhoto />
        </div>

        <div className="mt-16 xl:mt-0">
          <PartnershipsBlock />
        </div>
      </Container>
    </section>
  )
}
