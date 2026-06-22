# Matriz de contrato Figma — Combobox

- Data: 2026-06-22
- Role atual: DS Architect / contrato para Figma Builder
- Arquivo Figma: DS Core `PRYS2kL7VdC1MtVWfZvuDN`
- Pagina alvo: `❖ Combobox` (`8082:64`)
- Component sets alvo existentes: `Combobox` (`8082:471`), `Combobox Option` (`8082:185`)
- Status: pronto para aprovacao do owner; bloqueado antes de qualquer nova escrita no Figma

## Modelos vivos consultados

| Modelo | Node | Uso no contrato |
|---|---|---|
| `Input Text` | page `100:2`, component set `100:165` | Anatomia de form control: root vertical, `Label Row`, `Field`, `Text Frame`, helper/error, properties publicas e shared tokens `field/*` + `form-field/*`. |
| `Select` | page `145:2`, component set `145:129` | Form control com chevron: `Show Right Icon` -> right/chevron icon, value/placeholder separados, focus ring e field sizing. |
| `Menu` | page `7973:2`, component `7975:26` | Superficie popup/elevated: bg, border, width, radius, padding, gap e elevation. |
| `Menu Item` | page `7973:2`, component set `7973:171` | Item de lista: height, padding-x, gap, radius, content/meta/icon states e focus ring dedicado. |
| `Button` | page `66:2`, component set `69:122` | Evidencia adicional de focus ring dedicado com `focus-ring/color/default`, `focus-ring/width` e radius Component. |

## Decisoes bloqueantes aplicadas

- Combobox e um `Form control + popup listbox`, nao Menu Action.
- O root do Combobox segue `Input Text`/`Select`: stack vertical com `Label Row`, `Field`, helper/error.
- `Field` deve usar shared Component tokens `field/*` para superficie/borda/padding-y/radius, como `Input Text` e `Select`; tokens `combobox/field/*` so permanecem se forem aprovados como excecao.
- Focus de form control segue o modelo vivo de `Input Text`/`Select`: `Field` com `field/border-color/focus` e layer dedicado `Focus Ring`. Se o owner quiser foco somente no ring, isso deve ser registrado como excecao explicita contra os modelos vivos.
- Popup segue `Menu` surface, mas com tokens Component `combobox/popup/*` para manter contrato anatomico do Combobox.
- Option segue `Menu Item`, mas com semantica de listbox option e estados `Default`, `Hover`, `Active`, `Selected`, `Disabled`.
- `Listbox Content` nao e property publica enquanto nao houver slot Figma real referenciado; property fake/unreferenced e proibida.
- `Clear Button` e anatomia propria, nao substitui `Chevron Icon` nem concorre com `Show Right Icon`.

## Matriz

