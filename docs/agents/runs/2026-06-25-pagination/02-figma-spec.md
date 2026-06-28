- Status: Approved (amend Prev/Next 2026-06-25)
- Role: DS Architect
- Run: docs/agents/runs/2026-06-25-pagination
- Data: 2026-06-25

# Spec Figma proposta — Pagination

- Componente/padrao: Pagination (componente de navegacao de dataset)
- Pagina Figma: `❖ Pagination` (nova, arquivo DS Core `PRYS2kL7VdC1MtVWfZvuDN`)
- Referencias DS Core consultadas: Button `69:122` (**modelo direto para Prev/Next** — Ghost Icon Only), Pagination Item (sub-componente), Breadcrumb, Tabs — padrao de pagina
- Referencias externas consultadas: Ant Design Pagination, Carbon Design System Pagination, shadcn/ui Pagination, WAI-ARIA a11y patterns

## Anatomia

- Root: `Pagination` — component set com eixo `Size` apenas (sem `State` no root)
  - Estrutura horizontal: Nav container
- Subcamadas:
  - `Prev Button` — **instancia aninhada de Button** (`Style=Ghost`, `Icon Only=true`, icone default `chevron-left`)
  - `Page Items` — container horizontal com N filhos:
    - `Pagination Item` — sub-componente (component set separado) com eixos `Size`, `State`
    - `Ellipsis` — frame com icone Lucide `more-horizontal`, nao interativo
  - `Next Button` — **instancia aninhada de Button** (`Style=Ghost`, `Icon Only=true`, icone default `chevron-right`)
- Nested instances:
  - `Button` (Ghost Icon Only) para Prev/Next — **nao** frames manuais com booleans de estado
  - `Pagination Item` (sub-componente proprio, nao instancia de Button)
  - Icones Lucide no ellipsis: `more-horizontal`
- Slots:
  - Nenhum slot publico na v1 (Page Items sao internos, nao configuravel pelo designer como slot aberto)

### Sub-componente: Pagination Item

- Component set separado: `Pagination Item`
- Eixos: `Size` (Small, Medium, Large), `State` (Default, Hover, Active, Disabled)
- `Active` = pagina atual (visualmente diferenciado: fundo preenchido, peso bold)
- Contém: texto do numero da pagina
- Tokens proprios: `pagination/item/*`

## Auto-layout

- Root (`Pagination`):
  - direction: horizontal
  - gap: `pagination/gap/default`
  - align: center
  - padding: 0 (sem padding externo; spacing e responsabilidade do contexto)
- Prev/Next (`Prev Button` / `Next Button`):
  - nested instance de Button — sizing, radius, ghost bg, icon e focus ring **via contrato Button** (`button/*`)
  - por variant `Pagination Size={sm|md|lg}`: instancia Button com `Size` correspondente
  - **proibido:** layers paralelos `Focus Ring`, `Hover Overlay`, `Icon Disabled` controlados por boolean no root
- Page Items container:
  - direction: horizontal
  - gap: `pagination/gap/default`
  - align: center
- Pagination Item (sub-componente):
  - direction: horizontal
  - align: center, justify: center
  - height: `pagination/item/height/{sm,md,lg}`
  - min-width: `pagination/item/min-width/{sm,md,lg}`
  - padding horizontal: calculado para garantir area clicavel minima
  - radius: `pagination/item/radius/default`
- Ellipsis frame:
  - direction: horizontal
  - align: center, justify: center
  - height: `pagination/item/height/{sm,md,lg}`
  - min-width: `pagination/item/min-width/{sm,md,lg}`
  - nao interativo (sem hover/focus states)
- Secoes/containers: root > [prev] [page-items] [next]
- Regras de resize: root hug contents; items fixed height, hug width
- `clipsContent`: false em todos os frames (focus ring precisa extravazar)

## Properties

- Variants:
  - `Size`: Small, Medium, Large (ordem menor→maior)
