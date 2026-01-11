// classify.js
import { ClassificationResult } from "./schema/ClassificationResult.js";
import { FileRecord } from "./schema/FileRecord.js";

// Import your rules
import { DeadWeightRule } from "./rules/DeadWeightRule.js";
import { DuplicateRule } from "./rules/DuplicateRule.js";

// Add new rules here as the organism grows
const RULES = [
  new DeadWeightRule(),
  new DuplicateRule(),
];

export function classify(filePath, fileStats) {
  // Normalize the file into a FileRecord shape
  const record = new FileRecord({
    path: filePath,
    size: fileStats.size,
    modified: fileStats.mtime,
  });

  const notes = [];
  let category = null;
  let type = "unknown";

  // Run each rule in order
  for (const rule of RULES) {
    const result = rule.apply(record);

    if (!result) continue;

    // If a rule claims the file, we stop
    if (result.category) category = result.category;
    if (result.type) type = result.type;
    if (result.notes) notes.push(...result.notes);

    if (result.stop === true) break;
  }

  return new ClassificationResult({
    type,
    category,
    files: [record],
    notes,
  });
}
