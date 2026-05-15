import { FAQ_CONTENT, FAQ_HEADING_ID } from '../../data/faqContent'
import { SECTION_IDS } from '@shared/data/navigation'
import { Container } from '@shared/components/layout/Container'
import { ScreenReaderOnly } from '@shared/components/ui/Accessibility'

export const FaqSection = () => {
  return (
    <section
      id={SECTION_IDS.faq}
      className="bg-white"
      aria-labelledby={FAQ_HEADING_ID}
    >
      <ScreenReaderOnly asChild>
        <h2 id={FAQ_HEADING_ID}>{FAQ_CONTENT.screenReaderHeading}</h2>
      </ScreenReaderOnly>

      <Container className="flex flex-col gap-10 py-16 sm:gap-12 sm:py-20 lg:gap-16 lg:py-24">
        <FaqHeader />
        <FaqList />
      </Container>
    </section>
  )
}

const FaqHeader = () => (
  <div className="flex flex-col items-center gap-3 text-center">
    <h3
      className="text-purple-dark text-3xl font-bold sm:text-4xl lg:text-5xl"
      aria-hidden="true"
    >
      {FAQ_CONTENT.heading}
    </h3>
    <p className="text-purple-medium text-lg sm:text-xl">
      {FAQ_CONTENT.description}
    </p>
  </div>
)

const FaqList = () => (
  <div className="mx-auto w-full max-w-3xl">
    {FAQ_CONTENT.items.map(item => (
      <FaqItem key={item.id} question={item.question} answer={item.answer} />
    ))}
  </div>
)

const FaqItem = ({
  question,
  answer,
}: {
  question: string
  answer: string
}) => (
  <details name="faq" className="group border-b border-gray-200 first:border-t">
    <summary className="hover:text-purple-dark flex cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-medium text-gray-900 select-none sm:py-6 sm:text-lg">
      {question}
      <svg
        className="h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </summary>
    <p className="pb-5 text-sm leading-relaxed text-gray-600 sm:pb-6 sm:text-base">
      {answer}
    </p>
  </details>
)
