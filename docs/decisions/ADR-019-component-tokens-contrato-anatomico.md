# ADR-019 — Reintroducao de Component tokens como contrato anatomico

- **Status:** Aceito
- **Data:** 2026-05-11
- **Substitui:** partes de ADR-013 e ADR-015 que eliminavam a camada Component como regra geral
- **Relaciona:** ADR-006, ADR-013, ADR-015, ADR-017

## Contexto

ADR-013 estabilizou a arquitetura em duas camadas, Foundation -> Semantic, depois de uma migracao que eliminou a antiga collection Component. A decisao corrigiu um problema real: muitos tokens Component eram wrappers mecanicos 1:1 sem contrato proprio, por exemplo um token por componente apenas para repetir a mesma cor, motion ou dimensao ja expressa por Semantic.

A auditoria dimensional de controles de formulario mostrou outro problema. Componentes com a mesma variant nominal (`sm`, `md`, `lg`) podem precisar de partes anatomicas com tamanhos diferentes:

- Input e Button usam 32/40/48 como altura visual e area interativa.
- Checkbox e Radio usam 32/40/48 como area interativa, mas o glyph visual e 16/20/24.
- Toggle usa 32/40/48 como area interativa, mas a track visual precisa manter proporcoes proprias.

Sem Component tokens, a implementacao precisa escolher entre duas opcoes ruins:

1. Consumir `semantic.size.xs/sm/md` diretamente em `Checkbox sm/md/lg`, o que parece inconsistente para quem le a documentacao do componente.
2. Criar nomes Semantic artificiais ou especificos demais, como `control.track-width`, tentando esconder uma decisao que na pratica pertence ao Toggle.

Design systems de referencia usam uma camada equivalente a Component tokens para expor contratos anatomicos de componente. Material Web distingue tokens de sistema (`--md-sys-*`) de tokens de componente (`--md-switch-*`, `--md-checkbox-*`). Carbon documenta component tokens como propriedades associadas a um componente especifico. Spectrum modela `component`, `anatomy`, `property`, `variant` e `state` como eixos legitimos de classificacao de tokens.

## Decisao

Reintroduzir a camada **Component** como camada de contrato anatomico e de consumo dos componentes.

Nova cadeia:

```txt
Foundation/Core -> Semantic/System -> Component -> implementacao
```

### Responsabilidades por camada

#### Foundation/Core

Primitivos sem intencao de uso:

```txt
foundation.dimension.40
foundation.color.brand.600
foundation.radius.4
foundation.border.width.1
```

Foundation nao fala de componente, estado de UI ou anatomia.

#### Semantic/System

Decisoes reutilizaveis do sistema:

```txt
semantic.size.xl
semantic.space.md
semantic.primary.background.default
semantic.feedback.error.content.default
semantic.border.control.default
```

Semantic nao deve conter nome de componente. `control` continua permitido quando o conceito e reutilizavel por varios controles, nao quando nomeia uma parte exclusiva de um componente.

#### Component

Contrato publico e anatomico de cada componente:

```txt
component.checkbox.target.height.sm
component.checkbox.box.size.sm
component.checkbox.mark.size.sm
component.toggle.track.width.md
component.toggle.thumb.size.md
component.input.root.height.md
```

Component tokens podem ser alias 1:1 para Semantic quando esse alias documenta uma parte publica e estavel da anatomia do componente. O problema a evitar nao e o alias 1:1; e criar wrapper sem anatomia, sem contrato e sem uso claro.

### Naming

Formato canonico:

```txt
component.<component>.<part>.<property>.<variant-or-state>
```

Campos:

- `<component>`: slug estavel do componente (`button`, `input`, `checkbox`, `radio`, `toggle`).
- `<part>`: anatomia publica (`root`, `target`, `box`, `track`, `thumb`, `icon`, `label`, `helper`, `description`).
- `<property>`: propriedade visual ou estrutural (`height`, `width`, `size`, `background`, `border`, `radius`, `font-size`, `line-height`, `gap`, `inset`).
- `<variant-or-state>`: size, state ou role quando necessario (`sm`, `md`, `lg`, `default`, `hover`, `selected`, `disabled`, `error`).

