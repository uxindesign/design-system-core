# Backlog

Itens fora do escopo imediato mas que devem ser implementados. Organizados por prioridade.

## Alta prioridade

### Implementar ADR-005 — Brand como foundation, `-default` explícito, limpeza tipográfica

Decisão proposta desde 2026-04-14. Pré-requisito para ADR-006 e ADR-007 saírem do estado Proposta. Ver [ADR-005](./decisions/ADR-005-brand-foundation-e-estados-explicitos.md) para pré-requisitos, estimativa e passos concretos.

### Implementar ADR-006 — Semantic control tokens compartilhados

Normalizar dimensões de Button, Input, Select e Textarea via tokens semânticos compartilhados. Depende de ADR-005. Ver [ADR-006](./decisions/ADR-006-semantic-control-tokens.md).

### Implementar ADR-007 — Toned color system

Fechar formalmente o padrão de overlays coloridos. O código já tem a maior parte implementada. Ver [ADR-007](./decisions/ADR-007-toned-color-system.md).

### Preencher `docs/brand-principles.md`

Template existe, conteúdo real ainda não foi definido. Passa por: missão, 3 princípios de design, tom de voz, identidade visual, logo.

## Média prioridade

### Comparação completa Figma ↔ JSON no `scripts/tokens-verify.mjs`

Primeira versão do script confirma conectividade e coleta contagens. Próxima iteração: comparação nome-por-nome, valor-por-valor, modo-por-modo, com resolução de alias Figma e normalização de formato. Adiciona valor depois que o FIGMA_PAT está configurado como secret do CI.

### Padronizar idioma dos ADR-006 e ADR-007

Estão em inglês, destoando dos outros nove que estão em português. Traduzir mantendo a estrutura.

### Sincronização automatizada Figma ↔ site (Fase 7 do plano)

Script Node usando MCP remoto que sincroniza textos de documentação entre site e nodes do Figma marcados com convenção `<sync:...>`. Ver descrição completa em `docs/process-figma-sync.html` (a ser criado).

## Baixa prioridade

### Storybook

Componente inventory marca como pendente. Hoje o site cumpre o papel de vitrine interativa. Só implementar se houver demanda explícita de time Dev consumidor.

### MCP próprio do design system

Expõe tokens, componentes e guidelines via MCP para agentes. `llms.txt` + APIs JSON cobrem a maior parte dos casos. Implementar só se aparecer um caso onde MCP próprio faz diferença real.

### Publicação no npm

Pacote nunca foi publicado. Decidir quando (e com qual nome de escopo) fazer o primeiro publish. Antes de publicar, validar que `files` no `package.json` cobre o que deve ser distribuído.

### Revisão das páginas do Figma em estado de teste

Você mencionou que páginas vazias (Icons, Grids, Images, Templates) e resíduos nas páginas de componente (SECTION e `image 1` em Input Text, INSTANCE soltas em Button, `Frame 1` em Textarea) estão em uso para experimentos. Quando terminar os testes, decidir se preenche ou remove.

### Contraste dos 65 warnings de `tokens-verify`

Tokens em JSON sem CSS custom property equivalente — sobretudo overlays (`foundation.color.overlay.*`), tipografia e `semantic.typography.control.*`. Investigar caso a caso se deveriam gerar CSS var ou se a omissão é intencional (tokens intermediários).
