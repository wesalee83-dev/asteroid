import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { quips } from "./quips.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Path to the saga log (inside the agent chamber)
const logPath = path.join(__dirname, "logs", "saga_tales.log");

// ------------------------------------------------------------
// QUIP: prints a quip from a category
// ------------------------------------------------------------
export function quip(type = "mutate") {
  const list = quips[type] || [];
  if (list.length === 0) return;

  const line = list[Math.floor(Math.random() * list.length)];
  console.log(line);
}

// ------------------------------------------------------------
// LOG: writes a line to saga_tales.log
// ------------------------------------------------------------
export function logEvent(text) {
  try {
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${text}\n`);
  } catch (err) {
    console.error("Failed to write to saga_tales.log:", err);
  }
}

// ------------------------------------------------------------
// ERROR HANDLER: logs error + prints failed attempt quip
// ------------------------------------------------------------
export function handleError(err) {
  quip("failed_attempt");
  logEvent(`ERROR: ${err.message || err}`);
  throw err;
}

// ------------------------------------------------------------
// MUTATE: core mutation ritual
// ------------------------------------------------------------
export function mutate(state, transformFn, label = "mutation") {
  quip("mutate");

  let result;
  try {
    result = transformFn(state);
  } catch (err) {
    handleError(err);
  }

  logEvent(`<${label}> ${JSON.stringify(result)}`);
  return result;
}
