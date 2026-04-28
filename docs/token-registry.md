# Token Registry

> Gerado automaticamente por `scripts/build-token-registry.mjs` em 2026-04-28. Não editar à mão — edite `tokens/registry.json` e rode `npm run build:registry`.

Ver [ADR-013](decisions/ADR-013-camadas-de-consumo-de-tokens.md) para a regra arquitetural de camadas.

## Status

- Total de tokens: **426**
- Com metadados completos: **426**
- Pendentes (`TODO` em algum campo obrigatório): **0**
- Completude: **100%**

## Foundation

262 tokens.

### foundation.border

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.border.width.1` | dimension | — | Espessura de borda 1px. | 4 |
| `foundation.border.width.2` | dimension | — | Espessura de borda 2px. | 6 |
| `foundation.border.width.4` | dimension | — | Espessura de borda 4px. | 0 |

### foundation.color

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.color.amber.100` | color | — | Tom 100 da paleta amber. Tom muito claro — backgrounds, hover states sutis em light mode. | 2 |
| `foundation.color.amber.200` | color | — | Tom 200 da paleta amber. Tom claro — backgrounds secundários, borders subtle. | 0 |
| `foundation.color.amber.300` | color | — | Tom 300 da paleta amber. Tom médio-claro — borders default, foregrounds em dark mode. | 0 |
| `foundation.color.amber.400` | color | — | Tom 400 da paleta amber. Tom médio — fills médios, focus rings. | 4 |
| `foundation.color.amber.50` | color | — | Tom 50 da paleta amber. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.amber.500` | color | — | Tom 500 da paleta amber. Tom médio — fills médios, focus rings. | 5 |
| `foundation.color.amber.600` | color | — | Tom 600 da paleta amber. Tom forte — fills primários, brand fills. | 2 |
| `foundation.color.amber.700` | color | — | Tom 700 da paleta amber. Tom escuro — text on light, hover de fills brand. | 2 |
| `foundation.color.amber.800` | color | — | Tom 800 da paleta amber. Tom muito escuro — emphasis text, active states. | 0 |
| `foundation.color.amber.900` | color | — | Tom 900 da paleta amber. Tom extremo — surfaces escuras, body text em light mode. | 2 |
| `foundation.color.amber.950` | color | — | Tom 950 da paleta amber. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.blue.100` | color | — | Tom 100 da paleta blue. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.blue.200` | color | — | Tom 200 da paleta blue. Tom claro — backgrounds secundários, borders subtle. | 0 |
| `foundation.color.blue.300` | color | — | Tom 300 da paleta blue. Tom médio-claro — borders default, foregrounds em dark mode. | 0 |
| `foundation.color.blue.400` | color | — | Tom 400 da paleta blue. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.blue.50` | color | — | Tom 50 da paleta blue. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.blue.500` | color | — | Tom 500 da paleta blue. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.blue.600` | color | — | Tom 600 da paleta blue. Tom forte — fills primários, brand fills. | 0 |
| `foundation.color.blue.700` | color | — | Tom 700 da paleta blue. Tom escuro — text on light, hover de fills brand. | 0 |
| `foundation.color.blue.800` | color | — | Tom 800 da paleta blue. Tom muito escuro — emphasis text, active states. | 0 |
| `foundation.color.blue.900` | color | — | Tom 900 da paleta blue. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.blue.950` | color | — | Tom 950 da paleta blue. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.brand.100` | color | — | Tom 100 da paleta brand. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.brand.200` | color | — | Tom 200 da paleta brand. Tom claro — backgrounds secundários, borders subtle. | 2 |
| `foundation.color.brand.300` | color | — | Tom 300 da paleta brand. Tom médio-claro — borders default, foregrounds em dark mode. | 2 |
| `foundation.color.brand.400` | color | — | Tom 400 da paleta brand. Tom médio — fills médios, focus rings. | 6 |
| `foundation.color.brand.50` | color | — | Tom 50 da paleta brand. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.brand.500` | color | — | Tom 500 da paleta brand. Tom médio — fills médios, focus rings. | 5 |
| `foundation.color.brand.600` | color | — | Tom 600 da paleta brand. Tom forte — fills primários, brand fills. | 3 |
| `foundation.color.brand.700` | color | — | Tom 700 da paleta brand. Tom escuro — text on light, hover de fills brand. | 4 |
| `foundation.color.brand.800` | color | — | Tom 800 da paleta brand. Tom muito escuro — emphasis text, active states. | 4 |
| `foundation.color.brand.900` | color | — | Tom 900 da paleta brand. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.brand.950` | color | — | Tom 950 da paleta brand. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.cyan.100` | color | — | Tom 100 da paleta cyan. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.cyan.200` | color | — | Tom 200 da paleta cyan. Tom claro — backgrounds secundários, borders subtle. | 0 |
| `foundation.color.cyan.300` | color | — | Tom 300 da paleta cyan. Tom médio-claro — borders default, foregrounds em dark mode. | 0 |
| `foundation.color.cyan.400` | color | — | Tom 400 da paleta cyan. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.cyan.50` | color | — | Tom 50 da paleta cyan. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.cyan.500` | color | — | Tom 500 da paleta cyan. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.cyan.600` | color | — | Tom 600 da paleta cyan. Tom forte — fills primários, brand fills. | 0 |
| `foundation.color.cyan.700` | color | — | Tom 700 da paleta cyan. Tom escuro — text on light, hover de fills brand. | 0 |
| `foundation.color.cyan.800` | color | — | Tom 800 da paleta cyan. Tom muito escuro — emphasis text, active states. | 0 |
| `foundation.color.cyan.900` | color | — | Tom 900 da paleta cyan. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.cyan.950` | color | — | Tom 950 da paleta cyan. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.disabled.brand-dark` | color | — | Cor de fill disabled pra ações brand-dark em undefined mode. Translúcida sobre superfície base. | 0 |
| `foundation.color.disabled.brand-light` | color | — | Cor de fill disabled pra ações brand-light em undefined mode. Translúcida sobre superfície base. | 4 |
| `foundation.color.disabled.error-dark` | color | — | Cor de fill disabled pra ações error-dark em undefined mode. Translúcida sobre superfície base. | 2 |
| `foundation.color.disabled.error-light` | color | — | Cor de fill disabled pra ações error-light em undefined mode. Translúcida sobre superfície base. | 2 |
| `foundation.color.disabled.success-dark` | color | — | Cor de fill disabled pra ações success-dark em undefined mode. Translúcida sobre superfície base. | 2 |
| `foundation.color.disabled.success-light` | color | — | Cor de fill disabled pra ações success-light em undefined mode. Translúcida sobre superfície base. | 2 |
| `foundation.color.emerald.100` | color | — | Tom 100 da paleta emerald. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.emerald.200` | color | — | Tom 200 da paleta emerald. Tom claro — backgrounds secundários, borders subtle. | 0 |
| `foundation.color.emerald.300` | color | — | Tom 300 da paleta emerald. Tom médio-claro — borders default, foregrounds em dark mode. | 0 |
| `foundation.color.emerald.400` | color | — | Tom 400 da paleta emerald. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.emerald.50` | color | — | Tom 50 da paleta emerald. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.emerald.500` | color | — | Tom 500 da paleta emerald. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.emerald.600` | color | — | Tom 600 da paleta emerald. Tom forte — fills primários, brand fills. | 0 |
| `foundation.color.emerald.700` | color | — | Tom 700 da paleta emerald. Tom escuro — text on light, hover de fills brand. | 0 |
| `foundation.color.emerald.800` | color | — | Tom 800 da paleta emerald. Tom muito escuro — emphasis text, active states. | 0 |
| `foundation.color.emerald.900` | color | — | Tom 900 da paleta emerald. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.emerald.950` | color | — | Tom 950 da paleta emerald. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.green.100` | color | — | Tom 100 da paleta green. Tom muito claro — backgrounds, hover states sutis em light mode. | 2 |
| `foundation.color.green.200` | color | — | Tom 200 da paleta green. Tom claro — backgrounds secundários, borders subtle. | 0 |
| `foundation.color.green.300` | color | — | Tom 300 da paleta green. Tom médio-claro — borders default, foregrounds em dark mode. | 0 |
| `foundation.color.green.400` | color | — | Tom 400 da paleta green. Tom médio — fills médios, focus rings. | 4 |
| `foundation.color.green.50` | color | — | Tom 50 da paleta green. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.green.500` | color | — | Tom 500 da paleta green. Tom médio — fills médios, focus rings. | 5 |
| `foundation.color.green.600` | color | — | Tom 600 da paleta green. Tom forte — fills primários, brand fills. | 2 |
| `foundation.color.green.700` | color | — | Tom 700 da paleta green. Tom escuro — text on light, hover de fills brand. | 2 |
| `foundation.color.green.800` | color | — | Tom 800 da paleta green. Tom muito escuro — emphasis text, active states. | 2 |
| `foundation.color.green.900` | color | — | Tom 900 da paleta green. Tom extremo — surfaces escuras, body text em light mode. | 4 |
| `foundation.color.green.950` | color | — | Tom 950 da paleta green. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.indigo.100` | color | — | Tom 100 da paleta indigo. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.indigo.200` | color | — | Tom 200 da paleta indigo. Tom claro — backgrounds secundários, borders subtle. | 0 |
| `foundation.color.indigo.300` | color | — | Tom 300 da paleta indigo. Tom médio-claro — borders default, foregrounds em dark mode. | 0 |
| `foundation.color.indigo.400` | color | — | Tom 400 da paleta indigo. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.indigo.50` | color | — | Tom 50 da paleta indigo. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.indigo.500` | color | — | Tom 500 da paleta indigo. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.indigo.600` | color | — | Tom 600 da paleta indigo. Tom forte — fills primários, brand fills. | 0 |
| `foundation.color.indigo.700` | color | — | Tom 700 da paleta indigo. Tom escuro — text on light, hover de fills brand. | 0 |
| `foundation.color.indigo.800` | color | — | Tom 800 da paleta indigo. Tom muito escuro — emphasis text, active states. | 0 |
| `foundation.color.indigo.900` | color | — | Tom 900 da paleta indigo. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.indigo.950` | color | — | Tom 950 da paleta indigo. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.neutral.100` | color | — | Tom 100 da paleta neutral. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.neutral.200` | color | — | Tom 200 da paleta neutral. Tom claro — backgrounds secundários, borders subtle. | 5 |
| `foundation.color.neutral.300` | color | — | Tom 300 da paleta neutral. Tom médio-claro — borders default, foregrounds em dark mode. | 6 |
| `foundation.color.neutral.400` | color | — | Tom 400 da paleta neutral. Tom médio — fills médios, focus rings. | 10 |
| `foundation.color.neutral.50` | color | — | Tom 50 da paleta neutral. Tom muito claro — backgrounds, hover states sutis em light mode. | 15 |
| `foundation.color.neutral.500` | color | — | Tom 500 da paleta neutral. Tom médio — fills médios, focus rings. | 8 |
| `foundation.color.neutral.600` | color | — | Tom 600 da paleta neutral. Tom forte — fills primários, brand fills. | 11 |
| `foundation.color.neutral.700` | color | — | Tom 700 da paleta neutral. Tom escuro — text on light, hover de fills brand. | 7 |
| `foundation.color.neutral.800` | color | — | Tom 800 da paleta neutral. Tom muito escuro — emphasis text, active states. | 6 |
| `foundation.color.neutral.900` | color | — | Tom 900 da paleta neutral. Tom extremo — surfaces escuras, body text em light mode. | 15 |
| `foundation.color.neutral.950` | color | — | Tom 950 da paleta neutral. Tom extremo — surfaces escuras, body text em light mode. | 2 |
| `foundation.color.overlay.black.10` | color | — | Sobreposição translúcida em black a 10% de opacidade. | 7 |
| `foundation.color.overlay.black.20` | color | — | Sobreposição translúcida em black a 20% de opacidade. | 1 |
| `foundation.color.overlay.black.40` | color | — | Sobreposição translúcida em black a 40% de opacidade. | 1 |
| `foundation.color.overlay.black.5` | color | — | Sobreposição translúcida em black a 5% de opacidade. | 3 |
| `foundation.color.overlay.black.60` | color | — | Sobreposição translúcida em black a 60% de opacidade. | 2 |
| `foundation.color.overlay.black.80` | color | — | Sobreposição translúcida em black a 80% de opacidade. | 0 |
| `foundation.color.overlay.blue-400.15` | color | — | Sobreposição translúcida em blue-400 a 15% de opacidade. | 0 |
| `foundation.color.overlay.blue-400.25` | color | — | Sobreposição translúcida em blue-400 a 25% de opacidade. | 0 |
| `foundation.color.overlay.blue-400.32` | color | — | Sobreposição translúcida em blue-400 a 32% de opacidade. | 0 |
| `foundation.color.overlay.blue-600.12` | color | — | Sobreposição translúcida em blue-600 a 12% de opacidade. | 2 |
| `foundation.color.overlay.blue-600.20` | color | — | Sobreposição translúcida em blue-600 a 20% de opacidade. | 2 |
| `foundation.color.overlay.blue-600.28` | color | — | Sobreposição translúcida em blue-600 a 28% de opacidade. | 2 |
| `foundation.color.overlay.white.10` | color | — | Sobreposição translúcida em white a 10% de opacidade. | 1 |
| `foundation.color.overlay.white.20` | color | — | Sobreposição translúcida em white a 20% de opacidade. | 1 |
| `foundation.color.overlay.white.40` | color | — | Sobreposição translúcida em white a 40% de opacidade. | 1 |
| `foundation.color.overlay.white.5` | color | — | Sobreposição translúcida em white a 5% de opacidade. | 1 |
| `foundation.color.overlay.white.60` | color | — | Sobreposição translúcida em white a 60% de opacidade. | 2 |
| `foundation.color.overlay.white.80` | color | — | Sobreposição translúcida em white a 80% de opacidade. | 4 |
| `foundation.color.purple.100` | color | — | Tom 100 da paleta purple. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.purple.200` | color | — | Tom 200 da paleta purple. Tom claro — backgrounds secundários, borders subtle. | 0 |
| `foundation.color.purple.300` | color | — | Tom 300 da paleta purple. Tom médio-claro — borders default, foregrounds em dark mode. | 0 |
| `foundation.color.purple.400` | color | — | Tom 400 da paleta purple. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.purple.50` | color | — | Tom 50 da paleta purple. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.purple.500` | color | — | Tom 500 da paleta purple. Tom médio — fills médios, focus rings. | 0 |
| `foundation.color.purple.600` | color | — | Tom 600 da paleta purple. Tom forte — fills primários, brand fills. | 0 |
| `foundation.color.purple.700` | color | — | Tom 700 da paleta purple. Tom escuro — text on light, hover de fills brand. | 0 |
| `foundation.color.purple.800` | color | — | Tom 800 da paleta purple. Tom muito escuro — emphasis text, active states. | 0 |
| `foundation.color.purple.900` | color | — | Tom 900 da paleta purple. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.purple.950` | color | — | Tom 950 da paleta purple. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.red.100` | color | — | Tom 100 da paleta red. Tom muito claro — backgrounds, hover states sutis em light mode. | 2 |
| `foundation.color.red.200` | color | — | Tom 200 da paleta red. Tom claro — backgrounds secundários, borders subtle. | 0 |
| `foundation.color.red.300` | color | — | Tom 300 da paleta red. Tom médio-claro — borders default, foregrounds em dark mode. | 0 |
| `foundation.color.red.400` | color | — | Tom 400 da paleta red. Tom médio — fills médios, focus rings. | 6 |
| `foundation.color.red.50` | color | — | Tom 50 da paleta red. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.red.500` | color | — | Tom 500 da paleta red. Tom médio — fills médios, focus rings. | 6 |
| `foundation.color.red.600` | color | — | Tom 600 da paleta red. Tom forte — fills primários, brand fills. | 3 |
| `foundation.color.red.700` | color | — | Tom 700 da paleta red. Tom escuro — text on light, hover de fills brand. | 2 |
| `foundation.color.red.800` | color | — | Tom 800 da paleta red. Tom muito escuro — emphasis text, active states. | 2 |
| `foundation.color.red.900` | color | — | Tom 900 da paleta red. Tom extremo — surfaces escuras, body text em light mode. | 4 |
| `foundation.color.red.950` | color | — | Tom 950 da paleta red. Tom extremo — surfaces escuras, body text em light mode. | 0 |
| `foundation.color.sky.100` | color | — | Tom 100 da paleta sky. Tom muito claro — backgrounds, hover states sutis em light mode. | 2 |
| `foundation.color.sky.200` | color | — | Tom 200 da paleta sky. Tom claro — backgrounds secundários, borders subtle. | 0 |
| `foundation.color.sky.300` | color | — | Tom 300 da paleta sky. Tom médio-claro — borders default, foregrounds em dark mode. | 0 |
| `foundation.color.sky.400` | color | — | Tom 400 da paleta sky. Tom médio — fills médios, focus rings. | 4 |
| `foundation.color.sky.50` | color | — | Tom 50 da paleta sky. Tom muito claro — backgrounds, hover states sutis em light mode. | 0 |
| `foundation.color.sky.500` | color | — | Tom 500 da paleta sky. Tom médio — fills médios, focus rings. | 5 |
| `foundation.color.sky.600` | color | — | Tom 600 da paleta sky. Tom forte — fills primários, brand fills. | 2 |
| `foundation.color.sky.700` | color | — | Tom 700 da paleta sky. Tom escuro — text on light, hover de fills brand. | 2 |
| `foundation.color.sky.800` | color | — | Tom 800 da paleta sky. Tom muito escuro — emphasis text, active states. | 0 |
| `foundation.color.sky.900` | color | — | Tom 900 da paleta sky. Tom extremo — surfaces escuras, body text em light mode. | 2 |
| `foundation.color.sky.950` | color | — | Tom 950 da paleta sky. Tom extremo — surfaces escuras, body text em light mode. | 0 |

### foundation.dimension

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.dimension.10` | dimension | — | Dimensão fixa de 10px (0.625rem). | 4 |
| `foundation.dimension.1024` | dimension | — | Dimensão fixa de 1024px (64rem). | 4 |
| `foundation.dimension.12` | dimension | — | Dimensão fixa de 12px (0.75rem). | 6 |
| `foundation.dimension.128` | dimension | — | Dimensão fixa de 128px (8rem). | 4 |
| `foundation.dimension.1280` | dimension | — | Dimensão fixa de 1280px (80rem). | 4 |
| `foundation.dimension.14` | dimension | — | Dimensão fixa de 14px (0.875rem). | 0 |
| `foundation.dimension.16` | dimension | — | Dimensão fixa de 16px (1rem). | 7 |
| `foundation.dimension.2` | dimension | — | Dimensão fixa de 2px (0.125rem). | 5 |
| `foundation.dimension.20` | dimension | — | Dimensão fixa de 20px (1.25rem). | 6 |
| `foundation.dimension.24` | dimension | — | Dimensão fixa de 24px (1.5rem). | 6 |
| `foundation.dimension.28` | dimension | — | Dimensão fixa de 28px (1.75rem). | 0 |
| `foundation.dimension.32` | dimension | — | Dimensão fixa de 32px (2rem). | 6 |
| `foundation.dimension.320` | dimension | — | Dimensão fixa de 320px (20rem). | 4 |
| `foundation.dimension.36` | dimension | — | Dimensão fixa de 36px (2.25rem). | 0 |
| `foundation.dimension.4` | dimension | — | Dimensão fixa de 4px (0.25rem). | 5 |
| `foundation.dimension.40` | dimension | — | Dimensão fixa de 40px (2.5rem). | 4 |
| `foundation.dimension.44` | dimension | — | Dimensão fixa de 44px (2.75rem). | 0 |
| `foundation.dimension.48` | dimension | — | Dimensão fixa de 48px (3rem). | 6 |
| `foundation.dimension.480` | dimension | — | Dimensão fixa de 480px (30rem). | 4 |
| `foundation.dimension.56` | dimension | — | Dimensão fixa de 56px (3.5rem). | 0 |
| `foundation.dimension.6` | dimension | — | Dimensão fixa de 6px (0.375rem). | 0 |
| `foundation.dimension.64` | dimension | — | Dimensão fixa de 64px (4rem). | 6 |
| `foundation.dimension.640` | dimension | — | Dimensão fixa de 640px (40rem). | 4 |
| `foundation.dimension.8` | dimension | — | Dimensão fixa de 8px (0.5rem). | 4 |
| `foundation.dimension.80` | dimension | — | Dimensão fixa de 80px (5rem). | 4 |
| `foundation.dimension.800` | dimension | — | Dimensão fixa de 800px (50rem). | 4 |
| `foundation.dimension.96` | dimension | — | Dimensão fixa de 96px (6rem). | 4 |

