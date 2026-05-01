# AGENTS.md — instruções canônicas para qualquer agente

Este arquivo é a **fonte canônica** de instruções para qualquer agente IA que opere neste repositório (Claude Code, OpenAI Codex, Gemini CLI, Cursor, Aider, etc.). Os arquivos `CLAUDE.md` e `GEMINI.md` na raiz são pointers finos pra cá com adições específicas de cada agente (MCPs, skills).

Se você é uma IA começando a operar neste repo, leia este arquivo inteiro **antes de qualquer escrita**.

---

## 0. Pré-flight obrigatório (sempre, antes da primeira escrita)

```bash
npm run agent:preflight
```

Mostra branch atual, dirty/clean, idade do snapshot Figma, último resultado de `verify:tokens`, e estado do CHANGELOG. Não bloqueia — informa. Use o output para decidir se precisa atualizar snapshot, fazer pull, ou abrir nova branch.

---

## 1. Forbidden actions (não faça nunca, sem confirmação explícita do usuário)

| Ação | Razão |
|---|---|
| Editar `css/tokens/generated/*.css` à mão | Arquivos derivados — regerados por `npm run build:tokens`. Mudança aqui é perdida no próximo build. |
| Editar `tokens/*.json` à mão para categorias com equivalente Figma (`color`, `dimension`, `radius`, `opacity`, `border-width`, `typography`) | Figma é fonte de verdade dessas categorias (ADR-003). Edição direta cria drift. |
| Hardcodear `#hex`, `rgb()`, valores em `px`, `rem`, em consumidor final (`css/components/*.css`, `css/base/*.css`) | Quebra a cadeia de tokens. Sempre usar `var(--ds-...)`. |
| Consumir tokens Foundation diretamente em CSS de componente | ADR-013: cadeia é Foundation → Semantic → Consumidor. CSS consome Semantic. |
| Usar `ALL_SCOPES` em variáveis Figma | Polui todos os pickers. Usar escopos específicos. |
| Push direto pra `main` sem rodar `npm run verify:tokens` clean | Pode introduzir drift Figma↔JSON ou CSS leak detectável automaticamente. |
| Forçar variables Figma para categorias CSS-only (`motion`, `z`, `shadow`) | ADR-016: essas categorias vivem só em JSON. Criar Figma Variable é cargo culting. |
| Pedir/expor `FIGMA_PAT`, GitHub token, ou outras credenciais em chat | Credenciais ficam em `~/.claude.json`/env. Nunca em arquivo do repo, nunca em mensagem. |
| Bulk update em Figma sem revisão componente-a-componente | Histórico mostra ~60% de retrabalho. Incremental sempre. |
| Editar `.github/workflows/*.yml` via GitHub MCP | API restrita — usar interface web ou git local com SSH. |

**Permitido (não precisa confirmação):** ler arquivos, rodar scripts read-only (`verify:tokens`, `agent:preflight`, `sync:tokens-from-figma` sem `--write`), inspecionar Figma via `get_metadata`/`get_variable_defs`, listar issues/PRs no GitHub.

**Requer confirmação explícita do usuário:** qualquer escrita em arquivos do repo, qualquer escrita no Figma (criar/editar variables, components, text styles), qualquer commit/push/PR, qualquer mudança em config compartilhada.

---

## 2. Visão geral do projeto (1 parágrafo)

Design system white-label em CSS puro com tokens DTCG em JSON, 19 componentes, modos light/dark, paleta brand única customizável. Arquitetura **2-layer** (Foundation + Semantic) — collection Component eliminada em 0.7.0. Versão atual em `package.json`. Documentação pública em `https://uxindesign.github.io/design-system-core/`.

---

## 3. Source of truth por categoria (a regra mais importante)

A regra "Figma é fonte de verdade" **não é universal**. Depende da categoria de token. Confunda isso e você cria drift silencioso ou edita o lugar errado.

