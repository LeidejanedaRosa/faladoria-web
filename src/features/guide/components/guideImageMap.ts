import cartaoSusImg from '@assets/guide/consulta/cartao-sus.png'
import consultaCategoryImg from '@assets/guide/consulta/category.png'
import checklistImg from '@assets/guide/consulta/checklist.png'
import consultaAgendarImg from '@assets/guide/consulta/como-agendar-consulta.png'
import consultaEspecialistaImg from '@assets/guide/consulta/consulta-especialista.png'

export const GUIDE_CATEGORY_IMAGES: Partial<Record<string, string>> = {
  consulta: consultaCategoryImg,
}

export const GUIDE_ARTICLE_IMAGES: Partial<Record<string, string>> = {
  'como-agendar-consulta': consultaAgendarImg,
  'consulta-especialista': consultaEspecialistaImg,
}

export const GUIDE_STEP_IMAGES: Partial<Record<string, string>> = {
  'cartao-sus': cartaoSusImg,
  checklist: checklistImg,
}
