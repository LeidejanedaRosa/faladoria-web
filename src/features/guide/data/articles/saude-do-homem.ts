import type { GuideArticle } from '../guideArticles'

export const saudeDoHomemArticles: GuideArticle[] = [
  {
    slug: 'saude-preventiva-homem',
    categorySlug: 'saude-do-homem',
    title: 'Saúde do homem pelo SUS',
    summary:
      'Exames de prevenção e programas de saúde masculina oferecidos pelo SUS.',
    datePublished: '2026-05-01',
    content: [
      {
        type: 'paragraph',
        text: 'Os homens costumam procurar menos o serviço de saúde — mas prevenir é sempre mais simples e menos sofrido do que tratar. O SUS oferece atendimento completo para a saúde masculina, de graça.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Serviços disponíveis para homens no SUS',
      },
      {
        type: 'list',
        items: [
          'Consulta clínica geral para check-up preventivo',
          'Exame de próstata (PSA e toque retal) — recomendado a partir dos 50 anos (ou 45 para negros e quem tem histórico familiar)',
          'Acompanhamento de hipertensão e diabetes',
          'Saúde sexual e reprodutiva — vasectomia e planejamento familiar',
          'Tratamento de infecções sexualmente transmissíveis (ISTs)',
          'Saúde mental — acesso a psicólogo e psiquiatra pelo SUS',
          'Tratamento de alcoolismo e dependência química (CAPS AD)',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar',
      },
      {
        type: 'paragraph',
        text: 'Vá à UBS (postinho) mais próxima e solicite uma consulta. Não precisa esperar aparecer algum sintoma — o check-up preventivo é o melhor caminho.',
      },
      {
        type: 'list',
        items: [
          'Cartão do SUS',
          'Documento com foto',
          'Se tiver exames anteriores, leve para a consulta',
        ],
      },
      {
        type: 'callout',
        text: 'O câncer de próstata é o segundo mais comum entre os homens no Brasil — mas tem alta taxa de cura quando detectado cedo. Não espere ter sintomas para fazer o exame. Procure o postinho.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Programa de Saúde do Homem',
      },
      {
        type: 'paragraph',
        text: 'O Ministério da Saúde tem a Política Nacional de Atenção Integral à Saúde do Homem (PNAISH), que orienta os municípios a oferecer atendimento específico para homens nas UBSs, inclusive em horários alternativos para quem trabalha durante o dia.',
      },
    ],
  },
]
