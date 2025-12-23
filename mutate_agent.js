import { mutate } from './quip_engine.js';
import fs from 'fs';

const statePath = './tools/agent_state.json';

// Load current state
const raw = fs.readFileSync(statePath, 'utf-8');
const state = JSON.parse(raw);

// Define the evolution ladder
const nextForm = {
  0: "Opportuna-Sprout",
  1: "Opportuna-Scuttle",
  2: "Opportuna-Scuttle-Prime",
  3: "Opportunaut",
  4: "Opportunavore",
  5: "Opportuna-Ascendant"
};

// Mutation logic
const mutation = (s) => {
  const next = s.mutations + 1;

  return {
    ...s,
    lineage: [...s.lineage, s.persona],
    persona: nextForm[next] || `Opportuna-Form-${next}`,
    mutations: next,
    last_mutation: new Date().toISOString(),
    mode: "active"
  };
};

// Run mutation ritual
const mutated = mutate(state, mutation, `mutation-${state.mutations + 1}`);

// Save new state
fs.writeFileSync(statePath, JSON.stringify(mutated, null, 2));

// Speak the result
console.log(`Mutation complete. New form: ${mutated.persona}`);
