# Troubleshooting

Log de erros, conflitos e comportamentos inesperados encontrados durante o desenvolvimento, com causa raiz e solução. Consultar antes de depurar um problema — é comum que os mesmos erros se repitam em contextos diferentes.

---

## `tsc --noEmit` passa mas o erro real existe — cache do build composto

**Data**: 2026-05-25

**Sintoma**:

`tsc --noEmit` retorna saída vazia (zero erros), mas o código tem um `TS2304: Cannot find name 'GUIDE_ROUTES'` real. O import estava faltando em `guideHighlightContent.ts`, mas nenhum alerta aparecia.

**Causa raiz**:

`tsc --noEmit` sem flag `-p` usa o `tsconfig.json` raiz, que declara apenas `references` para os projetos compostos. Neste modo, o TypeScript reutiliza o cache de build anterior (`.tsbuildinfo`) em vez de recompilar os arquivos. Se o arquivo foi editado após o último build bem-sucedido mas o cache não foi invalidado corretamente, o erro fica mascarado.

`tsc -p tsconfig.app.json --noEmit` compila diretamente, sem cache, e expõe o erro real.

**Solução**:

```bash
# NÃO usar para validação — pode usar cache stale:
npx tsc --noEmit

# USAR para validação confiável:
npx tsc -p tsconfig.app.json --noEmit
```

**Regra**: sempre usar `tsc -p tsconfig.app.json --noEmit` para verificar erros de tipo no código da aplicação. O `tsc --noEmit` simples é adequado apenas para validar referências entre projetos compostos, não para checar erros de compilação do código-fonte.

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

## `GuideArticlePage` renderizava artigo com categoria errada

**Data**: 2026-05-28

**Sintoma**: Visitar `/como-conseguir-pelo-sus/consulta/como-solicitar-exames-pelo-sus` (categoria incorreta para o artigo) renderizava a página sem redirecionar. O breadcrumb mostrava "Consulta" e a canonical URL tinha o slug errado, gerando conteúdo duplicado para o Google.

**Causa raiz**:

`getArticleBySlug` busca em todos os artigos independentemente do `categorySlug` da URL. A validação anterior verificava apenas `!article || !category`, não a relação entre os dois:

```ts
// antes
if (!article || !category) {
  return <Navigate to={GUIDE_ROUTES.root} replace />
}
```

Um artigo de exame existia, uma categoria "consulta" existia — a condição passava. O artigo era renderizado sob a categoria errada.

**Solução**:

Adicionar a verificação de propriedade do artigo:

```ts
if (!article || !category || article.categorySlug !== category.slug) {
  return <Navigate to={GUIDE_ROUTES.root} replace />
}
```

**Regra**: em qualquer lookup que envolva dois parâmetros de URL interdependentes (`categorySlug` + `articleSlug`), validar não apenas a existência de cada entidade, mas a relação entre elas.

---

## `GuideCategoryLayout.test.tsx` falhava após adicionar constante ao barrel

**Data**: 2026-05-28

**Sintoma**:

```
Error: [vitest] No "GUIDE_CATEGORY_HEADING_ID" export is defined on the "../../data" mock.
Did you forget to return it from "vi.mock"?
```

Todos os 8 testes do `GuideCategoryLayout.test.tsx` falharam após `GUIDE_CATEGORY_HEADING_ID` ser adicionado a `guideContent.ts`.

**Causa raiz**:

O teste mocava `../../data` com `vi.mock('../../data', async () => { const actual = await vi.importActual(...); return { ...actual, getArticlesByCategory: vi.fn() } })`. O `...actual` deveria incluir a nova constante — mas o barrel `data/index.ts` não re-exportava `GUIDE_CATEGORY_HEADING_ID`. O Vitest tentava acessar a exportação via o módulo mockado e não a encontrava.

A causa real não era o mock em si, mas a constante não estar no barrel.

**Solução**:

Adicionar a constante ao barrel `features/guide/data/index.ts`:

```ts
export {
  GUIDE_HEADING_ID,
  GUIDE_CATEGORIES_HEADING_ID,
  GUIDE_CATEGORIES_SECTION_ID,
  GUIDE_CATEGORY_HEADING_ID,  // ← adicionado
  GUIDE_ARTICLE_HEADING_ID,   // ← adicionado
  ...
} from './guideContent'
```