### foundation.duration

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.duration.fast` | duration | — | Duração de transição fast. | 4 |
| `foundation.duration.normal` | duration | — | Duração de transição normal. | 4 |
| `foundation.duration.slow` | duration | — | Duração de transição slow. | 4 |

### foundation.ease

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.ease.default` | cubicBezier | — | Curva cubic-bezier default. | 4 |
| `foundation.ease.in` | cubicBezier | — | Curva cubic-bezier in. | 0 |
| `foundation.ease.in-out` | cubicBezier | — | Curva cubic-bezier in-out. | 0 |
| `foundation.ease.out` | cubicBezier | — | Curva cubic-bezier out. | 0 |

### foundation.opacity

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.opacity.10` | number | — | Opacidade 10%. | 0 |
| `foundation.opacity.100` | number | — | Opacidade 100%. | 0 |
| `foundation.opacity.25` | number | — | Opacidade 25%. | 0 |
| `foundation.opacity.5` | number | — | Opacidade 5%. | 0 |
| `foundation.opacity.50` | number | — | Opacidade 50%. | 4 |
| `foundation.opacity.75` | number | — | Opacidade 75%. | 0 |

### foundation.radius

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.radius.12` | dimension | — | Raio de borda de 12px. | 4 |
| `foundation.radius.16` | dimension | — | Raio de borda de 16px. | 4 |
| `foundation.radius.2` | dimension | — | Raio de borda de 2px. | 0 |
| `foundation.radius.24` | dimension | — | Raio de borda de 24px. | 0 |
| `foundation.radius.4` | dimension | — | Raio de borda de 4px. | 4 |
| `foundation.radius.8` | dimension | — | Raio de borda de 8px. | 4 |
| `foundation.radius.999` | dimension | — | Raio máximo (999px) pra pill/circle. | 4 |

