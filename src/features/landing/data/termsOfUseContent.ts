import { COMPANY_INFO } from '@shared/data/companyInfo'

import type { LegalSection } from './privacyPolicyContent'

export const TERMS_OF_USE_CONTENT = {
  title: 'Termos de Uso',
  // TODO: update lastUpdated when legal content is finalized
  lastUpdated: '12 de fevereiro de 2026',
  sections: [
    {
      id: 'aceite',
      title: '1. Aceite dos Termos',
      paragraphs: [
        `Ao utilizar a plataforma ${COMPANY_INFO.name}, você declara que leu, compreendeu e concorda com estes Termos de Uso. Caso não concorde com alguma disposição, recomendamos que não utilize nossos serviços.`,
        // TODO: add minimum age requirements and legal capacity details
        'É necessário ter pelo menos 18 anos ou contar com autorização de um responsável legal para utilizar a plataforma.',
      ],
    },
    {
      id: 'descricao-do-servico',
      title: '2. Descrição do Serviço',
      paragraphs: [
        `A ${COMPANY_INFO.name} é uma plataforma de mediação entre usuários do Sistema Único de Saúde (SUS) e gestores de saúde, utilizando o WhatsApp como canal de operação.`,
        // TODO: detail service functionality, limitations, and scope
        'A plataforma permite o registro de demandas, acompanhamento de solicitações e comunicação direta com gestores, dentro do escopo dos serviços disponíveis.',
      ],
    },
    {
      id: 'uso-da-plataforma',
      title: '3. Uso da Plataforma',
      paragraphs: [
        'Ao utilizar nossa plataforma, você se compromete a:',
        // TODO: expand user obligations list
        'Fornecer informações verdadeiras e atualizadas, não utilizar a plataforma para fins ilícitos e respeitar os demais usuários e gestores.',
      ],
    },
    {
      id: 'whatsapp',
      title: '4. Comunicação via WhatsApp',
      paragraphs: [
        'A plataforma utiliza o WhatsApp como canal principal de comunicação. Ao interagir conosco por este canal, você concorda com:',
        // TODO: detail WhatsApp-specific terms (message storage, business hours, WhatsApp Business API usage)
        'O armazenamento de mensagens para fins de registro e acompanhamento das demandas, a comunicação dentro dos horários de atendimento estabelecidos e o uso da API do WhatsApp Business para operação do serviço.',
      ],
    },
    {
      id: 'propriedade-intelectual',
      title: '5. Propriedade Intelectual',
      paragraphs: [
        `Todo o conteúdo da plataforma ${COMPANY_INFO.name}, incluindo textos, imagens, logotipos, marcas e software, é de propriedade exclusiva da ${COMPANY_INFO.legalName} ou de seus licenciadores.`,
        // TODO: detail usage restrictions and user licenses
        'É proibida a reprodução, distribuição ou modificação de qualquer conteúdo da plataforma sem autorização prévia e expressa.',
      ],
    },
    {
      id: 'limitacao-de-responsabilidade',
      title: '6. Limitação de Responsabilidade',
      paragraphs: [
        `A ${COMPANY_INFO.name} atua como canal de mediação e não substitui os canais oficiais do SUS.`,
        // TODO: detail liability limitations (not an emergency service, no guarantee of resolution, party responsibilities)
        'A plataforma não constitui serviço de emergência e não garante a resolução de todas as demandas registradas. Cada parte é responsável pelas informações que fornece.',
      ],
    },
    {
      id: 'alteracoes',
      title: '7. Alterações nos Termos',
      paragraphs: [
        'Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor a partir de sua publicação na plataforma.',
        // TODO: detail how users will be notified about changes
        'Os usuários serão informados sobre alterações relevantes por meio da plataforma ou pelos canais de comunicação cadastrados.',
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
