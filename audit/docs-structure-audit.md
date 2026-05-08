# Auditoria estrutural da documentação — Design System Core

**Data:** 2026-05-08
**Escopo:** páginas HTML/MD em `docs/`, README/CONTRIBUTING como entrypoints, e relatórios em `audit/`.
**Objetivo:** separar variações justificadas por tipo de conteúdo de inconsistências estruturais que degradam manutenção, leitura e confiança na documentação.

## Resumo executivo

A documentação tem boa cobertura funcional, mas ainda não tem uma convenção editorial explícita por tipo de página. Isso faz páginas válidas parecerem inconsistentes e permite que divergências pequenas se acumulem: labels de tabela variam, algumas páginas públicas ainda têm placeholders, e há entrypoints com contagens stale.

O problema não é que todas as páginas sejam diferentes. Foundations, Components, Process e System pages têm finalidades diferentes e devem ter estruturas diferentes. O problema é que essa diferença ainda não está documentada como contrato editorial.

## Metodologia

Leituras e verificações feitas nesta sessão:

- `npm run agent:preflight`
- `AGENTS.md`
- inventário de `docs/*.html`
- extração de H1, H2 e cabeçalhos de tabela por página
- busca por placeholders, TODOs e contagens stale
- comparação com práticas públicas de documentação de design systems:
  - Atlassian Design System — tokens como fonte de decisão nomeada, foundations separadas de components, e elevation como surface + shadow.
  - Carbon Design System — páginas de componentes separadas em Usage / Style / Code / Accessibility; style specs usam tabelas por propriedade, token e estrutura.

## Inventário atual

| Tipo | Páginas | Observação |
|---|---:|---|
| Foundation | 11 | Inclui `foundations.html` + 10 páginas específicas |
| Component | 19 | Alinha com o inventário atual de componentes |
| Process | 3 | `process-contributing`, `process-releasing`, `process-versioning` |
| System | 6 | `accessibility`, `brand-principles`, `control-sizing`, `design-principles`, `theming`, `token-architecture` |
| Other | 1 | `backlog` |

## Critério editorial recomendado

### Foundation pages

Finalidade: explicar escalas, decisões de token, valores e uso recomendado. Devem priorizar o contrato de design/tokens antes da API CSS.

Template recomendado:

1. Visão geral
2. Visual reference ou escala
3. Token reference
4. Usage / relações com outros sistemas, quando aplicável
5. Exceções arquiteturais, apenas quando houver ADR
6. JSON (DTCG)

Variações aceitáveis:

- Colors e Theme Colors podem usar swatches em vez de tabelas.
- Typography pode incluir preview de tipos.
- Elevation pode mencionar surface, porque o conceito envolve depth por shadow + surface.
- Motion, Z-index e Shadow/Elevation podem mencionar exceções CSS-only, desde que ligadas à ADR-016.

### Component pages

Finalidade: ensinar uso, anatomia, estados, tokens, API CSS, acessibilidade e relações.

Template recomendado:

1. Quando usar
2. Anatomia, se o componente tiver partes internas nomeáveis
3. Variants / sizes / states / exemplos
4. Boas práticas
5. Diretrizes de conteúdo, quando o componente renderiza texto do usuário ou label
6. Mapeamento de tokens
7. Classes CSS
8. Propriedades Figma, quando houver variants/properties relevantes para handoff
9. Interação por teclado, quando interativo
10. Accessibility
11. Relacionados

Variações aceitáveis:

- `Form Field` é CSS-only por ADR-017; pode ter template reduzido, mas deve declarar isso explicitamente.
- Componentes não interativos, como Avatar, Divider, Skeleton e Spinner, não precisam de interação por teclado.
- Components sem anatomia complexa podem ter "Anatomia" curta ou declarar "estrutura".

### Process pages

Finalidade: instruir fluxo operacional. Devem ter fonte de verdade clara e checklist/ordem de execução.

Template recomendado:

1. Escopo e fonte de verdade
2. Antes de começar
3. Passo a passo
4. Validação
5. Falhas comuns / rollback
6. Links relacionados

### System pages

Finalidade: explicar princípios, arquitetura e normas transversais. Devem ser mais conceituais que componentes, mas ainda verificáveis.

Template recomendado:

1. Princípio ou decisão
2. Impacto em design
3. Impacto em código
4. Tokens/artefatos relacionados
5. Verificação
6. ADRs/processos relacionados

## Achados

### P1 — `brand-principles` é placeholder público

**Evidência:**

- `docs/brand-principles.md` contém placeholders como `[NOME DA MARCA]`, `[Princípio]`, `[hex]`, `[font]`.
- `docs/brand-principles.html` publica os mesmos placeholders.
- `docs/process-versioning.md` já lista `docs/brand-principles.md` preenchido com conteúdo real como pendência de maturidade.

**Impacto:**

Uma página pública com placeholders reduz confiança na documentação. Como o Design System Core ainda é white-label, o caminho correto pode ser transformar a página em template explícito, não preenchê-la com uma marca inventada.

**Recomendação:**

Decidir entre:

- remover a página da navegação pública até existir uma marca;
- ou renomear/reescrever como "Brand principles template", deixando claro que é um template preenchível por cada implementação do Design System Core.

### P1 — Não existe contrato editorial versionado para docs

**Evidência:**

- A estrutura de componentes se repete, mas não está documentada como template.
- A estrutura de Foundations varia por necessidade real, mas sem regra escrita para distinguir variação legítima de drift.
- A correção recente em Elevation mostrou que uma exceção técnica pode vazar para estrutura editorial sem necessidade.

