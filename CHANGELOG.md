# Changelog

Todas as mudanças notáveis deste design system são registradas aqui.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

Enquanto o sistema não tiver um release oficial 1.0, todas as versões ficam na faixa 0.x. Regras de bump documentadas em `docs/process-versioning.html`.

## [Não publicado]

### Adicionado (tooling)
- **`scripts/lib/figma-node-audit.mjs`** — nova lib de helpers para audits de nodes Figma que têm a propriedade dividida em 4 campos individuais. Inclui `isStrokeWeightBound`, `bindStrokeWeight`, `classifyStrokeWeight` (+ equivalentes pra `cornerRadius`). Fecha **#34**.
- Seção em `CLAUDE.md` ("Figma Plugin API — armadilhas") documentando que `strokeWeight` e `cornerRadius` têm binding só via 4 campos individuais, não via top-level.

### Corrigido (Figma — elevation e focus rings)
Fecha **issue #24.3**. Três drifts entre Figma e o canônico (CSS + `docs/foundations-elevation.html`):

- **Modal** (3 variants: Size=Small/Medium/Large): `effectStyleId` estava em `elevation/3` (shadow-lg, nível 3). Ajustado para `elevation/4` (shadow-xl, nível 4) — bate com `ds-modal { box-shadow: var(--ds-shadow-xl) }` e com a doc "Modais = nível 4".
- **Effect styles `elevation/3` e `elevation/4`**: descrições trocadas. Agora `/3` = "Sidesheets, painéis flutuantes" e `/4` = "Modais, dialogs, overlays" — alinha com a doc.
- **Focus Rings (78 nós)**: 72 em Button + 6 em Toggle com `strokeWeight=2` raw. Bindados em `focus/ring/width` (Figma Variable, alias pra `border/width/2`). API do Figma exigiu binding nos 4 campos individuais `strokeTopWeight/Right/Bottom/Left` — `setBoundVariable('strokeWeight', ...)` falha silenciosamente. Isso revela que **audits anteriores subestimaram cobertura**: checavam só `boundVariables.strokeWeight` (que nunca é usado). Issue #34 aberta pra atualizar `scripts/lib/figma-dtcg.mjs`.
- **Card** (variante Style=Elevated): `effectStyleId` estava em `elevation/2` (shadow-md, nível 2). Ajustado para `elevation/1` (shadow-sm, nível 1) — bate com a doc "Cards, painéis, sticky headers = nível 1". CSS também atualizado: `.ds-card--elevated { box-shadow: var(--ds-shadow-sm) }` (era `shadow-md`).

### Mudança visual
Card `--elevated` fica com sombra **ligeiramente mais sutil** (shadow-md → shadow-sm). Modal fica com sombra **mais pronunciada** (shadow-lg → shadow-xl) — o CSS já usava shadow-xl, o Figma é que estava desalinhado.

### Reversibilidade
- `.figma-revert-24.3.1.{json,mjs}` — Modal (restaura elevation/3 + descrições).
- `.figma-revert-24.3.2.{json,mjs}` — Focus Rings (remove bindings dos 78 nós).
- `.figma-revert-24.3.3.json` — Card elevated (restaura elevation/2).

Todos gitignored.

### Corrigido (tokens — elevation drift)
Fecha **issue #33**. Figma é a fonte canônica de valores de token (ADR-003). Valores divergiam entre Figma Variables e `tokens/foundation/shadows.json`:

- **`shadow.sm`** (`--ds-shadow-sm`): `0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.05)` → `0 2px 4px 0 rgba(0,0,0,0.08), 0 1px 2px 0 rgba(0,0,0,0.04)` — bate com Figma `elevation/1`.
- **`shadow.md`** (`--ds-shadow-md`): `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px 0 rgba(0,0,0,0.06)` → `0 4px 8px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.04)` — bate com Figma `elevation/2`.
- CSS regenerado via `build:tokens` (225 vars, 132 theme vars).

### Backlog / sub-issues
- **#32** — Refactor Card API no Figma: properties `Elevated` (BOOLEAN) e `Interactive` (BOOLEAN) desacopladas de `Style`, com `State` variant quando `Interactive=true`. Breaking change em consumidores Figma.
- **#34** — Atualizar `scripts/lib/figma-dtcg.mjs`: auditar `strokeWeight` via `strokeTopWeight`/etc. em vez de `strokeWeight` top-level. Afeta detecção de cobertura em audits futuros.

## [0.5.17]

### Adicionado
- `semantic.space.gap.2xs` → `{foundation.spacing.0-5}` (2px). Gera `--ds-space-gap-2xs` no CSS. Cobre gaps muito compactos entre elementos (Label Row: label + asterisco required). Issue #24.1.
- Variable correspondente em Figma (`space/gap/2xs` em Semantic collection, alias pra `spacing/0-5` nos modos Light/Dark).

### Corrigido (Figma — form controls bindings)
Fecha **issue #24.1**. Auditoria do Figma encontrou **75 nodes com `itemSpacing` raw** nos componentes Input Text, Select e Textarea. Aplicados 74 bindings (1 descartado — `Frame 1` de preview, fora de componente):

