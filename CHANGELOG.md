# Changelog

Todas as mudanças notáveis deste design system são registradas aqui.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

Enquanto o sistema não tiver um release oficial 1.0, todas as versões ficam na faixa 0.x. Regras de bump documentadas em `docs/process-versioning.html`.

## [Não publicado]

## [0.5.8]

### Alterado
- ADR-003 reescrita. A versão anterior declarava Git como fonte de verdade para tokens; a revisão reposiciona **Figma Variables como a autoridade canônica** dos valores de token. Git (`tokens/**/*.json`) passa a ser "consolidação derivada em DTCG" em vez de source. Fluxo canônico: Figma → sync manual → JSON → CSS → site. Decisão tomada em 21/04/2026 alinhando a prática à intenção do time (designer decide; dev consolida).
- CLAUDE.md: seção "Como a pipeline funciona" atualizada com o novo fluxo. Regras de ouro adicionadas: não editar `tokens/*.json` à mão, sempre passar pelo Figma. Lista de scripts em "Ferramentas" lista `sync:tokens-from-figma` (a ser implementado no próximo PR).
- Backlog reestruturado: item "Sincronização automatizada Figma ↔ site" substituído por "Reduzir documentação textual do Figma" (decisão concreta do time). Adicionados itens "Futuro do site de documentação" (Astro/Zeroheight/Supernova), "Resolução de conflitos inteligente" e "Sincronização automática de tokens" (evoluções futuras).

## [0.5.7]

### Adicionado
- 6 tokens foundation novos em `tokens/foundation/colors.json`, subcategoria `color.disabled`: `brand-light`, `brand-dark`, `success-light`, `success-dark`, `error-light`, `error-dark`. Valores primitive (hex/rgba) que representam o fill disabled de cada role; viviam antes como literais na camada semantic.

### Corrigido
- `semantic.brand.disabled`, `semantic.feedback.success.disabled`, `semantic.feedback.error.disabled`, `semantic.brand.content.contrast-disabled`, `semantic.feedback.success.content.contrast-disabled`, `semantic.feedback.error.content.contrast-disabled` em `light.json` e `dark.json` — 12 tokens que tinham valores rgba/hex literais agora referenciam tokens foundation (`color.disabled.*` ou `color.overlay.white.80/60` existentes). Viola menos a regra "semantic nunca hardcoded" (ADR-001). Zero mudança visual.
- Item correspondente removido do backlog.

## [0.5.6]

### Alterado
- ADR-007: sincronização Figma completa. Confirmação de que o naming aninhado `brand/toned/{default,hover,active}` já vigora no arquivo Figma (migração feita durante ADR-011). Variáveis `color/primary/toned-*` antigas (flat + `-disabled`/`-disabled-fg`) não existem mais.
- Button variant Toned+Disabled: 6 variantes (3 tamanhos × Icon Only true/false) tinham foreground apontando para `brand/content/contrast-disabled` (errado para contexto toned com fundo neutral) ou para variável órfã. Re-vinculadas para `content/disabled` (neutral-400 opaco), conforme ADR-007. 21 rebindings no total.
- Item correspondente removido do backlog.

### Alterado
- ADR-006 e ADR-007 traduzidos inteiramente para PT-BR. Antes, partes do corpo (Context, Decision, Consequences, Alternatives considered) estavam em inglês enquanto o cabeçalho havia sido traduzido. Agora os 11 ADRs são consistentes em idioma.
- Pequenos ajustes no ADR-006 durante a tradução: tokens `semantic.typography.control.line-height.*` documentados referenciando `{foundation.spacing.4/5/6}` (alinhado ao que o código já faz desde 0.5.3). Tokens de CSS listados em "Consequências" alinhados aos nomes reais emitidos pelo build (`--ds-control-font-size-*`, `--ds-control-line-height-*`).
- Pequenos ajustes no ADR-007 durante a tradução: tokens `semantic.brand.toned.*` documentados no naming consolidado do ADR-011 (antes referenciados como `semantic.color.primary.toned.*`). Foreground toned aponta para `semantic.brand.content.default`.

## [0.5.4]

### Alterado
- ADR-007 marcada como Aceita — Implementada em 0.5.0. Camada de código (foundation overlays, semantic toned, component tokens, CSS do button) já havia sido executada via ADR-011; fechamento formal em 0.5.4.

### Pendente
- Sincronização Figma: renomeação de `color/primary/toned`, `-hover`, `-active` para hierarquia aninhada (`toned/default`, `toned/hover`, `toned/active`), remoção de `toned-disabled` e `toned-disabled-fg`, rebinding do Button Toned disabled para `state/disabled/*`. Será executado como tarefa Figma separada.

