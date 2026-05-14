import { Link } from 'react-router-dom'

import bannerImg from '@assets/guide/bn-para-quem-precisa.jpg'
import {
  GUIDE_HIGHLIGHT_CONTENT,
  GUIDE_HIGHLIGHT_HEADING_ID,
} from '@components/data'
import { Container } from '@components/layout'
import { ScreenReaderOnly } from '@components/ui'

export const GuideHighlightSection = () => {
  return (
    <section
      className="bg-lavender-light py-16 sm:py-20 lg:py-24"
      aria-labelledby={GUIDE_HIGHLIGHT_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <p>{GUIDE_HIGHLIGHT_CONTENT.screenReaderDescription}</p>
      </ScreenReaderOnly>

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text + CTA */}
          <div className="flex flex-col items-start gap-6">
            <span className="text-purple-dark text-sm font-semibold tracking-wide uppercase">
              {GUIDE_HIGHLIGHT_CONTENT.badge}
            </span>
            <h2
              id={GUIDE_HIGHLIGHT_HEADING_ID}
              className="text-purple-deepest text-3xl leading-tight font-bold sm:text-4xl"
            >
              {GUIDE_HIGHLIGHT_CONTENT.headline}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {GUIDE_HIGHLIGHT_CONTENT.description}
            </p>
            <Link
              to={GUIDE_HIGHLIGHT_CONTENT.cta.href}
              className="bg-purple-dark hover:bg-purple-medium focus-visible:ring-purple-medium inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label={GUIDE_HIGHLIGHT_CONTENT.cta.ariaLabel}
            >
              {GUIDE_HIGHLIGHT_CONTENT.cta.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Banner image — cropped to focus on the person */}
          <img
            src={bannerImg}
            alt="Mulher com megafone representando o poder da informação no acesso ao SUS"
            width={1280}
            height={720}
            loading="lazy"
            className="aspect-video w-full rounded-2xl object-cover object-left shadow-lg"
          />
        </div>
      </Container>
    </section>
  )
}
