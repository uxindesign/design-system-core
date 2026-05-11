# Token schema — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs` em 2026-05-11. Não editar manualmente.
> Para regenerar: `npm run sync:docs`
> Versão atual: **1.0.0-beta.4**

## Estado atual

| Aspecto | Valor |
|---------|-------|
| Versão | 1.0.0-beta.4 |
| Formato canônico | JSON (DTCG) em `tokens/` |
| CSS gerado | Style Dictionary → `css/tokens/generated/` |
| Pipeline | ✅ index.css importa apenas generated/ |
| Paridade light/dark | ✅ 173 tokens em ambos os modos |

## Camadas

| Camada | Tokens | Arquivos |
|--------|--------|----------|
| Foundation/Core | **266** | 9 |
| Semantic/System | **173 × 2 modos** | light.json + dark.json |
| Component | **55** | 9 |

## Foundation (266 tokens)

| Arquivo | Tokens |
|---------|--------|
| `colors.json` | 147 |
| `dimension.json` | 28 |
| `motion.json` | 10 |
| `opacity.json` | 6 |
| `radius.json` | 7 |
| `shadows.json` | 5 |
| `stroke.json` | 3 |
| `typography.json` | 54 |
| `z-index.json` | 6 |

## Semantic (173 tokens × 2 modos)

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
semantic.z.*
```

## Component (55 tokens)

| Arquivo | Tokens |
|---------|--------|
| `avatar.json` | 16 |
| `button.json` | 3 |
| `checkbox.json` | 6 |
| `input.json` | 3 |
| `radio.json` | 6 |
| `select.json` | 3 |
| `spinner.json` | 5 |
| `textarea.json` | 3 |
| `toggle.json` | 10 |

## Regras invioláveis

1. Componentes migrados consomem Component tokens; componentes ainda não migrados podem consumir Semantic direto durante a transição
2. Component → Semantic; Semantic → Foundation; consumidor final nunca usa Foundation direto
3. Foundation é a camada de primitivos; valores específicos fora da escala exigem ADR explícita
4. Brand é Foundation — 2 tokens, sem estados, ponto de troca por tema
5. Todo token tem `$type` conforme DTCG spec
6. Tokens não óbvios têm `$description`
7. Textos em componentes Figma usam text styles; não bind direto de typography vars
8. Tokens de valor zero não são vinculados via setBoundVariable() no Figma
9. Novas categorias ou quebras de hierarquia exigem ADR
10. light.json e dark.json têm exatamente o mesmo conjunto de chaves
11. Todo `.default` gera sufixo `-default` no CSS
12. Cores puras (#FFF/#000) não são tokens foundation (ADR-010)

## ADRs relacionados

- **ADR-001** — Migração da arquitetura de tokens para Foundation→Semantic→Component com DTCG + Style Dictionary (Aceita — superseded em parte por [ADR-014](ADR-014-action-tokens-role-style.md) (themes Default/Ocean/Forest removidos em 0.8.0; Brand virou paleta única customizável))
- **ADR-002** — Stack agnóstica — HTML + CSS + vanilla JS como base (Aceita)
- **ADR-003** — Figma como origem canônica de tokens, Git como consolidação (Aceita — Revisada em 0.5.8)
- **ADR-004** — WCAG 2.2 AA como padrão de acessibilidade (Aceita — Implementada em 0.5.0)
- **ADR-005** — Brand como camada foundation, estados explícitos no semantic, e limpeza tipográfica (Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.2). Superseded por [ADR-014](ADR-014-action-tokens-role-style.md): collection Brand (modes Default/Ocean/Forest) deletada em 0.8.0, Brand virou paleta única customizável dentro da Foundation.)
- **ADR-006** — Tokens semânticos de controle para dimensões e tipografia compartilhadas entre controles interativos (Parcialmente substituída — `size.control.*` e `space.control.padding-{x,y}.*` substituídos por escala `size.{xs..5xl}` + `space.{xs..2xl}` + `space.control.padding.10` em **ADR-015** (2026-04-26). O contrato público de anatomia dos componentes foi movido para tokens Component em **ADR-019** (2026-05-10). `typography.control.*` permanece vigente.)
- **ADR-007** — Estabelecer sistema de cores toned com overlays coloridos e tokens semânticos toned (Aceita — Implementada em 0.5.0 (fechamento formal em 0.5.4, sincronização Figma completa em 0.5.6))
- **ADR-008** — Recalibração das paletas foundation `green` e `amber` (Aceita — Implementada em 0.5.0)
- **ADR-009** — Separação de `border.default` (decorativa) e `border.control` (funcional) (Aceita — Implementada em 0.5.0)
- **ADR-010** — Remoção de `foundation.color.white` e `foundation.color.black` puros (Aceita — Implementada em 0.5.0)
- **ADR-011** — Reestruturação do naming de tokens semânticos de cor (Aceita — Implementada em 0.5.0)
- **ADR-012** — Tokens de line-height e letter-spacing divergem por design entre Figma e JSON (Aceita)
- **ADR-013** — Camadas de consumo de tokens — Foundation nunca direto em consumidor final (Aceita — implementada em 0.7.0 e parcialmente substituída por ADR-019 em 2026-05-11)
- **ADR-014** — Reestruturação Semantic em `action` × `style` × `prop` × `state` — eliminação de brand/accent e themes (Aceita — implementada em 0.7.0 e estabilizada em 1.0.0-beta.1)
- **ADR-015** — — Unificação da escala size, eliminação de tokens component-specific e renomeação spacing→dimension (Aceito)
- **ADR-016** — — Tokens sem equivalência no Figma (CSS-only) (Aceito)
- **ADR-017** — — Componentes CSS-only (sem equivalência no Figma) (Aceito)
- **ADR-018** — — Renomear `content.{default,secondary,tertiary}` para `content.{strong,default,subtle}` (Aceito)
- **ADR-019** — — Reintroducao de Component tokens como contrato anatomico (Aceito)
