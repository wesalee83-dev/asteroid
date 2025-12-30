import { classify } from './classify.js';

export function parse(input) {
  const text = String(input || "").trim();

  return {
    raw: input,
    normalized: text,
    type: classify(text),
    timestamp: Date.now()
  };
}
