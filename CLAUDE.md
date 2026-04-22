# CLAUDE.md — instruções de agente

Este arquivo é lido pelo Claude Code (CLI e app) antes de qualquer operação neste repositório. Contém só o que um agente precisa pra operar corretamente: convenções, regras, acessos. A documentação do design system em si vive no site (`docs/*.html`) e não deve ser duplicada aqui.

## Visão geral em uma frase

Design system white-label em CSS puro com tokens DTCG em JSON, 18 componentes, modos light/dark, três temas (Default, Ocean, Forest). Versionamento 0.x enquanto não houver release oficial 1.0.

## Fontes de verdade

| Tipo de informação | Onde vive |
|---|---|
| Tokens (foundation/semantic/component) | `tokens/**/*.json` (DTCG). CSS em `css/tokens/generated/` é derivado. |
| Código dos componentes | `css/components/*.css`. |
| Decisões arquitetônicas | `docs/decisions/ADR-*.md`. Índice gerado em `docs/adr-index.md`. |
| Princípios de marca | `docs/brand-principles.md`. |
| Princípios do sistema | `docs/system-principles.md`. |
| Arquitetura de tokens | `docs/token-architecture.html`. |
| Tipografia, cores, spacing | `docs/foundations-*.html`. |
| Inventário de componentes | `docs/component-inventory.md`. |
| Temas e dark mode | `docs/theming.html`. |
| Acessibilidade | `docs/accessibility.html`. |
| Versões e histórico | `CHANGELOG.md` na raiz (fonte), `docs/changelog.html` (gerado). |
| Como contribuir | `CONTRIBUTING.md`. |
| Backlog | `docs/backlog.md`. |
| Processo do sync Figma→JSON | `docs/process-figma-sync.md`. |

Ao responder uma pergunta sobre o sistema, vá primeiro nesses arquivos. Não reescreva de memória.

### Hierarquia de verdade

Quando há divergência entre artefatos, resolve-se por tipo de informação:

1. **ADRs em `docs/decisions/`** — autoridade arquitetural. Regras de camada, naming, dependências, convenções. ADR prevalece sobre qualquer outro artefato. Mudança que contradiz ADR exige **novo ADR** (ou revisão do existente) antes da implementação.
2. **Figma Variables** — autoridade de **valor visual** (hex, alpha, qual shade foi escolhida, qual variante). Designer decide no Figma.
3. **`tokens/**/*.json`** — consolidação canônica em Git (DTCG). Espelha o Figma em valor; espelha os ADRs em arquitetura. É o ponto de consumo pro pipeline.
4. **`css/tokens/generated/*.css`** — derivado do JSON. Nunca editar à mão.
5. **`docs/*.html`, `docs/*.md`** — descritivo do estado atual. Nunca fonte de verdade.

Regra operacional: arquitetura está acima de valor. Figma pode decidir "brand.hover é blue-800 em vez de blue-700" (valor), mas não pode criar `semantic.color.primary.foreground` se ADR-011 definiu que semantic de cor usa `brand.content.contrast` (arquitetura).

### Camadas de consumo de tokens (ADR-013)

**Foundation nunca aparece em consumidor final.** Consumidor final = `css/components/*.css`, `css/base/*.css`, bindings em componentes Figma, exemplos em docs de uso. Só tokens Semantic ou Component podem ser consumidos lá.

Cadeia permitida:

```
Foundation  ─┬─►  Semantic
             └─►  Component    (quando não existe abstração Semantic apropriada)
Semantic    ─┬─►  Component
             └─►  Consumidor final
Component   ──►  Consumidor final
```

Exceções registradas:
- `semantic.control.*` só via Component (ADR-006 princípio 9).
- Componente pode consumir Foundation direto quando não há equivalente Semantic (ex: `component.modal.max-width`); exige entrada explícita no Token Registry justificando.

