# Design System Core

[![Versão](https://img.shields.io/badge/vers%C3%A3o-1.0.0--beta.4-blue)](./CHANGELOG.md) [![Licença](https://img.shields.io/badge/licen%C3%A7a-Propriet%C3%A1ria-red)](./LICENSE) [![Documentação](https://img.shields.io/badge/docs-online-brightgreen)](https://uxindesign.github.io/design-system-core/)

Design system white-label em CSS puro, com tokens DTCG em arquitetura 2-layer (Foundation + Semantic), 19 componentes documentados, modos light/dark e paleta brand única customizável.

## Instalação

```html
<link rel="stylesheet" href="https://cdn.example.com/design-system-core@1.0.0-beta.4/css/design-system.css">
```

Uso local:

```bash
git clone git@github.com:uxindesign/design-system-core.git
cd design-system-core
npm install
npm run build:tokens
```

Depois serve o diretório estático (`python3 -m http.server` ou equivalente).

## Documentação completa

Toda a documentação vive em **[uxindesign.github.io/design-system-core](https://uxindesign.github.io/design-system-core/)**. Lá estão: 19 componentes com preview ao vivo, 10 foundations, guias de tema e acessibilidade, 15 ADRs navegáveis, inventário de tokens, e consumo por IA em `/docs/llms.txt`.

Links rápidos:

- [Getting Started](https://uxindesign.github.io/design-system-core/index.html)
- [Token Architecture](https://uxindesign.github.io/design-system-core/docs/token-architecture.html)
- [Component Inventory](./docs/component-inventory.md)
- [Decisões (ADRs)](./docs/decisions/)
- [Changelog](./CHANGELOG.md)
- [Como contribuir](./CONTRIBUTING.md)

## Licença

Licença proprietária. Todos os direitos reservados. Ver [LICENSE](./LICENSE).