### foundation.shadow

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.shadow.2xl` | shadow | — | Sombra de elevação 2xl. | 0 |
| `foundation.shadow.lg` | shadow | — | Sombra de elevação lg. | 1 |
| `foundation.shadow.md` | shadow | — | Sombra de elevação md. | 1 |
| `foundation.shadow.none` | shadow | — | Sem sombra (level 0 de elevação). | 1 |
| `foundation.shadow.sm` | shadow | — | Sombra de elevação sm. | 5 |
| `foundation.shadow.xl` | shadow | — | Sombra de elevação xl. | 5 |
| `foundation.shadow.xs` | shadow | — | Sombra de elevação xs. | 0 |

### foundation.typography

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.typography.font.family.display` | fontFamily | — | Font family display. | 0 |
| `foundation.typography.font.family.mono` | fontFamily | — | Font family mono. | 2 |
| `foundation.typography.font.family.sans` | fontFamily | — | Font family sans. | 2 |
| `foundation.typography.font.size.11` | dimension | — | Font-size 11px (0.6875rem). | 2 |
| `foundation.typography.font.size.12` | dimension | — | Font-size 12px (0.75rem). | 2 |
| `foundation.typography.font.size.14` | dimension | — | Font-size 14px (0.875rem). | 2 |
| `foundation.typography.font.size.16` | dimension | — | Font-size 16px (1rem). | 2 |
| `foundation.typography.font.size.18` | dimension | — | Font-size 18px (1.125rem). | 2 |
| `foundation.typography.font.size.20` | dimension | — | Font-size 20px (1.25rem). | 2 |
| `foundation.typography.font.size.24` | dimension | — | Font-size 24px (1.5rem). | 2 |
| `foundation.typography.font.size.28` | dimension | — | Font-size 28px (1.75rem). | 2 |
| `foundation.typography.font.size.32` | dimension | — | Font-size 32px (2rem). | 2 |
| `foundation.typography.font.size.40` | dimension | — | Font-size 40px (2.5rem). | 2 |
| `foundation.typography.font.size.48` | dimension | — | Font-size 48px (3rem). | 2 |
| `foundation.typography.font.size.56` | dimension | — | Font-size 56px (3.5rem). | 2 |
| `foundation.typography.font.size.64` | dimension | — | Font-size 64px (4rem). | 2 |
| `foundation.typography.font.size.72` | dimension | — | Font-size 72px (4.5rem). | 2 |
| `foundation.typography.font.weight.bold` | number | — | Font-weight bold (numeric 700 em CSS). | 2 |
| `foundation.typography.font.weight.medium` | number | — | Font-weight medium (numeric 500 em CSS). | 2 |
| `foundation.typography.font.weight.regular` | number | — | Font-weight regular (numeric 400 em CSS). | 2 |
| `foundation.typography.font.weight.semibold` | number | — | Font-weight semibold (numeric 600 em CSS). | 2 |
| `foundation.typography.letter.spacing.normal` | dimension | — | Letter-spacing normal. | 2 |
| `foundation.typography.letter.spacing.tight` | dimension | — | Letter-spacing tight. | 2 |
| `foundation.typography.letter.spacing.tighter` | dimension | — | Letter-spacing tighter. | 0 |
| `foundation.typography.letter.spacing.wide` | dimension | — | Letter-spacing wide. | 0 |
| `foundation.typography.letter.spacing.wider` | dimension | — | Letter-spacing wider. | 2 |
| `foundation.typography.line.height.16` | dimension | — | Line-height 16 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.18` | dimension | — | Line-height 18 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.20` | dimension | — | Line-height 20 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.22` | dimension | — | Line-height 22 (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.24` | dimension | — | Line-height 24 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.26` | dimension | — | Line-height 26 (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.28` | dimension | — | Line-height 28 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.32` | dimension | — | Line-height 32 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.34` | dimension | — | Line-height 34 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.40` | dimension | — | Line-height 40 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.44` | dimension | — | Line-height 44 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.48` | dimension | — | Line-height 48 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.50` | dimension | — | Line-height 50 (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.60` | dimension | — | Line-height 60 (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.64` | dimension | — | Line-height 64 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.70` | dimension | — | Line-height 70 (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.72` | dimension | — | Line-height 72 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.80` | dimension | — | Line-height 80 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.90` | dimension | — | Line-height 90 (representação rem/ratio pro CSS). | 2 |
| `foundation.typography.line.height.control.lg` | dimension | — | Line-height control (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.control.md` | dimension | — | Line-height control (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.control.sm` | dimension | — | Line-height control (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.loose` | number | — | Line-height loose (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.none` | number | — | Line-height none (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.normal` | number | — | Line-height normal (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.relaxed` | number | — | Line-height relaxed (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.snug` | number | — | Line-height snug (representação rem/ratio pro CSS). | 0 |
| `foundation.typography.line.height.tight` | number | — | Line-height tight (representação rem/ratio pro CSS). | 0 |

### foundation.z

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `foundation.z.0` | number | — | Z-index camada 0 (base/in-flow). | 0 |
| `foundation.z.10` | number | — | Z-index camada 10 (dropdown/popover). | 0 |
| `foundation.z.20` | number | — | Z-index camada 20 (sticky header/overlay). | 0 |
| `foundation.z.30` | number | — | Z-index camada 30 (drawer). | 0 |
| `foundation.z.40` | number | — | Z-index camada 40 (modal). | 0 |
| `foundation.z.50` | number | — | Z-index camada 50 (toast/snackbar). | 0 |

## Semantic

164 tokens.

### semantic.background

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.background.default` | color | → `foundation.color.neutral.50` | Background base do app — superfície neutra mais comum. | 1 |
| `semantic.background.disabled` | color | → `foundation.color.neutral.200` | Background pra estados disabled — neutral subtle. | 7 |
| `semantic.background.inverse` | color | → `foundation.color.neutral.900` | Background invertido — usado em tooltips, snackbars, dark badges em light mode. | 2 |
| `semantic.background.overlay` | color | → `foundation.color.overlay.black.60` | Scrim de modal/drawer — escurece o fundo pra focar o overlay. | 1 |
| `semantic.background.subtle` | color | → `foundation.color.neutral.200` | Background levemente diferenciado — chips, código inline, áreas secundárias. | 5 |

### semantic.border

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.border.brand` | color | → `foundation.color.brand.600` | Borda brand — emphasis branded. | 0 |
| `semantic.border.control-default` | color | → `foundation.color.neutral.500` | Border control-default. | 6 |
| `semantic.border.control-disabled` | color | → `foundation.color.neutral.300` | Border control-disabled. | 6 |
| `semantic.border.control-hover` | color | → `foundation.color.neutral.600` | Border control-hover. | 3 |
| `semantic.border.default` | color | → `foundation.color.neutral.300` | Borda neutra default — cards, dividers. | 3 |
| `semantic.border.error` | color | → `foundation.color.red.600` | Borda de erro — input invalid. | 0 |
| `semantic.border.focus` | color | → `foundation.color.brand.500` | Focus ring color (WCAG 2.4.7). | 12 |
| `semantic.border.focus-error` | color | → `foundation.color.red.500` | Focus ring em estado error (apenas em focus, não default). | 0 |
| `semantic.border.inverse` | color | → `foundation.color.neutral.50` | Borda invertida — sobre dark surfaces em light mode. | 0 |
| `semantic.border.strong` | color | → `foundation.color.neutral.600` | Borda neutra forte — emphasis em separadores. | 1 |
| `semantic.border.subtle` | color | → `foundation.color.neutral.200` | Borda neutra sutil — chips, code blocks. | 4 |
| `semantic.border.width.default` | dimension | → `foundation.border.width.1` | Border-width default. | 13 |
| `semantic.border.width.focus` | dimension | → `foundation.border.width.2` | Border-width focus. | 12 |
| `semantic.border.width.strong` | dimension | → `foundation.border.width.2` | Border-width strong. | 1 |

### semantic.content

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.content.default` | color | → `foundation.color.neutral.900` | Texto primário — body, headings, labels principais. | 11 |
| `semantic.content.disabled` | color | → `foundation.color.neutral.400` | Texto disabled — controles e items inativos. | 5 |
| `semantic.content.inverse` | color | → `foundation.color.neutral.50` | Texto invertido — sobre background.inverse (tooltips, badges escuros em light). | 3 |
| `semantic.content.secondary` | color | → `foundation.color.neutral.600` | Texto secundário — descrições, helper text, meta-info. | 12 |
| `semantic.content.tertiary` | color | → `foundation.color.neutral.500` | Texto terciário — caption, footnote, timestamps. | 3 |

### semantic.feedback

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.feedback.error.background.active` | color | → `foundation.color.red.900` | Fill de feedback erro (vermelho) em estado active. | 1 |
| `semantic.feedback.error.background.default` | color | → `foundation.color.red.600` | Fill de feedback erro (vermelho) em estado default. | 8 |
| `semantic.feedback.error.background.disabled` | color | → `foundation.color.disabled.error-light` | Fill de feedback erro (vermelho) em estado disabled. | 0 |
| `semantic.feedback.error.background.hover` | color | → `foundation.color.red.800` | Fill de feedback erro (vermelho) em estado hover. | 1 |
| `semantic.feedback.error.background.subtle` | color | → `foundation.color.red.100` | Fill de feedback erro (vermelho) em estado subtle. | 2 |
| `semantic.feedback.error.border-default` | color | → `foundation.color.red.500` | Borda de feedback erro (vermelho) em estado default. | 2 |
| `semantic.feedback.error.content-contrast` | color | → `foundation.color.neutral.50` | Cor de feedback erro (vermelho) em estado contrast. | 3 |
| `semantic.feedback.error.content-default` | color | → `foundation.color.red.700` | Cor de feedback erro (vermelho) em estado default. | 4 |
| `semantic.feedback.error.content-disabled` | color | → `foundation.color.overlay.white.80` | Cor de feedback erro (vermelho) em estado disabled. | 0 |
| `semantic.feedback.info.background.default` | color | → `foundation.color.sky.500` | Fill de feedback informação (azul) em estado default. | 2 |
| `semantic.feedback.info.background.hover` | color | → `foundation.color.sky.600` | Fill de feedback informação (azul) em estado hover. | 0 |
| `semantic.feedback.info.background.subtle` | color | → `foundation.color.sky.100` | Fill de feedback informação (azul) em estado subtle. | 2 |
| `semantic.feedback.info.border-default` | color | → `foundation.color.sky.500` | Borda de feedback informação (azul) em estado default. | 1 |
| `semantic.feedback.info.content-contrast` | color | → `foundation.color.neutral.900` | Cor de feedback informação (azul) em estado contrast. | 2 |
| `semantic.feedback.info.content-default` | color | → `foundation.color.sky.700` | Cor de feedback informação (azul) em estado default. | 1 |
| `semantic.feedback.success.background.active` | color | → `foundation.color.green.900` | Fill de feedback sucesso (verde) em estado active. | 1 |
| `semantic.feedback.success.background.default` | color | → `foundation.color.green.600` | Fill de feedback sucesso (verde) em estado default. | 3 |
| `semantic.feedback.success.background.disabled` | color | → `foundation.color.disabled.success-light` | Fill de feedback sucesso (verde) em estado disabled. | 0 |
| `semantic.feedback.success.background.hover` | color | → `foundation.color.green.800` | Fill de feedback sucesso (verde) em estado hover. | 1 |
| `semantic.feedback.success.background.subtle` | color | → `foundation.color.green.100` | Fill de feedback sucesso (verde) em estado subtle. | 2 |
| `semantic.feedback.success.border-default` | color | → `foundation.color.green.500` | Borda de feedback sucesso (verde) em estado default. | 1 |
| `semantic.feedback.success.content-contrast` | color | → `foundation.color.neutral.50` | Cor de feedback sucesso (verde) em estado contrast. | 3 |
| `semantic.feedback.success.content-default` | color | → `foundation.color.green.700` | Cor de feedback sucesso (verde) em estado default. | 1 |
| `semantic.feedback.success.content-disabled` | color | → `foundation.color.overlay.white.80` | Cor de feedback sucesso (verde) em estado disabled. | 0 |
| `semantic.feedback.warning.background.default` | color | → `foundation.color.amber.500` | Fill de feedback aviso (âmbar) em estado default. | 2 |
| `semantic.feedback.warning.background.hover` | color | → `foundation.color.amber.600` | Fill de feedback aviso (âmbar) em estado hover. | 0 |
| `semantic.feedback.warning.background.subtle` | color | → `foundation.color.amber.100` | Fill de feedback aviso (âmbar) em estado subtle. | 2 |
| `semantic.feedback.warning.border-default` | color | → `foundation.color.amber.500` | Borda de feedback aviso (âmbar) em estado default. | 1 |
| `semantic.feedback.warning.content-contrast` | color | → `foundation.color.neutral.900` | Cor de feedback aviso (âmbar) em estado contrast. | 2 |
| `semantic.feedback.warning.content-default` | color | → `foundation.color.amber.700` | Cor de feedback aviso (âmbar) em estado default. | 1 |

### semantic.ghost

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.ghost.background.active` | color | → `foundation.color.overlay.black.10` | Fill de ação apenas texto (neutral) em estado active. | 1 |
| `semantic.ghost.background.hover` | color | → `foundation.color.overlay.black.5` | Fill de ação apenas texto (neutral) em estado hover. | 1 |
| `semantic.ghost.content-default` | color | → `foundation.color.neutral.900` | Cor de texto/ícone de ação apenas texto (neutral) em estado default. | 1 |
| `semantic.ghost.content-disabled` | color | → `foundation.color.neutral.400` | Cor de texto/ícone de ação apenas texto (neutral) em estado disabled. | 0 |

### semantic.link

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.link.content-active` | color | → `foundation.color.brand.800` | Cor de texto/ícone de link inline (branded text) em estado active. | 1 |
| `semantic.link.content-default` | color | → `foundation.color.brand.700` | Cor de texto/ícone de link inline (branded text) em estado default. | 2 |
| `semantic.link.content-disabled` | color | → `foundation.color.neutral.400` | Cor de texto/ícone de link inline (branded text) em estado disabled. | 0 |
| `semantic.link.content-hover` | color | → `foundation.color.brand.800` | Cor de texto/ícone de link inline (branded text) em estado hover. | 1 |

### semantic.motion

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.motion.duration.fast` | duration | → `foundation.duration.fast` | Semantic wrapper pra motion. | 12 |
| `semantic.motion.duration.normal` | duration | → `foundation.duration.normal` | Semantic wrapper pra motion. | 0 |
| `semantic.motion.duration.slow` | duration | → `foundation.duration.slow` | Semantic wrapper pra motion. | 0 |
| `semantic.motion.ease.default` | cubicBezier | → `foundation.ease.default` | Semantic wrapper pra motion. | 12 |

### semantic.opacity

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.opacity.disabled` | number | → `foundation.opacity.50` | Semantic wrapper pra opacity. | 4 |

### semantic.outline

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.outline.background.active` | color | → `foundation.color.overlay.black.10` | Fill de ação com borda neutra em estado active. | 1 |
| `semantic.outline.background.hover` | color | → `foundation.color.overlay.black.5` | Fill de ação com borda neutra em estado hover. | 2 |
| `semantic.outline.border-default` | color | → `foundation.color.neutral.500` | Borda de ação com borda neutra em estado default. | 2 |
| `semantic.outline.border-disabled` | color | → `foundation.color.neutral.200` | Borda de ação com borda neutra em estado disabled. | 0 |
| `semantic.outline.border-hover` | color | → `foundation.color.neutral.700` | Borda de ação com borda neutra em estado hover. | 1 |
| `semantic.outline.content-default` | color | → `foundation.color.neutral.700` | Cor de texto/ícone de ação com borda neutra em estado default. | 2 |
| `semantic.outline.content-disabled` | color | → `foundation.color.neutral.400` | Cor de texto/ícone de ação com borda neutra em estado disabled. | 0 |

### semantic.overlay

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.overlay.default` | color | → `foundation.color.overlay.black.10` | Overlay default — translúcido sobre conteúdo. | 0 |
| `semantic.overlay.medium` | color | → `foundation.color.overlay.black.20` | Overlay medium — translúcido sobre conteúdo. | 0 |
| `semantic.overlay.strong` | color | → `foundation.color.overlay.black.40` | Overlay strong — translúcido sobre conteúdo. | 0 |
| `semantic.overlay.subtle` | color | → `foundation.color.overlay.black.5` | Overlay subtle — translúcido sobre conteúdo. | 4 |

### semantic.primary

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.primary.background.active` | color | → `foundation.color.brand.800` | Fill de ação primária (brand solid) em estado active. | 1 |
| `semantic.primary.background.default` | color | → `foundation.color.brand.600` | Fill de ação primária (brand solid) em estado default. | 9 |
| `semantic.primary.background.disabled` | color | → `foundation.color.disabled.brand-light` | Fill de ação primária (brand solid) em estado disabled. | 0 |
| `semantic.primary.background.hover` | color | → `foundation.color.brand.700` | Fill de ação primária (brand solid) em estado hover. | 1 |
| `semantic.primary.content-default` | color | → `foundation.color.neutral.50` | Cor de texto/ícone de ação primária (brand solid) em estado default. | 6 |
| `semantic.primary.content-disabled` | color | → `foundation.color.overlay.white.80` | Cor de texto/ícone de ação primária (brand solid) em estado disabled. | 0 |

### semantic.radius

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.radius.full` | dimension | → `foundation.radius.999` | Radius semantic full. | 6 |
| `semantic.radius.lg` | dimension | → `foundation.radius.12` | Radius semantic lg. | 4 |
| `semantic.radius.md` | dimension | → `foundation.radius.8` | Radius semantic md. | 7 |
| `semantic.radius.sm` | dimension | → `foundation.radius.4` | Radius semantic sm. | 9 |
| `semantic.radius.xl` | dimension | → `foundation.radius.16` | Radius semantic xl. | 0 |

### semantic.shadow

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.shadow.card` | shadow | → `foundation.shadow.sm` | Sombra semantic card. | 1 |
| `semantic.shadow.modal` | shadow | → `foundation.shadow.xl` | Sombra semantic modal. | 0 |

### semantic.size

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.size.2xl` | dimension | → `foundation.dimension.48` | Size token 2xl. | 6 |
| `semantic.size.3xl` | dimension | → `foundation.dimension.64` | Size token 3xl. | 2 |
| `semantic.size.4xl` | dimension | → `foundation.dimension.96` | Size token 4xl. | 1 |
| `semantic.size.5xl` | dimension | → `foundation.dimension.128` | Size token 5xl. | 2 |
| `semantic.size.layout.2xl` | dimension | → `foundation.dimension.1280` | Size token layout.2xl. | 0 |
| `semantic.size.layout.lg` | dimension | → `foundation.dimension.800` | Size token layout.lg. | 0 |
| `semantic.size.layout.md` | dimension | → `foundation.dimension.640` | Size token layout.md. | 1 |
| `semantic.size.layout.sm` | dimension | → `foundation.dimension.480` | Size token layout.sm. | 1 |
| `semantic.size.layout.xl` | dimension | → `foundation.dimension.1024` | Size token layout.xl. | 0 |
| `semantic.size.layout.xs` | dimension | → `foundation.dimension.320` | Size token layout.xs. | 0 |
| `semantic.size.lg` | dimension | → `foundation.dimension.32` | Size token lg. | 6 |
| `semantic.size.md` | dimension | → `foundation.dimension.24` | Size token md. | 8 |
| `semantic.size.sm` | dimension | → `foundation.dimension.20` | Size token sm. | 8 |
| `semantic.size.xl` | dimension | → `foundation.dimension.40` | Size token xl. | 6 |
| `semantic.size.xs` | dimension | → `foundation.dimension.16` | Size token xs. | 8 |

### semantic.space

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.space.2xl` | dimension | → `foundation.dimension.24` | Spacing token 2xl. | 0 |
| `semantic.space.2xs` | dimension | → `foundation.dimension.2` | Spacing token 2xs. | 2 |
| `semantic.space.control.padding.10` | dimension | → `foundation.dimension.10` | Spacing token control.padding.10. | 2 |
| `semantic.space.lg` | dimension | → `foundation.dimension.16` | Spacing token lg. | 8 |
| `semantic.space.md` | dimension | → `foundation.dimension.12` | Spacing token md. | 9 |
| `semantic.space.section.lg` | dimension | → `foundation.dimension.64` | Spacing token section.lg. | 0 |
| `semantic.space.section.md` | dimension | → `foundation.dimension.48` | Spacing token section.md. | 0 |
| `semantic.space.section.sm` | dimension | → `foundation.dimension.32` | Spacing token section.sm. | 1 |
| `semantic.space.section.xl` | dimension | → `foundation.dimension.80` | Spacing token section.xl. | 0 |
| `semantic.space.sm` | dimension | → `foundation.dimension.8` | Spacing token sm. | 13 |
| `semantic.space.xl` | dimension | → `foundation.dimension.20` | Spacing token xl. | 5 |
| `semantic.space.xs` | dimension | → `foundation.dimension.4` | Spacing token xs. | 12 |

### semantic.surface

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.surface.default` | color | → `foundation.color.neutral.50` | Surface default — superfície base. | 7 |
| `semantic.surface.elevated` | color | → `foundation.color.neutral.50` | Surface elevated — superfície altamente elevada (modal). | 1 |
| `semantic.surface.overlay` | color | → `foundation.color.neutral.50` | Surface overlay — superfície sobre overlay (popover). | 0 |
| `semantic.surface.raised` | color | → `foundation.color.neutral.50` | Surface raised — superfície elevada (cards). | 0 |

### semantic.toned

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.toned.background.active` | color | → `foundation.color.overlay.blue-600.28` | Fill de ação brand translúcida em estado active. | 1 |
| `semantic.toned.background.default` | color | → `foundation.color.overlay.blue-600.12` | Fill de ação brand translúcida em estado default. | 2 |
| `semantic.toned.background.hover` | color | → `foundation.color.overlay.blue-600.20` | Fill de ação brand translúcida em estado hover. | 1 |
| `semantic.toned.content-default` | color | → `foundation.color.brand.700` | Cor de texto/ícone de ação brand translúcida em estado default. | 2 |
| `semantic.toned.content-disabled` | color | → `foundation.color.neutral.400` | Cor de texto/ícone de ação brand translúcida em estado disabled. | 0 |

### semantic.typography

| Token | Tipo | Alias | Sentido | Usos |
|---|---|---|---|---|
| `semantic.typography.body.font-family.mono` | fontFamily | → `foundation.typography.font.family.mono` | font-family mono pra texto UI geral. | 0 |
| `semantic.typography.body.font-family.sans` | fontFamily | → `foundation.typography.font.family.sans` | font-family sans pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.2xl` | dimension | → `foundation.typography.font.size.24` | font-size 2xl pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.2xs` | dimension | → `foundation.typography.font.size.11` | font-size 2xs pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.3xl` | dimension | → `foundation.typography.font.size.28` | font-size 3xl pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.4xl` | dimension | → `foundation.typography.font.size.32` | font-size 4xl pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.5xl` | dimension | → `foundation.typography.font.size.40` | font-size 5xl pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.6xl` | dimension | → `foundation.typography.font.size.48` | font-size 6xl pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.7xl` | dimension | → `foundation.typography.font.size.56` | font-size 7xl pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.8xl` | dimension | → `foundation.typography.font.size.64` | font-size 8xl pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.9xl` | dimension | → `foundation.typography.font.size.72` | font-size 9xl pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.lg` | dimension | → `foundation.typography.font.size.18` | font-size lg pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.md` | dimension | → `foundation.typography.font.size.16` | font-size md pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.sm` | dimension | → `foundation.typography.font.size.14` | font-size sm pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.xl` | dimension | → `foundation.typography.font.size.20` | font-size xl pra texto UI geral. | 0 |
| `semantic.typography.body.font-size.xs` | dimension | → `foundation.typography.font.size.12` | font-size xs pra texto UI geral. | 0 |
| `semantic.typography.body.font-weight.bold` | number | → `foundation.typography.font.weight.bold` | font-weight bold pra texto UI geral. | 0 |
| `semantic.typography.body.font-weight.medium` | number | → `foundation.typography.font.weight.medium` | font-weight medium pra texto UI geral. | 0 |
| `semantic.typography.body.font-weight.regular` | number | → `foundation.typography.font.weight.regular` | font-weight regular pra texto UI geral. | 0 |
| `semantic.typography.body.font-weight.semibold` | number | → `foundation.typography.font.weight.semibold` | font-weight semibold pra texto UI geral. | 0 |
| `semantic.typography.body.letter-spacing.normal` | dimension | → `foundation.typography.letter.spacing.normal` | letter-spacing normal pra texto UI geral. | 0 |
| `semantic.typography.body.letter-spacing.tight` | dimension | → `foundation.typography.letter.spacing.tight` | letter-spacing tight pra texto UI geral. | 0 |
| `semantic.typography.body.letter-spacing.wider` | dimension | → `foundation.typography.letter.spacing.wider` | letter-spacing wider pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.2xl` | dimension | → `foundation.typography.line.height.34` | line-height 2xl pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.2xs` | dimension | → `foundation.typography.line.height.16` | line-height 2xs pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.3xl` | dimension | → `foundation.typography.line.height.40` | line-height 3xl pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.4xl` | dimension | → `foundation.typography.line.height.44` | line-height 4xl pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.5xl` | dimension | → `foundation.typography.line.height.48` | line-height 5xl pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.6xl` | dimension | → `foundation.typography.line.height.64` | line-height 6xl pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.7xl` | dimension | → `foundation.typography.line.height.72` | line-height 7xl pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.8xl` | dimension | → `foundation.typography.line.height.80` | line-height 8xl pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.9xl` | dimension | → `foundation.typography.line.height.90` | line-height 9xl pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.lg` | dimension | → `foundation.typography.line.height.28` | line-height lg pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.md` | dimension | → `foundation.typography.line.height.24` | line-height md pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.sm` | dimension | → `foundation.typography.line.height.20` | line-height sm pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.xl` | dimension | → `foundation.typography.line.height.32` | line-height xl pra texto UI geral. | 0 |
| `semantic.typography.body.line-height.xs` | dimension | → `foundation.typography.line.height.18` | line-height xs pra texto UI geral. | 0 |

## Component

0 tokens.

_Nenhuma entrada._

---

## Detalhes por token

Seção expandida com contexto, decisão e locais de uso.

### `foundation.border.width.1`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Espessura de borda 1px.
- **Escopo**: border-width
- **Contexto**: Use via Semantic `border.width.{default|strong|focus}`.
- **Decisão**: 1px = subtle/default; 2px = strong/focus rings; 4px = decorative dividers.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.border.width.default`, `semantic.border.width.default`

### `foundation.border.width.2`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Espessura de borda 2px.
- **Escopo**: border-width
- **Contexto**: Use via Semantic `border.width.{default|strong|focus}`.
- **Decisão**: 1px = subtle/default; 2px = strong/focus rings; 4px = decorative dividers.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.border.width.strong`, `semantic.border.width.focus`, `semantic.border.width.strong`, `semantic.border.width.focus`

### `foundation.border.width.4`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Espessura de borda 4px.
- **Escopo**: border-width
- **Contexto**: Use via Semantic `border.width.{default|strong|focus}`.
- **Decisão**: 1px = subtle/default; 2px = strong/focus rings; 4px = decorative dividers.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.amber.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta amber. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.warning.background.subtle`

### `foundation.color.amber.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta amber. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.amber.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta amber. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.amber.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta amber. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (3×)
  - Tokens que referenciam: `semantic.feedback.warning.border-default`, `semantic.feedback.warning.content-default`, `semantic.feedback.warning.background.default`

### `foundation.color.amber.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta amber. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.amber.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta amber. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.feedback.warning.background.hover`, `semantic.feedback.warning.border-default`, `semantic.feedback.warning.background.default`

### `foundation.color.amber.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta amber. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.warning.background.hover`

### `foundation.color.amber.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta amber. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.warning.content-default`

### `foundation.color.amber.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta amber. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.amber.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta amber. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
  - Tokens que referenciam: `semantic.feedback.warning.background.subtle`

### `foundation.color.amber.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta amber. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.warning.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta blue. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta blue. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta blue. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta blue. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta blue. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta blue. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta blue. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta blue. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta blue. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta blue. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.blue.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta blue. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.brand.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta brand. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.brand.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta brand. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
  - Tokens que referenciam: `semantic.link.content-active`

### `foundation.color.brand.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta brand. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
  - Tokens que referenciam: `semantic.link.content-hover`

### `foundation.color.brand.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta brand. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (5×)
  - Tokens que referenciam: `semantic.primary.background.default`, `semantic.primary.background.active`, `semantic.toned.content-default`, `semantic.link.content-default`, `semantic.border.brand`

### `foundation.color.brand.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta brand. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.brand.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta brand. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.primary.background.hover`, `semantic.border.focus`, `semantic.border.focus`

### `foundation.color.brand.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta brand. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.primary.background.default`, `semantic.border.brand`

### `foundation.color.brand.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta brand. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (3×)
  - Tokens que referenciam: `semantic.primary.background.hover`, `semantic.toned.content-default`, `semantic.link.content-default`

### `foundation.color.brand.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta brand. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (3×)
  - Tokens que referenciam: `semantic.primary.background.active`, `semantic.link.content-hover`, `semantic.link.content-active`

### `foundation.color.brand.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta brand. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.brand.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta brand. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta cyan. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta cyan. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta cyan. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta cyan. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta cyan. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta cyan. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta cyan. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta cyan. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta cyan. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta cyan. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.cyan.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta cyan. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.disabled.brand-dark`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Cor de fill disabled pra ações brand-dark em undefined mode. Translúcida sobre superfície base.
- **Escopo**: fill
- **Contexto**: Aplicado via Semantic brand-dark.background.disabled. Não use direto em componente.
- **Decisão**: Alpha de 40–50% sobre tom base preserva forma do botão sem competir visualmente — sinaliza não-interativo sem sumir.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.disabled.brand-light`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Cor de fill disabled pra ações brand-light em undefined mode. Translúcida sobre superfície base.
- **Escopo**: fill
- **Contexto**: Aplicado via Semantic brand-light.background.disabled. Não use direto em componente.
- **Decisão**: Alpha de 40–50% sobre tom base preserva forma do botão sem competir visualmente — sinaliza não-interativo sem sumir.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.primary.background.disabled`, `semantic.primary.background.disabled`

### `foundation.color.disabled.error-dark`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Cor de fill disabled pra ações error-dark em undefined mode. Translúcida sobre superfície base.
- **Escopo**: fill
- **Contexto**: Aplicado via Semantic error-dark.background.disabled. Não use direto em componente.
- **Decisão**: Alpha de 40–50% sobre tom base preserva forma do botão sem competir visualmente — sinaliza não-interativo sem sumir.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
  - Tokens que referenciam: `semantic.feedback.error.background.disabled`

### `foundation.color.disabled.error-light`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Cor de fill disabled pra ações error-light em undefined mode. Translúcida sobre superfície base.
- **Escopo**: fill
- **Contexto**: Aplicado via Semantic error-light.background.disabled. Não use direto em componente.
- **Decisão**: Alpha de 40–50% sobre tom base preserva forma do botão sem competir visualmente — sinaliza não-interativo sem sumir.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.error.background.disabled`

### `foundation.color.disabled.success-dark`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Cor de fill disabled pra ações success-dark em undefined mode. Translúcida sobre superfície base.
- **Escopo**: fill
- **Contexto**: Aplicado via Semantic success-dark.background.disabled. Não use direto em componente.
- **Decisão**: Alpha de 40–50% sobre tom base preserva forma do botão sem competir visualmente — sinaliza não-interativo sem sumir.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
  - Tokens que referenciam: `semantic.feedback.success.background.disabled`

### `foundation.color.disabled.success-light`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Cor de fill disabled pra ações success-light em undefined mode. Translúcida sobre superfície base.
- **Escopo**: fill
- **Contexto**: Aplicado via Semantic success-light.background.disabled. Não use direto em componente.
- **Decisão**: Alpha de 40–50% sobre tom base preserva forma do botão sem competir visualmente — sinaliza não-interativo sem sumir.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.success.background.disabled`

### `foundation.color.emerald.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta emerald. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta emerald. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta emerald. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta emerald. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta emerald. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta emerald. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta emerald. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta emerald. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta emerald. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta emerald. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.emerald.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta emerald. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.green.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta green. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.success.background.subtle`

### `foundation.color.green.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta green. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.green.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta green. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.green.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta green. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (3×)
  - Tokens que referenciam: `semantic.feedback.success.border-default`, `semantic.feedback.success.content-default`, `semantic.feedback.success.background.default`

### `foundation.color.green.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta green. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.green.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta green. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.success.background.hover`, `semantic.feedback.success.background.active`, `semantic.feedback.success.border-default`

### `foundation.color.green.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta green. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.success.background.default`

### `foundation.color.green.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta green. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.success.content-default`

### `foundation.color.green.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta green. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.success.background.hover`

### `foundation.color.green.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta green. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.success.background.subtle`, `semantic.feedback.success.background.active`

### `foundation.color.green.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta green. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.success.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta indigo. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta indigo. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta indigo. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta indigo. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta indigo. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta indigo. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta indigo. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta indigo. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta indigo. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta indigo. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.indigo.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta indigo. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.neutral.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta neutral. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.neutral.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta neutral. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (4×)
  - Tokens que referenciam: `semantic.outline.border-disabled`, `semantic.background.subtle`, `semantic.background.disabled`, `semantic.border.subtle`

### `foundation.color.neutral.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta neutral. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.outline.content-default`, `semantic.outline.border-hover`, `semantic.border.default`, `semantic.border.control-disabled`

### `foundation.color.neutral.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta neutral. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (3×)
    - `css/tokens/generated/theme-light.css` (5×)
  - Tokens que referenciam: `semantic.content.secondary`, `semantic.content.tertiary`, `semantic.border.control-hover`, `semantic.toned.content-disabled`, `semantic.outline.content-disabled`, `semantic.ghost.content-disabled`, `semantic.link.content-disabled`, `semantic.content.disabled`

### `foundation.color.neutral.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta neutral. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (3×)
    - `css/tokens/generated/theme-light.css` (10×)
  - Tokens que referenciam: `semantic.ghost.content-default`, `semantic.background.inverse`, `semantic.content.default`, `semantic.primary.content-default`, `semantic.feedback.success.content-contrast`, `semantic.feedback.error.content-contrast`, `semantic.surface.default`, `semantic.surface.raised`, `semantic.surface.overlay`, `semantic.surface.elevated`, `semantic.background.default`, `semantic.content.inverse`, `semantic.border.inverse`

### `foundation.color.neutral.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta neutral. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (3×)
    - `css/tokens/generated/theme-light.css` (3×)
  - Tokens que referenciam: `semantic.outline.border-default`, `semantic.border.strong`, `semantic.border.control-default`, `semantic.outline.border-default`, `semantic.content.tertiary`, `semantic.border.control-default`

### `foundation.color.neutral.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta neutral. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (6×)
    - `css/tokens/generated/theme-light.css` (3×)
  - Tokens que referenciam: `semantic.toned.content-disabled`, `semantic.outline.content-disabled`, `semantic.ghost.content-disabled`, `semantic.link.content-disabled`, `semantic.surface.elevated`, `semantic.content.disabled`, `semantic.content.secondary`, `semantic.border.strong`, `semantic.border.control-hover`

### `foundation.color.neutral.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta neutral. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (3×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.surface.overlay`, `semantic.border.default`, `semantic.border.control-disabled`, `semantic.outline.content-default`, `semantic.outline.border-hover`

### `foundation.color.neutral.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta neutral. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (5×)
  - Tokens que referenciam: `semantic.outline.border-disabled`, `semantic.surface.raised`, `semantic.background.subtle`, `semantic.background.disabled`, `semantic.border.subtle`

### `foundation.color.neutral.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta neutral. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (8×)
    - `css/tokens/generated/theme-light.css` (5×)
  - Tokens que referenciam: `semantic.primary.content-default`, `semantic.feedback.success.content-contrast`, `semantic.feedback.warning.content-contrast`, `semantic.feedback.error.content-contrast`, `semantic.feedback.info.content-contrast`, `semantic.surface.default`, `semantic.content.inverse`, `semantic.border.inverse`, `semantic.ghost.content-default`, `semantic.feedback.warning.content-contrast`, `semantic.feedback.info.content-contrast`, `semantic.background.inverse`, `semantic.content.default`

### `foundation.color.neutral.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta neutral. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
  - Tokens que referenciam: `semantic.background.default`

### `foundation.color.overlay.black.10`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em black a 10% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.outline.background.hover`, `semantic.outline.background.active`, `semantic.ghost.background.hover`, `semantic.ghost.background.active`, `semantic.outline.background.active`, `semantic.ghost.background.active`, `semantic.overlay.default`

### `foundation.color.overlay.black.20`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em black a 20% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.overlay.medium`

### `foundation.color.overlay.black.40`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em black a 40% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.overlay.strong`

### `foundation.color.overlay.black.5`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em black a 5% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.outline.background.hover`, `semantic.ghost.background.hover`, `semantic.overlay.subtle`

### `foundation.color.overlay.black.60`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em black a 60% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.background.overlay`, `semantic.background.overlay`

### `foundation.color.overlay.black.80`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em black a 80% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.overlay.blue-400.15`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em blue-400 a 15% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.overlay.blue-400.25`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em blue-400 a 25% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.overlay.blue-400.32`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em blue-400 a 32% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.overlay.blue-600.12`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em blue-600 a 12% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.toned.background.default`, `semantic.toned.background.default`

### `foundation.color.overlay.blue-600.20`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em blue-600 a 20% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.toned.background.hover`, `semantic.toned.background.hover`

### `foundation.color.overlay.blue-600.28`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em blue-600 a 28% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.toned.background.active`, `semantic.toned.background.active`

### `foundation.color.overlay.white.10`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em white a 10% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.overlay.default`

### `foundation.color.overlay.white.20`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em white a 20% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.overlay.medium`

### `foundation.color.overlay.white.40`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em white a 40% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.overlay.strong`

### `foundation.color.overlay.white.5`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em white a 5% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.overlay.subtle`

### `foundation.color.overlay.white.60`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em white a 60% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.feedback.success.content-disabled`, `semantic.feedback.error.content-disabled`

### `foundation.color.overlay.white.80`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Sobreposição translúcida em white a 80% de opacidade.
- **Escopo**: fill, background
- **Contexto**: Use em fundos de modal, scrim de drawer, hover/active de superfícies translúcidas, e overlays de loading. Não consuma direto em componente — passe por Semantic ou utility class.
- **Decisão**: Alpha tonal escolhido pra preservar legibilidade do conteúdo abaixo (5–10% = subtle hint; 20–40% = clear scrim; 60–80% = focus modal).
- **Usos**:
  - Tokens que referenciam: `semantic.primary.content-disabled`, `semantic.primary.content-disabled`, `semantic.feedback.success.content-disabled`, `semantic.feedback.error.content-disabled`

### `foundation.color.purple.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta purple. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta purple. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta purple. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta purple. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta purple. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta purple. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta purple. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta purple. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta purple. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta purple. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.purple.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta purple. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.red.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta red. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.error.background.subtle`

### `foundation.color.red.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta red. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.red.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta red. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.red.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta red. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (5×)
  - Tokens que referenciam: `semantic.feedback.error.border-default`, `semantic.feedback.error.content-default`, `semantic.feedback.error.background.default`, `semantic.feedback.error.background.active`, `semantic.border.error`

### `foundation.color.red.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta red. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.red.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta red. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.feedback.error.background.hover`, `semantic.border.focus-error`, `semantic.feedback.error.border-default`, `semantic.border.focus-error`

### `foundation.color.red.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta red. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.feedback.error.background.default`, `semantic.border.error`

### `foundation.color.red.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta red. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.error.content-default`

### `foundation.color.red.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta red. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.error.background.hover`

### `foundation.color.red.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta red. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.error.background.subtle`, `semantic.feedback.error.background.active`

### `foundation.color.red.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta red. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.error.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.sky.100`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 100 da paleta sky. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.info.background.subtle`

### `foundation.color.sky.200`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 200 da paleta sky. Tom claro — backgrounds secundários, borders subtle.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.sky.300`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 300 da paleta sky. Tom médio-claro — borders default, foregrounds em dark mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.sky.400`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 400 da paleta sky. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (3×)
  - Tokens que referenciam: `semantic.feedback.info.border-default`, `semantic.feedback.info.content-default`, `semantic.feedback.info.background.default`

### `foundation.color.sky.50`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 50 da paleta sky. Tom muito claro — backgrounds, hover states sutis em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.sky.500`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 500 da paleta sky. Tom médio — fills médios, focus rings.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.feedback.info.background.hover`, `semantic.feedback.info.border-default`, `semantic.feedback.info.background.default`

### `foundation.color.sky.600`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 600 da paleta sky. Tom forte — fills primários, brand fills.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.info.background.hover`

### `foundation.color.sky.700`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 700 da paleta sky. Tom escuro — text on light, hover de fills brand.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.feedback.info.content-default`

### `foundation.color.sky.800`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 800 da paleta sky. Tom muito escuro — emphasis text, active states.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.color.sky.900`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 900 da paleta sky. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
  - Tokens que referenciam: `semantic.feedback.info.background.subtle`

### `foundation.color.sky.950`

- **Camada**: foundation
- **Tipo**: `color`
- **Sentido**: Tom 950 da paleta sky. Tom extremo — surfaces escuras, body text em light mode.
- **Escopo**: fill, stroke, text
- **Contexto**: Foundation: nunca consumir direto em componente (ADR-013). Use via Semantic alias apropriado (`primary.*`, `feedback.info.*`, `content.*`, `background.*`).
- **Decisão**: Step da escala Tailwind-compatível. Calibrado pra contraste WCAG: 50–200 = backgrounds claros; 300–500 = states de UI; 600–800 = foregrounds e fills sólidos; 900–950 = dark surfaces.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.dimension.10`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 10px (0.625rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.space.control.padding.10`, `semantic.space.control.padding.10`

### `foundation.dimension.1024`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 1024px (64rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.size.layout.xl`, `semantic.size.layout.xl`

### `foundation.dimension.12`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 12px (0.75rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/skeleton.css` (1×)
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.space.md`, `semantic.space.md`

### `foundation.dimension.128`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 128px (8rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.size.5xl`, `semantic.size.5xl`

### `foundation.dimension.1280`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 1280px (80rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.size.layout.2xl`, `semantic.size.layout.2xl`

### `foundation.dimension.14`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 14px (0.875rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.dimension.16`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 16px (1rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (3×)
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.space.lg`, `semantic.size.xs`, `semantic.space.lg`, `semantic.size.xs`

### `foundation.dimension.2`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 2px (0.125rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.space.2xs`, `semantic.space.2xs`

### `foundation.dimension.20`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 20px (1.25rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.space.xl`, `semantic.size.sm`, `semantic.space.xl`, `semantic.size.sm`

### `foundation.dimension.24`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 24px (1.5rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.space.2xl`, `semantic.size.md`, `semantic.space.2xl`, `semantic.size.md`

### `foundation.dimension.28`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 28px (1.75rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.dimension.32`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 32px (2rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.space.section.sm`, `semantic.size.lg`, `semantic.space.section.sm`, `semantic.size.lg`

### `foundation.dimension.320`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 320px (20rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.size.layout.xs`, `semantic.size.layout.xs`

### `foundation.dimension.36`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 36px (2.25rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.dimension.4`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 4px (0.25rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.space.xs`, `semantic.space.xs`

### `foundation.dimension.40`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 40px (2.5rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.size.xl`, `semantic.size.xl`

### `foundation.dimension.44`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 44px (2.75rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.dimension.48`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 48px (3rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.space.section.md`, `semantic.size.2xl`, `semantic.space.section.md`, `semantic.size.2xl`

### `foundation.dimension.480`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 480px (30rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.size.layout.sm`, `semantic.size.layout.sm`

### `foundation.dimension.56`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 56px (3.5rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.dimension.6`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 6px (0.375rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.dimension.64`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 64px (4rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (2×)
    - `css/tokens/generated/theme-light.css` (2×)
  - Tokens que referenciam: `semantic.space.section.lg`, `semantic.size.3xl`, `semantic.space.section.lg`, `semantic.size.3xl`

### `foundation.dimension.640`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 640px (40rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.size.layout.md`, `semantic.size.layout.md`

### `foundation.dimension.8`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 8px (0.5rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.space.sm`, `semantic.space.sm`

### `foundation.dimension.80`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 80px (5rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.space.section.xl`, `semantic.space.section.xl`

### `foundation.dimension.800`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 800px (50rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.size.layout.lg`, `semantic.size.layout.lg`

### `foundation.dimension.96`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Dimensão fixa de 96px (6rem).
- **Escopo**: gap, padding, size
- **Contexto**: Use via Semantic `space.*` (gap/padding) ou `size.*` (width/height). Componentes não consomem direto.
- **Decisão**: Step da escala 2/4/6/8/10/12/14/16/20/24/28/32/36/40/44/48 — múltiplos de 2 e 4 cobrem todas as densidades de UI.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.size.4xl`, `semantic.size.4xl`

### `foundation.duration.fast`

- **Camada**: foundation
- **Tipo**: `duration`
- **Sentido**: Duração de transição fast.
- **Escopo**: transition-duration, animation-duration
- **Contexto**: Use via Semantic `motion.duration.*` em transition/animation CSS.
- **Decisão**: 150ms (microinteractions)
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.motion.duration.fast`, `semantic.motion.duration.fast`

### `foundation.duration.normal`

- **Camada**: foundation
- **Tipo**: `duration`
- **Sentido**: Duração de transição normal.
- **Escopo**: transition-duration, animation-duration
- **Contexto**: Use via Semantic `motion.duration.*` em transition/animation CSS.
- **Decisão**: 250ms (state changes)
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.motion.duration.normal`, `semantic.motion.duration.normal`

### `foundation.duration.slow`

- **Camada**: foundation
- **Tipo**: `duration`
- **Sentido**: Duração de transição slow.
- **Escopo**: transition-duration, animation-duration
- **Contexto**: Use via Semantic `motion.duration.*` em transition/animation CSS.
- **Decisão**: 400ms (modals)
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.motion.duration.slow`, `semantic.motion.duration.slow`

### `foundation.ease.default`

- **Camada**: foundation
- **Tipo**: `cubicBezier`
- **Sentido**: Curva cubic-bezier default.
- **Escopo**: transition-timing-function, animation-timing-function
- **Contexto**: Pareada com duration via Semantic `motion.ease.*`.
- **Decisão**: Acelera e desacelera — para elementos persistentes.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.motion.ease.default`, `semantic.motion.ease.default`

### `foundation.ease.in`

- **Camada**: foundation
- **Tipo**: `cubicBezier`
- **Sentido**: Curva cubic-bezier in.
- **Escopo**: transition-timing-function, animation-timing-function
- **Contexto**: Pareada com duration via Semantic `motion.ease.*`.
- **Decisão**: Acelera no início — para elementos saindo.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.ease.in-out`

- **Camada**: foundation
- **Tipo**: `cubicBezier`
- **Sentido**: Curva cubic-bezier in-out.
- **Escopo**: transition-timing-function, animation-timing-function
- **Contexto**: Pareada com duration via Semantic `motion.ease.*`.
- **Decisão**: Acelera e desacelera — para elementos persistentes.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.ease.out`

- **Camada**: foundation
- **Tipo**: `cubicBezier`
- **Sentido**: Curva cubic-bezier out.
- **Escopo**: transition-timing-function, animation-timing-function
- **Contexto**: Pareada com duration via Semantic `motion.ease.*`.
- **Decisão**: Desacelera no fim — para elementos entrando.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.opacity.10`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Opacidade 10%.
- **Escopo**: opacity
- **Contexto**: Use via Semantic `opacity.disabled` ou aplique direto em CSS para overlays.
- **Decisão**: Escala discreta 5/10/25/50/75/100 cobre subtle hints (5–10), translucent overlays (25), disabled (50), focus (75), full (100).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.opacity.100`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Opacidade 100%.
- **Escopo**: opacity
- **Contexto**: Use via Semantic `opacity.disabled` ou aplique direto em CSS para overlays.
- **Decisão**: Escala discreta 5/10/25/50/75/100 cobre subtle hints (5–10), translucent overlays (25), disabled (50), focus (75), full (100).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.opacity.25`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Opacidade 25%.
- **Escopo**: opacity
- **Contexto**: Use via Semantic `opacity.disabled` ou aplique direto em CSS para overlays.
- **Decisão**: Escala discreta 5/10/25/50/75/100 cobre subtle hints (5–10), translucent overlays (25), disabled (50), focus (75), full (100).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.opacity.5`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Opacidade 5%.
- **Escopo**: opacity
- **Contexto**: Use via Semantic `opacity.disabled` ou aplique direto em CSS para overlays.
- **Decisão**: Escala discreta 5/10/25/50/75/100 cobre subtle hints (5–10), translucent overlays (25), disabled (50), focus (75), full (100).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.opacity.50`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Opacidade 50%.
- **Escopo**: opacity
- **Contexto**: Use via Semantic `opacity.disabled` ou aplique direto em CSS para overlays.
- **Decisão**: Escala discreta 5/10/25/50/75/100 cobre subtle hints (5–10), translucent overlays (25), disabled (50), focus (75), full (100).
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.opacity.disabled`, `semantic.opacity.disabled`

### `foundation.opacity.75`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Opacidade 75%.
- **Escopo**: opacity
- **Contexto**: Use via Semantic `opacity.disabled` ou aplique direto em CSS para overlays.
- **Decisão**: Escala discreta 5/10/25/50/75/100 cobre subtle hints (5–10), translucent overlays (25), disabled (50), focus (75), full (100).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.radius.12`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Raio de borda de 12px.
- **Escopo**: border-radius
- **Contexto**: Use via Semantic `radius.{sm|md|lg|xl|full}` em componentes.
- **Decisão**: Step da escala 2/4/8/12/16/24/999. Cobre chips (2–4), inputs/buttons (4–8), cards (8–12), modals (16–24), pills (999).
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.radius.lg`, `semantic.radius.lg`

### `foundation.radius.16`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Raio de borda de 16px.
- **Escopo**: border-radius
- **Contexto**: Use via Semantic `radius.{sm|md|lg|xl|full}` em componentes.
- **Decisão**: Step da escala 2/4/8/12/16/24/999. Cobre chips (2–4), inputs/buttons (4–8), cards (8–12), modals (16–24), pills (999).
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.radius.xl`, `semantic.radius.xl`

### `foundation.radius.2`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Raio de borda de 2px.
- **Escopo**: border-radius
- **Contexto**: Use via Semantic `radius.{sm|md|lg|xl|full}` em componentes.
- **Decisão**: Step da escala 2/4/8/12/16/24/999. Cobre chips (2–4), inputs/buttons (4–8), cards (8–12), modals (16–24), pills (999).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.radius.24`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Raio de borda de 24px.
- **Escopo**: border-radius
- **Contexto**: Use via Semantic `radius.{sm|md|lg|xl|full}` em componentes.
- **Decisão**: Step da escala 2/4/8/12/16/24/999. Cobre chips (2–4), inputs/buttons (4–8), cards (8–12), modals (16–24), pills (999).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.radius.4`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Raio de borda de 4px.
- **Escopo**: border-radius
- **Contexto**: Use via Semantic `radius.{sm|md|lg|xl|full}` em componentes.
- **Decisão**: Step da escala 2/4/8/12/16/24/999. Cobre chips (2–4), inputs/buttons (4–8), cards (8–12), modals (16–24), pills (999).
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.radius.sm`, `semantic.radius.sm`

### `foundation.radius.8`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Raio de borda de 8px.
- **Escopo**: border-radius
- **Contexto**: Use via Semantic `radius.{sm|md|lg|xl|full}` em componentes.
- **Decisão**: Step da escala 2/4/8/12/16/24/999. Cobre chips (2–4), inputs/buttons (4–8), cards (8–12), modals (16–24), pills (999).
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.radius.md`, `semantic.radius.md`

### `foundation.radius.999`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Raio máximo (999px) pra pill/circle.
- **Escopo**: border-radius
- **Contexto**: Aplicado via Semantic `radius.full` em avatars, badges pill, toggles redondos.
- **Decisão**: 999 (vs 9999) acompanha valor Figma. Funciona como ∞ em qualquer elemento até ~2000px.
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
  - Tokens que referenciam: `semantic.radius.full`, `semantic.radius.full`

### `foundation.shadow.2xl`

- **Camada**: foundation
- **Tipo**: `shadow`
- **Sentido**: Sombra de elevação 2xl.
- **Escopo**: box-shadow
- **Contexto**: Use via Semantic `surface.{raised|overlay|elevated}` ou em modais/dropdowns. Não aplique direto em texto.
- **Decisão**: Escala xs (cards), sm (popovers), md (dropdowns), lg (drawers), xl (modals), 2xl (max elevation).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.shadow.lg`

- **Camada**: foundation
- **Tipo**: `shadow`
- **Sentido**: Sombra de elevação lg.
- **Escopo**: box-shadow
- **Contexto**: Use via Semantic `surface.{raised|overlay|elevated}` ou em modais/dropdowns. Não aplique direto em texto.
- **Decisão**: Escala xs (cards), sm (popovers), md (dropdowns), lg (drawers), xl (modals), 2xl (max elevation).
- **Usos**:
  - CSS:
    - `css/utilities/elevation.css` (1×)

### `foundation.shadow.md`

- **Camada**: foundation
- **Tipo**: `shadow`
- **Sentido**: Sombra de elevação md.
- **Escopo**: box-shadow
- **Contexto**: Use via Semantic `surface.{raised|overlay|elevated}` ou em modais/dropdowns. Não aplique direto em texto.
- **Decisão**: Escala xs (cards), sm (popovers), md (dropdowns), lg (drawers), xl (modals), 2xl (max elevation).
- **Usos**:
  - CSS:
    - `css/utilities/elevation.css` (1×)

### `foundation.shadow.none`

- **Camada**: foundation
- **Tipo**: `shadow`
- **Sentido**: Sem sombra (level 0 de elevação).
- **Escopo**: box-shadow
- **Contexto**: Use via Semantic `surface.flat` ou em estados disabled.
- **Decisão**: Token explícito pra reset — facilita override em variants.
- **Usos**:
  - CSS:
    - `css/utilities/elevation.css` (1×)

### `foundation.shadow.sm`

- **Camada**: foundation
- **Tipo**: `shadow`
- **Sentido**: Sombra de elevação sm.
- **Escopo**: box-shadow
- **Contexto**: Use via Semantic `surface.{raised|overlay|elevated}` ou em modais/dropdowns. Não aplique direto em texto.
- **Decisão**: Escala xs (cards), sm (popovers), md (dropdowns), lg (drawers), xl (modals), 2xl (max elevation).
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
    - `css/utilities/elevation.css` (1×)
  - Tokens que referenciam: `semantic.shadow.card`, `semantic.shadow.card`

### `foundation.shadow.xl`

- **Camada**: foundation
- **Tipo**: `shadow`
- **Sentido**: Sombra de elevação xl.
- **Escopo**: box-shadow
- **Contexto**: Use via Semantic `surface.{raised|overlay|elevated}` ou em modais/dropdowns. Não aplique direto em texto.
- **Decisão**: Escala xs (cards), sm (popovers), md (dropdowns), lg (drawers), xl (modals), 2xl (max elevation).
- **Usos**:
  - CSS:
    - `css/tokens/generated/theme-dark.css` (1×)
    - `css/tokens/generated/theme-light.css` (1×)
    - `css/utilities/elevation.css` (1×)
  - Tokens que referenciam: `semantic.shadow.modal`, `semantic.shadow.modal`

### `foundation.shadow.xs`

- **Camada**: foundation
- **Tipo**: `shadow`
- **Sentido**: Sombra de elevação xs.
- **Escopo**: box-shadow
- **Contexto**: Use via Semantic `surface.{raised|overlay|elevated}` ou em modais/dropdowns. Não aplique direto em texto.
- **Decisão**: Escala xs (cards), sm (popovers), md (dropdowns), lg (drawers), xl (modals), 2xl (max elevation).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.font.family.display`

- **Camada**: foundation
- **Tipo**: `fontFamily`
- **Sentido**: Font family display.
- **Escopo**: font-family
- **Contexto**: Use via Semantic `body.font-family.{sans|mono|display}`. Figma armazena só o nome primário; CSS expõe stack de fallback.
- **Decisão**: Inter — sans-serif neutro com excelente legibilidade em UI.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.font.family.mono`

- **Camada**: foundation
- **Tipo**: `fontFamily`
- **Sentido**: Font family mono.
- **Escopo**: font-family
- **Contexto**: Use via Semantic `body.font-family.{sans|mono|display}`. Figma armazena só o nome primário; CSS expõe stack de fallback.
- **Decisão**: DM Mono — escolha que parea com Inter, fallback pra JetBrains Mono / Fira Code / Consolas.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-family.mono`, `semantic.typography.body.font-family.mono`

### `foundation.typography.font.family.sans`

- **Camada**: foundation
- **Tipo**: `fontFamily`
- **Sentido**: Font family sans.
- **Escopo**: font-family
- **Contexto**: Use via Semantic `body.font-family.{sans|mono|display}`. Figma armazena só o nome primário; CSS expõe stack de fallback.
- **Decisão**: Inter — sans-serif neutro com excelente legibilidade em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-family.sans`, `semantic.typography.body.font-family.sans`

### `foundation.typography.font.size.11`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 11px (0.6875rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. ⚠️ Abaixo de 12px viola WCAG 1.4.4 — usar só pra meta-info.
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.2xs`, `semantic.typography.body.font-size.2xs`

### `foundation.typography.font.size.12`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 12px (0.75rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.xs`, `semantic.typography.body.font-size.xs`

### `foundation.typography.font.size.14`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 14px (0.875rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.sm`, `semantic.typography.body.font-size.sm`

### `foundation.typography.font.size.16`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 16px (1rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.md`, `semantic.typography.body.font-size.md`

### `foundation.typography.font.size.18`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 18px (1.125rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.lg`, `semantic.typography.body.font-size.lg`

### `foundation.typography.font.size.20`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 20px (1.25rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.xl`, `semantic.typography.body.font-size.xl`

### `foundation.typography.font.size.24`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 24px (1.5rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.2xl`, `semantic.typography.body.font-size.2xl`

### `foundation.typography.font.size.28`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 28px (1.75rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.3xl`, `semantic.typography.body.font-size.3xl`

### `foundation.typography.font.size.32`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 32px (2rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.4xl`, `semantic.typography.body.font-size.4xl`

### `foundation.typography.font.size.40`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 40px (2.5rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.5xl`, `semantic.typography.body.font-size.5xl`

### `foundation.typography.font.size.48`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 48px (3rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.6xl`, `semantic.typography.body.font-size.6xl`

### `foundation.typography.font.size.56`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 56px (3.5rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.7xl`, `semantic.typography.body.font-size.7xl`

### `foundation.typography.font.size.64`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 64px (4rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.8xl`, `semantic.typography.body.font-size.8xl`

### `foundation.typography.font.size.72`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Font-size 72px (4.5rem).
- **Escopo**: font-size
- **Contexto**: Use via Semantic `body.font-size.{xs|sm|md|lg|xl|...}` ou via Text Style apropriado. 
- **Decisão**: Step da escala tipográfica major-second-ish (12/14/16/18/20/24/30/36/48/60/72). 14 e 16 são os tamanhos primários de body em UI.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-size.9xl`, `semantic.typography.body.font-size.9xl`

### `foundation.typography.font.weight.bold`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Font-weight bold (numeric 700 em CSS).
- **Escopo**: font-weight
- **Contexto**: Use via Semantic `body.font-weight.{regular|medium|semibold|bold}`. Figma usa nome (Regular/Medium/Semi Bold/Bold), CSS usa número.
- **Decisão**: Inter suporta esses 4 pesos com bom rendering. Bold em labels pra controles, semibold em headings, medium em emphasis inline, regular em body.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-weight.bold`, `semantic.typography.body.font-weight.bold`

### `foundation.typography.font.weight.medium`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Font-weight medium (numeric 500 em CSS).
- **Escopo**: font-weight
- **Contexto**: Use via Semantic `body.font-weight.{regular|medium|semibold|bold}`. Figma usa nome (Regular/Medium/Semi Bold/Bold), CSS usa número.
- **Decisão**: Inter suporta esses 4 pesos com bom rendering. Bold em labels pra controles, semibold em headings, medium em emphasis inline, regular em body.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-weight.medium`, `semantic.typography.body.font-weight.medium`

### `foundation.typography.font.weight.regular`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Font-weight regular (numeric 400 em CSS).
- **Escopo**: font-weight
- **Contexto**: Use via Semantic `body.font-weight.{regular|medium|semibold|bold}`. Figma usa nome (Regular/Medium/Semi Bold/Bold), CSS usa número.
- **Decisão**: Inter suporta esses 4 pesos com bom rendering. Bold em labels pra controles, semibold em headings, medium em emphasis inline, regular em body.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-weight.regular`, `semantic.typography.body.font-weight.regular`

### `foundation.typography.font.weight.semibold`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Font-weight semibold (numeric 600 em CSS).
- **Escopo**: font-weight
- **Contexto**: Use via Semantic `body.font-weight.{regular|medium|semibold|bold}`. Figma usa nome (Regular/Medium/Semi Bold/Bold), CSS usa número.
- **Decisão**: Inter suporta esses 4 pesos com bom rendering. Bold em labels pra controles, semibold em headings, medium em emphasis inline, regular em body.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.font-weight.semibold`, `semantic.typography.body.font-weight.semibold`

### `foundation.typography.letter.spacing.normal`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Letter-spacing normal.
- **Escopo**: letter-spacing
- **Contexto**: Aplicado via Text Style. Tight em display sizes, normal em body, wide/wider em overline/uppercase.
- **Decisão**: Escala tight (-0.02em) → normal (0) → wide (0.02em) → wider (0.05em) cobre todas as densidades.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.letter-spacing.normal`, `semantic.typography.body.letter-spacing.normal`

### `foundation.typography.letter.spacing.tight`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Letter-spacing tight.
- **Escopo**: letter-spacing
- **Contexto**: Aplicado via Text Style. Tight em display sizes, normal em body, wide/wider em overline/uppercase.
- **Decisão**: Escala tight (-0.02em) → normal (0) → wide (0.02em) → wider (0.05em) cobre todas as densidades.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.letter-spacing.tight`, `semantic.typography.body.letter-spacing.tight`

### `foundation.typography.letter.spacing.tighter`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Letter-spacing tighter.
- **Escopo**: letter-spacing
- **Contexto**: Aplicado via Text Style. Tight em display sizes, normal em body, wide/wider em overline/uppercase.
- **Decisão**: Escala tight (-0.02em) → normal (0) → wide (0.02em) → wider (0.05em) cobre todas as densidades.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.letter.spacing.wide`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Letter-spacing wide.
- **Escopo**: letter-spacing
- **Contexto**: Aplicado via Text Style. Tight em display sizes, normal em body, wide/wider em overline/uppercase.
- **Decisão**: Escala tight (-0.02em) → normal (0) → wide (0.02em) → wider (0.05em) cobre todas as densidades.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.letter.spacing.wider`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Letter-spacing wider.
- **Escopo**: letter-spacing
- **Contexto**: Aplicado via Text Style. Tight em display sizes, normal em body, wide/wider em overline/uppercase.
- **Decisão**: Escala tight (-0.02em) → normal (0) → wide (0.02em) → wider (0.05em) cobre todas as densidades.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.letter-spacing.wider`, `semantic.typography.body.letter-spacing.wider`

### `foundation.typography.line.height.16`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 16 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.2xs`, `semantic.typography.body.line-height.2xs`

### `foundation.typography.line.height.18`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 18 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.xs`, `semantic.typography.body.line-height.xs`

### `foundation.typography.line.height.20`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 20 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.sm`, `semantic.typography.body.line-height.sm`

### `foundation.typography.line.height.22`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 22 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.24`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 24 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.md`, `semantic.typography.body.line-height.md`

### `foundation.typography.line.height.26`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 26 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.28`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 28 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.lg`, `semantic.typography.body.line-height.lg`

### `foundation.typography.line.height.32`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 32 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.xl`, `semantic.typography.body.line-height.xl`

### `foundation.typography.line.height.34`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 34 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.2xl`, `semantic.typography.body.line-height.2xl`

### `foundation.typography.line.height.40`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 40 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.3xl`, `semantic.typography.body.line-height.3xl`

### `foundation.typography.line.height.44`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 44 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.4xl`, `semantic.typography.body.line-height.4xl`

### `foundation.typography.line.height.48`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 48 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.5xl`, `semantic.typography.body.line-height.5xl`

### `foundation.typography.line.height.50`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 50 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.60`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 60 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.64`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 64 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.6xl`, `semantic.typography.body.line-height.6xl`

### `foundation.typography.line.height.70`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 70 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.72`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 72 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.7xl`, `semantic.typography.body.line-height.7xl`

### `foundation.typography.line.height.80`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 80 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.8xl`, `semantic.typography.body.line-height.8xl`

### `foundation.typography.line.height.90`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height 90 (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - Tokens que referenciam: `semantic.typography.body.line-height.9xl`, `semantic.typography.body.line-height.9xl`

### `foundation.typography.line.height.control.lg`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height control (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.control.md`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height control (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.control.sm`

- **Camada**: foundation
- **Tipo**: `dimension`
- **Sentido**: Line-height control (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.loose`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Line-height loose (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.none`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Line-height none (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.normal`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Line-height normal (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.relaxed`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Line-height relaxed (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.snug`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Line-height snug (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.typography.line.height.tight`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Line-height tight (representação rem/ratio pro CSS).
- **Escopo**: line-height
- **Contexto**: Versão CSS-friendly do line-height (ADR-012). Pareada com font-size.
- **Decisão**: JSON-only: rem absoluto (1.5rem = 24px) pra cumprir WCAG 1.4.4 (Resize Text). Figma armazena em PX no path paralelo `font.line-height.*`.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.z.0`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Z-index camada 0 (base/in-flow).
- **Escopo**: z-index
- **Contexto**: Use via Semantic `z.{base|dropdown|...}`. Componentes top-level (modal, toast, drawer) consomem direto.
- **Decisão**: Escala 0–50 em steps de 10 reserva slots intermediários (5, 15) pra ajustes finos sem refator. Topbar do site usa calc(var(--ds-z-50) + 10) = 60.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.z.10`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Z-index camada 10 (dropdown/popover).
- **Escopo**: z-index
- **Contexto**: Use via Semantic `z.{base|dropdown|...}`. Componentes top-level (modal, toast, drawer) consomem direto.
- **Decisão**: Escala 0–50 em steps de 10 reserva slots intermediários (5, 15) pra ajustes finos sem refator. Topbar do site usa calc(var(--ds-z-50) + 10) = 60.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.z.20`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Z-index camada 20 (sticky header/overlay).
- **Escopo**: z-index
- **Contexto**: Use via Semantic `z.{base|dropdown|...}`. Componentes top-level (modal, toast, drawer) consomem direto.
- **Decisão**: Escala 0–50 em steps de 10 reserva slots intermediários (5, 15) pra ajustes finos sem refator. Topbar do site usa calc(var(--ds-z-50) + 10) = 60.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.z.30`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Z-index camada 30 (drawer).
- **Escopo**: z-index
- **Contexto**: Use via Semantic `z.{base|dropdown|...}`. Componentes top-level (modal, toast, drawer) consomem direto.
- **Decisão**: Escala 0–50 em steps de 10 reserva slots intermediários (5, 15) pra ajustes finos sem refator. Topbar do site usa calc(var(--ds-z-50) + 10) = 60.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.z.40`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Z-index camada 40 (modal).
- **Escopo**: z-index
- **Contexto**: Use via Semantic `z.{base|dropdown|...}`. Componentes top-level (modal, toast, drawer) consomem direto.
- **Decisão**: Escala 0–50 em steps de 10 reserva slots intermediários (5, 15) pra ajustes finos sem refator. Topbar do site usa calc(var(--ds-z-50) + 10) = 60.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `foundation.z.50`

- **Camada**: foundation
- **Tipo**: `number`
- **Sentido**: Z-index camada 50 (toast/snackbar).
- **Escopo**: z-index
- **Contexto**: Use via Semantic `z.{base|dropdown|...}`. Componentes top-level (modal, toast, drawer) consomem direto.
- **Decisão**: Escala 0–50 em steps de 10 reserva slots intermediários (5, 15) pra ajustes finos sem refator. Topbar do site usa calc(var(--ds-z-50) + 10) = 60.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.background.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Background base do app — superfície neutra mais comum.
- **Escopo**: background-color
- **Contexto**: Use em containers, frames, cards. Não consuma Foundation `color.*` direto.
- **Decisão**: Aliasado a foundation.color.neutral.50 (light) — Semantic encapsula a decisão de qual tom da paleta usar.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)

### `semantic.background.disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.200`
- **Sentido**: Background pra estados disabled — neutral subtle.
- **Escopo**: background-color
- **Contexto**: Use em containers, frames, cards. Não consuma Foundation `color.*` direto.
- **Decisão**: Aliasado a foundation.color.neutral.200 (light) — Semantic encapsula a decisão de qual tom da paleta usar.
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)
    - `css/components/checkbox.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/textarea.css` (1×)
    - `css/components/toggle.css` (1×)

### `semantic.background.inverse`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.900`
- **Sentido**: Background invertido — usado em tooltips, snackbars, dark badges em light mode.
- **Escopo**: background-color
- **Contexto**: Use em containers, frames, cards. Não consuma Foundation `color.*` direto.
- **Decisão**: Aliasado a foundation.color.neutral.900 (light) — Semantic encapsula a decisão de qual tom da paleta usar.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/tooltip.css` (5×)

### `semantic.background.overlay`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.black.60`
- **Sentido**: Scrim de modal/drawer — escurece o fundo pra focar o overlay.
- **Escopo**: background-color
- **Contexto**: Use em containers, frames, cards. Não consuma Foundation `color.*` direto.
- **Decisão**: Aliasado a foundation.color.overlay.black.40 (light) — Semantic encapsula a decisão de qual tom da paleta usar.
- **Usos**:
  - CSS:
    - `css/components/modal.css` (1×)

### `semantic.background.subtle`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.200`
- **Sentido**: Background levemente diferenciado — chips, código inline, áreas secundárias.
- **Escopo**: background-color
- **Contexto**: Use em containers, frames, cards. Não consuma Foundation `color.*` direto.
- **Decisão**: Aliasado a foundation.color.neutral.200 (light) — Semantic encapsula a decisão de qual tom da paleta usar.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/skeleton.css` (1×)
    - `css/components/textarea.css` (1×)

### `semantic.border.brand`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.brand.600`
- **Sentido**: Borda brand — emphasis branded.
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.brand.600.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.border.control-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.500`
- **Sentido**: Border control-default.
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.neutral.500.
- **Usos**:
  - CSS:
    - `css/components/checkbox.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/textarea.css` (1×)
    - `css/components/toggle.css` (1×)

### `semantic.border.control-disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.300`
- **Sentido**: Border control-disabled.
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.neutral.300.
- **Usos**:
  - CSS:
    - `css/components/checkbox.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/textarea.css` (1×)
    - `css/components/toggle.css` (1×)

### `semantic.border.control-hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.600`
- **Sentido**: Border control-hover.
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.neutral.600.
- **Usos**:
  - CSS:
    - `css/components/input.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/textarea.css` (1×)

### `semantic.border.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.300`
- **Sentido**: Borda neutra default — cards, dividers.
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.neutral.300.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/card.css` (1×)
    - `css/components/tabs.css` (1×)

### `semantic.border.error`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.red.600`
- **Sentido**: Borda de erro — input invalid.
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.red.600.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.border.focus`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.brand.500`
- **Sentido**: Focus ring color (WCAG 2.4.7).
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.brand.500.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/breadcrumb.css` (1×)
    - `css/components/button.css` (1×)
    - `css/components/checkbox.css` (1×)
    - `css/components/input.css` (2×)
    - `css/components/link.css` (1×)
    - `css/components/modal.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/select.css` (2×)
    - `css/components/tabs.css` (1×)
    - `css/components/textarea.css` (2×)
    - `css/components/toggle.css` (1×)

### `semantic.border.focus-error`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.red.500`
- **Sentido**: Focus ring em estado error (apenas em focus, não default).
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.red.500.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.border.inverse`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Borda invertida — sobre dark surfaces em light mode.
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.neutral.50.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.border.strong`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.600`
- **Sentido**: Borda neutra forte — emphasis em separadores.
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.neutral.600.
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)

### `semantic.border.subtle`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.200`
- **Sentido**: Borda neutra sutil — chips, code blocks.
- **Escopo**: border-color, outline-color
- **Contexto**: Use em `border-color` ou `outline-color`. Pareado com border-width apropriado.
- **Decisão**: Aliasado a foundation.color.neutral.200.
- **Usos**:
  - CSS:
    - `css/components/card.css` (2×)
    - `css/components/divider.css` (1×)
    - `css/components/modal.css` (1×)
    - `css/components/spinner.css` (1×)

### `semantic.border.width.default`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.border.width.1`
- **Sentido**: Border-width default.
- **Escopo**: border-width
- **Contexto**: Use em bordas de inputs, cards, dividers, focus rings.
- **Decisão**: Alias direto a Foundation foundation.border.width.1.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/alert.css` (4×)
    - `css/components/button.css` (1×)
    - `css/components/card.css` (3×)
    - `css/components/checkbox.css` (1×)
    - `css/components/divider.css` (2×)
    - `css/components/input.css` (1×)
    - `css/components/modal.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/tabs.css` (1×)
    - `css/components/textarea.css` (1×)
    - `css/components/toggle.css` (1×)

### `semantic.border.width.focus`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.border.width.2`
- **Sentido**: Border-width focus.
- **Escopo**: border-width
- **Contexto**: Use em bordas de inputs, cards, dividers, focus rings.
- **Decisão**: Alias direto a Foundation foundation.border.width.2.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (2×)
    - `css/components/breadcrumb.css` (2×)
    - `css/components/button.css` (2×)
    - `css/components/checkbox.css` (2×)
    - `css/components/input.css` (4×)
    - `css/components/link.css` (1×)
    - `css/components/modal.css` (2×)
    - `css/components/radio.css` (2×)
    - `css/components/select.css` (4×)
    - `css/components/tabs.css` (2×)
    - `css/components/textarea.css` (4×)
    - `css/components/toggle.css` (2×)

### `semantic.border.width.strong`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.border.width.2`
- **Sentido**: Border-width strong.
- **Escopo**: border-width
- **Contexto**: Use em bordas de inputs, cards, dividers, focus rings.
- **Decisão**: Alias direto a Foundation foundation.border.width.2.
- **Usos**:
  - CSS:
    - `css/components/tabs.css` (1×)

### `semantic.content.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.900`
- **Sentido**: Texto primário — body, headings, labels principais.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `color` de texto. Pareado com background apropriado pra atender contraste WCAG AA (4.5:1 normal, 3:1 large).
- **Decisão**: Aliasado a foundation.color.neutral.900.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/alert.css` (4×)
    - `css/components/card.css` (1×)
    - `css/components/checkbox.css` (3×)
    - `css/components/input.css` (2×)
    - `css/components/modal.css` (3×)
    - `css/components/radio.css` (4×)
    - `css/components/select.css` (1×)
    - `css/components/tabs.css` (1×)
    - `css/components/textarea.css` (1×)
    - `css/components/toggle.css` (3×)

### `semantic.content.disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.400`
- **Sentido**: Texto disabled — controles e items inativos.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `color` de texto. Pareado com background apropriado pra atender contraste WCAG AA (4.5:1 normal, 3:1 large).
- **Decisão**: Aliasado a foundation.color.neutral.400.
- **Usos**:
  - CSS:
    - `css/components/input.css` (2×)
    - `css/components/select.css` (2×)
    - `css/components/tabs.css` (1×)
    - `css/components/textarea.css` (2×)
    - `css/components/toggle.css` (1×)

### `semantic.content.inverse`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Texto invertido — sobre background.inverse (tooltips, badges escuros em light).
- **Escopo**: color, fill
- **Contexto**: Aplicado em `color` de texto. Pareado com background apropriado pra atender contraste WCAG AA (4.5:1 normal, 3:1 large).
- **Decisão**: Aliasado a foundation.color.neutral.50.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/tooltip.css` (1×)

### `semantic.content.secondary`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.600`
- **Sentido**: Texto secundário — descrições, helper text, meta-info.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `color` de texto. Pareado com background apropriado pra atender contraste WCAG AA (4.5:1 normal, 3:1 large).
- **Decisão**: Aliasado a foundation.color.neutral.600.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/breadcrumb.css` (2×)
    - `css/components/card.css` (2×)
    - `css/components/checkbox.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/modal.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/tabs.css` (1×)
    - `css/components/textarea.css` (1×)
    - `css/components/toggle.css` (2×)

### `semantic.content.tertiary`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.500`
- **Sentido**: Texto terciário — caption, footnote, timestamps.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `color` de texto. Pareado com background apropriado pra atender contraste WCAG AA (4.5:1 normal, 3:1 large).
- **Decisão**: Aliasado a foundation.color.neutral.500.
- **Usos**:
  - CSS:
    - `css/components/input.css` (2×)
    - `css/components/select.css` (3×)
    - `css/components/textarea.css` (1×)

### `semantic.feedback.error.background.active`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.red.900`
- **Sentido**: Fill de feedback erro (vermelho) em estado active.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation red.* via alias.
- **Decisão**: Aliasado a foundation.color.red.900.
- **Usos**:
  - CSS:
    - `css/components/button.css` (2×)

### `semantic.feedback.error.background.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.red.600`
- **Sentido**: Fill de feedback erro (vermelho) em estado default.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation red.* via alias.
- **Decisão**: Aliasado a foundation.color.red.600.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (2×)
    - `css/components/checkbox.css` (2×)
    - `css/components/input.css` (6×)
    - `css/components/radio.css` (3×)
    - `css/components/select.css` (3×)
    - `css/components/textarea.css` (3×)

### `semantic.feedback.error.background.disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.disabled.error-light`
- **Sentido**: Fill de feedback erro (vermelho) em estado disabled.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation red.* via alias.
- **Decisão**: Aliasado a foundation.color.disabled.error-light.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.feedback.error.background.hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.red.800`
- **Sentido**: Fill de feedback erro (vermelho) em estado hover.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation red.* via alias.
- **Decisão**: Aliasado a foundation.color.red.800.
- **Usos**:
  - CSS:
    - `css/components/button.css` (2×)

### `semantic.feedback.error.background.subtle`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.red.100`
- **Sentido**: Fill de feedback erro (vermelho) em estado subtle.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation red.* via alias.
- **Decisão**: Aliasado a foundation.color.red.100.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)

### `semantic.feedback.error.border-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.red.500`
- **Sentido**: Borda de feedback erro (vermelho) em estado default.
- **Escopo**: border-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation red.* via alias.
- **Decisão**: Aliasado a foundation.color.red.500.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/checkbox.css` (1×)

### `semantic.feedback.error.content-contrast`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Cor de feedback erro (vermelho) em estado contrast.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation red.* via alias.
- **Decisão**: Aliasado a foundation.color.neutral.50.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (1×)

### `semantic.feedback.error.content-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.red.700`
- **Sentido**: Cor de feedback erro (vermelho) em estado default.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation red.* via alias.
- **Decisão**: Aliasado a foundation.color.red.700.
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)
    - `css/components/checkbox.css` (1×)
    - `css/components/radio.css` (2×)
    - `css/components/textarea.css` (1×)

### `semantic.feedback.error.content-disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.white.80`
- **Sentido**: Cor de feedback erro (vermelho) em estado disabled.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation red.* via alias.
- **Decisão**: Aliasado a foundation.color.overlay.white.80.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.feedback.info.background.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.sky.500`
- **Sentido**: Fill de feedback informação (azul) em estado default.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation sky.* via alias.
- **Decisão**: Aliasado a foundation.color.sky.500.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)

### `semantic.feedback.info.background.hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.sky.600`
- **Sentido**: Fill de feedback informação (azul) em estado hover.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation sky.* via alias.
- **Decisão**: Aliasado a foundation.color.sky.600.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.feedback.info.background.subtle`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.sky.100`
- **Sentido**: Fill de feedback informação (azul) em estado subtle.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation sky.* via alias.
- **Decisão**: Aliasado a foundation.color.sky.100.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)

### `semantic.feedback.info.border-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.sky.500`
- **Sentido**: Borda de feedback informação (azul) em estado default.
- **Escopo**: border-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation sky.* via alias.
- **Decisão**: Aliasado a foundation.color.sky.500.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)

### `semantic.feedback.info.content-contrast`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.900`
- **Sentido**: Cor de feedback informação (azul) em estado contrast.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation sky.* via alias.
- **Decisão**: Aliasado a foundation.color.neutral.900.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)

### `semantic.feedback.info.content-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.sky.700`
- **Sentido**: Cor de feedback informação (azul) em estado default.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation sky.* via alias.
- **Decisão**: Aliasado a foundation.color.sky.700.
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)

### `semantic.feedback.success.background.active`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.green.900`
- **Sentido**: Fill de feedback sucesso (verde) em estado active.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation green.* via alias.
- **Decisão**: Aliasado a foundation.color.green.900.
- **Usos**:
  - CSS:
    - `css/components/button.css` (2×)

### `semantic.feedback.success.background.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.green.600`
- **Sentido**: Fill de feedback sucesso (verde) em estado default.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation green.* via alias.
- **Decisão**: Aliasado a foundation.color.green.600.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (2×)

### `semantic.feedback.success.background.disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.disabled.success-light`
- **Sentido**: Fill de feedback sucesso (verde) em estado disabled.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation green.* via alias.
- **Decisão**: Aliasado a foundation.color.disabled.success-light.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.feedback.success.background.hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.green.800`
- **Sentido**: Fill de feedback sucesso (verde) em estado hover.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation green.* via alias.
- **Decisão**: Aliasado a foundation.color.green.800.
- **Usos**:
  - CSS:
    - `css/components/button.css` (2×)

### `semantic.feedback.success.background.subtle`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.green.100`
- **Sentido**: Fill de feedback sucesso (verde) em estado subtle.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation green.* via alias.
- **Decisão**: Aliasado a foundation.color.green.100.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)

### `semantic.feedback.success.border-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.green.500`
- **Sentido**: Borda de feedback sucesso (verde) em estado default.
- **Escopo**: border-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation green.* via alias.
- **Decisão**: Aliasado a foundation.color.green.500.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)