Enforcement em CI via `npm run verify:tokens`: CSS leak, Figma leak, Registry completude. Ver [ADR-013](docs/decisions/ADR-013-camadas-de-consumo-de-tokens.md) e `tokens/registry.yaml`.

## Acessos

### Figma

Dois MCPs disponíveis, ambos com autenticação ativa:

- **Remoto (`mcp__51ce7e00-…`):** autenticado como UXIN (Pro/Expert). Use para leitura ampla (`get_metadata`, `get_design_context`) e escrita via Plugin API (`use_figma`). `fileKey` do DS: `PRYS2kL7VdC1MtVWfZvuDN`.
- **Desktop Dev Mode (`mcp__Figma__*`):** requer Figma desktop aberto com Dev Mode MCP Server habilitado (Preferências → Enable Dev Mode MCP Server). Bom para ler o node atualmente selecionado com contexto de design.

Antes de chamar `use_figma`, carregar a skill `figma:figma-use`.

### GitHub

MCP (`mcp__github__*`) usa um Personal Access Token fine-grained com escopo restrito ao repo `uxindesign/design-system-core`. Permissões: Contents read+write, Issues read+write, Pull requests read+write, Actions read, Metadata read. Sem `workflow` ou `packages`.

Git local usa SSH (`git@github.com:uxindesign/design-system-core.git`). Zero token em URL.

**Limitações conhecidas do GitHub MCP:**

- `create_or_update_file` exige SHA fresco do arquivo. Rodar `get_file_contents` imediatamente antes de cada update — SHAs stale causam falha silenciosa.
- `push_files` com payload grande estoura timeout. Commitar arquivos individualmente (um tool call por arquivo) quando o commit for grande.
- MCP **não consegue escrever** em `.github/workflows/` (restrição de API, independente do escopo do token). Usar interface web ou terminal com SSH pra arquivos de workflow.
- `web_fetch` em `github.com/tree/…` é bloqueado por robots.txt; `raw.githubusercontent.com` é bloqueado pelo proxy. Pra ler arquivos do repo via agente, usar a própria API MCP (`get_file_contents`) ou as ferramentas locais (Read/Bash).

## Convenções

### Commits

Conventional Commits em português. Prefixos aceitos: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`, `ci`. Exemplo:

```
fix(tokens): recalibrar paletas green e amber para contraste 4.5:1

- Novos valores em colors.json
- Regenera CSS via build-tokens.mjs
- Atualiza Figma Variables

