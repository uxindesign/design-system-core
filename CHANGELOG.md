# Changelog

Todas as mudanças notáveis deste design system são registradas aqui.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

Enquanto o sistema não tiver um release oficial 1.0, todas as versões ficam na faixa 0.x. Regras de bump documentadas em `docs/process-versioning.html`.

## [Não publicado]

### Text Styles Figma — padrão único de tipografia (2026-04-25, sequência)

Eu havia introduzido inconsistência: aplicado variables Semantic individualmente nos 477 textos sem inspecionar Text Styles existentes. Resultado: 3 padrões coexistindo (textos com Text Style, textos com variables individuais, Text Styles sem variables bindadas). O usuário sinalizou; corrigido aqui.

**Estado anterior** (da etapa anterior do dia):
- 28 Text Styles existiam, 109 textos os usavam, 477 com variables individuais.
- Text Styles tinham vários Foundation leaks internos (display/*, heading/xl, body/sm, label/md, code/*, etc.) e 4 control/* sem bindings.

**Mudanças:**

Figma — Text Styles refatorados:
- `body/sm` fontSize: Foundation→Semantic (typography/body/font-size/sm)
- `label/md` fontSize: Foundation→Semantic
- `code/md` fontSize+fontFamily: Foundation→Semantic
- `code/sm` fontFamily: Foundation→Semantic (criado `typography/body/font-family/mono`)
- `heading/xs` lineHeight: Foundation→Semantic body/line-height/lg
- 4 control/* Text Styles (label-sm/lg, body-sm/md): bindings completos adicionados (fontFamily, fontStyle, fontSize, lineHeight, letterSpacing — todos a Semantic).
- Text Styles `display/*` e `heading/xl` continuam com Foundation leak (não usados em components production, só showcase pages — fora do escopo desta etapa).

Figma — Text Styles aplicados nos 465 textos sem:
- Mapeamento por (fontSize, fontWeight): label/md, body/sm, caption/sm, body/md, label/xs, body/lg.
- Variable bindings individuais limpas após aplicar Text Style (fontSize/fontFamily/fontStyle/lineHeight/letterSpacing setBoundVariable null) — assim Text Style passa a ser autoritário.

**Estado final** (verificado via audit Plugin API):
- 574/574 (100%) textos de component com Text Style aplicado.
- 0 Foundation leaks via Text Styles.
- 0 textos com variables individuais.
- Padrão único: Variables → Text Styles → Component texts.

### Alinhamento Figma ↔ JSON ↔ CSS — fonte única de verdade (2026-04-25)

Reorganização estrutural pesada. Figma era a fonte mas JSON/CSS divergia em 3 dimensões: estrutura de naming (compound vs hierárquico), valores de typography (escala desalinhada), e Foundation leaks em consumidor. Esta entrada reverte essa dívida 1:1 com Figma.

**Princípio arquitetural reforçado** (CLAUDE.md atualizado):
- Figma é fonte única de verdade — vars, valores, hierarquia, bindings.
- Propagação: Figma → JSON → CSS → consumer, unidirecional.
- Componente NUNCA consome Foundation direto. Sempre Semantic.
- Texto de componente Figma NUNCA tem prop visual sem binding.

**Figma (write — 1.200+ mutations):**
- Adicionado `typography/body/font-size/2xs` (11px), reorganizada escala body para sm=14, xs=12, 2xs=11. Pareou line-heights: `body/line-height/2xs=16`, `lg=28` (novos), `xs=18`, `sm=20` (remap).
- 753 bindings de componentes rebindados pra preservar valores visuais originais durante o remap (consumers que precisavam de 11/12/14/16/18/etc. agora apontam pra Semantic correto).
- 133 multi-style runs em textos consolidados em single run via `setRangeFontSize` + `setBoundVariable`. **Zero Foundation leaks em componente.**
- 613 bindings adicionados em props que estavam hardcoded: `fontFamily`, `letterSpacing`, `fontStyle`, `fontSize`, `lineHeight` em todos os textos de componente.
- 27 frame `itemSpacing`/`padding` bindados (Radio/Toggle Content + outros).
- 4 arrows criados nas variants de Tooltip (Position=top/bottom/left/right) — antes não existiam.

**JSON (sync-from-Figma):**
- `tokens/foundation/typography.json`: adicionados `line.height.{16,18,20,22,24,26,28,34,40,44,50,60,70,80,90}` em rem (1:1 com Figma). Ratios legacy mantidas pra `css/base/`.
- `tokens/foundation/radius.json`: `9999` → `999` (espelha Figma).
- `tokens/semantic/{light,dark}.json`:
  - Body font-size: `2xs=11, xs=12, sm=14` (descriptions corrigidas, alias rem-based).
  - Body line-height: 8 entradas com aliases pra `foundation.typography.line.height.{16,18,20,24,28,28,34,40}`.
  - **Naming compound `bg-*` → hierárquico `background.*`** em primary, toned, outline, ghost, feedback.{success,info,warning,error}. Espelha Figma.
  - Removido `feedback.X.background.background` (não existia em Figma; substituído por `subtle` no consumer).
  - Adicionado `semantic.shadow.{card,modal}` aliasando `foundation.shadow.{sm,xl}`.
  - `radius.full` aliasa `foundation.radius.999`.

**CSS (regenerado + atualizado consumer):**
- `css/tokens/generated/*.css` regenerado.
- 425 refs `--ds-*-bg-*` → `--ds-*-background-*` em `css/components/`, `docs/**/*.html`, `scripts/`.
- 147 refs `--ds-feedback-*-background-background` (do compound `bg-background`) → `--ds-feedback-*-background-subtle`.
- Card `--elevated` agora usa `var(--ds-shadow-card)` (Semantic) em vez de Foundation direto.
- Modal: removido `border-top` no footer e `border-bottom` no header (Figma não tem).

**Verify:** 0 erros de coerência, 0 Foundation leaks em components/, 119 warnings (118 base/ leak debt pré-existente + 1 registry TODOs migração).

### Pós-merge — fixes do site de docs (2026-04-25)

Trabalho de cleanup pós-migração 2-layer aplicado direto na branch antes do merge:

**Causas raiz consertadas:**
- `css/tokens/index.css` importava `generated/component.css` (deletado em 0.7.0). Browser falha silenciosa em `@import` quebrado podia comprometer carga de imports subsequentes.
- Aliases `body.font-size.{xs,sm}` e `control.font-size.{sm,md}` apontavam para Foundation **um step menor** que a description prometia (xs→11px em vez de 12px, sm→12px em vez de 14px). Causou todas as labels e body text dos componentes saírem menores que o intencionado em light + dark.
- `border-default-default` (sufixo duplicado) gerado por bug em script de rename — corrigido em 4 tokens feedback border.

**Visual / componente:**
- Card `--elevated` agora aplica `box-shadow: var(--ds-shadow-sm)` direto (antes dependia de utility class `.ds-elevation-1` não aplicada nos exemplos)
- Modal close usava `.ds-btn--ghost.--icon-only` com `&times;` em 4 lugares — substituído pela classe `.ds-modal__close` (definida no CSS) com ícone `material-symbols`

**Conteúdo de docs:**
- 47 HTMLs (excluindo `changelog`, `decisions/`, `llms-full`): refs antigos removidos. Patterns: `--ds-brand-*` → `--ds-primary-*` / `--ds-toned-*`, `--ds-content-link-*` → `--ds-link-content-*`, `--ds-feedback-*-{background,subtle,default,...}` → `*-bg-{background,subtle,default,...}`, `--ds-state-*` → `--ds-overlay-*` / `--ds-focus-ring-color` / `--ds-background-disabled`, `--ds-spacing-0-5` → `--ds-spacing-2`, `--ds-neutral-50` → `--ds-color-neutral-50`
- DTCG paths em tabelas atualizadas: `foundation.{spacing,radius,typography.font.size}.{t-shirt}` → `{numérico}` (ex: `foundation.radius.sm` → `foundation.radius.4`)
- `token-architecture.html` reescrita: 3 camadas → 2 camadas, cadeia de alias COMPONENT→SEMANTIC→BRAND→FOUNDATION → SEMANTIC→FOUNDATION, removida seção "Brand Sublayer" (foundation.brand não existe)
- `theming.html` simplificada: removidas Default/Ocean/Forest (Ocean e Forest nunca tiveram CSS implementado), virou paleta única + dark mode + guia de tema customizado
- `foundations-spacing.html`: tabelas Inset/Gap/Component (eliminadas) → escala única `space.{2xs..2xl}` + `space.section.*`. Spacing scale sem `spacing-0`/`spacing-0-5`
- `foundations-radius.html`: tabela com Foundation (numérico) + Semantic (t-shirt como aliases). Removido `radius-none`
- `foundations-borders.html`: removido `--ds-border-width-0` da scale visual
- `foundations-opacity.html`: removido `--ds-opacity-0` da scale visual
- `card.html`: "Comparacao" → "Comparação"

**Geradores:**
- `scripts/sync-docs.mjs`: `THEME_COLOR_SECTIONS` reescrito com paths atuais (primary, toned, outline, ghost, link, feedback compound). Inline CSS dos ADRs renderizados também atualizado
- `scripts/tokens-verify.mjs`: regex `FOUNDATION_LEAK_RE` atualizada para naming numérico (radius-N, spacing-N, font-size-N) — antes pegava t-shirt que agora é Semantic. Inline CSS da `tokens-sync.html` atualizado
- `scripts/build-api.mjs`: removida leitura de `tokens/component/`, `COMPONENTS` array sem campo `token`
- `scripts/build-llms.mjs`: nota sobre 2-layer

**UI da homepage e topbar:**
- Theme switcher (Default/Ocean/Forest) **removido** de 35 HTMLs — Ocean e Forest nunca foram implementados em CSS, opções eram cosméticas
- Seção "Theming" da homepage removida (redundante; theming.html cobre)
- Badge `v0.5.17` → `v0.7.0` com tokens corretos (`--ds-toned-*` e `--ds-spacing-{4,8}` em vez dos deletados `--ds-brand-subtle`, `--ds-spacing-{1,2}`)

**Registry/CSS leak:**
- `tokens/registry.json`: removidas 288 entries `layer="component"` (stale) + 85 entries com paths Foundation/Semantic eliminados (foundation.brand.*, foundation.opacity.0, foundation.radius.0, foundation.spacing.0)
- 23 leaks reais detectados em `css/components/*.css` pela regex atualizada (radius-{4,8,12,16,9999} consumidos direto) → trocados por Semantic (radius-{sm,md,lg,xl,full})

**Resultado verify:tokens (CI sem snapshot):** 0 erros, 118 warnings (117 base/ leak debt + 1 registry TODOs migração).

### Migração para 2-layer + Foundation numeric naming (2026-04-24)

**Mudança arquitetural grande.** Elimina camada Component e renomeia Foundation para naming numérico direto.

**Figma (fonte de verdade):**
- Collection `Component` (61 tokens) **deletada** — era dead code (zero nodes bindados, só aliases sem consumer)
- Foundation renomeado pra numérico direto (40 vars):
  - `radius/{xs,sm,md,lg,xl,2xl,full}` → `radius/{2,4,8,12,16,24,9999}`
  - `typography/font/size/{xs..9xl}` → `typography/font/size/{11,12,14,16,18,20,24,28,32,40,48,56,64,72}`
  - `spacing/{0-5,1,1-5,2,...,24}` → `spacing/{2,4,6,8,...,96}` (valor direto no nome)
- 10 órfãos deletados: `spacing/0`, `radius/none`, `border/width/0`, `opacity/0`, `typography/font/line-height/{tight,snug,normal,relaxed}` (% values off-grid), `typography/font/size/2xs` (duplicata xs=11)
- Criado `typography/font/size/14` (fixa 3 text styles com binding quebrado pré-existente a ID `10:11` deletado)
- Semantic — nova escala única `space/{2xs..2xl}` (7 tokens) dissolvendo `space.inset/gap/component` (18 tokens deletados, 2.960 bindings rebindadas)
- Semantic — novos size tokens (`size.avatar.*`, `size.modal.*`, `size.spinner.*`, `size.skeleton.*`, `size.textarea.*`, `size.toggle.*`) absorvem o que era Component
- `semantic.radius.component` deletado (alias 1:1 pra md, redundante). `radius/full` mantém naming "full" em Semantic, aponta pra `foundation.radius.9999`
- `border/subtle` Light recalibrado: era idêntico a `border/default` (neutral/300) → agora `neutral/200` (escala coerente subtle < default < strong)
- Fonts `typography/font/family/{mono,display}` mantidas como reserva (hoje `mono`="DM Mono", `display`="Inter" = slot para futura heading font)
- Foundation escopos: `scopes: []` em todos os 221 tokens (esconde dos pickers internos)
- **Pendente manual**: `hiddenFromPublishing: true` em todos Foundation via UI do Figma (API do plugin quebrada via MCP)

**Repo (derivado):**
- `tokens/component/*` — pasta deletada (11 arquivos removidos)
- `tokens/foundation/*.json` — reescrito com naming numérico
- `tokens/semantic/{light,dark}.json` — space consolidado, novos size/*, border.subtle recalibrado light, radius.component removido
- `css/components/*.css` — 143 refs atualizadas pra consumir novos tokens Semantic; vector internals (`radio-dot`, `toggle-thumb`, `spinner-stroke`, `checkbox-check`) viraram literais px porque são pintura interna de vetor, não token
- `css/base/*.css` — 43 refs atualizadas pro novo naming numérico Foundation
- `build-tokens.mjs` — remove build target `component.css` (collection não existe)
- CSS gerado sem `component.css` (só `foundation.css` + `theme-{light,dark}.css` + `index.css`)

**Contagem:**
- Foundation: 229 → **221 tokens** (9 deletados, 1 criado = -8 net)
- Semantic: 158 → **165 tokens** (+7 net: novo space +7, novos size +18, eliminados space antigos -18)
- Component: 61 → **0** (collection deletada)
- **Total tokens: 448 → 386 (-62, -14%)**
- CSS vars geradas: 566 (foundation 236 + theme-light 165 + theme-dark 165)

**Build + verify:**
- `build:tokens` passa sem reference errors
- `JSON integrity`: OK. `JSON ↔ CSS`: OK
- Broken refs Figma em componentes produção: **0** (Button/Input/Modal/Avatar/etc)
- Broken refs em páginas de documentação: 3.851 (dívida pré-existente acumulada de PRs anteriores; cleanup em PR separado)
- Button Style=Success legacy — 168 refs a library externa deprecated (fora do escopo; decisão pendente)
- `verify:tokens`: 6 falsos-positivos "CSS leak" de `var(--ds-radius-md)` — script ainda assume 3-layer; `semantic.radius.md` É o consumer-final no 2-layer (não é leak). Script precisa update.

**Bump**: 0.6.0 → **0.7.0** (breaking grande — Component deletada + Foundation renamed; consumers precisam atualizar)

### Simplificação estrutural Semantic (ADR-014 revisão 2026-04-23)

Revisão da ADR-014: estrutura action de 5 níveis (`action.{role}.{style}.{prop}.{state}`) foi substituída por **categorias peers no root Semantic** com regra de naming alinhada ao padrão Nathan Curtis (Category · Concept · Property · Variant · State) + PDF enviado pelo usuário.

**Novo rational**:
- `primary`, `toned`, `outline`, `ghost`, `link` são peers no root Semantic (sem prefix `action.`)
- Estrutura: `{categoria}/{prop-state}` — hierarquia pasta no Figma + compound hífen no último nível
- `bg` (abreviado) em prop-modifier; `background` reservado pra categoria root
- `default` explícito (`bg-default`, `content-default`)
- **Roles `secondary` e `danger` eliminados**: Button danger → `feedback.error.*` direto; Button secondary → `outline` ou `ghost`
- **Categoria `state.*` eliminada**: hover→overlay.subtle, pressed→overlay.default, focus→focus.ring.color, disabled-background→background.disabled
- `content.link.*` movido pra categoria peer `link.*`
- `feedback.{role}.{state}` → `feedback.{role}.bg-{state}` (compound consistente)
- `border.control.{state}` → `border.control-{state}` (compound)

**Execução**:
- Figma: 26 vars novas criadas (primary/toned/outline/ghost/link/bg-disabled), 66 feedback vars renomeadas compound, 3 border.control renomeadas, 60 tokens obsoletos deletados (54 action + 4 state + 2 content.link). Total rebinds: 455 em componentes + 2.785 cleanup de bindings órfãos pré-existentes.
- JSONs: `tokens/semantic/{light,dark}.json` reescritos com script node — seções `action.*`, `state.*`, `content.link` removidas; `primary`, `toned`, `outline`, `ghost`, `link`, `background.disabled` adicionadas; `feedback` compound; `border.control` compound.
- CSS 18 componentes: 111 substituições (`--ds-action-primary-default-background-default` → `--ds-primary-bg-default`, etc.).
- ADR-014: seção histórica da versão antiga preservada; seção nova documenta a estrutura peer.

**Resultado**:
- Tokens CSS 25-60% mais curtos (`--ds-primary-bg-default` = 22 chars vs 50 chars antes).
- Semantic action: 66 → 25 tokens (-62%).
- Build e refs todas OK.
- Remanescente: 245 broken bindings pré-existentes em `fontSize` (ID órfão 10:11, débito histórico não introduzido por esta refatoração).

**Bump**: 0.6.0 → **0.7.0** (breaking — nomes action.* renomeados pra primary/toned/outline/ghost/link; roles secondary/danger eliminados).

### Política de scopes em Figma Variables (consolidação 2026-04-23)

Formaliza a política de scopes nas 3 collections:

- **Foundation (229 vars)**: `scopes: []` (neutro) + `hiddenFromPublishing: true`. Foundation é matéria-prima consumida por Semantic via alias — nunca deve ser bindada direto em canvas. Esconder do picker é a enforcement mecânica da regra ADR-013 "Foundation nunca em consumidor final". Setar scopes específicos em Foundation mandaria o sinal oposto ("use aqui").
- **Semantic (162 vars)**: scopes específicos por contexto — `FRAME_FILL`+`SHAPE_FILL` pra bg, `TEXT_FILL` pra content em link/primary/toned/outline/ghost, `SHAPE_FILL`+`TEXT_FILL` pra `content/*` raiz (cobre ícones), `STROKE_COLOR` pra border/*, `STROKE_FLOAT` pra border.width.* e focus.ring.width/offset, `GAP` pra space.*, `CORNER_RADIUS` pra radius.*, `WIDTH_HEIGHT` pra size.*, `FONT_SIZE`/`LINE_HEIGHT`/`FONT_FAMILY`/`FONT_STYLE`/`LETTER_SPACING` pra typography.*, `OPACITY` pra opacity.*.
- **Component (61 vars)**: scopes específicos por contexto (dimensional — `WIDTH_HEIGHT` pra sizes, `FONT_SIZE` pra font-sizes, etc.).

Motivação: consistência com CLAUDE.md ("Nunca usar ALL_SCOPES") + ADR-013 (Foundation nunca em consumidor final). Policy aplicada em todas as 452 vars das 3 collections.

**Aberto** (flag pra decisão futura): `*/content-*` em categorias de ação (primary/toned/outline/ghost/link) hoje só tem `TEXT_FILL`. Se designer bindar fill de ícone dentro de button primary, o token não aparece no picker (ícone é SHAPE_FILL). Solução: adicionar `SHAPE_FILL` a esses 10 tokens. Parkado — refinamento opcional.

### Refatoração ground-up (ADR-014) — action×style×prop×state + eliminação de brand/accent + themes

Restruturação da camada Semantic pra resolver o bloat crônico acumulado nas Fases 2-8 do ADR-013. **Breaking change grande** — CSS de todos componentes reescrito.

**Figma (fonte de verdade)**:
- Collection `Brand` (2 vars × 3 modes Default/Ocean/Forest) → **deletada**
- `foundation.color.brand.{50..950}` criada como paleta única (Default = Blue atual)
- Semantic: `brand.*` (11) + `accent.*` (6) **removidos**; 66 vars `action.{primary,secondary,danger}.{default,toned,outline,ghost}.{background,content,border}.{default,hover,active,disabled}` + 5 vars `radius.{sm,md,lg,xl,full}` criadas
- 353 bindings em nodes de 51 componentes reapontados de `semantic.brand/accent.*` pra `semantic.action.primary.*`
- 5 consumer vars (`content.link.{default,hover}`, `border.focus`, `border.brand`, `state.focus`) reapontados pra `foundation.color.brand.*` direto
- Component collection: 185 → **61 vars** (-124, -67%). Mantidos apenas dimensões específicas (modal.max-width, button/input/select.height, toggle/checkbox/radio/avatar sizes, skeleton, spinner, select.arrow). Wrappers 1:1 eliminados.

**JSON**: `brand.json` deletado, `color.brand.*` em `colors.json`, Semantic reescritos, 7 JSONs de componente sem tokens próprios deletados (`alert, badge, breadcrumb, card, divider, tabs, tooltip` consomem Semantic direto), 11 restantes reescritos enxutos.

**CSS**: 18 `css/components/*.css` reescritos pra `--ds-action-*`. `theme-ocean.css` e `theme-forest.css` deletados. Imports do `index.css` atualizado.

**ADR-014** criada. ADR-013 continua válida (regra foundation→semantic→component→CSS).

**Verificação**: `npm run build:tokens` sem erros. Zero Foundation bindings em componentes Figma. Zero refs obsoletos em CSS.

**Bump**: 0.5.x → **0.6.0** (breaking).

### Corrigido (Fase 8 — limpeza de tokens component redundantes)

Reflexão crítica após Fase 5: o agente automatizou demais e criou 151 tokens component novos, dos quais 105 eram aliases 1:1 pra Semantic/Foundation sem variação entre componentes (30% de bloat). Essa limpeza corrige.

**Princípio refinado** em ADR-013 (nova seção "Quando criar um Component token"):
- Component token existe **apenas** quando há valor único pro componente, variação por size/state, OU decisão de identidade que diverge do padrão semantic
- NÃO criar Component token quando é alias 1:1 sem variação — CSS consome Semantic direto (Semantic > Foundation na cadeia, sem leak)

**Execução**:

Fase 8.2 — 5 Semantic novos criados pra cobrir categorias faltantes:
- `semantic.motion.duration.{fast,normal,slow}` → aliases pra `foundation.duration.*`
- `semantic.motion.ease.default` → alias pra `foundation.ease.default`
- `semantic.opacity.disabled` → alias pra `foundation.opacity.50` (também criado no Figma com scope `OPACITY`)

Motion vive **JSON-only by design** (Figma Variables não suporta animações). `scripts/lib/figma-dtcg.mjs` estendido: `semantic.motion.*` agora é `BY_DESIGN` no verify.

Fase 8.3+8.4 — Removidos 96 tokens component redundantes do JSON + 146 substituições CSS. Exemplos:
- `component.X.transition-duration` (11 componentes, todos `{foundation.duration.fast}`) → removido; CSS usa `var(--ds-motion-duration-fast)` direto
- `component.X.transition-timing` (11) → `var(--ds-motion-ease-default)`
- `component.X.border-width` (11) → `var(--ds-border-width-default)` (semantic existente)
- `component.X.font-family` (em 17 comps) → `var(--ds-body-font-family-sans)`
- `component.X.opacity-disabled` (4) → `var(--ds-opacity-disabled)`
- label/helper/description typography tokens (~30) → consomem `body.*` direto

9 tokens candidatos **mantidos como wrappers** porque remover causaria Foundation leak (ex: `alert.focus-border-radius` aliasando `{foundation.radius.sm}` — não existe semantic equivalente).

Fase 8.5 — Removidos 70 variables correspondentes do Figma Component collection (192 vars hoje, era 262).

**Estado final**:
- JSON tokens: 825 → **739** (-86: -96 removidos + 10 novos semantic/motion/opacity)
- Figma Component: 262 → **185 vars** (-77)
- Registry: 672 → **671 entries** (net -1; várias removidas, poucas adicionadas)
- `verify:tokens`: **0 erros**, 119 warnings (117 base/ leak — débito separado; 2 registry migration)

### Adicionado (Fase 7 — enforcement em CI)

`scripts/tokens-verify.mjs` ganha 2 checks novos que rodam em CI:

1. **CSS foundation leak** — scan em `css/components/*.css` (error) e `css/base/*.css` (warning, débito transitório). Regex detecta uso direto de: `--ds-spacing-*`, `--ds-radius-{xs,sm,md,lg,xl,2xl,full,none}`, `--ds-border-width-[0-9]`, `--ds-font-{family,weight,size}-*`, `--ds-line-height-*`, `--ds-letter-spacing-*`, `--ds-shadow-*`, `--ds-duration-*`, `--ds-ease-*`, `--ds-opacity-[0-9]`, `--ds-z-[0-9]`, `--ds-color-*`.
2. **Registry completude** — valida que todo token em `tokens/**/*.json` tem entry em `tokens/registry.json` com campos obrigatórios. Durante migração emite warning (672 TODOs esperados). Vira error quando atingir 80% de completude.

**State pós-Fase 7**: verify:tokens passa com **0 erros, 118 warnings** (117 foundation leaks em base/ — débito pra próximo PR; 1 registry mass-TODO).

### Concluído (Fase 5 — CSS + JSONs component + Figma component vars)

Fase 5 do plano ADR-013 completa: os 19 CSS de componente não consomem mais **nenhum** token Foundation direto. Todos os consumos são via Semantic ou Component layer.

- **CSS**: 17 `css/components/*.css` reescritos (divider piloto já feito). Grep `var(--ds-(spacing-|radius-(sm|md|lg|xl|2xl|full|xs|none)|border-width-[0-9]|font-*|line-height-|letter-spacing-|shadow-|duration-|ease-|opacity-[0-9]|z-[0-9]|color-)` → **0 matches**.
- **JSON**: 6 novos (alert, badge, breadcrumb, card, tabs, tooltip) + 11 expandidos. Registry cresce de 521 → 672.
- **Figma**: 125 vars novas na collection Component (137 → 262), aliasando Foundation/Semantic. 26 tokens (transitions, shadows, z-index) ficam só em JSON — Figma Variables não representa essas categorias.
- **ADR-012 estendido**: `JSON_ONLY_COMPONENT_ALIAS_TARGETS` em `figma-dtcg.mjs` classifica esses 26 como `BY_DESIGN` em vez de drift.
- **Verify pós-Fase 5**: 0 erros, 0 warnings. CSS_ONLY=9, BY_DESIGN=79 (informativos).

### Concluído (Fases 2 e 3 — rebind + conversão de raw values)

**Fase 2**: Todos os 3.479 bindings Foundation nos 51 componentes Figma rebindados pra Semantic. Divididos em 4 passes:
- Pass 1 — Icons (30 componentes, 60 rebinds — border/width/1 + font-family/weight/letter-spacing)
- Pass 2a — Global typography em todos componentes (2.759 rebinds — font-family, font-weight, letter-spacing, border-width)
- Pass 2b — font-size/line-height em não-controles → body.* (268 rebinds)
- Pass 2c — font-size/line-height em controles → control.*/body.* contextual (210 rebinds)
- Pass 3 — cleanup com IDs corrigidos (2.073 rebinds complementares)
- Text styles — 28 text styles locais rebindados pra Semantic (98 rebinds). Isso destravou os nodes filhos que herdavam Foundation via style.

Post-audit: **0 Foundation bindings remanescentes em qualquer componente Figma**. Regra ADR-013 cumprida no lado do Figma.

**Fase 3**: Das 60 variáveis raw na collection Component Figma, **50 convertidas em aliases** (Foundation.* ou Semantic.*). Exemplos:
- `avatar/size/sm` (32) → `{foundation.spacing.8}`
- `checkbox/border-radius` (4) → `{foundation.radius.sm}`
- `modal/border-radius` (16) → `{foundation.radius.xl}`
- `checkbox/min-target-size` (44) → `{semantic.size.control.min-target}` — reaproveita alias semântico existente
- `radio/font-size`, `toggle/font-size`, etc. (14) → `{foundation.typography.font.size.sm}`

**10 vars permanecem raw** como exceção explícita (ADR-013 permite quando não há equivalente Foundation): `modal/max-width/{sm,md,lg}` (400/520/640), `textarea/min-height/{sm,lg}` (68/112), `skeleton/rect-height` (120), `spinner/stroke-width/{sm,lg}` (1.5/3), `toggle/thumb-size/lg` (18), `checkbox/check-width/md` (5). Todos valores sem ponto correspondente na escala Foundation.

Pós-sync: `verify:tokens` — **0 errors, 0 warnings**. Figma ↔ JSON ↔ CSS totalmente sincronizados.

### Adicionado (Fase 1 — expansão Semantic typography)

20 variáveis novas em `semantic.typography.body.*` no Figma e JSON, todas aliasando Foundation. Preparação pra Fase 2 (rebind dos 3.479 bindings Foundation em componentes Figma).

- `semantic.typography.body.font-family.sans` → `{foundation.typography.font.family.sans}`
- `semantic.typography.body.font-weight.{regular, medium, semibold, bold}` → foundation.weight.*
- `semantic.typography.body.letter-spacing.{normal, tight}` → foundation.letter.spacing.*
- `semantic.typography.body.font-size.{xs, sm, md, lg, xl, 2xl, 3xl}` → foundation.size.*
- `semantic.typography.body.line-height.{xs, sm, md, xl, 2xl, 3xl}` → foundation ratios (ADR-012: Figma usa PX, JSON usa ratio unitless)

CSS gerado: `--ds-body-font-family-sans`, `--ds-body-font-weight-*`, `--ds-body-letter-spacing-*`, `--ds-body-font-size-*`, `--ds-body-line-height-*`. Namespace `body` pareia com `control` (ADR-006) evitando colisão com Foundation (`--ds-font-family-sans` etc.).

### Corrigido

- `scripts/lib/figma-dtcg.mjs` — `compareStates` estendido com `isDivergentAliasByDesign`: tokens Semantic/Component com aliases divergentes por design (Figma `font.line-height.*` px vs JSON `line.height.*` ratio) agora são `BY_DESIGN`, não `VALUE_DRIFT`. Extensão documentada em ADR-012.

### Adicionado (arquitetura — ADR-013 e Token Registry)

Codificada a regra de camadas de consumo de tokens: **Foundation nunca aparece em consumidor final**. CSS de componente, bindings Figma e exemplos em docs só podem consumir Semantic ou Component. A regra sempre existiu implicitamente, mas agora está documentada formalmente e vai ganhar enforcement em CI nas próximas iterações.

- `docs/decisions/ADR-013-camadas-de-consumo-de-tokens.md` — ADR novo. Cadeia permitida, exceções (`semantic.control.*` via componente apenas; componente→foundation quando não há abstração semântica), enforcement planejado em 3 checks, ligação com Token Registry.
- `CLAUDE.md` — seção "Camadas de consumo de tokens (ADR-013)" adicionada à "Hierarquia de verdade".

Token Registry como artefato vivo (inicial, skeleton):

- `tokens/registry.json` — catálogo com 501 entries (Foundation 231, Semantic 133, Component 137). Campos por entry: `layer`, `type`, `references` (alias, se houver), `sentido`, `escopo`, `contexto`, `usos` (calculado), `decisao`. Inicializado com `TODO` nos campos obrigatórios — preenchimento incremental em PRs subsequentes.
- `docs/token-registry.md` — vitrine gerada automaticamente do `registry.json`, agrupada por camada → categoria, com seção de detalhe por token (sentido, contexto, decisão, locais de uso).
- `scripts/build-token-registry.mjs` — script com 3 modos: `--init` (cria stub entries preservando existentes), sem flag (recalcula `usos` via grep em CSS + tokens que referenciam + Figma snapshot quando disponível, e regenera o MD), `--check` (valida completude, falha com exit 1 se houver TODO ou token sem entry).
- `package.json` — 3 scripts novos: `build:registry`, `build:registry:init`, `verify:registry`.

### Adicionado (docs — JSON/DTCG em todas as páginas de foundation)

Seção "JSON (DTCG)" adicionada às 7 páginas de foundation que estavam sem ela, completando a cobertura iniciada em motion/opacity/zindex. Cada bloco reflete o token JSON real do arquivo correspondente em `tokens/foundation/`:

- `docs/foundations-borders.html` ← `tokens/foundation/stroke.json`
- `docs/foundations-colors.html` ← paleta neutral completa + nota das demais
- `docs/foundations-elevation.html` ← `tokens/foundation/shadows.json` (valores recalibrados do #33)
- `docs/foundations-radius.html` ← `tokens/foundation/radius.json`
- `docs/foundations-spacing.html` ← excerpt de `tokens/foundation/spacing.json` (steps 0–3-5 + 12/16)
- `docs/foundations-theme-colors.html` ← excerpt de `tokens/semantic/light.json` (brand + 4 grupos feedback)
- `docs/foundations-typography.html` ← excerpt de `tokens/foundation/typography.json` (família, size, weight, line-height)

### Limpeza (Figma — remoção de seções dev-focused dos componentes)

Removidas as seções `section-tokens-utilizados` / `section-tokens` de 12 páginas de componente no Figma. Essas seções contêm mapeamentos CSS/token que são informação de desenvolvedor — já documentados em `docs/[componente].html`. O Figma passa a ter foco exclusivo em designer (variantes visuais, propriedades do componente, critérios de uso e acessibilidade).

Páginas afetadas: Badge, Button, Checkbox, Input Text, Radio, Select, Toggle, Card, Divider, Modal, Skeleton, Spinner.

### Corrigido (CSS — alinhamento visual Alert e Tooltip com Figma)

**Alert (`css/components/alert.css`)** — 8 divergências corrigidas após inspeção do componente Figma:

- **Gap**: `spacing-3` (12px) → `spacing-2` (8px) — bate com `gap: 8` no Figma.
- **Padding**: `spacing-3 spacing-4` (12px/16px) → `spacing-3` (12px all sides) — Figma usa padding uniforme de 12px.
- **Título font-size**: herdava 14px do base → `font-size-xs` (12px) — Figma: `fontSize: 12`.
- **Título font-weight**: `font-weight-semibold` (600) → `font-weight-bold` (700) — Figma: `Inter Bold`.
- **Descrição opacity**: `opacity: 0.9` removida — Figma: opacity 1 em todos os layers de texto.
- **Subtle backgrounds**: tokens `.background` (shade 50) → `.subtle` (shade 100) em todas as 4 variantes — Figma usa `feedback/*/subtle`.
- **Subtle text**: `feedback/*/content-default` (verde/âmbar/vermelho/azul) → `content.default` + `content.secondary` para descrição — Figma usa tokens neutros no estilo sutil.
- **Subtle border**: `border-left: border-width-4` (4px, só esquerda) → `border: border-width-1` (1px, 4 lados) — Figma usa `strokeWeight: 1` em todas as bordas.

**Tooltip (`css/components/tooltip.css`)** — 1 divergência corrigida:

- **Font-size**: `font-size-sm` (14px) → `font-size-xs` (12px) — Figma: `fontSize: 12, Inter Regular`.

**Docs** (`docs/alert.html`, `docs/tooltip.html`): tabelas de token mapping atualizadas para refletir os tokens corretos.

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
