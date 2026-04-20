# ADR-006: Adopt semantic control tokens for shared dimensions and typography across interactive controls
**Date:** 2026-04-15
**Status:** Proposed

## Pré-requisitos

- ADR-005 implementada (foundation/brand.json existe, convenção `-default` consolidada).
- Verificação Figma ↔ JSON em CI (ADR-003, 0.5.1).

## Estimativa de esforço

4 horas. 1h para adicionar os tokens semânticos control em `light.json` e `dark.json`, 1h30 para atualizar `tokens/component/button.json`, `input.json`, `select.json`, `textarea.json` para referenciar os novos tokens semânticos, 1h para normalizar dimensões dos componentes no Figma, 30min para build, verificação e validação visual.

## Passos concretos para sair do estado Proposta

1. Adicionar `semantic.typography.control.*`, `semantic.size.control.*`, `semantic.space.control.*` em `tokens/semantic/light.json` e `dark.json` (mesmos valores em ambos os modos).
2. Adicionar `foundation.dimension.min-target` (2.75rem/44px) em `tokens/foundation/` se o token não existir.
3. Atualizar `tokens/component/button.json` para referenciar os tokens semânticos novos (renomeando `padding` para `padding-x`).
4. Atualizar `tokens/component/input.json`, `select.json`, `textarea.json` de forma análoga.
5. Executar `npm run build:tokens` e ajustar CSS dos componentes para consumir as novas variáveis geradas (`--ds-size-control-*`, `--ds-space-control-*`, `--ds-typography-control-*`).
6. Normalizar Figma: Button, Input Text Field, Select Field com mesma altura 32/40/48; ajustar line-height e paddingY para os valores do control token. Textarea ajusta paddingY mas mantém altura independente.
7. Rodar `npm run verify:tokens` para confirmar coerência.
8. Documentar como breaking change no CHANGELOG. Bump minor.

## Context

The design system has 18 components, of which Button, Input Text, Select, and Textarea share the concept of "interactive control with size variants" (sm/md/lg). An audit of the Figma file reveals dimensional inconsistencies between these components:

- **Button** uses paddingY 8/10/12 and heights 32/40/48.
- **Input Text/Select** (Field frame) use paddingY 6/8/10 and heights 34/40/48.
- **Padding-x** is consistent: 12/16/20 across all three.
- **cornerRadius** is consistent: 8px across all three.

The root cause is typography: Button label uses lineHeight 20/20/22px, while Input/Select text uses lineHeight 22/22/24px. The Input uses body-text line-heights (1.5 ratio) where it should use a tighter single-line control line-height that aligns with icon size.

Additionally, the current `button.json` mixes token referencing strategies:
- `button.padding.{sm/md/lg}` references semantic `space.inset.*` and `space.component.*` inconsistently.
- `button.height.*`, `button.font-size.*`, `button.icon-size.*` use absolute values (`"2rem"`, `"0.75rem"`), violating rule 3 (only foundation has absolute values).
- There is no shared vocabulary between components that should be dimensionally aligned.

## Decision

### 1. Create semantic control typography tokens

A new subcategory `semantic.typography.control.{sm/md/lg}` defines font-size and line-height for single-line text inside interactive controls. Line-height equals icon size at each tier, ensuring text-icon vertical alignment.

| Size | fontSize | lineHeight | iconSize |
|------|----------|------------|----------|
| sm   | 0.875rem (14px) | 1rem (16px) | 1rem (16px) |
| md   | 0.875rem (14px) | 1.25rem (20px) | 1.25rem (20px) |
| lg   | 1rem (16px) | 1.5rem (24px) | 1.5rem (24px) |

Tokens in `light.json` and `dark.json` (mode-invariant, same values in both):

```
semantic.typography.control.font-size.sm  → {foundation.typography.font.size.sm}   (0.875rem)
semantic.typography.control.font-size.md  → {foundation.typography.font.size.sm}   (0.875rem)
semantic.typography.control.font-size.lg  → {foundation.typography.font.size.md}   (1rem)
semantic.typography.control.line-height.sm → {foundation.typography.font.size.md}  (1rem / 16px)
semantic.typography.control.line-height.md → {foundation.typography.font.size.lg}  (1.125rem → rounds to 1.25rem / 20px)*
semantic.typography.control.line-height.lg → {foundation.typography.font.size.2xl} (1.5rem / 24px)
```

*Note: 20px (1.25rem) is not in the font-size scale. If a matching foundation token doesn't exist, create `foundation.typography.line-height.control.md` with value `1.25rem`. Alternatively, use `foundation.spacing.5` (1.25rem / 20px) since the value is identical. Preferred: create a dedicated token to avoid semantic confusion between spacing and line-height.

### 2. Create semantic control dimensional tokens

