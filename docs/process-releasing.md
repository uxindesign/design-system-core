# Releases

Passo a passo de uma release do design system. Pressupõe que você está na branch `main` com o trabalho da release concluído e revisado.

## Antes de começar

- [ ] Todas as mudanças da release estão em commits pequenos, legíveis, com mensagens em português.
- [ ] `npm run build:tokens`, `npm run sync:docs` e `npm run verify:tokens` rodam sem erro.
- [ ] `CHANGELOG.md` tem entradas em `[Não publicado]` cobrindo tudo que mudou desde a última versão.

## Passo a passo

1. **Definir a versão nova**. Consultar [regras de versionamento](./process-versioning.md).

2. **Atualizar `CHANGELOG.md`**:
   - Renomear `[Não publicado]` para `[x.y.z] — AAAA-MM-DD`.
   - Adicionar nova seção `[Não publicado]` vazia no topo.
   - Atualizar links de comparação no rodapé do arquivo.

3. **Atualizar `package.json`**: alterar o campo `version` para `x.y.z`.

4. **Commit de release**:

   ```bash
   git add CHANGELOG.md package.json
   git commit -m "chore(release): x.y.z"
   ```

5. **Tag**:

   ```bash
   git tag -a vx.y.z -m "Release x.y.z"
   ```

6. **Push**:

   ```bash
   git push origin main
   git push origin vx.y.z
   ```

7. **CI faz o resto**:
   - `.github/workflows/deploy.yml` roda `npm run build:all`.
   - Regenera `css/tokens/generated/*.css`, `docs/adr-index.md`, `docs/token-schema.md`, `docs/component-inventory.md`, `docs/changelog.html`, APIs JSON, `llms.txt`.
   - Auto-commita os derivados com `[skip ci]`.
   - Publica via GitHub Pages na URL `https://uxindesign.github.io/design-system-core/`.

8. **Verificar**:
   - A página `https://uxindesign.github.io/design-system-core/` mostra a badge `x.y.z`.
   - `docs/changelog.html` lista `x.y.z` como versão mais recente.
   - `docs/api/tokens-sync.json` tem timestamp recente e zero erros.

## Se algo der errado

- **CI falhar no build**: conferir logs no GitHub Actions. Se for falha de token ou referência quebrada, corrigir na branch, novo commit, novo push — sem precisar mexer na tag.
- **Precisar desfazer**: tags só removem com `git push origin :refs/tags/vx.y.z`. Desfazer release é operação delicada; prefira publicar um `x.y.z+1` com correção.

## Publicação no npm

Ainda não fazemos. Pacote está no backlog para ser publicado quando a decisão for tomada. Ver [backlog](./backlog.md).