**Regra**: toda constante, tipo ou função adicionada a um arquivo dentro de `features/guide/data/` deve ser re-exportada pelo barrel `data/index.ts` antes de ser importada por qualquer componente via `'../data'`.

---

## `TS7053: StepGroup.icon` tipado como `string` em vez de `ArticleStepIconName`

**Data**: 2026-06-14

**Sintoma**:

```
src/features/guide/components/GuideArticleLayout.tsx(311,28): error TS7053:
Element implicitly has an 'any' type because expression of type 'string'
can't be used to index type 'Record<ArticleStepIconName, IconComponent>'.
```

**Causa raiz**:

Quando `ArticleStepIconName` foi movido de `components/guideIconMap.ts` para `data/guideArticles.ts`, a interface interna `StepGroup` em `GuideArticleLayout.tsx` não foi atualizada. O campo `icon?: string` ainda usava o tipo primitivo, o que impedia o uso de `step.icon` como chave de `ARTICLE_STEP_ICON_MAP` (que aceita apenas `ArticleStepIconName`).

**Solução**:

1. Importar `ArticleStepIconName` de `'../data'` em `GuideArticleLayout.tsx`
2. Atualizar `StepGroup.icon` de `string` para `ArticleStepIconName`

```ts
// antes
interface StepGroup {
  icon?: string
}

// depois
interface StepGroup {
  icon?: ArticleStepIconName
}
```

**Regra**: ao mover um tipo de uma camada para outra, buscar por todas as interfaces internas que usavam o tipo primitivo correspondente (`string`, `number`) como substituto informal. Esses são os pontos que o compilador não detecta automaticamente durante a refatoração.

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

---

## `StepRightColumn` filtrava blocos já filtrados — branch de código morto com erro de tipo

**Data**: 2026-06-22

**Sintoma**: Nenhum erro visível em runtime. Identificado em revisão: `StepRightColumn` recebia `blocks: ArticleBlock[]` e fazia `block.type === 'callout'` internamente, com um `else return null`. O branch `null` nunca era atingido porque o caller passava apenas callouts.

**Causa raiz**:

Após refatorações anteriores, `InformationalStepCard` já filtrava `rightBlocks` antes de passar para `StepRightColumn`:

```tsx
// caller já filtrava:
const rightBlocks = step.blocks.filter(b => b.type === 'callout')

// mas StepRightColumn filtrava de novo:
const StepRightColumn = ({ blocks }: { blocks: ArticleBlock[] }) => (
  blocks.map(block => block.type === 'callout'
    ? <Callout key={...} block={block} />
    : null  // nunca atingido
  )
)
```

Além do código morto, o tipo `ArticleBlock[]` estava errado para o prop — `Callout` espera `Extract<ArticleBlock, { type: 'callout' }>`, não `ArticleBlock`.

**Solução**:

1. Definir `type CalloutBlock = Extract<ArticleBlock, { type: 'callout' }>` no escopo do módulo
2. Retipar o prop de `StepRightColumn` para `{ blocks: CalloutBlock[] }`
3. Retirar o check interno — o componente itera e renderiza diretamente
4. Usar type predicate no caller: `step.blocks.filter((b): b is CalloutBlock => b.type === 'callout')`

**Regra**: quando um componente recebe dados já filtrados por tipo, o prop deve refletir o tipo estreitado — não o tipo base. O type predicate no caller é o mecanismo correto para satisfazer o TypeScript sem assertion.

---

## `ActionStepBlock` exportado do módulo mas não adicionado ao barrel

**Data**: 2026-06-22

**Sintoma**: `tsc -p tsconfig.app.json --noEmit` reportou:

```
error TS2305: Module '"../data"' has no exported member 'ActionStepBlock'.
```

Três arquivos afetados: `GuideActionStepCard.tsx`, `GuideActionStepList.tsx`, `GuideArticleLayout.tsx`. O comando `tsc --noEmit` (sem `-p`) não reportou nenhum erro — o cache stale mascarou o problema.

**Causa raiz**:

