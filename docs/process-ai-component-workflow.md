# Processo: componentes e padrões via agentes IA

Este processo define como qualquer agente IA deve criar ou redesenhar componentes, padrões de interação ou documentação visual no DS Core.

Ele existe para evitar execução prematura. Um componente novo ruim custa retrabalho em Figma, tokens, CSS, docs, testes e changelog. Portanto, o agente deve primeiro produzir contexto e spec, depois executar.

## Quando usar

Use este processo quando a tarefa envolver:

- criar componente novo;
- redesenhar a estrutura de componente existente;
- adicionar padrão de interação novo;
- criar documentação visual nova no Figma;
- definir variants, states, slots, tokens ou anatomia pública;
- diferenciar padrões parecidos, como dropdown, menu, select e combobox.

Não use este processo completo para correções pontuais já especificadas pelo owner, como trocar um padding, corrigir um binding ou ajustar um token conhecido. Nesses casos, siga `AGENTS.md` seção 4.3 e mantenha a mudança estreita.

## Regras duras

1. Não escrever no Figma antes de benchmark + brief + spec aprovados.
2. Não espelhar no repo antes do Figma aprovado.
3. Não inventar estilos ou exemplos soltos quando já existir componente DS equivalente.
4. Não criar tokens novos sem justificar camada, uso e escopo.
5. Não criar variants para comportamento que deve ser propriedade, slot ou composição.
6. Não usar componente errado para semântica errada. Menu button, select e combobox têm papéis diferentes.
7. Não transformar documentação Figma em cópia da documentação técnica do repo.
8. Não interpretar aprovação de um gate como autorização para todos os próximos gates.
9. Não misturar limpeza de trabalho rejeitado, criação de componente e sync repo no mesmo bloco de ação.
10. Não criar páginas Figma fora do padrão vivo do DS Core. Página de componente deve usar frame raiz único e seções internas; component sets, exemplos, labels e docs não ficam soltos no canvas.

## Como demonstrar aderência

Todo agente deve mostrar um checkpoint antes de avançar de gate. O formato mínimo é:

```md
**Gate atual**
- Escopo:
- Evidência consultada:
- Decisão proposta:
- Bloqueado antes de:
- Aprovação necessária:
```

O campo "Bloqueado antes de" deve dizer explicitamente qual ação ainda não será feita, por exemplo: "não escrever no Figma", "não sincronizar repo", "não commitar" ou "não publicar".

Aprovação explícita vale só para o gate apresentado imediatamente antes. Exemplos:

- "pode executar o draft no Figma" autoriza apenas o draft Figma descrito.
- "pode levar ao repo" autoriza apenas o sync repo descrito depois do Figma aprovado.
- "leva para prod" autoriza publicação apenas se o escopo, diff e validações já tiverem sido apresentados.

Se o usuário mudar a decisão, a decisão mais recente prevalece e o agente deve reabrir o gate afetado antes de agir.

## Roles obrigatórias para agentes

Para reduzir mistura de responsabilidades, trabalhos de componente/padrão devem usar as roles documentadas em `docs/agents/`.

Comandos curtos oficiais ficam em `docs/agents/quick-commands.md`. Quando o owner disser algo como "Audite Menu como Figma Auditor" ou "Execute a spec aprovada como Figma Builder", o agente deve resolver o atalho para a role/checklist correspondente sem exigir o prompt completo.

| Momento | Role | Arquivo |
|---|---|---|
| Brief, classificação e spec | DS Architect | `docs/agents/roles/ds-architect.md` |
| Escrita no Figma | Figma Builder | `docs/agents/roles/figma-builder.md` |
| Auditoria Figma read-only | Figma Auditor | `docs/agents/roles/figma-auditor.md` |
| Sync Figma → JSON/CSS | Token Sync Agent | `docs/agents/roles/token-sync-agent.md` |
| CSS/docs no repo | Repo Component Agent | `docs/agents/roles/repo-component-agent.md` |
| Commit/PR/push/prod | Release Agent | `docs/agents/roles/release-agent.md` |

Antes de agir, o agente deve declarar a role e o checklist usados. Exemplo:

```md
Role: Figma Auditor
Checklist: docs/agents/checklists/figma-audit-checklist.md
Artefato de entrada: node IDs do draft Figma
Bloqueado antes de: qualquer escrita no Figma ou repo
```

Regra: **quem constrói não aprova o próprio trabalho**. A role Figma Builder pode fazer uma leitura pós-escrita básica para confirmar que o script rodou, mas a aprovação estrutural deve vir de Figma Auditor.

## Gate permanente — paridade de documentação Figma

Sempre que o trabalho criar, editar ou reorganizar documentação visual no Figma, este gate é obrigatório. O owner não precisa pedir explicitamente.

Antes de escrever:

1. Escolher 2-3 páginas maduras do DS Core como modelo.
2. Ler as propriedades reais dessas páginas: root, seções, tabelas, textos, dividers, exemplos e wrappers de component sets.
3. Registrar o modelo escolhido na spec ou no checkpoint.
4. Tratar o modelo como contrato operacional, não como inspiração visual vaga.