- Text properties:
  - Nenhuma TEXT property publica no component set principal Pagination (numeros de pagina sao internos ao sub-componente)
  - `Pagination Item`: `Page Number` (TEXT) — texto do numero
- Boolean properties:
  - `Show Prev` — visibilidade do Prev Button (default: true)
  - `Show Next` — visibilidade do Next Button (default: true)
- Instance swaps (mapeados na instancia Button aninhada):
  - `Prev Icon` → icon swap da instancia Button prev (default: Lucide `chevron-left` via `Left Icon` do Button)
  - `Next Icon` → icon swap da instancia Button next (default: Lucide `chevron-right` via `Left Icon` do Button)
- **Proibidos no root Pagination:**
  - `Prev Disabled`, `Prev Hover`, `Prev Focused`
  - `Next Disabled`, `Next Hover`, `Next Focused`
- Slot properties: nenhum na v1
- Ordem no painel:
  1. Size
  2. Show Prev -> Prev Icon
  3. Show Next -> Next Icon

> Disabled/hover/focus de prev/next sao **overrides de instancia** nos exemplos documentais (ex.: exemplo sm pagina 1 com prev `State=Disabled`), nao properties publicas do Pagination.

## States

### Pagination Item states (sub-componente)

- Default: fundo transparente, texto `content/default`, borda nenhuma ou sutil
- Hover: fundo `pagination/item/bg/hover`, texto `pagination/item/content/color/hover`
- Active (pagina atual): fundo `pagination/item/bg/current`, texto `pagination/item/content/color/current`, font-weight bold
- Disabled: fundo transparente, texto `pagination/item/content/color/disabled`, cursor not-allowed, `aria-disabled="true"`
- Focused: focus ring visivel (`focus-ring/color/default`, `focus-ring/width`), radius `pagination/focus-ring/radius/default`

### Prev/Next — via Button Ghost Icon Only (instancia aninhada)

Estados vivem no eixo `State` do Button (`Default`, `Hover`, `Pressed`, `Focused`, `Disabled`). Bindings em **`button/*`**, nao `pagination/icon/*`.

| Estado | Onde vive | Visual / tokens |
|---|---|---|
| Default | Button `State=Default` | Ghost transparente; icone `button/icon/color/default` |
| Hover | Button `State=Hover` | `button/bg/ghost/hover`; icone hover |
| Disabled | Button `State=Disabled` | `button/content/color/ghost/disabled`; sem interacao |
| Focused | Button `State=Focused` | Focus Ring `button/focus-ring/*` + `focus-ring/color/default`, `focus-ring/width` |
| Pressed | Button `State=Pressed` | opcional na v1; sem distincao visual obrigatoria no Pagination |

### Pagination root

- Open/Closed: n/a
- Error/Invalid: n/a

## Tokens/bindings

- Foundation: nenhum token Foundation novo; aliases resolvem para Foundation existente via Semantic
- Semantic (aliases dos Component tokens):
  - `semantic.surface.raised` ou `semantic.outline.background.hover` → fundo hover
  - `semantic.brand.background.default` → fundo da pagina ativa (current)
  - `semantic.content.default` → texto default
  - `semantic.content.on-brand` → texto da pagina ativa (sobre fundo brand)
  - `semantic.content.disabled` → texto disabled
  - `semantic.icon.color.default` → icone default
  - `semantic.icon.color.disabled` → icone disabled
  - `semantic.radius.md` → radius do item
  - `semantic.size.{lg,xl,2xl}` → alturas sm/md/lg
  - `semantic.space.2xs` → gap entre items
  - `semantic.icon.size.*` → tamanho do icone
  - `semantic.icon.stroke-width.*` → stroke-width do icone
  - `focus-ring/color/default`, `focus-ring/width` → focus ring compartilhado