- **63 Label Row @ 2px** → bind pra `semantic.space.gap.2xs` (token novo).
- **5 Error Message @ 4px** (Input Text) → bind pra `semantic.space.gap.xs`.
- **6 Error Message @ 6px** (Textarea + Select) → **padronizado para 4px** + bind pra `semantic.space.gap.xs`. Alinha com o padrão do Input Text (inconsistência histórica — mesma função visual, valores diferentes entre componentes da mesma família).

Audit pós-fix: **0 `itemSpacing` raw** nos 3 componentes. Sync Figma↔JSON: **0 drift** (`VALUE_DRIFT=0, NEW_IN_FIGMA=0, MISSING_IN_FIGMA=0, ALIAS_BROKEN=0`).

### Reversibilidade
- `.figma-revert-24.1.json` (gitignored): dump do estado original de todos os 74 nodes com valores raw antes do fix.
- `.figma-revert-24.1.mjs` (gitignored): script documentando como reverter (desfazer bindings + restaurar valores raw + opcionalmente remover `gap.2xs`).
- Permite rollback completo se necessário.

### Mudança visual
Error Message de Textarea e Select fica **2px mais compacto** (6px → 4px). Alinhamento com Input Text — bug visual histórico corrigido.

## [0.5.16]

### Adicionado
- **ADR-012** — *Tokens de line-height e letter-spacing divergem por design entre Figma e JSON.* Formaliza que esses dois grupos de tokens são representados em unidades incompatíveis (PX no Figma vs ratio/rem/em no JSON) por limitação da Plugin API do Figma e requisito WCAG 1.4.4 do CSS. Os dois lados são canônicos em seus contextos de consumo; **não sincronizam entre si**.
- **Categoria `BY_DESIGN`** no sync Figma → JSON. Listas `FIGMA_ONLY_PATHS` e `JSON_ONLY_PATHS` em `scripts/lib/figma-dtcg.mjs` reconhecem tokens que existem só de um lado por escolha documentada. Ficam em `BY_DESIGN` (informativo) em vez de falso-positivarem como `NEW_IN_FIGMA` ou `MISSING_IN_FIGMA`.

### Corrigido (efeito do ADR-012 no sync)
Antes: sync reportava **23 NEW_IN_FIGMA + 14 MISSING_IN_FIGMA** (37 falsos drifts) em line-height/letter-spacing, mascarando drifts reais.

Depois: **0 NEW_IN_FIGMA + 0 MISSING_IN_FIGMA + 37 BY_DESIGN** (informativo). Dry-run sai com exit 0. Qualquer drift novo em typography (ex: valor real diferente em `semantic.brand.hover`) continua detectado.

### Atualizado
- `docs/process-figma-sync.md`: tabela de categorias passou de 4 pra 6 (inclui `CSS_ONLY` e `BY_DESIGN`, ambas marcadas como "não aplica em `--write`").
- `scripts/sync-tokens-from-figma.mjs`: relatório inclui contagem e seção `BY_DESIGN` com indicação de lado (`figma-only` ou `json-only`).

### Contexto operacional
Issue #23 (origem) fica **fechada** com este PR. Questão de unificação futura via composite typography tokens fica em issue #27 (ADR-013 a abrir quando for priorizada).

## [0.5.15]

### Consolidado
Auditoria do `CLAUDE.md` contra o estado real do repo + Figma + contexto externo (que vivia em workspace Claude Project). Objetivo: tornar o repo fonte única de verdade, sem ambiguidades.

### Corrigido — hierarquia de verdade
Três documentos tinham posições contraditórias sobre "quem é fonte de verdade":
- `system-principles.md` §2 e §7.2 diziam "Git/JSON é fonte de verdade pra tokens" (versão pré-0.5.8)
- `ADR-003` revisada (0.5.8) diz "Figma é autoridade de valor"
- `CLAUDE.md` (desde 0.5.10) já refletia a ADR-003 revisada

Consolidado em **todas as 3 fontes** com a mesma regra:
- **ADRs** = autoridade arquitetural (camadas, naming, regras de referência)
- **Figma Variables** = autoridade de valor (hex, alpha, shade, variante visual)
- **`tokens/**/*.json`** = consolidação canônica em Git (DTCG); **nada roda sem JSON atualizado**
- **CSS gerado** = derivado do JSON
- **Docs** = descritivo, nunca fonte

Regra operacional destacada: **arquitetura > valor**. Figma pode decidir "brand.hover é blue-800 em vez de blue-700". Figma **não pode** criar `semantic.color.primary.foreground` se ADR-011 definiu `brand.content.contrast` — mudança arquitetural exige ADR antes da implementação.

