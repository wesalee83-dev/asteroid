import happypillz from '../../Asteroid/happypillz.js';
import { emitCodex } from './codexEmitter.js';

export function helpeR2D(context) {
  const started = Date.now();

  const result = happypillz(context);

  const finished = Date.now();
  const duration = finished - started;

  const fragment = emitCodex({
    ritual: 'helpeR2D',
    duration_ms: duration,
    context_preview:
      typeof context === 'string'
        ? context.slice(0, 80)
        : 'non-string context',
    result_type: typeof result,
  });

  return {
    ...fragment,
    result,
  };
}
