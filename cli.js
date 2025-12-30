import path from 'path'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function main(args) {
  const cmd = args[0]

  switch (cmd) {
    case 'mutate':
      runAgent([])
      break

    case 'next':
      runAgent(['--next'])
      break

    case 'dry':
      runAgent(['--dry'])
      break

    case 'quip':
      runAgent(['--quip'])
      break

    case 'log':
      runAgent(['--log', args[1] || '10'])
      break

    case 'evolve':
      runRegistry()
      break

    default:
      console.log('Asteroid commands:')
      console.log('  asteroid mutate')
      console.log('  asteroid next')
      console.log('  asteroid dry')
      console.log('  asteroid quip')
      console.log('  asteroid log [n]')
      console.log('  asteroid evolve')
      break
  }
}

function runAgent(flags) {
  const runPath = path.join(__dirname, 'agent/run.js')
  spawn('node', [runPath, ...flags], { stdio: 'inherit' })
}

function runRegistry() {
  const regPath = path.join(__dirname, 'agent/build_registry.js')
  spawn('node', [regPath], { stdio: 'inherit' })
}
