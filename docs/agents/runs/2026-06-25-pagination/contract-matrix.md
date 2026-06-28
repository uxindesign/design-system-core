# Matriz de contrato Figma — Pagination

> O contrato vem **antes** do desenho. O Figma Builder não interpreta a spec
> durante a escrita: ele executa esta matriz linha a linha. Cada linha precisa
> derivar de um modelo vivo maduro (Button, Breadcrumb, Tabs, etc.) ou
> ser uma exceção declarada e aprovada. Inspiração aproximada não é contrato.
>
> Valide antes do handoff:
> `npm run agents:validate-matrix -- docs/agents/runs/2026-06-25-pagination/contract-matrix.md --strict-exceptions`
> Regra dura: `unmappedRows=0`. Build bloqueado enquanto houver linha incompleta.

- Componente/padrão: Pagination (componente de navegação de dataset)
- Data: 2026-06-25
- Role atual: DS Architect / contrato para Figma Builder
- Arquivo Figma: DS Core `PRYS2kL7VdC1MtVWfZvuDN`
- Página alvo: `❖ Pagination` (nova — Builder deve criar)
- Component sets alvo: `Pagination` (novo), `Pagination Item` (novo, sub-componente)
- Status: aprovado (amend Prev/Next 2026-06-25); pronto para retrabalho Figma Builder

## Modelos vivos consultados

| Modelo | Node | Uso no contrato |
|---|---|---|
| `Button` | page `66:2`, component set `69:122` | **Prev/Next = instancia Ghost Icon Only**; sizing (sm=32/md=40/lg=48); eixo `State`; focus ring; icon swap. |
| `Breadcrumb` | page `193:2`, root `194:139`, component `2095:16` | Componente de navegação horizontal com `<nav>` landmark; padrão de `aria-current`; item states (link/current); tokens de cor por estado; focus ring nos items. |
| `Tabs` | page `192:2`, root `194:94`, Tab Item set `192:35`, Tab Bar `2095:2` | Componente com sub-componente de item (Tab Item); padrão de eixo `State` com Default/Hover/Active/Disabled; item sizing; padrão de página de documentação no Figma (header, divider, sections). |

## Decisões bloqueantes aplicadas

- Pagination é um **Componente de navegação**, não form control. Não usa `field/*`, `form-field/*` nem ADR-020.
- `Pagination Item` é sub-componente próprio, **não** instância de Button. Tokens Component dedicados (`pagination/item/*`).
- **Prev/Next são instâncias aninhadas de Button** (`Style=Ghost`, `Icon Only=true`). Estados no eixo `State` do Button — **proibidos** booleans `Prev/Next Disabled|Hover|Focused` no root Pagination.
- Prev/Next consomem **`button/*`** em bindings; não `pagination/icon/*`.
- Fundo da página ativa (current): `semantic.brand.background.default` com texto `semantic.content.on-brand` (aprovado pelo owner).
- Sem borda nos items no estado default (fundo transparente, limpo) — aprovado pelo owner.
- Ellipsis é estático (`more-horizontal` Lucide), não interativo.
- Focus Ring usa tokens compartilhados `focus-ring/color/default`, `focus-ring/width` com radius Component `pagination/focus-ring/radius/default`.
- Nenhum slot público na v1.
- Página Figma segue padrão de Button/Tabs: frame raiz único, header → divider → sections.

## Matriz

