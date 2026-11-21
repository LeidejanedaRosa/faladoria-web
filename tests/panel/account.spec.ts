import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

import { mockComplaintCounts } from '../helpers/complaintCountsApi'
import { E2E_API_URL } from '../helpers/publicBoardApi'

const MOBILE = { width: 390, height: 844 }
const DESKTOP = { width: 1440, height: 900 }

type Role = 'admin' | 'assistant' | 'manager'

const account = (id: string, name: string, role: Role, cities: string[]) => ({
  id,
  name,
  email: `${id}@faladoria.org`,
  role,
  assignedCities: cities.map(city => ({ city, state: 'MG' })),
  status: 'active',
  assignedComplaintCount: 3,
})

const area = (city: string) => ({
  id: `sa_${city}`,
  city,
  state: 'MG',
  addedAt: '2026-10-01T13:00:00.000Z',
  removedAt: null,
})

/** The session, the team list, the account change (it answers the saved account) and the
 * served cities. Lavras is no longer served, though Ana still has it. */
const mockApis = async (
  page: Page,
  { role = 'admin', outOfReach = 0 }: { role?: Role; outOfReach?: number } = {}
) => {
  const users = [
    account('usr_ana', 'Ana Souza', 'assistant', ['Varginha', 'Lavras']),
    account('usr_carla', 'Carla Dias', 'admin', []),
    account('usr_bia', 'Bia Rocha', 'manager', ['Alfenas']),
  ]
  const sent: unknown[] = []
  await page.route(`${E2E_API_URL}/api/auth/get-session`, route =>
    route.fulfill({
      json: {
        session: { expiresAt: '2026-11-30T12:00:00Z' },
        user: {
          id: 'usr_carla',
          name: 'Carla Dias',
          email: 'carla@faladoria.org',
          role,
          assignedCities: [],
          mustChangePassword: false,
          credentialExpiresAt: null,
        },
      },
    })
  )
  await mockComplaintCounts(page)
  await page.route(`${E2E_API_URL}/api/users`, route =>
    route.fulfill({ json: users })
  )
  await page.route(`${E2E_API_URL}/api/users/*/update`, route => {
    const changes = route.request().postDataJSON() as object
    sent.push(changes)
    const user = users.find(({ id }) => route.request().url().includes(id))!
    Object.assign(user, changes)
    return route.fulfill({
      json: { ...user, complaintsOutOfReach: outOfReach },
    })
  })
  await page.route(`${E2E_API_URL}/api/service-areas**`, route =>
    route.fulfill({
      json: { serviceAreas: [area('Alfenas'), area('Varginha')] },
    })
  )
  return sent
}

const openAccount = async (
  page: Page,
  userId = 'usr_ana',
  options?: Parameters<typeof mockApis>[1]
) => {
  const sent = await mockApis(page, options)
  await page.goto(`/dashboard/equipe/${userId}`, {
    waitUntil: 'domcontentloaded',
  })
  await page.getByRole('dialog').waitFor({ timeout: 15000 })
  return sent
}

const openFromList = async (page: Page) => {
  await mockApis(page)
  await page.goto('/dashboard/equipe', { waitUntil: 'domcontentloaded' })
  const edit = page.getByRole('link', { name: 'Editar a conta de Ana Souza' })
  await edit.click()
  await page.getByRole('dialog', { name: 'Ana Souza' }).waitFor()
  return edit
}

const drawer = (page: Page, name = 'Ana Souza') =>
  page.getByRole('dialog', { name })

/** The drawer slides in: its box is only final once the transition has finished. */
const drawerAtRest = async (page: Page) => {
  const element = drawer(page)
  await element.evaluate(dialog =>
    Promise.all(dialog.getAnimations().map(animation => animation.finished))
  )
  return (await element.boundingBox())!
}

const save = (page: Page) =>
  page.getByRole('button', { name: 'Salvar alterações' }).click()

