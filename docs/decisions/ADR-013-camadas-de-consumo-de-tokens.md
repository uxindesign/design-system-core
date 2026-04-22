# ADR-013: Camadas de consumo de tokens — Foundation nunca direto em consumidor final

**Data:** 2026-04-22
**Status:** Aceita

## Contexto

O sistema tem três camadas de tokens, hierárquicas:

1. **Foundation** — valores crus, escalas primitivas (`spacing/3 = 0.75rem`, `color/blue/600`, `radius/sm`, `shadow/md`, `duration/fast`). Sem significado funcional, só quantidade.
2. **Semantic** — aliases com intenção de uso (`brand/default`, `content/secondary`, `border/width/default`, `space/inset/md`, `typography/control/font-size/md`).
3. **Component** — tokens específicos de um componente (`button/height/md`, `modal/max-width/lg`).

A regra implícita da arquitetura sempre foi que consumidores finais — CSS de componente, bindings em componentes Figma, docs de uso — operam em cima de Semantic ou Component, não de Foundation direto. Foundation existe pra **abastecer as camadas superiores**, não pra ser consumido direto.

Essa regra **nunca foi codificada explicitamente** e por isso **não é respeitada hoje**. Auditoria em 22/04/2026:

### No Figma (fonte de verdade — ADR-003)

- 51 componentes (COMPONENT/COMPONENT_SET) auditados.
- **3.479 bindings diretos pra Foundation** encontrados. Distribuição:
  - Typography (`font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`): ~2.500 bindings. Causa: Semantic nunca teve aliases pra typography genérica, só `typography/control/*` pra controles single-line.
  - Border width (`border/width/1` em vez de `border/width/default`): ~500 bindings. Causa: negligência — o alias Semantic já existe.
  - Restante: opacity, z-index, shadow, motion, radius — Semantic não tem aliases pra essas categorias.
- Collection **Component** tem 60 variáveis com valores literais raw (ex: `avatar/size/sm = 32`) em vez de aliases. Duplicam valores Foundation sem cadeia rastreável.

### No CSS (derivado)

- Todos os 19 arquivos em `css/components/*.css` consomem Foundation direto em: spacing (`var(--ds-spacing-3)`), radius não-component (`var(--ds-radius-md)`), border-width (`var(--ds-border-width-1)`), typography (`var(--ds-font-size-sm)`, `var(--ds-font-weight-medium)`, `var(--ds-line-height-normal)`), shadow, motion, opacity, z-index.
- Cor é o único domínio limpo: zero uso de `var(--ds-color-*)` raw.

### Por que isso importa

O sistema perdeu propriedades arquiteturais importantes:

1. **Rastreabilidade quebra.** Um valor `0.75rem` no CSS pode vir de `--ds-spacing-3` direto, ou via `--ds-space-inset-md` → `foundation.spacing.3`. O primeiro não carrega intenção; o segundo carrega. Buscar "onde usamos o inset médio" com grep falha no primeiro caso.
2. **Theming fica rígido.** Pra mudar o inset médio global de 12px pra 10px, teria que ir token por token no CSS substituindo `--ds-spacing-3` por `--ds-spacing-2-5` caso a caso. Com Semantic, muda `space/inset/md` num lugar e propaga.
3. **Dois consumidores divergem.** Figma binda `typography/font/weight/medium` direto; CSS usa `var(--ds-font-weight-medium)`. Quando alguém quiser mudar "peso médio" pra `semibold` em contextos de label de controle, precisa fazer hunt manual nos dois lados. Com Semantic `typography/control/font-weight`, muda uma vez.

## Decisão

### A regra

**Foundation só pode ser consumido por outros tokens.** Isso é: o único lugar onde `foundation.*` aparece como referência é dentro de outro `$value: "{foundation.*}"` em arquivos JSON de `tokens/semantic/` ou `tokens/component/`, ou dentro de alias de Variable Figma em coleções Semantic/Component.

