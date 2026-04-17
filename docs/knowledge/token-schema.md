# Token schema — Design System Core

> Gerado automaticamente por `scripts/sync-docs.mjs`.
> Não editar manualmente — as mudanças serão sobrescritas na próxima execução.
> Para regenerar: `npm run sync:docs`
> Versão atual: **1.5.1**

## Estado atual

| Aspecto | Valor |
|---------|-------|
| Versão | 1.5.1 |
| Formato canônico | JSON (DTCG) em `tokens/` |
| CSS | Gerado pelo Style Dictionary em `css/tokens/generated/` |
| Paridade light/dark | ✅ Mesmas chaves em ambos os modos |

## Camadas

| Camada | Tokens | Arquivos |
|--------|--------|----------|
| Foundation | ~212 | 10 arquivos |
| Semantic | ~116 × 2 modos | light.json + dark.json |
| Component | ~130 | 12 arquivos |

## Foundation (~212 tokens)

| Arquivo | Conteúdo |
|---------|----------|
| `brand.json` | 2 tokens (primary, secondary) |
| `colors.json` | 10 paletas × 11 steps + overlays neutros e coloridos |
| `motion.json` | duration (fast/normal/slow) + ease (default/in/out/in-out) |
| `opacity.json` | 0, 5, 10, 25, 50, 75, 100 |
| `radius.json` | none, xs, sm, md, lg, xl, 2xl, full |
| `shadows.json` | xs, sm, md, lg, xl, 2xl, none |
| `spacing.json` | Escala com half-steps: 0–24 (20 tokens) |
| `stroke.json` | border-width: 0, 1, 2, 4 |
| `typography.json` | Inter + DM Mono, sizes, weights, line-heights |
| `z-index.json` | 0, 10, 20, 30, 40, 50 |

## Semantic (~116 tokens × 2 modos)

Categorias raiz em light.json (pós ADR-011):

```
semantic.background.*     → page backgrounds (default, subtle, inverse, overlay)
semantic.surface.*        → component surfaces (default, raised, overlay, elevated)
semantic.content.*        → conteúdo sobre superfícies neutras (default, secondary, tertiary, disabled, inverse, link/*)
semantic.brand.*          → role da marca (default, hover, active, subtle, disabled, toned/*, content/*)
semantic.accent.*         → role de acento (default, hover, active, subtle, content/*)
semantic.feedback.*       → roles de feedback (success, warning, error, info — cada com default, hover, subtle, background, border, disabled, content/*)
semantic.border.*         → bordas (default, strong, subtle, focus, brand, error, focus-error, control/*, width/*)
semantic.focus.ring.*     → focus ring (width, offset, color)
semantic.overlay.*        → overlay opacity (subtle, default, medium, strong)
semantic.state.*          → overlays interativos (hover, pressed, focus, disabled/*)
semantic.space.*          → spacing semântico (inset, gap, component, section, control)
semantic.size.control.*   → dimensões de controles (sm/md/lg, icon/*, min-target)
semantic.typography.control.* → tipografia de controles (font-size/*, line-height/*)
semantic.radius.component → radius padrão de componentes
```

## Component (~130 tokens em 12 arquivos)

| Arquivo | Componente |
|---------|------------|
| `avatar.json` | Avatar |
| `button.json` | Button (brand, toned, danger, success + dimensões) |
| `checkbox.json` | Checkbox |
| `input.json` | Input Text |
| `modal.json` | Modal |
| `radio.json` | Radio |
| `select.json` | Select |
| `skeleton.json` | Skeleton |
| `spinner.json` | Spinner |
| `textarea.json` | Textarea |
| `toggle.json` | Toggle |

**Sem token file dedicado** (consomem semantic diretamente): Badge, Alert, Card, Tooltip, Tabs, Breadcrumb, Divider.

## Regras invioláveis

1. Component tokens → Semantic, nunca Foundation
2. Semantic tokens → Foundation, nunca hardcoded
3. Foundation é a única camada com valores absolutos
4. Brand é Foundation — 2 tokens (primary, secondary), sem estados
5. Todo token tem `$type` conforme DTCG spec
6. Todo token não óbvio tem `$description`
7. Tokens de valor zero não são vinculados via setBoundVariable() no Figma
8. Novas categorias ou quebras de hierarquia exigem ADR
9. light.json e dark.json devem ter exatamente o mesmo conjunto de chaves
10. Todo `.default` gera sufixo `-default` no CSS

## ADRs relacionados

- **ADR-001** — Migração para DTCG + Style Dictionary (Aceita)
- **ADR-005** — Brand como foundation, sufixo -default explícito (Aceita)
- **ADR-006** — Semantic control tokens (Aceita)
- **ADR-007** — Toned color system (Aceita)
- **ADR-008** — Recalibração paletas green/amber (Aceita)
- **ADR-009** — border/default vs border/control (Aceita)
- **ADR-010** — Abolir white/black puros (Aceita)
- **ADR-011** — Renaming tokens semânticos de cor (Aceita)
