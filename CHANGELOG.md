# Changelog

Todas as mudanças notáveis deste design system são registradas aqui.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

A partir de `1.0.0-beta.1`, o sistema entrou em **fase beta** — releases incrementam `1.0.0-beta.N` até decisão do owner pra dropping do tag → `1.0.0` oficial. Tags 0.x permanecem como histórico pré-beta. Regras em `docs/process-versioning.html`.

## [Não publicado]

### Adicionado

- **Visual regression testing via Playwright + pixelmatch** (`scripts/test-visual.mjs`). Captura full-page de 31 páginas × 2 modos = 62 screenshots e compara contra baseline versionado em `tests/visual/baseline/` (~27MB). Threshold 0.5% pixel diff tolera anti-aliasing, bloqueia mudanças visuais reais. Diff visualizável em `tests/visual/diff/` (gitignored). Comando: `npm run test:visual` (local-only — fonts via Google Fonts CDN renderizam levemente diferente Linux vs Mac, então não rodando em CI ainda).
- **Token registry 100% preenchido** — `scripts/populate-registry.mjs` gerou drafts determinísticos pra `sentido`/`contexto`/`decisao`/`escopo` em todos os 426 tokens. Foundation 100% mecânico (color step descriptions, escalas dimension/radius/typography, conventions de shadow/motion/z). Semantic 100% via heurísticas de nome (action × style × prop × state, feedback × kind × prop). Drafts revisíveis — owner pode reescrever entries específicas; `build:registry` preserva campos editados manualmente.
- **A11y testing automatizado via axe-core + Playwright** (`scripts/test-a11y.mjs`). Roda contra todas as 42 páginas docs em light + dark (84 runs) com tags WCAG 2A, 2AA, 2.1A, 2.1AA, 2.2AA. Bloqueia CI em violações NOVAS (não-baseline) com impact `critical` ou `serious`. Baseline atual em `.a11y-baseline.json` (422 fingerprints) — meta é reduzir incrementalmente. Comando: `npm run test:a11y` (também rodando em `npm test`).
  - Fixes preventivos no setup: skeleton previews ganharam `role="status"`; markdown task list checkboxes em process-*.html marcados `aria-hidden="true"` via post-process em `sync-docs.mjs`; loading buttons em `docs/button.html` com `aria-label` + `aria-busy`; demos com `<input>`, `<select>`, `<textarea>` sem label receberam `aria-label`; "Don't" examples em checkbox demos receberam atributo `inert` pra axe pular; swatch contrast badges em `js/main.js` marcados `aria-hidden="true"` (são demonstrações educativas de mau contraste); `<pre>` com código longo recebeu `tabindex="0"` (scrollable-region-focusable); `<dl>` malformado em token-architecture virou `<div>`.
- **CI check Figma↔JSON via `.figma-snapshot.json`** — `verify:tokens` agora compara JSON do repo contra snapshot das 387 Variables Figma e falha em divergência. Snapshot gerado por `use_figma` em batches (~50KB cada), gitignored. Ver `docs/process-figma-sync.md`.
- **Redesign da seção "Camadas e cadeia de alias"** em `docs/token-architecture.html`. Duas seções viraram uma. Foundation primeiro (01), Semantic depois (02), em dois cards lado-a-lado usando o vocabulário visual do site (`--ds-radius-12`, `--ds-border-default`, `--ds-surface-default`, `<code>` inline padrão). Sem componente novo, sem display all-caps, sem chips, sem swatches/ícones. A cadeia de alias virou um parágrafo prosaico abaixo dos cards (já implícita no card 02 via aliases `{color.blue.600}`). Card usa `--ds-surface-default` (não `--ds-surface-raised`) pra contrastar com o `<code>` inline em dark mode (que usa `--ds-background-subtle` ≡ `--ds-surface-raised` ≡ neutral-800).

### Mudado

- **Reconciliação Figma↔JSON completa.** 23 tokens com VALUE_DRIFT corrigidos pra refletir Figma como autoridade de valor (ADR-003):
  - `foundation.color.disabled.{brand,success,error}-dark` ganharam alpha (estavam sem em hex). `foundation.radius.999` corrigido (`9999px` → `999`).
  - Semantic: `outline.{border-default,border-hover,content-default}`, `link.{content-default,content-hover}`, `border.{focus,focus-error,error}`, `outline.background.hover`, `ghost.background.hover`, `feedback.{success,warning,error,info}.background.subtle` (dark) — todos os aliases atualizados pra refletir escolhas de cor do Figma.
