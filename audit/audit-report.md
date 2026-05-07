# Auditoria Figma ↔ Repo — Componentes 2026-04-30

Auditoria sistemática dos 19 componentes contra suas implementações no Figma (`PRYS2kL7VdC1MtVWfZvuDN`). Inspeção feita via Plugin API (`use_figma`) lendo bindings de cada variant + comparando contra `css/components/*.css`.

## Sumário executivo

| Categoria | Quantidade |
|---|---|
| Componentes auditados | **19/19** |
| Componentes com drift visível | **11** |
| Drifts P0 (visualmente quebrado / inversão de token) | **3** |
| Drifts P1 (token errado, visivelmente diferente) | **8** |
| Drifts P2 (binding morto, nuance, débito sistêmico) | **6** |
| Drifts P3 (cosmético / convenção) | **3** |
| Componentes faltando no Figma | **1** (Form Field) |
| Tokens semanticamente mal usados | **2** (Breadcrumb, Required asterisk) |
| Tokens faltando no JSON (presentes no Figma) | **2** (`disabled/brand/toned/{dark,light}`) |
| Naming inconsistente JSON↔Figma | **1 categoria** (`disabled/*`) |

---

## Status por componente

| # | Componente | Variantes Figma | CSS file | Status | Drifts |
|---|---|---|---|---|---|
| 1 | **Button** | 216 | `button.css` | ⚠ DRIFT | icon size em sm; letter-spacing |
| 2 | **Input Text** | 18 | `input.css` | ⚠ DRIFT | font-size do field |
| 3 | **Textarea** | 18 | `textarea.css` | ✓ OK | letter-spacing (sistêmico) |
| 4 | **Select** | 18 | `select.css` | ⚠ DRIFT | font-size do field; chevron icon size |
| 5 | **Checkbox** | 27 | `checkbox.css` | ⚠ DRIFT | Description + Helper Text faltam no CSS |
| 6 | **Radio** | 18 | `radio.css` | ⚠ DRIFT | Description + Helper Text faltam; line-height label |
| 7 | **Toggle** | 18 | `toggle.css` | ⚠ DRIFT | Description + Helper Text faltam |
| 8 | **Badge** | 14 | `badge.css` | 🔴 **8/14 VARIANTS DRIFT** | ver seção dedicada |
| 9 | **Alert** | 8 | `alert.css` | ⚠ DRIFT | icon glyph color em Subtle |
| 10 | **Card** | 3 | `card.css` | ✓ OK | (post-fix) |
| 11 | **Modal** | 3 | `modal.css` | ⚠ DRIFT | letter-spacing tight no Title Large; body content typography por size |
| 12 | **Tooltip** | 4 | `tooltip.css` | ✓ OK | (post-fix) |
| 13 | **Tabs** | Tab Item + Tab Bar (split) | `tabs.css` | ✓ OK | Tab Item + Tab Bar auditados e alinhados |
| 14 | **Breadcrumb** | "Breadcrumb Item" 2 var | `breadcrumb.css` | 🔴 TOKEN MISUSE | Label usa `primary/background/default` como text color |
| 15 | **Avatar** | 6 | `avatar.css` | ⚠ POSSIBLE FIGMA BUG | Initials Medium = mesma font-size de Small |
| 16 | **Divider** | 2 | `divider.css` | ✓ OK | — |
| 17 | **Form Field** | **NÃO EXISTE NO FIGMA** | `form-field.css` | 🔴 MISSING | precisa authoring no Figma |
| 18 | **Spinner** | 6 | `spinner.css` | ✓ OK | (post-fix); reverse drift: variant `--on-color` só no CSS |
| 19 | **Skeleton** | 3 | `skeleton.css` | ✓ OK | — |

---

## Drifts detalhados, por prioridade

### 🔴 P0 — visualmente quebrado / inversão de token

#### P0-1. Badge Neutral Solid — cores INVERTIDAS

| Lado | Background | Text |
|---|---|---|
| Figma | `surface/default` (claro) | `content/default` (escuro) |
| CSS | `border-strong` (escuro) | `content-inverse` (claro) |