Regras mínimas:

- Textos de documentação usam altura automática (`textAutoResize` adequado / height hug), não altura fixa criada por script.
- Frames documentais usam `clipsContent=false`, salvo exceção justificada e aprovada.
- Root e seções seguem o padrão vivo de auto-layout, padding/gap/binds e background.
- Tabelas, linhas, exemplos, labels de matriz e component sets ficam aninhados na seção correta.
- Component matrix pode usar frame `NONE` quando o padrão vivo exigir posicionamento manual, mas não pode cortar focus ring, overlay ou conteúdo.
- Nenhum node gerado fica solto no canvas fora do frame raiz aprovado.

Depois de escrever, a auditoria deve reportar contagens objetivas:

- textos documentais com altura fixa;
- frames documentais com `clipsContent=true`;
- seções esperadas sem auto-layout;
- root sem background ou binds esperados;
- nós soltos fora do root;
- divergências relevantes contra as páginas modelo.

Qualquer contagem acima de zero bloqueia "pronto" até correção ou justificativa explícita do owner.

## Gate 0 — estado atual e escopo

Antes de pesquisar ou propor, o agente deve isolar o estado do trabalho:

1. Rodar `npm run agent:preflight`.
2. Rodar `git status --short`.
3. Declarar arquivos ou mudanças já sujas que estão fora do escopo.
4. Declarar se há trabalho Figma anterior em disputa, rejeitado ou pendente de limpeza.
5. Não limpar, reverter ou reaproveitar trabalho rejeitado sem autorização explícita.

Se o workspace estiver sujo, o agente deve decidir entre:

- seguir apenas com documentação/processo, quando a mudança é independente;
- pedir autorização para limpar o trabalho rejeitado;
- isolar a próxima ação em arquivos específicos;
- parar se o risco de misturar mudanças for alto.

## Gate 1 — benchmark

Antes de propor estrutura, o agente deve olhar referências maduras. Prioridade:

1. Referências fornecidas pelo owner.
2. Design systems Figma maduros já citados no projeto, como Lyse e Untitled UI.
3. Documentação oficial Figma para variables, component properties, variants e slots.
4. Padrões WAI-ARIA APG quando houver interação, teclado, popup, menu, dialog, listbox, combobox ou disclosure.
5. Componentes equivalentes em DSs públicos reconhecidos, quando útil para comparar escopo.

O output do benchmark deve ser curto:

- o que a referência resolve bem;
- quais decisões valem para o DS Core;
- quais decisões não devem ser copiadas;
- riscos de semântica ou acessibilidade.

Benchmark não é fonte de verdade. Ele orienta qualidade e maturidade, mas o DS Core continua obedecendo ADRs, tokens, Figma vivo e repo.

## Gate 2 — classificação do padrão

Antes de desenhar, classifique o que está sendo criado:

| Classe | Critério | Implicação |
|---|---|---|
| Primitive | Base visual reutilizável sem semântica final | Pode ser usado internamente, mas não deve virar API pública sem necessidade. |
| Componente | API pública com anatomia, tokens e docs | Exige component set, properties, tokens e documentação. |
| Composição | Arranjo de componentes existentes | Deve usar componentes DS existentes, não recriar estilos. |
| Overlay | Popup, modal, popover, tooltip ou menu | Exige regras de foco, camada, fechamento e ARIA. |
| Form control | Campo que participa de formulário | Exige label, helper/error, disabled/read-only, value/placeholder e ARIA. |
| Menu action | Lista de ações | Segue menu/menu button; não representa valor de formulário. |
| Combobox | Input com popup e seleção | Segue combobox/listbox; representa valor e exige teclado/ARIA próprios. |

Se a classe não estiver clara, pare e peça decisão ao owner antes de criar.

Pare também quando:

- o padrão misturar valor de formulário com menu de ações;
- o componente exigir comportamento de teclado ainda não especificado;
- o componente depender de tokens globais novos;
- houver conflito com ADR, `AGENTS.md` ou componente existente.

## Gate 3 — brief aprovado

O agente deve apresentar um brief objetivo com:

- nome proposto;
- problema que resolve;
- quando usar;
- quando não usar;
- diferença para componentes próximos;
- semântica ARIA ou HTML esperada;
- componentes DS que serão compostos;
- variants e states candidatos;
- slots reais necessários;
- tokens previstos e camada provável;
- documentação Figma necessária para designers;
- impacto esperado no repo.

Formato obrigatório:

```md
**Brief proposto**
- Nome:
- Classe:
- Problema:
- Usar quando:
- Não usar quando:
- Diferenças:
- Acessibilidade/semântica:
- Composição DS:
- Variants/states candidatos:
- Slots:
- Tokens:
- Docs Figma:
- Impacto repo:
```

Sem aprovação explícita do owner, não prossiga para spec Figma.

## Gate 4 — spec Figma

Antes de escrever no Figma, especifique:

