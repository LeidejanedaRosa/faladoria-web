import '@testing-library/jest-dom/vitest'
import { cleanup, configure } from '@testing-library/react'
import { afterEach } from 'vitest'

// waitFor/findBy desistem em 1 s por padrão, a ~1,5× do primeiro teste de um arquivo (que paga o
// aquecimento). Com a CPU disputada, falhavam sem defeito nenhum. O limite só diz quando desistir:
// o waitFor termina assim que a condição vale. Ver docs/TROUBLESHOOTING.md (2026-11-26).
configure({ asyncUtilTimeout: 3000 })

// Cleanup após cada teste
afterEach(() => {
  cleanup()
})

// Mock de window.matchMedia (usado por muitos componentes)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

// Mock de IntersectionObserver
const MockIntersectionObserver = class {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: ReadonlyArray<number> = []
  readonly scrollMargin: string = ''
  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {}
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  unobserve() {}
}
globalThis.IntersectionObserver =
  MockIntersectionObserver as typeof IntersectionObserver

// jsdom 25 has <dialog> and its `open` property, but not showModal() or close(). These only
// toggle `open`; what the browser adds on top (focus trap, inert page, Escape) is checked in E2E.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(
    this: HTMLDialogElement
  ) {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
}
