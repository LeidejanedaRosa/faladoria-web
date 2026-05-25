# Troubleshooting

Log de erros, conflitos e comportamentos inesperados encontrados durante o desenvolvimento, com causa raiz e solução. Consultar antes de depurar um problema — é comum que os mesmos erros se repitam em contextos diferentes.

---

## TS6310: Referenced project may not disable emit

**Data**: 2026-05-25
**Commit de resolução**: `c645458`

**Sintoma**:

```
tsconfig.test.json(10,18): error TS6310:
Referenced project '.../tsconfig.app.json' may not disable emit.
```

O erro aparece ao rodar `tsc -b --noEmit`. Os testes continuam passando — o problema é exclusivo do modo de build composto.

**Causa raiz**:

O `tsconfig.test.json` declarava uma `reference` para `tsconfig.app.json`:

```json
"references": [{ "path": "./tsconfig.app.json" }]
```

O `tsconfig.app.json` tem `composite: true` + `allowImportingTsExtensions: true` + `emitDeclarationOnly: true`. A combinação `allowImportingTsExtensions: true` com `emitDeclarationOnly: true` faz o TypeScript tratar esse projeto como "sem emit real" para fins de referência composta — o que dispara o `TS6310`.

**Solução**:

Remover `references` do `tsconfig.test.json` e substituir o `include` granular por uma cobertura ampla:

```json
"include": ["src", "tests"]
```

