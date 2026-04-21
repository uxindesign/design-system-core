#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFigmaSnapshot, buildExpectedState, readCurrentState, compareStates } from "./scripts/lib/figma-dtcg.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const meta = readFigmaSnapshot(path.join(__dirname, ".figma-snapshot.json"));
const { state: expected } = buildExpectedState(meta);
const actual = readCurrentState(path.join(__dirname, "tokens"));
const diffs = compareStates(expected, actual);

const isAlias = (v) => typeof v === "string" && /^\{.+\}$/.test(v);

// Category B only for component/*
const bComponent = diffs.VALUE_DRIFT.filter(d =>
  d.file.startsWith("component/") && !isAlias(d.figma) && isAlias(d.json)
);
const bComponentAlias = diffs.VALUE_DRIFT.filter(d =>
  d.file.startsWith("component/") && isAlias(d.figma) && isAlias(d.json)
);
const newInFigmaComp = diffs.NEW_IN_FIGMA.filter(d => d.file.startsWith("component/"));
const missingInFigmaComp = diffs.MISSING_IN_FIGMA.filter(d => d.file.startsWith("component/"));

console.log("Component — categoria B (literal → alias):", bComponent.length);
for (const d of bComponent) console.log(`  ${d.token}  Figma: ${JSON.stringify(d.figma)} | JSON: ${d.json}`);
console.log("\nComponent — alias retargeting (A/C):", bComponentAlias.length);
for (const d of bComponentAlias) console.log(`  ${d.token}  Figma: ${d.figma} | JSON: ${d.json}`);
console.log("\nComponent NEW_IN_FIGMA:", newInFigmaComp.length);
for (const d of newInFigmaComp) console.log(`  ${d.token} = ${d.figma}`);
console.log("\nComponent MISSING_IN_FIGMA:", missingInFigmaComp.length);
for (const d of missingInFigmaComp) console.log(`  ${d.token} (JSON: ${d.json})`);