| Categoria | Fonte de verdade | Por quê | Como editar |
|---|---|---|---|
| `color.*` | **Figma Variables** | Variable nativa | Editar no Figma → `npm run sync:tokens-from-figma:write` → review diff |
| `dimension.*`, `radius.*`, `opacity.*`, `border.width.*` | **Figma Variables** | Variable nativa | Mesmo fluxo |
| `typography.*` (font family, size, weight) | **Figma Variables + Text Styles** | Text Styles bindam Variables | Mesmo fluxo + atualizar Text Style se necessário |
| `motion.*` (duration, ease) | **JSON** (ADR-016) | Figma não representa — Smart Animate é runtime | Editar `tokens/foundation/motion.json` ou `tokens/semantic/light.json+dark.json` direto → `npm run build:tokens` |
| `z.*` (z-index) | **JSON** (ADR-016) | Figma usa layer order, não z-index | Editar JSON direto → `npm run build:tokens` |
| `shadow.*` | **JSON** (ADR-016) | Figma usa Effect Style, não Variable bindável | Editar JSON direto. Effect Styles `elevation/1..4` no Figma são preview, atualizados manualmente quando JSON muda |

**Antes de editar QUALQUER token**, identifique a categoria. Se está em dúvida, rode preflight e leia `docs/decisions/ADR-016-tokens-sem-equivalencia-no-figma.md`.

### Hierarquia geral quando há divergência entre artefatos

1. **ADR** — autoridade arquitetural. ADR prevalece sobre Figma e código. Mudança que contradiz ADR exige novo ADR antes da implementação.
2. **Figma** (para categorias listadas como Figma-canônicas acima) — autoridade de valor.
3. **JSON DTCG** — consolidação canônica em Git. Para categorias Figma-canônicas, espelha o Figma. Para categorias CSS-only, é a fonte direta.
4. **CSS gerado** (`css/tokens/generated/*.css`) — derivado do JSON. Nunca editar à mão.
5. **CSS de componente/base** — consome `var(--ds-...)` espelhando bindings do Figma equivalente.
6. **Docs** (`docs/*.html`, `docs/*.md`) — descritivo do estado atual. Nunca fonte de verdade.

---

## 4. Workflows comuns

### 4.1 Adicionar um novo token

1. **Identifique a categoria** (tabela na seção 3) — define se é fluxo Figma ou JSON-direto.
2. **Identifique a camada** (Foundation ou Semantic):
   - Foundation: valor primitivo numérico/neutro (`radius/16`, `color/blue/600`, `z/40`).
   - Semantic: alias com intenção (`radius.lg`, `primary.background.default`, `z.tooltip`).
3. **Identifique a localização correta no JSON** — siga a estrutura existente:
   - Foundation: cada categoria tem seu arquivo (`tokens/foundation/{colors,dimension,motion,opacity,radius,shadows,stroke,typography,z-index}.json`). Categoria nova exige novo arquivo + ADR.
   - Semantic: `tokens/semantic/light.json` e `tokens/semantic/dark.json`. Top-level keys atuais: `background`, `border`, `content`, `feedback`, `ghost`, `link`, `motion`, `opacity`, `outline`, `overlay`, `primary`, `radius`, `shadow`, `size`, `space`, `surface`, `toned`, `typography`, `z`. **Cada nova subkey vai em um destes top-levels — NUNCA aninhar fora do top-level apropriado** (ex: `z.tooltip` vai em `semantic.z`, não em `semantic.typography.z`).
4. **Paridade light/dark obrigatória** — toda key em `light.json` precisa estar em `dark.json` (mesmo path, valor pode diferir). Verificado por `verify:tokens`.
5. **Adicione entry em `tokens/registry.json`** com `layer`, `type`, `references`, `sentido`, `escopo`, `contexto`, `decisao`. `verify:tokens` reporta erro se faltar.
6. **Rode `npm run build:tokens`** — gera CSS variables em `css/tokens/generated/*.css`.
7. **Rode `npm run sync:docs`** — regenera `docs/token-schema.md` e inventários.
8. **Rode `npm run verify:tokens`** — confirma 0 erros, 0 warnings.
9. **Adicione entrada em `CHANGELOG.md` `[Não publicado]`**.

### 4.2 Refatorar/refinar um componente CSS

1. **Pré-leitura obrigatória do Figma equivalente:**
   - Liste TODAS as variables bindadas no componente (todos os tamanhos, estados, subnodes — incluindo textos via Text Styles).
   - Compare contra o que o CSS atual consome.
2. **Se houver gap (Figma tem variable que CSS não consome, ou vice-versa)**, reporte ao usuário e proponha alinhamento ANTES de continuar.
3. **Se o Figma usa valor literal sem binding** onde devia haver variable, abra issue separada — Figma precisa ser hardenado primeiro. Não inventar variable só no CSS.
4. **Aplicar mudanças no CSS** consumindo `var(--ds-...)` correspondente. Nunca hardcodar.
5. **Rode `npm run verify:tokens`** — confirma `cssFoundationLeak` zero.
6. **Atualize doc HTML do componente** em `docs/<componente>.html` se a mudança altera anatomia/uso.
7. **CHANGELOG entry** em `[Não publicado]` descrevendo o que mudou e por quê.

