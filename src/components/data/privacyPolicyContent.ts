import { COMPANY_INFO } from './companyInfo'

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
}

export const PRIVACY_POLICY_CONTENT = {
  title: 'Política de Privacidade',
  lastUpdated: '[data a definir]',
  sections: [
    {
      id: 'introducao',
      title: '1. Introdução',
      paragraphs: [
        `A ${COMPANY_INFO.name} ("nós", "nosso") está comprometida em proteger a privacidade dos usuários de nossa plataforma. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).`,
        '[Placeholder: Complementar com informações adicionais sobre o escopo da política.]',
      ],
    },
    {
      id: 'dados-coletados',
      title: '2. Dados Coletados',
      paragraphs: [
        'Coletamos os seguintes tipos de dados pessoais durante o uso da plataforma:',
        '[Placeholder: Listar categorias de dados coletados — dados de identificação, dados de contato, dados de uso da plataforma, dados de navegação, etc.]',
      ],
    },
    {
      id: 'uso-dos-dados',
      title: '3. Uso dos Dados',
      paragraphs: [
        'Utilizamos seus dados pessoais para as seguintes finalidades:',
        '[Placeholder: Descrever finalidades — mediação entre usuários e gestores do SUS, melhoria do serviço, comunicação, análise estatística, etc.]',
      ],
    },
    {
      id: 'compartilhamento',
      title: '4. Compartilhamento de Dados',
      paragraphs: [
        'Seus dados podem ser compartilhados com terceiros nas seguintes situações:',
        '[Placeholder: Descrever cenários de compartilhamento — gestores de saúde, prestadores de serviço, obrigações legais, etc.]',
      ],
    },
    {
      id: 'armazenamento-e-seguranca',
      title: '5. Armazenamento e Segurança',
      paragraphs: [
        'Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, destruição, perda ou alteração.',
        '[Placeholder: Descrever medidas de segurança, período de retenção dos dados, e localização do armazenamento.]',
      ],
    },
    {
      id: 'seus-direitos',
      title: '6. Seus Direitos (LGPD)',
      paragraphs: [
        'De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:',
        '[Placeholder: Listar direitos — confirmação do tratamento, acesso, correção, anonimização, portabilidade, eliminação, informação sobre compartilhamento, revogação do consentimento, etc.]',
      ],
    },
    {
      id: 'contato',
      title: '7. Contato',
      paragraphs: [
        `Para exercer seus direitos ou tirar dúvidas sobre esta Política de Privacidade, entre em contato conosco pelo e-mail: ${COMPANY_INFO.contact.email}.`,
      ],
    },
  ] satisfies LegalSection[],
} as const