| part | targetNode | figmaProperty | componentProperty | componentToken | semanticAlias | modelEvidence | validation | exception |
|---|---|---|---|---|---|---|---|---|
| Combobox set | `8082:471` | variant axes | `Size`, `State`, `Value`, `Open` | n/a | n/a | `Select#145:129`, `Input Text#100:165` | variant axes existem, ordem `Small, Medium, Large`; states e value/open conforme spec | none |
| Combobox root | all `Combobox` variants | `layoutMode`, `itemSpacing` | n/a | `form-field/stack/gap/default` | existing shared Component token | `Input Text#100:3`, `Select#145:45` | todos os roots verticais usam stack gap bindado | none |
| Label Row | `*/Label Row` | `visible`, `itemSpacing` | `Show Label` | `form-field/label-row/gap/default` | existing shared Component token | `Input Text Label Row#3010:942`, `Select Label Row#3010:1044` | `visible` referencia booleano; gap bindado | none |
| Label text | `*/Label Row/Label` | `characters`, text style/fill | `Label` | `form-field/label/color/default` + typography body tokens | existing shared Component tokens | `Select Label#145:46` | `characters` referencia TEXT; fill e typography bindados | none |
| Required mark | `*/Label Row/Required` | `visible`, text style/fill | `Required` only | `form-field/required/color/default` + typography body tokens | existing shared Component tokens | `Input Required#3010:943`, `Select Required#3010:1045` | no public `Required Mark` TEXT property; only boolean visibility | remove existing `↳ Required Mark#8086:0` |
| Placeholder text | `*/Field/Text Frame/Value Text` when `Value=Placeholder` | `characters`, fill, typography | `Placeholder` | `field/placeholder/color/default`; `combobox/text/*` | `semantic.content.subtle`; typography body aliases | `Select Text#145:48`, `Input Text#100:62` | `characters` references placeholder; color uses placeholder token | none |
| Value text | `*/Field/Text Frame/Value Text` when `Value=Filled` | `characters`, fill, typography | `Content` | `field/value/color/default`; `combobox/text/*` | `semantic.content.default`; typography body aliases | `Select Text#145:62`, `Input Text filled` | property name is `Content`, not duplicate public `Value` text prop | rename current `Value#8082:60` to `Content` |
| Helper frame | `*/Helper Text` | `visible` | `Show Helper Text` | n/a | n/a | `Select Helper Text#4893:406` | frame visibility references boolean | none |
| Helper text | `*/Helper Text/Helper Text Content` | `characters`, fill, typography | `Helper Text` | `form-field/helper/color/default` + typography body tokens | existing shared Component tokens | `Select Helper Text Content#145:51` | `characters` references TEXT; no fixed doc text behavior inside component | none |
| Error frame | `*/Error Message` when `State=Error` | layout/gap/padding | n/a | `form-field/error/gap/default`, `form-field/error/padding-top/default` | existing shared Component tokens | `Select Error Message#4730:163` | error frame present only in error variants; gap/padding bindados | remove `Show Error Message` boolean unless owner approves |
| Error text | `*/Error Message/Error Text` | `characters`, fill, typography | `Error Message` | `form-field/error/color/default`, `form-field/error/font-*` | existing shared Component tokens | `Select Error Text#4730:166` | `characters` references error TEXT property | none |
| Field layout | `*/Field` all sizes | `height`, `itemSpacing`, `paddingLeft/Right`, `paddingTop/Bottom` | n/a | `combobox/height/{sm,md,lg}`, `combobox/gap/{sm,md,lg}`, `combobox/padding-x/{sm,md,lg}`, `field/padding-y/{sm,md,lg}` | `semantic.size.{lg,xl,2xl}`, `semantic.space.{xs,sm,md}` | `Input Field#100:59`, `Select Field#145:47` | all fields bind height/gap/padding; sizes match model scale | `combobox/padding-y/*` should not be used unless kept as approved exception |
| Field surface | `*/Field` default/filled/hover/error/disabled/readonly | fills, strokes, strokeWeight, radius | n/a | `field/bg/*`, `field/border-color/*`, `field/border-width`, `field/radius` | existing shared Component tokens | `Select Field#145:47`, `Select error Field#4730:156` | no raw fill/stroke/radius; state maps to shared `field/*` | replace current `combobox/field/*` unless exception |
| Field focus | `*/Field` when `State=Focused` or `Open=True` | strokes.color | n/a | `field/border-color/focus` | existing shared Component token | `Select focused Field#4893:178`, `Input focused Field#4742:396` | focused/open field stroke uses model form-control focus token | if owner rejects, mark explicit exception and use `field/border-color/default` |
| Focus Ring | `*/Field/Focus Ring` focused/open/error | strokes.color, strokeWeight, radius | n/a | `focus-ring/color/default`, `focus-ring/color/error`, `focus-ring/width`, `combobox/focus-ring/radius/default` | `semantic.focus-ring.*`, `semantic.radius.lg` | `Select Focus Ring#4893:177`, `Button Focus Ring#229:28`, `Menu Item Focus Ring#7999:1958` | ring layer exists only where focus/error needs it; no unbound color/width/radius | none |
| Text Frame | `*/Field/Text Frame` | paddingLeft/Right, layout | n/a | `combobox/text-frame/padding-x/default` | `semantic.space.2xs` | `Select Text Frame#2038:26`, `Input Text Frame#216:50` | text frame padding-x bindado; no hardcoded padding | none |
| Left Icon Frame | `*/Field/Icon Frame Left` | `visible`, paddingLeft/Right | `Show Left Icon` | `combobox/icon-frame/padding-x/default` | `semantic.space.2xs` | `Select Icon Frame Left#4512:131` | frame visibility references boolean; padding bindado | none |
| Left Icon | `*/Icon Frame Left/Left Icon` | `mainComponent`, width/height | `Left Icon` | `combobox/icon/size/{sm,md,lg}` | `semantic.size.{xs,sm,md}` | `Select Left Icon#4396:21` | Lucide instance; instance swap referenced; width/height bindados | none |
| Left Icon vector | `*/Left Icon/**/Vector` | strokes.color, strokeWeight | n/a | `combobox/icon/color/{default,disabled}`, `combobox/icon/stroke-width/{sm,md,lg}` | `semantic.icon.color.*`, `semantic.icon.stroke-width.regular.*` | `Input Vector#I216:51;...`, `Select icon model` | vector color/stroke bindados; no glyph/Icon Placeholder | none |
| Clear Button frame | `*/Field/Clear Button` | `visible`, width/height, radius | `Show Clear Button` | `combobox/clear-button/size/{sm,md,lg}`, `combobox/clear-button/radius/default` | `semantic.size.{xs,sm,md}`, `semantic.radius.md` | no exact model; derives from icon-only Button + field adornment | visibility references boolean; size/radius bindados | new anatomy token; requires owner approval |
| Clear Icon | `*/Clear Button/Clear Icon` | `mainComponent`, width/height, vector stroke | `Clear Icon` | `combobox/clear-icon/size/{sm,md,lg}`, `combobox/clear-icon/color/*`, `combobox/clear-icon/stroke-width/*` | `semantic.icon.*` | `Button icon swap`, `Select icon sizing` | Lucide `x`; instance swap referenced; no raw vector styles | new anatomy token; requires owner approval |
| Chevron Frame | `*/Field/Chevron Button` or `Chevron Frame` | paddingLeft/Right | n/a | `combobox/chevron-frame/padding-x/default` | `semantic.space.2xs` | `Select Chevron Frame#4512:132` | chevron frame padding bindado; no duplicate right icon API | none |
| Chevron Icon | `*/Chevron Frame/Chevron Icon` | `mainComponent`, width/height, vector stroke | `Chevron Icon` | `combobox/chevron/size/{sm,md,lg}`, `combobox/chevron/color/{default,disabled}`, `combobox/chevron/stroke-width/{sm,md,lg}` | `semantic.icon.*` | `Select ↳ Right Icon#4429:1964`, `Select Chevron Frame#4512:132` | one chevron swap property; no competing `Right Icon` property | none |
| Popup surface | `*/Popup` when `Open=True` | fills, strokes, strokeWeight, radius, padding, gap, effect style | n/a | `combobox/popup/bg/default`, `border-color/default`, `border-width/default`, `radius/default`, `padding/default`, `gap/default`, `shadow/default` | `semantic.surface.elevated`, `semantic.border.subtle`, `semantic.border.width.default`, `semantic.radius.lg`, `semantic.space.sm`, `semantic.space.2xs`, `semantic.shadow.overlay` | `Menu#7975:26` | popup surface bindado like Menu; elevation style present | none |
| Listbox Content | `*/Popup/Listbox Content` | layout only | no public prop | n/a or same popup gap if separate frame remains | n/a | current target `8082:444`, APG listbox semantics | no unreferenced SLOT/TEXT property; frame is internal structural container | property `Listbox Content#...` must not exist |
| Empty State frame | `*/Listbox Content/Empty State` | layout, padding, radius | n/a | `combobox/option/gap/default`, `combobox/option/padding-x/{md}`, `combobox/option/radius/default` | `semantic.space.xs`, `semantic.space.sm`, `semantic.radius.md` | `Menu Item#7973:59` | empty state aligns to option geometry | none |
| Empty State text | `*/Empty State/Empty State Text` | characters, fill, typography | `Empty State Text` | `combobox/option/content/color/disabled` or `field/placeholder/color/default`; `combobox/text/*` | `semantic.content.disabled` or placeholder semantic | current target `8082:470`; Select placeholder model | property referenced; no raw typography/fill | choose one color semantic before write |
| Option set | `8082:185` | variant axes | `Size`, `State` | n/a | n/a | `Menu Item#7973:171` | variants in size order and states `Default`, `Hover`, `Active`, `Selected`, `Disabled` | none |
| Option root | all `Combobox Option` variants | height, gap, padding-x, radius | n/a | `combobox/option/height/{sm,md,lg}`, `gap/default`, `padding-x/{sm,md,lg}`, `radius/default` | `semantic.size.{lg,xl,2xl}`, `semantic.space.{xs,sm,md}`, `semantic.radius.md` | `Menu Item#7973:59` | no raw geometry on option roots | none |
| Option bg | option root by state | fills.color | n/a | `combobox/option/bg/{default,hover,active,selected,disabled}` | `semantic.surface.raised`, `semantic.outline.background.hover`, selected semantic to approve, disabled surface semantic | `Menu Item#7973:66`, listbox selected requirement | each state has explicit Component token; selected not borrowed from Menu destructive/hover | selected alias needs owner confirmation |
| Option text | `*/Option Text` or `*/Label` | characters, fill, typography | `Option Label` | `combobox/option/content/color/{default,hover,active,selected,disabled}` + `combobox/text/*` | `semantic.content.*`, selected content semantic to approve | `Menu Label#7973:64`, `Select Text#145:48` | TEXT property referenced; color varies by state | selected alias needs owner confirmation |
| Option leading icon | `*/Leading Icon` when present | visible, mainComponent, size, vector styles | `Show Leading Icon` -> `Leading Icon` | `combobox/option/icon/*` | `semantic.icon.*` | `Menu Item` property API | optional icon uses Lucide instance and real references | none |
| Option selected indicator | `*/Check Icon` when `State=Selected` | visible, size, vector styles | no public prop unless swap approved | `combobox/option/check/*` | `semantic.icon.*` or selected content semantic | listbox selected pattern; Lucide check | selected variants show check; non-selected hide it | requires selected visual approval |
| Documentation root | page `8082:64`, root `8082:472` | one root, sections, doc text autoRename, paint bindings | n/a | doc/page tokens from existing pages | existing doc tokens | `Input Text`, `Select`, `Menu` pages | `topLevelCount=1`, loose nodes `0`, docs fixed-height `0`, hardcoded doc paints `0` | none |

