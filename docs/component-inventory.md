# Inventário de componentes — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs` em 2026-06-15. Não editar manualmente.
> Para regenerar: `npm run sync:docs`
> Versão atual: **1.0.0-beta.5**

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
| Form Field | 🟢 | — (CSS-only, ADR-017) | — | ⬜ | 🟢 |
| Spinner | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |
| Skeleton | 🟢 | 🟢 | 🟢 | ⬜ | 🟢 |

**Legenda:** ⬜ Não iniciado | 🟡 Em progresso | 🟢 Completo | ⚠️ Verificar | 🔴 Precisa revisão | — Não aplicável

**Nota sobre binding:**
- Button: fills (brand + toned), padding-x/y, height, radius, gap, border-width, focus ring via semantic vars
- Input Text / Select / Textarea: label usa `content/default`, label row com asterisco Required, control tokens
- Checkbox / Radio / Toggle: Content frame vertical (Label + Description + Helper Text), booleans show/hide
- **Form Field**: CSS-only (ADR-017). Não tem (e não deve ter) equivalente Figma — componentes Figma de form (Input, Select, Textarea, Checkbox, Radio, Toggle) já carregam Label + Required + Helper inline em cada variant. Form Field só existe no CSS porque HTML não tem elemento "form control" composto.
- Demais: fills, strokes, radius, spacing via tokens semânticos

## Pipeline

| Etapa | Status |
|-------|--------|
| JSON (DTCG) canônico | 🟢 `tokens/` |
| Style Dictionary | 🟢 `build-tokens.mjs` |
| CSS gerado | 🟢 `css/tokens/generated/` |
| Import pipeline | 🟢 index.css importa apenas generated/ |
| Figma binding | 🟢 componentes vivos vinculados |

## ADRs

| ADR | Título | Status |
|-----|--------|--------|
| ADR-001 | Migração da arquitetura de tokens para Foundation→Semantic→Component com DTCG + Style Dictionary | Aceita — superseded em parte por [ADR-014](ADR-014-action-tokens-role-style.md) (themes Default/Ocean/Forest removidos em 0.8.0; Brand virou paleta única customizável) |
| ADR-002 | Stack agnóstica — HTML + CSS + vanilla JS como base | Aceita |
| ADR-003 | Figma como origem canônica de tokens, Git como consolidação | Aceita — Revisada em 0.5.8 |
| ADR-004 | WCAG 2.2 AA como padrão de acessibilidade | Aceita — Implementada em 0.5.0 |
| ADR-005 | Brand como camada foundation, estados explícitos no semantic, e limpeza tipográfica | Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.2). Superseded por [ADR-014](ADR-014-action-tokens-role-style.md): collection Brand (modes Default/Ocean/Forest) deletada em 0.8.0, Brand virou paleta única customizável dentro da Foundation. |
| ADR-006 | Tokens semânticos de controle para dimensões e tipografia compartilhadas entre controles interativos | Parcialmente substituída — `size.control.*` e `space.control.padding-{x,y}.*` substituídos por escala `size.{xs..5xl}` + `space.{xs..2xl}` + `space.control.padding.10` em **ADR-015** (2026-04-26). O contrato público de anatomia dos componentes foi movido para tokens Component em **ADR-019** (2026-05-10). `typography.control.*` permanece vigente. |
| ADR-007 | Estabelecer sistema de cores toned com overlays coloridos e tokens semânticos toned | Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.4, sincronização Figma completa em 0.5.6) |
| ADR-008 | Recalibração das paletas foundation `green` e `amber` | Aceita — Implementada em 0.5.0 |
| ADR-009 | Separação de `border.default` (decorativa) e `border.control` (funcional) | Aceita — Implementada em 0.5.0 |
| ADR-010 | Remoção de `foundation.color.white` e `foundation.color.black` puros | Aceita — Implementada em 0.5.0 |
| ADR-011 | Reestruturação do naming de tokens semânticos de cor | Aceita — Implementada em 0.5.0 |
| ADR-012 | Tokens de line-height e letter-spacing divergem por design entre Figma e JSON | Aceita |
| ADR-013 | Camadas de consumo de tokens — Foundation nunca direto em consumidor final | Aceita — implementada em 0.7.0 e parcialmente substituída por ADR-019 em 2026-05-11 |
| ADR-014 | Reestruturação Semantic em `action` × `style` × `prop` × `state` — eliminação de brand/accent e themes | Aceita — implementada em 0.7.0 e estabilizada em 1.0.0-beta.1 |
| ADR-015 | — Unificação da escala size, eliminação de tokens component-specific e renomeação spacing→dimension | Aceito |
| ADR-016 | — Tokens sem equivalência no Figma (CSS-only) | Aceito |
| ADR-017 | — Componentes CSS-only (sem equivalência no Figma) | Aceito |
| ADR-018 | — Renomear `content.{default,secondary,tertiary}` para `content.{strong,default,subtle}` | Aceito |
| ADR-019 | — Reintrodução de Component tokens como contrato anatômico | Aceita |

## Próximos milestones

1. **Auditoria contínua Figma ↔ repo** — manter snapshot, tokens, CSS e docs alinhados antes de cada release beta
2. **Documentação de ícones** — explicitar uso de Lucide, stroke, pesos e aplicação de tokens de cor/tamanho
3. **Componentes pendentes** — Dropdown, Combobox, Pagination, Table
4. **Storybook** — opcional, não bloqueante para o beta atual
