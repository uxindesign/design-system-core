# CLAUDE.md — Claude Code adaptações

**Comece sempre por [`AGENTS.md`](./AGENTS.md)** — fonte canônica de instruções para qualquer agente neste repo (forbidden actions, source of truth por categoria, workflows comuns, verification protocol). Este arquivo cobre só o que é específico do Claude Code.

## Antes da primeira escrita na sessão

```bash
npm run agent:preflight
```

Mostra branch, dirty/clean, idade do snapshot Figma, último resultado de `verify:tokens`, e estado do CHANGELOG.

## MCPs disponíveis

### Figma — dois servidores autenticados

- **Remoto** (`mcp__claude_ai_Figma__*`): Design Team Workspace (Pro). Use para:
  - Leitura: `get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`.
  - Escrita: `use_figma` (Plugin API). `fileKey` do DS: `PRYS2kL7VdC1MtVWfZvuDN`.
  - Antes de chamar `use_figma`, carregar a skill `figma:figma-use`.
- **Desktop Dev Mode** (`mcp__Figma__*`): requer Figma desktop com Dev Mode MCP Server habilitado (Preferências → Enable Dev Mode MCP Server). Bom para ler o node atualmente selecionado.

### GitHub (`mcp__github__*`)

PAT fine-grained restrito a `uxindesign/design-system-core`. Permissões: Contents/Issues/PRs read+write, Actions/Metadata read. Sem `workflow` ou `packages`.

Git local usa SSH (`git@github.com:uxindesign/design-system-core.git`). Zero token em URL.

**Limitações conhecidas:**
- `create_or_update_file` exige SHA fresco. Rodar `get_file_contents` imediatamente antes de cada update.
- `push_files` com payload grande estoura timeout. Commitar arquivos individualmente.
- MCP **não consegue escrever** em `.github/workflows/` (restrição de API). Usar interface web ou git local com SSH.
- `web_fetch` em `github.com/tree/...` bloqueado por robots; `raw.githubusercontent.com` bloqueado pelo proxy. Usar `get_file_contents` ou ferramentas locais (Read/Bash).

## Figma Plugin API — armadilhas operacionais

Coisas que falharam silenciosamente em sessões passadas:

- **Bound variable de paint**: usar `paint.boundVariables.color.id`, não `node.boundVariables` top-level. Paint carrega seu próprio binding.
- **Trocar bound variable de `fontSize`** em text node: setar `node.fontSize` pra valor numérico raw primeiro (limpa bindings), depois `setBoundVariable` com novo token. Exige `await figma.loadFontAsync()` antes. Pré-carregar via `Promise.all(loadFontAsync)` em loop.
- **`setBoundVariable` empilha** se a propriedade já tinha binding. Limpar antes (`null` ou valor raw), depois rebind.
- **Truncamento de output ~20KB**: dumps grandes quebram em chunks via `slice(start, end)` e agregados off-plugin. Ver `scripts/sync-tokens-from-figma.mjs` e `docs/process-figma-sync.md`.
- **`hiddenFromPublishing = true`** após `createVariable` falha com "Node not found". Criar primeiro, setar a flag em chamada separada — ou via UI do Figma depois. Documentado em PR #17/#18.
- **`strokeWeight` bindado vive em 4 campos individuais**: `node.setBoundVariable('strokeWeight', var)` retorna sem erro mas não aplica. O binding real fica em `strokeTopWeight/strokeRightWeight/strokeBottomWeight/strokeLeftWeight`. Mesma coisa pra `cornerRadius` → `topLeftRadius/topRightRadius/bottomLeftRadius/bottomRightRadius`. Helpers em `scripts/lib/figma-node-audit.mjs`. Descoberto em PR #31 (0.5.17).
- **`ALL_SCOPES` polui pickers** — sempre escopos específicos (`FRAME_FILL`, `SHAPE_FILL`, `TEXT_FILL`, `STROKE_COLOR`, `GAP`, `CORNER_RADIUS`, `STROKE_FLOAT` etc.).
- **`COMPONENT_SET` precisa de `clipsContent = false` + size que abrace todo conteúdo** (variants + focus rings + drop shadows que extrapolam). Senão focus ring fica clipped na visualização do component set, mascarando regressões de a11y.
- **Não ativar `clipsContent = true`** em frames de componente sem necessidade — impede visualização de focus rings e conteúdo overflow. Default é off e deve continuar off pra qualquer wrapper interativo.

## Skills relevantes neste repo

- `figma:figma-use` — carregar antes de qualquer chamada `use_figma`.
- `claude-md-management:revise-claude-md` — atualizar este arquivo com aprendizados de uma sessão.
- `claude-md-management:claude-md-improver` — auditar qualidade.

## Resolução de conflitos entre instruções

Precedência (maior → menor):
1. **AGENTS.md / CLAUDE.md neste repo** — autoridade local.
2. **ADRs em `docs/decisions/`** — autoridade arquitetural local.
3. Memórias persistentes do agente (`~/.claude/.../memory/`) — preferências cross-projeto. Quando conflitar com o repo, **o repo ganha**.
4. Defaults do agente.

Se uma memória sua diz "X" e este repo diz "não X", siga o repo. Se a memória for repo-específica, ela está no lugar errado — devia estar no repo. Mover.

## Quando precisar atualizar este arquivo

Mudou algo Claude-Code-específico? (MCP novo, gotcha de Plugin API descoberta, skill nova relevante.) Edite aqui. Mudou algo do projeto em geral? (Workflow, regra, source of truth.) Vai em `AGENTS.md`.
