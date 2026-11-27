// Entry program for the United States in Numbers site (Node 22, stdlib only).
// The site lives in app/ next to this file as plain static files — an
// index.html plus small ES modules and one stylesheet, no build step — and
// screenshots/ holds renders of it taken in a headless browser. This program
// hands the entry in: it copies app/ and screenshots/ into the output
// directory and writes dossier.json there, using buildDossier from the
// vendored make.fun frontend library (vendor/makefun-frontend.ts, unchanged).
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly instead of handing in an empty site if the folder is missing.
if (!existsSync(join(repoRoot, 'app', 'index.html'))) {
  throw new Error('app/index.html not found next to main.ts');
}

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