## Property API esperada

Combobox:

- `Show Label` -> `Label`
- `Required`
- `Placeholder`
- `Content`
- `Show Left Icon` -> `Left Icon`
- `Show Clear Button` -> `Clear Icon`
- `Chevron Icon`
- `Show Helper Text` -> `Helper Text`
- `Error Message`
- `Empty State Text`
- Variant axes: `Size`, `State`, `Value`, `Open`

Combobox Option:

- `Option Label`
- `Show Leading Icon` -> `Leading Icon`
- Optional selected indicator stays internal unless owner approves swap.
- Variant axes: `Size`, `State`

Public properties to remove or avoid:

- `Listbox Content#...` unless implemented as a real referenced slot.
- `Required Mark#...`; required marker is fixed content controlled by `Required`.
- `Show Error Message`; error visibility follows `State=Error`.
- Generic competing `Right Icon` when `Chevron Icon` already exists.

## Tokens novos ou a normalizar

- `combobox/height/{sm,md,lg}`
- `combobox/gap/{sm,md,lg}`
- `combobox/padding-x/{sm,md,lg}`
- `combobox/text/*`
- `combobox/text-frame/padding-x/default`
- `combobox/icon/*`
- `combobox/icon-frame/padding-x/default`
- `combobox/chevron/*`
- `combobox/chevron-frame/padding-x/default`
- `combobox/clear-button/*`
- `combobox/clear-icon/*`
- `combobox/focus-ring/radius/default`
- `combobox/popup/*`
- `combobox/option/*`

