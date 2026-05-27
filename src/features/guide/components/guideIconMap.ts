import type { ReactElement } from 'react'

import {
  ClipboardIcon,
  HeartIcon,
  MegaphoneIcon,
  SearchIcon,
  ShieldIcon,
  SyringeIcon,
} from '@shared/components/ui'
import type { IconProps } from '@shared/types/icon'

import type { GuideCategory } from '../data'

export type IconComponent = (props: IconProps) => ReactElement

export const GUIDE_ICON_MAP: Record<GuideCategory['iconName'], IconComponent> =
  {
    shield: ShieldIcon,
    heart: HeartIcon,
    clipboard: ClipboardIcon,
    syringe: SyringeIcon,
    search: SearchIcon,
    megaphone: MegaphoneIcon,
  } as const
