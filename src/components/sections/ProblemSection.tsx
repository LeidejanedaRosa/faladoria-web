import type { NewsArticle } from '@components/data/problemContent'
import {
  PROBLEM_CONTENT,
  PROBLEM_HEADING_ID,
} from '@components/data/problemContent'
import { Container } from '@components/layout/Container'
import { AccessibleLink, ScreenReaderOnly } from '@components/ui/Accessibility'
import { WhatsAppCTA } from '@components/ui/WhatsAppCTA'
import { PersonIcon } from '@components/ui/icons'

export const ProblemSection = () => {
  return (
    <section className="bg-gray-light" aria-labelledby={PROBLEM_HEADING_ID}>
      <ScreenReaderOnly>
        <h2 id={PROBLEM_HEADING_ID}>{PROBLEM_CONTENT.sectionHeading}</h2>
      </ScreenReaderOnly>

      <Container className="flex flex-col gap-16 py-16 sm:gap-20 sm:py-20 lg:gap-24 lg:py-24">
        <NewsBlock />
        <StatisticBlock />
        <ProblemCTA />
      </Container>
    </section>
  )
}

const StatisticBlock = () => {
  const { intro, statistic } = PROBLEM_CONTENT

  return (
    <div className="flex flex-col gap-10 md:flex-row lg:justify-between lg:gap-12">
      <div className="flex flex-col gap-4 lg:items-start lg:gap-12">
        <p className="text-purple-dark max-w-md text-lg leading-relaxed sm:text-xl">
          {intro.description}
        </p>
        <p className="max-w-sm text-sm sm:text-base">
          <strong className="text-purple-dark font-bold">
            {PROBLEM_CONTENT.sourceLabel}{' '}
          </strong>
          <AccessibleLink
            href={intro.source.url}
            external
            className="text-purple-dark hover:text-purple-medium underline underline-offset-2 transition-colors"
            aria-label={`${intro.source.label} — ${intro.source.text} (abre em nova aba)`}
          >
            {intro.source.label} – {intro.source.text}
          </AccessibleLink>
        </p>
      </div>

      <div className="flex flex-col items-center gap-8 xl:flex-row-reverse xl:items-end xl:justify-between">
        <div className="flex flex-col items-center gap-4 lg:items-end">
          <PeopleGrid
            total={statistic.total}
            highlighted={statistic.highlighted}
          />
          <p className="max-w-xs text-center text-sm text-gray-600 lg:text-right">
            {statistic.caption}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 lg:items-start">
          <p
            className="text-purple-dark text-[clamp(6rem,20vw,14rem)] leading-none font-bold tracking-tighter"
            aria-hidden="true"
          >
            {statistic.value}
          </p>
          <ScreenReaderOnly>
            <span>{statistic.screenReaderText}</span>
          </ScreenReaderOnly>
        </div>
      </div>
    </div>
  )
}

const PeopleGrid = ({
  total,
  highlighted,
}: {
  total: number
  highlighted: number
}) => {
  const satisfiedCount = total - highlighted

  return (
    <div
      className="grid grid-cols-10 gap-0.5 sm:gap-1"
      role="img"
      aria-label={`Representação visual: ${highlighted} de ${total} pessoas insatisfeitas`}
    >
      {Array.from({ length: total }, (_, i) => (
        <PersonIcon
          key={i}
          className={`h-5 w-5 sm:h-6 sm:w-6 ${
            i < satisfiedCount ? 'text-lavender/40' : 'text-purple-dark'
          }`}
        />
      ))}
    </div>
  )
}

const NewsBlock = () => {
  const { newsHeadline, newsArticles } = PROBLEM_CONTENT

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      <h3 className="text-purple-dark max-w-md text-3xl leading-tight font-bold italic sm:text-4xl lg:text-5xl">
        {newsHeadline}
      </h3>
      {newsArticles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}

const NewsCard = ({ article }: { article: NewsArticle }) => (
  <article className="flex flex-col gap-4">
    <div className="mx-auto aspect-square w-48 overflow-hidden rounded-full sm:w-56 lg:w-64">
      <picture>
        <source srcSet={article.image.avif} type="image/avif" />
        <source srcSet={article.image.webp} type="image/webp" />
        <img
          src={article.image.fallback}
          alt={article.image.alt}
          width={article.image.width}
          height={article.image.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </picture>
    </div>

    <div className="flex flex-col gap-1 text-center">
      <AccessibleLink
        href={article.url}
        external
        showExternalIcon={false}
        className="text-purple-dark hover:text-purple-medium text-sm leading-snug font-bold transition-colors sm:text-base"
        aria-label={`${article.title} — Fonte: ${article.source} (abre em nova aba)`}
      >
        {article.title}
      </AccessibleLink>
      <p className="text-sm text-black">
        <strong className="font-bold">{PROBLEM_CONTENT.sourceLabel}</strong>{' '}
        {article.source}
      </p>
    </div>
  </article>
)

const ProblemCTA = () => {
  const { cta } = PROBLEM_CONTENT

  return (
    <div className="from-purple-dark to-purple-medium rounded-2xl bg-linear-to-r px-6 py-12 text-center sm:px-12 sm:py-16">
      <h3 className="text-2xl font-bold text-white sm:text-3xl">
        {cta.headline}
      </h3>
      <p className="mx-auto mt-3 max-w-lg text-base text-white/80 sm:text-lg">
        {cta.description}
      </p>
      <WhatsAppCTA
        variant="secondary"
        className="mt-8 px-8 py-3 text-base font-bold"
        aria-label={cta.buttonAriaLabel}
      >
        {cta.buttonText}
      </WhatsAppCTA>
    </div>
  )
}
