#!/usr/bin/env node
/**
 * sync-tokens-from-figma.mjs — sincroniza Figma Variables para os arquivos
 * JSON DTCG em `tokens/`.
 *
 * Direção canônica (ADR-003 revisada em 0.5.8): Figma é autoridade de
 * valores de token. JSONs em tokens/ são consolidação derivada.
 *
 * Uso:
 *   FIGMA_PAT=figd_xxx node scripts/sync-tokens-from-figma.mjs            (dry-run)
 *   FIGMA_PAT=figd_xxx node scripts/sync-tokens-from-figma.mjs --write    (aplica VALUE_DRIFT e regenera CSS)
 *
 * Categorias (mesmas usadas em tokens-verify.mjs):
 *   VALUE_DRIFT        mesmo nome, valor diferente. `--write` corrige.
 *   NEW_IN_FIGMA       Figma tem, JSON não. `--write` não cria — ação manual.
 *   MISSING_IN_FIGMA   JSON tem, Figma não. `--write` não deleta — ação manual.
 *   ALIAS_BROKEN       variável Figma aponta pra ID inexistente.
 *
 * Exit codes:
 *   0 — sem divergências ou `--write` bem sucedido.
 *   1 — dry-run com divergências.
 *   2 — erro de execução (PAT ausente, Figma erro, build falhou).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

import {
  fetchFigmaVariables,
  buildExpectedState,
  readCurrentState,
  compareStates,
} from "./lib/figma-dtcg.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TOKENS_DIR = path.join(ROOT, "tokens");

const FIGMA_PAT = process.env.FIGMA_PAT;
const args = process.argv.slice(2);
const isWrite = args.includes("--write");

if (args.includes("--help") || args.includes("-h")) {
  console.log(`sync-tokens-from-figma.mjs

Uso:
  FIGMA_PAT=<pat> node scripts/sync-tokens-from-figma.mjs            # dry-run
  FIGMA_PAT=<pat> node scripts/sync-tokens-from-figma.mjs --write    # aplica

O PAT precisa de permissão file_variables:read. Obtenha em:
  https://www.figma.com/developers/api#access-tokens`);
  process.exit(0);
}

if (!FIGMA_PAT) {
  console.error("FIGMA_PAT env var requerida. Ver --help.");
  process.exit(2);
}

// ─── Report ─────────────────────────────────────────────────────────────────

function fmt(v) {
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

function report(diffs, issues) {
  const total = diffs.VALUE_DRIFT.length + diffs.NEW_IN_FIGMA.length + diffs.MISSING_IN_FIGMA.length;
  const aliasBroken = issues.filter((i) => i.category === "ALIAS_BROKEN").length;

  console.log("");
  console.log("═══ sync-tokens-from-figma ═════════════════════════════");
  console.log(`VALUE_DRIFT      (mesmo nome, valor difere): ${diffs.VALUE_DRIFT.length}`);
  console.log(`NEW_IN_FIGMA     (Figma tem, JSON não):      ${diffs.NEW_IN_FIGMA.length}`);
  console.log(`MISSING_IN_FIGMA (JSON tem, Figma não):      ${diffs.MISSING_IN_FIGMA.length}`);
  console.log(`ALIAS_BROKEN     (Figma aponta pra órfão):   ${aliasBroken}`);
  console.log("═════════════════════════════════════════════════════════");

  const section = (title, items, format) => {
    if (!items.length) return;
    console.log(`\n┌ ${title} `.padEnd(60, "─"));
    for (const d of items.slice(0, 50)) console.log("  " + format(d));
    if (items.length > 50) console.log(`  ... +${items.length - 50} mais`);
  };

  section(
    "VALUE_DRIFT",
    diffs.VALUE_DRIFT,
    (d) => `${d.token}\n    Figma: ${fmt(d.figma)}\n    JSON:  ${fmt(d.json)}`
  );
  section(
    "NEW_IN_FIGMA (requer adição manual)",
    diffs.NEW_IN_FIGMA,
    (d) => `${d.token} = ${fmt(d.figma)} → ${d.file}`
  );
  section(
    "MISSING_IN_FIGMA (requer remoção manual ou adição no Figma)",
    diffs.MISSING_IN_FIGMA,
    (d) => `${d.token} (valor JSON: ${fmt(d.json)}) ← ${d.file}`
  );
  section(
    "ALIAS_BROKEN",
    issues.filter((i) => i.category === "ALIAS_BROKEN"),
    (i) => `${i.token}${i.mode ? ` (${i.mode})` : ""} → alvo: ${i.target}`
  );

  console.log("");
  return total;
}

// ─── Write ──────────────────────────────────────────────────────────────────

function applyValueDrifts(drifts) {
  const byFile = {};
  for (const d of drifts) (byFile[d.file] ||= []).push(d);

  for (const [relFile, fixes] of Object.entries(byFile)) {
    const abs = path.join(TOKENS_DIR, relFile);
    const json = JSON.parse(fs.readFileSync(abs, "utf8"));
    for (const fix of fixes) {
      const parts = fix.token.split(".");
      let cur = json;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cur || !(parts[i] in cur)) {
          console.warn(`  [skip] ${fix.token}: path ausente em ${relFile}`);
          cur = null;
          break;
        }
        cur = cur[parts[i]];
      }
      if (!cur) continue;
      const leaf = parts[parts.length - 1];
      if (!cur[leaf] || typeof cur[leaf] !== "object" || !("$value" in cur[leaf])) {
        console.warn(`  [skip] ${fix.token}: folha inválida em ${relFile}`);
        continue;
      }
      cur[leaf].$value = fix.figma;
    }
    fs.writeFileSync(abs, JSON.stringify(json, null, 2) + "\n");
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("Buscando Figma Variables...");
  const meta = await fetchFigmaVariables(FIGMA_PAT);
  console.log(
    `  ${Object.keys(meta.variables).length} variables em ${Object.keys(meta.variableCollections).length} collections`
  );

  console.log("Construindo estado esperado...");
  const { state: expected, issues } = buildExpectedState(meta);

  console.log("Lendo JSONs atuais...");
  const actual = readCurrentState(TOKENS_DIR);

  console.log("Comparando...");
  const diffs = compareStates(expected, actual);
  const total = report(diffs, issues);

  if (!isWrite) {
    if (total === 0) {
      console.log("Figma e JSON em dia.");
      process.exit(0);
    }
    console.log(
      `Dry-run: ${total} divergência(s). Use --write pra aplicar VALUE_DRIFT (${diffs.VALUE_DRIFT.length}).`
    );
    process.exit(1);
  }

  if (diffs.VALUE_DRIFT.length === 0) {
    console.log("Nada a aplicar (VALUE_DRIFT vazio).");
    if (diffs.NEW_IN_FIGMA.length || diffs.MISSING_IN_FIGMA.length) {
      console.log("Há pendências que exigem revisão manual — ver relatório acima.");
    }
    process.exit(0);
  }

  console.log(`Aplicando ${diffs.VALUE_DRIFT.length} VALUE_DRIFT(s)...`);
  applyValueDrifts(diffs.VALUE_DRIFT);

  for (const step of ["build:tokens", "sync:docs"]) {
    console.log(`Rodando npm run ${step}...`);
    const r = spawnSync("npm", ["run", step], { cwd: ROOT, stdio: "inherit" });
    if (r.status !== 0) {
      console.error(`${step} falhou.`);
      process.exit(2);
    }
  }

  console.log("");
  console.log("✅ VALUE_DRIFT aplicados. Revisar git diff antes de commitar.");
  if (diffs.NEW_IN_FIGMA.length || diffs.MISSING_IN_FIGMA.length) {
    console.log("⚠ Pendências NEW_IN_FIGMA / MISSING_IN_FIGMA exigem ação manual. Ver relatório.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