### 4.3 Sync Figma → JSON (após mudança visual feita no Figma)

Detalhes em `docs/process-figma-sync.md`. Resumo:

```bash
# 1. Regenerar snapshot via Claude Code session (use_figma chunked dump)
# 2. Dry-run
npm run sync:tokens-from-figma
# 3. Review divergências (VALUE_DRIFT, NEW_IN_FIGMA, MISSING_IN_FIGMA, ALIAS_BROKEN)
# 4. Aplicar
npm run sync:tokens-from-figma:write
# 5. Verificar
npm run verify:tokens
```

CSS_ONLY e BY_DESIGN são informativos (não drift). VALUE_DRIFT/NEW_IN_FIGMA/MISSING_IN_FIGMA exigem ação.

### 4.4 Criar ou editar uma ADR

1. Próximo número sequencial (ver `ls docs/decisions/`).
2. Nome em snake-kebab: `ADR-NNN-titulo-em-pt-br.md`.
3. Frontmatter: Status, Data (YYYY-MM-DD), Substitui/Relaciona (se aplicável).
4. Seções: Contexto, Decisão, Consequências, Alternativas consideradas, Referências.
5. PT-BR. Termos técnicos (focus ring, overlay, padding, radius, etc.) em inglês.
6. **Não escrever HTML manualmente** — `npm run sync:docs` regenera `docs/decisions/adr-NNN-...html` a partir do MD.

---

## 5. Verification protocol (rodar antes de cada commit)

| Comando | O que faz | Bloqueia commit? |
|---|---|---|
| `npm run build:tokens` | Regenera CSS de tokens a partir do JSON | Sim se falha |
| `npm run sync:docs` | Regenera `docs/token-schema.md`, `docs/component-inventory.md`, `docs/adr-index.md`, ADR HTMLs | Sim se falha |
| `npm run verify:tokens` | Valida JSON integrity, JSON↔CSS, CSS leak (ADR-013), Registry completeness, JSON↔Figma drift | **Sim se erro** |
| `git diff` review | Confirmar que diff bate com a intenção da mudança | Manual |

Atalho: `npm run build:all` roda `build:tokens → sync:docs → build:api → build:llms → verify:tokens` em sequência.

**Se algum passo falha, fix e rode tudo de novo. Não commit com `verify:tokens` em erro, exceto se for explicitamente um commit de "WIP" autorizado pelo usuário.**

---

## 6. Convenções de commit, branch e PR

### Commits

[Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) em **português**. Prefixos: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`, `ci`.

```
fix(tokens): recalibrar paletas green e amber para contraste 4.5:1

Corpo opcional explicando o porquê. Bullet list permitido.

Co-Authored-By: <agente> <noreply@...>
```

Co-Author do agente que ajudou. Para Claude Code: `Co-Authored-By: Claude <noreply@anthropic.com>`. Para Codex/Gemini: usar identificador equivalente.

### Branches

- `main` é protegida no GitHub (ruleset). PRs preferíveis a push direto.
- Push direto a `main` é tecnicamente possível mas o owner precisa autorizar caso a caso. Padrão: trabalhar em branch `feat/<nome>` ou `fix/<nome>`, abrir PR.
- Nunca `git push --force` em main. Em branches feature, só com OK do owner.

### Pull requests

Título curto em PT-BR, corpo em markdown:

```
## Summary
- bullet 1
- bullet 2

