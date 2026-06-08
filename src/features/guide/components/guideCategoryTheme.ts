import type { GuideCategory } from '../data'

export interface CategoryTheme {
  iconBg: string
  iconBgLight: string
  softBg: string
  border: string
  borderHover: string
  text: string
  textAccent: string
}

export const CATEGORY_THEME: Record<GuideCategory['color'], CategoryTheme> = {
  purple: {
    iconBg: 'bg-purple-500',
    iconBgLight: 'bg-purple-100',
    softBg: 'bg-purple-50',
    border: 'border-purple-200',
    borderHover: 'hover:border-purple-300',
    text: 'text-purple-700',
    textAccent: 'text-purple-600',
  },
  violet: {
    iconBg: 'bg-violet-500',
    iconBgLight: 'bg-violet-100',
    softBg: 'bg-violet-50',
    border: 'border-violet-200',
    borderHover: 'hover:border-violet-300',
    text: 'text-violet-700',
    textAccent: 'text-violet-600',
  },
  indigo: {
    iconBg: 'bg-indigo-500',
    iconBgLight: 'bg-indigo-100',
    softBg: 'bg-indigo-50',
    border: 'border-indigo-200',
    borderHover: 'hover:border-indigo-300',
    text: 'text-indigo-700',
    textAccent: 'text-indigo-600',
  },
  blue: {
    iconBg: 'bg-blue-500',
    iconBgLight: 'bg-blue-100',
    softBg: 'bg-blue-50',
    border: 'border-blue-200',
    borderHover: 'hover:border-blue-300',
    text: 'text-blue-700',
    textAccent: 'text-blue-600',
  },
  sky: {
    iconBg: 'bg-sky-500',
    iconBgLight: 'bg-sky-100',
    softBg: 'bg-sky-50',
    border: 'border-sky-200',
    borderHover: 'hover:border-sky-300',
    text: 'text-sky-700',
    textAccent: 'text-sky-600',
  },
  cyan: {
    iconBg: 'bg-cyan-500',
    iconBgLight: 'bg-cyan-100',
    softBg: 'bg-cyan-50',
    border: 'border-cyan-200',
    borderHover: 'hover:border-cyan-300',
    text: 'text-cyan-700',
    textAccent: 'text-cyan-600',
  },
  teal: {
    iconBg: 'bg-teal-500',
    iconBgLight: 'bg-teal-100',
    softBg: 'bg-teal-50',
    border: 'border-teal-200',
    borderHover: 'hover:border-teal-300',
    text: 'text-teal-700',
    textAccent: 'text-teal-600',
  },
  emerald: {
    iconBg: 'bg-emerald-500',
    iconBgLight: 'bg-emerald-100',
    softBg: 'bg-emerald-50',
    border: 'border-emerald-200',
    borderHover: 'hover:border-emerald-300',
    text: 'text-emerald-700',
    textAccent: 'text-emerald-600',
  },
  green: {
    iconBg: 'bg-green-500',
    iconBgLight: 'bg-green-100',
    softBg: 'bg-green-50',
    border: 'border-green-200',
    borderHover: 'hover:border-green-300',
    text: 'text-green-700',
    textAccent: 'text-green-600',
  },
  amber: {
    iconBg: 'bg-amber-500',
    iconBgLight: 'bg-amber-100',
    softBg: 'bg-amber-50',
    border: 'border-amber-200',
    borderHover: 'hover:border-amber-300',
    text: 'text-amber-700',
    textAccent: 'text-amber-600',
  },
  orange: {
    iconBg: 'bg-orange-500',
    iconBgLight: 'bg-orange-100',
    softBg: 'bg-orange-50',
    border: 'border-orange-200',
    borderHover: 'hover:border-orange-300',
    text: 'text-orange-700',
    textAccent: 'text-orange-600',
  },
  rose: {
    iconBg: 'bg-rose-500',
    iconBgLight: 'bg-rose-100',
    softBg: 'bg-rose-50',
    border: 'border-rose-200',
    borderHover: 'hover:border-rose-300',
    text: 'text-rose-700',
    textAccent: 'text-rose-600',
  },
  pink: {
    iconBg: 'bg-pink-500',
    iconBgLight: 'bg-pink-100',
    softBg: 'bg-pink-50',
    border: 'border-pink-200',
    borderHover: 'hover:border-pink-300',
    text: 'text-pink-700',
    textAccent: 'text-pink-600',
  },
  fuchsia: {
    iconBg: 'bg-fuchsia-500',
    iconBgLight: 'bg-fuchsia-100',
    softBg: 'bg-fuchsia-50',
    border: 'border-fuchsia-200',
    borderHover: 'hover:border-fuchsia-300',
    text: 'text-fuchsia-700',
    textAccent: 'text-fuchsia-600',
  },
}
