import {
  HOW_IT_WORKS_CONTENT,
  HOW_IT_WORKS_HEADING_ID,
} from '@components/data/howItWorksContent'
import { SECTION_IDS } from '@components/data/navigation'
import { Container } from '@components/layout/Container'
import { ScreenReaderOnly } from '@components/ui/Accessibility'

export const HowItWorksSection = () => {
  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="bg-gray-light"
      aria-labelledby={HOW_IT_WORKS_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <h2 id={HOW_IT_WORKS_HEADING_ID}>
          {HOW_IT_WORKS_CONTENT.sectionHeading}
        </h2>
      </ScreenReaderOnly>

      <Container className="flex flex-col gap-12 py-16 sm:gap-16 sm:py-20 lg:gap-20 lg:py-11">
        <HowItWorksHeader />
        <StepsGrid />
      </Container>
    </section>
  )
}

const HowItWorksHeader = () => (
  <div className="flex flex-col gap-4 text-center">
    <h3 className="text-purple-dark text-3xl font-bold sm:text-4xl lg:text-5xl">
      {HOW_IT_WORKS_CONTENT.headline}
    </h3>
    <p className="text-purple-dark text-lg sm:text-xl">
      {HOW_IT_WORKS_CONTENT.subtitle}
    </p>
  </div>
)

const StepsGrid = () => (
  <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {HOW_IT_WORKS_CONTENT.steps.map(step => (
      <StepCard
        key={step.id}
        number={step.number}
        title={step.title}
        description={step.description}
        image={step.image}
        imageAlt={step.imageAlt}
      />
    ))}
  </ol>
)

const StepCard = ({
  number,
  title,
  description,
  image,
  imageAlt,
}: {
  number: number
  title: string
  description: string
  image: string
  imageAlt: string
}) => {
  return (
    <li className="bg-purple-dark flex flex-col overflow-hidden rounded-2xl">
      <div className="aspect-4/5">
        <img
          src={image}
          alt={imageAlt}
          width={400}
          height={500}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative overflow-hidden p-6">
        <span
          className="absolute top-1/2 right-0 translate-x-[30%] -translate-y-1/2 text-[8rem] leading-none font-bold text-white/30 sm:text-[10rem]"
          aria-hidden="true"
        >
          {number}
        </span>
        <div className="relative flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-white sm:text-xl">
            {title}
          </h4>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </li>
  )
}
