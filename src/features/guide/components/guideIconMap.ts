import type { ReactElement } from 'react'

import {
  ActivityIcon,
  BuildingIcon,
  ChartIcon,
  ChatIcon,
  CheckIcon,
  ClipboardIcon,
  FistIcon,
  HeartIcon,
  LocationIcon,
  MegaphoneIcon,
  PersonIcon,
  PhoneIcon,
  QuestionIcon,
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

export type ArticleStepIconName =
  | 'activity'
  | 'building'
  | 'chart'
  | 'chat'
  | 'check'
  | 'clipboard'
  | 'fist'
  | 'heart'
  | 'location'
  | 'megaphone'
  | 'person'
  | 'phone'
  | 'question'
  | 'search'
  | 'shield'
  | 'syringe'
  | 'target'
  | 'users'

export const ARTICLE_STEP_ICON_MAP: Record<ArticleStepIconName, IconComponent> =
  {
    activity: ActivityIcon,
    building: BuildingIcon,
    chart: ChartIcon,
    chat: ChatIcon,
    check: CheckIcon,
    clipboard: ClipboardIcon,
    fist: FistIcon,
    heart: HeartIcon,
    location: LocationIcon,
    megaphone: MegaphoneIcon,
    person: PersonIcon,
    phone: PhoneIcon,
    question: QuestionIcon,
    search: SearchIcon,
    shield: ShieldIcon,
    syringe: SyringeIcon,
    target: TargetIcon,
    users: UsersIcon,
  } as const