Co-Authored-By: ...
```

### Pull requests

Título curto em português, corpo em markdown. Seções obrigatórias: **Summary**, **Test plan**. Quando a mudança afeta decisões arquiteturais, anexar ou criar ADR em `docs/decisions/`.

### Idiomas

- Textos do Figma: sempre em **PT-BR**.
- Site: **bilíngue PT-BR + EN** via spans `<span data-lang="pt">…</span><span data-lang="en">…</span>` controlados por `[data-lang]` no `<html>`.
- Termos técnicos universais (label, placeholder, focus ring, padding, radius) podem ficar em inglês mesmo no PT-BR.

## Regras operacionais (não inferíveis dos arquivos)

1. **Nunca hardcodear hex, rgb ou px em CSS de componente.** Sempre referenciar `var(--ds-…)`. O pipeline `tokens/*.json → build-tokens.mjs → css/tokens/generated/*.css` é a única fonte.
2. **Depois de editar um JSON em `tokens/`**, rodar `npm run build:tokens`. O CI (deploy.yml) também regenera no push pra main, mas rodar localmente evita commits com CSS desatualizado.
3. **Nunca usar `ALL_SCOPES`** em variáveis Figma. Polui todos os pickers. Usar escopos específicos (`FRAME_FILL`, `SHAPE_FILL`, `TEXT_FILL`, `STROKE_COLOR`, `GAP`, `CORNER_RADIUS`, `STROKE_FLOAT` conforme o token).
4. **Tokens Foundation e Brand ficam ocultos dos pickers** (`hiddenFromPublishing: true`). Designers só veem tokens do Theme/Semantic.
5. **Contraste WCAG 2.2 AA (4.5:1 texto normal, 3:1 UI)** é obrigatório em qualquer novo par foreground/background. Checar com `docs/accessibility.html` aberto ao lado. Fundo shade 400 ou mais claro pede foreground neutral-900; fundo shade 600+ pede foreground neutral-50.
6. **Valores zero não viram tokens aplicados.** `spacing/0`, `radius/0`, `shadow-none` existem como referência em Foundation mas nunca devem ser vinculados a propriedades (use literal `0`).
7. **Cada mudança significativa entra em `CHANGELOG.md`.** Na raiz, formato Keep a Changelog, seção `[Não publicado]` ganha a entrada antes do commit.

## Checklist de pré-commit

- [ ] `npm run build:tokens` roda sem erro e o git fica limpo (ou com diff esperado em `css/tokens/generated/`).
- [ ] `npm run sync:docs` atualiza `docs/adr-index.md`, `docs/token-schema.md`, `docs/component-inventory.md`.
- [ ] Contraste validado se tokens de cor foram tocados.
- [ ] `CHANGELOG.md` ganhou entrada em `[Não publicado]` se há mudança observável pelo consumidor.
- [ ] Se uma decisão arquitetural mudou, tem ADR novo ou atualizado em `docs/decisions/`.

## Como a pipeline funciona

Direção canônica (ADR-003 revisada em 0.5.8): **Figma Variables são a fonte de verdade de valores de token**. Git/`tokens/**/*.json` é a consolidação derivada.

```
Figma Variables              (autoridade — designer é o autor)
      │
      │ sync Figma → JSON    (em desenvolvimento — ver backlog)
      ▼
tokens/**/*.json             (DTCG — consolidação canônica em Git)
      │
      │ build-tokens.mjs     (Style Dictionary — automático no CI)
      ▼
