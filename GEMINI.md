# GEMINI.md — Gemini CLI adaptações

**Comece sempre por [`AGENTS.md`](./AGENTS.md)** — fonte canônica de instruções para qualquer agente neste repo (forbidden actions, source of truth por categoria, workflows comuns, verification protocol). Este arquivo cobre só o que é específico do Gemini CLI.

## Antes da primeira escrita na sessão

```bash
npm run agent:preflight
```

## MCPs e ferramentas

MCP é protocolo aberto — Gemini CLI suporta MCP servers nativamente. Se o usuário configurou Figma MCP e GitHub MCP no Gemini, **você tem acesso igual ao Claude Code** (mesmo `fileKey` `PRYS2kL7VdC1MtVWfZvuDN`, mesmas operações `get_design_context`/`use_figma`/etc).

**Antes de assumir que NÃO tem acesso:** rode `gemini mcp list` (ou comando equivalente) para confirmar. Se Figma e GitHub estão listados, todas as operações descritas em AGENTS.md/CLAUDE.md valem 100% pra você também.

**Se NÃO tiver MCP configurado** (cenário menos comum):
- **Figma**: consulte snapshot estático em `.figma-snapshot.json` (verificar idade via preflight). Pra tarefas em categorias CSS-only (`motion.*`, `z.*`, `shadow.*` — ADR-016), JSON é fonte e não precisa de Figma.
- **GitHub**: usar `gh` CLI local (mesma autenticação SSH/token do dev).
- **Git local**: livre via Bash em qualquer cenário.

## Convenções de commit

Co-Author do agente:
```
Co-Authored-By: Gemini <noreply@google.com>
```

## Resolução de conflitos entre instruções

Precedência (maior → menor):
1. **AGENTS.md / GEMINI.md neste repo** — autoridade local.
2. **ADRs em `docs/decisions/`** — autoridade arquitetural local.
3. Configuração persistente do Gemini CLI (`~/.gemini/...` se existir) — preferências cross-projeto. Quando conflitar com o repo, **o repo ganha**.
4. Defaults do agente.

## Boas práticas (independente de MCP estar configurado ou não)

- **Não "intuir" valores Figma sem verificação**. Com MCP Figma: rodar `get_variable_defs`/`get_design_context`. Sem MCP: consultar `.figma-snapshot.json` (verificar idade via preflight).
- **Não inventar variables CSS** que o Figma equivalente não tem bindadas. Cadeia é Figma → JSON → CSS — mantém ordem.
- **Categorias CSS-only (motion/z/shadow) — JSON é fonte** (ADR-016). Edição direta legítima sem precisar Figma.
- **Mudanças em Effect Styles, Text Styles, Variables do Figma**: precisa MCP Figma com Plugin API (`use_figma`). Se não tiver, peça pra o usuário rodar via outro agente.

## Quando precisar atualizar este arquivo

Mudou algo Gemini-específico? (Limitação nova, ferramenta nova disponível.) Edite aqui. Mudou algo do projeto em geral? Vai em `AGENTS.md`.
