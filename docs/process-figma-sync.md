# Processo: sync Figma → JSON via MCP

Como executar o sync das Figma Variables pros arquivos DTCG em `tokens/` usando o MCP remoto do Figma dentro de uma sessão Claude Code.

## Contexto

A ADR-003 (revisada em 0.5.8) estabelece **Figma como autoridade canônica** dos valores de token. Os JSONs em `tokens/` são consolidação derivada. Idealmente existiria um sync automático via REST API, mas `GET /v1/files/:key/variables/local` exige **plano Enterprise** (nosso plano Pro não destrava). Até termos Enterprise (ou implementarmos um plugin custom), o fluxo é manual via MCP: um agente Claude Code executa um script Plugin API que serializa as Variables num JSON temporário, e o script Node `scripts/sync-tokens-from-figma.mjs` lê esse snapshot e compara com os JSONs.

**Disparo:** manual, numa sessão Claude Code com o MCP `use_figma` autenticado no Design Team Workspace (Pro). Ver alternativas futuras em `docs/backlog.md` ("Implementar o sync Figma → JSON").

## Pré-requisitos

- Sessão Claude Code com o plugin `figma` (skill `figma:figma-use`) carregado.
- Design Team Workspace autenticado no MCP do Figma (Pro/Expert basta; não precisa Enterprise).
- Acesso de leitura ao arquivo `PRYS2kL7VdC1MtVWfZvuDN`.

## Passo 1 — gerar o snapshot via MCP

Peça ao agente Claude Code:

> "Gere um snapshot das Figma Variables do design system em `.figma-snapshot.json`."

O agente vai executar uma sequência de chamadas `use_figma` que:

1. Lista as 2 collections atuais (Foundation, Semantic) com seus modos.
2. Itera sobre as variables do arquivo em batches pequenos (o MCP tem limite de resposta, então precisa chunkar).
3. Para cada variável, captura `id`, `name`, `resolvedType`, `variableCollectionId`, `valuesByMode` e `description`.
4. Agrega tudo num único arquivo `.figma-snapshot.json` no formato:

```json
{
  "generatedAt": "2026-04-20T00:00:00.000Z",
  "fileKey": "PRYS2kL7VdC1MtVWfZvuDN",
  "variableCollections": {
    "VariableCollectionId:4:2": { "id": "...", "name": "Foundation", "modes": [...], "defaultModeId": "..." },
    ...
  },
  "variables": {
    "VariableID:5:3": {
      "id": "VariableID:5:3",
      "name": "color/neutral/50",
      "resolvedType": "COLOR",
      "variableCollectionId": "VariableCollectionId:4:2",
      "valuesByMode": { "4:0": { "r": 0.97, "g": 0.98, "b": 0.99, "a": 1 } }
    },
    ...
  }
}
```

O arquivo está em `.gitignore` e não deve ser commitado — é regenerado a cada sync.

## Passo 2 — dry-run

```bash
node scripts/sync-tokens-from-figma.mjs
```

O script:

1. Lê `.figma-snapshot.json` (ou `--snapshot <path>` pra outro caminho).
2. Constrói o estado esperado dos JSONs (`tokens/foundation/`, `tokens/semantic/`) a partir das Variables.
3. Lê os JSONs atuais e compara.
4. Reporta em 6 categorias:

| Categoria | Significado | Ação em `--write` |
|-----------|-------------|-------------------|
| **VALUE_DRIFT** | Mesmo token, valor difere. | Aplica valor do Figma no JSON. |
| **NEW_IN_FIGMA** | Figma tem, JSON não. | Não cria — revisão manual. |
| **MISSING_IN_FIGMA** | JSON tem, Figma não. | Não deleta — revisão manual. |
| **ALIAS_BROKEN** | Figma aponta pra variável inexistente. | Não resolve — fix no Figma. |
| **CSS_ONLY** | Token existe dos dois lados mas representação diverge por capacidade CSS (font family stack, `rem`, weight numérico). Introduzido após PR #18 / 0.5.11. | **Não aplica** — aplicar regridiria o CSS (ex: trocaria `'Inter', system-ui, ...` por `"Inter"`; ou `0.875rem` por `14`, quebrando WCAG 1.4.4). |
| **BY_DESIGN** | Token existe só de um lado por escolha arquitetural documentada — ver **ADR-012** (line-height/letter-spacing: PX no Figma, ratio/em no JSON) e **ADR-016** (categorias CSS-only `motion.*`, `z.*`, `shadow.*` vivem só no JSON porque Figma não as representa como Variables). | **Não aplica** — não é drift, é arquitetura. |

Se as 4 primeiras categorias zerarem, Figma e JSON estão em dia. Exit 0.

Se tem divergências reais (VALUE_DRIFT, NEW_IN_FIGMA, MISSING_IN_FIGMA), exit 1. CSS_ONLY e BY_DESIGN são informativos — não contam como divergência.

Review no output antes de aplicar.

## Passo 3 — aplicar VALUE_DRIFT

Quando os drifts representarem mudanças intencionais feitas no Figma:

```bash
node scripts/sync-tokens-from-figma.mjs --write
```

Esse modo:

1. Aplica os VALUE_DRIFT sobrescrevendo `$value` nos arquivos `tokens/**/*.json` correspondentes.
2. Roda `npm run build:tokens` pra regenerar `css/tokens/generated/*.css`.
3. Roda `npm run sync:docs` pra atualizar docs.
4. NEW_IN_FIGMA e MISSING_IN_FIGMA continuam reportados — requer ação manual.

Review `git diff` antes de commitar. Toda mudança de token entra numa PR separada pra auditoria.

## Passo 4 — commit

```bash
git add tokens/ css/tokens/generated/ docs/api/ docs/tokens-*.html
git commit -m "sync: tokens do Figma"
```

Não commitar `.figma-snapshot.json` (está ignorado).

## Troubleshooting

**`Snapshot não encontrado`**: rode o Passo 1 antes.

**`Snapshot inválido: faltam variables/variableCollections`**: o arquivo JSON não tem a estrutura esperada. Re-gerar no Passo 1.

**ALIAS_BROKEN > 0**: alguém apagou uma variável no Figma sem atualizar os aliases. Fix no Figma e re-gerar snapshot.

**Muitos NEW_IN_FIGMA / MISSING_IN_FIGMA**: possível desalinhamento do mapeamento prefix→file em `scripts/lib/figma-dtcg.mjs` (`FOUNDATION_PREFIX_TO_FILE`). Confirme que Figma e JSON usam as mesmas convenções de nome; ajuste o mapa se necessário.

**Ruído de ponto flutuante** (`0.05` vs `0.05000000074505806`): a função `normalizeForCompare` arredonda pra 4 casas. Se ainda aparecer como VALUE_DRIFT, o valor realmente mudou.

## Limitações

- **Manual.** Não roda em CI sem Enterprise ou plugin custom. Ver `docs/backlog.md` pras alternativas.
- **Não gera commits automáticos.** O usuário decide o que entra em `--write` e quando.
- **Não cria nem deleta tokens** em JSON. NEW_IN_FIGMA e MISSING_IN_FIGMA exigem edição explícita pra evitar divergências acidentais.
- **Sem resolução inteligente de rename.** Se um token for renomeado no Figma, aparece como MISSING + NEW — o operador precisa identificar e tratar manualmente.
