import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexFile = path.join(distDir, 'index.html');
const fallbackFile = path.join(distDir, '404.html');

await mkdir(distDir, { recursive: true });
await copyFile(indexFile, fallbackFile);

console.log('GitHub Pages SPA fallback generated at dist/404.html');