### `semantic.feedback.success.content-contrast`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Cor de feedback sucesso (verde) em estado contrast.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation green.* via alias.
- **Decisão**: Aliasado a foundation.color.neutral.50.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (1×)

### `semantic.feedback.success.content-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.green.700`
- **Sentido**: Cor de feedback sucesso (verde) em estado default.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation green.* via alias.
- **Decisão**: Aliasado a foundation.color.green.700.
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)

### `semantic.feedback.success.content-disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.white.80`
- **Sentido**: Cor de feedback sucesso (verde) em estado disabled.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation green.* via alias.
- **Decisão**: Aliasado a foundation.color.overlay.white.80.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.feedback.warning.background.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.amber.500`
- **Sentido**: Fill de feedback aviso (âmbar) em estado default.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation amber.* via alias.
- **Decisão**: Aliasado a foundation.color.amber.500.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)

### `semantic.feedback.warning.background.hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.amber.600`
- **Sentido**: Fill de feedback aviso (âmbar) em estado hover.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation amber.* via alias.
- **Decisão**: Aliasado a foundation.color.amber.600.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.feedback.warning.background.subtle`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.amber.100`
- **Sentido**: Fill de feedback aviso (âmbar) em estado subtle.
- **Escopo**: background-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation amber.* via alias.
- **Decisão**: Aliasado a foundation.color.amber.100.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)

### `semantic.feedback.warning.border-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.amber.500`
- **Sentido**: Borda de feedback aviso (âmbar) em estado default.
- **Escopo**: border-color
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation amber.* via alias.
- **Decisão**: Aliasado a foundation.color.amber.500.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)

### `semantic.feedback.warning.content-contrast`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.900`
- **Sentido**: Cor de feedback aviso (âmbar) em estado contrast.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation amber.* via alias.
- **Decisão**: Aliasado a foundation.color.neutral.900.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)

