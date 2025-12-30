import { mutate } from './quip_engine.js';
import fs from 'fs';

// Entry point for the pipeline
export function runPipeline(args) {
  console.log("Pipeline triggered with args:", args);

  const statePath = './agent_state.json';
  const raw = fs.readFileSync(statePath, 'utf-8');
  const currentState = JSON.parse(raw);

  // First mutation definition
  const firstMutation = (state) => ({
    ...state,
    lineage: [...state.lineage, state.persona || "Unknown-Form"],
    persona: "Opportuna-Scuttle",
    mutations: state.mutations + 1,
    last_mutation: new Date().toISOString(),
    mode: "active"
  });

  // Preview next form
  if (args.includes("--next")) {
    const next = currentState.mutations + 1;
    console.log("Next form would be:", `Opportuna-Form-${next}`);
    return;
  }

  // Dry run (no write)
  if (args.includes("--dry")) {
    const simulated = mutate(currentState, firstMutation, "first-mutation");
    console.log("Dry run result:", simulated);
    return;
  }

  // Actual mutation
  const mutated = mutate(currentState, firstMutation, "first-mutation");
  fs.writeFileSync(statePath, JSON.stringify(mutated, null, 2));

  console.log("Mutation complete. New state written:");
  console.log(mutated);
}
