# ADR-009: Separação de `border.default` (decorativa) e `border.control` (funcional)

**Data:** 2026-04-16
**Status:** Aceita

## Contexto

A auditoria identificou que `semantic.border.default` (atualmente `foundation.color.neutral.200` em light mode, `neutral.700` em dark) falha WCAG 2.2 SC 1.4.11 (Non-text Contrast) em ambos os modos:

- Light: neutral.200 (#E2E8F0) vs branco = **1.23:1** (precisa ≥3:1)
- Dark: neutral.700 (#334155) vs neutral.950 = **1.95:1** (precisa ≥3:1)

A SC 1.4.11 exige 3:1 para "limites visuais necessários para identificar componentes de UI". Se a borda de um Input é o único delimitador visual do controle, ela é informacional e precisa cumprir o critério. Já bordas puramente decorativas (ex: linha sutil entre seções de uma Card) estão isentas.

A análise da física da luminância mostra que é impossível ter uma cor cinza clara (perceptível como "borda sutil") que passe 3:1 contra branco: o threshold exige L OKLCH ≤ 0.67, o que visualmente já é um cinza médio. Não existe redesign de paleta neutra que resolva isso mantendo "borda quase branca".

A resposta arquitetural correta, alinhada com Polaris, Carbon e Primer, é separar duas intenções que hoje estão colapsadas no mesmo token:

1. **Borda decorativa** — usada em Card, Divider, Modal frame, separadores de seção. Isenta de 1.4.11 (decorativo). Precisa apenas ser perceptível (faixa de mercado: 1.5–2:1).
2. **Borda funcional de controle** — usada em Input, Select, Textarea, Checkbox, Radio, Toggle (quando a borda delimita a área interativa). Submetida a 1.4.11. Precisa ≥3:1.

## Decisão

Manter `semantic.border.default` como token decorativo, ajustando seu binding para um valor perceptível. Introduzir um novo token semântico `semantic.border.control` para bordas funcionais de controles interativos, e migrar os componentes correspondentes.

### Novo binding de `border.default` (decorativo)

| modo | atual | proposto | cr | uso |
|---|---|---|---|---|
| light | neutral.200 (#E2E8F0, 1.23:1) | **neutral.300** (#CBD5E1) | **1.48:1** | Card, Divider, Modal frame |
| dark | neutral.700 (#334155, 1.95:1) | mantém neutral.700 | 1.95:1 | mesmo |

Justificativa: 1.48:1 está no range usado por Primer (border-muted) e Material 3 (outline-variant). Perceptível como "borda sutil", não compete com conteúdo. No dark mode, neutral.700 vs neutral.950 já está nessa faixa (1.95:1) e não precisa mudar.

### Novo token `semantic.border.control`

```json
{
  "semantic": {
    "border": {
      "control": {
        "default":  { "$type": "color", "$value": "{foundation.color.neutral.500}", "$description": "Border color for interactive controls (Input, Select, Textarea, Checkbox, Radio). Meets WCAG 1.4.11 (≥3:1 against control background)." },
        "hover":    { "$type": "color", "$value": "{foundation.color.neutral.600}", "$description": "Border on hover for interactive controls." },
        "disabled": { "$type": "color", "$value": "{foundation.color.neutral.300}", "$description": "Border for disabled controls. Exempt from contrast requirements per WCAG 1.4.3." }
      }
    }
  }
}
```

**Light mode:**

| token | valor | cr vs branco |
|---|---|---|
| `border.control.default` | neutral.500 (#64748B) | 4.76:1 ✅ |
| `border.control.hover` | neutral.600 (#475569) | 7.58:1 ✅ |
| `border.control.disabled` | neutral.300 (#CBD5E1) | 1.48:1 (isento) |

**Dark mode (mesma estrutura, valores invertidos):**

| token | valor | cr vs neutral.950 |
|---|---|---|
| `border.control.default` | neutral.500 (#64748B) | 4.24:1 ✅ |
| `border.control.hover` | neutral.400 (#94A3B8) | 7.87:1 ✅ |
| `border.control.disabled` | neutral.700 (#334155) | 1.95:1 (isento) |

### Componentes que migram para `border.control`

| componente | binding atual | binding novo |
|---|---|---|
| Input Text | `border.default` | `border.control.default` |
| Textarea | `border.default` | `border.control.default` |
| Select | `border.default` | `border.control.default` |
| Checkbox (border do quadrado unchecked) | `border.default` | `border.control.default` |
| Radio (border do círculo unchecked) | `border.default` | `border.control.default` |
| Toggle (track border, se houver) | `border.default` | `border.control.default` |
| Button variant `outline` (border) | depende do tom | mantém `border.default` ou move pra `border.control.default` conforme estudo visual |

### Componentes que mantêm `border.default`

| componente | uso da borda |
|---|---|
| Card | frame decorativo |
| Divider | separador visual |
| Modal | frame externo |
| Tabs | borda inferior decorativa do contêiner |
| Alert | tem `feedback.*.border` próprio, não usa border.default |
| Badge | usa surface, não border |

### Componentes em estados de validação

Tokens existentes não mudam:

- `border.error` → `feedback.error.default` (red.600, 4.83:1 vs branco) ✅
- `border.focus` → `color.primary.default` (passa 1.4.11)
- `border.focus-error` → red.500 (3.76:1, passa)

## Consequências

### Pipeline

1. Adicionar `border.control` em `tokens/semantic/light.json` e `dark.json` (3 sub-tokens cada modo)
2. Regenerar CSS via Style Dictionary, gerando `--ds-border-control-default`, `--ds-border-control-hover`, `--ds-border-control-disabled`
3. Atualizar Figma Variables na coleção Semantic (categoria border)
4. Editar component tokens dos controles (`tokens/component/input.json`, `select.json`, `textarea.json`, `checkbox.json`, `radio.json`, `toggle.json`) para apontar para `border.control.*`
5. Atualizar CSS dos componentes (`.ds-input`, `.ds-select`, etc.) para consumir as novas custom properties
6. Atualizar Figma binding dos componentes correspondentes
7. Atualizar `border.default` em ambos os semantic files (light: neutral.200 → neutral.300)
8. Validar visualmente após pipeline CSS estar saudável

### Impacto visual

Inputs, Selects e Textareas vão ter borda visivelmente mais escura (de neutral.200 ~1.2:1 para neutral.500 ~4.76:1). Isso é a correção desejada. Cards e Dividers ficam ligeiramente mais perceptíveis (de 1.2:1 para 1.5:1), próximo do que outros DSs maduros usam.

### Documentação

- Atualizar `token-schema.md` adicionando `border.control.*` na enumeração de categorias semantic
- Atualizar `component-inventory.md` na seção de cada componente afetado
- Atualizar `system-principles.md` se a regra geral (semantic vs component) for formalizada em paralelo (ver nota relacionada)
- No site de docs, adicionar página explicando a distinção decorativa vs funcional

### Compatibilidade

Mudança breaking visualmente em todos os controles interativos. Não breaking estruturalmente (token novo, não renomeado). Bump minor version.

## Alternativas consideradas

**A. Mover `border.default` para neutral.500 e usar o mesmo token em todos os contextos.**

Resolve compliance mas força bordas grossas em todos os Cards e Dividers. Visualmente carregado, contraria a estética típica de Cards (que se diferenciam por elevation/shadow, não por borda forte). Descartada porque mistura duas intenções que deveriam ser separadas.

**B. Aceitar `border.default` em neutral.400 (2.56:1) como "perto o suficiente".**

Não passa 1.4.11 estritamente. Argumento de que inputs têm label + placeholder + altura é defensável mas frágil — depende do conteúdo e do contexto. Descartada por não ser compliance verificável.

**C. Adicionar uma camada de exceção do tipo "decorative" no token-schema.**

Marcar tokens como `"$decorative": true` no JSON e isentá-los das regras de contraste no validator. Adiciona complexidade ao schema sem ganho real — a separação `border.default` vs `border.control` já comunica a mesma coisa via naming, sem metadados adicionais. Descartada.

## Referências

- WCAG 2.2 SC 1.4.11 Non-text Contrast
- ADR-006 (semantic control tokens — precedente arquitetural)
- ADR-005 (focus ring outline approach — não afetado)
- token-schema.md — regra inviolável 1
- Polaris, Carbon, Primer — DSs que separam bordas decorativas de funcionais implicitamente