### `semantic.feedback.warning.content-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.amber.700`
- **Sentido**: Cor de feedback aviso (âmbar) em estado default.
- **Escopo**: color, fill
- **Contexto**: Use em alerts, badges, mensagens de validação, ícones de status. Pareado com Foundation amber.* via alias.
- **Decisão**: Aliasado a foundation.color.amber.700.
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)

### `semantic.ghost.background.active`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.black.10`
- **Sentido**: Fill de ação apenas texto (neutral) em estado active.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--ghost` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.overlay.black.10 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)

### `semantic.ghost.background.hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.black.5`
- **Sentido**: Fill de ação apenas texto (neutral) em estado hover.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--ghost` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.overlay.black.5 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)

### `semantic.ghost.content-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.900`
- **Sentido**: Cor de texto/ícone de ação apenas texto (neutral) em estado default.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--ghost` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.900 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)

### `semantic.ghost.content-disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.400`
- **Sentido**: Cor de texto/ícone de ação apenas texto (neutral) em estado disabled.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--ghost` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.400 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.link.content-active`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.brand.800`
- **Sentido**: Cor de texto/ícone de link inline (branded text) em estado active.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--link` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.brand.800 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/link.css` (1×)

### `semantic.link.content-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.brand.700`
- **Sentido**: Cor de texto/ícone de link inline (branded text) em estado default.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--link` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.brand.700 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/link.css` (1×)

