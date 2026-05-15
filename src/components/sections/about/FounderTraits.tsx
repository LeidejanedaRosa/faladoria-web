import { ABOUT_CONTENT } from '@components/data/aboutContent'
import type { FounderTrait } from '@components/data/aboutContent'
import { FistIcon, HeartIcon, PersonIcon, UsersIcon } from '@components/ui'
import type { IconProps } from '@/types/icon'
import type { ComponentType } from 'react'

const ICON_MAP: Record<FounderTrait['iconName'], ComponentType<IconProps>> = {
  person: PersonIcon,
  fist: FistIcon,
  users: UsersIcon,
  heart: HeartIcon,
}

export const FounderTraits = () => {
  const { traits } = ABOUT_CONTENT

  return (
    <ul
      className="relative flex flex-col gap-6"
      aria-label="Quem é Simone Celina"
    >
      <div
        className="bg-purple-medium/25 absolute top-5 bottom-5 left-5 w-px"
        aria-hidden="true"
      />

      {traits.map(trait => {
        const Icon = ICON_MAP[trait.iconName]

        return (
          <li key={trait.id} className="flex items-start gap-4">
            <div className="bg-lavender-light relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <Icon className="text-purple-dark h-5 w-5" aria-hidden="true" />
            </div>

            <p className="text-purple-deep pt-2 text-base leading-relaxed sm:text-lg">
              {trait.segments.map((segment, index) =>
                segment.bold ? (
                  <strong key={index} className="text-purple-dark font-bold">
                    {segment.text}
                  </strong>
                ) : (
                  <span key={index}>{segment.text}</span>
                )
              )}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
