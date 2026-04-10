# Design System — Guia para Claude Code

## Visão Geral

Design system white-label com tokens semânticos, 18 componentes, modos Light/Dark e 3 temas de marca (Default, Ocean, Forest). Mantido em dois artefatos sincronizados:

- **CSS** — este repositório (`uxindesign/design-system-core`, branch `main`)
- **Figma** — https://www.figma.com/design/PRYS2kL7VdC1MtVWfZvuDN

Site de documentação: https://uxindesign.github.io/design-system-core/docs/index.html

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

// Spacing em frames
const spacing12 = spacingVars.find(v => v.name === 'spacing/12');
frame.setBoundVariable('itemSpacing', spacing12);
frame.setBoundVariable('paddingTop', spacing0);
frame.layoutSizingHorizontal = 'FILL';
frame.layoutSizingVertical = 'HUG';
```

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

- [ ] CSS e Figma estão sincronizados?
- [ ] Escopos das novas variáveis estão corretos?
- [ ] Textos do Figma estão em PT-BR?
- [ ] Changelog atualizado (Figma)?
- [ ] Versão bumpada (Figma Cover + package.json)?
- [ ] Commit + push feitos?
