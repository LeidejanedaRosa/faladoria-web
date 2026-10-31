import { describe, expect, it } from 'vitest'

import { USERS_CONTENT } from '../usersContent'

const { account } = USERS_CONTENT

describe('USERS_CONTENT.account', () => {
  it('agrees the out-of-reach warning with one case or several', () => {
    expect(account.outOfReach(1)).toBe(
      '1 caso em andamento continua com esta pessoa, mas o papel e as cidades de agora não permitem tratá-lo. Ele precisa ser passado para outra pessoa.'
    )
    expect(account.outOfReach(3)).toMatch(
      /^3 casos em andamento continuam .* tratá-los\. Eles precisam ser passados/
    )
  })

  it('agrees the admin warning with one city or several', () => {
    expect(account.citiesRemoved(['Lavras/MG'])).toBe(
      'A administração vê todas as cidades. Ao salvar, Lavras/MG sai desta conta.'
    )
    expect(account.citiesRemoved(['Lavras/MG', 'Varginha/MG'])).toBe(
      'A administração vê todas as cidades. Ao salvar, Lavras/MG, Varginha/MG saem desta conta.'
    )
  })

  it('agrees the cases that stay with a deactivated account with one or several', () => {
    expect(USERS_CONTENT.accessSection.casesStay(1)).toBe(
      '1 caso em andamento continua com esta pessoa até alguém passá-lo para outra.'
    )
    expect(USERS_CONTENT.accessSection.casesStay(3)).toBe(
      '3 casos em andamento continuam com esta pessoa até alguém passá-los para outra.'
    )
  })
})