### `semantic.link.content-disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.400`
- **Sentido**: Cor de texto/ícone de link inline (branded text) em estado disabled.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--link` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.400 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.link.content-hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.brand.800`
- **Sentido**: Cor de texto/ícone de link inline (branded text) em estado hover.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--link` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.brand.800 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/link.css` (1×)

### `semantic.motion.duration.fast`

- **Camada**: semantic
- **Tipo**: `duration`
- **Alias**: → `foundation.duration.fast`
- **Sentido**: Semantic wrapper pra motion.
- **Escopo**: transition, animation
- **Contexto**: Use em `transition`/`animation` (motion) ou `opacity` (states disabled).
- **Decisão**: Aliasado a Foundation foundation.duration.fast.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/button.css` (4×)
    - `css/components/checkbox.css` (4×)
    - `css/components/input.css` (2×)
    - `css/components/link.css` (1×)
    - `css/components/modal.css` (2×)
    - `css/components/radio.css` (4×)
    - `css/components/select.css` (2×)
    - `css/components/tabs.css` (2×)
    - `css/components/textarea.css` (2×)
    - `css/components/toggle.css` (5×)
    - `css/components/tooltip.css` (1×)

### `semantic.motion.duration.normal`

- **Camada**: semantic
- **Tipo**: `duration`
- **Alias**: → `foundation.duration.normal`
- **Sentido**: Semantic wrapper pra motion.
- **Escopo**: transition, animation
- **Contexto**: Use em `transition`/`animation` (motion) ou `opacity` (states disabled).
- **Decisão**: Aliasado a Foundation foundation.duration.normal.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.motion.duration.slow`

