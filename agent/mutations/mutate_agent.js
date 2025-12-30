import { mutate } from './quip_engine.js';
import { tiers } from './lineage/tiers.js';
import fs from 'fs';

const statePath = './tools/agent_state.json';

// Load current state
const raw = fs.readFileSync(statePath, 'utf-8');
const state = JSON.parse(raw);

// --- evolution helpers (inlined) ---

const getTier = (level) => {
  if (level >= 1 && level <= 3) return "tier1";
  if (level >= 4 && level <= 6) return "tier2";
  if (level >= 7 && level <= 9) return "tier3";
  return null;
};

const evolutionGlyph = (level) => {
  const tierName = getTier(level);
  if (!tierName) return null;

  const pool = tiers[tierName];
  return pool[Math.floor(Math.random() * pool.length)];
};

const rollBurst = (glyph) => {
  if (!glyph) return;
  for (let i = 0; i < 3; i++) {
    if (Math.random() < 0.6) console.log(glyph);
  }
};

// Evolution ladder
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

  // evolution burst happens HERE
  const glyph = evolutionGlyph(next);
  rollBurst(glyph);

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
const mutated = mutate(state, mutation, `mutation->`);

// Save new state
fs.writeFileSync(statePath, JSON.stringify(mutated, null, 2));

// Speak the result
console.log(`Mutation complete. New form: ${mutated.persona}`);
