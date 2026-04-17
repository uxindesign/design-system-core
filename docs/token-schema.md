# Token schema — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs` em 2026-04-17. Não editar manualmente.
> Para regenerar: `npm run sync:docs`
> Versão atual: **1.5.1**

## Estado atual

| Aspecto | Valor |
|---------|-------|
| Versão | 1.5.1 |
| Formato canônico | JSON (DTCG) em `tokens/` |
| CSS gerado | Style Dictionary → `css/tokens/generated/` |
| Pipeline | ⚠️ index.css ainda importa legados |
| Paridade light/dark | ✅ 132 tokens em ambos os modos |

## Camadas

| Camada | Tokens | Arquivos |
|--------|--------|----------|
| Foundation | **225** | 10 |
| Semantic | **132 × 2 modos** | light.json + dark.json |
| Component | **131** | 11 |

## Foundation (225 tokens)

| Arquivo | Tokens |
|---------|--------|
| `brand.json` | 2 |
| `colors.json` | 128 |
| `motion.json` | 7 |
| `opacity.json` | 7 |
| `radius.json` | 8 |
| `shadows.json` | 7 |
| `spacing.json` | 21 |
| `stroke.json` | 4 |
| `typography.json` | 35 |
| `z-index.json` | 6 |

## Semantic (132 tokens × 2 modos)

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

## Component (131 tokens)

| Arquivo | Tokens |
|---------|--------|
| `avatar.json` | 9 |
| `button.json` | 25 |
| `checkbox.json` | 14 |
| `input.json` | 15 |
| `modal.json` | 6 |
| `radio.json` | 10 |
| `select.json` | 16 |
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
- **ADR-003** — Figma como autoridade de design, Git como autoridade de tokens/código (Aceita)
- **ADR-004** — Figma como autoridade de design, Git como autoridade de tokens/código (Aceita)
- **ADR-005** — Brand como camada foundation, estados explícitos no semantic, e limpeza tipográfica (Proposta)
- **ADR-006** — Adopt semantic control tokens for shared dimensions and typography across interactive controls (Proposed)
- **ADR-007** — Establish toned color system with colored overlays and semantic toned tokens (Proposed)
- **ADR-008** — Recalibração das paletas foundation `green` e `amber` (Aceita)
- **ADR-009** — Separação de `border.default` (decorativa) e `border.control` (funcional) (Aceita)
- **ADR-010** — Remoção de `foundation.color.white` e `foundation.color.black` puros (Aceita)
- **ADR-011** — Reestruturação do naming de tokens semânticos de cor (Aceita)
