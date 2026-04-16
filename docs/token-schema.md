# Token schema — Design System Core

> Knowledge Base do Claude Project.
> Define a estrutura canônica dos tokens na arquitetura alvo (Foundation→Semantic→Component).
> Referência: ADR-001, ADR-005, ADR-006, ADR-007.

## Estado atual

| Aspecto | Status |
|---------|--------|
| Formato canônico | JSON (DTCG) em `tokens/` |
| CSS | Gerado pelo Style Dictionary (build-tokens.mjs) em `css/tokens/generated/` |
| Camadas | Foundation (227 tokens) → Semantic (133 tokens × 2 modos) → Component (130 tokens em 11 arquivos) |
| Foundation | 10 arquivos JSON: colors (inclui 6 colored overlays ADR-007), brand, typography (inclui 3 control line-heights ADR-006), spacing (inclui spacing.11=44px), radius, shadows, opacity, motion, stroke, z-index |
| Semantic | light.json + dark.json, mesmas chaves, valores diferentes por modo. Inclui 19 control tokens (ADR-006) + 3 toned tokens (ADR-007) |
| Component | 11 arquivos: button (inclui toned color tokens), input, textarea, select, checkbox, radio, toggle, badge, alert, card, modal |
| Figma | 4 coleções: Foundation (~212 vars), Brand (2 vars, modos por tema), Semantic (~137 vars, modos Light/Dark), Component (~130 vars) |

## Estrutura de diretórios

```
tokens/
├── foundation/
│   ├── colors.json         # 10 paletas × escala 50-950 + white, black, overlays + colored overlays ADR-007 (~130 tokens)
│   ├── brand.json          # primary + secondary — ponte paleta→intenção (2 tokens)
│   ├── typography.json     # Inter (sans/display) + DM Mono, sizes, weights, line-heights + control line-heights ADR-006 (~35 tokens)
│   ├── spacing.json        # Escala com half-steps: 0, 0-5, 1, 1-5 ... 24 + spacing.11=44px (21 tokens)
│   ├── radius.json         # none, xs, sm, md, lg, xl, 2xl, full (8 tokens)
│   ├── shadows.json        # 7 níveis: xs, sm, md, lg, xl, 2xl, none (CSS strings, debt técnica)
│   ├── opacity.json        # 0, 5, 10, 25, 50, 75, 100 (7 tokens)
│   ├── motion.json         # duration (fast/normal/slow) + ease (default/in/out/in-out) (7 tokens)
│   ├── stroke.json         # border-width: 0, 1, 2, 4 (4 tokens)
│   └── z-index.json        # 0, 10, 20, 30, 40, 50 (6 tokens)
├── semantic/
│   ├── light.json          # ~137 tokens, modo claro (inclui 19 control + 3 toned)
│   └── dark.json           # ~137 tokens, modo escuro
└── component/
    ├── button.json          # ~28 tokens (inclui padding-x/y, toned bg/fg)
    ├── input.json           # 15 tokens
    ├── textarea.json        # 11 tokens
    ├── select.json          # 16 tokens
    ├── checkbox.json        # 14 tokens
    ├── radio.json           # 10 tokens
    ├── toggle.json          # 12 tokens
    ├── badge.json           # 9 tokens (avatar)
    ├── alert.json           # 9 tokens
    ├── card.json            # 6 tokens (modal)
    └── modal.json           # 6 tokens (spinner: 6, skeleton: 3 — via semantic direto)
```

## Foundation

Valores brutos sem opinião semântica. Únicos tokens com valores absolutos (hex, rem, px).

### Colors — 10 paletas + white/black + overlays

Cada paleta: escala de 50 a 950 (11 steps). White e black como tokens separados (não parte da escala neutral). Overlays em rgba com opacidade de 5 a 80.

