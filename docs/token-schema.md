# Token schema — Design System Core

> Documentação canônica da arquitetura de tokens.
> Referência: ADR-001, ADR-005.

## Estado atual

| Aspecto | Status |
|---------|--------|
| Formato canônico | JSON (DTCG) em `tokens/` |
| CSS | Manual em `css/tokens/` — será gerado pelo Style Dictionary |
| Camadas | Foundation (217 tokens) → Semantic (104 tokens × 2 modos) → Component (vazio) |
| Foundation | 10 arquivos JSON: colors, brand, typography, spacing, radius, shadows, opacity, motion, stroke, z-index |
| Semantic | light.json + dark.json, mesmas chaves, valores diferentes por modo |
| Component | Diretório criado, sem tokens ainda |
| Figma | 3 coleções: Foundation, Brand (2 vars, modos por tema), Semantic (ex-Theme, modos Light/Dark) |

## Estrutura de diretórios

```
tokens/
├── foundation/
│   ├── colors.json         # 10 paletas × escala 50-950 + white, black, overlays (124 tokens)
│   ├── brand.json          # primary + secondary — ponte paleta→intenção (2 tokens)
│   ├── typography.json     # Inter (sans/display) + DM Mono, sizes, weights, line-heights (32 tokens)
│   ├── spacing.json        # Escala com half-steps: 0, 0-5, 1, 1-5 ... 24 (20 tokens)
│   ├── radius.json         # none, xs, sm, md, lg, xl, 2xl, full (8 tokens)
│   ├── shadows.json        # 7 níveis: xs, sm, md, lg, xl, 2xl, none (CSS strings, debt técnica)
│   ├── opacity.json        # 0, 5, 10, 25, 50, 75, 100 (7 tokens)
│   ├── motion.json         # duration (fast/normal/slow) + ease (default/in/out/in-out) (7 tokens)
│   ├── stroke.json         # border-width: 0, 1, 2, 4 (4 tokens)
│   └── z-index.json        # 0, 10, 20, 30, 40, 50 (6 tokens)
├── semantic/
│   ├── light.json          # 104 tokens, modo claro
│   └── dark.json           # 104 tokens, modo escuro
└── component/
    ├── README.md
    ├── button.json          # (futuro)
    ├── input.json           # (futuro)
    └── [componente].json
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
        "white": { "...mesma escala..." }
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
          "loose":   { "$type": "number", "$value": "1.75" }
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
semantic.color.primary.*   → brand primary states (default→{foundation.brand.primary}, hover, active, subtle, muted, foreground, text)
semantic.color.secondary.* → brand secondary/accent states (mesma estrutura)
semantic.feedback.*        → feedback colors (success/warning/error/info, cada com: default, hover, active, subtle, background, foreground, border, text)
semantic.border.*          → border colors (default, strong, subtle, focus, brand, error) + border.width (subtle, default, strong, focus)
semantic.focus.ring.*      → focus ring (width, offset, color — outline approach)
semantic.overlay.*         → overlay opacity levels (subtle, default, medium, strong)
semantic.state.*           → interactive states (hover, pressed, focus, disabled.background, disabled.foreground)
semantic.space.*           → spacing semântico (inset, gap, component, section — cada com xs/sm/md/lg/xl)
semantic.radius.*          → radius semântico (component)
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
        "text":       { "$type": "color", "$value": "{foundation.color.blue.700}" }
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

### Convenção `-default` no CSS (ADR-005)

Todo token `.default` gera sufixo `-default` no CSS. Sem exceção. O Style Dictionary faz geração direta: `path → name`.

Tokens que serão renomeados na migração CSS:
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

Tokens mode-invariant (mesmos valores em light e dark): todos os `space.*`, `radius.*`, `border.width.*`, `focus.ring.width`, `focus.ring.offset`.

## Component — camada futura

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
      "padding": {
        "sm": { "$type": "dimension", "$value": "{semantic.space.inset.sm}", "$description": "Button root padding Small" },
        "md": { "$type": "dimension", "$value": "{semantic.space.inset.md}" },
        "lg": { "$type": "dimension", "$value": "{semantic.space.inset.lg}" }
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
- Component tokens → herdam escopo da categoria semântica que referenciam
- NUNCA usar ALL_SCOPES