Componente fica com aparência **inversa** entre Figma e produto. Decisão: qual é o correto?

#### P0-2. Badge Secondary Solid + Subtle — usa tokens de outline no CSS, mas Figma usa primary/toned

| Variant | Figma bg | CSS bg | Figma text | CSS text |
|---|---|---|---|---|
| Secondary Solid | `primary/background/default` | `outline-border-default` | `primary/content/default` | `outline-content-default` |
| Secondary Subtle | `toned/background/default` | `outline-background-hover` | `outline/content/default` | `outline-content-default` |

Figma renderiza Secondary visualmente igual a Primary (mesmos tokens). CSS renderiza Secondary com aparência de outline. Um dos dois precisa ser corrigido — provavelmente o Figma deveria usar tokens distintos para Secondary, ou a Secondary deveria não existir como variante separada.

#### ~~P0-3. Form Field — não existe no Figma~~ → RECLASSIFICADO como CSS-only (ADR-017)

**Não é drift.** Form Field é CSS-only por design: HTML não tem elemento "form control" composto, então o wrapper `.ds-field` existe pra compor `<label>` + control + helper + error com IDs e ARIA. Cada componente Figma de form (Input Text, Select, Textarea, Checkbox, Radio, Toggle) já carrega Label + Required + Helper + Description **inline em cada variant** — authorar Form Field no Figma criaria duplicação visual sem ganho.

Codificado em ADR-017 e propagado para `scripts/sync-docs.mjs` (`knownComponents` com `cssOnly: true`), `docs/component-inventory.md` (mostra "— (CSS-only, ADR-017)" em vez de status Figma), `css/components/form-field.css` (comentário no topo) e AGENTS.md (seção dedicada).

---

### 🟠 P1 — token errado, drift visível

#### P1-1. Badge Neutral Subtle — Figma tem stroke, CSS não

| Lado | Background | Stroke |
|---|---|---|
| Figma | `surface/default` | `border/default` (visível) |
| CSS | `background-disabled` (cinza claro) | nenhum |

CSS usa fundo de "disabled" para um Neutral subtle, e perde o contorno que Figma tem.

#### P1-2. Badge Subtle de feedback (Success/Warning/Error/Info) — text token diferente

| Variant Subtle | Figma text | CSS text |
|---|---|---|
| Success | `feedback/success/background/default` | `feedback-success-content-default` |
| Warning | `feedback/warning/background/default` | `feedback-warning-content-default` |
| Error | `feedback/error/background/default` | `feedback-error-content-default` |
| Info | `feedback/info/background/default` | `feedback-info-content-default` |

Figma usa o token de **background-default** como cor de texto (diferente do `content-default` que CSS usa). Os dois podem ter valores diferentes na paleta semantic. Decisão: qual é o correto? Provavelmente CSS — `content-default` é semanticamente mais correto pra texto.

#### P1-3. Button `--sm` — icon size

- Figma: `Icon Left/Right` em Size=Small bindados a `size/md` (20px)
- CSS: `.ds-btn--sm .ds-btn__icon { width: var(--ds-size-xs) }` (16px)

Decisão: 16px (CSS atual, padrão Material) ou 20px (Figma)?

#### P1-4. Modal Title Large — letter-spacing/tight

- Figma: Modal Large Title binda `typography/body/letter-spacing/tight`
- CSS: `.ds-modal--lg .ds-modal__title` não aplica letter-spacing

#### P1-5. Modal Body content — typography não escala por size

| Size | Figma body content | CSS |
|---|---|---|
| Small | `font-size/sm, line-height/sm` | (não diferencia) |
| Medium | `font-size/md, line-height/md` | (não diferencia) |
| Large | `font-size/lg, line-height/xl` | (não diferencia) |

CSS Modal não tem regras `.ds-modal--md .ds-modal__body` etc.

#### P1-6. Input/Select/Textarea Field text — font-size em Small

- Figma Size=Small Field text: `font-size/xs` (12px) + `line-height/2xs` (11px)
- CSS `.ds-input--sm`, `.ds-select--sm`, `.ds-textarea--sm`: `font-size: body-font-size-sm` (14px)