- **4 tokens semantic novos** adicionados pra alinhar com Figma: `link.content-disabled`, `border.inverse`, `feedback.{success,error}.content-disabled` (light + dark).
- **Refatoração de Foundation→Semantic em CSS de componentes** (12 arquivos). Componentes não consomem mais Foundation direto via `--ds-focus-ring-*` ou `--ds-control-*`:
  - Focus ring → `--ds-border-focus` + `--ds-border-width-focus` (mesmo valor pra offset). Bate com Figma `border/focus` e `border/width/focus`.
  - Control typography → `--ds-body-font-size-{sm,md}` + `--ds-body-line-height-{2xs,sm,md}` espelhando Text Styles `control/label-md`, `label/md`, `label/lg` que Figma aplica nos componentes.
- **`background/overlay` em ambos modos no Figma** unificados em `overlay/black/60`. Antes: light=`black/40`, dark=`white/40` (contraditório). Agora ambos consistentes em 60% black, alinhado com mercado (Material/Bootstrap/Tailwind usam ~50-60% black em modal scrim).
- **Variable nova `link/content/active` no Figma** (Semantic, scope TEXT_FILL): light alias `brand.800`, dark alias `brand.200`. Espelha `semantic.link.content-active` adicionado em beta.3 — JSON e Figma agora convergem.

### Removido

- **Tokens Semantic redundantes ou sem consumer real**:
  - `semantic.focus.ring.{width,offset,color}` — substituídos por `border.focus` e `border.width.focus` que Figma já tem.
  - `semantic.typography.control.{font-size,line-height}.{sm,md,lg}` — Figma não tem Variables `control/typography/*`; usa Text Styles `control/*` que bindam Semantic `body/*`. CSS migrado pra `body.*` direto.
  - `semantic.feedback.{success,error}.content-contrast-disabled` — sem consumer no CSS.
  - `semantic.border.width.subtle` — sem consumer no CSS.

### Corrigido

- **`scripts/lib/figma-dtcg.mjs`**: normalizer Figma↔JSON colapsa hífen→ponto em paths (`primary.content-default` ↔ `primary.content.default`). Antes inflava 119 falsos positivos.
- **`scripts/tokens-verify.mjs`**: `normalize()` reconhece equivalência entre número puro (Figma Float) e string `Npx`/`Nrem` (CSS gerado). Antes flagava `999 ≠ "999px"` como drift.
- **Code blocks sempre escuros no docs site** (`docs/layout.css`):
  - **`.ds-code-block` regredido sem estilo** desde `d5c4fd2`: regra CSS não foi migrada pra `layout.css`. Recolocada com `--ds-color-neutral-900` + `--ds-color-neutral-50` (sempre escuro, padrão universal de terminal/editor).
  - **`<pre>` global em `reset.css`** usa `--ds-background-inverse`, que flipa pra branco em dark mode — deixava `.ds-preview__code pre` brancos em dark. Override em `main.ds-main pre` força escuro nos dois modos. Foundation direto é aceito aqui por ser estrutura do site de docs (não componente do DS).
- **Topbar do site sempre acima de todo conteúdo de página** (`docs/layout.css`, `docs/foundations-zindex.html`):
  - Topbar (e sidebar mobile + overlay) sobem para `calc(var(--ds-z-50) + 10)` (= 60), acima de toda a escala `--ds-z-*` (que termina em 50/toast). Antes, com header em `--ds-z-50`, conteúdo de página com z-50 empatava e podia paintar por cima via DOM order.
  - **Demo de z-index** ganhou `isolation: isolate` no `.ds-zindex-stack` — o container era `position: relative` sem `z-index`, então não criava stacking context, e o card `.ds-zindex-layer--50` escapava pra raiz e atravessava a topbar quando o demo era rolado pra baixo da topbar. Com `isolation`, a escala 0–50 fica local ao demo (que era a intenção).

## [1.0.0-beta.3] — 2026-04-27

Link como text style (não Button variant) com estados WCAG/W3C completos. Topbar fixes do site de docs. Modal Cancel rebind no Figma alinhando com decisão de manter Cancel como Ghost Button.

### Adicionado

