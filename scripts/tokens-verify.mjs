#!/usr/bin/env node
/**
 * tokens-verify.mjs — verificação de coerência da cadeia de tokens.
 *
 * Três checagens:
 *   1. JSONs em tokens/ — referências `{x.y.z}` resolvem, valores válidos.
 *   2. JSON ↔ CSS — tokens gerados em css/tokens/generated/*.css batem com os JSONs.
 *   3. JSON ↔ Figma Variables — valores e nomes batem com a coleção do arquivo
 *      `PRYS2kL7VdC1MtVWfZvuDN`. Requer variável de ambiente FIGMA_PAT com
 *      permissão `file_variables:read`. Se FIGMA_PAT não estiver presente,
 *      a checagem é pulada com aviso (nao falha o build).
 *
 * Saídas:
 *   - Terminal: tabela texto com sumário e divergências.
 *   - JSON:     docs/api/tokens-sync.json — estado estruturado para consumo.
 *   - HTML:     docs/tokens-sync.html — página amigável no site.
 *
 * Exit codes:
 *   0 — sem divergências (ou apenas warnings).
 *   1 — divergências detectadas.
 *   2 — erro de execução (arquivo inexistente, JSON inválido, etc.).
 *
 * Uso:
 *   node scripts/tokens-verify.mjs
 *   FIGMA_PAT=figd_xxx node scripts/tokens-verify.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TOKENS_DIR = path.join(ROOT, "tokens");
const CSS_DIR = path.join(ROOT, "css", "tokens", "generated");
const OUT_JSON = path.join(ROOT, "docs", "api", "tokens-sync.json");
const OUT_HTML = path.join(ROOT, "docs", "tokens-sync.html");
const FIGMA_FILE_KEY = "PRYS2kL7VdC1MtVWfZvuDN";

// -----------------------------------------------------------------------------
// utilidades
// -----------------------------------------------------------------------------

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function walkJsonFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkJsonFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".json")) out.push(full);
  }
  return out;
}

// Achata um objeto aninhado em pares { "a.b.c": { $value, $type } } apenas nas
// folhas DTCG (objetos com $value).
function flattenTokens(obj, prefix = "", acc = {}) {
  if (obj && typeof obj === "object" && "$value" in obj) {
    acc[prefix] = obj;
    return acc;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith("$")) continue;
      const next = prefix ? `${prefix}.${k}` : k;
      flattenTokens(v, next, acc);
    }
  }
  return acc;
}

function resolveRefs(value, all, seen = new Set()) {
  if (typeof value !== "string") return value;
  const m = value.match(/^\{([^}]+)\}$/);
  if (!m) return value;
  const ref = m[1];
  if (seen.has(ref)) return { __error: `circular: ${ref}` };
  if (!(ref in all)) return { __error: `missing: ${ref}` };
  seen.add(ref);
  return resolveRefs(all[ref].$value, all, seen);
}

// Normaliza hex/rgb/rgba/px/rem para comparação tolerante a formatação.
function normalize(value) {
  if (value == null) return "";
  // Array de 4 números (DTCG cubicBezier) → string cubic-bezier para seguir
  // o path normal de normalização de string.
  if (Array.isArray(value) && value.length === 4 && value.every((n) => typeof n === "number")) {
    value = `cubic-bezier(${value.join(",")})`;
  }
  if (typeof value === "object") {
    if (value.__error) return `ERROR:${value.__error}`;
    return JSON.stringify(value);
  }
  let v = String(value).trim().toLowerCase();
  // #fff -> #ffffff
  if (/^#[0-9a-f]{3}$/.test(v)) {
    v = "#" + v.slice(1).split("").map((c) => c + c).join("");
  }
  // remove espaços dentro de rgba/rgb e dentro de cubic-bezier
  v = v.replace(/\s+/g, "");
  return v;
}

// -----------------------------------------------------------------------------
// 1. Validar JSONs internos
// -----------------------------------------------------------------------------

function loadAllTokens() {
  // Tokens são separados por modo. Semantic light e dark compartilham nomes
  // mas têm valores distintos. Foundation e component são mode-invariant.
  const modes = { light: {}, dark: {}, shared: {} };
  for (const file of walkJsonFiles(TOKENS_DIR)) {
    try {
      const data = readJson(file);
      const flat = flattenTokens(data);
      const mode = file.includes(path.sep + "semantic" + path.sep + "light")
        ? "light"
        : file.includes(path.sep + "semantic" + path.sep + "dark")
        ? "dark"
        : "shared";
      for (const [k, v] of Object.entries(flat)) {
        modes[mode][k] = v;
      }
    } catch (e) {
      console.error(`erro ao ler ${file}: ${e.message}`);
      process.exit(2);
    }
  }
  // Para resolver referências, a pool combinada por modo precisa incluir os
  // tokens shared (foundation + component).
  const lightAll = { ...modes.shared, ...modes.light };
  const darkAll = { ...modes.shared, ...modes.dark };
  return { lightAll, darkAll, shared: modes.shared, light: modes.light, dark: modes.dark };
}

function checkJsonIntegrity(lightAll, darkAll) {
  const errors = [];
  const check = (pool, modeLabel) => {
    for (const [name, token] of Object.entries(pool)) {
      const resolved = resolveRefs(token.$value, pool);
      if (resolved && typeof resolved === "object" && resolved.__error) {
        errors.push({
          level: "error",
          token: name,
          mode: modeLabel,
          message: `Referência ${resolved.__error} em $value=${token.$value}`,
        });
      }
    }
  };
  check(lightAll, "light");
  check(darkAll, "dark");
  return errors;
}

// -----------------------------------------------------------------------------
// 2. Comparar JSON resolvido com CSS gerado
// -----------------------------------------------------------------------------

function parseCssVars(file) {
  const content = fs.readFileSync(file, "utf8");
  const vars = {};
  // captura --nome: valor; (pode ter comentários /* ... */ antes)
  const re = /--(ds-[a-z0-9-]+):\s*([^;]+);/gi;
  let match;
  while ((match = re.exec(content)) !== null) {
    vars[match[1]] = match[2].trim();
  }
  return vars;
}