| part | targetNode | figmaProperty | componentProperty | componentToken | semanticAlias | modelEvidence | validation | exception |
|---|---|---|---|---|---|---|---|---|
| Pagination page | new page `❖ Pagination` | page creation | n/a | n/a | n/a | `Button#66:2`, `Tabs#192:2`, `Breadcrumb#193:2` | page exists with ❖ prefix; single root frame inside | none |
| Pagination set | new component set `Pagination` | variant axes | `Size` (Small, Medium, Large) | n/a | n/a | `Tab Item#192:35` (State axis), `Button#69:122` (Size scale sm/md/lg) | variant axes exist; `Size` order Small, Medium, Large | none |
| Pagination root | all `Pagination` variants | `layoutMode=HORIZONTAL`, `itemSpacing` | n/a | `pagination/gap/default` | `semantic.space.2xs` | `Breadcrumb#2095:16` (horizontal nav layout with gap) | all roots horizontal with gap bindado; no raw spacing | none |
| Prev Button instance | `*/Prev Button` | nested INSTANCE of `Button` | `Show Prev` | `button/*` (via Button bindings) | n/a | `Button ghost icon-only#69:122` | INSTANCE with `Style=Ghost`, `Icon Only=true` locked; `Size` synced per Pagination `Size` variant; default icon Lucide `chevron-left`; no state booleans on Pagination root | none |
| Prev Icon swap | `*/Prev Button` (Button instance) | `mainComponent` on Button `Left Icon` | `Prev Icon` (instance swap forwarded) | `button/icon/size/{sm,md,lg}`, `button/icon/color/*` | `semantic.icon.*` | `Button icon#69:122` | Lucide `chevron-left`; swap referenced; bindings validated on Button component | none |
| Prev disabled (examples) | Pagination sm example, page 1 | instance override `State=Disabled` | n/a | `button/content/color/ghost/disabled` | `semantic.content.disabled` | `Button disabled#69:122` | disabled prev via Button instance override, not Pagination boolean | none |
| Prev states (doc) | `section-estados` nav table | reference Button Ghost Icon Only matrix | n/a | `button/*` | n/a | `Button#69:122` | states table references Button set; no parallel layers on Pagination root | none |
| Page Items container | `*/Page Items` | `layoutMode=HORIZONTAL`, `itemSpacing` | n/a | `pagination/gap/default` | `semantic.space.2xs` | `Breadcrumb#2095:16` (horizontal items with gap), `Tab Bar#2095:2` (horizontal items) | horizontal layout with gap bindado; no raw spacing | none |
| Pagination Item set | new component set `Pagination Item` | variant axes | `Size` (Small, Medium, Large), `State` (Default, Hover, Active, Disabled) | n/a | n/a | `Tab Item#192:35` (sub-componente com State axis), `Breadcrumb Item#193:8` (sub-componente com State axis) | variant axes exist; `Size` order Small→Large; `State` order Default, Hover, Active, Disabled | none |
| Pagination Item root | all `Pagination Item` variants | height, min-width, radius, `layoutMode=HORIZONTAL`, align center, justify center | n/a | `pagination/item/height/{sm,md,lg}`, `pagination/item/min-width/{sm,md,lg}`, `pagination/item/radius/default` | `semantic.size.{lg,xl,2xl}`, `semantic.radius.md` | `Button#69:122` (height sm=32/md=40/lg=48, min-width, radius) | height/min-width/radius bindados; items are centered squares or wider; no raw geometry | none |
| Pagination Item bg default | `Pagination Item` when `State=Default` | fills.color | n/a | `pagination/item/bg/default` | transparent | `Button ghost default` (transparent bg) | transparent fill; no raw color | none |
| Pagination Item bg hover | `Pagination Item` when `State=Hover` | fills.color | n/a | `pagination/item/bg/hover` | `semantic.outline.background.hover` | `Button ghost hover` (subtle bg on hover) | hover bg via Component token; no raw color | none |
| Pagination Item bg active | `Pagination Item` when `State=Active` | fills.color | n/a | `pagination/item/bg/current` | `semantic.brand.background.default` | `Tabs Active#192:27` (visually differentiated current item), owner decision 2026-06-25 | brand fill for current page; no raw color | none |
| Pagination Item bg disabled | `Pagination Item` when `State=Disabled` | fills.color | n/a | `pagination/item/bg/disabled` | transparent | `Button disabled` (no fill change on disabled) | transparent fill like default; distinguished by text color only | none |
| Pagination Item text | `*/Page Number` all variants | characters, fill, typography | `Page Number` (TEXT) | `pagination/item/content/color/{default,hover,current,disabled}`, `pagination/item/font-family/default`, `pagination/item/font-size/{sm,md,lg}`, `pagination/item/font-weight/{default,current}`, `pagination/item/line-height/{sm,md,lg}` | `semantic.content.{default,on-brand,disabled}`, typography body aliases | `Tab Item text` (text per state), `Breadcrumb Item label` (text property referenced) | `characters` references TEXT property; fill varies by state; **binds Component** em `font-family`, `font-size/*`, `line-height/*`, `font-weight/*` nos 15 Page Number; Text Style `body/{sm,md,lg}` ou `body/{sm,md,lg}-bold` no Active | none |
| Pagination Item Focus Ring | `*/Focus Ring` when focused | strokes.color, strokeWeight, radius | n/a | `focus-ring/color/default`, `focus-ring/width`, `pagination/focus-ring/radius/default` | `semantic.focus-ring.*`, `semantic.radius.md` | `Button Focus Ring#229:28`, `Breadcrumb Item focus` (outline on focus-visible) | ring layer present only in focused interaction; color/width/radius bindados; no unbound ring properties | none |
| Ellipsis frame | `*/Page Items/Ellipsis` | height, min-width, `layoutMode=HORIZONTAL`, align center, justify center | n/a | `pagination/item/height/{sm,md,lg}`, `pagination/item/min-width/{sm,md,lg}` | `semantic.size.{lg,xl,2xl}` | `Button icon-only` (sizing), `Tab Item` (item geometry) | height/min-width match Pagination Item; not interactive (no hover/focus/active states) | none |
| Ellipsis icon | `*/Ellipsis/Ellipsis Icon` | width/height, vector strokes | n/a | `pagination/icon/size/{sm,md,lg}`, `pagination/icon/color/default`, `pagination/icon/stroke-width/{sm,md,lg}` | `semantic.icon.*` | `Button icon` (icon sizing/color) | Lucide `more-horizontal`; NOT instance swap (fixed icon); size/color/stroke bindados; no glyph/Icon Placeholder | none |
| Next Button instance | `*/Next Button` | nested INSTANCE of `Button` | `Show Next` | `button/*` (via Button bindings) | n/a | `Button ghost icon-only#69:122` | INSTANCE with `Style=Ghost`, `Icon Only=true` locked; `Size` synced per Pagination `Size` variant; default icon Lucide `chevron-right` | none |
| Next Icon swap | `*/Next Button` (Button instance) | `mainComponent` on Button `Left Icon` | `Next Icon` (instance swap forwarded) | `button/icon/size/{sm,md,lg}`, `button/icon/color/*` | `semantic.icon.*` | `Button icon#69:122` | Lucide `chevron-right`; swap referenced; bindings validated on Button component | none |
| Next disabled (examples) | Pagination lg example, last page | instance override `State=Disabled` | n/a | `button/content/color/ghost/disabled` | `semantic.content.disabled` | `Button disabled#69:122` | disabled next via Button instance override, not Pagination boolean | none |
| Documentation root | new page `❖ Pagination`, root frame | one root, sections, doc text | n/a | doc/page tokens from existing pages | existing doc tokens | `Button#160:62`, `Tabs#194:94`, `Breadcrumb#194:139` | `topLevelCount=1`, loose nodes `0`, docs fixed-height `0`, hardcoded doc paints `0` | none |
| Header | `*/header` | title + description | n/a | n/a | n/a | `Button header#160:63`, `Tabs header#194:95`, `Breadcrumb header#194:140` | title "Pagination"; description with designer-facing summary; Text Style `body/md`; `textAutoResize=HEIGHT`; no draft/agent/status copy | none |
| Divider | `*/divider` | stroke, height=1 | n/a | n/a | n/a | `Button divider#160:66`, `Tabs divider#194:98`, `Breadcrumb divider#194:143` | single pixel divider below header | none |
| Section: States | `*/section-estados` | table with states | n/a | n/a | n/a | `Tabs section-estados#194:47`, `Button#69:122` | two sub-tables: Pagination Item states + Nav controls (Button Ghost Icon Only reference) | none |
| Section: Sizes | `*/section-tamanhos` | sm/md/lg examples | n/a | n/a | n/a | `Button section-tamanhos` (sm/md/lg side by side) | sm/md/lg Pagination instances arranged horizontally; order Small→Large | none |
| Section: Variants | `*/section-variantes` | component set display | n/a | n/a | n/a | `Tabs section-variantes#194:99`, `Breadcrumb section-variantes#194:144` | Pagination set + Pagination Item set shown with variant description text | none |
| Section: Properties | `*/section-propriedades` | properties table | n/a | n/a | n/a | `Tabs section-propriedades#194:74`, `Breadcrumb section-propriedades#194:119` | table: Propriedade, Tipo, Padrão, Descrição; one row per public property | none |
| Pagination description metadata | component set `Pagination` | node `description` metadata + `documentationLinks` | n/a | n/a | n/a | `Button#69:122`, `Breadcrumb#2095:16` component descriptions | description follows `Design System Core - Component tokens` block; `documentationLinks=[https://uxindesign.github.io/design-system-core/docs/pagination.html]` | none |
| Pagination Item description metadata | component set `Pagination Item` | node `description` metadata + `documentationLinks` | n/a | n/a | n/a | `Tab Item#192:35`, `Breadcrumb Item#193:8` component descriptions | description specific to page item sub-component; `documentationLinks` points to `pagination.html` | none |

