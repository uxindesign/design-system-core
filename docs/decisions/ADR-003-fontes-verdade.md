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

## Consequências

- Mudanças de token: editar JSON → rodar Style Dictionary → atualizar Figma via use_figma
- Mudanças visuais de componente: ajustar no Figma → atualizar CSS para refletir
- O CLAUDE.md no repo é o guia operacional para Claude Code em ambos os lados

## Alternativas consideradas

**Git como única fonte:** Descartado. Gerar componentes Figma programaticamente produz resultados estruturalmente fracos para auto-layout e variantes complexas.

**Figma como única fonte:** Descartado. Figma não é sistema de controle de versão e tokens em Variables não são facilmente transformáveis para múltiplas plataformas.

---

# ADR-004: WCAG 2.2 AA como padrão de acessibilidade

**Data:** 2026-04-14
**Status:** Aceita

## Contexto

O DS precisa de um padrão de acessibilidade definido e operacionalizado em regras concretas.

## Decisão

WCAG 2.2 AA é o piso obrigatório. Regras operacionais:

**Contraste de texto:**
- Fundo shade 400 ou mais claro → foreground neutral-900
- Fundo shade 600 ou mais escuro → foreground branco
- text/on-brand: branco em Light (fundo escuro), neutral-900 em Dark (fundo claro 400-level)
- feedback/info/foreground: neutral-900 em ambos os modos (sky-500/400 são claros demais para branco)

**Focus:**
- Focus ring obrigatório em todo elemento interativo
- Implementação: frame absoluto 2px stroke + 2px gap, contraste ≥ 3:1
- clipsContent = false no componente pai no Figma

**Target size:**
- Mínimo 32px (supera o requisito AA de 24px)
- Large (48px) atende AAA (44px touch)

**Cor como informação:**
- Estados nunca comunicados apenas por cor — sempre acompanhados de indicador visual (focus ring, texto esmaecido, ícone)

**Boas práticas adicionais (além da WCAG):**
- Respeitar prefers-reduced-motion para animações
- aria-label obrigatório em Icon Only buttons
- Semantic HTML (button para ações, a para navegação)
- Tab order lógica em componentes compostos (Modal, Tabs)
- Testar com: axe-core, VoiceOver (macOS), teclado only

## Consequências

- Todo novo token de cor precisa ter contraste verificado antes de commit
- Todo componente precisa de seção de acessibilidade na documentação Figma
- CSS de componentes precisa incluir :focus-visible e prefers-reduced-motion

## Alternativas consideradas

**WCAG 2.2 AAA:** Ideal mas impraticável como padrão obrigatório — exige contraste 7:1 que limita paleta de cores severamente. Alcançar AAA onde possível (target size Large já atende).