- Component (tokens novos — collection `Component`, grupo `pagination`):
  - `pagination/gap/default` → `semantic.space.2xs`
  - `pagination/item/height/sm` → `semantic.size.lg` (32px)
  - `pagination/item/height/md` → `semantic.size.xl` (40px)
  - `pagination/item/height/lg` → `semantic.size.2xl` (48px)
  - `pagination/item/min-width/sm` → `semantic.size.lg` (32px)
  - `pagination/item/min-width/md` → `semantic.size.xl` (40px)
  - `pagination/item/min-width/lg` → `semantic.size.2xl` (48px)
  - `pagination/item/radius/default` → `semantic.radius.md`
  - `pagination/item/bg/default` → transparente
  - `pagination/item/bg/hover` → `semantic.outline.background.hover`
  - `pagination/item/bg/current` → `semantic.brand.background.default`
  - `pagination/item/bg/disabled` → transparente
  - `pagination/item/border-color/default` → transparente ou nenhum
  - `pagination/item/border-width/default` → `semantic.border.width.default`
  - `pagination/item/content/color/default` → `semantic.content.default`
  - `pagination/item/content/color/hover` → `semantic.content.default`
  - `pagination/item/content/color/current` → `semantic.content.on-brand`
  - `pagination/item/content/color/disabled` → `semantic.content.disabled`
  - `pagination/item/font-family/default` → typography body aliases
  - `pagination/item/font-size/sm` → typography body/sm font-size
  - `pagination/item/font-size/md` → typography body/md font-size
  - `pagination/item/font-size/lg` → typography body/lg font-size
  - `pagination/item/font-weight/default` → typography body font-weight (regular)
  - `pagination/item/font-weight/current` → typography body font-weight (bold)
  - `pagination/item/line-height/sm` → typography body/sm line-height
  - `pagination/item/line-height/md` → typography body/md line-height
  - `pagination/item/line-height/lg` → typography body/lg line-height
  - `pagination/icon/size/{sm,md,lg}` → `semantic.icon.size.{xs,sm,md}` (**Ellipsis apenas**)
  - `pagination/icon/stroke-width/{sm,md,lg}` → `semantic.icon.stroke-width.regular.{sm,md,lg}` (**Ellipsis apenas**)
  - `pagination/icon/color/default` → `semantic.icon.color.default` (**Ellipsis apenas**)
  - `pagination/focus-ring/radius/default` → `semantic.radius.md`
- Prev/Next: bindings via instancia Button — consumir **`button/*`** (height, radius, ghost bg, icon, focus-ring). Nao criar `pagination/icon/*` para nav controls.
- Variables novas: `pagination/*` listados acima (~28 variables pagination + reutilizacao `button/*` via instancia)
- Effect styles: nenhum (Pagination nao tem shadow/elevation)
- Text styles:
  - Default/Hover/Focused/Disabled: `body/sm`, `body/md`, `body/lg`
  - Active: `body/sm-bold`, `body/md-bold`, `body/lg-bold` (mesma escala body, peso bold via Text Style + bind `pagination/item/font-weight/current`)

## Exemplos no canvas

- Exemplo 1: Pagination default, md, 10 paginas, pagina 5 ativa, ellipsis antes e depois (1 ... 4 5 6 ... 10)
- Exemplo 2: Pagination sm, 3 paginas, pagina 1 ativa (override prev `State=Disabled` na instancia Button)
- Exemplo 3: Pagination lg, 20 paginas, ultima pagina ativa (override next `State=Disabled` na instancia Button)
- Matriz de variants: grid Size (sm/md/lg, vertical) × cenarios (inicio/meio/fim, horizontal)

## Documentacao visual

