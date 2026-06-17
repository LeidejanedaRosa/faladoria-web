import type { GuideArticle } from '../guideArticles'
import { appointmentArticles } from './appointment'
import { childHealthArticles } from './child-health'
import { complaintsArticles } from './complaints'
import { equipmentArticles } from './equipment'
import { examArticles } from './exam'
import { homeCareArticles } from './home-care'
import { howSusWorksArticles } from './how-sus-works'
import { judicialActionArticles } from './judicial-action'
import { medicalTransportArticles } from './medical-transport'
import { medicationArticles } from './medication'
import { mensHealthArticles } from './mens-health'
import { mentalHealthArticles } from './mental-health'
import { rightsArticles } from './rights'
import { surgeryArticles } from './surgery'
import { treatmentArticles } from './treatment'
import { vaccinationArticles } from './vaccination'
import { womensHealthArticles } from './womens-health'

export const GUIDE_ARTICLES: GuideArticle[] = [
  ...appointmentArticles,
  ...examArticles,
  ...surgeryArticles,
  ...treatmentArticles,
  ...medicationArticles,
  ...homeCareArticles,
  ...medicalTransportArticles,
  ...equipmentArticles,
  ...womensHealthArticles,
  ...mensHealthArticles,
  ...childHealthArticles,
  ...vaccinationArticles,
  ...mentalHealthArticles,
  ...rightsArticles,
  ...howSusWorksArticles,
  ...complaintsArticles,
  ...judicialActionArticles,
]