```json
{
  "foundation": {
    "color": {
      "neutral": {
        "50":  { "$type": "color", "$value": "#F8FAFC" },
        "100": { "$type": "color", "$value": "#F1F5F9" },
        "...": "escala completa até 950",
        "950": { "$type": "color", "$value": "#020617" }
      },
      "blue": { "...50-950..." },
      "purple": { "..." },
      "red": { "..." },
      "amber": { "..." },
      "green": { "..." },
      "sky": { "..." },
      "cyan": { "..." },
      "emerald": { "..." },
      "indigo": { "..." },
      "white": { "$type": "color", "$value": "#FFFFFF" },
      "black": { "$type": "color", "$value": "#000000" },
      "overlay": {
        "black": {
          "5":  { "$type": "color", "$value": "rgba(0, 0, 0, 0.05)" },
          "10": { "$type": "color", "$value": "rgba(0, 0, 0, 0.1)" },
          "...": "20, 40, 60, 80"
        },
        "white": { "...mesma escala..." },
        "blue-600": {
          "$description": "Colored overlays for toned variants (light mode). ADR-007.",
          "12": { "$type": "color", "$value": "rgba(37, 99, 235, 0.12)" },
          "20": { "$type": "color", "$value": "rgba(37, 99, 235, 0.20)" },
          "28": { "$type": "color", "$value": "rgba(37, 99, 235, 0.28)" }
        },
        "blue-400": {
          "$description": "Colored overlays for toned variants (dark mode). ADR-007.",
          "15": { "$type": "color", "$value": "rgba(96, 165, 250, 0.15)" },
          "25": { "$type": "color", "$value": "rgba(96, 165, 250, 0.25)" },
          "32": { "$type": "color", "$value": "rgba(96, 165, 250, 0.32)" }
        }
      }
    }
  }
}
```

### Brand — subcamada de identidade (ADR-005)

Ponte entre paleta e intenção. Valor bruto, sem estados.

```json
{
  "foundation": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "{foundation.color.blue.600}",
        "$description": "Cor base da marca. Alimenta semantic.color.primary.default."
      },
      "secondary": {
        "$type": "color",
        "$value": "{foundation.color.purple.600}",
        "$description": "Cor de acento. Alimenta semantic.color.secondary.default."
      }
    }
  }
}
```

Regras:
- Sem estados. Nenhum `.hover`, `.active`, `.subtle` nesta camada.
- `semantic.color.primary.default` referencia `{foundation.brand.primary}`
- Os demais estados semânticos (hover, active, etc) referenciam a paleta foundation diretamente
- Troca de tema: brand.json é substituído (ex: `brand-ocean.json` com cyan/indigo)
- No dark mode, brand resolve pra shade diferente via source file alternativo (`brand-dark.json`)
- No Figma, Brand é coleção separada com modos por tema (Default, Ocean, Forest)

### Typography — Inter + DM Mono

Fontes: Inter (sans e display, mesma família por ora), DM Mono (mono).
Escala de sizes em t-shirt: 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl.

```json
{
  "foundation": {
    "typography": {
      "font": {
        "family": {
          "sans": { "$type": "fontFamily", "$value": "'Inter', system-ui, ..." },
          "mono": { "$type": "fontFamily", "$value": "'DM Mono', ..." },
          "display": {
            "$type": "fontFamily",
            "$value": "'Inter', system-ui, ...",
            "$description": "Same as sans. Separated for future flexibility if display font diverges."
          }
        },
        "size": {
          "2xs": { "$type": "dimension", "$value": "0.6875rem" },
          "xs":  { "$type": "dimension", "$value": "0.75rem" },
          "sm":  { "$type": "dimension", "$value": "0.875rem" },
          "md":  { "$type": "dimension", "$value": "1rem" },
          "lg":  { "$type": "dimension", "$value": "1.125rem" },
          "...": "até 9xl"
        },
        "weight": {
          "regular":  { "$type": "number", "$value": "400" },
          "medium":   { "$type": "number", "$value": "500" },
          "semibold": { "$type": "number", "$value": "600" },
          "bold":     { "$type": "number", "$value": "700" }
        }
      },
      "line": {
        "height": {
          "none":    { "$type": "number", "$value": "1" },
          "tight":   { "$type": "number", "$value": "1.25" },
          "snug":    { "$type": "number", "$value": "1.375" },
          "normal":  { "$type": "number", "$value": "1.5" },
          "relaxed": { "$type": "number", "$value": "1.625" },
          "loose":   { "$type": "number", "$value": "1.75" },
          "control": {
            "sm": { "$type": "dimension", "$value": "1rem", "$description": "16px — matches icon-size sm. ADR-006." },
            "md": { "$type": "dimension", "$value": "1.25rem", "$description": "20px — matches icon-size md. ADR-006." },
            "lg": { "$type": "dimension", "$value": "1.5rem", "$description": "24px — matches icon-size lg. ADR-006." }
          }
        }
      },
      "letter": {
        "spacing": {
          "tighter": { "$type": "dimension", "$value": "-0.05em" },
          "tight":   { "$type": "dimension", "$value": "-0.025em" },
          "normal":  { "$type": "dimension", "$value": "0" },
          "wide":    { "$type": "dimension", "$value": "0.025em" },
          "wider":   { "$type": "dimension", "$value": "0.05em" }
        }
      }
    }
  }
}
```

