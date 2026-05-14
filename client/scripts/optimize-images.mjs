#!/usr/bin/env node
// One-time script: compresses apartment images in place (1200px/q80)
// and generates _thumb variants (400px/q70) for carousel + thumbnails.
// Run from client/: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const APARTMENTS_DIR = fileURLToPath(
  new URL("../public/images/apartments", import.meta.url)
);
const FULL_WIDTH = 1200;
const THUMB_WIDTH = 400;
const FULL_QUALITY = 80;
const THUMB_QUALITY = 70;

function findWebp(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) results.push(...findWebp(full));
    else if (full.endsWith(".webp") && !full.endsWith("_thumb.webp"))
      results.push(full);
  }
  return results;
}

async function processImage(file) {
  const thumbPath = file.replace(/\.webp$/, "_thumb.webp");
  const img = sharp(file);

  // Generate thumb from original source (better quality basis)
  await img
    .clone()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: THUMB_QUALITY })
    .toFile(thumbPath);

  // Compress original in place
  const compressed = await img
    .clone()
    .resize({ width: FULL_WIDTH, withoutEnlargement: true })
    .webp({ quality: FULL_QUALITY })
    .toBuffer();
  await writeFile(file, compressed);
}

const files = findWebp(APARTMENTS_DIR);
console.log(`Found ${files.length} images to process...`);

let done = 0;
for (const file of files) {
  await processImage(file);
  done++;
  const rel = file.replace(APARTMENTS_DIR + "/", "");
  process.stdout.write(`\r[${done}/${files.length}] ${rel.padEnd(60)}`);
}
console.log(`\nDone.`);