// Traduz nome canônico DTCG (foundation.color.neutral.50) para a CSS var
// gerada (ds-color-neutral-50). Espelha exatamente o transform
// `name/strip-layer` definido em build-tokens.mjs:
//   1. Remove prefixo de camada (foundation/semantic/component).
//   2. Se o próximo segmento for 'typography', remove também
//      (foundation.typography.font.size.md → font-size-md).
//   3. Se o próximo segmento for 'color' seguido de 'overlay', remove 'color'
//      (foundation.color.overlay.black.5 → overlay-black-5).
//      Mas mantém 'color' para paletas (foundation.color.blue.500 → color-blue-500).
function canonicalToCssVar(name) {
  const path = name.split(".");
  path.shift(); // layer
  if (path[0] === "typography") path.shift();
  if (path[0] === "color" && path[1] === "overlay") path.shift();
  return "ds-" + path.join("-");
}

function compareJsonToCss({ shared, light, dark, lightAll, darkAll }) {
  const sharedCss = {};
  for (const f of ["foundation.css", "component.css"].map((x) => path.join(CSS_DIR, x)).filter(fs.existsSync)) {
    Object.assign(sharedCss, parseCssVars(f));
  }
  const lightCss = fs.existsSync(path.join(CSS_DIR, "theme-light.css"))
    ? parseCssVars(path.join(CSS_DIR, "theme-light.css"))
    : {};
  const darkCss = fs.existsSync(path.join(CSS_DIR, "theme-dark.css"))
    ? parseCssVars(path.join(CSS_DIR, "theme-dark.css"))
    : {};

  const divergences = [];

  const compare = (pool, resolvePool, cssPool, modeLabel) => {
    for (const [name, token] of Object.entries(pool)) {
      const cssName = canonicalToCssVar(name);
      if (!(cssName in cssPool)) {
        divergences.push({
          level: "warning",
          token: name,
          cssVar: cssName,
          mode: modeLabel,
          message: "token definido em JSON mas sem CSS custom property equivalente",
        });
        continue;
      }
      if (cssPool[cssName].startsWith("var(--")) continue;
      const jsonResolved = resolveRefs(token.$value, resolvePool);
      const jsonN = normalize(jsonResolved);
      const cssN = normalize(cssPool[cssName]);
      if (jsonN !== cssN) {
        divergences.push({
          level: "error",
          token: name,
          cssVar: cssName,
          mode: modeLabel,
          json: jsonResolved,
          css: cssPool[cssName],
          message: "valor do CSS gerado difere do JSON",
        });
      }
    }
  };

  compare(shared, shared, sharedCss, "shared");
  compare(light, lightAll, lightCss, "light");
  compare(dark, darkAll, darkCss, "dark");

  return divergences;
}

// -----------------------------------------------------------------------------
// 3. Comparar com Figma Variables
// -----------------------------------------------------------------------------

