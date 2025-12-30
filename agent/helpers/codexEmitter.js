import fs from 'fs';
import path from 'path';

export function emitCodex(fragment) {
  const enriched = {
    ...fragment,
    timestamp: new Date().toISOString(),
    tags: Array.isArray(fragment.tags) ? fragment.tags : [],
  };

  const logPath = path.resolve('./saga_tales.log');
  fs.appendFileSync(logPath, JSON.stringify(enriched) + '\n');

  return enriched;
}
