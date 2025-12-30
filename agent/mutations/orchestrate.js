import { runMutation } from "../run.js";
import { buildRegistry } from "../build_registry.js";

async function main() {
  await runMutation();
  buildRegistry();
}

main();
