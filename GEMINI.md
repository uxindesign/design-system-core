# GEMINI.md — Gemini CLI adaptações

**Comece sempre por [`AGENTS.md`](./AGENTS.md)** — fonte canônica de instruções para qualquer agente neste repo (forbidden actions, source of truth por categoria, workflows comuns, verification protocol). Este arquivo cobre só o que é específico do Gemini CLI.

## Antes da primeira escrita na sessão

```bash
npm run agent:preflight
```

## MCPs e ferramentas

Gemini CLI hoje **não tem acesso direto aos MCPs Figma e GitHub** que a sessão Claude Code tem (esses MCPs estão configurados em `~/.claude.json`). Implicações:

- **Figma**: não pode ler/escrever Variables nem Plugin API. Limitações:
  - Para tarefas que exigem leitura do estado real do Figma, peça ao usuário pra rodar via Claude Code primeiro, ou consulte o snapshot estático em `.figma-snapshot.json` (pode estar stale — checar idade no preflight).
  - Para tarefas em categorias **CSS-only** (`motion.*`, `z.*`, `shadow.*` — ADR-016), Gemini pode trabalhar sem Figma porque JSON é fonte. Para outras categorias, evitar mudança até validar com Figma.
- **GitHub**: usar `gh` CLI local (mesma autenticação SSH/token do desenvolvedor). Não tem MCP nativo.
- **Git local**: livre via Bash. Mesmas regras de branch/PR descritas em AGENTS.md seção 6.

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

## Limitações importantes pra evitar problemas

- **Não tente "intuir" valores Figma sem checar o snapshot**. Se snapshot stale ou ausente, parar e pedir ao usuário pra regerar via Claude Code.
- **Não inventar variables CSS** que o Figma equivalente não tem bindadas. Cadeia é Figma → JSON → CSS, mesmo sem MCP Figma direto.
- **Não tente atualizar Effect Styles, Text Styles ou Variables do Figma**. Essas mudanças são write-only via Plugin API (Claude Code com MCP).
- Editar tokens em categoria Figma-canônica sem o MCP Figma é alto risco — só se o usuário confirmar explicitamente que ele já fez a mudança no Figma e quer sincronizar manualmente o JSON.

## Quando precisar atualizar este arquivo

Mudou algo Gemini-específico? (Limitação nova, ferramenta nova disponível.) Edite aqui. Mudou algo do projeto em geral? Vai em `AGENTS.md`.
