import { COMPANY_INFO } from './companyInfo'
import { SECTION_IDS } from './navigation'

export const FOOTER_HEADING_ID = 'footer-heading'

export interface FooterLink {
  label: string
  href: string
}

export type FooterNavIconName = 'building' | 'question'

export interface FooterLinkGroup {
  title: string
  ariaLabel: string
  iconName: FooterNavIconName
  links: FooterLink[]
}

export interface FooterContactItem {
  id: string
  iconName: 'email' | 'whatsapp' | 'location'
  label: string
  href?: string
  ariaLabel?: string
}

const currentYear = new Date().getFullYear()

export const FOOTER_CONTENT = {
  screenReaderHeading: 'Rodapé — Faladoria',

  tagline:
    'Conectando cidadãos à gestão pública para um SUS melhor para todos.',

  missionLabel: 'Nossa Missão',

  mission:
    'Facilitar o acesso à saúde pública garantindo informação organizada, mediação eficiente e busca ativa por soluções para os usuários do SUS.',

  missionHighlight: 'usuários do SUS.',

  linkGroups: [
    {
      title: 'Institucional',
      ariaLabel: 'Links institucionais',
      iconName: 'building',
      links: [
        { label: 'Quem somos', href: `/#${SECTION_IDS.aboutUs}` },
        { label: 'Solução', href: `/#${SECTION_IDS.solution}` },
        { label: 'Como funciona', href: `/#${SECTION_IDS.howItWorks}` },
        { label: 'Transparência', href: `/#${SECTION_IDS.transparency}` },
      ],
    },
    {
      title: 'Suporte',
      ariaLabel: 'Links de suporte',
      iconName: 'question',
      links: [
        { label: 'Perguntas frequentes', href: `/#${SECTION_IDS.faq}` },
        { label: 'Política de privacidade', href: '/politica-de-privacidade' },
        { label: 'Termos de uso', href: '/termos-de-uso' },
      ],
    },
  ] satisfies FooterLinkGroup[],

  contact: {
    title: 'Contato',
    items: [
      {
        id: 'contact-email',
        iconName: 'email',
        label: COMPANY_INFO.contact.email,
        href: `mailto:${COMPANY_INFO.contact.email}`,
        ariaLabel: `Enviar e-mail para ${COMPANY_INFO.contact.email}`,
      },
      {
        id: 'contact-whatsapp',
        iconName: 'whatsapp',
        label: 'Fale com a gente',
        href: `https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/\D/g, '')}`,
        ariaLabel: `Enviar mensagem pelo WhatsApp para ${COMPANY_INFO.contact.whatsapp}`,
      },
      {
        id: 'contact-address',
        iconName: 'location',
        label: `${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.country}`,
      },
    ] satisfies FooterContactItem[],
  },

  copyright: `© ${currentYear} ${COMPANY_INFO.name}. Todos os direitos reservados.`,
  legalNote:
    'Plataforma independente de mediação entre cidadãos e gestão pública.',
}
