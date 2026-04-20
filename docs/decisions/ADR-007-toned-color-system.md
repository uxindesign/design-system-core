# ADR-007: Establish toned color system with colored overlays and semantic toned tokens
**Date:** 2026-04-15
**Status:** Proposed

## Pré-requisitos

- ADR-005 implementada (naming do brand consolidado).
- ADR-011 implementada (estrutura `brand/toned/*` já está em vigor no JSON).

## Estimativa de esforço

3 horas. 1h para adicionar os tokens de overlay colorido em `foundation/colors.json` (já presentes parcialmente — ver note abaixo), 1h para completar os tokens semânticos `brand.toned.*` nos dois modos (parte já implementada via ADR-011), 30min para atualizar `tokens/component/button.json` com os bindings corretos, 30min para Figma e validação.

**Estado atual do código.** Em `tokens/foundation/colors.json` já existem `foundation.color.overlay.blue-600.{12,20,28}` e `overlay.blue-400.{15,25,32}`. `tokens/semantic/light.json` e `dark.json` já têm `semantic.brand.toned.{default,hover,active}` apontando para esses overlays. A implementação está quase pronta; ADR-007 só precisa ser fechada formalmente depois que ADR-005 consolidar o naming.

## Passos concretos para sair do estado Proposta

1. Revisar `tokens/foundation/colors.json` e confirmar que os 6 overlays coloridos cobrem todos os estados (default/hover/active em light e dark).
2. Adicionar tokens equivalentes para feedback se e quando Alert ganhar variante toned (adiamento intencional — só implementar quando houver uso concreto).
3. Atualizar `tokens/component/button.json` garantindo que `button.background.toned.*` referencia `{semantic.brand.toned.*}` (não `rgba` literal).
4. No Figma, renomear variáveis flat (`color/primary/toned`, `-hover`, `-active`) para a hierarquia aninhada (`color/primary/toned/default`, `/hover`, `/active`).
5. Remover `color/primary/toned-disabled` e `color/primary/toned-disabled-fg` do Figma; Button Toned disabled passa a consumir `state/disabled/*`.
6. Executar `npm run build:tokens` e `npm run verify:tokens` para confirmar sincronia.
7. Documentar como mudança estrutural (não breaking visual). Bump patch.

## Context

The Button component has a "Toned" style variant that uses a translucent colored background (primary color at ~12% opacity). This variant already exists in the Figma file with 5 variables in the Semantic collection:

| Variable | Light | Dark |
|----------|-------|------|
| `color/primary/toned` | rgba(37,99,235, 0.12) | rgba(96,165,250, 0.15) |
| `color/primary/toned-hover` | rgba(37,99,235, 0.20) | rgba(96,165,250, 0.25) |
| `color/primary/toned-active` | rgba(37,99,235, 0.28) | rgba(96,165,250, 0.32) |
| `color/primary/toned-disabled` | rgba(219,226,240, 0.50) | rgba(43,48,55, 1.00) |
| `color/primary/toned-disabled-fg` | rgba(140,164,217, 0.50) | rgba(255,255,255, 0.60) |

Problems:
1. These tokens exist in Figma but **not in the canonical JSON**, violating the principle that JSON is the source of truth.
2. The semantic tokens contain raw rgba values instead of referencing foundation, violating rule 2 (semantic never hardcoded).
3. The existing semantic tokens `*.subtle` and `*.muted` use opaque colors (e.g., blue.100, blue.50), which is a different concept. Toned uses transparency, allowing the background surface to show through — crucial for layered UI.
4. The Alert component also has a "Subtle" style that uses opaque light backgrounds. If an Alert "Toned" or "Inline" variant is needed in the future, the same colored overlay pattern would apply to feedback colors (success, warning, error, info).
5. The foundation layer already has `overlay.black.{5,10,20,40,60,80}` and `overlay.white.{...}` — colored overlays are the natural extension of this pattern.

## Decision

### 1. Extend foundation overlays with colored variants

Add colored overlay tokens to `tokens/foundation/colors.json` following the existing `overlay.black` and `overlay.white` pattern:

```
foundation.color.overlay.primary.{alpha-step}
```

Where the base color in Light mode comes from `foundation.brand.primary` (blue-600) and in Dark mode from the dark-mode equivalent (blue-400). The alpha steps match the existing toned usage: 12, 15, 20, 25, 28, 32.

However, since foundation tokens must have absolute values (rule 3) and brand.primary is already an alias, the colored overlays use the resolved palette values directly:

```json
// In colors.json
"foundation.color.overlay.blue-600.12":  { "$type": "color", "$value": "rgba(37, 99, 235, 0.12)" }
"foundation.color.overlay.blue-600.20":  { "$type": "color", "$value": "rgba(37, 99, 235, 0.20)" }
"foundation.color.overlay.blue-600.28":  { "$type": "color", "$value": "rgba(37, 99, 235, 0.28)" }
"foundation.color.overlay.blue-400.15":  { "$type": "color", "$value": "rgba(96, 165, 250, 0.15)" }
"foundation.color.overlay.blue-400.25":  { "$type": "color", "$value": "rgba(96, 165, 250, 0.25)" }
"foundation.color.overlay.blue-400.32":  { "$type": "color", "$value": "rgba(96, 165, 250, 0.32)" }
```

For feedback colors, add as needed (not now — expand when Alert Toned or similar component requires it):
```
foundation.color.overlay.red-500.12    (error toned)
foundation.color.overlay.green-500.12  (success toned)
foundation.color.overlay.amber-500.12  (warning toned)
foundation.color.overlay.blue-500.12   (info toned)
```

