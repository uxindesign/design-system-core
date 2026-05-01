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
| 13 | **Tabs** | Tab Item + Tab Bar (split) | `tabs.css` | ⏳ A verificar | dump separado de Tab Item necessário |
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

#### P2-1. Letter-spacing morto — sistêmico em TODOS os componentes

Figma binda `typography/body/letter-spacing/normal` em **todo** texto de componente (Button, Modal, Card, Input, Tooltip, Badge, Alert, Avatar, Checkbox, Radio, Toggle, Select, Textarea, Breadcrumb, Tabs).

CSS de componente **nunca** consome `--ds-body-letter-spacing-*`.

Valor é 0 em todos os tokens, então visualmente não muda nada. Mas é binding morto.

Opções:
- (a) Aplicar `letter-spacing: var(--ds-body-letter-spacing-normal)` em todos os textos no CSS (consistência)
- (b) Remover binding do Figma (Variables ficam mais limpas)

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

#### P2-4. Modal Footer button heights — não escalam no CSS

| Size | Figma button height |
|---|---|
| Small | `size/lg` (32px) — sm |
| Medium | `size/xl` (40px) — md |
| Large | `size/2xl` (48px) — lg |

CSS não força tamanho de Button quando dentro de Modal. Provavelmente OK (consumidor controla qual classe de Button passar). Mas Figma sugere padrão.

#### P2-5. Spinner `--on-color` — variant só no CSS

Variant adicionada por nós nesta sessão para uso em fundos coloridos. Figma não tem essa variant. **Reverse drift** — CSS extra que Figma não cobre.

Decisão: criar a variant no Figma ou remover do CSS. Sem uso real ainda — pode ser removida temporariamente até designer authorar.

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

- Form Field `__required`, Input/Select/Textarea Required: usa `feedback/error/background/default` como cor de texto
- Mesmo padrão semântico errado do Breadcrumb (background usado como text)

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
2. Auditar Tab Item + Tab Bar (não fizemos hoje — split component, requer dump separado)
3. Testes visuais (`npm run test:visual`) reaplicam baseline
4. Atualizar `audit/audit-report.md` com checks completados

---

## Pendências desta auditoria

- **Tab Item + Tab Bar**: não fiz dump dedicado (Figma não acha como `Tabs` único). Próxima sessão: 1 call específica.
- **Snapshot Figma**: rodar fresh dump de Variables (atual tem 3d). `verify:tokens` continua passando, mas vale.
- **Variants edge case** não inspecionados em alguns componentes: Button (216 variants — só Brand/Sm/Default lido), Checkbox indeterminate, Toggle disabled+on, Input estados Filled/Error/Disabled/Readonly. Padrões devem repetir mas vale conferir antes de fix.
