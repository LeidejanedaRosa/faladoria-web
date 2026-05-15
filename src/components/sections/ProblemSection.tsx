import type { NewsArticle } from '@components/data/problemContent'
import {
  PROBLEM_CONTENT,
  PROBLEM_HEADING_ID,
} from '@components/data/problemContent'
import { Container } from '@components/layout/Container'
import { PersonIcon } from '@components/ui'
import { AccessibleLink, ScreenReaderOnly } from '@components/ui/Accessibility'
import { WhatsAppCTA } from '@components/ui/WhatsAppCTA'

export const ProblemSection = () => {
  return (
    <section className="bg-gray-light" aria-labelledby={PROBLEM_HEADING_ID}>
      <ScreenReaderOnly asChild>
        <h2 id={PROBLEM_HEADING_ID}>{PROBLEM_CONTENT.sectionHeading}</h2>
      </ScreenReaderOnly>

      <Container className="flex flex-col gap-8 py-8 sm:gap-10 sm:py-10 lg:gap-12 lg:py-12">
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
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
      <blockquote className="flex gap-4 lg:flex-1">
        <span
          className="text-purple-dark/20 shrink-0 text-7xl leading-none font-bold select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <div className="border-purple-dark flex flex-col gap-2 border-l-2 pl-4">
          <p className="text-purple-dark text-xl leading-relaxed font-semibold sm:text-2xl">
            {intro.ministerQuote.text}
          </p>
          <footer className="mt-1 text-sm text-gray-600">
            <strong className="text-purple-dark font-bold">
              {intro.ministerQuote.author}
            </strong>
            {', '}
            {intro.ministerQuote.role}
          </footer>
          <p className="mt-1 max-w-sm text-sm sm:text-base">
            <strong className="text-purple-dark font-bold">
              {PROBLEM_CONTENT.sourceLabel}{' '}
            </strong>
            <AccessibleLink
              href={statistic.source.url}
              external
              className="text-purple-dark hover:text-purple-medium underline underline-offset-2 transition-colors"
              aria-label={`${statistic.source.label} — ${statistic.source.text} (abre em nova aba)`}
            >
              {statistic.source.label} – {statistic.source.text}
            </AccessibleLink>
          </p>
        </div>
      </blockquote>

      <PeopleGrid total={statistic.total} highlighted={statistic.highlighted} />

      <p className="text-sm text-gray-600 lg:max-w-50">
        A maioria da população encontra{' '}
        <strong className="text-purple-dark font-bold underline underline-offset-2">
          muitas dificuldades
        </strong>{' '}
        ao utilizar o SUS.
      </p>
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
      aria-label="Representação visual de pessoas em fila: a maioria encontra dificuldades ao utilizar o SUS"
    >
      {Array.from({ length: total }, (_, i) => (
        <PersonIcon
          key={i}
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            i < satisfiedCount ? 'text-lavender/40' : 'text-purple-dark'
          }`}
        />
      ))}
    </div>
  )
}

const NewsBlock = () => {
  const { newsHeadline, newsDescription, newsArticles } = PROBLEM_CONTENT

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-purple-dark max-w-md text-2xl leading-tight font-bold italic sm:text-3xl lg:text-4xl">
            {newsHeadline}
          </h3>
          <div className="bg-purple-dark mt-3 h-1 w-8" />
        </div>
        <p className="text-sm text-gray-600 sm:text-base">{newsDescription}</p>
      </div>
      {newsArticles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}

const NewsCard = ({ article }: { article: NewsArticle }) => (
  <article className="flex flex-col gap-4 rounded-2xl bg-white p-5">
    <div className="aspect-square overflow-hidden rounded-full">
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
