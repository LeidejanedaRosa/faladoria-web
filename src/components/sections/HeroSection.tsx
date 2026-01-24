import logoFaladoria from '@assets/Faladoria secundária.svg'

import { COMPANY_INFO } from '@components/data/companyInfo'
import { ScreenReaderOnly } from '@components/ui/Accessibility'

const HERO_CONTENT = {
  headline: {
    lines: ['Você fala.', 'O SUS escuta.', 'Nós resolvemos.'],
  },
  logo: {
    alt: `Logo ${COMPANY_INFO.name} - Dois balões de conversa com as palavras Fala e Doria`,
    ariaLabel: `${COMPANY_INFO.name}: ${COMPANY_INFO.shortDescription}`,
  },
} as const

export const HeroSection = () => {
  return (
    <section
      className="bg-purple-medium flex min-h-screen items-center justify-center"
      aria-labelledby="hero-heading"
    >
      <div className="flex items-center">
        <HeroHeadline />
        <HeroLogo />
      </div>

      <ScreenReaderOnly>
        <p>{COMPANY_INFO.description}</p>
      </ScreenReaderOnly>
    </section>
  )
}

const HeroHeadline = () => (
  <h1
    id="hero-heading"
    className="text-right text-2xl leading-tight font-bold tracking-tight text-white italic sm:text-3xl md:text-4xl lg:text-5xl"
  >
    {HERO_CONTENT.headline.lines.map((line, index) => (
      <span key={index} className="block">
        {line.toUpperCase()}
      </span>
    ))}
  </h1>
)

const HeroLogo = () => (
  <div role="img" aria-label={HERO_CONTENT.logo.ariaLabel}>
    <img
      src={logoFaladoria}
      alt={HERO_CONTENT.logo.alt}
      width={320}
      height={260}
      className="h-auto w-44 sm:w-52 md:w-64 lg:w-80"
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  </div>
)
