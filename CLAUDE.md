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

Ao responder uma pergunta sobre o sistema, vá primeiro nesses arquivos. Não reescreva de memória.

## Acessos

### Figma

Dois MCPs disponíveis, ambos com autenticação ativa:

- **Remoto (`mcp__51ce7e00-…`):** autenticado como UXIN (Pro/Expert). Use para leitura ampla (`get_metadata`, `get_design_context`) e escrita via Plugin API (`use_figma`). `fileKey` do DS: `PRYS2kL7VdC1MtVWfZvuDN`.
- **Desktop Dev Mode (`mcp__Figma__*`):** requer Figma desktop aberto com Dev Mode MCP Server habilitado (Preferências → Enable Dev Mode MCP Server). Bom para ler o node atualmente selecionado com contexto de design.

Antes de chamar `use_figma`, carregar a skill `figma:figma-use`.

### GitHub

MCP (`mcp__github__*`) usa um Personal Access Token fine-grained com escopo restrito ao repo `uxindesign/design-system-core`. Permissões: Contents read+write, Issues read+write, Pull requests read+write, Actions read, Metadata read. Sem `workflow` ou `packages`.

Git local usa SSH (`git@github.com:uxindesign/design-system-core.git`). Zero token em URL.

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

```
tokens/**/*.json         (DTCG — fonte canônica)
      │
      │ build-tokens.mjs (Style Dictionary)
      ▼
css/tokens/generated/*.css  (derivado, marcado AUTO-GENERATED)
      │
      │ @import em design-system.css
      ▼
css/components/*.css     (consome as variáveis)
      │
      ▼
docs/*.html              (documentação e preview)
```

No CI (`.github/workflows/deploy.yml`), `npm run build:tokens` roda em cada push pra main e auto-commita os arquivos gerados.

## Ferramentas disponíveis no repo

```bash
npm run build:tokens   # Foundation/Semantic/Component → CSS gerado
npm run sync:docs      # Regenera inventários em docs/*.md
# (em breve, via plano de consolidação)
npm run verify:tokens  # Compara Figma Variables com tokens/*.json
npm run build:api      # Gera docs/api/*.json
npm run build:llms     # Gera docs/llms.txt e llms-full.txt
npm run build:all      # roda todos os builds acima em ordem
```

## Quando houver dúvida

Consulte, nessa ordem: `docs/decisions/adr-index.md` (decisões tomadas), `docs/system-principles.md` (princípios operacionais), `docs/token-architecture.html` (arquitetura), `docs/backlog.md` (o que ainda está por fazer). Se nenhum desses cobre, abra uma issue no GitHub ou pergunte.