## [0.5.3]

### Alterado
- ADR-006 marcada como Aceita — Implementada em 0.5.0. Implementação já havia acontecido via ADR-011; fechamento formal em 0.5.3.
- `semantic.size.control.*` e `semantic.typography.control.line-height.*` em `tokens/semantic/light.json` e `dark.json` passam a referenciar tokens `foundation.spacing.*` em vez de valores absolutos. Integridade da cadeia de tokens preservada (foundation → semantic).

### Adicionado
- `component.input.padding-y.{sm,md,lg}` e `component.select.padding-y.{sm,md,lg}` em `tokens/component/input.json` e `select.json`, referenciando `semantic.space.control.padding-y.*`. Gera `--ds-input-padding-y-*` e `--ds-select-padding-y-*` no CSS gerado.

### Corrigido
- `docs/control-sizing.html` — nomes das CSS vars na tabela agora batem com o que o build realmente emite: `--ds-control-font-size-*` e `--ds-control-line-height-*` (em vez de `--ds-typography-control-*`). O transform `name/strip-layer` remove o segmento `typography` do nome gerado.

## [0.5.2]

### Alterado
- ADR-005 marcada como Aceita — Implementada em 0.5.0. Implementação já havia acontecido via ADR-011; fechamento formal em 0.5.2.

### Corrigido
- `scripts/tokens-verify.mjs`: função `canonicalToCssVar` agora espelha exatamente o transform `name/strip-layer` de `build-tokens.mjs`. Remove os 65 falsos positivos (`foundation.typography.font.*` e `foundation.color.overlay.*`) que mascaravam a saúde real da cadeia Figma → JSON → CSS. `npm run verify:tokens` agora reporta 0 warnings, 0 erros.


Consolidação da documentação como fonte única de verdade. Plano em seis fases executadas na branch `consolidation/docs-ground-truth`.

### Alterado
- `package.json` realinhado para `0.5.1` (estava em `1.5.1` sem publicação no npm, divergindo do que o site exibia).
- `README.md` reescrito curto (39 linhas, era 74), aponta pro site como fonte completa.
- `CLAUDE.md` reescrito enxuto (123 linhas, era 498). Mantém só instruções de agente, acessos MCP, convenções, regras operacionais, checklist. Conteúdo duplicado do site foi removido.
- `tokens/component/README.md` substituído por nota correta (era placeholder mentindo "componentes ainda não foram migrados").
- `docs/foundations.html` ganhou breadcrumb e link pra `token-architecture.html` na intro; grade de cards mantida.
- `.github/workflows/deploy.yml` passa a rodar `npm run build:all` (tokens + docs + api + llms + verify) em cada push pra main.
- `scripts/sync-docs.mjs` ampliado para converter MDs em HTML usando `marked`, injetar badge de versão em `index.html` e gerar `docs/decisions/index.html` + 11 HTMLs de ADR.
- ADRs atualizados para refletir o código real: ADR-004/008/009/010/011 marcados como "Aceita — Implementada em 0.5.0" com referência aos commits. ADR-003 ganhou seção "Verificação automatizada". ADR-005/006/007 ganharam Pré-requisitos/Estimativa/Passos concretos.

### Adicionado
- Tag `v0.5.0-pre-consolidation` marcando o estado antes da consolidação.
- `CHANGELOG.md` na raiz como fonte canônica. `docs/changelog.html` passa a ser gerado a partir deste arquivo.
- `CONTRIBUTING.md` na raiz (setup, fluxo PR, convenções, versionamento).
- `docs/brand-principles.md` com template para preenchimento.
- `docs/backlog.md` listando itens fora deste plano (ADR-005/006/007, Storybook, MCP próprio, publicação npm, etc).
- `docs/process-contributing.md`, `docs/process-versioning.md`, `docs/process-releasing.md` cobrindo fluxos.
- `scripts/tokens-verify.mjs`: verifica coerência JSON ↔ CSS (e JSON ↔ Figma quando FIGMA_PAT definido). Três saídas: terminal, `docs/api/tokens-sync.json`, `docs/tokens-sync.html`.
- `.github/workflows/verify-tokens.yml`: roda verify em PR e push, comenta divergências no PR.
- `scripts/build-api.mjs`: gera `docs/api/components.json`, `tokens.json`, `adrs.json`, `foundations.json`.
- `scripts/build-llms.mjs`: gera `docs/llms.txt` (índice) e `docs/llms-full.txt` (conteúdo consolidado, 133 KB) seguindo llmstxt.org.
- Scripts `verify:tokens`, `build:api`, `build:llms`, `build:all` em `package.json`.
- `scripts/archive/` com `extract-tokens.js` e `add-i18n-shell.mjs` preservados e explicados em README.
- Badge de versão em `index.html` (lida do `package.json` pelo build).
- Links `<link rel="alternate">` em `index.html` apontando pros llms.txt.