## Property API esperada

Pagination:

- Variant axis: `Size` (first in panel)
- `Show Prev` -> `Prev Icon` (instance swap forwarded to nested Button)
- `Show Next` -> `Next Icon` (instance swap forwarded to nested Button)

Pagination Item:

- `Page Number` (TEXT)
- Variant axes: `Size`, `State`

Public properties to avoid:

- No TEXT property on Pagination root (page numbers are internal to Pagination Item instances)
- No SLOT property (Page Items container is internal)
- No `State` axis on Pagination root (individual items carry their own states)
- **No** `Prev Disabled`, `Prev Hover`, `Prev Focused`, `Next Disabled`, `Next Hover`, `Next Focused` on Pagination root

## Tokens novos ou a normalizar

- `pagination/gap/default`
- `pagination/item/height/{sm,md,lg}`
- `pagination/item/min-width/{sm,md,lg}`
- `pagination/item/radius/default`
- `pagination/item/bg/{default,hover,current,disabled}`
- `pagination/item/border-width/default` (reserved; currently transparent)
- `pagination/item/content/color/{default,hover,current,disabled}`
- `pagination/item/font-family/default`
- `pagination/item/font-size/{sm,md,lg}`
- `pagination/item/font-weight/{default,current}`
- `pagination/item/line-height/{sm,md,lg}`
- `pagination/icon/size/{sm,md,lg}` — **Ellipsis only**
- `pagination/icon/stroke-width/{sm,md,lg}` — **Ellipsis only**
- `pagination/icon/color/default` — **Ellipsis only**
- `pagination/focus-ring/radius/default`