- **Camada**: semantic
- **Tipo**: `duration`
- **Alias**: → `foundation.duration.slow`
- **Sentido**: Semantic wrapper pra motion.
- **Escopo**: transition, animation
- **Contexto**: Use em `transition`/`animation` (motion) ou `opacity` (states disabled).
- **Decisão**: Aliasado a Foundation foundation.duration.slow.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.motion.ease.default`

- **Camada**: semantic
- **Tipo**: `cubicBezier`
- **Alias**: → `foundation.ease.default`
- **Sentido**: Semantic wrapper pra motion.
- **Escopo**: transition, animation
- **Contexto**: Use em `transition`/`animation` (motion) ou `opacity` (states disabled).
- **Decisão**: Aliasado a Foundation foundation.ease.default.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/button.css` (4×)
    - `css/components/checkbox.css` (4×)
    - `css/components/input.css` (2×)
    - `css/components/link.css` (1×)
    - `css/components/modal.css` (2×)
    - `css/components/radio.css` (4×)
    - `css/components/select.css` (2×)
    - `css/components/tabs.css` (2×)
    - `css/components/textarea.css` (2×)
    - `css/components/toggle.css` (5×)
    - `css/components/tooltip.css` (1×)

### `semantic.opacity.disabled`

- **Camada**: semantic
- **Tipo**: `number`
- **Alias**: → `foundation.opacity.50`
- **Sentido**: Semantic wrapper pra opacity.
- **Escopo**: opacity
- **Contexto**: Use em `transition`/`animation` (motion) ou `opacity` (states disabled).
- **Decisão**: Aliasado a Foundation foundation.opacity.50.
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)
    - `css/components/checkbox.css` (1×)
    - `css/components/radio.css` (2×)
    - `css/components/toggle.css` (1×)

### `semantic.outline.background.active`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.black.10`
- **Sentido**: Fill de ação com borda neutra em estado active.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--outline` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.overlay.black.10 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)

### `semantic.outline.background.hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.black.5`
- **Sentido**: Fill de ação com borda neutra em estado hover.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--outline` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.overlay.black.5 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (1×)

### `semantic.outline.border-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.500`
- **Sentido**: Borda de ação com borda neutra em estado default.
- **Escopo**: border-color
- **Contexto**: Aplicado em `.ds-btn--outline` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.500 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (1×)

### `semantic.outline.border-disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.200`
- **Sentido**: Borda de ação com borda neutra em estado disabled.
- **Escopo**: border-color
- **Contexto**: Aplicado em `.ds-btn--outline` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.200 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.outline.border-hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.700`
- **Sentido**: Borda de ação com borda neutra em estado hover.
- **Escopo**: border-color
- **Contexto**: Aplicado em `.ds-btn--outline` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.700 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)

### `semantic.outline.content-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.700`
- **Sentido**: Cor de texto/ícone de ação com borda neutra em estado default.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--outline` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.700 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/badge.css` (2×)
    - `css/components/button.css` (1×)

### `semantic.outline.content-disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.400`
- **Sentido**: Cor de texto/ícone de ação com borda neutra em estado disabled.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--outline` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.400 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.overlay.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.black.10`
- **Sentido**: Overlay default — translúcido sobre conteúdo.
- **Escopo**: background-color
- **Contexto**: Use em scrims de modal, dropdowns, drawers.
- **Decisão**: Aliasado a Foundation foundation.color.overlay.black.10.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.overlay.medium`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.black.20`
- **Sentido**: Overlay medium — translúcido sobre conteúdo.
- **Escopo**: background-color
- **Contexto**: Use em scrims de modal, dropdowns, drawers.
- **Decisão**: Aliasado a Foundation foundation.color.overlay.black.20.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.overlay.strong`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.black.40`
- **Sentido**: Overlay strong — translúcido sobre conteúdo.
- **Escopo**: background-color
- **Contexto**: Use em scrims de modal, dropdowns, drawers.
- **Decisão**: Aliasado a Foundation foundation.color.overlay.black.40.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.overlay.subtle`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.black.5`
- **Sentido**: Overlay subtle — translúcido sobre conteúdo.
- **Escopo**: background-color
- **Contexto**: Use em scrims de modal, dropdowns, drawers.
- **Decisão**: Aliasado a Foundation foundation.color.overlay.black.5.
- **Usos**:
  - CSS:
    - `css/components/checkbox.css` (1×)
    - `css/components/modal.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/toggle.css` (1×)

### `semantic.primary.background.active`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.brand.800`
- **Sentido**: Fill de ação primária (brand solid) em estado active.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--primary` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.brand.800 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/button.css` (2×)

### `semantic.primary.background.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.brand.600`
- **Sentido**: Fill de ação primária (brand solid) em estado default.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--primary` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.brand.600 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/avatar.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/breadcrumb.css` (1×)
    - `css/components/button.css` (2×)
    - `css/components/checkbox.css` (5×)
    - `css/components/radio.css` (3×)
    - `css/components/spinner.css` (1×)
    - `css/components/tabs.css` (2×)
    - `css/components/toggle.css` (3×)

### `semantic.primary.background.disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.disabled.brand-light`
- **Sentido**: Fill de ação primária (brand solid) em estado disabled.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--primary` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.disabled.brand-light — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.primary.background.hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.brand.700`
- **Sentido**: Fill de ação primária (brand solid) em estado hover.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--primary` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.brand.700 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/button.css` (2×)

### `semantic.primary.content-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Cor de texto/ícone de ação primária (brand solid) em estado default.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--primary` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.50 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/avatar.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (1×)
    - `css/components/checkbox.css` (2×)
    - `css/components/radio.css` (1×)
    - `css/components/toggle.css` (1×)

### `semantic.primary.content-disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.white.80`
- **Sentido**: Cor de texto/ícone de ação primária (brand solid) em estado disabled.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--primary` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.overlay.white.80 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.radius.full`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.radius.999`
- **Sentido**: Radius semantic full.
- **Escopo**: border-radius
- **Contexto**: Use em `border-radius` em componentes.
- **Decisão**: Aliasado a Foundation foundation.radius.999.
- **Usos**:
  - CSS:
    - `css/components/avatar.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/radio.css` (2×)
    - `css/components/skeleton.css` (1×)
    - `css/components/spinner.css` (1×)
    - `css/components/toggle.css` (2×)

### `semantic.radius.lg`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.radius.12`
- **Sentido**: Radius semantic lg.
- **Escopo**: border-radius
- **Contexto**: Use em `border-radius` em componentes.
- **Decisão**: Aliasado a Foundation foundation.radius.12.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/alert.css` (1×)
    - `css/components/card.css` (1×)
    - `css/components/modal.css` (1×)

### `semantic.radius.md`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.radius.8`
- **Sentido**: Radius semantic md.
- **Escopo**: border-radius
- **Contexto**: Use em `border-radius` em componentes.
- **Decisão**: Aliasado a Foundation foundation.radius.8.
- **Usos**:
  - CSS:
    - `css/components/breadcrumb.css` (1×)
    - `css/components/button.css` (3×)
    - `css/components/divider.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/skeleton.css` (2×)
    - `css/components/textarea.css` (1×)