### Spacing — escala com half-steps

Escala base 4px com intermediários. Keys com hífen pra half-steps (ex: `0-5` = 2px).

| Key | rem | px |
|-----|-----|----|
| 0 | 0 | 0 |
| 0-5 | 0.125 | 2 |
| 1 | 0.25 | 4 |
| 1-5 | 0.375 | 6 |
| 2 | 0.5 | 8 |
| 2-5 | 0.625 | 10 |
| 3 | 0.75 | 12 |
| 3-5 | 0.875 | 14 |
| 4 | 1 | 16 |
| 5 | 1.25 | 20 |
| 6 | 1.5 | 24 |
| 7 | 1.75 | 28 |
| 8 | 2 | 32 |
| 9 | 2.25 | 36 |
| 10 | 2.5 | 40 |
| 11 | 2.75 | 44 |
| 12 | 3 | 48 |
| 14 | 3.5 | 56 |
| 16 | 4 | 64 |
| 20 | 5 | 80 |
| 24 | 6 | 96 |

### Shadows — CSS strings (debt técnica)

Valores como CSS shorthand strings por enquanto. Converter pra objetos DTCG `{offsetX, offsetY, blur, spread, color}` quando pipeline multi-plataforma for configurada.

### Opacity

Escala: 0, 5, 10, 25, 50, 75, 100. Valores como `$type: "number"`.

## Semantic

Camada de intenção. Referencia foundation via aliases. Modos Light e Dark com mesmas chaves, valores diferentes.

### Categorias

```
semantic.background.*      → page backgrounds (default, subtle, muted, inverse, overlay)
semantic.surface.*         → component surfaces (default, raised, overlay, elevated)
semantic.text.*            → text colors (default, secondary, tertiary, disabled, inverse, on-brand, link.default, link.hover)
semantic.color.primary.*   → brand primary states (default→{foundation.brand.primary}, hover, active, subtle, muted, foreground, text, toned.{default,hover,active} ADR-007)
semantic.color.secondary.* → brand secondary/accent states (mesma estrutura, sem toned por ora)
semantic.feedback.*        → feedback colors (success/warning/error/info, cada com: default, hover, active, subtle, background, foreground, border, text)
semantic.border.*          → border colors (default, strong, subtle, focus, brand, error) + border.width (subtle, default, strong, focus)
semantic.focus.ring.*      → focus ring (width, offset, color — outline approach)
semantic.overlay.*         → overlay opacity levels (subtle, default, medium, strong)
semantic.state.*           → interactive states (hover, pressed, focus, disabled.background, disabled.foreground)
semantic.space.*           → spacing semântico (inset, gap, component, section — cada com xs/sm/md/lg/xl) + control.padding-x/y.{sm/md/lg} (ADR-006)
semantic.radius.*          → radius semântico (component)
semantic.size.control.*    → heights e icon sizes compartilhados por controles interativos (ADR-006): sm=32, md=40, lg=48, icon.sm=16, icon.md=20, icon.lg=24, min-target=44
semantic.typography.control.* → font-size e line-height para texto single-line em controles (ADR-006): font-size sm/md=14px, lg=16px; line-height sm=16, md=20, lg=24
```

### Relação com brand

`semantic.color.primary.default` é o único token que referencia `{foundation.brand.primary}`. Todos os outros estados referenciam a paleta foundation diretamente:

