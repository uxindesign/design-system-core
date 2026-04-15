# System principles — Design System Core

> Este documento define como o design system opera como sistema.
> Não é sobre a marca (isso é `brand-principles.md`), nem sobre tokens (isso é `token-schema.md`).
> É sobre as regras que governam o sistema como um todo: como as partes se conectam,
> o que é fonte de verdade pra quê, e o que acontece quando algo desalinha.
>
> Leitura obrigatória antes de propor qualquer mudança estrutural no DS.
> Referências: ADR-001 a ADR-007, token-schema.md, component-inventory.md.

---

## 1. O sistema é uno, com três manifestações

O design system existe em três lugares ao mesmo tempo. Nenhum deles é o DS sozinho — o DS é a soma dos três, sincronizados:

| Manifestação | Papel | O que vive aqui |
|---|---|---|
| Figma | Origem visual. Onde componentes são desenhados, variantes definidas, e decisões visuais testadas. | Componentes, variáveis (Foundation, Brand, Semantic, Component), text styles, páginas de documentação visual. |
| JSON (DTCG) | Convergência canônica. Onde todas as decisões de token se materializam em formato consumível por qualquer plataforma. | Arquivos em `tokens/foundation/`, `tokens/semantic/`, `tokens/component/`. Transformados pelo Style Dictionary em CSS e futuramente em outros formatos. |
| Site de docs | Superfície de consumo. Onde designers e devs consultam uso, variantes, tokens, acessibilidade e exemplos. | Páginas HTML, bilíngues PT-BR + EN. |

Uma mudança em qualquer manifestação que não se propague para as outras duas é uma inconsistência, e inconsistência é defeito.

---

## 2. Hierarquia de verdade

Nem tudo tem a mesma fonte de verdade. Quando houver divergência:

| Tipo de informação | Fonte de verdade | As outras manifestações seguem |
|---|---|---|
| Valores de token (hex, rem, px, alias) | JSON (DTCG) no repo Git | Figma Variables espelham. CSS é gerado. Site documenta. |
| Design visual de componente (layout, proporções, variantes) | Figma | CSS reflete. JSON de component tokens é derivado. Site documenta. |
| Hierarquia e regras de token (naming, camadas, referências) | JSON (DTCG) + ADRs no repo Git | Figma segue a estrutura. Site documenta. |
| Documentação de uso (quando usar, best practices, acessibilidade) | Site de docs | Figma pode ter notas visuais complementares. |
| Decisões arquiteturais | ADRs em `docs/decisions/` | Todos os artefatos implementam. |

Regra operacional: se o Figma mostra `blue.700` pra um token que no JSON aponta pra `blue.600`, o JSON prevalece e o Figma deve ser corrigido. Se o Figma mostra um componente com border-radius de 8px e o CSS renderiza 6px, o Figma prevalece e o CSS deve ser corrigido.

---

## 3. Tokens são transversais

Um token não pertence a um componente. Ele pertence ao sistema.

Quando um token é criado, renomeado, removido ou tem seu valor alterado, o impacto deve ser avaliado contra todos os componentes que o consomem — não apenas o que está em foco no momento.

Na prática:

- Antes de alterar `semantic.color.primary.hover`, verificar quais dos 18 componentes usam esse token (Button, Input, Select, Checkbox, Toggle, Tabs, links, etc.).
- Antes de criar um novo token semântico, verificar se o conceito é genuinamente reutilizável por múltiplos componentes. Se só um componente precisa, é token de componente — não semântico.
- Antes de propor tokens dimensionais (height, padding, font-size), auditar os componentes que compartilham estrutura similar. Exemplo: Button, Input, Select e Textarea compartilham controles interativos com sizes sm/md/lg — tokens dimensionais devem refletir isso (ver ADR-006).

A validação cruzada não é opcional. Tokens analisados isoladamente geram decisões que precisam ser refeitas quando outros componentes entram em escopo.

---

## 4. As três camadas de token têm regras de referência

```
Foundation (valores absolutos: hex, rem, px)
    ↑ referenciada por
Semantic (intenção: aliases pra foundation, modo light/dark)
    ↑ referenciada por
Component (específico: aliases pra semantic)
```

Regras invioláveis (detalhadas em `token-schema.md`):

- Foundation é a única camada com valores absolutos.
- Semantic referencia foundation, nunca valores hardcoded.
- Component referencia semantic. Exceção documentada: estados hover/active que precisam de step específico da paleta podem referenciar foundation diretamente (ver regra 1 do token-schema.md).
- Valores absolutos na camada component são proibidos. Se não existe token semântico adequado e a referência direta a foundation é necessária, ela deve ser justificada com `$description`.
- Novos tokens que criam categorias ou quebram hierarquia exigem ADR.

---

## 5. Sincronização entre manifestações

### Fluxo de mudança por tipo

