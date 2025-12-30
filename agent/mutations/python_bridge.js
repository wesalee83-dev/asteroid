import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function pythonMutation(state) {
  const script = path.join(__dirname, "python.py");

  const result = spawnSync("python", [script], {
    input: JSON.stringify(state),
    encoding: "utf8"
  });

  if (result.error) throw result.error;
  if (result.stderr) console.error(result.stderr);

  return JSON.parse(result.stdout);
}
