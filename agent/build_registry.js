import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const agentDir = __dirname;
const mutations = scanDirectory(mutationsDir, "mutations");
const helpers = scanDirectory(path.join(agentDir, "helpers"), "helpers");
const registryPath = path.join(agentDir, "modules.json");

function scanDirectory(dir, baseLabel) {
  const entries = {};

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) continue;

    const ext = path.extname(item);
    const name = path.basename(item, ext);

    if (ext === ".js" || ext === ".py") {
      const label = baseLabel ? `${baseLabel}/${name}` : name;
      entries[label] = {
        path: full,
        type: ext.slice(1),
        status: "active"
      };
    }
  }

  return entries;
}

function buildRegistry() {
  const registry = {
    ...scanDirectory(agentDir, null),
    ...scanDirectory(mutationsDir, "mutations")
  };

  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  console.log("modules.json updated with", Object.keys(registry).length, "entries.");
}

buildRegistry();
