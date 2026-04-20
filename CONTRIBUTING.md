# Como contribuir

Obrigado pelo interesse em contribuir com o Design System Core. Este documento é curto de propósito. Para contexto profundo, consulte a [documentação](https://uxindesign.github.io/design-system-core/).

## Setup local

```bash
git clone git@github.com:uxindesign/design-system-core.git
cd design-system-core
npm install
npm run build:tokens   # gera css/tokens/generated/*.css
```

Para servir a documentação localmente:

```bash
python3 -m http.server 8000
# abre http://localhost:8000/ (index) ou /docs/button.html
```

## Fluxo de contribuição

1. Abra uma issue descrevendo o que você quer mudar e por quê. Ajuda a ver se a proposta bate com alguma decisão arquitetural existente (ver [ADRs](./docs/decisions/)).
2. Crie um branch a partir de `main`: `git checkout -b feat/nome-curto` ou `fix/nome-curto`.
3. Faça a mudança seguindo as convenções abaixo.
4. Abra um PR. Descreva em português, inclua seção **Summary** e **Test plan**.

## Convenções de commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) em português.

Prefixos aceitos: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`, `ci`.

Exemplo:

```
fix(input): corrigir alinhamento do ícone trailing em sm

- Margin-right ajustado para usar space/control/padding-x
- Teste visual em docs/input.html

Co-Authored-By: ...
```

## Quando abrir um ADR

Abra um ADR em `docs/decisions/ADR-NNN-titulo.md` quando a mudança:

- Altera a arquitetura de tokens (Foundation, Semantic, Component).
- Introduz ou remove uma convenção de naming.
- Muda a relação entre Figma, JSON e CSS.
- Toca em acessibilidade de forma sistêmica.
- Adiciona uma dependência nova.

Para mudanças localizadas (correção de bug, ajuste visual de um componente), não precisa de ADR.

Formato:

```markdown
# ADR-NNN: Título curto
**Data:** AAAA-MM-DD
**Status:** Proposta

## Contexto
## Decisão
## Consequências
## Alternativas consideradas
```

## Pipeline de tokens

Tokens vivem em `tokens/**/*.json` (formato DTCG) e são a fonte de verdade. `build-tokens.mjs` transforma em CSS custom properties prefixadas com `--ds-*` em `css/tokens/generated/`. O CSS dos 18 componentes em `css/components/*.css` consome essas variáveis. **Não edite os arquivos em `css/tokens/generated/` à mão.** Eles são regenerados no CI em cada push pra `main`.

Detalhes completos em [docs/token-architecture.html](./docs/token-architecture.html) e [ADR-001](./docs/decisions/ADR-001-migracao-tokens.md).

## Versionamento

Enquanto não houver release oficial 1.0, o projeto fica na faixa 0.x. Regras:

- **patch** (0.5.0 → 0.5.1): correção, documentação, melhoria interna.
- **minor** (0.5.1 → 0.6.0): novo componente, novo token semântico, breaking change no naming.
- **major** (→ 1.0.0): decisão explícita de release oficial.

Bump no `package.json` sempre acompanha entrada em `CHANGELOG.md`.

## Acessibilidade

WCAG 2.2 AA é piso obrigatório. Qualquer componente novo ou modificação que afete cor, contraste, foco ou navegação por teclado precisa ser validado. Ver [docs/accessibility.html](./docs/accessibility.html) e [ADR-004](./docs/decisions/ADR-004-wcag.md).
