import { mutate } from '../mutate.js';
import { emitCodex } from './codexEmitter.js';

const args = process.argv.slice(2);
const result = mutate(args);

const fragment = emitCodex({
  ritual: 'seed',
  context_preview: args.join(' ').slice(0, 80),
  result_type: typeof result,
  tags: ['seed', 'entrypoint', 'mutation'],
});

console.log('Seed ritual complete:', fragment);