```json
{
  "semantic": {
    "color": {
      "primary": {
        "default":    { "$type": "color", "$value": "{foundation.brand.primary}" },
        "hover":      { "$type": "color", "$value": "{foundation.color.blue.700}" },
        "active":     { "$type": "color", "$value": "{foundation.color.blue.800}" },
        "subtle":     { "$type": "color", "$value": "{foundation.color.blue.100}" },
        "muted":      { "$type": "color", "$value": "{foundation.color.blue.50}" },
        "foreground": { "$type": "color", "$value": "{foundation.color.white}" },
        "text":       { "$type": "color", "$value": "{foundation.color.blue.700}" },
        "toned": {
          "default": { "$type": "color", "$value": "{foundation.color.overlay.blue-600.12}", "$description": "Translucent primary bg. 12% opacity. ADR-007." },
          "hover":   { "$type": "color", "$value": "{foundation.color.overlay.blue-600.20}" },
          "active":  { "$type": "color", "$value": "{foundation.color.overlay.blue-600.28}" }
        }
      }
    }
  }
}
```

### Focus ring — outline approach (ADR-005)

Implementado como `outline` + `outline-offset`, não box-shadow. Compatível com forced-colors mode (WCAG 2.2). Mapeia 1:1 com o frame absoluto no Figma (2px stroke, 2px gap).

```json
{
  "semantic": {
    "focus": {
      "ring": {
        "width":  { "$type": "dimension", "$value": "{foundation.border.width.2}", "$description": "Focus ring stroke width (2px)" },
        "offset": { "$type": "dimension", "$value": "{foundation.border.width.2}", "$description": "Gap between element and focus ring (2px)" },
        "color":  { "$type": "color", "$value": "{semantic.border.focus}", "$description": "Focus ring color, maps to outline-color" }
      }
    }
  }
}
```

CSS consumo:
```css
:focus-visible {
  outline: var(--ds-focus-ring-width) solid var(--ds-focus-ring-color);
  outline-offset: var(--ds-focus-ring-offset);
}
```

### Control tokens — dimensões compartilhadas (ADR-006)

Button, Input, Select e Textarea compartilham tokens dimensionais na camada semântica. A fórmula é `height = padding-y × 2 + line-height`.

| Property | Small | Medium | Large | CSS variable |
|----------|-------|--------|-------|-------------|
| Height | 32px | 40px | 48px | `--ds-size-control-{sm/md/lg}` |
| Padding-x | 12px | 16px | 20px | `--ds-space-control-padding-x-{sm/md/lg}` |
| Padding-y | 8px | 10px | 12px | `--ds-space-control-padding-y-{sm/md/lg}` |
| Font-size | 14px | 14px | 16px | `--ds-typography-control-font-size-{sm/md/lg}` |
| Line-height | 16px | 20px | 24px | `--ds-typography-control-line-height-{sm/md/lg}` |
| Icon size | 16px | 20px | 24px | `--ds-size-control-icon-{sm/md/lg}` |
| Min target | 44px | 44px | 44px | `--ds-size-control-min-target` |

Regras:
- `size.control.*` e `typography.control.line-height.*` usam valores absolutos em rem (sem ref a foundation, pois são dimensões compostas)
- `space.control.padding-x/y.*` referenciam `foundation.spacing.*`
- `typography.control.font-size.*` referenciam `foundation.typography.font.size.*`
- Component tokens (`button.height.*`, `input.height.*`) referenciam os control tokens
- Textarea compartilha padding-x e padding-y mas **não** height nem line-height (multi-line)

### Toned colors — overlays coloridos (ADR-007)

Toned usa transparência (foundation overlays coloridos), diferente de `subtle` (opaque blue-100) e `muted` (opaque blue-50).

| Pattern | Visual | Tipo |
|---------|--------|------|
| `color.primary.subtle` | Opaque light blue | Opaque |
| `color.primary.muted` | Opaque lighter blue | Opaque |
| `color.primary.toned.*` | Translucent blue (12-28%) | Transparent |

Em dark mode, os valores usam blue-400 (shade mais clara) com alphas ligeiramente maiores (15/25/32%).

Disabled toned: usa `semantic.state.disabled.background/foreground` (opaco neutro) — não tokens toned-disabled específicos. Os antigos `toned-disabled` e `toned-disabled-fg` foram removidos.

