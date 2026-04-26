# Versionamento

O design system usa [Semantic Versioning](https://semver.org/lang/pt-BR/). Enquanto não houver release oficial 1.0, tudo fica na faixa **0.x**.

## Regras de bump

| Tipo | Quando | Exemplo |
|---|---|---|
| **Patch** (0.5.0 → 0.5.1) | Correção pontual, ajuste de documentação, melhoria interna sem impacto visível, regeneração de artefato derivado. | Fix de CSS de um componente. Regenerar inventário. Corrigir um typo em ADR. |
| **Minor** (0.5.1 → 0.6.0) | Adição compatível **ou** breaking change (em 0.x). Pacote coerente: novo componente, nova foundation, refator arquitetural com ADR, migração relevante. | Adicionar componente Dropdown. Renomear `foundation.spacing` → `foundation.dimension`. Eliminar uma camada de tokens. |
| **Major** (→ 1.0.0) | Release oficial da marca, decidido explicitamente. | Primeiro lançamento público estável. |

Em 0.x, bumps **minor cobrem breaking changes** — convenção do [semver em versões iniciais](https://semver.org/lang/pt-BR/#spec-item-4). Não há bump major até a 1.0.

## Quando bumpar — gatilhos explícitos

Bump não é por commit nem por sessão de trabalho. É por **release** — entrega coerente que vale a pena marcar. Três gatilhos:

### 1. Mudança considerável (preferencial)

Bumpa quando ocorre **uma das seguintes**, ainda que isolada:

- Novo ADR aceito que muda arquitetura ou contrato.
- Renomeação de namespace/token público (breaking).
- Novo componente shipado (não em rascunho).
- Eliminação ou consolidação de camada de tokens (ex: ADR-013 eliminou Component, ADR-015 unificou size).
- Mudança de fonte de verdade (ex: ADR-003 revisado).

Esses são por si só dignos de uma release minor. Não acumular com outras mudanças "pra justificar".

### 2. Feature completa

Bumpa quando um conjunto de mudanças **fecha** uma feature — não em pedaços. Exemplo: adicionar Theming requer foundation + semantic + componentes adaptados + docs. Tudo junto numa minor.

### 3. Cadência temporal (fallback)

Se há acúmulo de patches sem trigger arquitetural ou feature por **mais de 2 semanas**, faça uma minor consolidando o que houve. Evita `[Não publicado]` virar dump infinito.

## Quando NÃO bumpar

Não bumpa em:

- Trabalho em andamento (não shipado).
- Cleanup parcial, ajustes de WIP.
- Cada commit isolado de uma sessão de trabalho.
- Documentação interna (CLAUDE.md, scripts internos).
- Regeneração automática por CI.
- Refactor de scripts sem impacto observável.

Esses commits vão pra `[Não publicado]` no CHANGELOG e ficam acumulando até o próximo trigger.

## CHANGELOG — uma entrada por release

`[Não publicado]` é staging. Todas as mudanças desde a última release vão pra lá, **agrupadas por tema** (não por commit). Quando bumpa, a seção inteira vira `[x.y.z] — AAAA-MM-DD` e nasce um novo `[Não publicado]` vazio.

Más práticas a evitar:

- ❌ Subseções fragmentadas pra cada ajuste do dia.
- ❌ Bump de versão pra cada commit.
- ❌ "Mudanças não publicadas" tendo 10 datas diferentes — sinal de que faltou release.

Boa prática:

- ✅ Uma entrada por release, agrupada em **Adicionado / Mudado / Corrigido / Removido**.
- ✅ Cada item tem 1-2 linhas explicando **por quê** (não só o quê).

## Cadeia única de versão

Três lugares exibem a versão e **precisam bater**:

- `package.json` (campo `version`).
- `CHANGELOG.md` (última entrada não rotulada como `[Não publicado]`).
- Badge no topo de `index.html` (injetada pelo build).

Se os três baterem, a documentação está em dia. Se divergirem, algo no pipeline está quebrado.

## Fluxo de bump

1. Confirmar que `CHANGELOG.md` tem uma seção `[Não publicado]` com as mudanças desde a última release, **consolidadas** (não fragmentadas).
2. Renomear `[Não publicado]` para `[x.y.z] — AAAA-MM-DD`.
3. Adicionar nova seção vazia `[Não publicado]` no topo para mudanças futuras.
4. Ajustar `package.json` com a versão nova.
5. Rodar `npm run build:all` pra regenerar artefatos derivados.
6. Commit: `chore(release): x.y.z`.
7. Criar tag: `git tag -a vx.y.z -m "Release x.y.z"`.
8. Push com tag: `git push origin main vx.y.z`.
9. CI regenera CSS/changelog HTML/APIs/llms.txt e publica no GitHub Pages.

## O que não conta como versionável

- Mudanças em `CLAUDE.md` (documentação interna para agentes).
- Mudanças em `scripts/archive/`.
- Workflows CI sem impacto no deploy.
- Atualizações de `.gitignore`, configs locais.

Esses podem ir em commits `docs:`, `chore:`, `ci:` sem bump.
