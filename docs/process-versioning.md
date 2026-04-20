# Versionamento

O design system usa [Semantic Versioning](https://semver.org/lang/pt-BR/). Enquanto não houver release oficial 1.0, tudo fica na faixa **0.x**.

## Regras

| Tipo de bump | Quando | Exemplo |
|---|---|---|
| **Patch** (0.5.0 → 0.5.1) | Correção, ajuste de documentação, melhoria interna sem impacto visível. | Corrigir um bug de CSS. Regenerar um inventário. |
| **Minor** (0.5.1 → 0.6.0) | Adição de funcionalidade compatível. Novo componente, novo token semântico, nova foundation. | Adicionar componente Dropdown. Criar `semantic.feedback.toned.*`. |
| **Breaking** (ainda em 0.x) | Remoção ou renomeação de token/classe/API. Qualquer mudança que quebre consumidores. | Renomear `text/on-brand` para `brand/content/contrast`. |
| **Major** (→ 1.0.0) | Só quando houver release oficial da marca, decidido explicitamente. | Primeiro lançamento público estável. |

Em 0.x, bumps minor cobrem tanto adições compatíveis quanto breaking changes — é a convenção do [semver em versões iniciais](https://semver.org/lang/pt-BR/#spec-item-4).

## Cadeia única de versão

Três lugares exibem a versão e **precisam bater**:

- `package.json` (campo `version`).
- `CHANGELOG.md` (última entrada não rotulada como `[Não publicado]`).
- Badge no topo de `index.html` (injetada pelo build).

Se os três baterem, a documentação está em dia. Se divergirem, algo no pipeline está quebrado.

## Fluxo de bump

1. Confirmar que `CHANGELOG.md` tem uma seção `[Não publicado]` com as mudanças desde a última release.
2. Renomear `[Não publicado]` para `[x.y.z] — AAAA-MM-DD`.
3. Adicionar nova seção vazia `[Não publicado]` no topo para mudanças futuras.
4. Ajustar `package.json` com a versão nova.
5. Commit: `chore(release): x.y.z`.
6. Criar tag: `git tag -a vx.y.z -m "Release x.y.z"`.
7. Push com tag: `git push origin main vx.y.z`.
8. CI regenera artefatos derivados (CSS, `docs/changelog.html`, APIs JSON, `llms.txt`) e publica no GitHub Pages automaticamente.

## O que não conta como versionável

- Mudanças em `CLAUDE.md` (é documentação interna para agentes, não consumida por humanos externos).
- Mudanças em arquivos dentro de `scripts/archive/`.
- Mudanças em workflows CI a não ser que alterem o comportamento do deploy.

Essas podem ir em commits `docs:`, `chore:`, `ci:` sem bump.
