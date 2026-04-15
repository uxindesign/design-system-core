# Design System — Guia para Claude Code

## Visão Geral

Design system white-label com tokens semânticos, 18 componentes, modos Light/Dark e 3 temas de marca (Default, Ocean, Forest). Mantido em dois artefatos sincronizados:

- **CSS** — este repositório (`uxindesign/design-system-core`, branch `main`)
- **Figma** — https://www.figma.com/design/PRYS2kL7VdC1MtVWfZvuDN

Site de documentação: https://uxindesign.github.io/design-system-core/

---

## Arquitetura de Tokens

Três camadas, do primitivo ao semântico:

```
Foundation (valores brutos, 192 vars)
    ↓ alias
Brand (3 modos: Default/Ocean/Forest, 13 vars)
    ↓ alias
Theme (2 modos: Light/Dark, 94 vars)
    ↓ consumo
Componentes
```

### CSS — Estrutura de Arquivos

```
css/
├── design-system.css          ← entry point (importa tudo)
├── tokens/
│   ├── foundation.css         ← cores primitivas, tipografia, spacing, radius, shadows, etc.
│   ├── theme-light.css        ← tokens semânticos Light (background, text, border, feedback, state, space, radius)
│   ├── theme-dark.css         ← overrides Dark ([data-mode="dark"])
│   └── themes/
│       ├── theme-ocean.css    ← marca Ocean: primary=cyan, secondary=indigo ([data-theme="ocean"])
│       └── theme-forest.css   ← marca Forest: primary=emerald, secondary=amber ([data-theme="forest"])
├── base/
│   ├── reset.css              ← reset, Google Fonts (Inter + DM Mono), estilos de code/pre/table
│   └── typography.css         ← 24 classes .ds-text-{category}-{size}
├── components/                ← 18 arquivos CSS de componentes
└── utilities/
```

### Figma — Coleções de Variáveis

| Coleção | Modos | Variáveis | Escopos |
|---------|-------|-----------|---------|
| Foundation | Value | 192 | Cores: `[]` (ocultas). Tipografia: escopos específicos (FONT_SIZE, LINE_HEIGHT, etc). Overlays: EFFECT_COLOR. Opacity: OPACITY. Spacing/radius/stroke: `[]` |
| Brand | Default, Ocean, Forest | 13 | `[]` (camada-ponte, oculta dos pickers) |
| Theme | Light, Dark | 94 | Semânticos: FRAME_FILL/SHAPE_FILL, TEXT_FILL, STROKE_COLOR, GAP, CORNER_RADIUS, STROKE_FLOAT conforme o token |

**Regra de escopos:** Foundation e Brand ficam SEMPRE ocultos (`[]`) dos pickers. Designers selecionam apenas tokens do Theme. Exceções: tipografia (sem camada semântica), overlays e opacity.

---

## Convenções

### Prefixos

- CSS custom properties: `--ds-`
- Classes CSS: `.ds-`
- Classes de texto: `.ds-text-{category}-{size}` (display, heading, body, label, caption, overline, code)

### Naming de Variáveis Figma

Usam `/` como separador de grupo:
- `color/blue/500`, `spacing/16`, `radius/md`
- `background/default`, `text/secondary`, `border/brand`
- `brand/primary`, `brand/secondary`
- `space/inset-md`, `space/gap-lg`, `radius/component`

### Naming CSS

Usam `-` como separador:
- `--ds-color-blue-500`, `--ds-spacing-4`, `--ds-radius-md`
- `--ds-background-default`, `--ds-text-secondary`

---

## Regras Obrigatórias

### 1. Versionamento e Changelog

A cada alteração significativa (tokens, componentes, documentação):
1. **Figma Changelog** — nova seção na página "Changelog" (node 195:153)
2. **Figma Cover** — atualizar badge de versão + stats (node 185:3)
3. **package.json** — bumpar campo `version` (semver)

### 2. Documentação Bilíngue

