# Figma Build Report — Correções pós-auditoria

- **Status tripartite:** Contrato **pass** | Documentação **pass** | Visual **pass** | **Pronto para Figma Auditor: sim**
- Run: `docs/agents/runs/2026-06-25-pagination`
- Builder: Figma Builder (Cursor)
- Data: 2026-06-26
- Entrada: `04-figma-audit-report.md` (auditStatus: bloqueado — 4 falhas)

## Correções aplicadas

| # | Falha | Node(s) | Antes | Depois |
|---|---|---|---|---|
| 1 | Loose node no canvas | `8429:341` | INSTANCE solta; `topLevelCount=2` | Removida; `topLevelCount=1` |
| 2 | Doc sm — prev não disabled | `8423:2623` → Prev Button | `State=Default` | `State=Disabled` |
| 3 | Doc lg — next não disabled | `8423:2676` → Next Button | `State=Default` | `State=Disabled` |
| 4 | Active sem bold | `8363:518`, `8363:526`, `8363:534` | `fontWeight=400` | `fontWeight=700` + bind `pagination/item/font-weight/current` |

### Detalhe fix #4 (Active bold)

Variables Component criadas no Figma (faltavam na collection):

- `pagination/item/font-weight/current` → alias `typography/body/font-weight/bold` (`VariableID:8472:2451`)
- `pagination/item/font-weight/default` → alias `typography/body/font-weight/regular` (`VariableID:8472:2452`)

Text nodes Active (`8363:518` sm, `8363:526` md, `8363:534` lg): `fontStyle` bindado em `current` + `Inter Bold`.

## Read-back pós-escrita (Figma vivo)

```
topLevelCount: 1
looseNodes: 0
8423:2623 prev State: Disabled
8423:2676 next State: Disabled
8363:518 fw: 700
8363:526 fw: 700
8363:534 fw: 700
```

## API pública (inalterada)

Set `8423:342` — único eixo `Size` (3 variants). Sem Show Prev/Show Next / icon swap.

## Validação

| Comando | Resultado |
|---|---|
| `npm run agents:validate-page-parity -- docs/agents/runs/2026-06-25-pagination` | exit **0** (21/21 state matrix) |
| `npm run verify:figma-structure` | exit **0** |
| `npm run audit:component-tokens` | exit **0** |
| Screenshot root `8364:2358` | capturado nesta sessão |

Evidência regenerada: `evidence/page-parity.json` (`generatedAt: 2026-06-26`).

## Gate tripartite (auto-checagem Builder)

| Gate | Status | Evidência |
|---|---|---|
| Contrato | **pass** | Active bold 3/3; sizes intactos; API Size only |
| Documentação | **pass** | loose=0; doc disabled aplicado; properties table OK |
| Visual | **pass** | sm prev acinzentado; lg next acinzentado; screenshot root |

## Inalterado

- Pagination Item 15 variants (exceto Active bold)
- Pagination set `8423:342` anatomia e 3 sizes
- Descriptions + documentationLinks nos sets
- Repo (CSS, JSON, HTML) — fora de escopo

## Follow-up 2026-06-25 — Text Styles body bold

Regressão pós-auditoria: fix #4 aplicou `Inter Bold` manual e removeu Text Style nos Active,
quebrando escala tipográfica (todos em 16/24).

**Solução canônica (owner):** criar Text Styles de fundação `body/sm-bold`, `body/md-bold`,
`body/lg-bold` e reaplicar nos Active (`8363:518`, `8363:526`, `8363:534`).

| Style | Escala | Binds (igual `body/*`, exceto peso) |
|---|---|---|
| `body/sm-bold` | 14/20 | `fontStyle` → `typography/body/font-weight/bold` |
| `body/md-bold` | 16/24 | idem |
| `body/lg-bold` | 18/32 | idem |

Active nodes: Text Style bold por size + bind `pagination/item/font-weight/current`.
Read-back: `fontWeight=700`, escala correta por size, Text Style presente.

## Próximo passo

**Figma Auditor** — reauditar read-only a partir do Figma vivo; confirmar que as 4 falhas bloqueantes foram resolvidas.

**Não sincronizar repo** até gate `figma-audit` aprovado pelo owner.
