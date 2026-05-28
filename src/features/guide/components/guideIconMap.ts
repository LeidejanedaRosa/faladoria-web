import type { ReactElement } from 'react'

import {
  ActivityIcon,
  BuildingIcon,
  ChatIcon,
  ClipboardIcon,
  FistIcon,
  HeartIcon,
  LocationIcon,
  MegaphoneIcon,
  PersonIcon,
  SearchIcon,
  ShieldIcon,
  SyringeIcon,
  TargetIcon,
  UsersIcon,
} from '@shared/components/ui'
import type { IconProps } from '@shared/types/icon'

import type { GuideCategory } from '../data'

export type IconComponent = (props: IconProps) => ReactElement

export const GUIDE_ICON_MAP: Record<GuideCategory['iconName'], IconComponent> =
  {
    activity: ActivityIcon,
    building: BuildingIcon,
    chat: ChatIcon,
    clipboard: ClipboardIcon,
    fist: FistIcon,
    heart: HeartIcon,
    location: LocationIcon,
    megaphone: MegaphoneIcon,
    person: PersonIcon,
    search: SearchIcon,
    shield: ShieldIcon,
    syringe: SyringeIcon,
    target: TargetIcon,
    users: UsersIcon,
  } as const
