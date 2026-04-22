# Token schema — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs` em 2026-04-22. Não editar manualmente.
> Para regenerar: `npm run sync:docs`
> Versão atual: **0.5.17**

## Estado atual

| Aspecto | Valor |
|---------|-------|
| Versão | 0.5.17 |
| Formato canônico | JSON (DTCG) em `tokens/` |
| CSS gerado | Style Dictionary → `css/tokens/generated/` |
| Pipeline | ✅ index.css importa apenas generated/ |
| Paridade light/dark | ✅ 133 tokens em ambos os modos |

## Camadas

| Camada | Tokens | Arquivos |
|--------|--------|----------|
| Foundation | **231** | 10 |
| Semantic | **133 × 2 modos** | light.json + dark.json |
| Component | **137** | 11 |

## Foundation (231 tokens)

| Arquivo | Tokens |
|---------|--------|
| `brand.json` | 2 |
| `colors.json` | 134 |
| `motion.json` | 7 |
| `opacity.json` | 7 |
| `radius.json` | 8 |
| `shadows.json` | 7 |
| `spacing.json` | 21 |
| `stroke.json` | 4 |
| `typography.json` | 35 |
| `z-index.json` | 6 |

## Semantic (133 tokens × 2 modos)

Categorias raiz em light.json:

```
semantic.background.*
semantic.surface.*
semantic.content.*
semantic.brand.*
semantic.accent.*
semantic.feedback.*
semantic.border.*
semantic.focus.*
semantic.overlay.*
semantic.state.*
semantic.space.*
semantic.radius.*
semantic.size.*
semantic.typography.*
```

## Component (137 tokens)

| Arquivo | Tokens |
|---------|--------|
| `avatar.json` | 9 |
| `button.json` | 25 |
| `checkbox.json` | 14 |
| `input.json` | 18 |
| `modal.json` | 6 |
| `radio.json` | 10 |
| `select.json` | 19 |
| `skeleton.json` | 4 |
| `spinner.json` | 6 |
| `textarea.json` | 14 |
| `toggle.json` | 12 |

## Regras invioláveis

1. Component → Semantic, nunca Foundation
2. Semantic → Foundation, nunca hardcoded
3. Foundation é a única camada com valores absolutos
4. Brand é Foundation — 2 tokens, sem estados, ponto de troca por tema
5. Todo token tem `$type` conforme DTCG spec
6. Tokens não óbvios têm `$description`
7. Tokens de valor zero não são vinculados via setBoundVariable() no Figma
8. Novas categorias ou quebras de hierarquia exigem ADR
9. light.json e dark.json têm exatamente o mesmo conjunto de chaves
10. Todo `.default` gera sufixo `-default` no CSS
11. Cores puras (#FFF/#000) não são tokens foundation (ADR-010)

## ADRs relacionados

- **ADR-001** — Migração da arquitetura de tokens para Foundation→Semantic→Component com DTCG + Style Dictionary (Aceita)
- **ADR-002** — Stack agnóstica — HTML + CSS + vanilla JS como base (Aceita)
- **ADR-003** — Figma como origem canônica de tokens, Git como consolidação (Aceita — Revisada em 0.5.8)
- **ADR-004** — WCAG 2.2 AA como padrão de acessibilidade (Aceita — Implementada em 0.5.0)
- **ADR-005** — Brand como camada foundation, estados explícitos no semantic, e limpeza tipográfica (Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.2))
- **ADR-006** — Tokens semânticos de controle para dimensões e tipografia compartilhadas entre controles interativos (Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.3))
- **ADR-007** — Estabelecer sistema de cores toned com overlays coloridos e tokens semânticos toned (Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.4, sincronização Figma completa em 0.5.6))
- **ADR-008** — Recalibração das paletas foundation `green` e `amber` (Aceita — Implementada em 0.5.0)
- **ADR-009** — Separação de `border.default` (decorativa) e `border.control` (funcional) (Aceita — Implementada em 0.5.0)
- **ADR-010** — Remoção de `foundation.color.white` e `foundation.color.black` puros (Aceita — Implementada em 0.5.0)
- **ADR-011** — Reestruturação do naming de tokens semânticos de cor (Aceita — Implementada em 0.5.0)
- **ADR-012** — Tokens de line-height e letter-spacing divergem por design entre Figma e JSON (Aceita)
