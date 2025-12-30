import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Paths
const modulesJsonPath = path.join(__dirname, 'modules.json')
const registryPath = path.join(__dirname, 'registry.json')
const modulesDir = path.join(__dirname, 'modules')

// Load module list
const moduleNames = JSON.parse(fs.readFileSync(modulesJsonPath, 'utf8'))

// Build registry
export function buildRegistry() {
  const registry = {}

  for (const name of moduleNames) {
    const moduleDir = path.join(modulesDir, name)
    const entry = path.join(moduleDir, 'index.js')

    if (!fs.existsSync(moduleDir)) {
      console.warn(`Warning: Module folder missing: ${name}`)
      continue
    }

    if (!fs.existsSync(entry)) {
      console.warn(`Warning: Module entry missing: ${entry}`)
      continue
    }

    registry[name] = {
      name,
      path: moduleDir,
      entry
    }
  }

  // Write registry.json
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2))

  console.log('Registry rebuilt.')
  console.log(`Modules found: ${Object.keys(registry).join(', ')}`)
}

// Auto-run if executed directly
if (process.argv[1] === __filename) {
  buildRegistry()
}
