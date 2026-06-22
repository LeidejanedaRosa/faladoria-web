import type { GuideArticle } from '../guideArticles'

const CATEGORY_SLUG = 'denuncias'
const DATE_PUBLISHED = '2026-05-01'

export const complaintsArticles: GuideArticle[] = [
  {
    slug: 'canais-de-denuncia',
    categorySlug: CATEGORY_SLUG,
    title: 'Canais de denúncia',
    summary:
      'Conheça os canais oficiais para denunciar irregularidades no atendimento do SUS.',
    datePublished: DATE_PUBLISHED,
    iconName: 'megaphone',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Como denunciar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Anote o que aconteceu',
        imageKey: 'checklist',
        detail: 'Data, hora, nome do atendente e descrição clara do ocorrido.',
      },
      {
        type: 'action-step',
        action: 'Ligue para o Disque Saúde: 136',
        imageKey: 'phone',
        detail: 'Gratuito, funciona 24 horas. Anote o número de protocolo.',
      },
      {
        type: 'action-step',
        action: 'Registre na Ouvidoria Municipal',
        detail:
          'Procure na prefeitura da sua cidade. Exija o número de protocolo.',
      },
      {
        type: 'action-step',
        action: 'Para casos graves: Ministério Público ou Defensoria Pública',
        imageKey: 'patient-rights',
        detail:
          'O atendimento da Defensoria é gratuito. A Justiça pode agir em menos de 72 horas.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que informar ao denunciar',
        items: [
          'Nome da unidade de saúde (UBS, hospital, etc.)',
          'Data e horário do ocorrido',
          'Nome do profissional envolvido (se souber)',
          'Descrição do que aconteceu',
          'O que você quer como solução',
        ],
      },
    ],
  },
  {
    slug: 'ouvidoria-do-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Ouvidoria do SUS',
    summary:
      'Saiba como acionar a ouvidoria do SUS e o que esperar após registrar sua reclamação.',
    datePublished: DATE_PUBLISHED,
    iconName: 'phone',
    content: [
      {
        type: 'paragraph',
        text: 'A Ouvidoria do SUS é o canal oficial para registrar reclamações, denúncias, sugestões e elogios sobre os serviços de saúde pública. É gratuita e confidencial.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como registrar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Ligue para o 136',
        imageKey: 'phone',
        detail:
          'Gratuito, 24 horas por dia. Ou compareça presencialmente à Secretaria de Saúde.',
      },
      {
        type: 'action-step',
        action: 'Informe os dados do ocorrido',
        imageKey: 'checklist',
        detail:
          'Nome da unidade, data, hora, o que aconteceu e o que você quer como solução.',
      },
      {
        type: 'action-step',
        action: 'Anote o número de protocolo',
        detail:
          'Você vai precisar para acompanhar o andamento e acionar etapas seguintes.',
      },
      {
        type: 'callout',
        variant: 'tip',
        text: 'Você pode fazer a denúncia de forma anônima. Com seus dados, fica mais fácil receber retorno sobre o que foi feito para resolver o problema.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Prazo de resposta',
        text: 'O prazo para resposta é de até 30 dias úteis. Se não houver retorno, acione o Ministério Público ou a Defensoria Pública.',
      },
    ],
  },
]