### `semantic.radius.sm`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.radius.4`
- **Sentido**: Radius semantic sm.
- **Escopo**: border-radius
- **Contexto**: Use em `border-radius` em componentes.
- **Decisão**: Aliasado a Foundation foundation.radius.4.
- **Usos**:
  - CSS:
    - `css/base/reset.css` (1×)
    - `css/components/alert.css` (1×)
    - `css/components/checkbox.css` (2×)
    - `css/components/link.css` (1×)
    - `css/components/modal.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/tabs.css` (2×)
    - `css/components/toggle.css` (1×)
    - `css/components/tooltip.css` (1×)

### `semantic.radius.xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.radius.16`
- **Sentido**: Radius semantic xl.
- **Escopo**: border-radius
- **Contexto**: Use em `border-radius` em componentes.
- **Decisão**: Aliasado a Foundation foundation.radius.16.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.shadow.card`

- **Camada**: semantic
- **Tipo**: `shadow`
- **Alias**: → `foundation.shadow.sm`
- **Sentido**: Sombra semantic card.
- **Escopo**: box-shadow
- **Contexto**: Use em componentes card-like (cards, popovers).
- **Decisão**: Aliasado a Foundation foundation.shadow.sm.
- **Usos**:
  - CSS:
    - `css/components/card.css` (1×)

### `semantic.shadow.modal`

- **Camada**: semantic
- **Tipo**: `shadow`
- **Alias**: → `foundation.shadow.xl`
- **Sentido**: Sombra semantic modal.
- **Escopo**: box-shadow
- **Contexto**: Use em componentes sobre overlays (modais, drawers).
- **Decisão**: Aliasado a Foundation foundation.shadow.xl.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.size.2xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.48`
- **Sentido**: Size token 2xl.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.48.
- **Usos**:
  - CSS:
    - `css/components/button.css` (3×)
    - `css/components/checkbox.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/toggle.css` (2×)

### `semantic.size.3xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.64`
- **Sentido**: Size token 3xl.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.64.
- **Usos**:
  - CSS:
    - `css/components/avatar.css` (2×)
    - `css/components/textarea.css` (1×)

### `semantic.size.4xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.96`
- **Sentido**: Size token 4xl.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.96.
- **Usos**:
  - CSS:
    - `css/components/textarea.css` (1×)

### `semantic.size.5xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.128`
- **Sentido**: Size token 5xl.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.128.
- **Usos**:
  - CSS:
    - `css/components/skeleton.css` (1×)
    - `css/components/textarea.css` (1×)

### `semantic.size.layout.2xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.1280`
- **Sentido**: Size token layout.2xl.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.1280.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.size.layout.lg`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.800`
- **Sentido**: Size token layout.lg.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.800.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.size.layout.md`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.640`
- **Sentido**: Size token layout.md.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.640.
- **Usos**:
  - CSS:
    - `css/components/modal.css` (2×)

### `semantic.size.layout.sm`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.480`
- **Sentido**: Size token layout.sm.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.480.
- **Usos**:
  - CSS:
    - `css/components/modal.css` (1×)

### `semantic.size.layout.xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.1024`
- **Sentido**: Size token layout.xl.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.1024.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.size.layout.xs`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.320`
- **Sentido**: Size token layout.xs.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.320.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.size.lg`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.32`
- **Sentido**: Size token lg.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.32.
- **Usos**:
  - CSS:
    - `css/components/avatar.css` (2×)
    - `css/components/button.css` (2×)
    - `css/components/input.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/spinner.css` (2×)
    - `css/components/toggle.css` (1×)

### `semantic.size.md`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.24`
- **Sentido**: Size token md.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.24.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (2×)
    - `css/components/avatar.css` (1×)
    - `css/components/button.css` (3×)
    - `css/components/checkbox.css` (2×)
    - `css/components/input.css` (3×)
    - `css/components/radio.css` (2×)
    - `css/components/select.css` (3×)
    - `css/components/spinner.css` (2×)

### `semantic.size.sm`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.20`
- **Sentido**: Size token sm.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.20.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/avatar.css` (1×)
    - `css/components/button.css` (3×)
    - `css/components/checkbox.css` (2×)
    - `css/components/input.css` (1×)
    - `css/components/radio.css` (2×)
    - `css/components/select.css` (3×)
    - `css/components/toggle.css` (2×)

### `semantic.size.xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.40`
- **Sentido**: Size token xl.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.40.
- **Usos**:
  - CSS:
    - `css/components/avatar.css` (2×)
    - `css/components/button.css` (2×)
    - `css/components/input.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/skeleton.css` (2×)
    - `css/components/toggle.css` (1×)

### `semantic.size.xs`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.16`
- **Sentido**: Size token xs.
- **Escopo**: width, height
- **Contexto**: Use em `width`, `height` ou pra ícones, controles, layouts.
- **Decisão**: Aliasado a Foundation foundation.dimension.16.
- **Usos**:
  - CSS:
    - `css/components/avatar.css` (1×)
    - `css/components/button.css` (3×)
    - `css/components/checkbox.css` (2×)
    - `css/components/input.css` (1×)
    - `css/components/radio.css` (2×)
    - `css/components/select.css` (6×)
    - `css/components/spinner.css` (2×)
    - `css/components/toggle.css` (2×)

### `semantic.space.2xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.24`
- **Sentido**: Spacing token 2xl.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.24.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.space.2xs`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.2`
- **Sentido**: Spacing token 2xs.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.2.
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)
    - `css/components/input.css` (1×)

### `semantic.space.control.padding.10`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.10`
- **Sentido**: Spacing token control.padding.10.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.10.
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)
    - `css/components/textarea.css` (1×)

### `semantic.space.lg`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.16`
- **Sentido**: Spacing token lg.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.16.
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)
    - `css/components/card.css` (4×)
    - `css/components/input.css` (1×)
    - `css/components/modal.css` (7×)
    - `css/components/select.css` (3×)
    - `css/components/tabs.css` (2×)
    - `css/components/textarea.css` (1×)
    - `css/utilities/layout.css` (1×)

### `semantic.space.md`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.12`
- **Sentido**: Spacing token md.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.12.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/button.css` (2×)
    - `css/components/divider.css` (2×)
    - `css/components/input.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/select.css` (3×)
    - `css/components/tabs.css` (1×)
    - `css/components/textarea.css` (2×)
    - `css/utilities/layout.css` (1×)

### `semantic.space.section.lg`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.64`
- **Sentido**: Spacing token section.lg.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.64.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.space.section.md`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.48`
- **Sentido**: Spacing token section.md.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.48.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.space.section.sm`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.32`
- **Sentido**: Spacing token section.sm.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.32.
- **Usos**:
  - CSS:
    - `css/components/modal.css` (1×)

### `semantic.space.section.xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.80`
- **Sentido**: Spacing token section.xl.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.80.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.space.sm`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.8`
- **Sentido**: Spacing token sm.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.8.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (2×)
    - `css/components/card.css` (2×)
    - `css/components/checkbox.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/modal.css` (4×)
    - `css/components/radio.css` (2×)
    - `css/components/select.css` (2×)
    - `css/components/textarea.css` (1×)
    - `css/components/toggle.css` (1×)
    - `css/components/tooltip.css` (1×)
    - `css/utilities/layout.css` (1×)

### `semantic.space.xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.20`
- **Sentido**: Spacing token xl.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.20.
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/textarea.css` (1×)
    - `css/utilities/layout.css` (1×)

### `semantic.space.xs`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.dimension.4`
- **Sentido**: Spacing token xs.
- **Escopo**: gap, padding, margin
- **Contexto**: Use em `gap`, `padding`, `margin` em componentes.
- **Decisão**: Aliasado a Foundation foundation.dimension.4.
- **Usos**:
  - CSS:
    - `css/components/alert.css` (1×)
    - `css/components/badge.css` (1×)
    - `css/components/breadcrumb.css` (1×)
    - `css/components/button.css` (1×)
    - `css/components/checkbox.css` (4×)
    - `css/components/input.css` (3×)
    - `css/components/modal.css` (1×)
    - `css/components/radio.css` (5×)
    - `css/components/select.css` (1×)
    - `css/components/toggle.css` (3×)
    - `css/components/tooltip.css` (1×)
    - `css/utilities/layout.css` (1×)

### `semantic.surface.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Surface default — superfície base.
- **Escopo**: background-color
- **Contexto**: Use em painéis, cards, modais. Pareado com shadow.
- **Decisão**: Alias resolvido em foundation.color.neutral.50.
- **Usos**:
  - CSS:
    - `css/components/card.css` (1×)
    - `css/components/checkbox.css` (1×)
    - `css/components/input.css` (1×)
    - `css/components/radio.css` (1×)
    - `css/components/select.css` (1×)
    - `css/components/textarea.css` (1×)
    - `css/components/toggle.css` (1×)

### `semantic.surface.elevated`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Surface elevated — superfície altamente elevada (modal).
- **Escopo**: background-color
- **Contexto**: Use em painéis, cards, modais. Pareado com shadow.
- **Decisão**: Alias resolvido em foundation.color.neutral.50.
- **Usos**:
  - CSS:
    - `css/components/modal.css` (1×)

### `semantic.surface.overlay`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Surface overlay — superfície sobre overlay (popover).
- **Escopo**: background-color
- **Contexto**: Use em painéis, cards, modais. Pareado com shadow.
- **Decisão**: Alias resolvido em foundation.color.neutral.50.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.surface.raised`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.50`
- **Sentido**: Surface raised — superfície elevada (cards).
- **Escopo**: background-color
- **Contexto**: Use em painéis, cards, modais. Pareado com shadow.
- **Decisão**: Alias resolvido em foundation.color.neutral.50.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.toned.background.active`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.blue-600.28`
- **Sentido**: Fill de ação brand translúcida em estado active.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--toned` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.overlay.blue-600.28 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)

### `semantic.toned.background.default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.blue-600.12`
- **Sentido**: Fill de ação brand translúcida em estado default.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--toned` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.overlay.blue-600.12 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (1×)

### `semantic.toned.background.hover`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.overlay.blue-600.20`
- **Sentido**: Fill de ação brand translúcida em estado hover.
- **Escopo**: background-color
- **Contexto**: Aplicado em `.ds-btn--toned` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.overlay.blue-600.20 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/button.css` (1×)

### `semantic.toned.content-default`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.brand.700`
- **Sentido**: Cor de texto/ícone de ação brand translúcida em estado default.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--toned` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.brand.700 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - CSS:
    - `css/components/badge.css` (1×)
    - `css/components/button.css` (1×)

### `semantic.toned.content-disabled`

- **Camada**: semantic
- **Tipo**: `color`
- **Alias**: → `foundation.color.neutral.400`
- **Sentido**: Cor de texto/ícone de ação brand translúcida em estado disabled.
- **Escopo**: color, fill
- **Contexto**: Aplicado em `.ds-btn--toned` ou em consumidores Figma equivalentes.
- **Decisão**: Aliasado a foundation.color.neutral.400 — escolha de tom feita no Figma (ADR-014: action × style × prop × state).
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-family.mono`

- **Camada**: semantic
- **Tipo**: `fontFamily`
- **Alias**: → `foundation.typography.font.family.mono`
- **Sentido**: font-family mono pra texto UI geral.
- **Escopo**: font-family
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-mono`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.family.mono.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-family.sans`

- **Camada**: semantic
- **Tipo**: `fontFamily`
- **Alias**: → `foundation.typography.font.family.sans`
- **Sentido**: font-family sans pra texto UI geral.
- **Escopo**: font-family
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-sans`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.family.sans.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.2xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.24`
- **Sentido**: font-size 2xl pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-2xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.24.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.2xs`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.11`
- **Sentido**: font-size 2xs pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-2xs`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.11.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.3xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.28`
- **Sentido**: font-size 3xl pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-3xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.28.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.4xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.32`
- **Sentido**: font-size 4xl pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-4xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.32.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.5xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.40`
- **Sentido**: font-size 5xl pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-5xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.40.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.6xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.48`
- **Sentido**: font-size 6xl pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-6xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.48.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.7xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.56`
- **Sentido**: font-size 7xl pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-7xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.56.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.8xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.64`
- **Sentido**: font-size 8xl pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-8xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.64.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.9xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.72`
- **Sentido**: font-size 9xl pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-9xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.72.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.lg`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.18`
- **Sentido**: font-size lg pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-lg`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.18.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.md`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.16`
- **Sentido**: font-size md pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-md`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.16.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.sm`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.14`
- **Sentido**: font-size sm pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-sm`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.14.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.20`
- **Sentido**: font-size xl pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.20.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-size.xs`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.font.size.12`
- **Sentido**: font-size xs pra texto UI geral.
- **Escopo**: font-size
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-xs`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.size.12.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-weight.bold`

- **Camada**: semantic
- **Tipo**: `number`
- **Alias**: → `foundation.typography.font.weight.bold`
- **Sentido**: font-weight bold pra texto UI geral.
- **Escopo**: font-weight
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-bold`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.weight.bold.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-weight.medium`

- **Camada**: semantic
- **Tipo**: `number`
- **Alias**: → `foundation.typography.font.weight.medium`
- **Sentido**: font-weight medium pra texto UI geral.
- **Escopo**: font-weight
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-medium`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.weight.medium.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-weight.regular`

- **Camada**: semantic
- **Tipo**: `number`
- **Alias**: → `foundation.typography.font.weight.regular`
- **Sentido**: font-weight regular pra texto UI geral.
- **Escopo**: font-weight
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-regular`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.weight.regular.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.font-weight.semibold`

- **Camada**: semantic
- **Tipo**: `number`
- **Alias**: → `foundation.typography.font.weight.semibold`
- **Sentido**: font-weight semibold pra texto UI geral.
- **Escopo**: font-weight
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-semibold`.
- **Decisão**: Aliasado a Foundation foundation.typography.font.weight.semibold.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.letter-spacing.normal`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.letter.spacing.normal`
- **Sentido**: letter-spacing normal pra texto UI geral.
- **Escopo**: letter-spacing
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-normal`.
- **Decisão**: Aliasado a Foundation foundation.typography.letter.spacing.normal.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.letter-spacing.tight`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.letter.spacing.tight`
- **Sentido**: letter-spacing tight pra texto UI geral.
- **Escopo**: letter-spacing
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-tight`.
- **Decisão**: Aliasado a Foundation foundation.typography.letter.spacing.tight.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.letter-spacing.wider`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.letter.spacing.wider`
- **Sentido**: letter-spacing wider pra texto UI geral.
- **Escopo**: letter-spacing
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-wider`.
- **Decisão**: Aliasado a Foundation foundation.typography.letter.spacing.wider.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.2xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.34`
- **Sentido**: line-height 2xl pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-2xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.34.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.2xs`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.16`
- **Sentido**: line-height 2xs pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-2xs`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.16.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.3xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.40`
- **Sentido**: line-height 3xl pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-3xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.40.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.4xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.44`
- **Sentido**: line-height 4xl pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-4xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.44.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.5xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.48`
- **Sentido**: line-height 5xl pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-5xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.48.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.6xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.64`
- **Sentido**: line-height 6xl pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-6xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.64.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.7xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.72`
- **Sentido**: line-height 7xl pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-7xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.72.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.8xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.80`
- **Sentido**: line-height 8xl pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-8xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.80.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.9xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.90`
- **Sentido**: line-height 9xl pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-9xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.90.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.lg`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.28`
- **Sentido**: line-height lg pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-lg`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.28.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.md`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.24`
- **Sentido**: line-height md pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-md`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.24.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.sm`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.20`
- **Sentido**: line-height sm pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-sm`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.20.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.xl`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.32`
- **Sentido**: line-height xl pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-xl`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.32.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

### `semantic.typography.body.line-height.xs`

- **Camada**: semantic
- **Tipo**: `dimension`
- **Alias**: → `foundation.typography.line.height.18`
- **Sentido**: line-height xs pra texto UI geral.
- **Escopo**: line-height
- **Contexto**: Aplicado via Text Style ou utility class `.ds-text-body-xs`.
- **Decisão**: Aliasado a Foundation foundation.typography.line.height.18.
- **Usos**:
  - _(nenhum uso detectado — token órfão ou novo)_