Exemplos aceites:

```txt
component.checkbox.target.height.sm -> semantic.size.lg
component.checkbox.box.size.sm -> semantic.size.xs
component.input.root.height.sm -> semantic.size.lg
component.toggle.target.height.md -> semantic.size.xl
component.toggle.track.height.md -> semantic.size.md
```

Exemplos rejeitados:

```txt
component.button.primary.background.default -> semantic.primary.background.default
```

Rejeitado quando for apenas duplicacao de uma decisao de role/style ja expressa por Semantic e nao houver contrato anatomico adicional. Se a documentacao do componente precisar expor essa decisao como API de customizacao, o token Component passa a ser aceitavel.

### Regra de consumo

CSS e bindings Figma de componentes devem consumir Component tokens quando existir token Component para aquela anatomia.

Durante a migracao, componentes ainda podem consumir Semantic diretamente ate receberem seus Component tokens. Novos trabalhos estruturais em componentes devem preferir a camada Component.

### Valores especificos de componente

O caminho preferencial e Component -> Semantic -> Foundation.

Se uma dimensao especifica de componente nao existir em Semantic, a decisao deve seguir esta ordem:

1. Verificar se a escala Semantic existente resolve o caso.
2. Criar ou reaproveitar um token Semantic se a decisao for reutilizavel fora do componente.
3. Criar um token Component se a decisao for anatomica e especifica do componente.

Quando a decisao for especifica e ainda assim precisar de valor fora da escala Semantic, a ADR da mudanca deve explicitar se o valor entra em Semantic como novo padrao reutilizavel ou se fica como contrato Component. Essa excecao nao pode ser implicita.

## Consequencias

### Positivas

- A variant de componente (`Checkbox sm`, `Input sm`, `Toggle sm`) deixa de ser confundida com o nome do token global usado internamente.
- A documentacao pode mostrar o contrato do componente sem expor a engenharia interna da escala global.
- Figma, CSS e docs passam a ter uma camada comum para anatomia de componente.
- Evita nomes Semantic falsamente genericos para decisoes exclusivas de componente.

### Negativas

- Reintroduz uma terceira camada e aumenta o numero de tokens.
- Exige migracao incremental de componentes existentes.
- Requer disciplina para nao recriar a antiga camada Component como espelho mecanico de tudo.
- Exige ajustes em build, docs, API, registry e verificacao.

## Plano de migracao

1. Reativar suporte de pipeline a `tokens/component/*.json` e `css/tokens/generated/component.css`.
2. Criar a collection `Component` no Figma, com modo `Default`, quando a sessao Figma estiver autenticada.
3. Pilotar Checkbox, Radio e Toggle porque concentram a diferenca entre area interativa e glyph visual.
4. Documentar a matriz dimensional:

| Componente | Variant | Area interativa | Forma visual |
|---|---:|---:|---:|
| Checkbox/Radio | sm | 32 | 16 |
| Checkbox/Radio | md | 40 | 20 |
| Checkbox/Radio | lg | 48 | 24 |
| Toggle | sm | 32 | 28x16 |
| Toggle | md | 40 | 44x24 |
| Toggle | lg | 48 | 56x32 |

5. Migrar os demais componentes em PRs separados.

## Alternativas consideradas

### Manter apenas Foundation -> Semantic

Descartada. Funciona para tokens globais, mas torna confusa a relacao entre variant de componente e valor absoluto usado por partes internas.

### Criar nomes Semantic especificos de componente

Descartada. `semantic.size.toggle.*` mistura decisao de componente com camada de sistema e torna o Semantic menos previsivel.

### Usar `control.*` para tudo que foge da escala

Descartada como regra geral. `control` deve representar padroes reutilizaveis entre controles. Usar `control.track-width` para uma anatomia que so existe no Toggle cria falsa genericidade.

## Referencias

- Material Web: system tokens e component tokens (`--md-sys-*`, `--md-switch-*`, `--md-checkbox-*`).
- Carbon Design System: component tokens como propriedades associadas a componentes especificos.
- Spectrum Design Data: eixos `component`, `anatomy`, `property`, `variant` e `state`.
