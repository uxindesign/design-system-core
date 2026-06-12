# Integrações para agentes IA

Este documento descreve integrações operacionais usadas por agentes IA neste repositório. Ele complementa `AGENTS.md`; não substitui suas regras. Se houver conflito, siga `AGENTS.md` e as ADRs em `docs/decisions/`.

## Princípios

- O projeto é agnóstico de agente. Regras de arquitetura, workflow e qualidade vivem em `AGENTS.md`.
- Arquivos específicos de ferramentas (`CLAUDE.md`, `GEMINI.md`, configs locais) devem conter apenas detalhes de carregamento, nomes de ferramentas e limitações do runtime.
- Segredos nunca entram no repositório nem no chat: `FIGMA_PAT`, GitHub tokens e chaves equivalentes devem ficar em env, secret store ou configuração local ignorada pelo Git.
- Antes de concluir que uma integração não existe, liste as ferramentas/MCPs disponíveis no runtime atual e tente uma leitura segura.

## Figma

Arquivo do Design System: `PRYS2kL7VdC1MtVWfZvuDN`.

Capacidades esperadas quando houver MCP Figma:

- Leitura: metadata, design context, variables, screenshots.
- Escrita: Plugin API via `use_figma` ou ferramenta equivalente.
- Validação: sempre ler de volta após escrita e, quando layout/spacing/icon/texto mudar, verificar screenshot.

Fallback sem MCP Figma:

- Consultar `.figma-snapshot.json` quando existir.
- Verificar idade do snapshot com `npm run agent:preflight`.
- Para categorias CSS-only (`motion.*`, `z.*`, `shadow.*`), JSON é fonte de verdade e Figma não é necessário.

## Figma Plugin API

Armadilhas operacionais conhecidas:

- Bound variable de paint fica em `paint.boundVariables.color.id`, não em `node.boundVariables` top-level.
- Para trocar bound variable de `fontSize` em text node, carregue fontes, limpe o binding com valor raw e só depois aplique novo binding.
- `setBoundVariable` pode empilhar se a propriedade já tinha binding; limpe antes e rebinde depois.
- Dumps grandes podem truncar output; use chunks e agregue fora do plugin.
- `hiddenFromPublishing = true` logo após `createVariable` pode falhar com `Node not found`; crie primeiro e aplique a flag em chamada separada.
- `strokeWeight` bindado pode viver em `strokeTopWeight`, `strokeRightWeight`, `strokeBottomWeight`, `strokeLeftWeight`. `cornerRadius` pode seguir o mesmo padrão por canto.
- Evite `ALL_SCOPES`; use escopos específicos (`FRAME_FILL`, `SHAPE_FILL`, `TEXT_FILL`, `STROKE_COLOR`, `GAP`, `CORNER_RADIUS`, `STROKE_FLOAT`, etc.).
- `COMPONENT_SET` deve permitir visualizar foco, sombra e overflow necessário. Não ative `clipsContent = true` em wrappers interativos sem motivo explícito.

## GitHub e Git local

- O remote canônico é `git@github.com:uxindesign/design-system-core.git`.
- Git local usa SSH; não coloque token em URL remota.
- GitHub MCP/API pode ser usado para leitura de issues, PRs, branches e arquivos.
- Ao atualizar arquivos via API, sempre obtenha SHA fresco imediatamente antes do update.
- Payloads grandes podem estourar timeout; prefira commits locais ou updates menores.
- Alterações em `.github/workflows/*.yml` devem ser feitas via Git local ou interface GitHub autorizada, não por GitHub MCP com permissão insuficiente.

## Adapters por agente

### Claude Code

- `CLAUDE.md` deve importar ou apontar para `AGENTS.md`.
- Use nomes de MCP/skills reais do ambiente Claude apenas nesse adapter.
- Antes de `use_figma`, carregue a skill Figma exigida pelo runtime quando aplicável.

### Gemini CLI

- `GEMINI.md` deve apontar para `AGENTS.md`.
- Quando possível, configure o Gemini para usar `AGENTS.md` como context file do projeto.
- Se MCPs estiverem configurados, siga as mesmas regras de leitura, escrita e validação descritas aqui.

### Codex e outros

- `AGENTS.md` é a entrada principal.
- Configurações locais podem adicionar permissões ou fallback filenames, mas não devem duplicar regra de projeto.
