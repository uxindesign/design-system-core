# Design System Snapshot Exporter

Plugin local do Figma para exportar as Variables do arquivo do Design System no formato lido por `scripts/sync-tokens-from-figma.mjs`.

## Instalação local

1. No Figma Desktop, abra **Plugins → Development → Import plugin from manifest...**.
2. Selecione `figma-plugin/snapshot-exporter/manifest.json`.
3. Abra o arquivo do Design System (`PRYS2kL7VdC1MtVWfZvuDN`) e rode o plugin.

## Uso

### Fluxo simples para designers

1. Abra o arquivo do Design System no Figma.
2. Rode o plugin.
3. Clique em **Verificar com repo publicado**.
4. Leia a mensagem no plugin:
   - `Figma igual ao publicado`
   - ou uma leitura do problema, como `Figma tem mudanças ainda não publicadas`

Esse modo compara as Variables do Figma com `https://uxindesign.github.io/design-system-core/docs/api/tokens.json`.

Quando há divergência, o plugin mostra:

- versão publicada comparada;
- quantidade de tokens comparados;
- contagem por tipo de divergência;
- próximo passo recomendado;
- detalhe técnico copiável para revisão.

### Fallback manual

1. Clique em **Baixar .figma-snapshot.json**.
2. Coloque o arquivo baixado na raiz do repo como `.figma-snapshot.json`.
3. Rode:

```bash
node scripts/sync-tokens-from-figma.mjs --require-fresh
npm run verify:tokens
```

## Escopo

- Exporta `variableCollections` e `variables` locais.
- Preserva aliases como `{ type: "VARIABLE_ALIAS", id }`.
- Preserva valores de cor, número, string, boolean e objetos serializáveis.
- No fluxo simples, compara com a API JSON publicada do repo, sem terminal e sem servidor local.
- Não escreve em GitHub, não aplica drift e não altera o arquivo Figma.

Este plugin é o MVP seguro antes de qualquer webhook ou automação de PR.
