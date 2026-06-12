#!/usr/bin/env node
/**
 * verify-figma-structure — valida invariantes estruturais do Figma exportadas
 * pelo snapshot exporter. Este gate não substitui revisão visual; ele bloqueia
 * regressões objetivas que já causaram retrabalho: glyph/Icon Placeholder,
 * bindings de ícone sem Component token, Component → Foundation, ALL_SCOPES,
 * WEB code syntax ausente e naming legado.
 *
 * Uso:
 *   node scripts/verify-figma-structure.mjs
 *   node scripts/verify-figma-structure.mjs --snapshot .figma-snapshot.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log("Uso: node scripts/verify-figma-structure.mjs [--snapshot .figma-snapshot.json]");
  process.exit(0);
}

const snapshotArgIndex = args.indexOf("--snapshot");
const snapshotPath = snapshotArgIndex >= 0
  ? path.resolve(ROOT, args[snapshotArgIndex + 1] || "")
  : path.join(ROOT, ".figma-snapshot.json");

if (!fs.existsSync(snapshotPath)) {
  console.error(`Figma snapshot não encontrado: ${path.relative(ROOT, snapshotPath)}`);
  console.error("Gere o snapshot pelo Figma plugin atualizado antes de rodar este gate.");
  process.exit(2);
}

let snapshot;
try {
  snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
} catch (error) {
  console.error(`Snapshot inválido: ${error.message}`);
  process.exit(2);
}

const issues = [];
const variables = Object.values(snapshot.variables || {});
const collectionsById = snapshot.variableCollections || {};
const variablesById = new Map(variables.map((variable) => [variable.id, variable]));
const collectionNameById = new Map(
  Object.entries(collectionsById).map(([id, collection]) => [id, collection.name])
);

if (variables.length === 0) {
  issues.push(issue("snapshot", "missing-variables", "snapshot", "Snapshot não contém variables."));
}

if (Object.keys(collectionsById).length === 0) {
  issues.push(issue("snapshot", "missing-variable-collections", "snapshot", "Snapshot não contém variableCollections."));
}

if (!snapshot.structureAudit) {
  issues.push(issue(
    "snapshot",
    "missing-structure-audit",
    "snapshot",
    "Snapshot não contém structureAudit. Gere novo snapshot com figma-plugin/snapshot-exporter atualizado."
  ));
}

auditVariables(variables, variablesById, collectionNameById, issues);

const structureIssues = Array.isArray(snapshot.structureAudit?.issues)
  ? snapshot.structureAudit.issues
  : [];
const declaredStructureIssueCount = Number(snapshot.structureAudit?.issueCount || 0);

if (declaredStructureIssueCount > 0 && structureIssues.length === 0) {
  issues.push(issue(
    "snapshot",
    "structure-audit-declared-issues",
    "snapshot",
    `structureAudit declarou ${declaredStructureIssueCount} issue(s), mas não trouxe a lista de ocorrências.`
  ));
}

for (const structureIssue of structureIssues) {
  issues.push({
    scope: structureIssue.scope || "figma",
    code: structureIssue.code || "structure-issue",
    target: structureIssue.target || "unknown",
    message: formatStructureIssue(structureIssue),
  });
}

if (snapshot.structureAudit?.truncated) {
  issues.push(issue(
    "snapshot",
    "structure-audit-truncated",
    "snapshot",
    "structureAudit foi truncado; corrija os primeiros problemas e gere novo snapshot."
  ));
}

const grouped = groupIssues(issues);

console.log("");
console.log("═══ verify-figma-structure ═════════════════════════════════");
console.log("");
console.log(`snapshot:        ${path.relative(ROOT, snapshotPath)}`);
console.log(`generatedAt:     ${snapshot.generatedAt || "?"}`);
console.log(`variables:       ${variables.length}`);
console.log(`component pages: ${snapshot.structureAudit?.componentPageCount ?? "?"}`);
console.log(`issues:          ${issues.length}`);
console.log("");

if (issues.length > 0) {
  console.log("Issues por tipo:");
  for (const [code, count] of Object.entries(grouped).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    console.log(`  ${code}: ${count}`);
  }
  console.log("");
  console.log("Primeiras ocorrências:");
  for (const item of issues.slice(0, 40)) {
    console.log(`  [${item.code}] ${item.target}`);
    if (item.message) console.log(`    ${item.message}`);
  }
  console.log("");
  process.exit(1);
}

console.log("✓ Estrutura Figma válida para as invariantes automatizadas.");
console.log("");

function auditVariables(allVariables, variableById, collectionById, out) {
  for (const variable of allVariables) {
    const collection = collectionById.get(variable.variableCollectionId) || "";
    const syntax = variable.codeSyntax || {};

    if (!syntax.WEB) {
      out.push(issue("variable", "missing-web-syntax", variable.name, `Collection: ${collection}`));
    }

    if (Array.isArray(variable.scopes) && variable.scopes.includes("ALL_SCOPES")) {
      out.push(issue("variable", "all-scopes", variable.name, `Collection: ${collection}`));
    }

    if (/\bglyph\b/i.test(variable.name)) {
      out.push(issue("variable", "legacy-glyph-name", variable.name, `Collection: ${collection}`));
    }

    if (variable.name.includes("error-hover")) {
      out.push(issue("variable", "legacy-error-hover-name", variable.name, "Use error/hover."));
    }

    if (variable.name.includes("danger") && !variable.name.startsWith("button/")) {
      out.push(issue("variable", "danger-outside-button", variable.name, "Use error para feedback/validação."));
    }

    for (const [modeId, value] of Object.entries(variable.valuesByMode || {})) {
      if (!value || value.type !== "VARIABLE_ALIAS") {
        if (collection === "Component") {
          out.push(issue("variable", "component-raw-value", variable.name, `Mode: ${modeId}`));
        }
        if (collection === "Semantic") {
          out.push(issue("variable", "semantic-raw-value", variable.name, `Mode: ${modeId}`));
        }
        continue;
      }

      const target = variableById.get(value.id);
      const targetCollection = target ? collectionById.get(target.variableCollectionId) || "" : "missing";

      if (!target) {
        out.push(issue("variable", "missing-alias-target", variable.name, `Mode: ${modeId}; target id: ${value.id}`));
        continue;
      }

      if (collection === "Component" && targetCollection !== "Semantic") {
        out.push(issue(
          "variable",
          "component-alias-not-semantic",
          variable.name,
          `Mode: ${modeId}; target: ${target.name}; target collection: ${targetCollection}`
        ));
      }

      if (collection === "Semantic" && targetCollection === "Component") {
        out.push(issue(
          "variable",
          "semantic-alias-component",
          variable.name,
          `Mode: ${modeId}; target: ${target.name}`
        ));
      }

      auditComponentAlias(variable.name, target.name, modeId, out);
    }
  }
}

function auditComponentAlias(sourceName, targetName, modeId, out) {
  if (!sourceName.includes("/")) return;

  if (sourceName.includes("/icon/color/") && !targetName.startsWith("icon/color/")) {
    out.push(issue("variable", "component-icon-color-alias", sourceName, `Mode: ${modeId}; target: ${targetName}`));
  }

  if (sourceName.includes("/border-color/") && !/^(border|primary\/border)\//.test(targetName)) {
    out.push(issue("variable", "component-border-color-alias", sourceName, `Mode: ${modeId}; target: ${targetName}`));
  }

  if (sourceName.includes("/focus-ring/color/") && !targetName.startsWith("focus-ring/color/")) {
    out.push(issue("variable", "component-focus-ring-color-alias", sourceName, `Mode: ${modeId}; target: ${targetName}`));
  }

  if (sourceName.includes("/bg/") && !/^(background|surface|overlay|primary\/background|feedback)\//.test(targetName)) {
    out.push(issue("variable", "component-background-alias", sourceName, `Mode: ${modeId}; target: ${targetName}`));
  }
}

function formatStructureIssue(item) {
  const details = item.details || {};
  const parts = [];
  if (details.pageName) parts.push(`page: ${details.pageName}`);
  if (details.nodeId) parts.push(`node: ${details.nodeId}`);
  if (details.mainComponent) parts.push(`main: ${details.mainComponent}`);
  if (details.binding?.name) parts.push(`binding: ${details.binding.name}`);
  if (details.binding?.collection) parts.push(`collection: ${details.binding.collection}`);
  if (details.target) parts.push(`target: ${details.target}`);
  if (details.targetCollection) parts.push(`target collection: ${details.targetCollection}`);
  return parts.join("; ");
}

function groupIssues(items) {
  const grouped = {};
  for (const item of items) {
    grouped[item.code] = (grouped[item.code] || 0) + 1;
  }
  return grouped;
}

function issue(scope, code, target, message) {
  return { scope, code, target, message };
}
