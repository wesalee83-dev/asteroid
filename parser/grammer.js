// grammar.js
// A simple, expandable rule set for Asteroid's parser

export const grammar = {
  commands: [
    /^run\s+/i,
    /^do\s+/i,
    /^start\s+/i,
    /^go\s+/i
  ],

  intentions: [
    /i need/i,
    /i want/i,
    /i should/i,
    /i gotta/i
  ],

  emotions: [
    /i feel/i,
    /i am\s+/i,
    /i'm\s+/i,
    /feeling/i
  ]
};