`ActionStepBlock` foi adicionado como export em `data/guideArticles.ts`:

```ts
export type ActionStepBlock = Extract<ArticleBlock, { type: 'action-step' }>
```

Mas não foi adicionado ao barrel `data/index.ts`. Os componentes importam de `'../data'` (o barrel), não diretamente de `'../data/guideArticles'`.

**Solução**:

Adicionar ao `data/index.ts`:

```ts
export type {
  GuideArticle,
  ArticleBlock,
  ActionStepBlock, // ← adicionado
  ArticleStepIconName,
} from './guideArticles'
```

**Conexão com TROUBLESHOOTING existente**: este é outro caso do problema documentado em ["`tsc --noEmit` passa mas o erro real existe"](#tsc---noemit-passa-mas-o-erro-real-existe--cache-do-build-composto). Usar `tsc -p tsconfig.app.json --noEmit` é obrigatório para validação confiável.

**Regra (reforço)**: toda exportação nova em qualquer arquivo de `features/guide/data/` deve ser adicionada ao barrel `data/index.ts` imediatamente. A ausência não gera erro no arquivo fonte — só no consumidor.

---

## Cor `blue` duplicada em 17 categorias — union type com 16 cores

**Data**: 2026-06-23

**Sintoma**: Sem erro de compilação. Identificado em auditoria de código: `transporte-sanitario` e `como-funciona-o-sus` compartilhavam `color: 'blue'`, tornando-as visualmente idênticas na grade de categorias.

**Causa raiz**: a union `GuideCategory['color']` foi criada com 16 valores para 16 categorias, mas o projeto cresceu para 17 categorias sem a union ser atualizada. O TypeScript não detectou o problema porque `'blue'` é um valor válido — apenas duas categorias o usavam.

**Solução**:

1. Adicionado `'slate'` à union de cores em `guideCategories.ts`
2. Adicionado tema `slate` ao `CATEGORY_THEME` em `guideCategoryTheme.ts` (7 campos obrigatórios)
3. Atribuído `color: 'slate'` à categoria `como-funciona-o-sus`
4. Adicionado teste `'all category colors are unique'` em `guideUtils.test.ts` para prevenção futura

**Regra**: ao adicionar uma nova categoria, verificar se a cor não está em uso por outra categoria. O teste de unicidade de cores detecta a duplicação automaticamente no pre-push.

---

## Testes E2E em `guide-page.spec.ts` com 5 assertivas erradas desde a criação

**Data**: 2026-06-23

**Sintoma**: Os seguintes testes falhavam em runtime mas não haviam sido executados desde a criação do arquivo:

1. `h1.toContainText('Como conseguir pelo SUS')` — o `<h1>` contém `'Você tem direito à'`
2. `getByText('Escolha um tema para começar')` — o texto real é `'Encontre o serviço que você precisa'`
3. `toHaveTitle(/Guia do SUS.*Faladoria/)` — o título real é `'Como conseguir pelo SUS | Faladoria'`
4. `collectionPage.name === 'Guia do SUS'` — o valor real é `'Como conseguir pelo SUS'`
5. `ariaLabel.toContain('Guia do SUS')` — o label real usa `GUIDE_CONTENT.seo.title = 'Como conseguir pelo SUS'`

**Causa raiz**: os testes foram escritos com valores assumidos em vez de valores lidos do código. `GUIDE_CONTENT.hero.headline.base + highlight` gera o texto do `<h1>` — diferente do `seo.title`. O título do documento e os structured data usam `seo.title`, não `hero.headline`.

**Solução**: ler `GUIDE_CONTENT` nos dados reais e corrigir todos os 5 valores. Adicionada constante `const GUIDE_URL = '/como-conseguir-pelo-sus'` para eliminar literais duplicados nos testes.

**Regra**: antes de escrever assertivas de texto em testes E2E, localizar a fonte do dado no código — não assumir que o texto visível é igual ao título SEO ou à constante de rota.

---

## `guide-article-page.spec.ts` CRÍTICO: redirect apontando para CATEGORY_URL em vez de GUIDE_URL

**Data**: 2026-06-23

**Sintoma**: O teste `'should redirect to guide root for unknown article slug'` usava `page.waitForURL(CATEGORY_URL)` e falharia por timeout em execução real.

**Causa raiz**: `GuideArticlePage.tsx` (linha 40-41) redireciona **sempre** para `GUIDE_ROUTES.root` quando o artigo não é encontrado — nunca para a categoria. O teste assumia que o redirect ia para a categoria, mas o código vai para a raiz do Guide.

```tsx
// GuideArticlePage.tsx — comportamento real
if (!article || !category || article.categorySlug !== category.slug) {
  return <Navigate to={GUIDE_ROUTES.root} replace />
}
```

**Solução**: corrigir o teste para `page.waitForURL(GUIDE_URL)` e o `<h1>` esperado para `'Você tem direito à'` (texto da página raiz do Guide). Renomear o teste para `'should redirect to guide root for unknown article slug'`.

---

## `playwright/prefer-web-first-assertions` quebrando assertiva de meta description

**Data**: 2026-06-23

**Sintoma**: `npx eslint --fix` converteu `getAttribute('content')` para `toHaveAttribute('content')`, mas quebrou o código:

```ts
// depois do --fix (quebrado):
const description = page.locator('meta[name="description"]')
await expect(description).toHaveAttribute('content') // sem valor para comparar
expect(description!.length).toBeGreaterThan(10) // description agora é Locator, não string
```

**Causa raiz**: o código original usava `getAttribute` para obter o valor da string e depois verificar seu comprimento. O auto-fix do ESLint substituiu por `toHaveAttribute`, mas não adaptou a lógica que usava o valor retornado.

**Solução**: reescrever a assertiva usando apenas a API web-first do Playwright:

```ts
await expect(page.locator('meta[name="description"]')).toHaveAttribute(
  'content',
  /pré-natal|SUS|gravidez/
)
```

**Regra**: ao aceitar um auto-fix do ESLint que converte `getAttribute` para `toHaveAttribute`, verificar se o código subsequente usava o valor de retorno do `getAttribute`. Se sim, reescrever a assertiva inteira usando `toHaveAttribute` com matcher, em vez de adaptar o código parcialmente.

---

## Teste `renders correctly when detail is omitted` falhando por `<p>` do `GuideArticleFooter`

**Data**: 2026-06-23

**Sintoma**:

```
AssertionError: expected 11 to equal 0
```

O teste verificava `container.querySelectorAll('p').length === 0` após renderizar um `GuideArticleLayout` com apenas um `action-step` sem `detail`.

**Causa raiz**: `GuideArticleLayout` renderiza `GuideArticleFooter` no mesmo tree. O `GuideArticleFooter` contém múltiplos elementos `<p>` (links de rodapé, texto informativo). O count de `<p>` verificava o componente inteiro, não apenas a área do step.

**Solução**: remover a assertiva `querySelectorAll('p').length === 0` — ela não verificava o comportamento pretendido (ausência do bloco de detalhe). Manter apenas a assertiva semântica relevante: verificar que o `<h3>` do action step é renderizado corretamente, o que prova que o componente funciona sem `detail`.

```ts
// assertiva removida (falsa):
expect(container.querySelectorAll('p').length).toBe(0)

// assertiva mantida (real):
expect(
  screen.getByRole('heading', { level: 3, name: 'Vá à UBS' })
).toBeInTheDocument()
```

**Regra**: nunca usar `querySelectorAll` para verificar ausência de um elemento quando o componente renderizado inclui outros componentes que também podem ter esse elemento. Usar seletores mais específicos ou assertivas baseadas em papel (`getByRole`) que refletem o comportamento pretendido.

---

## Imagens com `alt=""` têm role ARIA `"presentation"`, não `"img"`, em testes

**Data**: 2026-06-24

**Sintoma**: `screen.getByRole('img', { hidden: true })` lança `TestingLibraryElementError: Unable to find an accessible element with the role "img"` mesmo quando a imagem está visível no DOM.

**Causa raiz**:

Imagens com `alt=""` recebem role ARIA implícito `"presentation"` (ou `"none"`), não `"img"`. Esse comportamento é especificado pelo WAI-ARIA: `alt` vazio sinaliza que a imagem é decorativa, e o browser a expõe como elemento de apresentação. O `aria-hidden="true"` adicional não é a causa — a causa é o role implícito ser diferente de `"img"`.

**Solução**:

Para imagens decorativas (`alt=""`), usar `container.querySelector('img')` em vez de `getByRole`:

```ts
// NÃO funciona para imagens com alt="":
const img = screen.getByRole('img', { hidden: true }) // TestingLibraryElementError

// CORRETO para imagens decorativas:
const { container } = render(<Component />)
const img = container.querySelector('img')
expect(img).toBeInTheDocument()
expect(img).toHaveAttribute('src', '/expected.webp')
```

**Regra**: `getByRole('img')` consulta elementos expostos com role `img` na árvore de acessibilidade. Imagens decorativas (`alt=""`) são expostas como `presentation`, não como `img` — portanto não são encontradas por `getByRole`. Para esses casos, usar `container.querySelector('img')`.

---

## ffmpeg in-place falha silenciosamente em assets com permissão somente-leitura

**Data**: 2026-06-24

**Sintoma**: Após `ffmpeg -i input.webp [opções] input.webp.tmp && mv input.webp.tmp input.webp`, o arquivo de destino manteve o tamanho original — sem mensagem de erro visível.

**Causa raiz**:

`mv` entre filesystems diferentes (e.g., `/tmp` numa partição separada e `src/assets/` no disco do projeto) não é um simples `rename(2)` — vira copy + unlink. Nesse caso, o shell cria um novo inode no destino; se o diretório de destino tiver restrições ou o arquivo original tiver sido rastreado pelo git com permissões `644` que o processo não consegue substituir atomicamente, o `mv` falha. A falha era silenciosa porque o `&&` foi satisfeito pelo `ffmpeg`, e o código de saída do `mv` não foi verificado.

**Importante**: `mv` e `cp` têm requisitos de permissão distintos: `mv` numa mesma partição precisa de escrita no _diretório_; `cp` sobrescrevendo um arquivo existente precisa de escrita no _arquivo_. Este workaround funciona porque os assets em `src/assets/guide/` têm `644` com o usuário como dono (escrita no arquivo disponível) e o diretório tem `755`.

**Solução**:

Para este projeto, comprimir para um diretório temporário e usar `cp` para sobrescrever o arquivo de destino:

```bash
# Comprimir para diretório temporário:
ffmpeg -i input.webp -c:v libwebp -quality 80 -compression_level 6 /tmp/out.webp

# Sobrescrever o asset — funciona porque o usuário tem escrita no arquivo 644:
cp /tmp/out.webp src/assets/guide/category/input.webp
```

**Nota sobre a escolha de `cp`**: neste fluxo específico, `cp` é mais seguro porque: (1) o arquivo temporário em `/tmp` pode estar numa partição diferente (tornando `mv` uma operação cross-filesystem sujeita a falhas silenciosas); (2) `cp` preserva o inode original, o que evita que ferramentas que rastreiam inodes (como algumas implementações de `inotify`) percam o arquivo. Em outros contextos, `mv` dentro da mesma partição é perfeitamente válido.

---

## `sonarjs/no-duplicate-string` bloqueando commit em arquivo com múltiplos artigos

**Sintoma**: pre-commit falha com `error  Define a constant instead of duplicating this literal 3 times  sonarjs/no-duplicate-string` ao commitar um arquivo de artigos com 3 ou mais artigos que compartilham strings de checklist.

**Causa raiz**: a regra está configurada com `threshold: 3`. Strings comuns entre artigos da mesma categoria — itens de checklist como `'Cartão do SUS'`, `'CPF'`, `'Comprovante de residência'` e títulos de seção como `'Como solicitar'` — repetem-se exatamente 3 vezes (uma por artigo), disparando a regra.

**Solução**: extrair as strings repetidas como constantes no topo do arquivo, seguindo o padrão de `CATEGORY_SLUG` e `DATE_PUBLISHED`. Ver decisão em DECISIONS.md "Constantes compartilhadas para strings repetidas em equipment.ts".

**Prevenção**: ao criar um segundo artigo em qualquer arquivo de categoria, verificar se strings de checklist ou headings se repetem e extraí-las imediatamente — antes do commit.