### 2. Create semantic toned tokens in light.json and dark.json

```json
// In light.json
"semantic.color.primary.toned.default":  { "$value": "{foundation.color.overlay.blue-600.12}" }
"semantic.color.primary.toned.hover":    { "$value": "{foundation.color.overlay.blue-600.20}" }
"semantic.color.primary.toned.active":   { "$value": "{foundation.color.overlay.blue-600.28}" }

// In dark.json
"semantic.color.primary.toned.default":  { "$value": "{foundation.color.overlay.blue-400.15}" }
"semantic.color.primary.toned.hover":    { "$value": "{foundation.color.overlay.blue-400.25}" }
"semantic.color.primary.toned.active":   { "$value": "{foundation.color.overlay.blue-400.32}" }
```

For toned disabled states, reuse existing semantic tokens:
- `component.button.background.toned.disabled` → `{semantic.state.disabled.background}` (opaque neutral)
- `component.button.foreground.toned.disabled` → `{semantic.state.disabled.foreground}` (opaque neutral)

This avoids creating translucent disabled tokens — disabled state doesn't need the toned transparency effect, and an opaque neutral disabled state is clearer for accessibility.

The existing Figma variables `color/primary/toned-disabled` and `color/primary/toned-disabled-fg` use non-standard values (not from the palette). These will be deprecated in Figma and replaced with bindings to `state/disabled/background` and `state/disabled/foreground` on the component level.

### 3. Text color for toned variants

The foreground (text/icon) of toned variants reuses the existing `semantic.color.primary.text` (blue-700 in light, blue-300 in dark). No new token needed for this — `color.primary.text` already exists and is the correct semantic choice for text on a translucent primary background.

### 4. Future expansion: feedback toned

When a toned variant is needed for Alert, Badge, or other feedback components:
1. Add `foundation.color.overlay.{palette}.{alpha}` tokens for the relevant feedback palette
2. Add `semantic.feedback.{type}.toned.{state}` tokens in light.json and dark.json
3. Add component tokens as needed
4. Foreground uses the existing `semantic.feedback.{type}.text` token (or `foreground` for high-contrast needs)

This follows the same three-layer pattern, no architectural changes needed.

### 5. Naming convention for toned

In the semantic layer, toned states nest under the parent color group:

```
semantic.color.primary.default       (opaque, 100%)
semantic.color.primary.hover         (opaque, darker)
semantic.color.primary.subtle        (opaque, palette step 100)
semantic.color.primary.muted         (opaque, palette step 50)
semantic.color.primary.toned.default (transparent, ~12%)
semantic.color.primary.toned.hover   (transparent, ~20%)
semantic.color.primary.toned.active  (transparent, ~28%)
```

The `.toned` namespace makes the distinction clear: toned = transparent, subtle/muted = opaque light.

In Figma, the existing variables are flat: `color/primary/toned`, `color/primary/toned-hover`. These should be restructured to `color/primary/toned/default`, `color/primary/toned/hover`, `color/primary/toned/active` to match the JSON hierarchy.

In CSS, generated as: `--ds-color-primary-toned-default`, `--ds-color-primary-toned-hover`, `--ds-color-primary-toned-active`.

## Consequences

- **Tokens (Foundation):** +6 colored overlay tokens in colors.json (blue-600 × 3 alphas + blue-400 × 3 alphas). More added when feedback toned is implemented.
- **Tokens (Semantic):** +3 tokens per mode (toned.default, toned.hover, toned.active) in light.json and dark.json. Total +6. Removal of toned-disabled and toned-disabled-fg from semantic (moved to component level referencing existing disabled tokens).
- **Tokens (Component):** button.json gains `background.toned.{default/hover/active/disabled}` and `foreground.toned.{default/disabled}` referencing the new semantic tokens.
- **CSS:** New variables `--ds-color-primary-toned-default/hover/active`. New `--ds-overlay-blue-600-12/20/28`, `--ds-overlay-blue-400-15/25/32`.
- **Figma:** Rename `color/primary/toned` → `color/primary/toned/default` (and hover, active). Delete `color/primary/toned-disabled` and `color/primary/toned-disabled-fg`. Update Button bindings to reference the renamed variables. The actual rgba values stay the same — this is a structural change, not visual.
- **Docs:** New subsection in color documentation: "Toned colors". Button docs updated to explain toned vs subtle/muted distinction. token-schema.md updated with the toned pattern.
- **Breaking changes:** Figma variable rename from flat to nested. No CSS breaking change (these variables didn't exist in CSS before).

## Alternatives considered

**A) Use semantic.color.primary.subtle/muted for toned variants.** Discarded because subtle (blue-100) and muted (blue-50) are opaque. Toned requires transparency to layer over varying surface colors. The visual and functional distinction is real.

**B) Put rgba values directly in the semantic layer without foundation overlays.** Discarded because it violates rule 2 (semantic tokens never contain hardcoded values). The foundation overlay layer provides raw values; semantic gives them intent.

**C) Create a separate "Toned" Figma variable collection.** Discarded because toned is a state/variant of the primary color, not a separate system. It belongs in the same Semantic collection alongside default, hover, subtle, etc.

**D) Use CSS opacity property instead of rgba alpha.** Discarded because CSS opacity affects the entire element including text and children. rgba alpha on the background only affects the fill, leaving text at full opacity — which is the intended behavior.
