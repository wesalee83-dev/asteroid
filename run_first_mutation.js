import { mutate } from './quip_engine.js';
import fs from 'fs';

const statePath = './tools/agent_state.json';
const raw = fs.readFileSync(statePath, 'utf-8');
const currentState = JSON.parse(raw);

const firstMutation = (state) => {
  return {
    ...state,
    lineage: [...state.lineage, state.persona],
    persona: "Opportuna-Scuttle",
    mutations: state.mutations + 1,
    last_mutation: new Date().toISOString(),
    mode: "active"
  };
};

const mutated = mutate(currentState, firstMutation, "first-evolution");

fs.writeFileSync(statePath, JSON.stringify(mutated, null, 2));