Tokens candidatos a remover/substituir se ja existirem no Figma:

- `combobox/field/*` -> substituir por shared `field/*`, salvo excecao aprovada.
- `combobox/padding-y/*` -> substituir por shared `field/padding-y/*`, salvo excecao aprovada.

## Validacao planejada

- `unmappedRows=0` antes da escrita.
- Builder deve expandir todos os `targetNode` por path para node IDs reais antes de mutar.
- Cada script de escrita deve aplicar apenas linhas desta matriz.
- Pos-escrita deve retornar:
  - linhas executadas / nao executadas / divergentes;
  - component properties sem referencia real: `0`, excluindo eixos variant;
  - fake slot `Listbox Content`: `0`;
  - Component tokens fora da matriz: `0` ou excecao aprovada;
  - Component tokens sem uso real em variants finais: `0` ou justificativa aprovada;
  - focus counts: focused/open/error variants, focus-ring layers, container-stroke-as-focus conforme decisao acima, focus ring sem color/width/radius;
  - Icon Placeholder/glyph: `0`;
  - Lucide icons sem size/color/stroke-width Component token: `0`;
  - hardcoded fills/strokes nos component sets finais: `0`;
  - docs fixed-height: `0`;
  - loose nodes: `0`.

## Bloqueado antes de

- qualquer nova escrita no Figma;
- sync Figma -> repo;
- commit/push/publicacao.

