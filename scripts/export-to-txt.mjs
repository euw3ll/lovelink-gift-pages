import { promises as fs, createWriteStream } from "fs";
import path from "path";

const projectRoot = path.resolve(process.cwd());
const outputDir = path.join(projectRoot, "txt-export");
const outputFile = path.join(outputDir, "project.txt");

// Folders to ignore
const ignoredDirs = new Set([
  "node_modules",
  ".git",
  ".vscode",
  "dist",
  "dist-ssr",
  "txt-export",
]);

// Common binary / non-text extensions to skip
const binaryExts = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".svgz",
  ".mp4",
  ".mov",
  ".mkv",
  ".webm",
  ".mp3",
  ".wav",
  ".ogg",
  ".pdf",
  ".zip",
  ".gz",
  ".bz2",
  ".7z",
  ".rar",
  ".ico",
  ".icns",
  ".ttf",
  ".otf",
  ".woff",
  ".woff2",
  ".eot",
  ".exe",
  ".dmg",
  ".so",
  ".dll",
  ".class",
  ".jar",
]);

/**
 * Helper to write to a stream respecting backpressure.
 */
function writeStream(stream, chunk) {
  return new Promise((resolve) => {
    if (stream.write(chunk, "utf8")) return resolve();
    stream.once("drain", resolve);
  });
}

/**
 * Recursively walks the project and appends each text file into a single .txt
 */
async function exportDir(dir, ws) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    // Skip ignored directories
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await exportDir(fullPath, ws);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();

      // Skip binary-ish files by extension
      if (binaryExts.has(ext)) continue;

      const relative = path.relative(projectRoot, fullPath);

      try {
        const content = await fs.readFile(fullPath, "utf8");

        // Simple binary guard: skip files containing NUL
        if (content.includes("\u0000")) continue;

        const header = `==================== FILE: ${relative} ====================

`;
        const footer = `

================== END FILE: ${relative} ==================

`;

        await writeStream(ws, header);
        await writeStream(ws, content);
        await writeStream(ws, footer);
      } catch (err) {
        // If reading as utf8 fails, skip the file quietly
        // (useful for unexpected binaries)
        continue;
      }
    }
  }
}

async function main() {
  // Clean and prepare output dir
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  const ws = createWriteStream(outputFile, { encoding: "utf8" });

  const banner = `PROJECT ROOT: ${projectRoot}
DATE: ${new Date().toISOString()}

===== BEGIN PROJECT CONCATENATION =====

`;
  await writeStream(ws, banner);

  await exportDir(projectRoot, ws);

  await writeStream(ws, `\n===== END PROJECT CONCATENATION =====\n`);
  await new Promise((resolve) => ws.end(resolve));

  console.log(`Export complete: ${outputFile}`);
}

await main();