**Mudança de token (valor, nome, estrutura):**
1. Editar JSON em `tokens/` (fonte canônica)
2. Rodar Style Dictionary → CSS gerado
3. Atualizar Figma Variables via use_figma ou Tokens Studio
4. Validar que componentes CSS e Figma renderizam igual
5. Atualizar site de docs se afeta página de tokens ou componente

**Mudança visual de componente (layout, variante, proporção):**
1. Ajustar no Figma (fonte de verdade visual)
2. Se a mudança implica novo token ou alteração de token → atualizar JSON primeiro, depois CSS
3. Se é só CSS → atualizar CSS pra refletir o Figma
4. Atualizar site de docs

**Nova decisão arquitetural:**
1. Redigir ADR em `docs/decisions/`
2. Implementar em JSON
3. Propagar pra Figma e CSS
4. Atualizar docs internos (token-schema.md, component-inventory.md, CLAUDE.md)
5. Atualizar site de docs se afeta conteúdo público

### Checklist de sincronização

Após qualquer mudança significativa, validar:

- [ ] JSON reflete a decisão
- [ ] CSS gerado pelo Style Dictionary está correto
- [ ] Figma Variables estão alinhadas com JSON (mesmos nomes, mesmos valores por modo)
- [ ] Componentes Figma usam as variáveis corretas (binding, não hardcoded)
- [ ] Componentes CSS renderizam igual ao Figma
- [ ] Site de docs reflete o estado atual
- [ ] ADR existe se a mudança é estrutural

---

## 6. Decisões exigem registro

Se uma decisão arquitetural não está registrada como ADR, ela não foi tomada. Discussões em chat, acordos verbais ou "ficou implícito" não contam.

### O que exige ADR

- Nova camada ou categoria de token
- Mudança em regra de referência entre camadas
- Adoção ou troca de ferramenta no pipeline (Style Dictionary, Tokens Studio, etc.)
- Mudança de convenção de naming
- Exceção a qualquer regra inviolável
- Decisão que afeta todos os componentes (ex: normalização dimensional)

### O que não exige ADR

- Adição de token seguindo convenções existentes
- Novo componente que segue os patterns estabelecidos
- Correção de bug ou inconsistência
- Atualização de documentação

### ADRs existentes

| ADR | Decisão | Status |
|-----|---------|--------|
| 001 | Migração para DTCG + Style Dictionary | Aceita |
| 002 | Stack-agnostic (HTML + CSS + vanilla JS) | Aceita |
| 003 | Git = verdade pra tokens/código, Figma = verdade pra design visual | Aceita |
| 004 | WCAG 2.2 AA como piso de acessibilidade | Aceita |
| 005 | Brand como foundation, `-default` explícito, focus ring outline | Aceita |
| 006 | Semantic control tokens (dimensões compartilhadas entre controles) | Proposta |
| 007 | Toned color system (overlays coloridos) | Proposta |

---

## 7. Princípios operacionais

1. **Agnóstico de stack.** CSS puro, tokens em JSON DTCG, sem acoplamento a framework. A migração futura pra React/Vue/SwiftUI será de implementação, não de redesign.
2. **Git é a fonte de verdade para tokens e código. Figma é a fonte de verdade para design visual.** Quando divergem, cada um prevalece no seu domínio.
3. **JSON é onde decisões convergem.** O Figma origina, o JSON formaliza, o CSS e o site consomem. Sem JSON, a decisão não está implementada.
4. **Consistência acima de velocidade.** Componente mal especificado gera retrabalho em Figma, JSON, CSS e docs. Definir API (variantes, estados, tokens) antes de implementar.
5. **Acessibilidade desde o início.** WCAG 2.2 AA é piso, não teto. Contrastes calculados, focus ring funcional, navegação por teclado e screen reader testados.
6. **Decisão sem registro não existe.** Se não virou ADR, não foi decidido.
7. **Versionamento obrigatório.** Toda alteração significativa: Figma Changelog (node 195:153), Figma Cover (node 185:3), package.json version bump.

---

## 8. Glossário operacional

| Termo | Significado neste DS |
|---|---|
| Manifestação | Uma das três formas do DS: Figma, JSON, site de docs. |
| Fonte canônica | O artefato que prevalece quando há divergência (JSON pra tokens, Figma pra visual). |
| Transversal | Que afeta múltiplos componentes. Tokens são transversais por definição. |
| Binding | Vincular uma variável Figma a uma propriedade de componente (fill, stroke, padding, radius). |
| Hardcoded | Valor absoluto onde deveria haver referência a token. Defeito em qualquer camada exceto foundation. |
| ADR | Architecture Decision Record. Registro formal de decisão em `docs/decisions/`. |
| Pipeline | Fluxo JSON → Style Dictionary → CSS gerado. |
| Control token | Token semântico dimensional compartilhado entre controles interativos (Button, Input, Select, etc.). Ver ADR-006. |