```
semantic.size.control.sm         → 2rem     (32px)  — references {foundation.spacing.8}
semantic.size.control.md         → 2.5rem   (40px)  — references {foundation.spacing.10}
semantic.size.control.lg         → 3rem     (48px)  — references {foundation.spacing.12}
semantic.size.control.icon.sm    → 1rem     (16px)  — references {foundation.spacing.4}
semantic.size.control.icon.md    → 1.25rem  (20px)  — references {foundation.spacing.5}
semantic.size.control.icon.lg    → 1.5rem   (24px)  — references {foundation.spacing.6}
semantic.size.control.min-target → 2.75rem  (44px)  — references {foundation.spacing.11}*

semantic.space.control.padding-x.sm → {foundation.spacing.3}    (12px)
semantic.space.control.padding-x.md → {foundation.spacing.4}    (16px)
semantic.space.control.padding-x.lg → {foundation.spacing.5}    (20px)
semantic.space.control.padding-y.sm → {foundation.spacing.2}    (8px)
semantic.space.control.padding-y.md → {foundation.spacing.2-5}  (10px)
semantic.space.control.padding-y.lg → {foundation.spacing.3}    (12px)
```

*If `foundation.spacing.11` doesn't exist (44px = 2.75rem), add it to the spacing scale, or use `foundation.spacing.10` (40px) + note that 44px is derived. Preferred: add a `foundation.dimension.min-target` token with absolute value `2.75rem`.

Height formula: `height = padding-y * 2 + lineHeight`, validated at all sizes:
- sm: 8 + 16 + 8 = 32 ✓
- md: 10 + 20 + 10 = 40 ✓
- lg: 12 + 24 + 12 = 48 ✓

### 3. Update component tokens to reference semantic control tokens

`component.button.*` and future `component.input.*`, `component.select.*` reference the semantic control tokens:

```
component.button.height.sm       → {semantic.size.control.sm}
component.button.height.md       → {semantic.size.control.md}
component.button.height.lg       → {semantic.size.control.lg}
component.button.padding-x.sm    → {semantic.space.control.padding-x.sm}
component.button.padding-x.md    → {semantic.space.control.padding-x.md}
component.button.padding-x.lg    → {semantic.space.control.padding-x.lg}
component.button.padding-y.sm    → {semantic.space.control.padding-y.sm}
component.button.padding-y.md    → {semantic.space.control.padding-y.md}
component.button.padding-y.lg    → {semantic.space.control.padding-y.lg}
component.button.font-size.sm    → {semantic.typography.control.font-size.sm}
component.button.font-size.md    → {semantic.typography.control.font-size.md}
component.button.font-size.lg    → {semantic.typography.control.font-size.lg}
component.button.icon-size.sm    → {semantic.size.control.icon.sm}
component.button.icon-size.md    → {semantic.size.control.icon.md}
component.button.icon-size.lg    → {semantic.size.control.icon.lg}
component.button.min-target-size → {semantic.size.control.min-target}
```

Rename `button.padding.{sm/md/lg}` → `button.padding-x.{sm/md/lg}` to clarify axis.

### 4. Normalize Figma component dimensions

All interactive controls (Button, Input Text Field, Select Field) must use the same height at each size tier: 32/40/48. This requires updating Input/Select:
- Adjust text line-height from 22px to match control token (sm=16, md=20, lg=24)
- Adjust paddingY to match control token (sm=8, md=10, lg=12)

Textarea shares padding tokens but not height:
- Adjust paddingY to match control token (sm stays 8, md changes 12→10, lg changes 16→12)
- Adjust paddingX binding to use `space.control.padding-x.*` (values stay 12/16/20)
- Height remains independent (FIXED or HUG content, multi-line)
- Line-height remains at body text ratios (multi-line text uses normal line-height, not the control line-height optimized for single-line icon alignment)

## Consequences

- **Tokens:** ~18 new semantic tokens (6 size, 6 space, 6 typography). 3 button tokens renamed (padding → padding-x). ~10 button tokens updated from absolute values to semantic references. Foundation may gain 1-2 tokens (line-height 1.25rem, dimension min-target).
- **CSS:** New variables `--ds-size-control-*`, `--ds-space-control-*`, `--ds-typography-control-*`. Button CSS variables renamed `--ds-button-padding-*` → `--ds-button-padding-x-*`, new `--ds-button-padding-y-*`.
- **Figma:** New variables in Semantic collection: `size/control/*`, `space/control/*`, `typography/control/*`. Button, Input Text, Select, Textarea components re-bound to new variables. Input/Select Field frames adjusted to match 32/40/48 heights. Textarea paddingY adjusted from 8/12/16 to 8/10/12; height unchanged.
- **Docs:** New section "Control sizing" documenting the shared dimensional system. Button, Input, Select pages updated. token-schema.md and component-inventory.md updated.
- **Breaking changes:** `--ds-button-padding-sm/md/lg` renamed to `--ds-button-padding-x-sm/md/lg`. Migration: find-and-replace in consuming CSS.

## Alternatives considered

**A) Keep button tokens referencing foundation directly (ADR proposed by other chat).** Would create button.padding-y.{sm/md/lg} → foundation.spacing.* without semantic layer. Discarded because the audit shows Input, Select, and Textarea share the same dimensions — the pattern is systemic, not component-specific.

**B) Create semantic tokens named per-component (semantic.space.component.button-height-md).** Discarded because "button" in a semantic token name is a smell — it's a component token in disguise. The correct abstraction is "control", not "button".

**C) Accept the 2px height difference between Button and Input/Select.** Discarded because the difference stems from inconsistent line-heights, not intentional design. When placed side-by-side in a form (e.g., inline search with button), the misalignment is visible and incorrect.
