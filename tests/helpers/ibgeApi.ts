// The E2E build points at this address (playwright.config.ts); nothing answers on it, so a spec
// that needs the IBGE intercepts it with page.route.
export const E2E_IBGE_URL = 'https://ibge.e2e.test/localidades'
