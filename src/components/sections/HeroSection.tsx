import logoFaladoria from '@assets/faladoria_secundaria.svg'

import { COMPANY_INFO } from '@components/data/companyInfo'
import { Container } from '@components/layout/Container'
import { ScreenReaderOnly } from '@components/ui/Accessibility'

const HERO_HEADING_ID = 'hero-heading'

const HERO_CONTENT = {
  headline: {
    lines: ['Você fala.', 'O SUS escuta.', 'Nós resolvemos.'],
  },
  logo: {
    ariaLabel: `Logo ${COMPANY_INFO.name} - Dois balões de conversa com as palavras Fala e Doria. ${COMPANY_INFO.shortDescription}`,
  },
} as const

export const HeroSection = () => {
  return (
    <section
      className="bg-purple-medium flex min-h-screen"
      aria-labelledby={HERO_HEADING_ID}
    >
      <Container className="flex flex-col items-center justify-center md:flex-row-reverse">
        <HeroLogo />
        <HeroHeadline />
      </Container>

      <ScreenReaderOnly>
        <p>{COMPANY_INFO.description}</p>
      </ScreenReaderOnly>
    </section>
  )
}

const HeroHeadline = () => (
  <h1
    id={HERO_HEADING_ID}
    className="text-right text-2xl leading-tight tracking-tight text-nowrap text-white uppercase italic sm:text-3xl md:text-4xl lg:text-5xl"
  >
    {HERO_CONTENT.headline.lines.map(line => (
      <span key={line} className="block">
        {line}{' '}
      </span>
    ))}
  </h1>
)

const HeroLogo = () => (
  <img
    src={logoFaladoria}
    alt={HERO_CONTENT.logo.ariaLabel}
    width={320}
    height={260}
    className="mb-10 h-[40vh] w-auto md:mb-0 md:ml-5 lg:h-[60vh] xl:h-[40vh]"
    loading="eager"
    decoding="async"
    fetchPriority="high"
  />
)
