import { Container } from '@shared/components/layout/Container'
import { ScreenReaderOnly } from '@shared/components/ui/Accessibility'
import { FOOTER_CONTENT, FOOTER_HEADING_ID } from '@shared/data/footerContent'
import { SECTION_IDS } from '@shared/data/navigation'

import { FooterBottom } from './FooterBottom'
import { FooterBrand } from './FooterBrand'
import { FooterContact } from './FooterContact'
import { FooterLinks } from './FooterLinks'
import { FooterMission } from './FooterMission'

export const FooterSection = () => (
  <footer
    id={SECTION_IDS.contact}
    aria-labelledby={FOOTER_HEADING_ID}
    className='bg-purple-deepest py-12 lg:py-16'
  >
    <ScreenReaderOnly asChild>
      <h2 id={FOOTER_HEADING_ID}>{FOOTER_CONTENT.screenReaderHeading}</h2>
    </ScreenReaderOnly>

    <Container>
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        <FooterBrand />
        <FooterLinks />
        <FooterContact />
      </div>
      <FooterMission />
      <FooterBottom />
    </Container>
  </footer>
)
