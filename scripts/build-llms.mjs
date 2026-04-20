#!/usr/bin/env node
/**
 * build-llms.mjs — gera docs/llms.txt e docs/llms-full.txt
 *
 * Segue o padrão de llmstxt.org:
 *
 *   docs/llms.txt       — índice estruturado (título, descrição, seções com
 *                         links), leve, legível por humanos e LLMs.
 *   docs/llms-full.txt  — todo o conteúdo textual do DS concatenado em
 *                         markdown puro. Pesado mas completo — permite que
 *                         um LLM consuma o DS inteiro em uma requisição.
 *
 * Conteúdo agregado no llms-full.txt:
 *   - README.md, CONTRIBUTING.md, CLAUDE.md na raiz
 *   - CHANGELOG.md na raiz
 *   - docs/*.md (princípios, schemas, inventários, brand, backlog, process-*)
 *   - docs/decisions/ADR-*.md (todos os ADRs)
 *   - tokens/*.json resumidos (contagens e referência, não valores completos —
 *     a API JSON cobre isso)
 *
 * Páginas HTML-only (componentes, foundations) são referenciadas pela URL
 * no llms.txt mas não têm conteúdo copiado no llms-full.txt (evita dep de
 * turndown; o LLM pode fazer fetch se precisar).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(ROOT, "docs");

const BASE_URL = "https://uxindesign.github.io/design-system-core";

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
function readMd(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

const pkg = readJson(path.join(ROOT, "package.json"));
const now = new Date().toISOString();

// -----------------------------------------------------------------------------
// llms.txt — índice
// -----------------------------------------------------------------------------

const decisionsDir = path.join(DOCS_DIR, "decisions");
const adrFiles = fs.existsSync(decisionsDir)
  ? fs.readdirSync(decisionsDir).filter((f) => /^ADR-\d+/i.test(f) && f.endsWith(".md")).sort()
  : [];
const adrs = adrFiles.map((f) => {
  const content = fs.readFileSync(path.join(decisionsDir, f), "utf8");
  const numMatch = f.match(/ADR-(\d+)/i);
  const titleMatch = content.match(/^#\s+ADR-\d+[:\s]+(.+)$/m);
  const statusMatch = content.match(/\*\*Status:\*\*\s*(.+)/);
  return {
    num: numMatch ? numMatch[1] : "?",
    title: titleMatch ? titleMatch[1].trim() : f,
    status: statusMatch ? statusMatch[1].trim() : "",
    slug: f.replace(/\.md$/, "").toLowerCase(),
    file: f,
  };
});

const COMPONENTS = [
  "button", "input", "textarea", "select", "checkbox", "radio", "toggle",
  "badge", "alert", "card", "modal", "tooltip", "tabs", "breadcrumb",
  "avatar", "divider", "spinner", "skeleton",
];

const FOUNDATIONS = [
  { slug: "colors", name: "Colors" },
  { slug: "theme-colors", name: "Theme Colors" },
  { slug: "typography", name: "Typography" },
  { slug: "spacing", name: "Spacing" },
  { slug: "radius", name: "Radius" },
  { slug: "elevation", name: "Elevation" },
  { slug: "borders", name: "Borders" },
  { slug: "motion", name: "Motion" },
  { slug: "opacity", name: "Opacity" },
  { slug: "zindex", name: "Z-index" },
];

const llmsTxt = `# Design System Core

> Design system white-label em CSS puro com tokens DTCG em JSON, 18 componentes, modos light/dark, três temas (Default, Ocean, Forest). Versão atual: ${pkg.version}. Enquanto não houver release oficial 1.0, o projeto fica em 0.x.

Repositório: https://github.com/uxindesign/design-system-core
Site: ${BASE_URL}/
Arquivo completo para LLMs: ${BASE_URL}/docs/llms-full.txt

## Visão geral

- [Home](${BASE_URL}/index.html): visão rápida, quick start, dark mode, temas.
- [README](https://github.com/uxindesign/design-system-core/blob/main/README.md): instalação e navegação.
- [Token Architecture](${BASE_URL}/docs/token-architecture.html): arquitetura das três camadas (Foundation → Semantic → Component).
- [Theming](${BASE_URL}/docs/theming.html): como trocar tema e modo.
- [Accessibility](${BASE_URL}/docs/accessibility.html): WCAG 2.2 AA aplicada.
- [Design Principles](${BASE_URL}/docs/design-principles.html): princípios do sistema.

## Foundations

${FOUNDATIONS.map((f) => `- [${f.name}](${BASE_URL}/docs/foundations-${f.slug}.html)`).join("\n")}

## Components

${COMPONENTS.map((c) => `- [${c.charAt(0).toUpperCase() + c.slice(1)}](${BASE_URL}/docs/${c}.html)`).join("\n")}

## Decisões arquiteturais (ADRs)

${adrs.map((a) => `- [ADR-${a.num} — ${a.title}](${BASE_URL}/docs/decisions/${a.slug}.html) — ${a.status}`).join("\n")}

## Processo

- [Contributing](${BASE_URL}/docs/process-contributing.html): setup, fluxo de PR, convenções.
- [Versionamento](${BASE_URL}/docs/process-versioning.html): regras de bump 0.x.
- [Releases](${BASE_URL}/docs/process-releasing.html): passo a passo.
- [Changelog](${BASE_URL}/docs/changelog.html): histórico de versões.
- [Backlog](${BASE_URL}/docs/backlog.html): itens fora do escopo imediato.

## Marca

- [Brand Principles](${BASE_URL}/docs/brand-principles.html): missão, princípios, tom de voz, identidade.

## APIs JSON (consumo programático)

- [components.json](${BASE_URL}/docs/api/components.json): 18 componentes com variantes e tokens consumidos.
- [tokens.json](${BASE_URL}/docs/api/tokens.json): camadas Foundation, Semantic (light/dark) e Component.
- [adrs.json](${BASE_URL}/docs/api/adrs.json): índice estruturado das decisões.
- [foundations.json](${BASE_URL}/docs/api/foundations.json): catálogo das 10 foundations.
- [tokens-sync.json](${BASE_URL}/docs/api/tokens-sync.json): estado de coerência Figma ↔ JSON ↔ CSS.

## Figma

- Arquivo: \`PRYS2kL7VdC1MtVWfZvuDN\` (UXIN Team, acesso via convite).

---

Gerado por \`scripts/build-llms.mjs\` em ${now}.
`;

fs.writeFileSync(path.join(DOCS_DIR, "llms.txt"), llmsTxt);
console.log(`✅ docs/llms.txt (${llmsTxt.length} bytes)`);

// -----------------------------------------------------------------------------
// llms-full.txt — conteúdo consolidado
// -----------------------------------------------------------------------------

const sections = [];

function addSection(title, content) {
  if (!content) return;
  sections.push(`\n\n═══════════════════════════════════════════════════════════\n# ${title}\n═══════════════════════════════════════════════════════════\n\n${content.trim()}\n`);
}

// Raiz
addSection("README.md (raiz)", readMd(path.join(ROOT, "README.md")));
addSection("CONTRIBUTING.md (raiz)", readMd(path.join(ROOT, "CONTRIBUTING.md")));
addSection("CLAUDE.md (raiz, guia de agente)", readMd(path.join(ROOT, "CLAUDE.md")));
addSection("CHANGELOG.md (raiz)", readMd(path.join(ROOT, "CHANGELOG.md")));

// docs/*.md (exceto decisions e subpastas)
const docsMds = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md")).sort();
for (const f of docsMds) {
  addSection(`docs/${f}`, readMd(path.join(DOCS_DIR, f)));
}

// docs/decisions/ADR-*.md
addSection("Decisões arquiteturais (ADRs)", "Registros de decisão. Cada ADR descreve contexto, decisão, consequências e alternativas consideradas.");
for (const adr of adrs) {
  addSection(`ADR-${adr.num} — ${adr.title}`, readMd(path.join(decisionsDir, adr.file)));
}

// Resumo de tokens
const tokensMd = `
Total por camada (ver docs/api/tokens.json para valores completos):

- Foundation: ver \`tokens/foundation/\`
- Semantic (light): ver \`tokens/semantic/light.json\`
- Semantic (dark): ver \`tokens/semantic/dark.json\`
- Component: ver \`tokens/component/\`

Formato canônico: DTCG (Design Token Community Group).
Transformação: \`build-tokens.mjs\` usa Style Dictionary pra gerar \`css/tokens/generated/*.css\`.
Consumo no código: \`var(--ds-...)\` em \`css/components/*.css\`.
Verificação automática de coerência Figma ↔ JSON ↔ CSS: \`scripts/tokens-verify.mjs\`.
`;
addSection("Tokens", tokensMd);

// Rodapé
sections.push(`\n\n═══════════════════════════════════════════════════════════\n\nGerado por scripts/build-llms.mjs em ${now}\nVersão: ${pkg.version}\nSite: ${BASE_URL}/\n`);

const llmsFull = `# Design System Core — conteúdo consolidado

> Versão ${pkg.version}. Arquivo destinado a consumo por LLMs que precisem
> do design system inteiro em uma requisição. Inclui README, CONTRIBUTING,
> CLAUDE.md, CHANGELOG, todos os MDs em docs/, todos os ADRs e um resumo
> dos tokens. Páginas HTML-only (componentes, foundations) estão referenciadas
> por URL no cabeçalho e no llms.txt — o conteúdo visual delas não é
> transcrito aqui, pois a fonte canônica textual são os arquivos markdown.

Para o índice estruturado, ver ${BASE_URL}/docs/llms.txt
Para APIs JSON, ver ${BASE_URL}/docs/api/
${sections.join("")}`;

fs.writeFileSync(path.join(DOCS_DIR, "llms-full.txt"), llmsFull);
console.log(`✅ docs/llms-full.txt (${Math.round(llmsFull.length / 1024)} KB)`);

console.log(`\n📁 Gerados em docs/ — versão ${pkg.version}`);