3 componentes com mesma drift no tamanho Small.

#### P1-7. Select chevron icon size

- Figma Size=Small Chevron: `width/height: size/md` (24px)
- CSS `.ds-select__arrow`: `width: --ds-size-xs` (16px)

Mesmo padrão da Button icon.

#### P1-8. Breadcrumb Link — token semanticamente errado

- Figma Label fills: `primary/background/default` (token de **background**, usado como **cor de texto**)
- CSS: `.ds-breadcrumb__item { color: primary-background-default }` (mesmo erro semântico)

Tecnicamente "consistente" Figma↔CSS, mas ambos usam token errado por convenção. **Falta um token semantic novo** tipo `link.content.default` (ou usar `primary.content.default` se cabe).

---

### 🟡 P2 — binding morto / débito sistêmico / nuance

#### ~~P2-1. Letter-spacing morto~~ → RECLASSIFICADO como WONTFIX (não é drift visual)

Figma binda `typography/body/letter-spacing/normal` em **todo** texto de componente (Button, Modal, Card, Input, Tooltip, Badge, Alert, Avatar, Checkbox, Radio, Toggle, Select, Textarea, Breadcrumb, Tabs).

CSS de componente **nunca** consome `--ds-body-letter-spacing-*`.

Valor é 0 em todos os tokens, então visualmente não muda nada. Mas é binding morto.

**Não é drift visual.** `css/base/reset.css:82` já aplica `letter-spacing: var(--ds-body-letter-spacing-normal)` globalmente. Todo texto em componente herda via cascade — incluindo elementos com bindings Figma explícitos. O resultado renderizado é idêntico ao que Figma intenta.

Decisão: **wontfix**. Limpar ~600+ bindings no Figma só pra eliminar redundância sem ganho visual não justifica o trabalho. Os Figma bindings são "explícitos mas redundantes" — não causam drift.

Modal Large title é a única exceção (usa `letter-spacing/tight`, aplicado em CSS via P1-4 fix).

#### P2-2. Description + Helper Text faltam no CSS para Checkbox/Radio/Toggle

Figma cada um desses 3 componentes tem 3 text nodes: Label, Description, Helper Text.

CSS implementa só Label. Description + Helper Text não têm classes correspondentes.

Implicação: HTML produzido não consegue espelhar o que designer projetou. Ou criar `.ds-checkbox-description`/`__helper` etc., ou remover do Figma.

#### P2-3. Avatar Initials Medium — mesma font-size que Small (provável bug Figma)

- Initials Small: `font-size/sm`
- Initials Medium: `font-size/sm` ← mesma!
- Initials Large: `font-size/xl`

CSS Avatar `--md`: `font-size: body-font-size-sm`. CSS espelha Figma. Mas faz sentido visual? Avatar md (40×40) com texto sm (14px) é defensável; mas inconsistência com a escala Small/Medium/Large das outras dimensões.

Provavelmente designer esqueceu de bumpar Medium pra `font-size/md` (16px). Confirmar com você.

#### ~~P2-4. Modal Footer button heights~~ → RECLASSIFICADO como WONTFIX (decisão consciente)

| Size | Figma button height |
|---|---|
| Small | `size/lg` (32px) — sm |
| Medium | `size/xl` (40px) — md |
| Large | `size/2xl` (48px) — lg |

CSS não força tamanho de Button quando dentro de Modal — **decisão correta**. Consumidor controla via `.ds-btn--sm/--lg` quando renderiza o footer. Material/Polaris seguem mesmo padrão; Ant Design força mas é exceção. Figma prescreve sm/md/lg como **recomendação visual** pra mockups, não como CSS constraint.

Decisão: **wontfix**. Mantém padrão de indústria; consumer-driven sizing.

#### ~~P2-5. Spinner `--on-color`~~ → FALSO POSITIVO (variant existe no Figma)

