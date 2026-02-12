import { COMPANY_INFO } from './companyInfo'

import type { LegalSection } from './privacyPolicyContent'

export const TERMS_OF_USE_CONTENT = {
  title: 'Termos de Uso',
  lastUpdated: '[data a definir]',
  sections: [
    {
      id: 'aceite',
      title: '1. Aceite dos Termos',
      paragraphs: [
        `Ao utilizar a plataforma ${COMPANY_INFO.name}, você declara que leu, compreendeu e concorda com estes Termos de Uso. Caso não concorde com alguma disposição, recomendamos que não utilize nossos serviços.`,
        '[Placeholder: Complementar com informações sobre idade mínima, capacidade legal, etc.]',
      ],
    },
    {
      id: 'descricao-do-servico',
      title: '2. Descrição do Serviço',
      paragraphs: [
        `A ${COMPANY_INFO.name} é uma plataforma de mediação entre usuários do Sistema Único de Saúde (SUS) e gestores de saúde, utilizando o WhatsApp como canal de operação.`,
        '[Placeholder: Detalhar o funcionamento do serviço, limitações, e escopo de atuação.]',
      ],
    },
    {
      id: 'uso-da-plataforma',
      title: '3. Uso da Plataforma',
      paragraphs: [
        'Ao utilizar nossa plataforma, você se compromete a:',
        '[Placeholder: Listar obrigações do usuário — fornecer informações verdadeiras, não usar para fins ilícitos, respeitar outros usuários, etc.]',
      ],
    },
    {
      id: 'whatsapp',
      title: '4. Comunicação via WhatsApp',
      paragraphs: [
        'A plataforma utiliza o WhatsApp como canal principal de comunicação. Ao interagir conosco por este canal, você concorda com:',
        '[Placeholder: Descrever termos específicos do uso via WhatsApp — armazenamento de mensagens, horários de atendimento, uso da API do WhatsApp Business, etc.]',
      ],
    },
    {
      id: 'propriedade-intelectual',
      title: '5. Propriedade Intelectual',
      paragraphs: [
        `Todo o conteúdo da plataforma ${COMPANY_INFO.name}, incluindo textos, imagens, logotipos, marcas e software, é de propriedade exclusiva da ${COMPANY_INFO.legalName} ou de seus licenciadores.`,
        '[Placeholder: Detalhar restrições de uso, licenças concedidas ao usuário, etc.]',
      ],
    },
    {
      id: 'limitacao-de-responsabilidade',
      title: '6. Limitação de Responsabilidade',
      paragraphs: [
        `A ${COMPANY_INFO.name} atua como canal de mediação e não substitui os canais oficiais do SUS.`,
        '[Placeholder: Detalhar limitações — não é serviço de emergência, não garante resolução, responsabilidades de cada parte, etc.]',
      ],
    },
    {
      id: 'alteracoes',
      title: '7. Alterações nos Termos',
      paragraphs: [
        'Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor a partir de sua publicação na plataforma.',
        '[Placeholder: Descrever como os usuários serão notificados sobre alterações.]',
      ],
    },
    {
      id: 'contato',
      title: '8. Contato',
      paragraphs: [
        `Para dúvidas sobre estes Termos de Uso, entre em contato conosco pelo e-mail: ${COMPANY_INFO.contact.email}.`,
      ],
    },
  ] satisfies LegalSection[],
} as const
