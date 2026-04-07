# Design System Core

White-label CSS design system with semantic tokens, 21 components, and light/dark mode support.

## Quick Start

```html
<link rel="stylesheet" href="css/design-system.css">
```

### Dark Mode

```html
<html data-mode="dark">
```

## Tokens

- **177 foundation variables** — colors, typography, spacing, radius, stroke, opacity
- **94 semantic variables** — with Light and Dark mode values
- **271 total CSS custom properties** prefixed with `--ds-`

## Components (21)

| Component | CSS Class | Variants |
|-----------|-----------|----------|
| Button | `.ds-btn` | 5 styles × 3 sizes × states |
| Input | `.ds-input` | 3 sizes × states |
| Textarea | `.ds-textarea` | 3 sizes × states |
| Select | `.ds-select` | 3 sizes × states |
| Checkbox | `.ds-checkbox` | 3 sizes × 3 checked × states |
| Radio | `.ds-radio` | 3 sizes × states |
| Toggle | `.ds-toggle` | 3 sizes × states |
| Badge | `.ds-badge` | 7 colors × 2 styles |
| Alert | `.ds-alert` | 4 types × 2 styles |
| Card | `.ds-card` | outlined / elevated |
| Modal | `.ds-modal` | 3 sizes |
| Tooltip | `.ds-tooltip` | 4 positions |
| Tabs | `.ds-tabs` | active / disabled |
| Breadcrumb | `.ds-breadcrumb` | current / link |
| Avatar | `.ds-avatar` | 3 sizes |
| Divider | `.ds-divider` | horizontal / vertical |
| Spinner | `.ds-spinner` | 3 sizes |
| Skeleton | `.ds-skeleton` | text / circle / rect |
| Form Field | `.ds-field` | 3 sizes × states |
| Tab Bar | `.ds-tabs` | composed |
| Breadcrumb | `.ds-breadcrumb` | composed |

## File Structure

```
css/
├── tokens/         # Foundation + semantic theme tokens
├── base/           # Reset + typography
├── components/     # 19 component files
├── utilities/      # Elevation + layout helpers
└── design-system.css  # Entry point
docs/               # HTML documentation with live examples
```

## Figma

Design source: Figma file `PRYS2kL7VdC1MtVWfZvuDN` — 21 components, 298 variants, 271 variables with 100% CSS token coverage.

## License

MIT
