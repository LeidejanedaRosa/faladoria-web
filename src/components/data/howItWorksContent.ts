import stepCanalAberto from '@assets/step_canal_aberto.webp'
import stepPonte from '@assets/step_ponte.webp'
import stepPrioridade from '@assets/step_prioridade.webp'
import stepSuaVozImporta from '@assets/step_sua_voz_importa.webp'

export const HOW_IT_WORKS_HEADING_ID = 'how-it-works-heading'

export const HOW_IT_WORKS_CONTENT = {
  sectionHeading: 'Como a Faladoria funciona',
  headline: 'Da denúncia à solução',
  subtitle:
    'Todo o processo acontece pelo WhatsApp. Simples, direto e sem burocracia.',
  steps: [
    {
      id: 'step-report',
      number: 1,
      title: 'Conte seu problema',
      description: 'Mande uma mensagem pelo WhatsApp. É simples e rápido.',
      image: stepSuaVozImporta,
      imageAlt: 'Mulher sorrindo com a frase "Sua voz importa"',
    },
    {
      id: 'step-forward',
      number: 2,
      title: 'A gente leva pra quem resolve',
      description: 'Encaminhamos sua demanda direto pra gestão de saúde.',
      image: stepPonte,
      imageAlt:
        'Logo da Faladoria com a frase "A gente não é ouvidoria. A gente é ponte."',
    },
    {
      id: 'step-track',
      number: 3,
      title: 'Acompanhe de perto',
      description:
        'Você fica sabendo de cada passo pelo WhatsApp até a resposta chegar.',
      image: stepCanalAberto,
      imageAlt:
        'Mulher sorrindo com a frase "A Faladoria é um canal aberto para você ser ouvido de verdade"',
    },
    {
      id: 'step-resolve',
      number: 4,
      title: 'Seu problema resolvido',
      description: 'A gestão pública responde e a saúde melhora pra todos.',
      image: stepPrioridade,
      imageAlt:
        'Duas pessoas se abraçando com a frase "Prioridade de atendimento"',
    },
  ],
} as const
