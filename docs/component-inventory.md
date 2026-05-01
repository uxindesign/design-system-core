# Inventário de componentes — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs` em 2026-05-01. Não editar manualmente.
> Para regenerar: `npm run sync:docs`
> Versão atual: **1.0.0-beta.4**

## Status geral

| Componente | CSS | Figma (visual) | Figma (binding) | Stories | Docs site |
|------------|-----|-----------------|-----------------|---------|----------|
| Button | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Input Text | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Textarea | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Select | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Checkbox | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Radio | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Toggle | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Badge | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Alert | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Card | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Modal | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Tooltip | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Tabs | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Breadcrumb | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Avatar | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Divider | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Form Field | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Spinner | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Skeleton | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |

**Legenda:** ⬜ Não iniciado | 🟡 Em progresso | 🟢 Completo | ⚠️ Verificar | 🔴 Precisa revisão

**Nota sobre binding:**
- Button: fills (brand + toned), padding-x/y, height, radius, gap, border-width, focus ring via semantic vars
- Input Text / Select / Textarea: label usa `content/default`, label row com asterisco Required, control tokens
- Checkbox / Radio / Toggle: Content frame vertical (Label + Description + Helper Text), booleans show/hide
- Demais: fills, strokes, radius, spacing via tokens semânticos

## Resumo de tokens

| Coleção | Tokens | Status |
|---------|--------|--------|
| Foundation | 262 | 🟢 |
| Semantic (light) | 165 | 🟢 |
| Semantic (dark) | 165 | 🟢 |

## Pipeline

| Etapa | Status |
|-------|--------|
| JSON (DTCG) canônico | 🟢 `tokens/` |
| Style Dictionary | 🟢 `build-tokens.mjs` |
| CSS gerado | 🟢 4 arquivos em `css/tokens/generated/` |
| Import pipeline | 🟢 index.css importa apenas generated/ |
| Figma binding | 🟢 19 componentes vinculados |

## ADRs

| ADR | Título | Status |
|-----|--------|--------|
| ADR-001 | Migração da arquitetura de tokens para Foundation→Semantic→Component com DTCG + Style Dictionary | Aceita — superseded em parte por [ADR-014](ADR-014-action-tokens-role-style.md) (themes Default/Ocean/Forest removidos em 0.8.0; Brand virou paleta única customizável) |
| ADR-002 | Stack agnóstica — HTML + CSS + vanilla JS como base | Aceita |
| ADR-003 | Figma como origem canônica de tokens, Git como consolidação | Aceita — Revisada em 0.5.8 |
| ADR-004 | WCAG 2.2 AA como padrão de acessibilidade | Aceita — Implementada em 0.5.0 |
| ADR-005 | Brand como camada foundation, estados explícitos no semantic, e limpeza tipográfica | Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.2). Superseded por [ADR-014](ADR-014-action-tokens-role-style.md): collection Brand (modes Default/Ocean/Forest) deletada em 0.8.0, Brand virou paleta única customizável dentro da Foundation. |
| ADR-006 | Tokens semânticos de controle para dimensões e tipografia compartilhadas entre controles interativos | Parcialmente substituída — `size.control.*` e `space.control.padding-{x,y}.*` substituídos por escala `size.{xs..5xl}` + `space.{xs..2xl}` + `space.control.padding.10` em **ADR-015** (2026-04-26). `typography.control.*` permanece vigente. |
| ADR-007 | Estabelecer sistema de cores toned com overlays coloridos e tokens semânticos toned | Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.4, sincronização Figma completa em 0.5.6) |
| ADR-008 | Recalibração das paletas foundation `green` e `amber` | Aceita — Implementada em 0.5.0 |
| ADR-009 | Separação de `border.default` (decorativa) e `border.control` (funcional) | Aceita — Implementada em 0.5.0 |
| ADR-010 | Remoção de `foundation.color.white` e `foundation.color.black` puros | Aceita — Implementada em 0.5.0 |
| ADR-011 | Reestruturação do naming de tokens semânticos de cor | Aceita — Implementada em 0.5.0 |
| ADR-012 | Tokens de line-height e letter-spacing divergem por design entre Figma e JSON | Aceita |
| ADR-013 | Camadas de consumo de tokens — Foundation nunca direto em consumidor final | Aceita — implementada em 0.7.0 (Component layer eliminada) e fechada em 1.0.0-beta.1 (0 leaks Foundation em `css/components/*.css` e `css/base/*.css`) |
| ADR-014 | Reestruturação Semantic em `action` × `style` × `prop` × `state` — eliminação de brand/accent e themes | Aceita — implementada em 0.7.0 e estabilizada em 1.0.0-beta.1 |
| ADR-015 | — Unificação da escala size, eliminação de tokens component-specific e renomeação spacing→dimension | Aceito |
| ADR-016 | — Tokens sem equivalência no Figma (CSS-only) | Aceito |

## Próximos milestones

1. **Storybook** — setup + stories para 19 componentes (vanilla JS)
2. **prefers-reduced-motion** — media query nos componentes com transitions (ADR-004 pendente)
3. **CSS legado** — verificar/remover `css/tokens/theme-light.css` (ADR-010 pendente)
4. **Novos componentes** — Dropdown, Combobox, Pagination, Table