css/tokens/generated/*.css   (derivado, marcado AUTO-GENERATED)
      │
      │ @import em design-system.css
      ▼
css/components/*.css         (consome as variáveis)
      │
      ▼
docs/*.html                  (documentação e preview)
```

Regras de ouro:

- **Nunca editar `tokens/*.json` à mão.** Alterações devem vir do Figma.
- **Sempre editar Figma Variables primeiro.** Designer decide, propagação pro JSON acontece depois.
- **Sync Figma → JSON** acontece via MCP + script custom, disparado manualmente numa sessão Claude Code:
  1. Agente executa `use_figma` em chunks pra dumpar as ~489 Variables em `.figma-snapshot.json` (gitignored).
  2. `npm run sync:tokens-from-figma` (dry-run) reporta divergências em 4 categorias: VALUE_DRIFT, NEW_IN_FIGMA, MISSING_IN_FIGMA, ALIAS_BROKEN.
  3. `npm run sync:tokens-from-figma:write` aplica VALUE_DRIFT nos JSONs e roda `build:tokens` + `sync:docs`.
  4. Review `git diff`, abrir PR.

  Detalhes passo-a-passo em `docs/process-figma-sync.md`. Automação em CI depende de Enterprise ou plugin custom — ver `docs/backlog.md`.

No CI (`.github/workflows/deploy.yml`), `npm run build:tokens` roda em cada push pra main e auto-commita os arquivos CSS gerados.

## Ferramentas disponíveis no repo

```bash
npm run build:tokens                   # Foundation/Semantic/Component → CSS gerado
npm run sync:docs                      # Regenera inventários em docs/*.md
npm run verify:tokens                  # Valida coerência Figma ↔ JSON ↔ CSS (Figma check depende de FIGMA_PAT)
npm run build:api                      # Gera docs/api/*.json
npm run build:llms                     # Gera docs/llms.txt e llms-full.txt
npm run build:all                      # roda build:tokens → sync:docs → build:api → build:llms → verify:tokens
npm run sync:tokens-from-figma         # Compara .figma-snapshot.json ↔ tokens/ (dry-run, ver process-figma-sync.md)
npm run sync:tokens-from-figma:write   # Aplica VALUE_DRIFT e regenera CSS
```

## Protocolo de trabalho com agente

Regras que o agente segue ao operar neste repo. São convenções operacionais, não técnicas — mas importantes pra não quebrar confiança.

1. **Aprovação estrita por ação.** Nenhuma escrita em Figma ou repo sem sign-off explícito do usuário. Auditorias e leituras são livres; mudanças exigem OK prévio. Uma ação por vez quando há risco ou ambiguidade.
2. **Plano antes de agir.** Apresentar escopo completo da proposta antes de executar qualquer parte. Não misturar "trabalho feito" com "trabalho pendente" no mesmo output — fica confuso o que foi aplicado.
3. **Validar antes de afirmar.** Toda afirmação técnica sobre estado do repo ou do Figma é verificada contra o arquivo/variável real. Não inferir de documentação — docs podem estar desatualizadas. Documentação é hipótese; arquivo/API é fato.
4. **Incremental, não bulk.** Mudanças em Figma ou tokens são escopadas e aprovadas componente por componente. Bulk update sem revisão é refeito 60% das vezes.
5. **Tom técnico e direto.** Sem bajulação, sem suavização, sem hedging em fatos técnicos. Discordar quando discordar, com evidência. Trabalho prévio é respeitado e incrementado, não descartado.

## Figma Plugin API — armadilhas operacionais

Coisas que falharam silenciosamente em sessões passadas e que o agente precisa ter em conta ao chamar `use_figma`. Detalhes de chunking estão em `docs/process-figma-sync.md`.

- **Ler bound variable de um paint**: usar `paint.boundVariables.color.id`, não `node.boundVariables` de nível superior. Paint carrega seu próprio binding.
- **Trocar bound variable de `fontSize`** em text node: primeiro setar `node.fontSize` pra valor numérico raw (isso limpa bindings existentes), depois chamar `setBoundVariable` com o novo token. Exige `await figma.loadFontAsync()` antes. Pré-carregar fonts via `Promise.all(loadFontAsync)` se for loop.
- **`setBoundVariable` pode empilhar** se a propriedade já tinha binding anterior. Limpar antes: setar pra `null` ou pra valor raw, depois rebind.
- **Truncamento de output ~20KB**: dumps grandes de Variables quebram em chunks via slice(start, end) e agregados off-plugin. Ver `scripts/sync-tokens-from-figma.mjs` e `docs/process-figma-sync.md`.
- **`hiddenFromPublishing = true`** após `createVariable` falha com "Node not found". Criar primeiro, setar a flag em chamada separada — ou via UI do Figma depois. Documentado nos commits do PR #17 (0.5.10) e PR #18 (0.5.11).
- **`strokeWeight` bindado vive em 4 campos individuais, não no top-level.** `node.setBoundVariable('strokeWeight', var)` retorna sem erro mas não aplica o binding — e `node.boundVariables.strokeWeight` é sempre `undefined`. O binding real fica em `strokeTopWeight/strokeRightWeight/strokeBottomWeight/strokeLeftWeight`. Auditar cobertura por esses 4 campos; bindar aplicando em todos. Mesma coisa pra `cornerRadius` → `topLeftRadius/topRightRadius/bottomLeftRadius/bottomRightRadius`. Use os helpers em `scripts/lib/figma-node-audit.mjs` (copiar inline em `use_figma` funciona). Descoberto em PR #31 (0.5.17) bindando 78 Focus Rings em Button + Toggle.

## Quando houver dúvida

Consulte, nessa ordem: `docs/decisions/adr-index.md` (decisões tomadas), `docs/system-principles.md` (princípios operacionais), `docs/token-architecture.html` (arquitetura), `docs/backlog.md` (o que ainda está por fazer). Se nenhum desses cobre, abra uma issue no GitHub ou pergunte.
