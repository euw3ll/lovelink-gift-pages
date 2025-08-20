#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const projectRoot = path.resolve(process.cwd());
const outputDir = path.join(projectRoot, 'txt-export');
const ignored = new Set(['node_modules', '.git', '.vscode', 'dist', 'dist-ssr', 'txt-export']);

async function exportDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await exportDir(fullPath);
    } else if (entry.isFile()) {
      const relative = path.relative(projectRoot, fullPath);
      const outPath = path.join(outputDir, relative + '.txt');
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      const content = await fs.readFile(fullPath, 'utf8');
      await fs.writeFile(outPath, content, 'utf8');
    }
  }
}

await fs.rm(outputDir, { recursive: true, force: true });
await fs.mkdir(outputDir, { recursive: true });
await exportDir(projectRoot);