**Falso positivo da auditoria.** Re-dump completo do Spinner mostra que Figma TEM `Style=On Color` (3 variants: sm/md/lg), com tokens batendo 1:1 com CSS:
- Track: `overlay/medium` (= `--ds-overlay-medium`)
- Indicator: `border/inverse` (= `--ds-border-inverse`)

Minha auditoria original só amostrou `Style=Default, Size=Small` — concluiu errado. CSS e Figma estão alinhados.

#### P2-6. Alert Subtle — icon glyph color

- Figma Subtle: icon glyph fill = `feedback/X/background/default` (a cor temática do Alert)
- CSS: `.ds-alert__icon` não tem regra de cor para Subtle. Inherita de `color: content-default`.

Resultado: ícone fica preto/cinza no Alert Subtle, em vez de tematizado.

---

### 🟢 P3 — cosmético / convenção

#### P3-1. Foundation `disabled/*` naming

| Lado | Padrão | Exemplo |
|---|---|---|
| Figma | folder `/` | `disabled/brand/dark` |
| JSON | flat `-` | `disabled/brand-dark` |

8 tokens no Figma vs 6 no JSON. JSON falta `disabled/brand/toned/{dark,light}`.

#### P3-2. Effect Styles `elevation/N` vs JSON `shadow.{sm,md,lg,...}`

- Figma: `elevation/1..4` (numérico, 4 styles)
- JSON: `shadow.{sm, md, lg, xl, 2xl, none, card}` (t-shirt + extras)

Por ADR-016 ambos podem coexistir (shadow é Effect Style, JSON é fonte CSS). Mas naming divergente confunde dev↔design.

#### P3-3. Required asterisk text token

- Resolvido nesta continuação: Form Field `__required` e os nós Figma `Required` de Input/Select/Textarea usam `feedback/error/content/default` como cor de texto
- Antes repetia o mesmo padrão semântico errado do Breadcrumb (background usado como text)

---

## Tokens potencialmente faltando

A auditoria não encontrou nenhum token que precise ser **criado no Figma** estruturalmente — todas as categorias semantic top-level batem entre Figma e JSON.

Tokens que podem ser **criados como semantic** para resolver os P0-P2 acima:

1. **`semantic.link.content.default`** (e talvez `.hover`, `.visited`) — para Breadcrumb e qualquer link textual; resolve P1-8.
2. **`semantic.feedback.X.content.subtle`** (4 tokens) — text color usado em Alert Subtle e Badge Subtle; resolve P1-2 e P2-6 sem ambiguidade.
3. **`semantic.border.badge.default`** ou ressuscitar `border/default` se Badge Neutral Subtle precisa de stroke; resolve P1-1.
4. **`semantic.size.icon.{sm,md,lg}`** ou padrão claro de qual `size/*` usar para ícones em controles de cada tamanho — resolve P1-3 e P1-7.

Esses não estão criando algo "novo no Figma" — estão consolidando intenção pra eliminar o uso semanticamente errado de tokens existentes.

---

## Cross-cutting findings

1. **Letter-spacing**: 100% dos componentes binda no Figma, 0% consome no CSS. Maior débito sistêmico.
2. **Description + Helper Text**: padrão "Control + Content (Label + Description + Helper)" no Figma para form controls, mas CSS só implementa Label.
3. **Tipografia escala por size em Modal/Input/Select/Textarea/Button** mas CSS só escala em alguns lugares — Modal title sim, Modal body não, Input field text não em Small.
4. **Background tokens usados como text color** em 3 lugares (Breadcrumb Link, Required asterisk, Badge Subtle de feedback). Indica falta de tokens semantic mais precisos.

---

## Plano de execução proposto

Sequência por dependência (não por prioridade pura — alguns P1 dependem de criação de tokens P0):

### Fase 1 — Decisões de convenção (você decide, eu registro em ADR + atualizações)

**Esforço: 30min de conversa, 1h de ADR + atualização de docs.**

1. **Convenção `disabled/*` naming** (P3-1): slash ou hyphen?
2. **Convenção shadow scale** (P3-2): numérico ou t-shirt? Effect Styles e JSON alinham?
3. **Letter-spacing** (P2-1): aplicar no CSS ou remover do Figma?
4. **Description + Helper Text em form controls** (P2-2): adicionar ao CSS ou remover do Figma?
5. **Modal body typography por size** (P1-5): scaling ativo ou só title?

