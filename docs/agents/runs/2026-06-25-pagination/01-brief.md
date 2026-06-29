- Status: Approved (amend Prev/Next 2026-06-25)
- Role: DS Architect
- Run: docs/agents/runs/2026-06-25-pagination
- Data: 2026-06-25

# Brief proposto — Pagination

- Nome: Pagination
- Classe: Componente de navegação de dataset
- Resolucao de Dropdown: n/a (nao e um Dropdown)
- Problema: Permitir que usuarios naveguem entre paginas de um dataset ou conteudo dividido, com controles acessiveis, semantica clara e feedback visual da posicao atual. Hoje o DS Core nao oferece nenhum componente para esse padrao, obrigando consumidores a implementar paginacao ad hoc.
- Usar quando:
  - Listas ou tabelas com mais de 25 itens (threshold padrao Carbon/Ant Design)
  - Resultados de busca paginados
  - Feeds com carregamento discreto (pagina a pagina, nao scroll infinito)
  - Qualquer dataset onde o usuario precisa navegar entre subconjuntos
- Nao usar quando:
  - Navegacao entre secoes de conteudo — usar Tabs
  - Hierarquia de localizacao — usar Breadcrumb
  - Scroll infinito / carregamento continuo — nao e paginacao discreta
  - Navegacao entre passos de um fluxo (wizard/stepper) — padrao diferente
  - Dataset com menos de 25 itens — nao compensa paginacao
- Diferencas para componentes proximos:
  - **Breadcrumb**: hierarquia de localizacao (onde estou no site); Pagination navega entre paginas de dados
  - **Tabs**: troca de contexto/secao; Pagination troca de subconjunto dentro do mesmo contexto
  - **Menu**: acoes/links em superficie popup; Pagination e controle inline de navegacao
  - **Button group**: primitivos visuais sem semantica de navegacao paginada
- Acessibilidade/semantica:
  - Root: `<nav aria-label="Pagination">` (landmark de navegacao)
  - Lista: `<ul>` + `<li>` para estrutura de itens
  - Pagina atual: `aria-current="page"` no item ativo
  - Cada item: `aria-label="Page N"` ou `aria-label="Pagina N"` para contexto
  - Prev/Next desabilitados nos limites: `aria-disabled="true"`
  - Prev/Next: `aria-label="Previous page"` / `aria-label="Next page"` (nao depender so do icone)
  - Teclado: Tab para focar, Enter/Space para ativar
  - Contraste: 4.5:1 para texto, 3:1 para bordas/elementos UI (WCAG 2.2 AA)
  - Focus ring visivel em todos os itens interativos
- Composicao DS:
  - **Prev/Next:** instancia aninhada de **Button** (`Style=Ghost`, `Icon Only=true`). Estados (hover, focus, disabled) vivem no Button — **sem** booleans `Prev/Next Disabled|Hover|Focused` no root Pagination. Icones default Lucide `chevron-left` / `chevron-right` via instance swap do Button.
  - **Pagination Item:** sub-componente proprio com tokens `pagination/item/*` — **nao** instancia de Button (estado `Active/current` e exclusivo de paginacao).
  - **Ellipsis:** frame fixo com icone `more-horizontal`; nao interativo na v1.
  - **Select** (opcional, para page size): composicao externa na v1.
  - **Focus Ring:** page items usam `focus-ring/*` + `pagination/focus-ring/radius/default`; prev/next herdam `button/focus-ring/*` via instancia Button.
- Variants/states candidatos:
  - Pagination root: apenas `Size` (`Small`, `Medium`, `Large`) — mesma escala do Button (32/40/48).
  - Pagination Item: `Size × State` (`Default`, `Hover`, `Active`, `Disabled`, `Focused`).
  - Prev/Next: estados via eixo `State` da instancia Button aninhada (nao no root).
  - Items visiveis: numeros de pagina + ellipsis para ranges grandes (ex: 1 ... 4 5 6 ... 20).
- Slots:
  - Prev Button (instancia Button Ghost Icon Only, chevron-left)
  - Page Item (Pagination Item, numero, repete N vezes)
  - Ellipsis (more-horizontal, nao interativo na v1)
  - Next Button (instancia Button Ghost Icon Only, chevron-right)
  - [Futuro/opcional] Info Text ("Mostrando 1-10 de 100") — composicao externa na v1
  - [Futuro/opcional] Page Size Selector (Select) — composicao externa na v1
