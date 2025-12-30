import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { quip } from "./agent_helper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const args = process.argv.slice(2);

// -----------------------------
// Flag helpers
// -----------------------------
function hasFlag(flag) {
  return args.includes(flag);
}

function getValue(flag) {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
}

// -----------------------------
// Polly narrator
// -----------------------------
function polly(msg) {
  const lines = [
    "Lovely mutation ahead.",
    "Everything is going well.",
    "The lineage grows stronger.",
    "A fine moment for transformation.",
    "Errors are just funny opportunities.",
    "Exciting times in the codex.",
    "Another step forward for the creature."
  ];
  const line = lines[Math.floor(Math.random() * lines.length)];
  console.log(`Pollyanna: ${line} (${msg})`);
}

// -----------------------------
// Paths
// -----------------------------
const statePath = path.join(__dirname, "agent_state.json");
const logPath = path.join(__dirname, "logs", "saga_tales.log");
const registryPath = path.join(__dirname, "modules.json");

// -----------------------------
// Load state and registry
// -----------------------------
polly("Reading agent state");
const raw = fs.readFileSync(statePath, "utf-8");
const state = JSON.parse(raw);

const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
const mutatePath = path.join(__dirname, "..", registry.mutations["mutate_agent"]);
const { mutate } = await import(mutatePath);

// -----------------------------
// Persona map
// -----------------------------
const nextForm = {
  0: "Opportuna-Sprout",
  1: "Opportuna-Scuttle",
  2: "Opportuna-Scuttle-Prime",
  3: "Opportunaut",
  4: "Opportunavore",
  5: "Opportuna-Ascendant"
};

// -----------------------------
// Mutation function
// -----------------------------
const mutation = (s) => {
  const next = Number(s.mutations || 0) + 1;

  return {
    ...s,
    lineage: [...(s.lineage || []), s.persona],
    persona: nextForm[next] || `Opportuna-Form-${next}`,
    mutations: next,
    last_mutation: new Date().toISOString(),
    mode: "active"
  };
};

// -----------------------------
// CLI Modes
// -----------------------------
if (hasFlag("--next")) {
  const next = Number(state.mutations || 0) + 1;
  console.log("Next form would be:", nextForm[next] || `Opportuna-Form-${next}`);
  process.exit(0);
}

if (hasFlag("--dry")) {
  console.log("Dry run: mutation simulated, no state written.");
  const simulated = mutation(state);
  console.log(simulated);
  process.exit(0);
}

if (hasFlag("--quip")) {
  console.log("Quip mode:");
  quip("rest", 0);
  process.exit(0);
}

if (hasFlag("--log")) {
  const last = Number(getValue("--log") || 10);
  const lines = fs.readFileSync(logPath, "utf-8").trim().split("\n");
  console.log(lines.slice(-last).join("\n"));
  process.exit(0);
}

// -----------------------------
// Perform mutation
// -----------------------------
polly("Applying mutation");
const mutated = mutate(state, mutation, `mutation-${state.mutations || 0}`);

// -----------------------------
// Save new state
// -----------------------------
polly("Saving new form");
fs.writeFileSync(statePath, JSON.stringify(mutated, null, 2));

// -----------------------------
// Log saga entry
// -----------------------------
const entry = `[${new Date().toISOString()}] Mutation → ${mutated.persona}`;
fs.appendFileSync(logPath, entry + "\n");

// -----------------------------
// Done
// -----------------------------
polly("Pipeline complete");
console.log(`Pipeline complete. New form: ${mutated.persona}`);