Extensibilidade: quando Alert Toned ou Badge Toned forem necessários, adicionar `foundation.color.overlay.{palette}.{alpha}` e `semantic.feedback.{type}.toned.*` seguindo o mesmo pattern.

### Convenção `-default` no CSS (ADR-005)

Todo token `.default` gera sufixo `-default` no CSS. Sem exceção. O Style Dictionary faz geração direta: `path → name`.

Tokens renomeados na migração CSS (commit 549d8ad):
- `--ds-color-primary` → `--ds-color-primary-default`
- `--ds-color-secondary` → `--ds-color-secondary-default`
- `--ds-feedback-success` → `--ds-feedback-success-default`
- `--ds-feedback-warning` → `--ds-feedback-warning-default`
- `--ds-feedback-error` → `--ds-feedback-error-default`
- `--ds-feedback-info` → `--ds-feedback-info-default`
- `--ds-text-link` → `--ds-text-link-default`

Tokens que já usam `-default` (sem mudança): `--ds-background-default`, `--ds-text-default`, `--ds-surface-default`, `--ds-border-default`, `--ds-overlay-default`.

### Mapeamento Light/Dark

Mesmas chaves, valores diferentes. Exemplos de inversão:

| Token | Light | Dark |
|-------|-------|------|
| `background.default` | `{foundation.color.white}` | `{foundation.color.neutral.950}` |
| `text.default` | `{foundation.color.neutral.900}` | `{foundation.color.neutral.50}` |
| `color.primary.default` | `{foundation.brand.primary}` | `{foundation.brand.primary}` |
| `color.primary.hover` | `{foundation.color.blue.700}` | `{foundation.color.blue.300}` |
| `state.hover` | `{foundation.color.overlay.black.5}` | `{foundation.color.overlay.white.5}` |
| `text.on-brand` | `{foundation.color.white}` | `{foundation.color.neutral.900}` |
| `color.primary.toned.default` | `{foundation.color.overlay.blue-600.12}` | `{foundation.color.overlay.blue-400.15}` |
| `color.primary.toned.hover` | `{foundation.color.overlay.blue-600.20}` | `{foundation.color.overlay.blue-400.25}` |

Tokens mode-invariant (mesmos valores em light e dark): todos os `space.*`, `radius.*`, `border.width.*`, `focus.ring.*`, `size.control.*`, `space.control.*`, `typography.control.*`.

## Component

Tokens específicos por componente. Referenciam semantic, nunca foundation (exceção documentada na regra 1).

```json
{
  "component": {
    "button": {
      "background": {
        "brand": {
          "default":  { "$type": "color", "$value": "{semantic.color.primary.default}" },
          "hover":    { "$type": "color", "$value": "{semantic.color.primary.hover}" },
          "active":   { "$type": "color", "$value": "{semantic.color.primary.active}" },
          "disabled": { "$type": "color", "$value": "{semantic.state.disabled.background}" }
        },
        "danger": {
          "default":  { "$type": "color", "$value": "{semantic.feedback.error.default}" }
        },
        "success": {
          "default":  { "$type": "color", "$value": "{semantic.feedback.success.default}" }
        }
      },
      "foreground": {
        "brand": {
          "default":  { "$type": "color", "$value": "{semantic.color.primary.foreground}" }
        }
      },
      "border-radius": {
        "$type": "dimension",
        "$value": "{semantic.radius.component}"
      },
      "height": {
        "sm": { "$type": "dimension", "$value": "{semantic.size.control.sm}", "$description": "32px" },
        "md": { "$type": "dimension", "$value": "{semantic.size.control.md}", "$description": "40px" },
        "lg": { "$type": "dimension", "$value": "{semantic.size.control.lg}", "$description": "48px" }
      },
      "padding-x": {
        "sm": { "$type": "dimension", "$value": "{semantic.space.control.padding-x.sm}", "$description": "12px" },
        "md": { "$type": "dimension", "$value": "{semantic.space.control.padding-x.md}", "$description": "16px" },
        "lg": { "$type": "dimension", "$value": "{semantic.space.control.padding-x.lg}", "$description": "20px" }
      },
      "padding-y": {
        "sm": { "$type": "dimension", "$value": "{semantic.space.control.padding-y.sm}", "$description": "8px" },
        "md": { "$type": "dimension", "$value": "{semantic.space.control.padding-y.md}", "$description": "10px" },
        "lg": { "$type": "dimension", "$value": "{semantic.space.control.padding-y.lg}", "$description": "12px" }
      },
      "background": {
        "toned": {
          "default":  { "$type": "color", "$value": "{semantic.color.primary.toned.default}" },
          "hover":    { "$type": "color", "$value": "{semantic.color.primary.toned.hover}" },
          "active":   { "$type": "color", "$value": "{semantic.color.primary.toned.active}" },
          "disabled": { "$type": "color", "$value": "{semantic.state.disabled.background}" }
        }
      }
    }
  }
}
```