- Tokens:
  - Camada Component: `pagination/*` aliasando Semantic
  - `pagination/gap/default` — espaco entre items
  - `pagination/item/height/{sm,md,lg}` — altura de cada page item
  - `pagination/item/min-width/{sm,md,lg}` — largura minima de cada page item
  - `pagination/item/radius/default` — border-radius do item
  - `pagination/item/bg/{default,hover,active,current,disabled}` — fundo por estado
  - `pagination/item/border-color/{default,hover,active,current}` — borda por estado
  - `pagination/item/border-width/default` — espessura da borda
  - `pagination/item/content/color/{default,hover,active,current,disabled}` — cor do texto/icone por estado
  - `pagination/item/font-family/default`, `pagination/item/font-size/{sm,md,lg}`, `pagination/item/font-weight/{default,current}`, `pagination/item/line-height/{sm,md,lg}` — tipografia
  - `pagination/icon/size/{sm,md,lg}`, `pagination/icon/stroke-width/{sm,md,lg}`, `pagination/icon/color/default` — **apenas Ellipsis** (nao prev/next)
  - `pagination/focus-ring/radius/default` — radius do focus ring (Pagination Item)
  - Prev/next consomem **`button/*`** (ghost, icon-only, focus-ring) — nao `pagination/icon/*`
  - Focus ring compartilhado: `focus-ring/color/default`, `focus-ring/width`
- Docs Figma:
  - Pagina nova `❖ Pagination` no arquivo DS Core (`PRYS2kL7VdC1MtVWfZvuDN`)
  - Frame raiz unico, secoes: header, divider, anatomy, variants/sizes, states, tokens table, examples
  - Seguir padrao de Input Text / Select / Menu para estrutura da pagina
- Impacto repo:
  - `css/components/pagination.css` (novo) — prev/next reutilizam classes `ds-button ds-button--ghost ds-button--icon-only`
  - `docs/pagination.html` (novo)
  - `tokens/component/pagination.json` (novo) — sem tokens `pagination/icon/*` para prev/next; ellipsis pode manter subset
  - `tokens/registry.json` (update — novas entradas)
  - `components.manifest.json` (update)
  - `docs/api/components.json` (update)
  - `docs/component-inventory.md` (update — mover de pendente para implementado)
  - `CHANGELOG.md` (update — entrada em [Nao publicado])
  - `scripts/sync-docs.mjs` (update — remover de lista hardcoded de pendentes)
- Fora de escopo:
  - Page size selector embutido (composicao externa com Select, nao parte do componente Pagination na v1)
  - Info text embutido ("Mostrando X-Y de Z") — composicao externa na v1
  - Variantes compact/mini/simple — evolucao futura
  - Ellipsis interativo (dropdown com paginas intermediarias) — evolucao futura
  - Quick jumper (input para ir direto a pagina) — evolucao futura
  - Logica de paginacao (calculo de paginas, callbacks) — responsabilidade do consumidor
  - Integracao com Table (componente Table ainda nao existe)
- Bloqueado antes de:
  - Retrabalho Figma (handoff explicito ao Figma Builder)
  - Sync de tokens / CSS / docs (requer Figma aprovado na auditoria)
  - Commit / PR / release (requer repo validado)
- Aprovacao:
  - 2026-06-25: brief + spec inicial (fundo brand current, sem borda, prev/next icon-only)
  - 2026-06-25: amend Prev/Next = instancia Button Ghost Icon Only (opcao A)

## Benchmark

### Fontes consultadas

1. **WAI-ARIA / a11y best practices** — `<nav>` landmark, `aria-current="page"`, `aria-label` descritivo por item, `aria-disabled` nos limites, lista `<ul>/<li>` para estrutura
2. **Ant Design** — sizes (small/medium/large), `simple` mode (prev/current/next), `showSizeChanger` (Select embutido), `showQuickJumper`, `showTotal`, `hideOnSinglePage`, `responsive`, `disabled`
3. **Carbon Design System (IBM)** — barra com items-per-page (Select), page selector (Select), prev/next; sizes sm/md/lg; paginacao desenhada para datasets grandes; texto "1-10 of 100 items"
4. **shadcn/ui** — primitivos compostos: Pagination (nav), PaginationContent (ul), PaginationItem (li), PaginationLink (a, com `isActive`), PaginationPrevious, PaginationNext, PaginationEllipsis; abordagem headless/composavel

### O que copiar

- Semantica ARIA universalmente consistente (`nav` + `ul/li` + `aria-current` + `aria-label`)
- Escala de 3 sizes alinhada com Button (sm/md/lg)
- Ellipsis estatico para colapsar ranges grandes
- Prev/Next como icone-only com label acessivel
- Pagina atual visualmente diferenciada (fundo, peso, cor)

### O que nao copiar

- `showSizeChanger` / `showTotal` / `showQuickJumper` como props internas do componente (Ant/Carbon) — no DS Core, isso e composicao externa
- Mode `simple` / `compact` / `mini` na v1 — evolucao incremental
- Logica de calculo de paginas embutida no componente visual

### Riscos

- Prev/Next acoplados ao Button Ghost Icon Only: mudancas nesse padrao propagam para Pagination (consistencia intencional). Mitigar no Figma com `Style=Ghost` e `Icon Only=true` fixos na instancia.
- Pagination Item permanece desacoplado do Button — estado `Active/current` nao existe no Button.
- Ellipsis interativo (dropdown) adiciona complexidade de overlay; manter estatico na v1.
