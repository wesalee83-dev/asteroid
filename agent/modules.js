let existing = {};
try {
  existing = JSON.parse(fs.readFileSync(registryPath, "utf-8"));
} catch (e) {
  existing = { mutations: {}, helpers: {} };
}

const mutations = scanDirectory(mutationsDir, "mutations");
const helpers = scanDirectory(path.join(agentDir, "helpers"), "helpers");

for (const key in mutations) {
  const name = mutations[key].name;
  existing.mutations[name] = mutations[key].path;
}
for (const key in helpers) {
  const name = helpers[key].name;
  existing.helpers[name] = helpers[key].path;
}

fs.writeFileSync(registryPath, JSON.stringify(existing, null, 2));
console.log("Registry updated:", registryPath);
