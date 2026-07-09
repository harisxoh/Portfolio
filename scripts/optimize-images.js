import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const root = path.resolve(process.cwd(), 'public');
const targetDirs = ['images', 'design', 'img'];
const supported = ['.png', '.jpg', '.jpeg', '.webp'];

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!supported.includes(ext)) return;

  const rel = path.relative(root, filePath);
  const outputDir = path.dirname(filePath);
  const parsed = path.parse(filePath);
  const outputFile = path.join(outputDir, `${parsed.name}.webp`);

  if (fs.existsSync(outputFile)) return;

  try {
    await sharp(filePath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(outputFile);
    console.log(`Optimized: ${rel} -> ${path.relative(root, outputFile)}`);
  } catch (error) {
    console.error(`Failed optimizing ${rel}:`, error);
  }
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(entryPath);
      return;
    }
    await optimizeFile(entryPath);
  }));
}

(async () => {
  for (const dir of targetDirs) {
    const full = path.join(root, dir);
    if (!fs.existsSync(full)) continue;
    await walk(full);
  }
})();
