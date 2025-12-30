import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to modules.json
const registryPath = path.join(__dirname, 'modules.json')

// Load module list
const moduleNames = JSON.parse(fs.readFileSync(registryPath, 'utf8'))

// Resolve each module into a usable object
export function loadModules() {
  const modules = {}

  for (const name of moduleNames) {
    const moduleDir = path.join(__dirname, 'modules', name)
    const entry = path.join(moduleDir, 'index.js')

    try {
      // Dynamically import the module
      const mod = fs.existsSync(entry)
        ? import(entry)
        : null

      modules[name] = {
        name,
        path: moduleDir,
        entry,
        loader: mod
      }
    } catch (err) {
      console.error(`Failed to load module "${name}":`, err.message)
    }
  }

  return modules
}