- **Figma** — textos sempre em **português (PT-BR)**
- **Site GitHub Pages** (docs/) — bilíngue **PT-BR + EN** com seletor de idioma
- Termos técnicos universais (label, placeholder, padding, icon, focus ring) podem ficar em inglês no PT-BR

### 3. Contraste WCAG 2.2 AA — Obrigatório

Toda combinação foreground/background deve atingir **4.5:1** (texto normal) ou **3:1** (texto grande ≥24px / ≥18.66px bold):

- **`text/on-brand`** — deve ser branco em Light (fundo escuro) e **neutral-900 em Dark** (fundo claro 400-level)
- **`brand/*/foreground`** — mesma lógica: contrastar com o `default` do respectivo modo
- **`feedback/*/foreground`** — dark text (#0F172A) quando o feedback color é claro (400-level)
- **`feedback/info/foreground`** — usa neutral-900 em **ambos** os modos (sky-500 e sky-400 são claros demais para branco)

**Regra geral:** quando uma cor de fundo usa shade 400 ou mais claro, o foreground deve ser neutral-900. Quando usa shade 600 ou mais escuro, o foreground pode ser branco.

**Ao criar novos tokens de cor**, sempre calcular o contraste antes de commitar. Cores que funcionam em Light podem falhar em Dark (e vice-versa).

### 4. Escopos de Variáveis Figma

Ao criar novas variáveis:
- **Foundation colors/spacing/radius/stroke** → `[]` (ocultas)
- **Brand** → `[]` (ocultas)
- **Theme background/surface/feedback bg/state bg** → `["FRAME_FILL", "SHAPE_FILL"]`
- **Theme brand primary/secondary default/hover/active** → `["FRAME_FILL", "SHAPE_FILL", "STROKE_COLOR"]`
- **Theme text/foreground** → `["TEXT_FILL", "SHAPE_FILL"]`
- **Theme border colors** → `["STROKE_COLOR"]`
- **Theme border-width** → `["STROKE_FLOAT"]`
- **Theme spacing (space/*)** → `["GAP"]`
- **Theme radius** → `["CORNER_RADIUS"]`
- **Foundation tipografia** → escopos específicos (`FONT_SIZE`, `FONT_FAMILY`, etc.)
- NUNCA usar `ALL_SCOPES` — polui todos os pickers

### 4. Textos de Documentação no Figma — NUNCA hardcodar

Ao criar textos em páginas de documentação do Figma, **sempre** replicar o padrão das páginas existentes:

1. **Aplicar text style** — títulos usam `heading/sm`, corpo e bullets usam `body/md`
2. **Vincular fill a variável** — títulos: `text/default`, corpo/bullets: `text/secondary`
3. **Vincular propriedades tipográficas** — fontSize, fontFamily, fontWeight, letterSpacing devem vir do text style (que já referencia variáveis Foundation)
4. **Fills de shapes/dividers** — vincular a variáveis Theme (ex: `background/muted` para dividers)

**NUNCA** definir cores com valores RGB literais (ex: `{r: 0.06, g: 0.09, b: 0.16}`) — use `setBoundVariableForPaint()` para vincular à variável correta. Sem isso, a troca de tema/modo não funciona.

5. **Vincular espaçamentos a variáveis** — todo padding, gap e itemSpacing de frames de documentação DEVE usar `setBoundVariable()` com tokens de spacing Foundation (`spacing/0`, `spacing/4`, `spacing/8`, `spacing/12`, etc.)
6. **Layout sizing** — textos em parents com auto-layout VERTICAL devem usar `layoutSizingHorizontal = 'FILL'` (nunca FIXED). Frames filhos devem usar `layoutSizingHorizontal = 'FILL'` e `layoutSizingVertical = 'HUG'`.

**Como fazer no código:**
```js
// Text style + fill
const style = textStyles.find(s => s.name === 'body/md');
textNode.textStyleId = style.id;
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', textSecondary
);
textNode.fills = [paint];
textNode.textAutoResize = 'HEIGHT';
textNode.layoutSizingHorizontal = 'FILL';

// Spacing em frames (só vincular valores > 0)
const spacing12 = spacingVars.find(v => v.name === 'spacing/12');
frame.setBoundVariable('itemSpacing', spacing12);
// NÃO vincular padding 0 a spacing/0 — deixar o valor padrão
frame.layoutSizingHorizontal = 'FILL';
frame.layoutSizingVertical = 'HUG';
```

**Tokens de valor zero NÃO devem ser vinculados:** `spacing/0`, `radius/0`, `stroke/0` e `shadow-none` existem na Foundation como referência, mas nunca devem ser aplicados via `setBoundVariable()`. Zero é zero — não precisa de token. O mesmo vale para `--ds-spacing-0` e `--ds-shadow-none` no CSS.

### 5. Componentes Figma

- `clipsContent = false` em component sets — permitir visualização de focus rings
- Resize para abraçar todo o conteúdo incluindo overflow
- Textos default dos componentes em PT-BR (Rótulo, Texto auxiliar, Texto placeholder)

### 6. Documentação no Site (HTML) — usar tokens CSS

No site GitHub Pages, todo conteúdo deve usar custom properties do design system:
- Cores de texto: `var(--ds-text-default)`, `var(--ds-text-secondary)`
- Backgrounds: `var(--ds-surface-default)`, `var(--ds-background-subtle)`
- Bordas: `var(--ds-border-default)`
- Espaçamentos: `var(--ds-spacing-*)`
- Tipografia: `var(--ds-font-size-*)`, `var(--ds-font-weight-*)`
- Sombras: `var(--ds-shadow-*)`
- Radius: `var(--ds-radius-*)`
- **NUNCA** usar hex/rgb literais em inline styles — sempre custom properties

Seguir os padrões visuais existentes:
- Cards de navegação: `border: 1px solid var(--ds-border-default)`, `border-radius: var(--ds-radius-lg)`, hover com `var(--ds-shadow-md)`
- Blocos de código: `<pre><code>` (estilizado via reset.css — fundo `neutral-900`, texto `neutral-100`)
- Tabelas de classes: `<table class="ds-props-table">` com `<code>` inline para nomes de classes
- Previews de componentes: `<div class="ds-preview">` com tabs Preview/Code
- Notas de acessibilidade: `<div class="ds-a11y-note">`

### 7. Git / Deploy

- Repo: `uxindesign/design-system-core` (NÃO confundir com `design-system` que é o repo antigo)
- Branch: `main`
- Deploy: GitHub Pages (raiz `/`)
- URL: `https://uxindesign.github.io/design-system-core/docs/`
- Commitar e fazer push sem pedir permissão para ações óbvias

---

## Figma — Estrutura de Páginas

```
Cover                          ← capa com versão e stats
Getting Started                ← guia de uso
Theming                        ← documentação de temas
Accessibility                  ← WCAG 2.2 AA
Component Status               ← status de implementação
Changelog                      ← registro de versões
--- Foundations ---
Foundation — Colors            ← 10 paletas primitivas (neutral, blue, red, amber, green, purple, sky, cyan, emerald, indigo)
Theme — Colors                 ← tokens semânticos (background, surface, brand, text, border, feedback, state)
Typography                     ← 24 text styles
Spacing                        ← 20 foundation + semânticos
Radius                         ← 8 tokens
Elevation                      ← 5 níveis (effect styles)
Borders                        ← larguras + cores
--- Components ---
Button, Input Text, Textarea, Select, Checkbox, Radio, Toggle,
Badge, Alert, Card, Modal, Tooltip, Tabs, Breadcrumb,
Avatar, Divider, Spinner, Skeleton
Dark Mode Preview
--- Utilities ---
_Utilities                     ← 30 ícones Material Symbols
```

### Figma fileKey

`PRYS2kL7VdC1MtVWfZvuDN`

Usar com MCP tools: `mcp__figma__use_figma`, `mcp__figma__get_screenshot`, `mcp__figma__get_metadata`.
Sempre carregar a skill `figma:figma-use` antes de chamar `use_figma`.

---

## Componentes (18)

| Componente | CSS | Figma Page | Variantes |
|---|---|---|---|
| Button | button.css | Button | 60 |
| Input Text | input.css | Input Text | 18 |
| Textarea | textarea.css | Textarea | 18 |
| Select | select.css | Select | 18 |
| Checkbox | checkbox.css | Checkbox | 9 |
| Radio | radio.css | Radio | 6 |
| Toggle | toggle.css | Toggle | 6 |
| Badge | badge.css | Badge | 14 |
| Alert | alert.css | Alert | 8 |
| Card | card.css | Card | 3 |
| Modal | modal.css | Modal | 3 |
| Tooltip | tooltip.css | Tooltip | 4 |
| Tabs | tabs.css | Tabs | 4 |
| Breadcrumb | breadcrumb.css | Breadcrumb | 2 |
| Avatar | avatar.css | Avatar | — |
| Divider | divider.css | Divider | — |
| Spinner | spinner.css | Spinner | — |
| Skeleton | skeleton.css | Skeleton | — |

---

## Tipografia — 24 Text Styles

Categorias: display (2xl–sm), heading (xl–xs), body (lg–xs), label (lg–xs), caption (md–sm), overline (md–sm), code (md–sm).

Fontes: Inter (sans/display), DM Mono (mono).

Classes CSS: `.ds-text-display-2xl`, `.ds-text-heading-lg`, `.ds-text-body-md`, etc.

---

## Temas e Modos

### CSS — Ativação

```html
<!-- Default Light (padrão) -->
<html>

<!-- Ocean Dark -->
<html data-theme="ocean" data-mode="dark">

<!-- Forest Light -->
<html data-theme="forest">
```

### Figma — Ativação

- Modo Light/Dark: alternar modo da coleção **Theme** no frame pai
- Tema de marca: alternar modo da coleção **Brand** no frame pai

### Paletas por tema

| Tema | Primary | Secondary |
|---|---|---|
| Default | Blue | Purple |
| Ocean | Cyan | Indigo |
| Forest | Emerald | Amber |

---

## Checklist de Alterações

Antes de considerar uma tarefa concluída:

- [ ] CSS e Figma estão sincronizados? (valores resolvidos devem ser idênticos)
- [ ] Escopos das novas variáveis estão corretos?
- [ ] Textos do Figma estão em PT-BR?
- [ ] Página Theme Colors atualizada? (hex texts e swatches devem refletir os valores reais dos tokens)
- [ ] Contraste WCAG 2.2 AA verificado para novos pares foreground/background?
- [ ] Changelog atualizado (Figma)?
- [ ] Versão bumpada (Figma Cover + package.json)?
- [ ] Commit + push feitos?

---

## Princípios de Design

Os seguintes princípios orientam todas as decisões — de tokens a componentes a patterns.
Cada decisão que contradiga um princípio precisa de ADR justificando.

1. **Agnóstico de stack** — O DS é CSS puro + vanilla JS. Tokens em JSON (DTCG) transformados via Style Dictionary. Nenhuma decisão deve acoplar o DS a um framework específico.
2. **Consistência acima de velocidade** — Um componente mal especificado gera retrabalho no Figma e no código. Definir API antes de implementar.
3. **Acessibilidade desde o início** — WCAG 2.2 AA é piso, não teto. Não é "fase 2".
4. **Tokens como contrato** — Tokens são a cola entre Figma e código. Toda propriedade visual deve ser resolvida via token, nunca hardcoded.
5. **Decisão sem registro não existe** — Se não virou ADR em `docs/decisions/`, não foi decidida formalmente.

---

## Migração de Tokens: Foundation→Brand→Theme → Foundation→Semantic→Component

### Contexto

A arquitetura atual (Foundation→Brand→Theme) usa Brand como ponte entre 3 temas de cor (Default, Ocean, Forest). Na evolução para um DS de marca única, a camada Brand perde propósito como seletor multi-marca e passa a ser a camada semântica.

### Arquitetura alvo

```
Foundation (primitivos — valores brutos)
    ↓ referência
Semantic (intenção — surface, text, border, feedback, state)
    ↓ referência
Component (tokens específicos por componente — button.bg.default)
```

A camada Semantic herda a estrutura da atual Theme (94 vars) e absorve o que era Brand (13 vars). A camada Component é nova — não existia antes.

### Formato canônico: JSON (DTCG)

Tokens são definidos em JSON seguindo o formato Design Token Community Group (DTCG):
- `$value` para valores
- `$type` para tipo
- `$description` para documentação
- Referências com `{foundation.color.blue.500}`

Esses JSONs são transformados pelo Style Dictionary em:
- CSS custom properties (`--ds-*`) para o código web
- Figma Variables (via sync script ou `use_figma`)
- Futuramente: Swift, Kotlin, SCSS, ou o que a stack exigir

### Mapeamento de nomenclatura

| Contexto | Formato | Exemplo |
|----------|---------|---------|
| JSON (canônico) | `{nível}.{categoria}.{tipo}.{variante}` | `foundation.color.blue.500` |
| CSS (gerado) | `--ds-{categoria}-{tipo}-{variante}` | `--ds-color-blue-500` |
| Figma Variables | `{categoria}/{tipo}/{variante}` | `color/blue/500` |

Os 3 formatos representam o mesmo token — a transformação é automática via Style Dictionary.

### Referência: ADR-001

Ver `docs/decisions/ADR-001-migracao-tokens.md` para contexto completo da decisão.

---

## Style Dictionary

### Instalação

```bash
npm install style-dictionary @tokens-studio/sd-transforms
```

### Localização dos tokens

```
tokens/
├── foundation/
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   ├── radius.json
│   ├── shadows.json
│   └── opacity.json
├── semantic/
│   ├── light.json
│   └── dark.json
└── component/
    ├── button.json
    ├── input.json
    └── [componente].json
```

### Build

```bash
npx style-dictionary build
```

Output vai para `css/tokens/` (substituindo os CSS atuais escritos à mão).

---

## ADRs (Architecture Decision Records)

Toda decisão de arquitetura é registrada em `docs/decisions/ADR-NNN-titulo.md`.

Formato:
```markdown
# ADR-NNN: [Título]
**Data:** YYYY-MM-DD
**Status:** Proposta | Aceita | Substituída por ADR-NNN

## Contexto
## Decisão
## Consequências
## Alternativas consideradas
```

Ao trabalhar no Claude Code, ao final de cada decisão relevante, gerar o ADR e fazer commit.

---

## Brand Guidelines

Documento de marca em `brand/principles.md`. Contém:
- Missão
- Princípios de design (com exemplos e anti-padrões)
- Tom de voz
- Identidade visual (cores da marca, tipografia, logo)

Este documento alimenta tanto o Claude Project (Knowledge Base) quanto o doc site.

---

## Storybook

O DS usa Storybook com `@storybook/html` para playground interativo de componentes.

Cada componente tem um arquivo `.stories.js` co-locado:
```
components/
├── button/
│   ├── button.css          (pode ser symlink ou import do css/components/)
│   └── button.stories.js
```

Stories retornam HTML strings e usam argTypes para controls interativos.

---

## Referências de Design Systems

DSs consultados durante a construção deste sistema:

| DS | Organização | Referência principal |
|----|-------------|---------------------|
| Material Design 3 | Google | Arquitetura de tokens (ref→sys→comp) |
| Polaris | Shopify | Documentação de padrões, guidelines de conteúdo |
| Carbon | IBM | Tematização, spacing em mini-unit |
| Primer | GitHub | Color modes, naming funcional |
| Atlassian DS | Atlassian | Estados interativos, elevation |
| Lightning | Salesforce | Padrões de componentes enterprise |
| Spectrum | Adobe | Acessibilidade, tokens multi-plataforma |
| Fluent 2 | Microsoft | Cross-platform, design tokens |
| Base Web | Uber | Overrides system, composabilidade |
| Chakra UI | Community | API de props, variants system |

Notas detalhadas em `docs/references/ds-references.md`.
