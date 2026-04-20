#!/usr/bin/env node
/**
 * sync-docs.mjs
 *
 * Gera automaticamente os documentos de knowledge base a partir do estado
 * real do repo. Roda com: npm run sync:docs
 *
 * Saída: docs/token-schema.md
 *         docs/component-inventory.md
 *         docs/adr-index.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'docs');

// ─── Helpers ────────────────────────────────────────────────────────────────

function readJson(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch { return null; }
}

function countTokens(obj) {
  if (!obj || typeof obj !== 'object') return 0;
  let count = 0;
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    if (val && typeof val === 'object' && '$value' in val) count++;
    else if (val && typeof val === 'object') count += countTokens(val);
  }
  return count;
}

function today() {
  return new Date().toISOString().split('T')[0];
}

// ─── Leitura do repo ─────────────────────────────────────────────────────────

const pkg = readJson(path.join(ROOT, 'package.json')) || {};
const version = pkg.version || 'desconhecida';

// Foundation
const foundationDir = path.join(ROOT, 'tokens', 'foundation');
const foundationFiles = fs.existsSync(foundationDir)
  ? fs.readdirSync(foundationDir).filter(f => f.endsWith('.json'))
  : [];
const foundationStats = foundationFiles.map(f => {
  const json = readJson(path.join(foundationDir, f));
  const root = json ? json[Object.keys(json)[0]] : null;
  return { file: f, count: root ? countTokens(root) : 0 };
});
const foundationTotal = foundationStats.reduce((s, f) => s + f.count, 0);

// Semantic
const semanticDir = path.join(ROOT, 'tokens', 'semantic');
const lightJson = readJson(path.join(semanticDir, 'light.json'));
const darkJson = readJson(path.join(semanticDir, 'dark.json'));
const semanticRoot = lightJson ? lightJson[Object.keys(lightJson)[0]] : null;
const semanticTotal = semanticRoot ? countTokens(semanticRoot) : 0;
const semanticCategories = semanticRoot ? Object.keys(semanticRoot) : [];
const darkRoot = darkJson ? darkJson[Object.keys(darkJson)[0]] : null;
const darkTotal = darkRoot ? countTokens(darkRoot) : 0;
const paridadeOk = semanticTotal === darkTotal;

// Component
const componentDir = path.join(ROOT, 'tokens', 'component');
const componentFiles = fs.existsSync(componentDir)
  ? fs.readdirSync(componentDir).filter(f => f.endsWith('.json'))
  : [];
const componentStats = componentFiles.map(f => {
  const json = readJson(path.join(componentDir, f));
  const root = json ? json[Object.keys(json)[0]] : null;
  return { file: f, name: path.basename(f, '.json'), count: root ? countTokens(root) : 0 };
});
const componentTotal = componentStats.reduce((s, f) => s + f.count, 0);

// CSS components
const cssComponentsDir = path.join(ROOT, 'css', 'components');
const cssComponents = fs.existsSync(cssComponentsDir)
  ? fs.readdirSync(cssComponentsDir).filter(f => f.endsWith('.css')).map(f => path.basename(f, '.css'))
  : [];

// ADRs
const decisionsDir = path.join(ROOT, 'docs', 'decisions');
const adrFiles = fs.existsSync(decisionsDir)
  ? fs.readdirSync(decisionsDir).filter(f => f.match(/^ADR-\d+/i) && f.endsWith('.md')).sort()
  : [];
const adrs = adrFiles.map(f => {
  const content = fs.readFileSync(path.join(decisionsDir, f), 'utf8');
  const titleMatch = content.match(/^#\s+ADR-\d+[:\s]+(.+)$/m);
  const statusMatch = content.match(/\*\*Status:\*\*\s*(.+)/);
  const dateMatch = content.match(/\*\*Data:\*\*\s*(.+)/);
  const numMatch = f.match(/ADR-(\d+)/i);
  return {
    file: f,
    num: numMatch ? numMatch[1] : '?',
    title: titleMatch ? titleMatch[1].trim() : f,
    status: statusMatch ? statusMatch[1].trim() : '—',
    date: dateMatch ? dateMatch[1].trim() : '—',
  };
});

// Pipeline check
const generatedDir = path.join(ROOT, 'css', 'tokens', 'generated');
const generatedFiles = fs.existsSync(generatedDir)
  ? fs.readdirSync(generatedDir).filter(f => f.endsWith('.css'))
  : [];
const indexCss = fs.existsSync(path.join(ROOT, 'css', 'tokens', 'index.css'))
  ? fs.readFileSync(path.join(ROOT, 'css', 'tokens', 'index.css'), 'utf8')
  : '';
const nonGeneratedImports = (indexCss.match(/@import\s+['"][^'"]+['"]/g) || []).filter(imp => !imp.includes('generated/') && !imp.includes('themes/'));
const pipelineClean = generatedFiles.length > 0 && nonGeneratedImports.length === 0;

// ─── token-schema.md ─────────────────────────────────────────────────────────

const tokenSchema = `# Token schema — Design System Core

> Gerado automaticamente por \`scripts/sync-docs.mjs\` em ${today()}. Não editar manualmente.
> Para regenerar: \`npm run sync:docs\`
> Versão atual: **${version}**

## Estado atual

| Aspecto | Valor |
|---------|-------|
| Versão | ${version} |
| Formato canônico | JSON (DTCG) em \`tokens/\` |
| CSS gerado | Style Dictionary → \`css/tokens/generated/\` |
| Pipeline | ${pipelineClean ? '✅ index.css importa apenas generated/' : '⚠️ index.css ainda importa legados'} |
| Paridade light/dark | ${paridadeOk ? `✅ ${semanticTotal} tokens em ambos os modos` : `⚠️ light=${semanticTotal}, dark=${darkTotal} — divergência`} |

## Camadas

| Camada | Tokens | Arquivos |
|--------|--------|----------|
| Foundation | **${foundationTotal}** | ${foundationFiles.length} |
| Semantic | **${semanticTotal} × 2 modos** | light.json + dark.json |
| Component | **${componentTotal}** | ${componentFiles.length} |

## Foundation (${foundationTotal} tokens)

| Arquivo | Tokens |
|---------|--------|
${foundationStats.map(f => `| \`${f.file}\` | ${f.count} |`).join('\n')}

## Semantic (${semanticTotal} tokens × 2 modos)

Categorias raiz em light.json:

\`\`\`
${semanticCategories.map(c => `semantic.${c}.*`).join('\n')}
\`\`\`

## Component (${componentTotal} tokens)

| Arquivo | Tokens |
|---------|--------|
${componentStats.map(f => `| \`${f.file}\` | ${f.count} |`).join('\n')}

## Regras invioláveis

1. Component → Semantic, nunca Foundation
2. Semantic → Foundation, nunca hardcoded
3. Foundation é a única camada com valores absolutos
4. Brand é Foundation — 2 tokens, sem estados, ponto de troca por tema
5. Todo token tem \`$type\` conforme DTCG spec
6. Tokens não óbvios têm \`$description\`
7. Tokens de valor zero não são vinculados via setBoundVariable() no Figma
8. Novas categorias ou quebras de hierarquia exigem ADR
9. light.json e dark.json têm exatamente o mesmo conjunto de chaves
10. Todo \`.default\` gera sufixo \`-default\` no CSS
11. Cores puras (#FFF/#000) não são tokens foundation (ADR-010)

## ADRs relacionados

${adrs.map(a => `- **ADR-${a.num}** — ${a.title} (${a.status})`).join('\n')}
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'token-schema.md'), tokenSchema);
console.log(`✅ token-schema.md (Foundation: ${foundationTotal}, Semantic: ${semanticTotal}×2, Component: ${componentTotal})`);

// ─── component-inventory.md ───────────────────────────────────────────────────

const knownComponents = [
  { name: 'Button',      css: 'button',     token: 'button'   },
  { name: 'Input Text',  css: 'input',      token: 'input'    },
  { name: 'Textarea',    css: 'textarea',   token: 'textarea' },
  { name: 'Select',      css: 'select',     token: 'select'   },
  { name: 'Checkbox',    css: 'checkbox',   token: 'checkbox' },
  { name: 'Radio',       css: 'radio',      token: 'radio'    },
  { name: 'Toggle',      css: 'toggle',     token: 'toggle'   },
  { name: 'Badge',       css: 'badge',      token: null       },
  { name: 'Alert',       css: 'alert',      token: null       },
  { name: 'Card',        css: 'card',       token: null       },
  { name: 'Modal',       css: 'modal',      token: 'modal'    },
  { name: 'Tooltip',     css: 'tooltip',    token: null       },
  { name: 'Tabs',        css: 'tabs',       token: null       },
  { name: 'Breadcrumb',  css: 'breadcrumb', token: null       },
  { name: 'Avatar',      css: 'avatar',     token: 'avatar'   },
  { name: 'Divider',     css: 'divider',    token: null       },
  { name: 'Spinner',     css: 'spinner',    token: 'spinner'  },
  { name: 'Skeleton',    css: 'skeleton',   token: 'skeleton' },
];

const rows = knownComponents.map(c => {
  const hasCss = cssComponents.includes(c.css);
  const hasJson = c.token && componentFiles.includes(`${c.token}.json`);
  const count = c.token ? (componentStats.find(s => s.name === c.token)?.count || 0) : 0;
  const jsonStatus = c.token ? (hasJson ? `🟢 (${count})` : '⚠️') : '—';
  return `| ${c.name} | ${hasCss ? '🟢' : '⬜'} | ${jsonStatus} | 🟢 | 🟢 | ⬜ | 🟢 |`;
});

const inventory = `# Inventário de componentes — Design System Core

> Gerado automaticamente por \`scripts/sync-docs.mjs\` em ${today()}. Não editar manualmente.
> Para regenerar: \`npm run sync:docs\`
> Versão atual: **${version}**

## Status geral

| Componente | CSS | Tokens JSON | Figma (visual) | Figma (binding) | Stories | Docs site |
|------------|-----|-------------|-----------------|-----------------|---------|----------|
${rows.join('\n')}

**Legenda:** ⬜ Não iniciado | 🟡 Em progresso | 🟢 Completo | ⚠️ Verificar | 🔴 Precisa revisão

**Nota sobre binding:**
- Button: fills (brand + toned), padding-x/y, height, radius, gap, border-width, focus ring via vars Component/Semantic
- Input Text / Select / Textarea: label usa \`content/default\`, label row com asterisco Required, control tokens
- Checkbox / Radio / Toggle: Content frame vertical (Label + Description + Helper Text), booleans show/hide
- Demais: fills, strokes, radius, spacing via tokens semânticos

## Resumo de tokens

| Coleção | Tokens | Status |
|---------|--------|--------|
| Foundation | ${foundationTotal} | 🟢 |
| Semantic (light) | ${semanticTotal} | 🟢 |
| Semantic (dark) | ${darkTotal} | ${paridadeOk ? '🟢' : '⚠️'} |
| Component | ${componentTotal} | 🟢 |

## Pipeline

| Etapa | Status |
|-------|--------|
| JSON (DTCG) canônico | 🟢 \`tokens/\` |
| Style Dictionary | 🟢 \`build-tokens.mjs\` |
| CSS gerado | ${generatedFiles.length > 0 ? `🟢 ${generatedFiles.length} arquivos em \`css/tokens/generated/\`` : '⚠️ generated/ vazio'} |
| Import pipeline | ${pipelineClean ? '🟢 index.css importa apenas generated/' : '⚠️ ainda importa legados'} |
| Figma binding | 🟢 18 componentes vinculados |

## ADRs

| ADR | Título | Status |
|-----|--------|--------|
${adrs.map(a => `| ADR-${a.num} | ${a.title} | ${a.status} |`).join('\n')}

## Próximos milestones

1. **Storybook** — setup + stories para 18 componentes (vanilla JS)
2. **prefers-reduced-motion** — media query nos componentes com transitions (ADR-004 pendente)
3. **CSS legado** — verificar/remover \`css/tokens/theme-light.css\` (ADR-010 pendente)
4. **Novos componentes** — Dropdown, Combobox, Pagination, Table
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'component-inventory.md'), inventory);
console.log(`✅ component-inventory.md (${knownComponents.length} componentes)`);

// ─── adr-index.md ─────────────────────────────────────────────────────────────

const adrIndex = `# Índice de ADRs — Design System Core

> Gerado automaticamente por \`scripts/sync-docs.mjs\` em ${today()}. Não editar manualmente.
> Para regenerar: \`npm run sync:docs\`

${adrs.length} decisões registradas.

| ADR | Título | Status | Data |
|-----|--------|--------|------|
${adrs.map(a => `| [ADR-${a.num}](decisions/${a.file}) | ${a.title} | ${a.status} | ${a.date} |`).join('\n')}
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'adr-index.md'), adrIndex);
console.log(`✅ adr-index.md (${adrs.length} ADRs)`);

// ─── Geração de HTML a partir de MDs ─────────────────────────────────────────

function slugFromAdrFilename(filename) {
  // ADR-004-wcag.md → adr-004-wcag
  return filename.replace(/\.md$/, '').toLowerCase();
}

function wrapPage({ title, subtitle, content, base, skipSubtitle, layoutHref }) {
  const basePath = base || '../';
  // layoutHref é relativo ao arquivo gerado, não ao ROOT. Padrão: layout.css
  // no mesmo diretório (páginas em docs/). Para docs/decisions/, quem chama
  // passa explicitamente `layoutHref: '../layout.css'`.
  const layoutCss = layoutHref || 'layout.css';
  const subtitleHtml = skipSubtitle
    ? ''
    : `<p class="ds-section__subtitle">${subtitle}</p>`;
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Design System</title>
  <link rel="stylesheet" href="${basePath}css/design-system.css">
  <link rel="stylesheet" href="${layoutCss}">
  <style>
    .ds-md-content h1, .ds-md-content h2, .ds-md-content h3 { margin-top: var(--ds-spacing-8); margin-bottom: var(--ds-spacing-3); color: var(--ds-content-default); }
    .ds-md-content h1 { font-size: var(--ds-font-size-2xl); font-weight: var(--ds-font-weight-semibold); margin-top: 0; }
    .ds-md-content h2 { font-size: var(--ds-font-size-xl); font-weight: var(--ds-font-weight-semibold); border-top: var(--ds-border-width-1) solid var(--ds-border-subtle); padding-top: var(--ds-spacing-6); }
    .ds-md-content h3 { font-size: var(--ds-font-size-lg); font-weight: var(--ds-font-weight-semibold); }
    .ds-md-content p { color: var(--ds-content-secondary); line-height: var(--ds-line-height-relaxed); margin: var(--ds-spacing-3) 0; }
    .ds-md-content ul, .ds-md-content ol { color: var(--ds-content-secondary); line-height: var(--ds-line-height-relaxed); padding-left: var(--ds-spacing-6); margin: var(--ds-spacing-3) 0; }
    .ds-md-content li { margin: var(--ds-spacing-1) 0; }
    .ds-md-content code { font-family: var(--ds-font-family-mono); font-size: 0.9em; background: var(--ds-background-subtle); color: var(--ds-content-link-default); padding: 1px var(--ds-spacing-1); border-radius: var(--ds-radius-sm); }
    .ds-md-content pre { background: var(--ds-color-neutral-900); color: var(--ds-color-neutral-100); padding: var(--ds-spacing-4); border-radius: var(--ds-radius-md); overflow-x: auto; font-size: var(--ds-font-size-sm); margin: var(--ds-spacing-4) 0; }
    .ds-md-content pre code { background: none; color: inherit; padding: 0; }
    .ds-md-content table { width: 100%; border-collapse: collapse; margin: var(--ds-spacing-4) 0; font-size: var(--ds-font-size-sm); }
    .ds-md-content table th, .ds-md-content table td { text-align: left; padding: var(--ds-spacing-2) var(--ds-spacing-3); border-bottom: var(--ds-border-width-1) solid var(--ds-border-default); }
    .ds-md-content table th { font-weight: var(--ds-font-weight-semibold); background: var(--ds-background-subtle); }
    .ds-md-content a { color: var(--ds-content-link-default); }
    .ds-md-content a:hover { color: var(--ds-content-link-hover); }
    .ds-md-content blockquote { border-left: 3px solid var(--ds-border-default); margin: var(--ds-spacing-4) 0; padding: var(--ds-spacing-2) var(--ds-spacing-4); color: var(--ds-content-tertiary); font-style: italic; }
    .ds-md-content hr { border: none; border-top: var(--ds-border-width-1) solid var(--ds-border-subtle); margin: var(--ds-spacing-8) 0; }
    .ds-md-content strong { color: var(--ds-content-default); }
    .ds-md-generated-banner { background: var(--ds-feedback-info-background); color: var(--ds-feedback-info-content-default); padding: var(--ds-spacing-3) var(--ds-spacing-5); border-radius: var(--ds-radius-md); margin-bottom: var(--ds-spacing-6); font-size: var(--ds-font-size-sm); }
  </style>
  <script>
    (function(){var l=localStorage.getItem('ds-lang');if(l)document.documentElement.setAttribute('lang',l)})();
  </script>
</head>
<body>

<header class="ds-site-header">
  <div style="display:flex;align-items:center;gap:var(--ds-spacing-4)">
    <button class="ds-menu-toggle" id="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
    <a href="${basePath}index.html" class="ds-site-header__brand">
      <div class="ds-site-header__logo">DS</div>
      <span class="ds-site-header__title">Design System</span>
    </a>
  </div>
  <div class="ds-site-header__actions">
    <select class="ds-theme-switcher__select" id="lang-switcher" aria-label="Language">
      <option value="pt">PT</option>
      <option value="en">EN</option>
    </select>
    <select class="ds-theme-switcher__select" id="theme-switcher">
      <option value="default">Default (Blue)</option>
      <option value="ocean">Ocean (Cyan)</option>
      <option value="forest">Forest (Emerald)</option>
    </select>
    <button class="ds-btn ds-btn--ghost ds-btn--sm" id="mode-toggle" aria-pressed="false" aria-label="Toggle dark mode"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg> Dark</button>
  </div>
</header>
<div class="ds-sidebar-overlay" id="sidebar-overlay"></div>
<nav class="ds-sidebar" id="sidebar" aria-label="Main navigation"></nav>

<main class="ds-main">
  <div class="ds-section">
    <h1 class="ds-section__title">${title}</h1>
    ${subtitleHtml}
  </div>

  <div class="ds-md-generated-banner">
    Este arquivo é gerado automaticamente por <code>scripts/sync-docs.mjs</code>. Editar a fonte original, não este HTML.
  </div>

  <div class="ds-md-content">
${content}
  </div>
</main>

<script src="${basePath}js/main.js"></script>
</body>
</html>
`;
}

function renderMarkdownFile({ mdPath, outPath, title, subtitle, base, layoutHref }) {
  if (!fs.existsSync(mdPath)) return false;
  const md = fs.readFileSync(mdPath, 'utf8');
  // Se o MD começa com `# Título`, removemos pra não duplicar com o título do layout
  const withoutH1 = md.replace(/^#\s+.+\n+/, '');
  const content = marked.parse(withoutH1);
  const html = wrapPage({ title, subtitle, content, base, layoutHref });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  return true;
}

// 1. ADRs — cada arquivo MD vira um HTML em docs/decisions/
let adrHtmlCount = 0;
for (const adr of adrs) {
  const mdPath = path.join(decisionsDir, adr.file);
  const slug = slugFromAdrFilename(adr.file);
  const outPath = path.join(decisionsDir, `${slug}.html`);
  const ok = renderMarkdownFile({
    mdPath,
    outPath,
    title: `ADR-${adr.num} — ${adr.title}`,
    subtitle: `Status: <strong>${adr.status}</strong> · Data: ${adr.date}`,
    base: '../../',
    layoutHref: '../layout.css',
  });
  if (ok) adrHtmlCount++;
}
console.log(`✅ ${adrHtmlCount} ADRs renderizados em HTML`);

// 2. Index dos ADRs em docs/decisions/index.html
const adrIndexContent = `
<p>${adrs.length} decisões registradas. HTMLs gerados automaticamente a partir dos <code>.md</code> correspondentes.</p>
<table>
<thead><tr><th>ADR</th><th>Título</th><th>Status</th><th>Data</th></tr></thead>
<tbody>
${adrs.map(a => {
  const slug = slugFromAdrFilename(a.file);
  return `<tr><td><a href="${slug}.html">ADR-${a.num}</a></td><td>${a.title}</td><td>${a.status}</td><td>${a.date}</td></tr>`;
}).join('\n')}
</tbody>
</table>
`;
fs.writeFileSync(
  path.join(decisionsDir, 'index.html'),
  wrapPage({ title: 'Decisões arquiteturais', subtitle: 'ADRs (Architecture Decision Records) do design system.', content: adrIndexContent, base: '../../', layoutHref: '../layout.css' })
);
console.log(`✅ docs/decisions/index.html`);

// 3. Páginas derivadas de MDs em docs/
const mdPages = [
  { src: 'CHANGELOG.md', out: 'docs/changelog.html', title: 'Changelog', subtitle: 'Histórico de versões do design system.' },
  { src: 'docs/brand-principles.md', out: 'docs/brand-principles.html', title: 'Princípios da marca', subtitle: 'Missão, princípios, tom de voz e identidade visual.' },
  { src: 'docs/backlog.md', out: 'docs/backlog.html', title: 'Backlog', subtitle: 'Itens fora do escopo imediato mas que devem ser implementados.' },
  { src: 'docs/process-contributing.md', out: 'docs/process-contributing.html', title: 'Como contribuir', subtitle: 'Setup local, fluxo de PR, convenções de commit.' },
  { src: 'docs/process-versioning.md', out: 'docs/process-versioning.html', title: 'Versionamento', subtitle: 'Regras de bump de versão no design system.' },
  { src: 'docs/process-releasing.md', out: 'docs/process-releasing.html', title: 'Releases', subtitle: 'Passo a passo de uma release.' },
];
let mdPageCount = 0;
for (const p of mdPages) {
  const mdPath = path.join(ROOT, p.src);
  const outPath = path.join(ROOT, p.out);
  const ok = renderMarkdownFile({ mdPath, outPath, title: p.title, subtitle: p.subtitle, base: '../', layoutHref: 'layout.css' });
  if (ok) mdPageCount++;
}
console.log(`✅ ${mdPageCount} páginas MD → HTML em docs/`);

// 4. Injeta badge de versão em index.html (placeholder <!-- VERSION -->).
// Regex captura o comentário + o texto "vX.Y.Z" opcional imediatamente
// depois, pra substituir tudo de uma vez — sem isso, rodar sync:docs
// mais de uma vez duplica o número de versão.
const indexPath = path.join(ROOT, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  const updated = indexHtml.replace(
    /<!--\s*VERSION(?::[^-]*)?\s*-->(?:v\d+\.\d+\.\d+)*/g,
    `<!-- VERSION:${version} -->v${version}`
  );
  if (updated !== indexHtml) {
    fs.writeFileSync(indexPath, updated);
    console.log(`✅ badge de versão v${version} atualizada em index.html`);
  }
}

console.log(`\n📁 Gerado em docs/ — versão ${version}`);
