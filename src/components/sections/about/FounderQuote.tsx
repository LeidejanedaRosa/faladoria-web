import { ABOUT_CONTENT } from '@components/data/aboutContent'

export const FounderQuote = () => {
  const { founder } = ABOUT_CONTENT

  return (
    <figure>
      <blockquote className="border-purple-dark max-w-xl border-l-4 pl-5">
        <p className="text-purple-deep mt-3 text-xl leading-relaxed italic sm:text-2xl">
          &ldquo;{founder.quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="sr-only">
        <cite>{founder.name}</cite>, {founder.role}
      </figcaption>
    </figure>
  )
}
