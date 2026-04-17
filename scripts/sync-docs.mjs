#!/usr/bin/env node
/**
 * sync-docs.mjs
 *
 * Gera automaticamente os documentos de knowledge base a partir do estado
 * real do repo. Roda com: node scripts/sync-docs.mjs
 *
 * Saída: docs/knowledge/token-schema.md
 *         docs/knowledge/component-inventory.md
 *         docs/knowledge/adr-index.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'docs', 'knowledge');

// Garante que o diretório de saída existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function countTokens(obj, depth = 0) {
  if (!obj || typeof obj !== 'object') return 0;
  let count = 0;
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    if (val && typeof val === 'object' && '$value' in val) {
      count++;
    } else if (val && typeof val === 'object') {
      count += countTokens(val, depth + 1);
    }
  }
  return count;
}

function today() {
  return new Date().toISOString().split('T')[0];
}

// ─── Leitura do repo ────────────────────────────────────────────────────────

// package.json → versão
const pkg = readJson(path.join(ROOT, 'package.json')) || {};
const version = pkg.version || 'desconhecida';

// Foundation tokens
const foundationDir = path.join(ROOT, 'tokens', 'foundation');
const foundationFiles = fs.existsSync(foundationDir)
  ? fs.readdirSync(foundationDir).filter(f => f.endsWith('.json'))
  : [];

const foundationStats = foundationFiles.map(f => {
  const json = readJson(path.join(foundationDir, f));
  const name = path.basename(f, '.json');
  const root = json ? json[Object.keys(json)[0]] : null;
  const count = root ? countTokens(root) : 0;
  return { file: f, name, count };
});

const foundationTotal = foundationStats.reduce((s, f) => s + f.count, 0);

// Semantic tokens
const semanticDir = path.join(ROOT, 'tokens', 'semantic');
const lightJson = readJson(path.join(semanticDir, 'light.json'));
const darkJson = readJson(path.join(semanticDir, 'dark.json'));

const semanticRoot = lightJson ? lightJson[Object.keys(lightJson)[0]] : null;
const semanticTotal = semanticRoot ? countTokens(semanticRoot) : 0;
const semanticCategories = semanticRoot ? Object.keys(semanticRoot) : [];

// Verificar paridade light/dark
const darkRoot = darkJson ? darkJson[Object.keys(darkJson)[0]] : null;
const darkTotal = darkRoot ? countTokens(darkRoot) : 0;
const paridadeOk = semanticTotal === darkTotal;

// Component tokens
const componentDir = path.join(ROOT, 'tokens', 'component');
const componentFiles = fs.existsSync(componentDir)
  ? fs.readdirSync(componentDir).filter(f => f.endsWith('.json'))
  : [];

const componentStats = componentFiles.map(f => {
  const json = readJson(path.join(componentDir, f));
  const name = path.basename(f, '.json');
  const root = json ? json[Object.keys(json)[0]] : null;
  const count = root ? countTokens(root) : 0;
  return { file: f, name, count };
});

const componentTotal = componentStats.reduce((s, f) => s + f.count, 0);

// CSS components
const cssComponentsDir = path.join(ROOT, 'css', 'components');
const cssComponents = fs.existsSync(cssComponentsDir)
  ? fs.readdirSync(cssComponentsDir)
      .filter(f => f.endsWith('.css'))
      .map(f => path.basename(f, '.css'))
  : [];

// ADRs
const decisionsDir = path.join(ROOT, 'docs', 'decisions');
const adrFiles = fs.existsSync(decisionsDir)
  ? fs.readdirSync(decisionsDir)
      .filter(f => f.match(/^ADR-\d+/i) && f.endsWith('.md'))
      .sort()
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

// CSS pipeline check
const generatedDir = path.join(ROOT, 'css', 'tokens', 'generated');
const generatedFiles = fs.existsSync(generatedDir)
  ? fs.readdirSync(generatedDir).filter(f => f.endsWith('.css'))
  : [];

const indexCss = fs.existsSync(path.join(ROOT, 'css', 'tokens', 'index.css'))
  ? fs.readFileSync(path.join(ROOT, 'css', 'tokens', 'index.css'), 'utf8')
  : '';

const importsSoloGenerated = indexCss.includes('generated/') &&
  !indexCss.match(/@import\s+['"](?!.*generated).*\.css/m);

// ─── Gerar token-schema.md ───────────────────────────────────────────────────

const tokenSchema = `# Token schema — Design System Core

> Gerado automaticamente por \`scripts/sync-docs.mjs\` em ${today()}.
> Não editar manualmente — as mudanças serão sobrescritas.
> Versão atual: **${version}**

## Estado atual

| Aspecto | Valor |
|---------|-------|
| Versão | ${version} |
| Formato canônico | JSON (DTCG) em \`tokens/\` |
| CSS | Gerado pelo Style Dictionary em \`css/tokens/generated/\` |
| Pipeline limpo | ${importsSoloGenerated ? '✅ index.css importa apenas generated/' : '⚠️ index.css ainda importa arquivos legados'} |
| Paridade light/dark | ${paridadeOk ? `✅ ${semanticTotal} tokens em ambos os modos` : `⚠️ light=${semanticTotal}, dark=${darkTotal} — divergência`} |

## Camadas

| Camada | Tokens | Arquivos |
|--------|--------|----------|
| Foundation | **${foundationTotal}** | ${foundationFiles.length} arquivos |
| Semantic | **${semanticTotal} × 2 modos** | light.json + dark.json |
| Component | **${componentTotal}** | ${componentFiles.length} arquivos |

## Foundation (${foundationTotal} tokens)

| Arquivo | Tokens |
|---------|--------|
${foundationStats.map(f => `| \`${f.file}\` | ${f.count} |`).join('\n')}

## Semantic (${semanticTotal} tokens × 2 modos)

Categorias raiz em light.json:

\`\`\`
${semanticCategories.map(c => `semantic.${c}.*`).join('\n')}
\`\`\`

## Component (${componentTotal} tokens em ${componentFiles.length} arquivos)

| Arquivo | Tokens |
|---------|--------|
${componentStats.map(f => `| \`${f.file}\` | ${f.count} |`).join('\n')}

## Regras invioláveis

1. Component tokens → Semantic, nunca Foundation
2. Semantic tokens → Foundation, nunca hardcoded
3. Foundation é a única camada com valores absolutos
4. Brand é Foundation — 2 tokens (primary, secondary), sem estados
5. Todo token tem \`$type\` conforme DTCG spec
6. Todo token não óbvio tem \`$description\`
7. Tokens de valor zero não são vinculados via setBoundVariable() no Figma
8. Novas categorias ou quebras de hierarquia exigem ADR
9. light.json e dark.json devem ter exatamente o mesmo conjunto de chaves
10. Todo \`.default\` gera sufixo \`-default\` no CSS

## ADRs relacionados

${adrs.map(a => `- **ADR-${a.num}** — ${a.title} (${a.status})`).join('\n')}
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'token-schema.md'), tokenSchema);
console.log(`✅ token-schema.md gerado (Foundation: ${foundationTotal}, Semantic: ${semanticTotal}×2, Component: ${componentTotal})`);

// ─── Gerar component-inventory.md ───────────────────────────────────────────

const knownComponents = [
  { name: 'Button', cssClass: 'ds-btn', tokenFile: 'button' },
  { name: 'Input Text', cssClass: 'ds-input', tokenFile: 'input' },
  { name: 'Textarea', cssClass: 'ds-textarea', tokenFile: 'textarea' },
  { name: 'Select', cssClass: 'ds-select', tokenFile: 'select' },
  { name: 'Checkbox', cssClass: 'ds-checkbox', tokenFile: 'checkbox' },
  { name: 'Radio', cssClass: 'ds-radio', tokenFile: 'radio' },
  { name: 'Toggle', cssClass: 'ds-toggle', tokenFile: 'toggle' },
  { name: 'Badge', cssClass: 'ds-badge', tokenFile: null },
  { name: 'Alert', cssClass: 'ds-alert', tokenFile: null },
  { name: 'Card', cssClass: 'ds-card', tokenFile: null },
  { name: 'Modal', cssClass: 'ds-modal', tokenFile: 'modal' },
  { name: 'Tooltip', cssClass: 'ds-tooltip', tokenFile: null },
  { name: 'Tabs', cssClass: 'ds-tabs', tokenFile: null },
  { name: 'Breadcrumb', cssClass: 'ds-breadcrumb', tokenFile: null },
  { name: 'Avatar', cssClass: 'ds-avatar', tokenFile: 'avatar' },
  { name: 'Divider', cssClass: 'ds-divider', tokenFile: null },
  { name: 'Spinner', cssClass: 'ds-spinner', tokenFile: 'spinner' },
  { name: 'Skeleton', cssClass: 'ds-skeleton', tokenFile: 'skeleton' },
];

const componentRows = knownComponents.map(c => {
  const cssName = c.cssClass.replace('ds-', '');
  const hasCss = cssComponents.includes(cssName);
  const hasJson = c.tokenFile && componentFiles.includes(`${c.tokenFile}.json`);
  const tokenCount = c.tokenFile
    ? (componentStats.find(s => s.name === c.tokenFile)?.count || 0)
    : 0;
  const jsonStatus = c.tokenFile
    ? (hasJson ? `🟢 (${tokenCount})` : '⚠️')
    : '—';
  return `| ${c.name} | ${hasCss ? '🟢' : '⬜'} | ${jsonStatus} | 🟢 | 🟢 | ⬜ | 🟢 |`;
});

const inventory = `# Inventário de componentes — Design System Core

> Gerado automaticamente por \`scripts/sync-docs.mjs\` em ${today()}.
> Não editar manualmente — as mudanças serão sobrescritas.
> Versão atual: **${version}**

## Status geral

| Componente | CSS | Tokens JSON | Figma (visual) | Figma (binding) | Stories | Docs site |
|------------|-----|-------------|-----------------|-----------------|---------|----------|
${componentRows.join('\n')}

**Legenda:** ⬜ Não iniciado | 🟡 Em progresso | 🟢 Completo | ⚠️ Verificar | 🔴 Precisa revisão

## Resumo de tokens

| Coleção | Tokens | Arquivos |
|---------|--------|----------|
| Foundation | ${foundationTotal} | ${foundationFiles.length} JSON |
| Semantic (light) | ${semanticTotal} | light.json |
| Semantic (dark) | ${darkTotal} | dark.json |
| Component | ${componentTotal} | ${componentFiles.length} JSON |

**Paridade light/dark:** ${paridadeOk ? '✅ OK' : `⚠️ Divergência — light=${semanticTotal}, dark=${darkTotal}`}

## Pipeline

| Etapa | Status |
|-------|--------|
| JSON (DTCG) canônico | 🟢 \`tokens/foundation/\`, \`tokens/semantic/\`, \`tokens/component/\` |
| Style Dictionary | 🟢 \`build-tokens.mjs\` funcional |
| CSS gerado | ${generatedFiles.length > 0 ? `🟢 ${generatedFiles.length} arquivos em \`css/tokens/generated/\`` : '⚠️ Diretório generated/ vazio ou ausente'} |
| Import pipeline | ${importsSoloGenerated ? '🟢 index.css importa apenas generated/' : '⚠️ index.css ainda importa legados'} |
| Figma binding | 🟢 18 componentes vinculados |

## ADRs

| ADR | Título | Status | Data |
|-----|--------|--------|------|
${adrs.map(a => `| ADR-${a.num} | ${a.title} | ${a.status} | ${a.date} |`).join('\n')}

## Próximos milestones

1. **Storybook setup + stories** — 18 componentes, vanilla JS
2. **prefers-reduced-motion** — adicionar media query nos componentes com transitions (ADR-004)
3. **CSS legado** — verificar e remover \`css/tokens/theme-light.css\` (ADR-010)
4. **Novos componentes** — Dropdown, Combobox, Pagination, Table
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'component-inventory.md'), inventory);
console.log(`✅ component-inventory.md gerado (${knownComponents.length} componentes)`);

// ─── Gerar adr-index.md ──────────────────────────────────────────────────────

const adrIndex = `# Índice de ADRs — Design System Core

> Gerado automaticamente por \`scripts/sync-docs.mjs\` em ${today()}.
> Não editar manualmente.

${adrs.length} decisões registradas.

| ADR | Título | Status | Data |
|-----|--------|--------|------|
${adrs.map(a => `| [ADR-${a.num}](../decisions/${a.file}) | ${a.title} | ${a.status} | ${a.date} |`).join('\n')}
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'adr-index.md'), adrIndex);
console.log(`✅ adr-index.md gerado (${adrs.length} ADRs)`);

console.log(`\n📁 Documentos gerados em: docs/knowledge/`);
console.log(`   - token-schema.md`);
console.log(`   - component-inventory.md`);
console.log(`   - adr-index.md`);
console.log(`\nVersão do DS: ${version}`);
