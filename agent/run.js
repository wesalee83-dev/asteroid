import fs from 'fs'
import path from 'path'
import { loadModules } from './modules.js'

const logPath = path.join(process.cwd(), 'logs', 'saga_tales.log')

function logMutation(moduleName, result) {
  const entry = `[${new Date().toISOString()}] ${moduleName}: ${JSON.stringify(result)}\n`
  fs.appendFileSync(logPath, entry)
}

async function main() {
  const modules = await loadModules()
  const names = Object.keys(modules)

  console.log('Loaded modules:', names)

  let state = { value: 1 }

  // Each module can have its own personality
  const mutationFns = {
    '-y': s => ({ value: s.value + 1 }),
    '-z': s => ({ value: s.value * 2 }),
    'python': s => ({ value: s.value - 1 })
  }

  for (const name of names) {
    const mod = modules[name]
    const mutationFn = mutationFns[name] || (s => s) // default: no change
    state = mod.mutate(state, mutationFn)
    console.log(`After ${name}:`, state)
    logMutation(name, state)
  }

  console.log('Final state:', state)
}

main()