**Foundation nunca aparece em consumidor final**, ou seja:

- Nenhum `var(--ds-{foundation-name}-*)` em `css/components/*.css` ou `css/base/*.css`.
- Nenhum binding de componente Figma (fills, strokes, paddings, typography props, etc.) apontando pra variável da coleção Foundation.
- Nenhuma referência em código de docs a token Foundation (exceto nas próprias páginas de `foundations-*.html` que documentam a escala).

### Cadeia permitida

```
Foundation  ─┬─►  Semantic
             └─►  Component    (Component pode referenciar Foundation direto quando
                                não existe abstração Semantic apropriada — ex:
                                component.modal.max-width referenciando foundation.spacing.*,
                                porque "max-width de modal" não é conceito Semantic)

Semantic    ─┬─►  Component
             └─►  Consumidor final   (CSS, Figma binding)

Component   ──►  Consumidor final
```

Consumidor final **só** vê Semantic e Component. Nunca Foundation.

### Exceção explícita — `semantic.control.*` (ADR-006)

Já codificado em ADR-006 princípio 9 e reforçado em ADR-011: a subcategoria `semantic.control.*` (dimensions, typography, padding compartilhados entre Button, Input, Select, Textarea) **só pode ser consumida via tokens de Componente**, nunca direto por CSS. Button, Input etc. definem `button.height.md → {semantic.size.control.md}`; o CSS consome `var(--ds-button-height-md)`, não `var(--ds-size-control-md)`.

Essa exceção não contraria ADR-013 — é uma restrição **adicional**, específica da subcategoria "control".

### Exceção condicional — valores de Componente sem abstração Semantic

Alguns valores são genuinamente específicos de um componente e não têm equivalente abstrato Semantic. Exemplos: `modal.max-width`, `avatar.icon-size`, `textarea.min-height`. Nesses casos, o token de Componente pode referenciar Foundation direto (`component.modal.max-width.md → foundation.spacing.20`) ou carregar valor raw quando não houver ponto na escala Foundation (`modal.max-width.sm = 25rem`). Quando o valor raw for necessário, a entrada no Token Registry (ver abaixo) deve explicitar a decisão.

### Enforcement automatizado

O script `npm run verify:tokens` (`scripts/tokens-verify.mjs`) é estendido com três checks que falham o CI:

1. **CSS foundation leak**: scan de `css/components/*.css` e `css/base/*.css` por `var(--ds-{categorias-foundation}-*)` não aliasado.
2. **Figma foundation leak**: scan do `.figma-snapshot.json` por bindings apontando pra variáveis da collection Foundation dentro de nodes COMPONENT/COMPONENT_SET.
3. **Token Registry completude**: toda variável em `tokens/**/*.json` precisa ter entrada em `tokens/registry.yaml` com campos `sentido`, `contexto`, `decisao` preenchidos.

### Token Registry

Criado como parte desta ADR: arquivo único `tokens/registry.yaml` que cataloga todos os tokens do sistema (Foundation, Semantic, Component) com metadados por entrada:

- `layer` — camada da arquitetura
- `type` — tipo DTCG
- `references` — alias (null se raw)
- `sentido` — o que o token representa
- `escopo` — scopes Figma aplicáveis
- `contexto` — quando usar
- `usos` — auto-calculado (CSS + Figma + outros tokens)
- `decisao` — link pra ADR que motiva a existência do token

Gerado em MD (`docs/token-registry.md`) via `scripts/build-token-registry.mjs`. Integrado ao `sync-tokens-from-figma`: toda variável nova detectada no Figma exige entrada no registry antes do sync finalizar.

## Consequências

### Positivas