## Regras invioláveis

1. **Component tokens referenciam Semantic, nunca Foundation** (exceção: estados hover/active que precisam de step específico da paleta)
2. **Semantic tokens referenciam Foundation, nunca hardcoded** — nenhum rgba() ou hex direto na camada semantic
3. **Foundation tokens são os únicos com valores absolutos**
4. **Brand é foundation** — 2 tokens (primary, secondary), sem estados, ponto de troca por tema
5. **Todo token tem $type** conforme DTCG spec
6. **Todo token novo ou com decisão não óbvia tem $description**
7. **Tokens de valor zero existem na Foundation mas NUNCA são vinculados via setBoundVariable() no Figma**
8. **Novos tokens que criam nova categoria ou quebram hierarquia exigem ADR**
9. **light.json e dark.json devem ter exatamente o mesmo conjunto de chaves**
10. **Todo `.default` gera `-default` no CSS** — sem exceção, sem transforms de colapso

## Comunicação com Figma

| JSON (canônico) | CSS (gerado) | Figma Variables |
|-----------------|-------------|-----------------|
| `foundation.color.blue.500` | `--ds-color-blue-500` | `color/blue/500` (Foundation) |
| `foundation.brand.primary` | `--ds-brand-primary` | `brand/primary` (Brand, com modos) |
| `semantic.color.primary.default` | `--ds-color-primary-default` | `color/primary/default` (Semantic) |
| `semantic.focus.ring.width` | `--ds-focus-ring-width` | `focus/ring/width` (Semantic) |
| `semantic.space.inset.md` | `--ds-space-inset-md` | `space/inset/md` (Semantic) |
| `component.button.background.brand.default` | `--ds-button-bg-brand-default` | `button/background/brand/default` (Component) |
| `semantic.size.control.md` | `--ds-size-control-md` | `size/control/md` (Semantic) |
| `semantic.space.control.padding-x.md` | `--ds-space-control-padding-x-md` | `space/control/padding-x/md` (Semantic) |
| `semantic.color.primary.toned.default` | `--ds-color-primary-toned-default` | `color/primary/toned/default` (Semantic) |
| `foundation.color.overlay.blue-600.12` | `--ds-overlay-blue-600-12` | `color/overlay/blue-600/12` (Foundation) |

A transformação JSON→CSS é feita pelo Style Dictionary (path → name, sem transforms customizados).
A transformação JSON→Figma Variables é feita via script ou use_figma.

### Escopos no Figma (preservar regras existentes)

- Foundation colors/spacing/radius/stroke → `[]` (ocultas dos pickers)
- Foundation brand → `[]` (ocultas; Semantic expõe via alias)
- Semantic background/surface → `["FRAME_FILL", "SHAPE_FILL"]`
- Semantic text/foreground → `["TEXT_FILL", "SHAPE_FILL"]`
- Semantic border → `["STROKE_COLOR"]`
- Semantic spacing → `["GAP"]`
- Semantic radius → `["CORNER_RADIUS"]`
- Semantic size.control/space.control/typography.control → `[]` (hidden — consumidos via component tokens)
- Semantic color.primary.toned.* → `["FRAME_FILL", "SHAPE_FILL"]`
- Foundation color.overlay.blue-* → `[]` (hidden — consumidos via semantic toned)
- Component tokens → herdam escopo da categoria semântica que referenciam
- NUNCA usar ALL_SCOPES