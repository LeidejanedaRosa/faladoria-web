import type { GuideArticle } from '../guideArticles'
import {
  DOC_CPF,
  DOC_PHOTO_ID,
  DOC_PROOF_OF_ADDRESS,
  DOC_SUS_CARD,
} from './articleConstants'

const CATEGORY_SLUG = 'saude-do-homem'
const DATE_PUBLISHED = '2026-05-01'
const IMG_UBS = 'ubs' as const
const IMG_DOCTOR_PATIENT = 'doctor-patient' as const

export const mensHealthArticles: GuideArticle[] = [
  {
    slug: 'cancer-de-prostata-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Rastreamento de câncer de próstata pelo SUS',
    summary:
      'O SUS oferece PSA e toque retal para detecção precoce. Saiba a partir de quando solicitar e como agendar.',
    datePublished: DATE_PUBLISHED,
    iconName: 'search',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'A partir de quando solicitar',
        text: 'Recomendado a partir dos 50 anos para a maioria dos homens. A partir dos 45 anos para homens negros ou com pai ou irmão que teve câncer de próstata antes dos 60 anos.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS e peça o exame de próstata',
        imageKey: IMG_UBS,
        detail:
          'Fale com o médico ou enfermeiro. Informe sua idade e histórico familiar. Não é necessário ter sintomas — o rastreamento é preventivo.',
      },
      {
        type: 'action-step',
        action: 'Realize o PSA e o toque retal',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'O PSA é um exame de sangue simples. O toque retal é rápido e feito na própria consulta. Os dois juntos dão resultado mais preciso do que cada um isolado.',
      },
      {
        type: 'action-step',
        action: 'Retorne ao médico com o resultado do PSA',
        imageKey: 'calendar',
        detail:
          'O resultado do PSA sai em poucos dias. O médico interpreta o valor e decide se há necessidade de encaminhamento ao urologista.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'PSA elevado não significa câncer',
        text: 'Inflamação da próstata (prostatite) e crescimento benigno (hiperplasia) também elevam o PSA. Só o médico pode interpretar o resultado corretamente — não tente concluir nada sozinho.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Se o exame der alterado',
        icon: 'activity',
      },
      {
        type: 'action-step',
        action: 'Peça encaminhamento para urologia',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Com o resultado em mãos, volte à UBS. O médico vai te encaminhar via central de regulação para consulta com urologista no SUS.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [DOC_SUS_CARD, DOC_PHOTO_ID],
      },
    ],
  },

  {
    slug: 'vasectomia-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Vasectomia pelo SUS',
    summary:
      'A vasectomia é gratuita pelo SUS para quem tem 25 anos ou mais, ou já tem dois filhos vivos. Veja como solicitar.',
    datePublished: DATE_PUBLISHED,
    iconName: 'shield',
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Quem tem direito',
        text: 'Homem com 25 anos ou mais, OU com dois filhos vivos — mesmo sem ter 25 anos. Não é necessária autorização do cônjuge. Direito garantido pela Lei 9.263/1996 (Planejamento Familiar).',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como solicitar',
        icon: 'target',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS e solicite a vasectomia',
        imageKey: IMG_UBS,
        detail:
          'Fale com o médico sobre seu interesse. Ele vai confirmar se você atende os critérios da lei e fazer o pedido de encaminhamento cirúrgico.',
      },
      {
        type: 'action-step',
        action: 'Aguarde o agendamento via central de regulação',
        imageKey: 'calendar',
        detail:
          'A cirurgia é realizada em hospital ou clínica conveniada ao SUS. O tempo de espera varia por município — a UBS informa o prazo estimado.',
      },
      {
        type: 'action-step',
        action: 'Compareça ao hospital para a cirurgia',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'A vasectomia é ambulatorial, dura cerca de 30 minutos e usa anestesia local. Você vai e volta para casa no mesmo dia.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'A esterilidade não é imediata',
        text: 'Após a cirurgia, use contraceptivo por pelo menos 8 a 12 semanas. Um espermograma confirma o sucesso do procedimento antes de dispensar outros métodos.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'A vasectomia deve ser considerada permanente',
        text: 'A reversão (vasovasostomia) é tecnicamente possível, mas não está coberta pelo SUS e não tem resultado garantido. Decida com essa clareza.',
      },
      {
        type: 'callout',
        variant: 'checklist',
        title: 'O que levar',
        items: [DOC_SUS_CARD, DOC_PHOTO_ID, DOC_CPF, DOC_PROOF_OF_ADDRESS],
      },
    ],
  },

  {
    slug: 'saude-sexual-masculina-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Saúde sexual masculina pelo SUS',
    summary:
      'O SUS oferece preservativos gratuitos, testagem para ISTs, PrEP e tratamento. Saiba onde buscar cada serviço.',
    datePublished: DATE_PUBLISHED,
    content: [
      {
        type: 'callout',
        variant: 'tip',
        title: 'Preservativos gratuitos — sem precisar de consulta',
        text: 'Qualquer pessoa pode retirar preservativos masculinos e femininos diretamente na UBS, sem agendamento, receita ou justificativa.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como fazer testagem de ISTs',
        icon: 'search',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS ou ao CTA e peça testagem rápida',
        imageKey: IMG_UBS,
        detail:
          'A testagem rápida para HIV, sífilis, hepatite B e C é gratuita e o resultado sai em minutos. Na maioria dos municípios, não é necessário agendar. O CTA (Centro de Testagem e Aconselhamento) oferece atendimento sigiloso.',
      },
      {
        type: 'action-step',
        action: 'Inicie o tratamento se necessário',
        imageKey: 'medications',
        detail:
          'Se algum resultado for positivo, o médico inicia o tratamento na própria UBS ou te encaminha para o SAE (Serviço de Atenção Especializada). Os medicamentos são fornecidos gratuitamente.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar a PrEP',
        icon: 'shield',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'O que é a PrEP',
        text: 'PrEP (Profilaxia Pré-Exposição) é um medicamento diário que reduz em mais de 99% o risco de infecção pelo HIV quando tomado corretamente. É gratuita no SUS para quem tem indicação clínica.',
      },
      {
        type: 'action-step',
        action: 'Solicite a PrEP na UBS ou no SAE',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'Fale com o médico sobre PrEP. Ele vai avaliar o perfil de exposição ao risco e solicitar os exames iniciais (HIV, função renal). O atendimento é sigiloso.',
      },
      {
        type: 'action-step',
        action: 'Retire a medicação na farmácia do SUS',
        imageKey: 'medications',
        detail:
          'Com a receita, a PrEP é retirada gratuitamente na farmácia da UBS ou do SAE. São necessários retornos periódicos para renovar a prescrição e monitorar os exames.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'PEP: proteção em até 72 horas',
        text: 'Se houve exposição ao HIV (relação sexual sem preservativo com parceiro soropositivo ou de status desconhecido), procure UPA, hospital ou SAE em até 72 horas. A PEP (Profilaxia Pós-Exposição) é gratuita e mais eficaz quanto antes for iniciada.',
      },
    ],
  },

  {
    slug: 'saude-mental-homem-sus',
    categorySlug: CATEGORY_SLUG,
    title: 'Saúde mental do homem pelo SUS',
    summary:
      'Homens têm três vezes mais risco de suicídio que mulheres, mas buscam menos ajuda. O SUS oferece atendimento gratuito na UBS, no CAPS e por telefone.',
    datePublished: DATE_PUBLISHED,
    iconName: 'heart',
    content: [
      {
        type: 'callout',
        variant: 'emergency',
        title: 'Em crise, não espere',
        highlight: '188',
        text: 'CVV — Centro de Valorização da Vida. Gratuito, 24 horas. Você não precisa estar em risco imediato para pedir ajuda. Ou vá à UPA ou pronto-socorro mais próximo.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como buscar ajuda na UBS',
        icon: 'person',
      },
      {
        type: 'action-step',
        action: 'Vá à UBS e fale sobre o que está sentindo',
        imageKey: IMG_UBS,
        detail:
          'Você pode falar com o médico, o enfermeiro ou o assistente social. Não precisa ter diagnóstico — descreva o que está sentindo: tristeza persistente, irritação, insônia, ansiedade, vontade de se isolar.',
      },
      {
        type: 'action-step',
        action: 'Siga o plano de cuidado indicado',
        imageKey: IMG_DOCTOR_PATIENT,
        detail:
          'O médico pode prescrever medicamentos, encaminhar para o psicólogo do NASF (que atende na própria UBS) ou referenciar para o CAPS, conforme a gravidade do caso.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Psicólogo pode estar disponível na sua UBS',
        text: 'Muitas UBS contam com o NASF (Núcleo Ampliado de Saúde da Família) ou equipes de saúde mental vinculadas, que incluem psicólogo. Pergunte na recepção se sua UBS oferece esse serviço.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Como acessar o CAPS',
        icon: 'heart',
      },
      {
        type: 'action-step',
        action: 'Peça encaminhamento para o CAPS na UBS',
        imageKey: 'calendar',
        detail:
          'O CAPS (Centro de Atenção Psicossocial) atende casos de transtornos mentais moderados a graves. A UBS faz o encaminhamento. Em situação de urgência, você também pode ir diretamente ao CAPS.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'CAPS AD para dependência química',
        text: 'Se o problema envolver álcool ou outras drogas, o CAPS AD (Álcool e Drogas) oferece atendimento especializado: acompanhamento individual, grupos terapêuticos e, quando necessário, suporte para desintoxicação.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Homens adoecem mais por buscar menos ajuda',
        text: 'Homens representam cerca de 80% das mortes por suicídio no Brasil. O estigma de que "homem não pode pedir ajuda" atrasa o tratamento e agrava o quadro. Buscar cuidado é um sinal de responsabilidade, não de fraqueza.',
      },
    ],
  },
]
