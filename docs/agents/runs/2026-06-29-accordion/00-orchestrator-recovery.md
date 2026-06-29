# Recuperacao do fluxo

- Status: Blocked
- Causa raiz: o fluxo aceitou auditoria estrutural baseada em heuristica de path (`section-variantes`) e nao separou drift global de falhas do Accordion.
- Correcao no Figma vivo: WEB syntax aplicado em `pagination/item/font-weight/current` e `pagination/item/font-weight/default`; 10 dead Component variables de Field/Menu removidas.
- Correcao adicional no Figma vivo: `modal/overlay/padding/default` bindado nos quatro paddings do component set `Modal` (`154:33`).
- Correcao no exporter: `figma-plugin/snapshot-exporter` versionado como `0.2.0` e `variableUsage` agora deve ser calculado por ancestral `COMPONENT`/`COMPONENT_SET`, nao por nome fixo de secao.
- Correcao no gate: `verify:figma-structure` bloqueia snapshots com `structureAudit.variableUsage` gerado por exporter anterior a `0.2.0`.
- Correcao no processo: `docs/process-ai-component-workflow.md`, `docs/agents/orchestration.md` e checklists de Figma Build/Audit/Token Sync agora exigem retroalimentacao de falhas sistemicas, gate paralelo para drift global e status `bloqueado por snapshot desatualizado`.

## Evidencia

- `evidence/live-figma-global-fix-check.json`: leitura live do Figma confirmou WEB syntax nos dois tokens de Pagination e `removedStillPresent: []`.
- `evidence/live-figma-modal-overlay-padding-bind.json`: leitura live do Figma confirmou `modal/overlay/padding/default` em `paddingLeft`, `paddingRight`, `paddingTop` e `paddingBottom`.
- `state.json`: registra `figma:plugin:check=0`, `verify:agent-docs=0`, `verify:figma-structure=1` e `verify:tokens=1`.

## Bloqueio atual

- Gerar novo `.figma-snapshot.json` com o exporter `0.2.0` depois do binding de Modal.
- Reexecutar `npm run verify:figma-structure`.
- Reexecutar `npm run audit:component-tokens`.
- Reexecutar `npm run verify:tokens`.
- Somente depois aplicar `sync:tokens-from-figma:write`, se o novo snapshot confirmar os drifts.