test.describe('Account drawer', () => {
  test.describe('Rendering & Structure', () => {
    test('should open from the Edit link over the team list, which stays behind it', async ({
      page,
    }) => {
      await openFromList(page)

      await expect(page).toHaveURL(/\/dashboard\/equipe\/usr_ana$/)
      await expect(drawer(page)).toBeVisible()
      await expect(page.locator('h1')).toHaveText('Equipe')
    })

    test('should keep the drawer open on reload: the address names it', async ({
      page,
    }) => {
      await openFromList(page)

      await page.reload({ waitUntil: 'domcontentloaded' })

      await expect(drawer(page)).toBeVisible()
    })

    test('should close on Back, leaving the list', async ({ page }) => {
      await openFromList(page)

      await page.goBack()

      await expect(page).toHaveURL(/\/dashboard\/equipe$/)
      await expect(page.getByRole('dialog')).toHaveCount(0)
    })

    test('should move a manager opened under Equipe to Gestores', async ({
      page,
    }) => {
      await mockApis(page)
      await page.goto('/dashboard/equipe/usr_bia', {
        waitUntil: 'domcontentloaded',
      })

      await expect(drawer(page, 'Bia Rocha')).toBeVisible()
      await expect(page).toHaveURL(/\/dashboard\/gestores\/usr_bia$/)
      await expect(page.locator('h1')).toHaveText('Gestores')
    })

    test('should tell another role the page is not for them', async ({
      page,
    }) => {
      await mockApis(page, { role: 'manager' })
      await page.goto('/dashboard/equipe/usr_ana', {
        waitUntil: 'domcontentloaded',
      })

      await expect(page.locator('h1')).toHaveText('Acesso restrito')
      await expect(page.getByRole('dialog')).toHaveCount(0)
    })

    test('should say when the account does not exist', async ({ page }) => {
      await openAccount(page, 'usr_nobody')

      await expect(drawer(page, 'Conta não encontrada')).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    const expectNoViolations = async (page: Page) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      expect(results.violations).toEqual([])
    }

    test('should have no axe violations with a city no longer served', async ({
      page,
    }) => {
      await openAccount(page)
      await expect(page.getByText('(deixou de ser atendida)')).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations on the Acesso tab', async ({
      page,
    }) => {
      await openAccount(page)
      await page.getByRole('tab', { name: 'Acesso' }).click()
      await expect(
        page.getByRole('button', { name: 'Desativar conta' })
      ).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations with the admin warning', async ({
      page,
    }) => {
      await openAccount(page)
      await page.getByRole('radio', { name: /Administração/ }).check()
      await expect(page.getByText(/Ao salvar, Varginha\/MG/)).toBeVisible()

      await expectNoViolations(page)
    })

    test('should have no axe violations with the out-of-reach warning', async ({
      page,
    }) => {
      await openAccount(page, 'usr_ana', { outOfReach: 2 })
      await page.getByRole('button', { name: 'Tirar Lavras/MG' }).click()
      await save(page)
      await expect(page.getByText(/2 casos em andamento/)).toBeVisible()

      await expectNoViolations(page)
    })

    test('should start on the title and never let Tab reach the list behind', async ({
      page,
    }) => {
      await openAccount(page)
      await expect(
        drawer(page).getByRole('heading', { name: 'Ana Souza' })
      ).toBeFocused()

      // More presses than the drawer has controls: focus cycles through it and never reaches
      // the list behind. A native modal lets it pass through the browser's own controls (the
      // address bar) on the way round, where the page sees <body>.
      for (let press = 0; press < 25; press++) {
        await page.keyboard.press('Tab')
        const where = await page.evaluate(() => {
          const element = document.activeElement
          if (!element || element === document.body) return 'browser'
          return element.closest('dialog') ? 'drawer' : 'page'
        })
        expect(where).not.toBe('page')
      }
    })

    test('should close on Escape and give focus back to the Edit link', async ({
      page,
    }) => {
      const edit = await openFromList(page)

      await page.keyboard.press('Escape')

      await expect(page.getByRole('dialog')).toHaveCount(0)
      await expect(page).toHaveURL(/\/dashboard\/equipe$/)
      await expect(edit).toBeFocused()
    })

    test('should switch tabs with the arrows', async ({ page }) => {
      await openAccount(page)
      await page.getByRole('tab', { name: 'Dados' }).focus()

      await page.keyboard.press('ArrowRight')

      await expect(page.getByRole('tab', { name: 'Acesso' })).toBeFocused()
      await expect(
        page.getByRole('heading', { name: 'Acesso ao painel' })
      ).toBeVisible()
    })

    test('should rename an account with the keyboard only, and announce it', async ({
      page,
    }) => {
      const sent = await openAccount(page)
      await page.getByRole('textbox', { name: 'Nome' }).focus()

      await page.keyboard.press('ControlOrMeta+a')
      await page.keyboard.type('Ana Lima')
      await page.keyboard.press('Enter')

      await expect(
        page.getByRole('status').filter({ hasText: 'foram salvas' })
      ).toHaveText('As alterações de Ana Lima foram salvas.')
      expect(sent).toEqual([{ name: 'Ana Lima' }])
    })
  })

  test.describe('Business rules', () => {
    test('should take every city from an account that becomes admin', async ({
      page,
    }) => {
      const sent = await openAccount(page)

      await page.getByRole('radio', { name: /Administração/ }).check()
      await save(page)

      await expect(page.getByText(/foram salvas/)).toBeVisible()
      expect(sent).toEqual([{ role: 'admin', assignedCities: [] }])
    })

    test('should follow the account to Gestores when it becomes a manager', async ({
      page,
    }) => {
      await openAccount(page)

      await page.getByRole('radio', { name: /Gestão de saúde/ }).check()
      await save(page)

      await expect(page).toHaveURL(/\/dashboard\/gestores\/usr_ana$/)
      await expect(drawer(page)).toBeVisible()
      await expect(page.locator('h1')).toHaveText('Gestores')
      // The form travels with the account: what was saved is still said there.
      await expect(
        page.getByRole('status').filter({ hasText: 'foram salvas' })
      ).toHaveText('As alterações de Ana Souza foram salvas.')
    })

    test('should not offer a change of one’s own role', async ({ page }) => {
      await openAccount(page, 'usr_carla')

      await expect(page.getByRole('radio')).toHaveCount(0)
      await expect(
        page.getByText('Você não pode trocar o próprio papel.')
      ).toBeVisible()
    })
  })

  test.describe('Responsive Layout', () => {
    test('should cover the whole phone, without sideways scrolling', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openAccount(page)

      const box = await drawerAtRest(page)
      expect(box.x).toBe(0)
      expect(box.width).toBe(MOBILE.width)
      const width = await page.evaluate(
        () => document.documentElement.scrollWidth
      )
      expect(width).toBeLessThanOrEqual(MOBILE.width)
    })

    test('should sit on the right on desktop, leaving the list in sight', async ({
      page,
    }) => {
      await page.setViewportSize(DESKTOP)
      await openAccount(page)

      const box = await drawerAtRest(page)
      expect(Math.round(box.x + box.width)).toBe(DESKTOP.width)
      expect(box.width).toBeLessThanOrEqual(512)
    })

    test('should give the × a 48px touch target on mobile', async ({
      page,
    }) => {
      await page.setViewportSize(MOBILE)
      await openAccount(page)

      const box = (await page
        .getByRole('button', { name: 'Fechar' })
        .boundingBox())!
      expect(box.width).toBeGreaterThanOrEqual(48)
      expect(box.height).toBeGreaterThanOrEqual(48)
    })
  })
})
