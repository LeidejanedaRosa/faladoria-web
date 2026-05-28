import type { GuideArticle } from '../guideArticles'

export const consultaArticles: GuideArticle[] = [
  {
    slug: 'como-agendar-consulta',
    categorySlug: 'consulta',
    title: 'Como agendar uma consulta',
    summary:
      'Veja como agendar consultas pelo SUS, quais especialidades estão disponíveis e quais são os prazos.',
    content: [
      { type: 'heading', level: 2, text: 'Onde ir primeiro' },
      {
        type: 'paragraph',
        text: 'A Unidade Básica de Saúde (UBS) — também chamada de "postinho" — é o lugar certo para começar. Lá você agenda consultas, recebe encaminhamentos e tem acesso à maioria dos serviços do SUS.',
      },
      { type: 'heading', level: 2, text: 'O que levar' },
      {
        type: 'list',
        items: [
          'Cartão do SUS — se não tiver, o próprio postinho emite na hora',
          'Documento com foto (RG, CNH ou Carteira de Trabalho)',
        ],
      },
      { type: 'heading', level: 2, text: 'Como agendar' },
      {
        type: 'paragraph',
        text: 'Chegue na UBS e informe que quer agendar uma consulta. O atendente vai verificar a disponibilidade e marcar o horário.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Perguntas para fazer na hora do agendamento',
      },
      {
        type: 'list',
        items: [
          'Qual é o endereço e horário exato da consulta?',
          'Preciso levar exames anteriores?',
          'Quanto tempo de antecedência devo chegar?',
          'O município oferece transporte para o local?',
        ],
      },
      {
        type: 'callout',
        text: 'Não sabe qual especialidade precisa? Sem problema. Marque uma consulta com o médico da UBS. Ele vai te avaliar e, se necessário, te encaminhar para o especialista certo — tudo pelo SUS.',
      },
      { type: 'heading', level: 2, text: 'O que fazer em caso de urgência' },
      {
        type: 'paragraph',
        text: 'Se a situação for grave — dor intensa, dificuldade para respirar ou risco de vida — não espere agendamento.',
      },
      {
        type: 'list',
        items: [
          'Vá direto ao pronto-socorro ou hospital mais próximo',
          'Ligue para o SAMU: 192',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Checklist antes de ir para a consulta',
      },
      {
        type: 'list',
        items: [
          'Separe exames e resultados anteriores',
          'Confirme o endereço com antecedência',
          'Leve o cartão SUS e o documento com foto',
        ],
      },
    ],
  },
  {
    slug: 'consulta-especialista',
    categorySlug: 'consulta',
    title: 'Como conseguir consulta com especialista',
    summary:
      'Para consultar um especialista pelo SUS é preciso passar por uma etapa antes. Entenda como funciona.',
    content: [
      {
        type: 'paragraph',
        text: 'No SUS, para consultar um especialista — cardiologista, ortopedista, dermatologista, entre outros — normalmente é preciso passar primeiro pelo médico da UBS (postinho de saúde).',
      },
      { type: 'heading', level: 2, text: 'O caminho passo a passo' },
      {
        type: 'list',
        items: [
          '1. Vá à UBS e marque uma consulta com o médico de família ou clínico geral',
          '2. O médico faz a avaliação e, se necessário, emite um encaminhamento',
          '3. Com o encaminhamento em mãos, você agenda a consulta com o especialista',
        ],
      },
      {
        type: 'callout',
        text: 'O SUS oferece atendimento em todas as especialidades médicas, de forma gratuita. O encaminhamento existe para organizar o fluxo — não para te impedir de ser atendido.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Onde agendar a consulta com o especialista',
      },
      {
        type: 'paragraph',
        text: 'O próprio médico da UBS vai informar onde agendar. Pode ser na Secretaria de Saúde do seu município, em um ambulatório de especialidades ou em um hospital conveniado.',
      },
      { type: 'heading', level: 2, text: 'E se a espera for muito longa?' },
      {
        type: 'paragraph',
        text: 'Filas longas para especialistas são comuns. Se o prazo estiver muito além do razoável, você tem caminhos:',
      },
      {
        type: 'list',
        items: [
          'Fale com a Secretaria de Saúde do seu município',
          'Acione a Ouvidoria do SUS',
          'Em último caso, considere a judicialização',
        ],
      },
      {
        type: 'heading',
        level: 2,
        text: 'Especialidades disponíveis pelo SUS',
      },
      {
        type: 'list',
        items: [
          'Cardiologia, neurologia, ortopedia, dermatologia',
          'Psiquiatria, ginecologia, urologia, oftalmologia',
          'Oncologia, reumatologia e todas as demais especialidades',
        ],
      },
      {
        type: 'callout',
        text: 'Você não precisa de comprovante de residência para ser atendido. O SUS é para todos os brasileiros, em qualquer município do país.',
      },
    ],
  },
]