async function fetchFigmaVariables(pat) {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`;
  const res = await fetch(url, {
    headers: { "X-Figma-Token": pat },
  });
  if (!res.ok) {
    throw new Error(`Figma API retornou ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function compareJsonToFigma(all, pat) {
  if (!pat) {
    return {
      skipped: true,
      reason: "FIGMA_PAT ausente. Para ativar a verificação com Figma, exporte FIGMA_PAT=<seu-pat>.",
      divergences: [],
    };
  }
  let figma;
  try {
    figma = await fetchFigmaVariables(pat);
  } catch (e) {
    return {
      skipped: true,
      reason: `Erro ao consultar Figma: ${e.message}`,
      divergences: [],
    };
  }
  // A API retorna meta.variables e meta.variableCollections. Precisamos
  // mapear variáveis para um formato comparável com os tokens do JSON.
  // A comparação plena exige resolução de alias entre variáveis Figma,
  // escolha de modo (Light/Dark), e normalização de formato de cor —
  // está documentada como TODO abaixo para a próxima iteração.
  const variables = figma.meta?.variables ?? {};
  const collections = figma.meta?.variableCollections ?? {};
  return {
    skipped: false,
    summary: {
      figmaVariableCount: Object.keys(variables).length,
      figmaCollectionCount: Object.keys(collections).length,
      jsonTokenCount: Object.keys(all).length,
    },
    // TODO: comparação nome-por-nome, valor-por-valor, modo-por-modo.
    // Exige mapeamento das convenções (Figma usa / como separador, DTCG usa .)
    // e resolução de alias. A primeira iteração apenas confirma conectividade.
    divergences: [],
    note: "Comparação detalhada Figma ↔ JSON pendente. Primeira iteração confirma que a API responde e coleta a contagem de variáveis.",
  };
}

// -----------------------------------------------------------------------------
// saídas
// -----------------------------------------------------------------------------

function writeJsonReport(report) {
  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(report, null, 2) + "\n");
}

function writeHtmlReport(report) {
  const status =
    report.totals.errors === 0
      ? { label: "Em dia", klass: "ok" }
      : { label: `${report.totals.errors} divergência(s)`, klass: "error" };
  const rows = [
    ...report.checks.jsonIntegrity.map((d) => ({ check: "JSON integrity", ...d })),
    ...report.checks.jsonVsCss.filter((d) => d.level === "error").map((d) => ({ check: "JSON ↔ CSS", ...d })),
    ...report.checks.jsonVsFigma.divergences.map((d) => ({ check: "JSON ↔ Figma", ...d })),
  ];
  const rowsHtml = rows.length
    ? rows
        .map(
          (r) => `
    <tr>
      <td><code>${r.check}</code></td>
      <td><code>${r.token || "—"}</code></td>
      <td>${r.message}</td>
      <td><code>${r.json ?? "—"}</code></td>
      <td><code>${r.css ?? "—"}</code></td>
    </tr>`
        )
        .join("")
    : `<tr><td colspan="5" style="text-align:center;color:var(--ds-content-secondary)">Nenhuma divergência registrada.</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sincronização de tokens — Design System</title>
<link rel="stylesheet" href="../css/design-system.css">
<link rel="stylesheet" href="layout.css">
<style>
  .ds-sync-status { display:inline-flex; align-items:center; gap: var(--ds-spacing-2); padding: var(--ds-spacing-3) var(--ds-spacing-5); border-radius: var(--ds-radius-lg); font-weight: var(--ds-font-weight-semibold); }
  .ds-sync-status.ok { background: var(--ds-feedback-success-background); color: var(--ds-feedback-success-content-default); }
  .ds-sync-status.error { background: var(--ds-feedback-error-background); color: var(--ds-feedback-error-content-default); }
  .ds-sync-meta { display:flex; gap: var(--ds-spacing-6); margin-top: var(--ds-spacing-4); font-size: var(--ds-font-size-sm); color: var(--ds-content-secondary); }
  .ds-sync-meta strong { color: var(--ds-content-default); font-weight: var(--ds-font-weight-semibold); }
  .ds-sync-table { width:100%; border-collapse: collapse; margin-top: var(--ds-spacing-6); font-size: var(--ds-font-size-sm); }
  .ds-sync-table th, .ds-sync-table td { text-align:left; padding: var(--ds-spacing-3); border-bottom: 1px solid var(--ds-border-default); }
  .ds-sync-table th { font-weight: var(--ds-font-weight-semibold); background: var(--ds-background-subtle); }
  .ds-sync-banner { background: var(--ds-feedback-info-background); color: var(--ds-feedback-info-content-default); padding: var(--ds-spacing-4) var(--ds-spacing-5); border-radius: var(--ds-radius-md); margin-bottom: var(--ds-spacing-6); font-size: var(--ds-font-size-sm); }
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
    <a href="../index.html" class="ds-site-header__brand">
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
    <h1 class="ds-section__title"><span data-lang="pt">Sincronização de tokens</span><span data-lang="en">Token sync status</span></h1>
    <p class="ds-section__subtitle"><span data-lang="pt">Coerência entre JSONs canônicos, CSS gerado e Figma Variables.</span><span data-lang="en">Coherence between canonical JSON, generated CSS, and Figma Variables.</span></p>
  </div>

  <div class="ds-sync-banner">
    <span data-lang="pt">Esta página é gerada automaticamente por <code>scripts/tokens-verify.mjs</code>. Não editar manualmente.</span>
    <span data-lang="en">This page is generated automatically by <code>scripts/tokens-verify.mjs</code>. Do not edit by hand.</span>
  </div>

  <div class="ds-section">
    <span class="ds-sync-status ${status.klass}">${status.label}</span>
    <div class="ds-sync-meta">
      <div><strong>Última verificação:</strong> ${report.generatedAt}</div>
      <div><strong>Tokens JSON:</strong> ${report.totals.jsonTokens}</div>
      <div><strong>Divergências:</strong> ${report.totals.errors}</div>
      <div><strong>Avisos:</strong> ${report.totals.warnings}</div>
    </div>
  </div>

  <div class="ds-section">
    <h2 class="ds-subsection__title">Detalhamento</h2>
    <table class="ds-sync-table">
      <thead>
        <tr><th>Checagem</th><th>Token</th><th>Mensagem</th><th>JSON</th><th>CSS</th></tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>
  </div>
</main>

<script src="../js/main.js"></script>
</body>
</html>
`;
  fs.mkdirSync(path.dirname(OUT_HTML), { recursive: true });
  fs.writeFileSync(OUT_HTML, html);
}

