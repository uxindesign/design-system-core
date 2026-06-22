# Checklist: Figma Build

Use este checklist antes e durante qualquer escrita no Figma.

## Antes de escrever

- [ ] Role declarada: `Figma Builder`.
- [ ] Brief aprovado.
- [ ] Spec Figma aprovada.
- [ ] Escopo da escrita declarado.
- [ ] Dump inicial feito quando editar componente existente.
- [ ] Padrao de pagina vivo consultado quando criar/reorganizar documentacao.
- [ ] Quando houver documentacao visual, 2-3 paginas maduras usadas como modelo foram registradas.
- [ ] Propriedades reais do modelo foram lidas: root, secoes, textos, tabelas, dividers, exemplos e wrappers.
- [ ] Componentes DS existentes identificados para nested instances.
- [ ] Tokens previstos listados por camada e escopo.

## Durante a escrita

- [ ] Reutilizar componentes DS; nao desenhar substitutos manuais.
- [ ] Preservar slots nativos quando a spec pedir slot.
- [ ] Usar auto-layout em estruturas relacionadas.
- [ ] `clipsContent=false` quando focus ring, overlay ou menu puder ultrapassar o frame.
- [ ] Frames documentais com `clipsContent=false`, salvo excecao justificada e aprovada.
- [ ] Textos documentais com altura automatica/height hug; nao usar altura fixa criada por script.
- [ ] Root, secoes, tabelas e exemplos seguem as propriedades reais das paginas modelo.
- [ ] Variants em ordem previsivel e menor -> maior quando houver size.
- [ ] Component properties expostas apenas para API publica necessaria.
- [ ] Textos configuraveis com `TEXT` property quando forem parte de componente.
- [ ] Textos de documentacao sem nome manual: `autoRename=true`.
- [ ] Instancias nao renomeadas manualmente sem justificativa.
- [ ] Icones vivos como instancias Lucide, nao glyph/Icon Placeholder.

## Tokens e bindings

- [ ] Todo fill relevante bindado.
- [ ] Todo stroke color relevante bindado.
- [ ] Todo stroke width relevante bindado.
- [ ] Todo corner radius relevante bindado.
- [ ] Todo padding/gap relevante bindado.
- [ ] Todo tamanho de icone/frame de icone bindado.
- [ ] Todo stroke width de icone Lucide bindado.
- [ ] Focus ring usa camada/estrutura aprovada e tokens de focus ring.
- [ ] Overlay/elevated inclui surface e shadow/effect style quando aplicavel.
- [ ] Component tokens apontam para Semantic, nao Foundation ou Component.
- [ ] Variables novas com escopos especificos, WEB code syntax e alias documentado.

## Saida

- [ ] Node IDs criados/alterados.
- [ ] Resumo do que mudou.
- [ ] Pendencias conhecidas.
- [ ] Status: `pronto para auditoria` ou `bloqueado`.
