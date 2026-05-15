import logoFaladoria from '@assets/faladoria_secundaria.svg'

import { COMPANY_INFO, WHATSAPP_URL } from '@shared/data/companyInfo'
import { HERO_CONTENT, HERO_HEADING_ID } from '../../data/heroContent'
import { SECTION_IDS } from '@shared/data/navigation'
import { Container } from '@shared/components/layout/Container'
import {
  AccessibleLink,
  ScreenReaderOnly,
} from '@shared/components/ui/Accessibility'
import { ActivityIcon, WhatsAppIcon } from '@shared/components/ui'

export const HeroSection = () => {
  return (
    <section
      className="bg-purple-medium flex"
      aria-labelledby={HERO_HEADING_ID}
    >
      <Container className="flex min-h-[calc(100dvh-var(--header-height))] flex-col items-center justify-center gap-6 py-12 sm:py-16 md:py-24">
        <HeroBadge />

        <div className="flex flex-col items-center gap-6 lg:flex-row-reverse">
          <HeroLogo />
          <HeroHeadline />
        </div>

        <HeroDescription />
        <HeroCTAs />

        <ScreenReaderOnly asChild>
          <p>{COMPANY_INFO.description}</p>
        </ScreenReaderOnly>
      </Container>
    </section>
  )
}

const HeroBadge = () => (
  <p className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm sm:text-sm">
    <ScreenReaderOnly>Plataforma ativa</ScreenReaderOnly>
    <span
      className="h-2 w-2 shrink-0 rounded-full bg-green-400"
      aria-hidden="true"
    />
    {HERO_CONTENT.badge}
  </p>
)

const HeroHeadline = () => (
  <h1
    id={HERO_HEADING_ID}
    className="text-center text-3xl leading-tight tracking-tight text-white uppercase italic sm:text-4xl lg:text-right lg:text-5xl xl:text-6xl"
  >
    {HERO_CONTENT.headline.lines.map((line, index) => (
      <span key={`${index}-${line}`} className="block">
        {line}
      </span>
    ))}
  </h1>
)

const HeroDescription = () => (
  <p className="max-w-2xl text-center text-base leading-relaxed text-white sm:text-lg md:text-xl">
    {HERO_CONTENT.description}
  </p>
)

const HeroCTAs = () => (
  <nav
    aria-label="Ações principais"
    className="flex flex-col items-center gap-4 pt-2 sm:flex-row"
  >
    <AccessibleLink
      href={WHATSAPP_URL}
      external
      showExternalIcon={false}
      className="focus:ring-offset-purple-medium inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
      aria-label="Reclamar Agora (abre em nova aba)"
    >
      <WhatsAppIcon className="h-5 w-5" />
      Reclamar Agora
    </AccessibleLink>

    <AccessibleLink
      href={`/#${SECTION_IDS.transparency}`}
      className="focus:ring-offset-purple-medium inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:outline-none"
      aria-label="Ver dados em tempo real - ir para seção de transparência"
    >
      <ActivityIcon className="h-5 w-5" />
      Ver Dados em Tempo Real
    </AccessibleLink>
  </nav>
)

const HeroLogo = () => (
  <img
    src={logoFaladoria}
    alt={HERO_CONTENT.logo.ariaLabel}
    width={590}
    height={475}
    className="h-[25vh] w-auto sm:h-[30vh] lg:ml-5 lg:h-[35vh]"
    loading="eager"
    decoding="async"
    fetchPriority="high"
  />
)