- **`.ds-link` CSS class** (`css/components/link.css`) — text style pra hyperlinks inline em prosa, bold + underline, herdando dimensões de `body/*`. 4 sizes (`xs`/`sm`/`md`/`lg`) com line-heights pareados. Estados WCAG/W3C: `:hover`, `:active`, `:focus-visible`. `:visited` intencionalmente omitido (decisão do owner — Material 3/Apple HIG omitem em conteúdo curado).
- **Token `semantic.link.content-active`** (`brand.800` light / `brand.200` dark) — pressed state distinto de hover. Estados existentes `content-default` e `content-hover` mantidos.
- **4 Text Styles `link/{xs,sm,md,lg}` em Figma** com bindings completos (fontSize, lineHeight, fontFamily, fontStyle Bold, letterSpacing) + `textDecoration: UNDERLINE` direto no Text Style (Figma Plugin API suporta). Cor aplicada em consumidor via `link/content/default` (Text Styles não armazenam fills).
- **Showcase rows pra Link** em `docs/foundations-typography.html` — 4 sizes documentados com tokens.

### Mudado

- **Modal Cancel button no Figma** rebindado em todas as 3 variants (Sm/Md/Lg): label color e glyph fills de `link/content/default` → `ghost/content/default`. Cancel volta a ser visualmente Ghost neutral (alinha com `.ds-btn--ghost` já em uso no CSS).
- **Capa Figma**: badge versão `v1.0.0-beta.1` → `v1.0.0-beta.3` (pulou beta.2). Estilos de Texto count `25 → 29` (+4 link styles).
- **Changelog Figma**: nova entrada `v1.0.0-beta.3 — Abril 2026` com 7 bullets.

### Corrigido

- **Topbar do site de docs** (`docs/layout.css`): três bugs visuais corrigidos:
  - **Hamburger mobile**: `.ds-menu-toggle` usava `--ds-content-default` (escuro em light mode) sobre fundo brand. Agora consome `--_hfg`, ficando branco em ambos os modos. Hover ganhou estado.
  - **Z-index**: topbar subia até `--ds-z-40`, ficando no mesmo nível de modais (`z-40`) e abaixo de toasts (`z-50`). Conteúdo da página passava por cima da topbar. Subido para `--ds-z-50`. `.ds-sidebar-overlay` também foi pra `--ds-z-50` para cobrir a topbar quando o drawer mobile abrir (ordem DOM mantém header → overlay → sidebar).
  - **Dark mode com transparência**: header dark usava `--ds-toned-background-default`, que resolve para `--ds-overlay-blue-600-12` (12% alpha), deixando o conteúdo passar por trás. Trocado por `--ds-color-brand-900` (sólido, mantém identidade da marca e separa visualmente da sidebar — que usa `--ds-surface-raised`).

### Removido

- **`.ds-btn--link` variant** revertido de `css/components/button.css`. Adicionado erroneamente em beta.2 — Link não é Button variant (overlap com Ghost), é text style. Substituído por `.ds-link` em arquivo dedicado.

### Sobre versão

Beta.3 corrige decisão arquitetural de beta.2 (Link como Button variant) e adiciona pattern correto (Link como text style com estados WCAG/W3C completos). Topbar fixes do owner consolidados nesta release.

## [1.0.0-beta.2] — 2026-04-27

Sincronização Figma↔código: alinhamento de utilities/textStyles per size + nova variant `.ds-btn--link` espelhando padrão de DS modernos (Material Text Button, Atlassian Link Button, Polaris Plain). Atualização da documentação no Figma (Capa + Changelog) refletindo o estado atual.

### Adicionado

- **`.ds-btn--link` variant** em `css/components/button.css`: button text-only com cor `link/content/default`, sem background/border, underline em hover. Cobre o padrão Modal Cancel e ações de baixa ênfase. Espelha Material 3 (Text Button), Atlassian (Link Button), Polaris (Plain), Spectrum (style=text).

### Mudado

- **Badge label** alinhado com Figma: `font-size sm (14)` → `xs (12)` + `line-height sm (20)` → `xs (18)`. Match exato com textStyle `label/xs` que Figma agora usa.
- **Radio label** ganhou variants per size: Sm usa `control/label-md` (14/16), Md usa `label/md` (14/20), Lg usa `label/lg` (16/24). Antes CSS aplicava 14/20 em todos os tamanhos. Implementado via `:has()` selector.
- **Figma Capa atualizada**: badge de versão `v0.5.17` → `v1.0.0-beta.1`. Counts atualizados (Coleções 4→2 após eliminação Component layer, Estilos de Texto 24→25, Tokens 285+→386).
- **Figma Changelog**: nova entrada `v1.0.0-beta.1 — Abril 2026` espelhando CHANGELOG.md do repo. A partir daqui versionamento Figma e código alinhados.

### Documentação

