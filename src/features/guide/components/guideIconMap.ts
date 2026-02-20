import type { ReactElement } from 'react'

import {
  ClipboardIcon,
  HeartIcon,
  MegaphoneIcon,
  SearchIcon,
  ShieldIcon,
  SyringeIcon,
} from '@components/ui'
import type { IconProps } from '@/types/icon'

import type { GuideCategory } from '../data'

type IconComponent = (props: IconProps) => ReactElement

export const GUIDE_ICON_MAP: Record<GuideCategory['iconName'], IconComponent> =
  {
    shield: ShieldIcon,
    heart: HeartIcon,
    clipboard: ClipboardIcon,
    syringe: SyringeIcon,
    search: SearchIcon,
    megaphone: MegaphoneIcon,
  } as const
