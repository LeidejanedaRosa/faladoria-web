import {
  SOLUTION_CONTENT,
  SOLUTION_HEADING_ID,
} from '@components/data/solutionContent'
import { SECTION_IDS } from '@components/data/navigation'
import { Container } from '@components/layout/Container'
import { ScreenReaderOnly } from '@components/ui/Accessibility'

export const SolutionSection = () => {
  return (
    <section
      id={SECTION_IDS.solution}
      className="bg-white"
      aria-labelledby={SOLUTION_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <h2 id={SOLUTION_HEADING_ID}>{SOLUTION_CONTENT.sectionHeading}</h2>
      </ScreenReaderOnly>

      <Container className="flex flex-col gap-12 py-16 sm:gap-16 sm:py-20 lg:gap-20 lg:py-24">
        <SolutionHeader />
        <PillarGrid />
      </Container>
    </section>
  )
}

const SolutionHeader = () => (
  <div className="flex flex-col items-center gap-4 text-center">
    <h3 className="text-purple-dark flex flex-wrap items-center justify-center gap-x-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
      {SOLUTION_CONTENT.headline.before}
      <img
        src={SOLUTION_CONTENT.headline.logo}
        alt="Faladoria"
        width={600}
        height={485}
        className="inline-block h-8 w-auto sm:h-10 lg:h-12"
        aria-hidden="true"
      />
      <span className="sr-only">Faladoria</span>
      {SOLUTION_CONTENT.headline.after}
    </h3>
    <p className="text-purple-medium text-lg sm:text-xl">
      {SOLUTION_CONTENT.subtitle}
    </p>
  </div>
)

const PillarGrid = () => (
  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {SOLUTION_CONTENT.pillars.map(pillar => (
      <PillarCard
        key={pillar.id}
        icon={pillar.icon}
        iconAlt={pillar.iconAlt}
        title={pillar.title}
        description={pillar.description}
      />
    ))}
  </ul>
)

const PillarCard = ({
  icon,
  iconAlt,
  title,
  description,
}: {
  icon: string
  iconAlt: string
  title: string
  description: string
}) => {
  return (
    <li className="bg-gray-light flex flex-col items-center gap-4 rounded-2xl p-8 text-center">
      <img
        src={icon}
        alt={iconAlt}
        width={64}
        height={64}
        loading="lazy"
        decoding="async"
        className="h-16 w-16"
      />
      <h4 className="text-purple-dark text-lg font-semibold sm:text-xl">
        {title}
      </h4>
      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
        {description}
      </p>
    </li>
  )
}
