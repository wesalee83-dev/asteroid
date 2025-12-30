import { spawnSync } from 'child_process'
import path from 'path'

export function mutate(state, mutationFn) {
  const pyPath = path.join(process.cwd(), 'mutations', 'mutate.py')
  const input = JSON.stringify(state)

  const result = spawnSync('python3', [pyPath, input], {
    encoding: 'utf8'
  })

  try {
    const output = JSON.parse(result.stdout)
    return {
      ...output,
      module: 'python',
      note: 'Mutation performed by Python bridge'
    }
  } catch (err) {
    console.error('Python mutation failed:', err.message)
    return {
      ...state,
      module: 'python',
      note: 'Python mutation failed'
    }
  }
}
