# Checklist: Figma Audit

Use este checklist em modo read-only. Nao corrigir durante a auditoria.

## Pagina

- [ ] Paginas modelo usadas na comparacao foram declaradas.
- [ ] `topLevelCount` esperado.
- [ ] Frame raiz correto.
- [ ] Root com auto-layout e background bindado.
- [ ] Secoes internas na ordem aprovada.
- [ ] Zero nos soltos fora do padrao aprovado.
- [ ] `clipsContent=false` onde focus/overlay pode escapar.
- [ ] Frames documentais com `clipsContent=true`: 0, salvo excecao aprovada.
- [ ] Root/secoes/tabelas/exemplos seguem as propriedades reais das paginas modelo.

## Component set

- [ ] Nome do component set correto.
- [ ] Variants esperadas presentes.
- [ ] Ordem de variants correta.
- [ ] `componentPropertyDefinitions` esperado.
- [ ] Propriedades dependentes aparecem junto de booleanos relacionados.
- [ ] Booleans/instance swaps/text properties realmente referenciados nos sublayers.

## Anatomia

- [ ] Layers principais existem e estao na ordem aprovada.
- [ ] Slots nativos existem onde especificado.
- [ ] Slots sem fill/stroke hardcoded quando sao apenas container de conteudo.
- [ ] Nested instances usam componentes DS reais.
- [ ] Instancias nao tem nomes manuais indevidos.
- [ ] Textos de documentacao com `autoRename=true`.
- [ ] Textos de documentacao com altura fixa indevida: 0.
- [ ] Textos de documentacao usam altura automatica/height hug conforme paginas modelo.

## Tokens e bindings

- [ ] Fills bindados.
- [ ] Strokes bindados.
- [ ] Stroke widths bindados.
- [ ] Corner radius bindado nos campos reais do Figma.
- [ ] Paddings e gaps bindados.
- [ ] Icon size, color e stroke width bindados.
- [ ] Focus ring com color/width/radius compativeis.
- [ ] Elevated/overlay com surface + effect style.
- [ ] Sem `ALL_SCOPES`.
- [ ] Sem variable nova sem WEB code syntax.
- [ ] Sem Component -> Foundation, Component -> Component ou valor cru em Component variable.
- [ ] Sem token Component sem uso real, salvo justificativa explicita.

## Conteudo e semantica

- [ ] Texto da documentacao orienta designer, nao duplica spec tecnica do repo.
- [ ] Exemplo usa componentes DS existentes.
- [ ] Menu, Select, Combobox e Dialog nao sao misturados semanticamente.
- [ ] Padroes interativos seguem APG ou decisao aprovada.

## Evidencia obrigatoria

- [ ] Contagem de variants.
- [ ] Contagem de slots.
- [ ] Contagem de token binds esperados vs encontrados.
- [ ] Contagem de textos com `autoRename=true`.
- [ ] Contagem de textos documentais com altura fixa indevida.
- [ ] Contagem de frames documentais com `clipsContent=true`.
- [ ] Contagem de divergencias contra paginas modelo.
- [ ] Contagem de instance name mismatches.
- [ ] Contagem de hardcoded fills/strokes relevantes.
- [ ] Contagem de loose nodes.
- [ ] Lista de falhas com node IDs.
