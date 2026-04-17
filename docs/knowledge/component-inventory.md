# Inventário de componentes — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs`.
> Não editar manualmente — as mudanças serão sobrescritas na próxima execução.
> Para regenerar: `npm run sync:docs`
> Versão atual: **1.5.1**

## Status geral

| Componente | CSS | Tokens JSON | Figma (visual) | Figma (binding) | Stories | Docs site |
|------------|-----|-------------|-----------------|-----------------|---------|----------|
| Button | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Input Text | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Textarea | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Select | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Checkbox | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Radio | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Toggle | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Badge | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Alert | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Card | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Modal | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Tooltip | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Tabs | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Breadcrumb | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Avatar | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Divider | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Spinner | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Skeleton | 🟢 | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |

**Legenda:** ⬜ Não iniciado | 🟡 Em progresso | 🟢 Completo | ⚠️ Verificar | 🔴 Precisa revisão

**Nota sobre binding:**
- Button: padding-x, padding-y, height, fills (brand + toned), radius, gap, border-width, focus ring
- Input Text / Select / Textarea: label usa `content/default`, label row com Required asterisk, control tokens
- Checkbox / Radio / Toggle: Content frame vertical (Label + Description + Helper Text), `content/default`
- Demais: fills, strokes, radius, spacing via tokens semânticos

## Resumo de tokens

| Coleção | Tokens | Status |
|---------|--------|--------|
| Foundation | ~212 | 🟢 JSON + Figma vars |
| Semantic (light) | ~116 | 🟢 JSON + Figma vars (pós ADR-011) |
| Semantic (dark) | ~116 | 🟢 Mesmas chaves, valores adaptados |
| Component | ~130 | 🟢 JSON + Figma vars (12 arquivos) |

## Pipeline

| Etapa | Status |
|-------|--------|
| JSON (DTCG) canônico | 🟢 `tokens/foundation/`, `tokens/semantic/`, `tokens/component/` |
| Style Dictionary | 🟢 `build-tokens.mjs` funcional |
| CSS gerado | 🟢 `css/tokens/generated/` |
| Import pipeline | 🟢 `css/tokens/index.css` importa apenas `generated/` |
| Figma vars alinhadas | 🟢 4 coleções (~466 variáveis) |
| Figma binding | 🟢 18 componentes vinculados |

## ADRs

| ADR | Título | Status |
|-----|--------|--------|
| ADR-001 | Migração para DTCG + Style Dictionary | ✅ Aceita |
| ADR-002 | Stack agnóstica (HTML + CSS + vanilla JS) | ⚠️ Storybook pendente |
| ADR-003 | Git = tokens/código, Figma = design visual | ✅ Aceita |
| ADR-004 | WCAG 2.2 AA como piso de acessibilidade | ⚠️ prefers-reduced-motion pendente |
| ADR-005 | Brand como foundation, sufixo -default explícito | ✅ Aceita |
| ADR-006 | Semantic control tokens | ✅ Aceita |
| ADR-007 | Toned color system | ✅ Aceita |
| ADR-008 | Recalibração paletas green/amber | ✅ Aceita |
| ADR-009 | border/default vs border/control | ✅ Aceita |
| ADR-010 | Abolir white/black puros | ⚠️ CSS legado pendente |
| ADR-011 | Renaming tokens semânticos de cor | ✅ Aceita |

## Próximos milestones

1. **Storybook setup + stories** — 18 componentes, vanilla JS
2. **prefers-reduced-motion** — media query em componentes com transitions (ADR-004)
3. **CSS legado** — verificar/remover `css/tokens/theme-light.css` (ADR-010)
4. **Novos componentes** — Dropdown, Combobox, Pagination, Table