Prev/Next reuse via nested Button instance (não criar tokens pagination para nav):

- `button/height/{sm,md,lg}`, `button/radius/default`, `button/bg/ghost/*`, `button/icon/*`, `button/focus-ring/*`, `button/content/color/ghost/*`

Shared tokens reutilizados (não criar duplicatas):

- `focus-ring/color/default`
- `focus-ring/width`

## Exceções aprovadas

| ID | Exceção | Motivo |
|---|---|---|
| pagination-property-order-size-first | **Revogada** — root Pagination sem booleans prev/next; `Size` deve ser primeiro no painel com API reduzida | amend 2026-06-25 |

## Validação planejada

- `unmappedRows=0` antes da escrita.
- Builder deve criar página nova e component sets novos (não há nodes pré-existentes).
- Cada script de escrita deve aplicar apenas linhas desta matriz.
- Pós-escrita deve retornar:
  - linhas executadas / não executadas / divergentes;
  - component properties sem referência real: `0`, excluindo eixos variant;
  - fake slots: `0`;
  - Component tokens fora da matriz: `0` ou exceção aprovada;
  - Component tokens sem uso real em variants finais: `0` ou justificativa aprovada;
  - focus counts: focused variants com focus-ring layers presentes, focus ring sem color/width/radius: `0`;
  - Icon Placeholder/glyph: `0`;
  - Lucide icons sem size/color/stroke-width Component token: `0` (ellipsis on `pagination/icon/*`; prev/next validated on Button instance);
  - Prev/Next state booleans on Pagination root: `0`;
  - nested Button instances without `Style=Ghost` + `Icon Only=true`: `0`;
  - hardcoded fills/strokes nos component sets finais: `0`;
  - docs fixed-height: `0`;
  - header description mismatches: `0`;
  - component description mismatches: `0`;
  - documentation link mismatches: `0`;
  - loose nodes: `0`.

## Bloqueado antes de

- qualquer escrita no Figma enquanto `unmappedRows > 0`;
- sync Figma → repo;
- commit/push/publicação.
