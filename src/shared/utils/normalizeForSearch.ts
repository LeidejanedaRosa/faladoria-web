/** Lower case, without accents or outer spaces: "São João" and "sao joao" become equal. */
export const normalizeForSearch = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
