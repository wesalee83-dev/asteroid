import { spawnSync } from 'child_process';
import { emitCodex } from './codexEmitter.js';
import path from 'path';

const args = process.argv.slice(2);

// Resolve mutate.py inside agent/mutations/
const mutatePath = path.resolve('../mutations/mutate.py');

// Run mutate.py with all arguments
const result = spawnSync('python3', [mutatePath, ...args], {
  encoding: 'utf-8',
});

const fragment = emitCodex({
  ritual: 'seed',
  context_preview: args.join(' ').slice(0, 80),
  result_type: 'mutation_result',
  tags: ['seed', 'entrypoint', 'mutation'],
});

console.log('Seed ritual complete:', {
  ...fragment,
  stdout: result.stdout.trim(),
  stderr: result.stderr.trim(),
  status: result.status,
});
