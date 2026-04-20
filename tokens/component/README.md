# Component tokens

Tokens específicos por componente no formato DTCG. Cada arquivo `.json` mapeia um componente e referencia tokens semânticos da camada `semantic` e dimensionais de `foundation`. É a camada mais baixa da cadeia **Foundation → Semantic → Component**.

O CSS derivado é gerado em `css/tokens/generated/component.css` por `build-tokens.mjs`. Não editar o CSS gerado à mão.

Ver:

- `docs/component-inventory.md` — status de migração de cada componente.
- `docs/token-architecture.html` — visão completa da cadeia de tokens.
- `docs/decisions/ADR-001-migracao-tokens.md` — decisão que estabeleceu essa estrutura.
- `docs/decisions/ADR-006-semantic-control-tokens.md` — regras de tokens compartilhados entre controles interativos.
