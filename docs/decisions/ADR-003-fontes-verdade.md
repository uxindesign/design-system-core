# ADR-003: Figma como autoridade de design, Git como autoridade de tokens/código

**Data:** 2026-04-14
**Status:** Aceita

## Contexto

O DS é mantido em dois artefatos: Figma (componentes visuais, variables) e Git (CSS, tokens JSON, docs). Precisa haver clareza sobre qual é a fonte de verdade para cada tipo de informação.

## Decisão

- **Git** é a fonte de verdade para: tokens (JSONs), código CSS, documentação, ADRs, package.json
- **Figma** é a fonte de verdade para: design visual de componentes (auto-layout, variantes, properties), documentação visual (pages de componentes)
- **Tokens** são o contrato entre os dois: definidos em JSON no Git, espelhados como Variables no Figma
- **Claude Code + use_figma** é a ferramenta de construção nos dois lados
- Sempre que houver divergência entre Figma e CSS, o Figma prevalece para visual e o Git prevalece para valores de token

## Verificação automatizada

A partir de 0.5.1, a coerência entre Figma Variables e JSONs em `tokens/` passa a ser verificada por script em CI:

- `scripts/tokens-verify.mjs` compara nome e valor resolvido de cada variável Figma contra o JSON correspondente, por modo.
- Workflow `.github/workflows/verify-tokens.yml` roda em pull requests e push para main. Divergências são reportadas em três formatos: terminal, `docs/api/tokens-sync.json`, e página `docs/tokens-sync.html`.
- Na primeira fase, o workflow não falha em divergência (fase de descoberta). Depois de estabilizar, passa a falhar o CI.

## Consequências

- Mudanças de token: editar JSON → rodar Style Dictionary → atualizar Figma via use_figma.
- Mudanças visuais de componente: ajustar no Figma → atualizar CSS para refletir.
- A verificação automatizada torna a regra executável — deixa de depender de disciplina manual.

## Alternativas consideradas

**Git como única fonte:** Descartado. Gerar componentes Figma programaticamente produz resultados estruturalmente fracos para auto-layout e variantes complexas.

**Figma como única fonte:** Descartado. Figma não é sistema de controle de versão e tokens em Variables não são facilmente transformáveis para múltiplas plataformas.