### Adicionado ao CLAUDE.md
- Seção **Hierarquia de verdade** explícita (antes só estava na tabela "Fontes de verdade").
- Seção **Protocolo de trabalho com agente** (5 regras): aprovação estrita por ação, plano antes de agir, validar antes de afirmar, incremental/não-bulk, tom técnico direto.
- Seção **Figma Plugin API — armadilhas operacionais**: `paint.boundVariables.color.id` (não node-level), clear-before-setBoundVariable em `fontSize`, `setBoundVariable` pode empilhar, truncamento ~20KB em dumps, `hiddenFromPublishing` falha pós-create.
- Subseção **Limitações conhecidas do GitHub MCP**: `create_or_update_file` exige SHA fresco; `push_files` grande estoura timeout; MCP não escreve em `.github/workflows/`; `web_fetch` em github.com/raw.githubusercontent.com bloqueado.
- Linha em "Fontes de verdade" pra `docs/process-figma-sync.md`.
- Bump "~462 Variables" → "~489 Variables" (atualiza contagem pós PR #18/0.5.11).

### Corrigido em `system-principles.md`
- §2 reescrita com a nova hierarquia (5 linhas de regras operacionais).
- §6 tabela de ADRs: adicionado **ADR-011** (estava faltando).
- §6 linha de ADR-003: título atualizado pra refletir a revisão (0.5.8).
- §7 princípios: 7 → 6 princípios (consolidado §2 antigo "Git fonte de verdade" + §3 antigo "JSON convergência" em um único princípio #2 coerente com ADR-003 revisada).

### Corrigido em `README.md`
- Badge `0.5.1` → `0.5.15` (defasagem de 14 versões).
- URL CDN de exemplo atualizada.

### Rejeitado (diagnóstico obsoleto ou falso positivo)
Sete pontos do contexto externo foram auditados contra o repo e **não precisam de ação**:
- CLAUDE.md "usa nome Theme" → usa Semantic (obsoleto).
- Brand = "13 vars com 3 modos" → 2 vars, ADR-005 efetivada (obsoleto).
- "Foundation 192, Theme 94" → 231 Foundation, 132×2 Semantic (obsoleto).
- "CLAUDE.md não menciona DTCG/Style Dictionary" → menciona sim (obsoleto).
- "Naming semântico antigo" → ADR-011 aplicada, naming atual (obsoleto).
- Button "60 variantes" → 252 variantes (atualizar `component-inventory.md` se relevante).
- "`background/subtle` no Figma diverge do JSON" → alinhados (0 VALUE_DRIFT no sync atual — divergência foi resolvida no PR #18/0.5.11).
- "Componentes de controle não consomem `--ds-size-control-*`" → falso positivo (consomem via camada component em `component.css`; arquiteturalmente correto pela ADR-001).

### Issues criadas no GitHub (não pertencem a documentação)
- **B1** — Decidir tratamento dos 37 tokens line-height/letter-spacing com sistemas divergentes (PX vs ratio/rem).
- **B3** — Auditoria do Figma: bindings e variantes (quebrar por componente).
- **B5** — AI-readable metadata em tokens (`usage`/`doNot`/`pairedTokens`/`a11y`/`components`).
- **B6** — Adoption metrics e analytics de componentes.
- **B7** — Composite typography tokens + patterns docs.

Itens já listados em `docs/backlog.md` (Storybook, Astro/Zeroheight/Supernova) não duplicados.

## [0.5.14]

### Corrigido
Audit da camada Component (19 docs HTML de componentes + meta-docs) revelou **49 paths token inválidos + 14 CSS vars fantasmas** — todos decorrentes de naming pré-ADR-011 (renames que a camada de dados incorporou mas a doc não). Corrigido em massa:

- **`semantic.color.primary.*` → `semantic.brand.*`** (ADR-011): 15+ ocorrências em avatar, badge, button, checkbox, radio, spinner, tabs, textarea, toggle, etc. Incluindo sub-renames:
  - `.primary.foreground` → `.brand.content.contrast`
  - `.primary.text` → `.brand.content.default`
- **`semantic.text.*` → `semantic.content.*`** (ADR-011): em breadcrumb, button, form-field, input, select, tabs, textarea, token-architecture. Inclui `.text.link.*` → `.content.link.*`.
- **`semantic.state.disabled.foreground` → `semantic.content.disabled`** (ADR-011): button, select.
- **`semantic.feedback.*.foreground|text` → `semantic.feedback.*.content.default`**: alert, textarea, form-field.
- **`semantic.border.hover` → `semantic.border.control.hover`** (ADR-009): select, textarea.
- **`semantic.radius.*` → `foundation.radius.*`** (radius é Foundation, não Semantic): card, checkbox, modal, radio, skeleton, tooltip.
- **`foundation.z-index.*` → `foundation.z.*`**: modal, tooltip.
- **`foundation.motion.duration.*` → `foundation.duration.*`**: spinner.
- **`semantic.background.muted` → `semantic.state.disabled.background`**: skeleton.
- **`--ds-typography-control-font-size-*` → `--ds-control-font-size-*`**: button, input, select, textarea. O Style Dictionary faz strip-layer removendo `typography`; a doc mantinha o nome pre-strip.
- **`--ds-border-hover` → `--ds-border-control-hover`**: select, textarea.

Também em `docs/token-architecture.html`: exemplo de component token atualizado de `--ds-button-bg-brand-default` (inexistente) para `--ds-button-background-toned-default` (real, criado no PR #18).

E em `docs/brand-principles.md`: `foundation.color.brand.primary/secondary/accent` → `foundation.brand.primary/secondary` (`.accent` nunca existiu — só primary e secondary em Foundation; marcado como "não definido" até virar ADR).

**Total: 66 renames em 19 arquivos.** Audit residual: 2 "fantasmas" remanescentes são bad examples didáticos intencionais (`--ds-red-600` em `design-principles.html` dizendo "não use" + `--ds-color-primary` em `token-architecture.html` dizendo "não colapse"). Ficam.

### Observações do audit (não aplicadas nesta PR)

**Semantic: 18 tokens órfãos** (declarados mas nenhum componente consome): 3 border-widths extras, 5 `space-inset-*`, 6 `space-component-*`, 4 `space-section-*`. Decisão pendente (remover / manter / caso a caso).

**Component: 19 tokens órfãos** declarados no JSON mas não consumidos pelo CSS do próprio componente:
- `button` (6): `background/foreground-toned-*` (criados no PR #18, CSS ainda usa semantic direto — refatoração pendente)
- `checkbox` (6): `check-width/height-sm/md/lg` (CSS provavelmente desenha via SVG/stroke, não consome)
- `input`, `select` (3 cada): `padding-y-sm/md/lg` (CSS usa height pra controlar Y, não padding-y)
- `modal` (1): `padding`

### Notas
- Audit confirmou: **11 componentes têm tokens JSON**, **7 não têm e consomem semantic direto** (alert, badge, breadcrumb, card, divider, tabs, tooltip — arquiteturalmente OK pela ADR-001: camada component é opcional).
- **Paridade light/dark: perfeita** (132 = 132, 0 divergência de tipo).
- Próximo passo: decisão sobre os 37 órfãos totais (18 semantic + 19 component) + audit da camada Foundation.

## [0.5.13]

### Corrigido
Audit completo dos 9 arquivos `foundations-*.html` restantes (após PR #19 auto-gerar `theme-colors`). Descobertos 3 arquivos com drift real:

- **`foundations-motion.html`**: `--ds-duration-fast` mostrava `100ms` mas CSS real é `150ms` (divergência em 2 lugares — label demo + tabela). Tabela de easings usava keywords CSS imprecisas (`ease`, `ease-in`, `ease-out`, `ease-in-out`) — o CSS real usa `cubic-bezier(0.4, 0, 0.2, 1)` etc, que **não são equivalentes** às keywords. Corrigido: duration, tabela com valores cubic-bezier reais, labels demo com descrição semântica (`padrão`, `acelerando`, `desacelerando`, `suave`) em vez de keyword enganosa.
- **`foundations-opacity.html`**: `<code>--ds-color-overlay-black-5</code>` era **token fantasma** — o nome CSS correto é `--ds-overlay-black-5` (sem `color-`). Corrigido.
- **`foundations-borders.html`**: duas tabelas de cores de borda (`Border Colors`, `Feedback Border Colors`) estavam com 7 valores desatualizados pós PR #18 **e** duplicavam informação já presente em `foundations-theme-colors.html` (que é auto-gerada). Removidas; substituídas por parágrafo linkando pra Theme Colors. Mantida só a tabela de `Border Widths`, que está correta.

### Confirmado em dia
`foundations-typography.html`, `foundations-spacing.html`, `foundations-radius.html`, `foundations-elevation.html`, `foundations-zindex.html`, `foundations-colors.html` — 0 drift. Os "falsos positivos" do audit automático eram tabelas conceituais (elevation mapeia "nível → combinação de tokens"; zindex mostra "uso por token"; opacity é `<div>` custom não `<table>`) que o parser genérico confundiu com tabelas de valor.

### Notas
- Princípio de não-duplicação aplicado: quando um token semântico tem seu valor canônico em `foundations-theme-colors.html`, outras páginas de foundation **não** repetem — linkam. Evita drift futuro.
- Próximo passo: revisão equivalente nas camadas **Semantic** e **Component** (páginas de docs e Figma).

## [0.5.12]

### Corrigido
- **`docs/foundations-theme-colors.html` agora é auto-gerado** a partir dos JSONs `tokens/semantic/{light,dark}.json` e `tokens/foundation/{colors,brand}.json`. O arquivo era mantido à mão e acumulou drift severo: **37 das 53 linhas (70%)** estavam com valor errado, principalmente porque o PR #18 (0.5.11) mudou valores de semantic mas a doc não acompanhou. Problemas eliminados:
  - 5 tokens **duplicados** (ex: `accent-subtle` aparecia com `purple-100/purple-800` e também com `purple-50/purple-950` — a segunda linha era fantasma).
  - 22 tokens **desatualizados** pós PR #18 (`brand.hover/active`, `feedback.*.hover/active/border`, `background.subtle`, `state.disabled.background`, etc).
  - 10 tokens com **apelidos imprecisos** (doc usava `white` em vez de `neutral-50`, `primary` em vez de `brand-default`, `blue-600` em vez de `brand-primary`).
  - 3 linhas **inventadas** sem correspondência no CSS real.

### Adicionado
- Em `scripts/sync-docs.mjs`: função que lê `tokens/semantic/{light,dark}.json`, resolve aliases recursivamente respeitando a arquitetura (para em `foundation.brand.*` e em outros semantic — bate com o que o Style Dictionary emite no CSS), e gera 12 seções (Background, Surface, Brand Primary, Brand Secondary, Text/Foreground, Border, Feedback Success/Warning/Error/Info, State, Overlay) com **85 tokens**.
- Marcadores `<!-- AUTO-GENERATED:THEME-COLORS:START|END -->` no HTML — só a região entre eles é regenerada; header, nav, sidebar, footer continuam editáveis à mão.
- Audit de tokens faltando: se um token `$type: color` existe em `semantic/light.json` mas não está listado em nenhuma seção, o script avisa no console.

### Notas
- Daqui pra frente, toda mudança de token no JSON regenera a doc automaticamente (via `npm run sync:docs`, já no `build:all`). Drift arquitetural nessa página é estruturalmente impossível.
- **Follow-up**: auditar `foundations-spacing.html`, `foundations-radius.html`, `foundations-typography.html`, `foundations-elevation.html`, `foundations-motion.html`, `foundations-zindex.html`, `foundations-borders.html`, `foundations-opacity.html` pra confirmar se estão em dia ou se têm drift similar. (Opção C do plano — próximo PR.)

## [0.5.11]

### Alterado (Figma — alinhamento arquitetônico + primeiro sync real)

Primeira execução end-to-end do fluxo Figma → JSON. O Figma estava arquiteturalmente defasado em relação ao JSON (que evoluiu ao longo das ADRs 001/005/006/007/011): tinha valores literais onde o JSON tinha aliases de 2–3 níveis. Decisão do time em 21/04/2026: ajustar o Figma pra espelhar a arquitetura do JSON antes de começar a usar o sync bidirecionalmente.

**Ajustes no Figma (~162 operações):**
- **Foundation — criadas 8 variáveis**: `color/disabled/brand-light`, `brand-dark`, `success-light`, `success-dark`, `error-light`, `error-dark` (ADR-007), `spacing/9` (36px), `spacing/11` (44px).
- **Foundation — renomeadas 44 variáveis** de `font/*` → `typography/font/*` pra alinhar com a estrutura do JSON (`foundation.typography.font.*`).
- **Semantic — 31 rebindings**: link/focus/border agora apontam pra `semantic.brand.*` via alias (antes apontavam direto pra foundation); `focus/ring/*`, `size/control/*`, `typography/control/*`, `*.disabled`, `*.contrast-disabled` viraram aliases de foundation (antes eram literais).
- **Component — 28 rebindings**: `button/input/select/textarea` — height, font-size, icon-size, min-target-size viram aliases de `semantic.size.control.*` e `semantic.typography.control.*`.
- **Component — reestruturado padding**: substituído `{comp}/padding/{sm,md,lg}` (unificado) por `{comp}/padding-x/*` + `{comp}/padding-y/*` em 4 componentes (24 criadas, 12 deletadas).
- **Component — 7 criadas**: `button/background/toned/{default,hover,active,disabled}`, `button/foreground/toned/{default,disabled}`, `skeleton/fill`.
- Total Figma: **489 variáveis** (era 462) em 4 collections.

**Sync Figma → JSON aplicado (38 VALUE_DRIFT, categoria A):**
- Decisões visuais mais recentes do Figma sincronizadas para `tokens/semantic/light.json` e `dark.json`. Maior parte são ajustes finos de shade — `brand.hover` blue.700 → blue.800, `feedback.success.border` green.600 → green.500, `background.subtle` neutral.100 → neutral.200, etc. CSS regenerado, docs regeneradas, zero mudanças em Foundation ou Component.

### Adicionado
- Categoria **CSS_ONLY** no `scripts/lib/figma-dtcg.mjs`: tokens com representação CSS-específica (font family stacks, weights numéricos, unidades rem) ficam marcados como informativos e **não são aplicados via `--write`**. Evita regressão onde o Figma trocaria `'Inter', system-ui, -apple-system,...` por `"Inter"` sozinho, weights `400/500/600/700` por `"Regular"/"Medium"/...`, e `0.875rem` por `14`. Cobre ~9 tokens em `foundation.typography.font.family/weight/size`.
- `FOUNDATION_PREFIX_TO_FILE`: mapping atualizado de `font` → `typography.json` para `typography` (Figma agora usa prefixo `typography/font/*`).

### Pendente (relatado mas não aplicado)
- **37 tokens de line-height/letter-spacing** aparecem como NEW_IN_FIGMA (23) ou MISSING_IN_FIGMA (14) porque Figma e JSON usam **sistemas diferentes**: Figma tem valores em PX (`line-height/90`, `line-height/44`, `letter-spacing/-0.5`); JSON tem ratios (`line.height.tight = 1.25`) e unidades rem (`line.height.control.sm = 1rem`). Não é "mais recente" em um lado — são conceitos divergentes. Decisão adiada: será tratada em PR separada com ADR.

### Notas
- Propriedade `hiddenFromPublishing = true` não pôde ser setada via `use_figma` (erro `Node not found` após create) — as 6 novas `color/disabled/*` e 2 novas `spacing/9|11` ficaram visíveis aos pickers. Ajuste manual no Figma depois.

## [0.5.10]

### Adicionado
- `scripts/sync-tokens-from-figma.mjs` + `scripts/lib/figma-dtcg.mjs`: sync Figma → JSON baseado em snapshot gerado via MCP. Desvia da limitação da REST API (exclusiva Enterprise) usando o MCP remoto `use_figma` — agente Claude Code dumpa as ~462 Variables em `.figma-snapshot.json` (gitignored), e o script Node compara com `tokens/**/*.json` em 4 categorias: VALUE_DRIFT (auto-corrigível com `--write`), NEW_IN_FIGMA, MISSING_IN_FIGMA, ALIAS_BROKEN.
- `docs/process-figma-sync.md`: passo-a-passo do fluxo, incluindo troubleshooting e limitações.
- npm scripts: `sync:tokens-from-figma` (dry-run) e `sync:tokens-from-figma:write`.
- `.figma-snapshot.json` e variações no `.gitignore` (snapshot é derivado, não vai pro repo).

### Alterado
- CLAUDE.md: regras de ouro de tokens atualizadas com o fluxo MCP concreto (em vez de "mecanismo em reavaliação"). Ferramentas lista os dois scripts novos.
- `docs/backlog.md`: item "Implementar o sync Figma → JSON" (que tinha 4 opções em aberto) substituído por "Automatizar o sync Figma → JSON em CI" — reconhece que a opção (b) MCP está implementada pro fluxo manual e mantém as outras 3 (plugin custom, Tokens Studio, Enterprise) como caminhos pra automação futura.

### Notas
- Direção canônica da ADR-003 continua: Figma é autoridade, JSON é consolidação derivada. O sync consolida essa direção na prática — mas é manual (exige sessão Claude Code), não roda em GitHub Actions.
- `verify:tokens` não foi alterado nesse PR; continua checando coerência JSON ↔ CSS.

## [0.5.9]

### Revertido
- Revertido o PR #15 (0.6.0, `feat(tokens): sync Figma → JSON via script + workflow + verify refinado`). Motivo: o endpoint `GET /v1/files/:key/variables/local` da Figma REST API requer o scope `file_variables:read`, que **é exclusivo do plano Enterprise**. Nosso plano atual é Pro/Expert — o PAT não consegue emitir esse scope. Script inútil no plano atual.
- Removidos: `scripts/sync-tokens-from-figma.mjs`, `scripts/lib/figma-dtcg.mjs`, `.github/workflows/sync-tokens-from-figma.yml`, e os npm scripts correspondentes.
- `scripts/tokens-verify.mjs` voltou à implementação pré-0.6.0 (sem a classificação NEEDS_SYNC/DRIFT_FROM_SOURCE/VALUE_DRIFT — que dependia do módulo `lib/figma-dtcg.mjs` também revertido).

### Alterado
- CLAUDE.md: ajustado para refletir que o mecanismo de propagação Figma → JSON está em reavaliação. Regra de ouro "não editar `tokens/*.json` à mão" continua valendo.
- `docs/backlog.md`: item "Implementar o sync Figma → JSON" adicionado em alta prioridade, listando as quatro opções em aberto (plugin custom, adaptar pra MCP, Tokens Studio, upgrade Enterprise).

### Mantido
- ADR-003 revisada (Figma como autoridade canônica) continua válida — a decisão conceitual não depende do mecanismo técnico. Só o "como" ficou em aberto.

## [0.5.8]

### Alterado
- ADR-003 reescrita. A versão anterior declarava Git como fonte de verdade para tokens; a revisão reposiciona **Figma Variables como a autoridade canônica** dos valores de token. Git (`tokens/**/*.json`) passa a ser "consolidação derivada em DTCG" em vez de source. Fluxo canônico: Figma → sync manual → JSON → CSS → site. Decisão tomada em 21/04/2026 alinhando a prática à intenção do time (designer decide; dev consolida).
- CLAUDE.md: seção "Como a pipeline funciona" atualizada com o novo fluxo. Regras de ouro adicionadas: não editar `tokens/*.json` à mão, sempre passar pelo Figma. Lista de scripts em "Ferramentas" lista `sync:tokens-from-figma` (a ser implementado no próximo PR).
- Backlog reestruturado: item "Sincronização automatizada Figma ↔ site" substituído por "Reduzir documentação textual do Figma" (decisão concreta do time). Adicionados itens "Futuro do site de documentação" (Astro/Zeroheight/Supernova), "Resolução de conflitos inteligente" e "Sincronização automática de tokens" (evoluções futuras).

## [0.5.7]

### Adicionado
- 6 tokens foundation novos em `tokens/foundation/colors.json`, subcategoria `color.disabled`: `brand-light`, `brand-dark`, `success-light`, `success-dark`, `error-light`, `error-dark`. Valores primitive (hex/rgba) que representam o fill disabled de cada role; viviam antes como literais na camada semantic.

### Corrigido
- `semantic.brand.disabled`, `semantic.feedback.success.disabled`, `semantic.feedback.error.disabled`, `semantic.brand.content.contrast-disabled`, `semantic.feedback.success.content.contrast-disabled`, `semantic.feedback.error.content.contrast-disabled` em `light.json` e `dark.json` — 12 tokens que tinham valores rgba/hex literais agora referenciam tokens foundation (`color.disabled.*` ou `color.overlay.white.80/60` existentes). Viola menos a regra "semantic nunca hardcoded" (ADR-001). Zero mudança visual.
- Item correspondente removido do backlog.

## [0.5.6]

### Alterado
- ADR-007: sincronização Figma completa. Confirmação de que o naming aninhado `brand/toned/{default,hover,active}` já vigora no arquivo Figma (migração feita durante ADR-011). Variáveis `color/primary/toned-*` antigas (flat + `-disabled`/`-disabled-fg`) não existem mais.
- Button variant Toned+Disabled: 6 variantes (3 tamanhos × Icon Only true/false) tinham foreground apontando para `brand/content/contrast-disabled` (errado para contexto toned com fundo neutral) ou para variável órfã. Re-vinculadas para `content/disabled` (neutral-400 opaco), conforme ADR-007. 21 rebindings no total.
- Item correspondente removido do backlog.

### Alterado
- ADR-006 e ADR-007 traduzidos inteiramente para PT-BR. Antes, partes do corpo (Context, Decision, Consequences, Alternatives considered) estavam em inglês enquanto o cabeçalho havia sido traduzido. Agora os 11 ADRs são consistentes em idioma.
- Pequenos ajustes no ADR-006 durante a tradução: tokens `semantic.typography.control.line-height.*` documentados referenciando `{foundation.spacing.4/5/6}` (alinhado ao que o código já faz desde 0.5.3). Tokens de CSS listados em "Consequências" alinhados aos nomes reais emitidos pelo build (`--ds-control-font-size-*`, `--ds-control-line-height-*`).
- Pequenos ajustes no ADR-007 durante a tradução: tokens `semantic.brand.toned.*` documentados no naming consolidado do ADR-011 (antes referenciados como `semantic.color.primary.toned.*`). Foreground toned aponta para `semantic.brand.content.default`.

## [0.5.4]

### Alterado
- ADR-007 marcada como Aceita — Implementada em 0.5.0. Camada de código (foundation overlays, semantic toned, component tokens, CSS do button) já havia sido executada via ADR-011; fechamento formal em 0.5.4.

### Pendente
- Sincronização Figma: renomeação de `color/primary/toned`, `-hover`, `-active` para hierarquia aninhada (`toned/default`, `toned/hover`, `toned/active`), remoção de `toned-disabled` e `toned-disabled-fg`, rebinding do Button Toned disabled para `state/disabled/*`. Será executado como tarefa Figma separada.

## [0.5.3]

### Alterado
- ADR-006 marcada como Aceita — Implementada em 0.5.0. Implementação já havia acontecido via ADR-011; fechamento formal em 0.5.3.
- `semantic.size.control.*` e `semantic.typography.control.line-height.*` em `tokens/semantic/light.json` e `dark.json` passam a referenciar tokens `foundation.spacing.*` em vez de valores absolutos. Integridade da cadeia de tokens preservada (foundation → semantic).

### Adicionado
- `component.input.padding-y.{sm,md,lg}` e `component.select.padding-y.{sm,md,lg}` em `tokens/component/input.json` e `select.json`, referenciando `semantic.space.control.padding-y.*`. Gera `--ds-input-padding-y-*` e `--ds-select-padding-y-*` no CSS gerado.

### Corrigido
- `docs/control-sizing.html` — nomes das CSS vars na tabela agora batem com o que o build realmente emite: `--ds-control-font-size-*` e `--ds-control-line-height-*` (em vez de `--ds-typography-control-*`). O transform `name/strip-layer` remove o segmento `typography` do nome gerado.

## [0.5.2]

### Alterado
- ADR-005 marcada como Aceita — Implementada em 0.5.0. Implementação já havia acontecido via ADR-011; fechamento formal em 0.5.2.

### Corrigido
- `scripts/tokens-verify.mjs`: função `canonicalToCssVar` agora espelha exatamente o transform `name/strip-layer` de `build-tokens.mjs`. Remove os 65 falsos positivos (`foundation.typography.font.*` e `foundation.color.overlay.*`) que mascaravam a saúde real da cadeia Figma → JSON → CSS. `npm run verify:tokens` agora reporta 0 warnings, 0 erros.


Consolidação da documentação como fonte única de verdade. Plano em seis fases executadas na branch `consolidation/docs-ground-truth`.

### Alterado
- `package.json` realinhado para `0.5.1` (estava em `1.5.1` sem publicação no npm, divergindo do que o site exibia).
- `README.md` reescrito curto (39 linhas, era 74), aponta pro site como fonte completa.
- `CLAUDE.md` reescrito enxuto (123 linhas, era 498). Mantém só instruções de agente, acessos MCP, convenções, regras operacionais, checklist. Conteúdo duplicado do site foi removido.
- `tokens/component/README.md` substituído por nota correta (era placeholder mentindo "componentes ainda não foram migrados").
- `docs/foundations.html` ganhou breadcrumb e link pra `token-architecture.html` na intro; grade de cards mantida.
- `.github/workflows/deploy.yml` passa a rodar `npm run build:all` (tokens + docs + api + llms + verify) em cada push pra main.
- `scripts/sync-docs.mjs` ampliado para converter MDs em HTML usando `marked`, injetar badge de versão em `index.html` e gerar `docs/decisions/index.html` + 11 HTMLs de ADR.
- ADRs atualizados para refletir o código real: ADR-004/008/009/010/011 marcados como "Aceita — Implementada em 0.5.0" com referência aos commits. ADR-003 ganhou seção "Verificação automatizada". ADR-005/006/007 ganharam Pré-requisitos/Estimativa/Passos concretos.

### Adicionado
- Tag `v0.5.0-pre-consolidation` marcando o estado antes da consolidação.
- `CHANGELOG.md` na raiz como fonte canônica. `docs/changelog.html` passa a ser gerado a partir deste arquivo.
- `CONTRIBUTING.md` na raiz (setup, fluxo PR, convenções, versionamento).
- `docs/brand-principles.md` com template para preenchimento.
- `docs/backlog.md` listando itens fora deste plano (ADR-005/006/007, Storybook, MCP próprio, publicação npm, etc).
- `docs/process-contributing.md`, `docs/process-versioning.md`, `docs/process-releasing.md` cobrindo fluxos.
- `scripts/tokens-verify.mjs`: verifica coerência JSON ↔ CSS (e JSON ↔ Figma quando FIGMA_PAT definido). Três saídas: terminal, `docs/api/tokens-sync.json`, `docs/tokens-sync.html`.
- `.github/workflows/verify-tokens.yml`: roda verify em PR e push, comenta divergências no PR.
- `scripts/build-api.mjs`: gera `docs/api/components.json`, `tokens.json`, `adrs.json`, `foundations.json`.
- `scripts/build-llms.mjs`: gera `docs/llms.txt` (índice) e `docs/llms-full.txt` (conteúdo consolidado, 133 KB) seguindo llmstxt.org.
- Scripts `verify:tokens`, `build:api`, `build:llms`, `build:all` em `package.json`.
- `scripts/archive/` com `extract-tokens.js` e `add-i18n-shell.mjs` preservados e explicados em README.
- Badge de versão em `index.html` (lida do `package.json` pelo build).
- Links `<link rel="alternate">` em `index.html` apontando pros llms.txt.

### Removido
- `style-dictionary.config.js` (legado CommonJS v4, não usado — script ativo é `build-tokens.mjs`).

## [0.5.0] — 2026-04-15

### Adicionado
- Página Token Architecture — diagrama de 3 camadas, walkthrough de cadeia de alias, convenção de nomenclatura, mapeamento entre formatos.
- Página Changelog.
- Páginas Foundation: Motion (7 tokens), Opacity (7 tokens), Z-index (6 tokens).
- Template expandido de componente com 10 novas seções: quando usar, anatomia, boas práticas (faça/não faça), diretrizes de conteúdo, mapeamento de tokens, interação por teclado, tabela WCAG, propriedades Figma, componentes relacionados.
- Todas as 19 páginas de componentes reescritas com o template expandido (+5.000 linhas).
- Blocos faça/não faça com previews ao vivo em todos os componentes.

### Alterado
- Sidebar atualizada em todas as 34 páginas — links novos para Motion, Opacity, Z-index, Token Architecture, Changelog.
- Overview de Foundations: 3 novos cards (Motion, Opacity, Z-index), agora 10 no total.

### Corrigido
- Implementação de focus ring em `accessibility.html` migrada de `box-shadow` para `outline` + `outline-offset` (ADR-005).
- Seção incorreta de focus ring removida de `elevation.html`.
- Contagem de componentes na home corrigida para 19.

## [0.4.0] — 2026-04-14

### Adicionado
- Arquivos JSON de tokens de componente: `button.json`, `input.json`, `textarea.json`, `select.json`, `checkbox.json`, `radio.json`, `toggle.json`, `badge.json`, `alert.json`, `card.json`, `modal.json` (118 tokens no total).
- Variáveis Figma reconciliadas em 4 coleções (Foundation, Brand, Semantic, Component).
- Script de build Style Dictionary (`build-tokens.mjs`) gerando CSS em `css/tokens/generated/`.
- Componente Form Field (`ds-field`) com label, texto auxiliar, indicador de obrigatório, mensagem de erro, contador de caracteres.

### Alterado
- Arquitetura de tokens formalizada: Foundation → Semantic → Component (ADR-001, ADR-005).
- Regra do sufixo `-default` aplicada: todos os tokens `.default` geram `-default` no CSS.
- Focus ring migrado de `box-shadow` para `outline` + `outline-offset` (ADR-005).
- Subcamada Brand formalizada: 2 tokens (primary, secondary), sem estados, trocável por tema.

## [0.3.0] — 2026-03

### Adicionado
- 18 componentes implementados em CSS: Button, Input, Textarea, Select, Checkbox, Radio, Toggle, Badge, Alert, Card, Modal, Tooltip, Tabs, Breadcrumb, Avatar, Divider, Spinner, Skeleton.
- Site de documentação com previews ao vivo, blocos de código, seletor de tema, toggle de modo escuro.
- Páginas Foundation: Colors, Theme Colors, Typography, Spacing, Radius, Elevation, Borders.
- Guias: Theming, Accessibility.
- Três temas: Default (Blue/Purple), Ocean (Cyan/Indigo), Forest (Emerald/Amber).
- Modo light/dark com remapeamento de tokens semânticos.

## [0.2.0] — 2026-02

### Adicionado
- 94 tokens semânticos (camada Theme) com valores Light/Dark.
- Variáveis Figma: 3 coleções (Foundation, Brand, Theme) com suporte a modos.
- 24 text styles: display, heading, body, label, caption, overline, code (Inter + DM Mono).

## [0.1.0] — 2026-01

### Adicionado
- Tokens foundation: 10 paletas de cores (escala 50–950), spacing (20 steps), radius (8 tokens), shadows, opacity, motion, stroke, z-index.
- CSS custom properties (`--ds-*`) para todos os tokens foundation.
- Reset base com carregamento de Inter + DM Mono.
- Estrutura do repositório: `css/`, `docs/`, `js/`.

[Não publicado]: https://github.com/uxindesign/design-system-core/compare/v0.5.0-pre-consolidation...HEAD
[0.5.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.5.0
[0.4.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.4.0
[0.3.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.3.0
[0.2.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.2.0
[0.1.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.1.0
