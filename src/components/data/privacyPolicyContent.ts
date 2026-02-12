import { COMPANY_INFO } from './companyInfo'

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
}

export const PRIVACY_POLICY_CONTENT = {
  title: 'Política de Privacidade',
  // TODO: update lastUpdated when legal content is finalized
  lastUpdated: '12 de fevereiro de 2026',
  sections: [
    {
      id: 'introducao',
      title: '1. Introdução',
      paragraphs: [
        `A ${COMPANY_INFO.name} ("nós", "nosso") está comprometida em proteger a privacidade dos usuários de nossa plataforma. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).`,
        // TODO: add additional information about the scope of this policy
        'Esta política se aplica a todos os serviços oferecidos pela plataforma, incluindo interações realizadas via WhatsApp.',
      ],
    },
    {
      id: 'dados-coletados',
      title: '2. Dados Coletados',
      paragraphs: [
        'Coletamos os seguintes tipos de dados pessoais durante o uso da plataforma:',
        // TODO: list all categories of collected data (identification, contact, usage, navigation, etc.)
        'Dados de identificação pessoal, dados de contato, dados de uso da plataforma e dados de navegação.',
      ],
    },
    {
      id: 'uso-dos-dados',
      title: '3. Uso dos Dados',
      paragraphs: [
        'Utilizamos seus dados pessoais para as seguintes finalidades:',
        // TODO: detail all data processing purposes
        'Mediação entre usuários e gestores do SUS, melhoria contínua do serviço, comunicação com o usuário e análise estatística agregada.',
      ],
    },
    {
      id: 'compartilhamento',
      title: '4. Compartilhamento de Dados',
      paragraphs: [
        'Seus dados podem ser compartilhados com terceiros nas seguintes situações:',
        // TODO: detail data sharing scenarios and third parties involved
        'Compartilhamento com gestores de saúde para resolução de demandas, prestadores de serviço essenciais à operação da plataforma e em cumprimento de obrigações legais.',
      ],
    },
    {
      id: 'armazenamento-e-seguranca',
      title: '5. Armazenamento e Segurança',
      paragraphs: [
        'Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, destruição, perda ou alteração.',
        // TODO: detail security measures, data retention period, and storage location
        'Os dados são armazenados em servidores seguros com criptografia e acesso restrito. O período de retenção será definido conforme a finalidade do tratamento e as exigências legais aplicáveis.',
      ],
    },
    {
      id: 'seus-direitos',
      title: '6. Seus Direitos (LGPD)',
      paragraphs: [
        'De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:',
        // TODO: detail each LGPD right with practical instructions for exercising them
        'Confirmação do tratamento, acesso aos dados, correção de dados incompletos ou desatualizados, anonimização, portabilidade, eliminação, informação sobre compartilhamento com terceiros e revogação do consentimento.',
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
