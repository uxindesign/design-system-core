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
const pipelineClean = indexCss.includes('generated/') &&
  !indexCss.match(/@import\s+['"](?!.*generated).*\.css/m);

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
  { name: 'Button',      css: 'btn',        token: 'button'   },
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

console.log(`\n📁 Gerado em docs/ — versão ${version}`);