Output: nova ADR-017 com decisões.

### Fase 2 — Tokens novos no Figma (cria infra para Fase 3)

**Esforço: ~1h Figma authoring + sync.**

Depende das decisões da Fase 1. Tokens prováveis:

1. `semantic.link.content.default` (+ hover, visited?) — resolve Breadcrumb + Required
2. `semantic.feedback.{success,warning,error,info}.content.subtle` (4 tokens) — resolve Badge Subtle text + Alert Subtle icon
3. Possíveis: `semantic.size.icon.control.{sm,md,lg}` se decidirmos formalizar

### Fase 3 — Fix de drifts P0/P1 dos componentes

**Esforço: ~3-4h, divisível por componente.**

Ordem sugerida (de mais danoso visualmente para menos):

1. **Badge** (8 variants drift) — P0-1, P0-2, P1-1, P1-2 — refazer todo `badge.css` contra Figma como fonte
2. **Form Field no Figma** (P0-3) — sessão de authoring no Figma com você
3. **Modal Title Large letter-spacing + body typography** (P1-4, P1-5)
4. **Input/Select/Textarea field text Small** (P1-6)
5. **Button + Select icon size** (P1-3, P1-7) — provavelmente um único PR
6. **Breadcrumb token** (P1-8) — usa novo `link.content.default` da Fase 2
7. **Checkbox/Radio/Toggle Description + Helper Text** (P2-2) — só se Fase 1 decidir manter

### Fase 4 — Limpeza P2/P3

**Esforço: ~2h, batch.**

1. Letter-spacing apply OR Figma cleanup (P2-1)
2. Avatar Medium font-size (P2-3, confirmar com Figma)
3. Spinner `--on-color` decision (P2-5)
4. Alert Subtle icon color (P2-6)
5. Disabled toned tokens no JSON OR remover do Figma (P3-1)
6. Effect Style ↔ shadow scale alignment (P3-2)
7. Required asterisk token semantic (P3-3)

### Fase 5 — Verificação completa

**Esforço: 30min.**

1. `npm run verify:tokens` zera erros e BY_DESIGN cai (alguns drifts viram by-design via novos tokens)
2. Tab Item + Tab Bar auditados nesta continuação; CSS alinhado ao dump Figma.
3. Testes visuais (`npm run test:visual`) reaplicam baseline
4. Atualizar `audit/audit-report.md` com checks completados

---

## Status de execução (2026-05-07) — handoff para próximo agente

**Concluídos (18 itens da auditoria + 3 extras; 2 pendências de decisão):**

| Item | Status | Commit(s) |
|---|---|---|
| P0-1 Badge Neutral Solid | ✅ aplicado | `0a73fa0` |
| P0-2 Badge Secondary | ✅ removido completamente | `40cb73d` |
| P0-3 Form Field | ✅ reclassificado CSS-only via ADR-017 | `776f5f5` |
| P1-1 Badge Neutral Subtle | ✅ aplicado | `d9f9cde` |
| P1-2 Badge Subtle feedback | ✅ Figma rebindado | `68657b4` |
| P1-3 Button icons | ✅ 20/24/24 + Icon Only paddings + token novo `space.control.padding.6` | `e5039bb` |
| P1-4 Modal Title Large letter-spacing | ✅ aplicado | `39763e5` |
| P1-5 Modal body typography | ✅ escala por size | `4b99ff6` |
| P1-6 Input/Select/Textarea Field text Small | ✅ aplicado | `5131689` + `14f9105` |
| P1-7 Select chevron | ✅ 20/24/24 alinhado com Button | `bb6fbad` |
| P1-8 Breadcrumb token | ✅ usa `link.content-default` | `90b385f` + `b17a16d` |
| P2-1 Letter-spacing morto | ✅ wontfix (reset.css cascadeia) | `199d33c` |
| P2-2 Description+Helper em Checkbox/Radio/Toggle | ✅ classes adicionadas | `9fcc899` |
| P2-3 Avatar Initials Medium | ✅ 14/16/20 + weight semibold lg | `ec1faf4` |
| P2-4 Modal Footer button heights | ✅ wontfix (consumer-driven) | `8be7dcf` |
| P2-5 Spinner --on-color | ✅ falso positivo (existe em Figma) + revert + tokenização | `061bfb1` |
| P2-6 Alert Subtle icon color | ✅ tematizado | `f999b02` |
| P3-3 Required asterisk token semantic | ✅ Figma rebindado + CSS usa `feedback-error-content-default` | nesta continuação |
| Tab Item + Tab Bar | ✅ dump completo + CSS alinhado | nesta continuação |

