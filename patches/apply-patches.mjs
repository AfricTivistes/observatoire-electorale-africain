/**
 * Post-install script: applies the rate-limited astro-nocodb patch.
 * This runs after every `npm install` to ensure the patched loader
 * is always in place, even after dependency updates.
 */
import { copyFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, 'astro-nocodb-loaders.ts');
const dest = resolve(__dirname, '..', 'node_modules', 'astro-nocodb', 'loaders.ts');

if (existsSync(src)) {
  copyFileSync(src, dest);
  console.log('[patch] Applied rate-limited astro-nocodb loader.');
} else {
  console.warn('[patch] Patch source not found:', src);
}
