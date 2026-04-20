# Inventário de componentes — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs` em 2026-04-20. Não editar manualmente.
> Para regenerar: `npm run sync:docs`
> Versão atual: **0.5.1**

## Status geral

| Componente | CSS | Tokens JSON | Figma (visual) | Figma (binding) | Stories | Docs site |
|------------|-----|-------------|-----------------|-----------------|---------|----------|
| Button | 🟢 | 🟢 (25) | 🟢 | 🟢 | ⬜ | 🟢 |
| Input Text | 🟢 | 🟢 (15) | 🟢 | 🟢 | ⬜ | 🟢 |
| Textarea | 🟢 | 🟢 (14) | 🟢 | 🟢 | ⬜ | 🟢 |
| Select | 🟢 | 🟢 (16) | 🟢 | 🟢 | ⬜ | 🟢 |
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
| Foundation | 225 | 🟢 |
| Semantic (light) | 132 | 🟢 |
| Semantic (dark) | 132 | 🟢 |
| Component | 131 | 🟢 |

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
| ADR-003 | Figma como autoridade de design, Git como autoridade de tokens/código | Aceita |
| ADR-004 | WCAG 2.2 AA como padrão de acessibilidade | Aceita — Implementada em 0.5.0 |
| ADR-005 | Brand como camada foundation, estados explícitos no semantic, e limpeza tipográfica | Proposta |
| ADR-006 | Adopt semantic control tokens for shared dimensions and typography across interactive controls | Proposed |
| ADR-007 | Establish toned color system with colored overlays and semantic toned tokens | Proposed |
| ADR-008 | Recalibração das paletas foundation `green` e `amber` | Aceita — Implementada em 0.5.0 |
| ADR-009 | Separação de `border.default` (decorativa) e `border.control` (funcional) | Aceita — Implementada em 0.5.0 |
| ADR-010 | Remoção de `foundation.color.white` e `foundation.color.black` puros | Aceita — Implementada em 0.5.0 |
| ADR-011 | Reestruturação do naming de tokens semânticos de cor | Aceita — Implementada em 0.5.0 |

## Próximos milestones

1. **Storybook** — setup + stories para 18 componentes (vanilla JS)
2. **prefers-reduced-motion** — media query nos componentes com transitions (ADR-004 pendente)
3. **CSS legado** — verificar/remover `css/tokens/theme-light.css` (ADR-010 pendente)
4. **Novos componentes** — Dropdown, Combobox, Pagination, Table