**Extras descobertos durante execução (todos resolvidos):**
- Field paddings descem um nível (Input/Select/Textarea sm/md/lg) — `6d61409` + `393b666`
- Spinner rotação revertida pra 0.6s linear → tokenizada (`motion-duration-slower`/`motion-ease-linear`) — `b512e9f` + `061bfb1`
- Motion completo: 5 durations × 5 eases (era 3 × 1) — `90cfe3e`
- Doc↔JSON drift check em `verify:tokens` + 3 drifts históricos limpos (`border.width.0`, `opacity.0`, `radius.9999`) — `736271b`
- Rename `content.{default,secondary,tertiary}` → `{strong,default,subtle}` (ADR-018) — `2ce9cc2`

**Pendentes para próxima sessão / próximo agente:**

| # | Item | Escopo | Esforço |
|---|---|---|---|
| #18 | P3-1 — Foundation `disabled/*` naming | Decidir convenção (slash vs hyphen). Figma tem 8 vars `disabled/brand/dark` etc; JSON tem 6 `disabled.brand-dark` etc. + 2 toned faltam no JSON | 1h |
| #19 | P3-2 — Effect Style elevation/N vs JSON shadow.{sm..2xl} | Alinhar scale entre Figma Effect Styles (`elevation/1..4`) e JSON shadow tokens (sm/md/lg/xl/2xl/none/card) | 30min |

**Como continuar (qualquer agente Codex/Gemini/Claude):**

```bash
cd ~/design-system-core
npm run agent:preflight
# → leia AGENTS.md (e CLAUDE.md ou GEMINI.md conforme o agente)
# → leia esta seção do audit-report.md
# → escolha pendência da tabela acima
```

MCP é protocolo aberto — Codex e Gemini, se configurados localmente com Figma + GitHub MCPs, têm o mesmo acesso que Claude Code. Verifique sua config; se faltar algo, restrições documentadas em `GEMINI.md` / `CLAUDE.md` aplicam.

PR #43 mergeado em `main`. Próximas pendências (P3-1, P3-2) podem ir em nova branch a partir de `main`.

---

## Pós-auditoria — débitos de doc/JSON resolvidos

Inconsistências descobertas durante execução dos itens P0-P3 que não estavam no inventário inicial:

- **Motion drift doc/JSON resolvido** (descoberto durante #16 P2-5). `docs/foundations-motion.html` documentava sistema completo (5 durations × 5 easings) mas JSON tinha 3 durations × 1 ease com valores/nomes divergentes (slow=300 vs doc 400, normal vs moderate, sem instant/in/out/in-out). JSON alinhado com doc em 2026-05-07. Zero impacto em consumers (tokens divergentes eram órfãos).

## Pendências desta auditoria

- **Tab Item + Tab Bar**: dump dedicado feito nesta continuação; CSS alinhado ao gap/indicator, divider e focus radius do Figma.
- **Snapshot Figma**: rodar fresh dump de Variables (atual tem 3d). `verify:tokens` continua passando, mas vale.
- **Variants edge case** não inspecionados em alguns componentes: Button (216 variants — só Brand/Sm/Default lido), Checkbox indeterminate, Toggle disabled+on, Input estados Filled/Error/Disabled/Readonly. Padrões devem repetir mas vale conferir antes de fix.
