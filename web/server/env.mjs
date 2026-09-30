import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

export async function loadLocalEnv(path) {
  if (!existsSync(path)) return;
  const contents = await readFile(path, 'utf8');
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || match[2] === '' || process.env[match[1]] !== undefined) continue;
    process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}