- **Política de versionamento beta** estabilizada: schema `1.0.0-beta.N` substitui 0.x até decisão do owner pra dropping → `1.0.0` oficial. Detalhes em `docs/process-versioning.md`.
- **Style=Link variant em Figma** identificado como pendente (~60 variants × Style/Size/State/booleans). Deferido pra sessão dedicada com escopo Figma. CSS já tem `.ds-btn--link` pronto pra consumir quando variant existir.

### Sobre versão

Beta.2 fecha pendências do beta.1 (descrições/counts Figma desatualizados, drift Badge/Radio per size). Próxima beta deve focar em snapshot Figma (CI Figma↔JSON), Style=Link variants no Figma, e brand-principles.md.

## [1.0.0-beta.1] — 2026-04-26

Primeiro release em fase beta. Consolida todo trabalho pós-0.8.0: alinhamento de 14 componentes restantes com Figma, refactor de inline styles dos docs, descriptions designer-focused nos 18 component sets Figma, eliminação de 111 leaks Foundation em `css/base/`, fix de problemas visuais persistentes (Toggle pixel offset, dodont border, callouts, header washed, version badge, code contraste, theme switcher legado, tooltip docs grid). Marca a transição do versionamento 0.x para a fase beta de 1.0.

### Adicionado

- **Política de versionamento beta** (`docs/process-versioning.md`): schema `1.0.0-beta.N` substitui o 0.x até dropping decidido pelo owner. Cadência pack-based + fallback 2 semanas. Critérios de maturidade pra 1.0 documentados como guia (não gate).
- **Regra Operacional 5** em `CLAUDE.md`: "Figma é fonte de verdade absoluta. Quando o usuário pedir algo que diverge do Figma, alertar antes de aplicar." Inspeção do Figma vira pré-requisito de qualquer mudança que toque valor visual ou estrutura de token.
- **Centralização de utility classes de docs** em `docs/layout.css`: callouts, dodont, anatomy, related, tables. Antes duplicados inline em 19+ arquivos `docs/*.html`. Future fix em uma edição.
- **Documentation links nos 18 component sets Figma**: cada um aponta pro site de docs correspondente.
- **17 descriptions designer-focused** reescritas (template Quando usar / Variantes / Constraints) nos componentes Figma.
- **`semantic.typography.body.font-family.mono`** + **`semantic.typography.body.letter-spacing.wider`** sincronizados pra JSON (já existiam em Figma — JSON estava out-of-sync).

### Mudado

