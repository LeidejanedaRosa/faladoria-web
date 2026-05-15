import { ABOUT_CONTENT, ABOUT_HEADING_ID } from '../../../data/aboutContent'
import { SECTION_IDS } from '@shared/data/navigation'
import { Container } from '@shared/components/layout/Container'
import { ScreenReaderOnly } from '@shared/components/ui/Accessibility'
import { FounderPhoto } from './FounderPhoto'
import { FounderTraits } from './FounderTraits'

export const AboutSection = () => {
  return (
    <section
      id={SECTION_IDS.aboutUs}
      className="via-lavender-light to-lavender overflow-hidden bg-linear-to-b from-white lg:flex lg:min-h-screen lg:items-center"
      aria-labelledby={ABOUT_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <p>{ABOUT_CONTENT.screenReaderDescription}</p>
      </ScreenReaderOnly>

      <Container className="flex w-full flex-col py-12 lg:py-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col gap-8">
            <div>
              <h2
                id={ABOUT_HEADING_ID}
                className="text-purple-dark text-5xl font-bold sm:text-6xl"
              >
                {ABOUT_CONTENT.headline}
              </h2>
              <div
                className="bg-purple-dark mt-3 h-1 w-12 rounded-full"
                aria-hidden="true"
              />
            </div>
            <FounderTraits />
          </div>

          <FounderPhoto />
        </div>
      </Container>
    </section>
  )
}
