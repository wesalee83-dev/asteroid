#!/usr/bin/env node

const { normalize } = require('./core/normalize');
const { validate } = require('./core/validate');
const { enrich } = require('./core/enrich');
const { run } = require('./pipeline/run');
const helpText = require('./help');

const [,, command, payload, ...flags] = process.argv;
const verbose = flags.includes('--verbose') || flags.includes('-v');

function showHelp() {
  console.log(helpText);
}

if (flags.includes('--help') || flags.includes('-h') || !command) {
  showHelp();
  process.exit(0);
}

if (verbose) console.log("ASTEROID CLI STARTED");

try {
  const data = payload ? JSON.parse(payload) : {};
  let mode = "full";
  if (flags.includes('--parsed') || flags.includes('-1')) mode = "parsed";
  if (flags.includes('--enriched') || flags.includes('-2')) mode = "enriched";

  let state;

  switch (command) {
    case "process":
      state = run(data, verbose, mode);
      console.log(JSON.stringify(state, null, 2));
      break;

    case "validate":
      state = validate(normalize(data, verbose), verbose);
      console.log(JSON.stringify(state, null, 2));
      break;

    case "enrich":
      state = enrich(validate(normalize(data, verbose), verbose), verbose);
      console.log(JSON.stringify(state, null, 2));
      break;

    default:
      console.error("Unknown command:", command);
      showHelp();
      process.exit(1);
  }
} catch (err) {
  console.error("Error parsing JSON:", err.message);
  process.exit(1);
}