## Test plan
- [ ] passos pra reproduzir/validar
```

Mudança arquitetural exige ADR anexada ou criada no mesmo PR.

### Idiomas

- Textos do Figma: **PT-BR**.
- Site GitHub Pages: **bilíngue PT-BR + EN** via spans `<span data-lang="pt">…</span><span data-lang="en">…</span>`.
- Termos técnicos universais (label, placeholder, focus ring, padding, radius, overlay) ficam em inglês mesmo em PT-BR.
- ADRs e CHANGELOG: **PT-BR**.

---

## 7. Versionamento e CHANGELOG

- Versão atual em `package.json` e `README.md` (badge). Manter em sincronia.
- Pré-1.0.0: faixa `1.0.0-beta.N` enquanto ainda em fase beta. Tags 0.x são histórico pré-beta.
- CHANGELOG segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). Seção `[Não publicado]` acumula entradas até o owner decidir tagear nova versão.
- **Cada mudança significativa entra em `[Não publicado]`** antes do commit. Significativo = observável pelo consumidor (designer ou dev), ou que muda processo/arquitetura. Refactor interno sem efeito externo não exige entrada.
- Bump de versão (`package.json` + tag git) é decisão do owner. Agente não bumpa sem pedido explícito.

---

## 8. Acessibilidade (WCAG 2.2 AA é obrigatório)

- Contraste 4.5:1 para texto normal, 3:1 para componentes UI e texto large (≥18pt regular ou ≥14pt bold).
- Novo par foreground/background sempre validado contra contraste antes de virar token. Fundo shade 400 ou mais claro pede foreground neutral-900; fundo shade 600+ pede neutral-50.
- Focus ring visível em todos componentes interativos. Token `outline.focus.*`.
- `aria-*` correto em componentes com estado (`aria-invalid`, `aria-describedby`, `aria-expanded`, `aria-current`, etc.).
- Testar via `npm run test:a11y` (axe-core + Playwright).
- Detalhes em `docs/accessibility.html`.

---

## 9. Pipeline (resumo executável)

```
Figma Variables  ──[sync manual]──►  tokens/**/*.json  ──[build-tokens.mjs]──►  css/tokens/generated/*.css
   (categorias)                       (DTCG, fonte canônica em Git)              (derivado, não editar)
   Figma-canônicas
                                                                                          │
                           tokens CSS-only (motion/z/shadow)                              │
                           ──[edição direta no JSON]──────►                               ▼
                                                                                  css/components/*.css
                                                                                  css/base/*.css
                                                                                  (consome var(--ds-*))
                                                                                          │
                                                                                          ▼
                                                                                  docs/*.html
                                                                                  (preview e doc)
```

CI (`.github/workflows/deploy.yml`) roda `build:tokens` em cada push pra main e auto-commita o CSS gerado. Não duplicar esse trabalho em commit local — mas rodar local pra evitar surprise diff.

---

## 10. Glossário

- **DTCG** — Design Tokens Community Group format (W3C draft). Estrutura `{ "$type": "color", "$value": "#fff" }`. JSON canônico.
- **Foundation token** — primitivo numérico/neutro (`radius/16`, `color/blue/600`).
- **Semantic token** — alias com intenção (`radius.lg`, `primary.background.default`).
- **Binding** — variable Figma aplicada em uma propriedade de um node (`fills`, `cornerRadius`, etc.).
- **Drift** — divergência entre fonte de verdade e seu derivado (Figma vs JSON, JSON vs CSS).
- **Leak** — consumidor final consumindo camada errada (CSS de componente referenciando `--ds-color-blue-600` direto em vez de `--ds-primary-background-default`).
- **CSS-only token** — categoria sem equivalência Figma Variable (motion, z-index, shadow). ADR-016.
- **VALUE_DRIFT / NEEDS_SYNC / ALIAS_BROKEN / CSS_ONLY / BY_DESIGN** — categorias do `sync:tokens-from-figma`. Detalhes em `docs/process-figma-sync.md`.
- **Snapshot** — `.figma-snapshot.json` (gitignored), dump local das Variables Figma usado por scripts de sync. Regenerado manualmente via `use_figma`.
- **Text Style** — preset Figma para tipografia (`body/sm`, `label/md`). Internamente binda Variables. Texto de componente recebe Text Style, não bindings prop-a-prop.
- **ADR** — Architecture Decision Record. Vivem em `docs/decisions/ADR-NNN-*.md`.

---

## 11. Quando houver dúvida (ordem de consulta)

1. Este `AGENTS.md` (você está aqui).
2. `docs/decisions/adr-index.md` — decisões arquiteturais ativas.
3. `docs/system-principles.md` — princípios operacionais profundos.
4. `docs/token-architecture.html` — arquitetura visual.
5. `docs/process-figma-sync.md` — fluxo Figma↔JSON.
6. `docs/backlog.md` — o que ainda está por fazer.
7. Issue no GitHub ou perguntar ao owner.

---

## 12. Adições específicas por agente

- **Claude Code**: ver `CLAUDE.md` na raiz — MCPs Figma + GitHub, skills, gotchas da Plugin API.
- **Gemini CLI**: ver `GEMINI.md` na raiz.
- **Codex / outros**: este arquivo (`AGENTS.md`) é completo. Se precisar de algo específico, abrir issue.
