# Design System Core

White-label CSS design system with semantic tokens, 18 components, and light/dark mode support across 3 themes.

## Quick Start

```html
<link rel="stylesheet" href="css/design-system.css">
```

### Dark Mode

```html
<html data-mode="dark">
```

### Themes

```html
<html data-theme="ocean">   <!-- Cyan + Indigo -->
<html data-theme="forest">  <!-- Emerald + Amber -->
<!-- default: Blue + Purple -->
```

## Tokens

- **178 foundation variables** — colors (10 palettes), typography (Inter + DM Mono), spacing, radius, stroke, opacity
- **94 semantic variables** — with Light and Dark mode values
- **3 themes** — Default (Blue/Purple), Ocean (Cyan/Indigo), Forest (Emerald/Amber)
- All themes support both light and dark mode

## Components (18)

| Component | CSS Class | Variants |
|-----------|-----------|----------|
| Button | `.ds-btn` | 5 styles × 3 sizes (32/40/48) × states |
| Input | `.ds-input` | 3 sizes (32/40/48) × states |
| Textarea | `.ds-textarea` | 3 sizes × states |
| Select | `.ds-select` | 3 sizes (32/40/48) × states |
| Checkbox | `.ds-checkbox` | 3 sizes × 3 checked × states |
| Radio | `.ds-radio` | 3 sizes × states |
| Toggle | `.ds-toggle` | 3 sizes × states |
| Badge | `.ds-badge` | 7 colors × 2 styles |
| Alert | `.ds-alert` | 4 types × 2 styles |
| Card | `.ds-card` | default / outlined / elevated |
| Modal | `.ds-modal` | 3 sizes |
| Tooltip | `.ds-tooltip` | 4 positions |
| Tabs | `.ds-tabs` | active / disabled |
| Breadcrumb | `.ds-breadcrumb` | current / link |
| Avatar | `.ds-avatar` | 3 sizes |
| Divider | `.ds-divider` | horizontal / vertical |
| Spinner | `.ds-spinner` | 3 sizes |
| Skeleton | `.ds-skeleton` | text / circle / rect |

## File Structure

```
css/
├── tokens/         # Foundation + semantic theme tokens
│   └── themes/     # Ocean + Forest theme overrides
├── base/           # Reset (Inter + DM Mono) + typography (24 styles)
├── components/     # 18 component files
├── utilities/      # Elevation + layout helpers
└── design-system.css  # Entry point
docs/               # HTML documentation with live examples
```

## Figma

Design source: Figma file `PRYS2kL7VdC1MtVWfZvuDN` — 18 components, 271+ variables with CSS token coverage aligned to Figma specs.

## License

MIT
