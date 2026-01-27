import { Container } from '@components/layout'
import { ScreenReaderOnly } from '@components/ui'

const ABOUT_HEADING_ID = 'about-heading'

const ABOUT_CONTENT = {
  heading:
    'Criamos a faladoria para conectar usuários do SUS à gestão pública e melhorar o atendimento de saúde.',
  taglineLine1: 'Uma plataforma independente',
  taglineLine2: 'para ouvir, mediar e resolver.',
  screenReaderDescription:
    'Seção sobre a faladoria, uma plataforma independente que conecta usuários do SUS à gestão pública.',
} as const

export const AboutSection = () => {
  return (
    <section className="bg-purple-medium" aria-labelledby={ABOUT_HEADING_ID}>
      <Container className="flex flex-col">
        <div className="flex flex-1 items-center justify-center">
          <h2
            id={ABOUT_HEADING_ID}
            className="max-w-5xl text-3xl text-white italic sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {ABOUT_CONTENT.heading}
          </h2>
        </div>

        <p className="self-end pb-6 text-right text-sm leading-tight text-white/80 md:text-base">
          {ABOUT_CONTENT.taglineLine1}
          <br />
          {ABOUT_CONTENT.taglineLine2}
        </p>

        <ScreenReaderOnly>
          <p>{ABOUT_CONTENT.screenReaderDescription}</p>
        </ScreenReaderOnly>
      </Container>
    </section>
  )
}