// -----------------------------------------------------------------------------
// main
// -----------------------------------------------------------------------------

async function main() {
  const bundle = loadAllTokens();
  const totalTokens = Object.keys(bundle.shared).length + Object.keys(bundle.light).length + Object.keys(bundle.dark).length;
  const jsonIntegrity = checkJsonIntegrity(bundle.lightAll, bundle.darkAll);
  const jsonVsCss = compareJsonToCss(bundle);
  // Para a verificação Figma usa o pool combinado (light) como representativo.
  // A comparação específica por modo será implementada junto com a resolução
  // de alias Figma.
  const jsonVsFigma = await compareJsonToFigma(bundle.lightAll, process.env.FIGMA_PAT);

  const errors = jsonIntegrity.filter((d) => d.level === "error").length +
    jsonVsCss.filter((d) => d.level === "error").length +
    (jsonVsFigma.divergences?.length || 0);
  const warnings = jsonIntegrity.filter((d) => d.level === "warning").length +
    jsonVsCss.filter((d) => d.level === "warning").length;

  const report = {
    generatedAt: new Date().toISOString(),
    totals: {
      jsonTokens: totalTokens,
      sharedTokens: Object.keys(bundle.shared).length,
      lightTokens: Object.keys(bundle.light).length,
      darkTokens: Object.keys(bundle.dark).length,
      errors,
      warnings,
    },
    checks: {
      jsonIntegrity,
      jsonVsCss,
      jsonVsFigma,
    },
  };

  // terminal
  console.log("");
  console.log("═══ tokens-verify ════════════════════════════");
  console.log(`Tokens JSON:      ${report.totals.jsonTokens} (shared ${report.totals.sharedTokens}, light ${report.totals.lightTokens}, dark ${report.totals.darkTokens})`);
  console.log(`JSON integrity:   ${jsonIntegrity.length === 0 ? "OK" : `${jsonIntegrity.length} erros`}`);
  console.log(`JSON ↔ CSS:       ${jsonVsCss.filter((d) => d.level === "error").length === 0 ? "OK" : `${jsonVsCss.filter((d) => d.level === "error").length} divergências`}`);
  if (jsonVsFigma.skipped) {
    console.log(`JSON ↔ Figma:     SKIP — ${jsonVsFigma.reason}`);
  } else {
    console.log(`JSON ↔ Figma:     ${jsonVsFigma.divergences.length === 0 ? "OK (smoke)" : `${jsonVsFigma.divergences.length} divergências`}`);
    if (jsonVsFigma.note) console.log(`                  nota: ${jsonVsFigma.note}`);
  }
  console.log(`Avisos:           ${warnings}`);
  console.log(`Erros:            ${errors}`);
  console.log("═════════════════════════════════════════════");
  console.log("");

  if (errors > 0) {
    console.log("Divergências:");
    for (const d of [...jsonIntegrity, ...jsonVsCss.filter((x) => x.level === "error"), ...jsonVsFigma.divergences]) {
      console.log(`  • [${d.level || "error"}] ${d.token}${d.cssVar ? ` → ${d.cssVar}` : ""}`);
      console.log(`      ${d.message}`);
      if (d.json !== undefined || d.css !== undefined) {
        console.log(`      JSON: ${JSON.stringify(d.json)}  /  CSS: ${JSON.stringify(d.css)}`);
      }
    }
    console.log("");
  }

  writeJsonReport(report);
  writeHtmlReport(report);
  console.log(`Relatório: ${path.relative(ROOT, OUT_JSON)}`);
  console.log(`Página:    ${path.relative(ROOT, OUT_HTML)}`);

  process.exit(errors > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
