import type { GuideArticle } from '../guideArticles'
import { atendimentoDomiciliarArticles } from './atendimento-domiciliar'
import { cirurgiaArticles } from './cirurgia'
import { comoFuncionaOSusArticles } from './como-funciona-o-sus'
import { consultaArticles } from './consulta'
import { denunciasArticles } from './denuncias'
import { equipamentosArticles } from './equipamentos'
import { exameArticles } from './exame'
import { judicializacaoArticles } from './judicializacao'
import { medicamentoArticles } from './medicamento'
import { saudeDaCriancaArticles } from './saude-da-crianca'
import { saudeDaMulherArticles } from './saude-da-mulher'
import { saudeDoHomemArticles } from './saude-do-homem'
import { saudeMentalArticles } from './saude-mental'
import { seusDireitosArticles } from './seus-direitos'
import { transporteSanitarioArticles } from './transporte-sanitario'
import { tratamentoArticles } from './tratamento'
import { vacinacaoArticles } from './vacinacao'

export const GUIDE_ARTICLES: GuideArticle[] = [
  ...consultaArticles,
  ...exameArticles,
  ...cirurgiaArticles,
  ...tratamentoArticles,
  ...medicamentoArticles,
  ...atendimentoDomiciliarArticles,
  ...transporteSanitarioArticles,
  ...equipamentosArticles,
  ...saudeDaMulherArticles,
  ...saudeDoHomemArticles,
  ...saudeDaCriancaArticles,
  ...vacinacaoArticles,
  ...saudeMentalArticles,
  ...seusDireitosArticles,
  ...comoFuncionaOSusArticles,
  ...denunciasArticles,
  ...judicializacaoArticles,
]