- Secoes (seguindo padrao Input Text / Select / Menu):
  1. Header (titulo "Pagination", description com resumo do componente)
  2. Divider
  3. Section: Anatomy — exploded view com labels dos sublayers
  4. Section: Sizes — sm/md/lg lado a lado
  5. Section: States — duas sub-tabelas: (a) Pagination Item; (b) Nav controls — matriz referenciada do Button Ghost Icon Only
  6. Section: Tokens — tabela visual de tokens Component com alias Semantic
  7. Section: Examples — cenarios de uso (inicio, meio, fim, poucos itens, muitos itens)
- Tabelas:
  - Tokens table: part | token | semantic alias | valor resolvido
  - States table: state | visual | token de fundo | token de texto
- Notas para designers:
  - Usar composicao externa com Select para "items per page" e com texto para "Mostrando X-Y de Z"
  - Nao usar Pagination para navegar entre secoes (usar Tabs)
  - Ellipsis nao e interativo na v1
  - Prev disabled na primeira pagina, Next disabled na ultima — via override `State=Disabled` na instancia Button nos exemplos
  - Nao alterar `Style` da instancia Button prev/next; manter Ghost + Icon Only
- Diferencas para componentes proximos:
  - Breadcrumb: hierarquia de localizacao
  - Tabs: troca de secao
  - Button: Prev/Next **sao** instancias Button Ghost Icon Only; Pagination Item tem tokens proprios (estado Active/current)

## Validacao planejada

- Estrutura:
  - `topLevelCount=1` (um frame raiz por pagina)
  - `looseNodes=0` (nenhum no solto no canvas)
  - Sub-componente `Pagination Item` dentro da pagina, nao solto
- Bindings:
  - Todos os fills, strokes, radii, padding, gap, font-*, height, min-width bindados em Component tokens
  - Component tokens aliasam Semantic (nunca Foundation direto)
  - Nenhum valor cru (hex, px) em component sets finais
  - Focus ring: `focus-ring/color/default` + `focus-ring/width` nos items focados
- Slots: nenhum slot publico; verificar que nao ha property SLOT unreferenced
- Textos:
  - `Pagination Item`: `Page Number` TEXT property referenciada por `componentPropertyReferences.characters`
  - Text Styles: body/{sm,md,lg} nos estados não-Active; body/{sm,md,lg}-bold no Active (100% coverage)
  - Header description: `textAutoResize=HEIGHT`, Text Style `body/md`
- Instancias:
  - Prev/Next: instancia Button (`Style=Ghost`, `Icon Only=true`); validar bindings no componente Button, nao duplicar no Pagination root
  - Ellipsis: Lucide `more-horizontal` (nao glyph/Icon Placeholder); size/color/stroke em `pagination/icon/*`
- Screenshot: comparar contra modelo de paginas equivalentes (Button, Breadcrumb, Tabs)
- Validadores repo:
  - `npm run verify:figma-structure` — apos regenerar snapshot
  - `npm run audit:component-tokens` — tokens sem uso = 0
  - `npm run agents:validate-page-parity` — se page-parity.json for gerado
  - Component set metadata: `description` com bloco `Design System Core - Component tokens` + `documentationLinks=[https://uxindesign.github.io/design-system-core/docs/pagination.html]`

## Decisoes aprovadas pelo owner (2026-06-25)

1. **Fundo da pagina ativa (current):** `semantic.brand.background.default` com texto `semantic.content.on-brand` — APROVADO
2. **Borda nos items:** sem borda no default (fundo transparente, limpo) — APROVADO
3. **Prev/Next:** icon-only com `aria-label` descritivo — APROVADO
4. **Quantidade de page items visiveis:** padrao de 7 items visiveis no Figma (1 ... 4 5 6 ... 10); logica real e do consumidor — mantido como recomendacao
5. **Prev/Next = instancia Button Ghost Icon Only (opcao A):** estados no Button, sem booleans no root — APROVADO 2026-06-25

## Bloqueado antes de

- Figma write: handoff explicito ao Figma Builder (brief + spec aprovados)
- Repo sync: Figma aprovado (auditoria + visual OK)
- Commit/push: repo validado + autorizacao explicita