- anatomia pública e nomes de layers;
- estrutura de auto-layout;
- slots nativos do Figma, quando houver conteúdo customizável;
- component properties, incluindo `TEXT`, `BOOLEAN`, `INSTANCE_SWAP`, `VARIANT` e `SLOT`;
- ordem das propriedades no painel;
- variants e estados com justificativa;
- quais estados são visuais, interativos ou documentais;
- tokens Component necessários;
- aliases Semantic esperados;
- exemplos mínimos no canvas;
- documentação visual que ajuda designers a usar o componente;
- padrão de página Figma a seguir, baseado em páginas equivalentes existentes.

O foco da documentação no Figma é o uso por designers: anatomia, variants, propriedades, exemplos e limites. Especificação de front, API CSS e detalhes de implementação ficam no repo.

Formato obrigatório:

```md
**Spec Figma proposta**
- Anatomia:
- Auto-layout:
- Properties:
- Variants:
- States:
- Slots:
- Tokens/bindings:
- Exemplos no canvas:
- Documentação visual:
- Padrão de página:
- Validação planejada:
```

Sem aprovação explícita do owner, não escreva no Figma.

### Padrão de página Figma obrigatório

Antes de criar ou redesenhar uma página no Figma, o agente deve inspecionar pelo menos 2 páginas equivalentes do DS Core no Figma vivo. A spec precisa registrar:

- páginas usadas como referência;
- nome e dimensões do frame raiz;
- margens externas e largura útil;
- ordem e nomes das seções;
- padrão de tabelas, exemplos e notas;
- onde componentes, component sets, labels de matriz e exemplos ficam aninhados;
- exceção proposta, se o componente exigir uma estrutura diferente.

Critério padrão para página de componente:

- exatamente um frame raiz no canvas da página, nomeado com o componente;
- filhos diretos do root em ordem previsível (`header`, `divider`, `section-*`);
- component set, componentes auxiliares, exemplos e labels dentro da seção correspondente;
- zero nós gerados soltos no canvas da página;
- `clipsContent=false` em root/seções quando focus ring, popover, overlay ou exemplos puderem ultrapassar a área visual.

Qualquer exceção precisa ser explicada e aprovada antes da escrita no Figma.

## Gate 5 — execução Figma em draft

A primeira execução deve ser draft:

1. Criar ou reorganizar dentro do padrão de página aprovado.
2. Preservar padrões do DS Core: nomes, ordenação, tokens, text styles, Lucide, focus ring, auto-layout e aninhamento de seções.
3. Usar componentes existentes dentro de slots e exemplos.
4. Validar por leitura estrutural depois da escrita.
5. Para página de componente, validar `topLevelCount`, nome do frame raiz, ordem de seções e ausência de nós gerados soltos.
6. Verificar screenshot quando layout, spacing, iconografia ou texto mudar.
7. Apresentar evidência e aguardar aprovação antes de sincronizar repo.

Se o draft for rejeitado, corrija o draft ou descarte o trabalho. Não consolidar no repo um Figma ainda em disputa.

Evidência mínima após draft:

- node IDs criados/alterados;
- resumo do que foi alterado;
- screenshot ou motivo objetivo para não ter screenshot;
- problemas encontrados;
- validação estrutural feita;
- validação do padrão de página (`topLevelCount`, root, seções, loose nodes);
- o que ainda está bloqueado antes do repo.

## Gate 6 — repo após aprovação

Só depois do Figma aprovado:

1. Sincronizar tokens Figma-canônicos pelo fluxo Figma → JSON.
2. Criar ou ajustar `tokens/component/<component>.json` quando houver contrato anatômico.
3. Regenerar CSS gerado com os scripts do repo.
4. Implementar CSS consumindo `var(--ds-...)`, nunca valores hardcoded.
5. Documentar exemplos com componentes DS existentes e anatomia pública.
6. Atualizar inventários, API, LLM docs e changelog quando aplicável.

Antes de escrever no repo, apresente:

```md
**Plano repo**
- Figma aprovado:
- Tokens a sincronizar:
- Arquivos previstos:
- Docs previstas:
- Validações:
- Fora de escopo:
```

## Validação mínima

Para Figma:

- dump antes/depois quando editar component set existente;
- `componentPropertyDefinitions` preservadas ou intencionalmente alteradas;
- texts editáveis ligados a `componentPropertyReferences.characters`;
- booleans, instance swaps e slots ligados aos layers corretos;
- sem `Icon Placeholder`, `glyph`, hardcoded indevido ou `ALL_SCOPES`;
- Component variables apontando para Semantic;
- página de componente com um root frame, seções internas e zero nós gerados soltos;
- screenshot revisado.

Para repo:

```bash
npm run verify:tokens
npm run verify:registry
npm run verify:figma-structure
npm test
```

Quando criar, renomear ou remover Component variables, rode também:

```bash
npm run audit:component-tokens
```

## Referências

- `AGENTS.md`
- `docs/system-principles.md`
- `docs/agent-integrations.md`
- `docs/process-figma-sync.md`
- [Figma Help: Variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Figma Help: Component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [AGENTS.md open format](https://agents.md/)
- [Claude Code memory docs](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Gemini CLI configuration](https://raw.githubusercontent.com/google-gemini/gemini-cli/main/docs/cli/configuration.md)
