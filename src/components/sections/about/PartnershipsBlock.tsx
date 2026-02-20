import { ABOUT_CONTENT } from '@components/data/aboutContent'
import type { Partnership } from '@components/data/aboutContent'
import { ActivityIcon, ChartIcon, ChatIcon, LocationIcon } from '@components/ui'
import type { IconProps } from '@/types/icon'
import type { ComponentType } from 'react'

const ICON_MAP: Record<Partnership['iconName'], ComponentType<IconProps>> = {
  location: LocationIcon,
  chart: ChartIcon,
  activity: ActivityIcon,
  chat: ChatIcon,
}

export const PartnershipsBlock = () => {
  const { partnerships } = ABOUT_CONTENT

  return (
    <div className="flex flex-col gap-6">
      <p className="text-purple-dark text-center text-sm font-semibold tracking-widest uppercase sm:text-base lg:text-left">
        {partnerships.label}
      </p>

      <ul
        aria-label={partnerships.label}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6"
      >
        {partnerships.items.map(partnership => {
          const Icon = ICON_MAP[partnership.iconName]

          return (
            <li
              key={partnership.id}
              className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-md transition-all duration-500 hover:scale-[1.02] hover:shadow-lg sm:p-6"
            >
              <div className="bg-lavender-light flex h-10 w-10 items-center justify-center rounded-xl">
                <Icon className="text-purple-dark h-5 w-5" />
              </div>
              <h3 className="text-purple-deepest text-sm font-semibold sm:text-base">
                {partnership.label}
              </h3>
              <p className="text-purple-deep/70 text-xs leading-relaxed sm:text-sm">
                {partnership.description}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
