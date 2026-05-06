const EXPECTED_FILE_KEY = "PRYS2kL7VdC1MtVWfZvuDN";

figma.showUI(__html__, {
  width: 560,
  height: 620,
  themeColors: true,
});

figma.ui.onmessage = async (message) => {
  if (!message || typeof message.type !== "string") return;

  if (message.type === "export-snapshot") {
    await exportSnapshot();
    return;
  }

  if (message.type === "close") {
    figma.closePlugin();
  }
};

exportSnapshot().catch((error) => {
  figma.ui.postMessage({
    type: "snapshot-error",
    message: error && error.message ? error.message : String(error),
  });
});

async function exportSnapshot() {
  figma.ui.postMessage({ type: "snapshot-status", message: "Lendo Variables locais..." });

  const [collections, variables] = await Promise.all([
    figma.variables.getLocalVariableCollectionsAsync(),
    figma.variables.getLocalVariablesAsync(),
  ]);

  const variableCollections = {};
  for (const collection of collections) {
    variableCollections[collection.id] = serializeCollection(collection);
  }

  const serializedVariables = {};
  for (const variable of variables) {
    serializedVariables[variable.id] = serializeVariable(variable);
  }

  const collectionCounts = countByCollection(variables, variableCollections);
  const snapshot = {
    generatedAt: new Date().toISOString(),
    generator: {
      name: "DS Core Snapshot Exporter",
      version: "0.1.0",
      source: "figma-plugin/snapshot-exporter",
    },
    fileKey: figma.fileKey || null,
    expectedFileKey: EXPECTED_FILE_KEY,
    fileName: figma.root.name,
    variableCollections,
    variables: serializedVariables,
  };

  figma.ui.postMessage({
    type: "snapshot-ready",
    snapshot,
    summary: {
      fileKey: snapshot.fileKey,
      expectedFileKey: EXPECTED_FILE_KEY,
      collectionCount: collections.length,
      variableCount: variables.length,
      collectionCounts,
      generatedAt: snapshot.generatedAt,
    },
  });
}

function serializeCollection(collection) {
  return {
    id: collection.id,
    key: collection.key || null,
    name: collection.name,
    modes: collection.modes.map((mode) => ({
      modeId: mode.modeId,
      name: mode.name,
    })),
    defaultModeId: collection.defaultModeId,
    hiddenFromPublishing: Boolean(collection.hiddenFromPublishing),
    remote: Boolean(collection.remote),
  };
}

function serializeVariable(variable) {
  const valuesByMode = {};
  for (const [modeId, value] of Object.entries(variable.valuesByMode)) {
    valuesByMode[modeId] = serializeValue(value);
  }

  return {
    id: variable.id,
    key: variable.key || null,
    name: variable.name,
    resolvedType: variable.resolvedType,
    variableCollectionId: variable.variableCollectionId,
    valuesByMode,
    description: variable.description || "",
    scopes: Array.isArray(variable.scopes) ? variable.scopes.slice() : [],
    hiddenFromPublishing: Boolean(variable.hiddenFromPublishing),
    remote: Boolean(variable.remote),
  };
}

function serializeValue(value) {
  if (value == null) return value;

  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }

  if (typeof value !== "object") {
    return value;
  }

  if (value.type === "VARIABLE_ALIAS") {
    return {
      type: "VARIABLE_ALIAS",
      id: value.id,
    };
  }

  if (typeof value.r === "number" && typeof value.g === "number" && typeof value.b === "number") {
    return {
      r: value.r,
      g: value.g,
      b: value.b,
      a: typeof value.a === "number" ? value.a : 1,
    };
  }

  const output = {};
  for (const [key, nestedValue] of Object.entries(value)) {
    output[key] = serializeValue(nestedValue);
  }
  return output;
}

function countByCollection(variables, collectionsById) {
  const counts = {};
  for (const variable of variables) {
    const collection = collectionsById[variable.variableCollectionId];
    const name = collection ? collection.name : variable.variableCollectionId;
    counts[name] = (counts[name] || 0) + 1;
  }
  return counts;
}
