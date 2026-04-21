# Inventário de componentes — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs` em 2026-04-21. Não editar manualmente.
> Para regenerar: `npm run sync:docs`
> Versão atual: **0.5.15**

## Status geral

| Componente | CSS | Tokens JSON | Figma (visual) | Figma (binding) | Stories | Docs site |
|------------|-----|-------------|-----------------|-----------------|---------|----------|
| Button | 🟢 | 🟢 (25) | 🟢 | 🟢 | ⬜ | 🟢 |
| Input Text | 🟢 | 🟢 (18) | 🟢 | 🟢 | ⬜ | 🟢 |
| Textarea | 🟢 | 🟢 (14) | 🟢 | 🟢 | ⬜ | 🟢 |
| Select | 🟢 | 🟢 (19) | 🟢 | 🟢 | ⬜ | 🟢 |
| Checkbox | 🟢 | 🟢 (14) | 🟢 | 🟢 | ⬜ | 🟢 |
| Radio | 🟢 | 🟢 (10) | 🟢 | 🟢 | ⬜ | 🟢 |
| Toggle | 🟢 | 🟢 (12) | 🟢 | 🟢 | ⬜ | 🟢 |
| Badge | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Alert | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Card | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Modal | 🟢 | 🟢 (6) | 🟢 | 🟢 | ⬜ | 🟢 |
| Tooltip | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Tabs | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Breadcrumb | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Avatar | 🟢 | 🟢 (9) | 🟢 | 🟢 | ⬜ | 🟢 |
| Divider | 🟢 | — | 🟢 | 🟢 | ⬜ | 🟢 |
| Spinner | 🟢 | 🟢 (6) | 🟢 | 🟢 | ⬜ | 🟢 |
| Skeleton | 🟢 | 🟢 (4) | 🟢 | 🟢 | ⬜ | 🟢 |

**Legenda:** ⬜ Não iniciado | 🟡 Em progresso | 🟢 Completo | ⚠️ Verificar | 🔴 Precisa revisão

**Nota sobre binding:**
- Button: fills (brand + toned), padding-x/y, height, radius, gap, border-width, focus ring via vars Component/Semantic
- Input Text / Select / Textarea: label usa `content/default`, label row com asterisco Required, control tokens
- Checkbox / Radio / Toggle: Content frame vertical (Label + Description + Helper Text), booleans show/hide
- Demais: fills, strokes, radius, spacing via tokens semânticos

## Resumo de tokens

| Coleção | Tokens | Status |
|---------|--------|--------|
| Foundation | 231 | 🟢 |
| Semantic (light) | 132 | 🟢 |
| Semantic (dark) | 132 | 🟢 |
| Component | 137 | 🟢 |

## Pipeline

| Etapa | Status |
|-------|--------|
| JSON (DTCG) canônico | 🟢 `tokens/` |
| Style Dictionary | 🟢 `build-tokens.mjs` |
| CSS gerado | 🟢 5 arquivos em `css/tokens/generated/` |
| Import pipeline | 🟢 index.css importa apenas generated/ |
| Figma binding | 🟢 18 componentes vinculados |

## ADRs

| ADR | Título | Status |
|-----|--------|--------|
| ADR-001 | Migração da arquitetura de tokens para Foundation→Semantic→Component com DTCG + Style Dictionary | Aceita |
| ADR-002 | Stack agnóstica — HTML + CSS + vanilla JS como base | Aceita |
| ADR-003 | Figma como origem canônica de tokens, Git como consolidação | Aceita — Revisada em 0.5.8 |
| ADR-004 | WCAG 2.2 AA como padrão de acessibilidade | Aceita — Implementada em 0.5.0 |
| ADR-005 | Brand como camada foundation, estados explícitos no semantic, e limpeza tipográfica | Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.2) |
| ADR-006 | Tokens semânticos de controle para dimensões e tipografia compartilhadas entre controles interativos | Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.3) |
| ADR-007 | Estabelecer sistema de cores toned com overlays coloridos e tokens semânticos toned | Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.4, sincronização Figma completa em 0.5.6) |
| ADR-008 | Recalibração das paletas foundation `green` e `amber` | Aceita — Implementada em 0.5.0 |
| ADR-009 | Separação de `border.default` (decorativa) e `border.control` (funcional) | Aceita — Implementada em 0.5.0 |
| ADR-010 | Remoção de `foundation.color.white` e `foundation.color.black` puros | Aceita — Implementada em 0.5.0 |
| ADR-011 | Reestruturação do naming de tokens semânticos de cor | Aceita — Implementada em 0.5.0 |

## Próximos milestones

1. **Storybook** — setup + stories para 18 componentes (vanilla JS)
2. **prefers-reduced-motion** — media query nos componentes com transitions (ADR-004 pendente)
3. **CSS legado** — verificar/remover `css/tokens/theme-light.css` (ADR-010 pendente)
4. **Novos componentes** — Dropdown, Combobox, Pagination, Table