- **Rastreabilidade restaurada**: cada uso de valor no CSS ou Figma passa por um token com intenção nomeada. `grep` recupera contexto.
- **Theming escala**: mudanças semânticas (ex: "densidade média quer menos padding") mudam um alias, propagam pra todo sistema.
- **Figma e código convergem**: os dois consomem a mesma camada Semantic, não Foundation direto em caminhos diferentes.
- **CI pega regressão**: qualquer PR que introduzir foundation leak em CSS de componente ou binding Figma falha o verify.
- **Decisões ficam explícitas**: Token Registry obriga preencher `sentido`/`contexto`/`decisao` pra cada token. Tokens sem justificativa documentada não entram no sistema.

### Negativas

- **Trabalho grande de remediação**: ~3.500 bindings Figma pra rebind, 19 CSS de componente pra reescrever, ~20-30 Semantic novas pra criar. Estimado em 17-24h, dividido em 5 PRs.
- **Processo de sync mais rígido**: adicionar variável nova no Figma agora exige entrada no registry com metadados obrigatórios antes do sync completar. Fricção proposital pra forçar intenção.
- **Exceções precisam ser bem delimitadas**: a exceção condicional pra Componente consumir Foundation direto (ex: `modal.max-width`) cria espaço pra abuso. Enforcement tolera Component→Foundation mas exige documentação explícita no Registry.

## Alternativas consideradas

### (a) Aceitar o estado atual e só documentar

Descartada. Rastreabilidade quebrada não é aceitável num sistema que se propõe white-label e teme ter usuários diferentes com necessidades de customização diferente.

### (b) Também proibir Component → Foundation

Descartada. Componentes têm valores inerentemente específicos (max-width de modal, min-height de textarea) sem equivalente abstrato Semantic. Forçar passagem por Semantic aí cria tokens Semantic artificiais que só um componente usa — piora o sistema em vez de melhorar.

### (c) Criar camada adicional entre Foundation e Semantic (ex: "Alias")

Descartada. Três camadas já são o suficiente; adicionar uma quarta complica o modelo mental sem resolver o problema real. O problema é Foundation aparecendo em consumidor final, não a arquitetura de camadas em si.

### (d) Só corrigir no Figma e deixar CSS como está

Descartada. Foundation leak em CSS de componente é equivalente à do Figma — mesma quebra de rastreabilidade e theming. Corrigir um lado e não o outro perpetua a inconsistência.

## Plano de execução

Ver `/Users/marcelldasilva/.claude/plans/groovy-snacking-acorn.md` — Fases 0-7. Divisão em 5 PRs:

- **PR #A**: ADR-013 + Token Registry skeleton + check de completude
- **PR #B**: Audit de reuso Semantic + expansão no Figma + sync parcial
- **PR #C**: Rebind de 3.479 bindings Figma + 60 raw values em Component
- **PR #D**: 7 JSONs de componente novos + 19 CSS atualizados + checks de leak
- **PR #E**: Docs finais + integração registry↔sync

## Referências

- [ADR-001](./ADR-001-migracao-tokens.md) — arquitetura Foundation → Semantic → Component original.
- [ADR-003](./ADR-003-fontes-verdade.md) — Figma como autoridade de valor.
- [ADR-005](./ADR-005-brand-foundation-e-estados-explicitos.md) — brand como foundation, convenção `-default`.
- [ADR-006](./ADR-006-semantic-control-tokens.md) — `semantic.control.*` só via Componente (exceção mantida).
- [ADR-011](./ADR-011-renaming-tokens-semanticos-de-cor.md) — renaming de semantic de cor; princípio 9 é o precedente direto deste ADR.
- `tokens/registry.yaml` — Token Registry (artefato criado por esta ADR).
- `scripts/tokens-verify.mjs` — checks de enforcement.
- `CLAUDE.md` — seção "Hierarquia de verdade" atualizada com referência a este ADR.
- Design systems de referência consultados: IBM Carbon (Token Explorer), GitHub Primer (primer/primitives YAML + CI), Material Design 3, Shopify Polaris, Adobe Spectrum.