- **14 componentes alinhados 1:1 com Figma vs CSS**: Badge, Breadcrumb, Checkbox, Input, Textarea, Alert, Avatar, Card, Divider, Radio, Skeleton, Spinner, Tabs, Tooltip. Drift visual aceito como alinhamento Figma (line-heights heading, font-weight medium→bold em label/*, icon container size-md fixo, etc.).
- **Toggle pixel-perfect**: dimensions Sm 32×18, Md 40×22, Lg 48×26 com thumbs 12/16/20 e gap 3px (era 2px). Eliminada o offset de 1px à direita que persistia.
- **`css/base/typography.css` reescrito**: 24 utility classes `.ds-text-*` agora consomem 100% Semantic, alinhadas 1:1 com Text Styles do Figma. 21 classes restantes (3 deletadas alinhando com Figma).
- **`css/base/reset.css`**: 14 substituições Foundation→Semantic. body/code/pre/table consomem `--ds-body-*`. `pre` usa `--ds-background-inverse` / `--ds-content-inverse` em vez de neutral-900/100 direto.
- **`docs/layout.css`** ganha section "DOCS UTILITY CLASSES" centralizando estilos antes duplicados inline.
- **CI `deploy.yml`**: removida etapa "Commit regenerated artifacts" que tentava push como bot e falhava na branch protection. Agora só valida drift e falha com mensagem clara se artefatos commitados não baterem com `build:all`.
- **`docs/foundations-typography.html`**: 3 showcase rows removidas (Label SM, Caption MD, Caption SM) alinhando com deleção dos Text Styles correspondentes em Figma.
- **`tokens/registry.json`**: 83 entries stale removidas (referências a tokens deletados nas migrações 2-layer e size unification).
- **Toggle/Avatar descriptions Figma** atualizadas refletindo specs 0.8.0 (Toggle 32/40/48, Avatar lg 64).
- **ADRs históricos atualizados** com notas de evolução: ADR-006 (parcialmente substituída por ADR-015), ADR-013 (estabilizada como 2-layer em 1.0.0-beta.1), ADR-014 (estabilizada).

### Corrigido

- **Toggle Sm sem pill shape e thumb deslocado** — track + thumb dimensions alinhadas exatamente com Figma.
- **"Não faça" / "Faça" callouts** sem border completo e com bg desconectado do label tint. `.ds-dodont__item` ganha border + `:has()` pra desc herdar tint do label.
- **"Foundation" header washed em token-architecture.html** — `.ds-arch__header--fdn` trocado de `--ds-overlay-subtle` (5% black, quase invisível) pra `--ds-feedback-info-background-subtle` + border tinted.
- **Badge de versão sem fundo** em index.html — ref antiga `--ds-toned-bg-default` corrigida pra `--ds-toned-background-default`.
- **Tooltip docs com tooltips overlapping** no canvas — layout grid 2x2 com gaps generosos. Position Right da coluna esquerda não colide mais com Position Left da coluna direita.
- **Tokens-sync page**: "Em dia" deixa de imitar Button (solid bg+contrast color) e vira badge feedback-success-bg-subtle. Banner info ganha código inline com contraste legível (surface bg + border).
- **Theme switcher (Default/Ocean/Forest)** removido do header — só Default existe nos tokens. lang-switcher (PT/EN) preservado.
- **574 textos de components Figma sem textStyleId** corrigidos: aplicação por matching (family, style, fontSize, lineHeight) + detecção de contexto (Field/Text Frame → control/* style). Resultado: 100% Inter coverage em components, 367 Material Icons preservados como design intent.
- **Foundation header em chain__badge--fdn** mesmo fix que arch__header — bg tinted em vez de overlay-subtle.
- **`generatedAt` em artefatos derivados** removido — torna build determinístico, eliminando drift CI.
- **Duplicata `body.line-height.lg`/`xl`** corrigida (xl agora 32px espelhando Figma; antes era 28 igual lg).

### Removido

- **111 leaks Foundation em `css/base/`** — todos migrados pra Semantic. `verify:tokens` reporta `CSS leak: OK` em components AND base.
- **3 utility classes** sem Text Style counterpart no Figma: `.ds-text-label-sm`, `.ds-text-caption-md`, `.ds-text-caption-sm`.
- **Form Field** da lista de components — `.ds-field*` permanece como utility interna do Input. `index.html` lista 18 components consistentes (era 19 com Form Field órfão). `docs/form-field.html` removido. Refs em "Related" sections de 6 docs HTML removidas.
- **Inline styles duplicados** em 19+ docs HTML — extraídos pra `docs/layout.css`. ~89KB economizados.
- **Theme switcher dropdown** do header (3 opções legadas).
- **`.ds-md-generated-banner` Foundation leak** — ganha border tinted e código inline com surface bg.

### Sobre versão

Esta é a **transição do 0.x para fase beta**. Tags `v0.5.0` até `v0.8.0` permanecem válidas como histórico pré-beta. A partir daqui, releases são `1.0.0-beta.N` até decisão do owner pra dropping do tag → `1.0.0` oficial.

A entrada **[0.8.0] — 2026-04-26** abaixo é o último release pré-beta e ficou consolidando o trabalho pós-2-layer migration. Nada antes dela mudou.

## [0.8.0] — 2026-04-26

Release que consolida o trabalho pós-merge do 2-layer (PR #41) até a unificação da escala de dimensão. Sequência de ajustes que ocorreu na prática em sub-etapas é apresentada aqui agrupada por tipo. Detalhamento técnico nos ADRs **013** (2-layer), **014** (action × style × prop × state), **015** (size unification).

### Adicionado

- **ADR-015** — unificação da escala de dimensão. Nova `semantic.size.{xs..5xl}` (16/20/24/32/40/48/64/96/128px) cobre tudo dentro de componente; `semantic.size.layout.{xs..2xl}` (320/480/640/800/1024/1280px) cobre containers. Substitui ~25 tokens component-specific.
- `foundation.dimension.*` — escala numérica primitiva (renomeação de `foundation.spacing.*`, +7 entries: 128, 320, 480, 640, 800, 1024, 1280).
- `semantic.typography.body.{font-size,line-height}.{4xl..9xl}` — escala completa para text styles display/heading. Foundation ganhou `line.height.{32, 48, 64, 72}`.
- Sistema de testes automatizado (`scripts/test-token-integrity.mjs`, `test-css-references.mjs`, `test-generators.mjs`, `test-self.mjs`) validando coerência JSON↔CSS↔HTML, incluindo meta-test que provoca regressões e valida que detectores pegam.
- CI workflow `.github/workflows/test.yml` rodando os testes em cada push.
- Política de versionamento explícita em `docs/process-versioning.md`: triggers (mudança considerável / feature completa / cadência ≤2 semanas), regras do que NÃO bumpa, formato consolidado de CHANGELOG.

### Mudado

- **Naming Foundation:** `foundation.spacing.N` → `foundation.dimension.N`. CSS gerado: `--ds-spacing-N` → `--ds-dimension-N`. Espelha Figma (que já adotou `dimension/N`).
- **`size.control.*` → namespace de exceção**, não namespace genérico. `control.*` agora só existe para valores que **fogem** da escala genérica (ex: `space.control.padding.10` = 10px único deviation).
- 2.062 bindings em componentes Figma rebound de zombies legados (`size/control/*`, `space/control/padding/{x,y}-*`, `size/lg0`, `border/width/focus` duplicado) → escala unificada.
- ~50 refs em `css/components/*.css`, `css/base/*.css`, `docs/*.html`, `docs/layout.css`, `index.html`, scripts internos atualizadas para os novos vars.
- Touch target a11y: 44px → 48px (`size.control.min-target` → `size.2xl`). Passa Material 48px guideline além de WCAG 2.5.5 AAA (44px).
- Avatar lg: 56px → 64px (`size.3xl`). Modal sm/md: 400/520 → 480/640 (`size.layout.sm/md`). Toggle track-width: 28/36/44 → 24/40/48. Textarea min-heights: 68/80/112 → 64/96/128. Ajustes para alinhar componentes à escala única.
- ADR-006 marcada como **parcialmente substituída** por ADR-015 (parte de `size.control.*` e `space.control.padding-{x,y}.*`). `typography.control.*` permanece vigente.
- 740 textos de componentes Figma ganharam Text Style aplicado (estado pré-existente: 1.665 textos sem style). Match exato por (fontFamily, fontStyle, fontSize, lineHeight). Material Icons preservados (não recebem text style por design).

### Corrigido

- Duplicata `body.line-height.lg` e `xl` (ambos aliasavam `line.height.28`). Corrigido: `xl` → `line.height.32` espelhando Figma. JSON estava fora de sincronia.
- `body.font-size` e `line-height`: JSON tinha 8 entries (`2xs..3xl`), Figma tem 14 (`2xs..9xl`). Adicionados os 6 faltantes em ambos.
- Site de docs: refs CSS quebradas pós-migração 2-layer (44 arquivos `docs/*.html` com `--ds-spacing-*` e legados `--ds-size-control-*` etc.) atualizadas para os nomes vigentes.
- `card --elevated`: passa a consumir `var(--ds-shadow-card)` (Semantic) em vez de Foundation direto.
- Modal: removido `border-bottom` no header e `border-top` no footer (não existiam no Figma).
- Tooltip: arrows criados nas 4 variants (Position=top/bottom/left/right) — antes não existiam.
- `tokens/registry.json`: 107 entries adicionadas via `build:registry:init`. Eliminado o erro de completude no `verify:tokens`.

### Removido

- `semantic.size.{avatar, control, modal, skeleton, spinner, textarea, toggle}.*` — 25 tokens component-specific. Vestígio da Component layer eliminada em ADR-013.
- `semantic.space.control.padding-{x,y}.{sm,md,lg}` — 6 tokens. Substituídos por `space.{sm, md, lg, xl}` direto (8/12/16/20px) + `space.control.padding.10` (10px, único deviation).
- `tokens/foundation/spacing.json` — renomeado para `dimension.json`.

### Notas de migração

- 0.7.0 → 0.8.0 é breaking. Consumidores externos do CSS gerado precisam atualizar references aos vars renomeados (na prática este repo é o único consumer hoje).
- Reversibilidade: rebind reverso é possível por valor. Branch atual contém todo o trabalho testado e funcional.
- `verify:tokens` continua reportando 111 warnings em `css/base/*.css` (Foundation leak). Débito pré-existente, fora do escopo desta release. PR futuro.

### Sobre versão

A versão **0.7.0** foi tagueada via PR #41 (2026-04-24) cobrindo a migração 2-layer mas sem entrada formal de CHANGELOG. Toda a substância dessa entrega + cleanup posterior + size unification está consolidada nesta entrada **0.8.0**. A política de versionamento foi formalizada em `docs/process-versioning.md` para evitar fragmentação futura.

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