### Removido
- `style-dictionary.config.js` (legado CommonJS v4, não usado — script ativo é `build-tokens.mjs`).

## [0.5.0] — 2026-04-15

### Adicionado
- Página Token Architecture — diagrama de 3 camadas, walkthrough de cadeia de alias, convenção de nomenclatura, mapeamento entre formatos.
- Página Changelog.
- Páginas Foundation: Motion (7 tokens), Opacity (7 tokens), Z-index (6 tokens).
- Template expandido de componente com 10 novas seções: quando usar, anatomia, boas práticas (faça/não faça), diretrizes de conteúdo, mapeamento de tokens, interação por teclado, tabela WCAG, propriedades Figma, componentes relacionados.
- Todas as 19 páginas de componentes reescritas com o template expandido (+5.000 linhas).
- Blocos faça/não faça com previews ao vivo em todos os componentes.

### Alterado
- Sidebar atualizada em todas as 34 páginas — links novos para Motion, Opacity, Z-index, Token Architecture, Changelog.
- Overview de Foundations: 3 novos cards (Motion, Opacity, Z-index), agora 10 no total.

### Corrigido
- Implementação de focus ring em `accessibility.html` migrada de `box-shadow` para `outline` + `outline-offset` (ADR-005).
- Seção incorreta de focus ring removida de `elevation.html`.
- Contagem de componentes na home corrigida para 19.

## [0.4.0] — 2026-04-14

### Adicionado
- Arquivos JSON de tokens de componente: `button.json`, `input.json`, `textarea.json`, `select.json`, `checkbox.json`, `radio.json`, `toggle.json`, `badge.json`, `alert.json`, `card.json`, `modal.json` (118 tokens no total).
- Variáveis Figma reconciliadas em 4 coleções (Foundation, Brand, Semantic, Component).
- Script de build Style Dictionary (`build-tokens.mjs`) gerando CSS em `css/tokens/generated/`.
- Componente Form Field (`ds-field`) com label, texto auxiliar, indicador de obrigatório, mensagem de erro, contador de caracteres.

### Alterado
- Arquitetura de tokens formalizada: Foundation → Semantic → Component (ADR-001, ADR-005).
- Regra do sufixo `-default` aplicada: todos os tokens `.default` geram `-default` no CSS.
- Focus ring migrado de `box-shadow` para `outline` + `outline-offset` (ADR-005).
- Subcamada Brand formalizada: 2 tokens (primary, secondary), sem estados, trocável por tema.

## [0.3.0] — 2026-03

### Adicionado
- 18 componentes implementados em CSS: Button, Input, Textarea, Select, Checkbox, Radio, Toggle, Badge, Alert, Card, Modal, Tooltip, Tabs, Breadcrumb, Avatar, Divider, Spinner, Skeleton.
- Site de documentação com previews ao vivo, blocos de código, seletor de tema, toggle de modo escuro.
- Páginas Foundation: Colors, Theme Colors, Typography, Spacing, Radius, Elevation, Borders.
- Guias: Theming, Accessibility.
- Três temas: Default (Blue/Purple), Ocean (Cyan/Indigo), Forest (Emerald/Amber).
- Modo light/dark com remapeamento de tokens semânticos.

## [0.2.0] — 2026-02

### Adicionado
- 94 tokens semânticos (camada Theme) com valores Light/Dark.
- Variáveis Figma: 3 coleções (Foundation, Brand, Theme) com suporte a modos.
- 24 text styles: display, heading, body, label, caption, overline, code (Inter + DM Mono).

## [0.1.0] — 2026-01

### Adicionado
- Tokens foundation: 10 paletas de cores (escala 50–950), spacing (20 steps), radius (8 tokens), shadows, opacity, motion, stroke, z-index.
- CSS custom properties (`--ds-*`) para todos os tokens foundation.
- Reset base com carregamento de Inter + DM Mono.
- Estrutura do repositório: `css/`, `docs/`, `js/`.

[Não publicado]: https://github.com/uxindesign/design-system-core/compare/v0.5.0-pre-consolidation...HEAD
[0.5.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.5.0
[0.4.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.4.0
[0.3.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.3.0
[0.2.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.2.0
[0.1.0]: https://github.com/uxindesign/design-system-core/releases/tag/v0.1.0
