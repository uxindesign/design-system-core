#!/usr/bin/env node
/**
 * build-api.mjs — gera APIs JSON estáticas em docs/api/ a partir das
 * fontes canônicas do repo.
 *
 * Saídas:
 *   docs/api/components.json
 *   docs/api/tokens.json
 *   docs/api/adrs.json
 *   docs/api/foundations.json
 *
 * Consumidas por ferramentas externas que queiram navegar o DS
 * programaticamente, sem precisar parsear HTML.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const API_DIR = path.join(ROOT, "docs", "api");

const BASE_URL = "https://uxindesign.github.io/design-system-core";
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY || "PRYS2kL7VdC1MtVWfZvuDN";

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
function writeJson(p, data) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n");
}

const pkg = readJson(path.join(ROOT, "package.json"));
// Use latest git commit ISO date — deterministic per commit, evita ruído
// de timestamp em CI re-runs e mantém artefatos reproduzíveis.
const now = (() => {
  try {
    const seconds = parseInt(
      execSync("git log -1 --format=%ct", { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] })
        .toString().trim(),
      10
    );
    return new Date(seconds * 1000).toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
})();

// -----------------------------------------------------------------------------
// components.json
// -----------------------------------------------------------------------------

// Component layer eliminada em 0.7.0 — tokens migrados pra Semantic.
// `token` em cada entry agora não aponta pra arquivo (lookup via CSS).
const COMPONENTS = [
  { name: "Button", slug: "button", css: "button.css", html: "button.html" },
  { name: "Input Text", slug: "input", css: "input.css", html: "input.html" },
  { name: "Textarea", slug: "textarea", css: "textarea.css", html: "textarea.html" },
  { name: "Select", slug: "select", css: "select.css", html: "select.html" },
  { name: "Checkbox", slug: "checkbox", css: "checkbox.css", html: "checkbox.html" },
  { name: "Radio", slug: "radio", css: "radio.css", html: "radio.html" },
  { name: "Toggle", slug: "toggle", css: "toggle.css", html: "toggle.html" },
  { name: "Badge", slug: "badge", css: "badge.css", html: "badge.html" },
  { name: "Alert", slug: "alert", css: "alert.css", html: "alert.html" },
  { name: "Card", slug: "card", css: "card.css", html: "card.html" },
  { name: "Modal", slug: "modal", css: "modal.css", html: "modal.html" },
  { name: "Tooltip", slug: "tooltip", css: "tooltip.css", html: "tooltip.html" },
  { name: "Tabs", slug: "tabs", css: "tabs.css", html: "tabs.html" },
  { name: "Breadcrumb", slug: "breadcrumb", css: "breadcrumb.css", html: "breadcrumb.html" },
  { name: "Avatar", slug: "avatar", css: "avatar.css", html: "avatar.html" },
  { name: "Divider", slug: "divider", css: "divider.css", html: "divider.html" },
  { name: "Spinner", slug: "spinner", css: "spinner.css", html: "spinner.html" },
  { name: "Skeleton", slug: "skeleton", css: "skeleton.css", html: "skeleton.html" },
];

function extractTokensFromCss(cssPath) {
  if (!fs.existsSync(cssPath)) return [];
  const content = fs.readFileSync(cssPath, "utf8");
  const tokens = new Set();
  const re = /var\(--(ds-[a-z0-9-]+)\)/gi;
  let m;
  while ((m = re.exec(content)) !== null) tokens.add(m[1]);
  return [...tokens].sort();
}

function extractVariantsFromCss(cssPath) {
  if (!fs.existsSync(cssPath)) return [];
  const content = fs.readFileSync(cssPath, "utf8");
  const variants = new Set();
  const re = /\.ds-[a-z-]+--([a-z0-9-]+)/gi;
  let m;
  while ((m = re.exec(content)) !== null) variants.add(m[1]);
  return [...variants].sort();
}

const components = COMPONENTS.map((c) => {
  const cssPath = path.join(ROOT, "css", "components", c.css);
  return {
    name: c.name,
    slug: c.slug,
    url: `${BASE_URL}/docs/${c.html}`,
    cssClass: `ds-${c.slug === "input" ? "input" : c.slug}`,
    cssFile: `css/components/${c.css}`,
    tokens: extractTokensFromCss(cssPath),
    variants: extractVariantsFromCss(cssPath),
    figma: {
      fileKey: FIGMA_FILE_KEY,
      page: c.name,
    },
  };
});

writeJson(path.join(API_DIR, "components.json"), {
  generatedAt: now,
  version: pkg.version,
  count: components.length,
  components,
});
console.log(`✅ docs/api/components.json (${components.length} componentes)`);

// -----------------------------------------------------------------------------
// tokens.json
// -----------------------------------------------------------------------------

function flattenTokens(obj, prefix = "", acc = {}) {
  if (obj && typeof obj === "object" && "$value" in obj) {
    acc[prefix] = { value: obj.$value, type: obj.$type, description: obj.$description };
    return acc;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith("$")) continue;
      flattenTokens(v, prefix ? `${prefix}.${k}` : k, acc);
    }
  }
  return acc;
}

const tokensRoot = path.join(ROOT, "tokens");
const foundationTokens = {};
const semanticLight = {};
const semanticDark = {};

for (const f of fs.readdirSync(path.join(tokensRoot, "foundation")).filter((x) => x.endsWith(".json"))) {
  const data = readJson(path.join(tokensRoot, "foundation", f));
  Object.assign(foundationTokens, flattenTokens(data));
}
// Component layer eliminada em 0.7.0 (2-layer: Foundation + Semantic).
// Tokens que eram Component agora vivem em Semantic (size.avatar.*, size.modal.*, etc.).
Object.assign(semanticLight, flattenTokens(readJson(path.join(tokensRoot, "semantic", "light.json"))));
Object.assign(semanticDark, flattenTokens(readJson(path.join(tokensRoot, "semantic", "dark.json"))));

writeJson(path.join(API_DIR, "tokens.json"), {
  generatedAt: now,
  version: pkg.version,
  counts: {
    foundation: Object.keys(foundationTokens).length,
    semanticLight: Object.keys(semanticLight).length,
    semanticDark: Object.keys(semanticDark).length,
  },
  foundation: foundationTokens,
  semantic: { light: semanticLight, dark: semanticDark },
});
console.log(`✅ docs/api/tokens.json (${Object.keys(foundationTokens).length + Object.keys(semanticLight).length * 2} tokens)`);

// -----------------------------------------------------------------------------
// adrs.json
// -----------------------------------------------------------------------------

const decisionsDir = path.join(ROOT, "docs", "decisions");
const adrFiles = fs
  .readdirSync(decisionsDir)
  .filter((f) => /^ADR-\d+/i.test(f) && f.endsWith(".md"))
  .sort();

const adrs = adrFiles.map((f) => {
  const content = fs.readFileSync(path.join(decisionsDir, f), "utf8");
  const numMatch = f.match(/ADR-(\d+)/i);
  const titleMatch = content.match(/^#\s+ADR-\d+[:\s]+(.+)$/m);
  const statusMatch = content.match(/\*\*Status:\*\*\s*(.+)/);
  const dateMatch = content.match(/\*\*Data:\*\*\s*(.+)/) || content.match(/\*\*Date:\*\*\s*(.+)/);
  const slug = f.replace(/\.md$/, "").toLowerCase();
  return {
    id: `ADR-${numMatch[1]}`,
    num: parseInt(numMatch[1], 10),
    title: titleMatch ? titleMatch[1].trim() : f,
    status: statusMatch ? statusMatch[1].trim() : "desconhecido",
    date: dateMatch ? dateMatch[1].trim() : "—",
    sourceFile: `docs/decisions/${f}`,
    url: `${BASE_URL}/docs/decisions/${slug}.html`,
  };
});

writeJson(path.join(API_DIR, "adrs.json"), {
  generatedAt: now,
  version: pkg.version,
  count: adrs.length,
  adrs,
});
console.log(`✅ docs/api/adrs.json (${adrs.length} ADRs)`);

// -----------------------------------------------------------------------------
// foundations.json
// -----------------------------------------------------------------------------

const FOUNDATIONS_META = [
  { slug: "colors", name: "Colors", file: "colors.json", url: "foundations-colors.html" },
  { slug: "theme-colors", name: "Theme Colors", file: null, url: "foundations-theme-colors.html", note: "Derived from semantic layer" },
  { slug: "typography", name: "Typography", file: "typography.json", url: "foundations-typography.html" },
  { slug: "dimension", name: "Dimension", file: "dimension.json", url: "foundations-spacing.html" },
  { slug: "radius", name: "Radius", file: "radius.json", url: "foundations-radius.html" },
  { slug: "elevation", name: "Elevation", file: "shadows.json", url: "foundations-elevation.html" },
  { slug: "borders", name: "Borders", file: "stroke.json", url: "foundations-borders.html" },
  { slug: "motion", name: "Motion", file: "motion.json", url: "foundations-motion.html" },
  { slug: "opacity", name: "Opacity", file: "opacity.json", url: "foundations-opacity.html" },
  { slug: "z-index", name: "Z-index", file: "z-index.json", url: "foundations-zindex.html" },
  { slug: "brand", name: "Brand", file: "brand.json", url: null },
];

const foundations = FOUNDATIONS_META.map((f) => {
  const filePath = f.file ? path.join(tokensRoot, "foundation", f.file) : null;
  const tokenCount = filePath && fs.existsSync(filePath) ? Object.keys(flattenTokens(readJson(filePath))).length : 0;
  return {
    slug: f.slug,
    name: f.name,
    sourceFile: f.file ? `tokens/foundation/${f.file}` : null,
    tokenCount,
    url: f.url ? `${BASE_URL}/docs/${f.url}` : null,
    note: f.note || null,
  };
});

writeJson(path.join(API_DIR, "foundations.json"), {
  generatedAt: now,
  version: pkg.version,
  count: foundations.length,
  foundations,
});
console.log(`✅ docs/api/foundations.json (${foundations.length} foundations)`);

console.log(`\n📁 APIs JSON geradas em docs/api/`);
