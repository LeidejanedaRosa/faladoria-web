export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const FAQ_HEADING_ID = 'faq-heading' as const

export const FAQ_CONTENT = {
  screenReaderHeading: 'Perguntas frequentes sobre a Faladoria',
  heading: 'Perguntas frequentes',
  description: 'Tire suas dúvidas sobre como a Faladoria funciona',
  items: [
    {
      id: 'what-is',
      question: 'O que é a Faladoria?',
      answer:
        'A Faladoria é um canal de mediação entre usuários do SUS e gestores de saúde pública. Através do WhatsApp, conectamos cidadãos que enfrentam problemas no atendimento de saúde com quem pode resolvê-los de forma ágil e transparente.',
    },
    {
      id: 'how-it-works',
      question: 'Como funciona o processo de mediação?',
      answer:
        'O usuário envia sua demanda pelo WhatsApp da Faladoria. Nossa equipe registra, categoriza e encaminha o caso para o gestor responsável. Todo o processo é acompanhado em tempo real, e o cidadão recebe atualizações sobre o andamento da sua solicitação.',
    },
    {
      id: 'who-can-use',
      question: 'Quem pode usar a Faladoria?',
      answer:
        'Qualquer cidadão que utilize o Sistema Único de Saúde (SUS) pode enviar suas demandas pela Faladoria. O serviço é gratuito e acessível a todos, bastando ter acesso ao WhatsApp.',
    },
    {
      id: 'cost',
      question: 'A Faladoria é gratuita para o cidadão?',
      answer:
        'Sim, o serviço é totalmente gratuito para o cidadão. A Faladoria é mantida através de parcerias com gestões municipais e estaduais de saúde que buscam melhorar o atendimento à população.',
    },
    {
      id: 'privacy',
      question: 'Meus dados estão seguros?',
      answer:
        'Sim. A Faladoria segue rigorosamente a Lei Geral de Proteção de Dados (LGPD). Suas informações pessoais são tratadas com confidencialidade e utilizadas exclusivamente para o encaminhamento e acompanhamento da sua demanda.',
    },
    {
      id: 'response-time',
      question: 'Qual o prazo para receber uma resposta?',
      answer:
        'O prazo de resposta varia conforme a complexidade da demanda e a gestão responsável. Demandas simples costumam ser respondidas em até 48 horas. Você acompanha o status da sua solicitação em tempo real pelo nosso painel de transparência.',
    },
  ],
} as const satisfies {
  screenReaderHeading: string
  heading: string
  description: string
  items: readonly FaqItem[]
}