**Impacto:**

Novas páginas ou correções tendem a copiar a página mais próxima, não um padrão editorial. Isso gera inconsistências acumulativas.

**Recomendação:**

Criar `docs/documentation-guidelines.md` ou seção em `CONTRIBUTING.md` com os templates acima e critérios de exceção.

### P2 — Labels de tabelas variam sem critério

**Evidência:**

| Variação | Ocorrências |
|---|---:|
| `Variavel CSS` | 10 páginas |
| `Variável CSS` | 9 páginas |
| `Descricao` | 10 páginas |
| `Descrição` | 9 páginas |
| `Criterio WCAG` | 9 páginas |
| `Critério WCAG` | 8 páginas |
| `Funcao` | 1 página |
| `Referencia` | 5 páginas |

**Impacto:**

Não quebra o sistema, mas enfraquece consistência editorial e polish da documentação pública. Também dificulta automação futura de lint estrutural.

**Recomendação:**

Normalizar labels PT-BR:

- `Variável CSS`
- `Descrição`
- `Critério WCAG`
- `Função`
- `Referência`

### P2 — Component pages têm template recorrente, mas exceções não declaradas

**Evidência:**

Páginas com seção ausente no template base:

| Página | Seções ausentes |
|---|---|
| `avatar.html` | `Anatomia` |
| `divider.html` | `Anatomia` |
| `skeleton.html` | `Anatomia` |
| `spinner.html` | `Anatomia` |
| `form-field.html` | `Boas práticas`, `Mapeamento de tokens`, `Classes CSS` como título padronizado, `Relacionados` |

Algumas ausências são justificáveis; o problema é não haver regra que diga quando é justificável.

**Recomendação:**

Aplicar o template de Component pages e declarar exceções:

- componentes simples podem ter anatomia reduzida;
- componentes não interativos não precisam de keyboard interaction;
- `Form Field` deve declarar o status CSS-only e seguir um template próprio.

### P2 — Entry points têm metadados stale

**Evidência:**

- `README.md` diz "15 ADRs navegáveis", mas o repo tem 18 ADRs.
- `sync:docs` reporta 18 ADRs.

**Impacto:**

Entry points são usados por humanos e agentes. Contagem stale reduz confiança em toda documentação.

**Recomendação:**

Corrigir o README e considerar gerar esse trecho a partir de `docs/api/adrs.json` ou eliminar contagens manuais.

### P2 — Generated vs authored não está óbvio em todas as páginas

**Evidência:**

- `docs/token-schema.md`, `docs/component-inventory.md` e `docs/adr-index.md` declaram que são gerados.
- Páginas HTML manuais não indicam template/fonte.
- ADR HTMLs são gerados a partir de Markdown, mas isso só aparece no workflow.

**Impacto:**

Agentes e contribuidores podem editar arquivos derivados ou copiar estruturas erradas.

**Recomendação:**

Documentar no guia editorial:

- quais páginas são authored;
- quais são generated;
- qual comando regenera cada grupo.

### P3 — Uso do nome do produto precisa ser consistente

**Evidência:**

- README e MDs gerados usam `Design System Core`.
- Header e `<title>` das páginas HTML usam genericamente `Design System`.

**Impacto:**

Enquanto não existir nome de produto final, "Design System Core" deve ser a referência de repo/produto. "Design System" pode funcionar como label visual curta no header, mas não deve substituir o nome em documentação explicativa.

**Recomendação:**

Adotar:

- `Design System Core` em README, docs de processo, páginas conceituais e auditorias.
- `Design System` apenas como label visual curta do shell, se essa for a decisão de UI.
- Não usar "UXIN" como nome do DS; `uxindesign` deve ficar restrito a URL/organização GitHub enquanto não houver nome oficial.

## Sequência recomendada de PRs

### PR A — Guia editorial de documentação

Criar `docs/documentation-guidelines.md` e publicar HTML via `sync:docs` se o script suportar a página.

Conteúdo:

- tipos de página;
- templates por tipo;
- exceções permitidas;
- labels oficiais de tabela;
- regra authored vs generated;
- regra de nome: Design System Core.

### PR B — Correções rápidas sem mudança de conteúdo

Escopo:

- normalizar labels de tabela;
- corrigir README `15 ADRs` → `18 ADRs`;
- corrigir `Funcao`/`Referencia` e variações equivalentes;
- registrar changelog se a documentação publicada mudar.

### PR C — `brand-principles`

Decisão necessária:

- transformar em template explícito;
- ou remover/ocultar até haver marca real;
- ou preencher quando houver decisão de marca.

### PR D — Component docs template pass

Escopo:

- normalizar seções de `Avatar`, `Divider`, `Skeleton`, `Spinner`;
- ajustar `Form Field` para template CSS-only;
- garantir que cada exceção seja explícita.

### PR E — Foundation docs template pass

Escopo:

- alinhar nomenclatura de seções entre foundations;
- garantir que cada página tenha escala/token reference/uso/JSON quando aplicável;
- manter variações legítimas por tipo visual.

## Benchmarks usados

- Atlassian Design System: tokens são tratados como fonte de decisão nomeada; elevation é descrito como surface level + shadow.
- Carbon Design System: componentes separam Usage, Style, Code e Accessibility; specs visuais detalham element/property/token.

Esses benchmarks não devem ser copiados literalmente. Eles sustentam a separação editorial entre Foundations, Components e Process/System pages.

