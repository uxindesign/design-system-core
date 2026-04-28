# Token schema — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs` em 2026-04-28. Não editar manualmente.
> Para regenerar: `npm run sync:docs`
> Versão atual: **1.0.0-beta.4**

## Estado atual

| Aspecto | Valor |
|---------|-------|
| Versão | 1.0.0-beta.4 |
| Formato canônico | JSON (DTCG) em `tokens/` |
| CSS gerado | Style Dictionary → `css/tokens/generated/` |
| Pipeline | ✅ index.css importa apenas generated/ |
| Paridade light/dark | ✅ 164 tokens em ambos os modos |

## Camadas

| Camada | Tokens | Arquivos |
|--------|--------|----------|
| Foundation | **262** | 9 |
| Semantic | **164 × 2 modos** | light.json + dark.json |
| Component | **0** | 0 |

## Foundation (262 tokens)

| Arquivo | Tokens |
|---------|--------|
| `colors.json` | 145 |
| `dimension.json` | 27 |
| `motion.json` | 7 |
| `opacity.json` | 6 |
| `radius.json` | 7 |
| `shadows.json` | 7 |
| `stroke.json` | 3 |
| `typography.json` | 54 |
| `z-index.json` | 6 |

## Semantic (164 tokens × 2 modos)

Categorias raiz em light.json:

```
semantic.primary.*
semantic.toned.*
semantic.outline.*
semantic.ghost.*
semantic.link.*
semantic.feedback.*
semantic.surface.*
semantic.background.*
semantic.content.*
semantic.border.*
semantic.overlay.*
semantic.opacity.*
semantic.motion.*
semantic.space.*
semantic.size.*
semantic.shadow.*
semantic.radius.*
semantic.typography.*
```

## Component (0 tokens)

| Arquivo | Tokens |
|---------|--------|


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
- **ADR-006** — Tokens semânticos de controle para dimensões e tipografia compartilhadas entre controles interativos (Parcialmente substituída — `size.control.*` e `space.control.padding-{x,y}.*` substituídos por escala `size.{xs..5xl}` + `space.{xs..2xl}` + `space.control.padding.10` em **ADR-015** (2026-04-26). `typography.control.*` permanece vigente.)
- **ADR-007** — Estabelecer sistema de cores toned com overlays coloridos e tokens semânticos toned (Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.4, sincronização Figma completa em 0.5.6))
- **ADR-008** — Recalibração das paletas foundation `green` e `amber` (Aceita — Implementada em 0.5.0)
- **ADR-009** — Separação de `border.default` (decorativa) e `border.control` (funcional) (Aceita — Implementada em 0.5.0)
- **ADR-010** — Remoção de `foundation.color.white` e `foundation.color.black` puros (Aceita — Implementada em 0.5.0)
- **ADR-011** — Reestruturação do naming de tokens semânticos de cor (Aceita — Implementada em 0.5.0)
- **ADR-012** — Tokens de line-height e letter-spacing divergem por design entre Figma e JSON (Aceita)
- **ADR-013** — Camadas de consumo de tokens — Foundation nunca direto em consumidor final (Aceita — implementada em 0.7.0 (Component layer eliminada) e fechada em 1.0.0-beta.1 (0 leaks Foundation em `css/components/*.css` e `css/base/*.css`))
- **ADR-014** — Reestruturação Semantic em `action` × `style` × `prop` × `state` — eliminação de brand/accent e themes (Aceita — implementada em 0.7.0 e estabilizada em 1.0.0-beta.1)
- **ADR-015** — — Unificação da escala size, eliminação de tokens component-specific e renomeação spacing→dimension (Aceito)
