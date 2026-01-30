export const SECTION_IDS = {
  aboutUs: 'quem-somos',
  solution: 'solucao',
  howItWorks: 'como-funciona',
  transparency: 'transparencia',
  contact: 'contato',
} as const

export const NAV_ITEMS = [
  { label: 'Quem somos', href: `#${SECTION_IDS.aboutUs}` },
  { label: 'Solução', href: `#${SECTION_IDS.solution}` },
  { label: 'Como funciona', href: `#${SECTION_IDS.howItWorks}` },
  { label: 'Transparência', href: `#${SECTION_IDS.transparency}` },
  { label: 'Contato', href: `#${SECTION_IDS.contact}` },
] as const