O `tsconfig.test.json` já usa `extends: ./tsconfig.app.json`, então herda todas as `compilerOptions`. O `references` era redundante e causava o conflito. Ver [DECISIONS.md](DECISIONS.md#2026-05-25--tsconfigtestjson-sem-project-references) para o raciocínio completo.

---

## Classe `bg-gradient-to-br` não aplica gradiente

**Data**: 2026-05-23
**Commit de resolução**: `df972fa`

**Sintoma**: A classe `bg-gradient-to-br` não gera nenhum gradiente visual. O elemento fica com fundo sólido ou transparente.

**Causa raiz**:

O projeto usa **Tailwind CSS v4**, que mudou a nomenclatura das classes de gradiente. A classe `bg-gradient-to-*` é sintaxe do Tailwind v3 e não existe na v4.

**Solução**:

| v3                  | v4                |
| ------------------- | ----------------- |
| `bg-gradient-to-br` | `bg-linear-to-br` |
| `bg-gradient-to-t`  | `bg-linear-to-t`  |
| `bg-gradient-to-r`  | `bg-linear-to-r`  |

**Atenção**: snippets de IA, documentação desatualizada e exemplos da internet costumam usar a sintaxe v3. Ao copiar qualquer classe de gradiente, verificar se usa `bg-linear-to-*`.

---

## Testes de scroll assíncronos falham intermitentemente em jsdom

**Data**: 2026-05-23
**Commit de resolução**: `84f90b1`

**Sintoma**: Testes que verificam comportamento de scroll (`useScrollToTop`, `HomePage — scroll to anchor on mount`) passam às vezes e falham em outras execuções. Os testes usavam `await new Promise(r => setTimeout(r, 50))` para esperar o scroll acontecer.

**Causa raiz**:

O `useScrollToTop` e a lógica de scroll para anchor usam `requestAnimationFrame` internamente. O jsdom não implementa `requestAnimationFrame` de forma assíncrona real — o callback nunca é executado a menos que seja explicitamente stubado.

A solução de `setTimeout(r, 50)` era frágil: dependia de timing, o que gera flakiness em ambientes com carga variável.

**Solução**:

Stubar `requestAnimationFrame` para executar o callback de forma síncrona no `beforeEach` do suite:

```ts
vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
  cb(0)
  return 0
})
```

Com isso, os testes se tornam síncronos — sem `async/await`, sem `setTimeout`. Mais rápidos e determinísticos.

Lembrar de chamar `vi.unstubAllGlobals()` no `afterEach` para não vazar o stub entre testes.

---

## TypeScript não encontra arquivos de teste ao usar `tsc -b`

**Data**: 2026-05-22
**Commit de resolução**: `c9d4df0`

**Sintoma**: `tsc -b` (build composto) reporta erros de tipo em arquivos dentro de `tests/` — tipos do Playwright não reconhecidos, imports não resolvidos.

**Causa raiz**:

O `tsconfig.app.json` exclui explicitamente os arquivos de teste com `"exclude": ["**/*.test.ts", ...]`. Ao rodar `tsc -b`, os arquivos `tests/*.spec.ts` ficavam sem um `tsconfig` que os cobrisse.

**Solução**:

O `tsconfig.node.json` (que cobre arquivos de configuração como `playwright.config.ts`) foi expandido para também incluir `tests/**`. Os arquivos de spec do Playwright recebem os tipos corretos de `@playwright/test`.

---

## `Accessibility.tsx` violava o Single Responsibility Principle

**Data**: 2026-05-23
**Commit de resolução**: `bdba22e`

**Sintoma**: Não era um erro — era um code smell. O arquivo `Accessibility.tsx` continha quatro componentes distintos (`SkipLink`, `MainContent`, `ScreenReaderOnly`, `AccessibleLink`) num único arquivo de ~150 linhas.

**Causa raiz**:

Agrupamento por "tema" (acessibilidade) em vez de por responsabilidade. Cada componente tem um propósito, ciclo de vida e casos de uso completamente independentes.

**Solução**:

Separação em arquivos individuais:

```
shared/components/ui/
├── SkipLink.tsx
├── MainContent.tsx
├── ScreenReaderOnly.tsx
├── AccessibleLink.tsx
└── index.ts  ← re-exporta todos (API pública não mudou)
```

O `index.ts` manteve os mesmos exports — nenhum import externo precisou ser alterado.

---

## `<h3>` oculto com `aria-hidden` na seção FAQ

**Data**: 2026-05-23
**Commit de resolução**: `ef65ce6`

**Sintoma**: Título da seção FAQ não aparecia para leitores de tela. A hierarquia de headings tinha um gap (h2 → h4 sem h3).

**Causa raiz**:

O componente `FaqSection` usava um `<h3>` com `aria-hidden="true"` para o título visual da seção. A intenção provavelmente era decorativa, mas o resultado foi:

1. Leitores de tela não anunciavam o título da seção
2. A hierarquia de headings ficava `h2 → h4`, pulando um nível

**Solução**:

Substituir o `<h3 aria-hidden>` por `<h2>` visível e semântico. O título da seção é conteúdo real, não decoração.

---

## Links nativos `<a>` em vez de `<Link>` do React Router

**Data**: 2026-05-23
**Commit de resolução**: `b7fb4ab`

**Sintoma**: Navegação entre páginas causava reload completo da aplicação em vez de navegação client-side.

**Causa raiz**:

O `Header` e o `LegalPageLayout` usavam `<a href="...">` nativo ao invés do componente `<Link>` do React Router DOM. Tags `<a>` nativas fazem requisição HTTP completa — o React Router não intercepta.

**Solução**:

Substituir `<a href="...">` por `<Link to="...">` (React Router DOM) em todos os componentes de navegação interna. Links externos (fora da aplicação) continuam usando `<a>`.

**Regra**: `<Link>` para rotas internas, `<a>` para URLs externas.

---

## Função `slugify` duplicada com implementações divergentes

**Data**: 2026-05-25
**Commit de resolução**: `b100748`

**Sintoma**: A função `slugify` existia em dois arquivos com lógicas levemente diferentes, gerando resultados inconsistentes dependendo de qual era chamada. Um commit anterior (`09c10fb`) afirmava ter extraído a função mas não criou o arquivo utilitário.

**Causa raiz**:

- `BreadcrumbSchema.tsx`: usava `[̀-ͯ]` (range Unicode manual) para remover diacríticos
- `structuredData.ts`: usava `\p{Diacritic}/gu` (Unicode property escapes)

As duas abordagens funcionam para Latin, mas a segunda é mais robusta para outros scripts. Além disso, o `BreadcrumbSchema.tsx` fazia `toLowerCase()` antes do `normalize('NFD')` — a ordem correta é normalizar primeiro, depois converter para minúsculas.

**Solução**:

Criado `src/shared/utils/slugify.ts` com implementação unificada (baseada na versão mais robusta) e 8 testes cobrindo diacríticos, espaços, caracteres especiais, números e strings vazias. As duas implementações inline foram removidas.

Ver [DECISIONS.md](DECISIONS.md#2026-05-23--slugify-como-utilitário-compartilhado) para o raciocínio da implementação escolhida.
