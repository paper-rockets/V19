import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.join(ROOT_DIR, 'screenshots');
const OUT_PUBLIC = path.join(ROOT_DIR, 'public', 'screenshots-manifest.json');
const OUT_MOODBOARD = path.join(ROOT_DIR, 'moodboard', 'screenshots-manifest.json');

function titleFromFilename(filename) {
  let name = filename.replace(/\.[^/.]+$/, "");
  name = name.replace(/^(\d+[\w]*_)+/, ""); // remove prefix numbers like 01_ or stroke_01_
  name = name.replace(/_/g, " ");
  return name.replace(/\b\w/g, c => c.toUpperCase());
}

function categorize(relPath) {
  const normalized = relPath.replace(/\\/g, '/').toLowerCase();
  
  if (normalized.includes('brush_strokes')) {
    return {
      sectionId: 'brush_strokes',
      sectionTitle: 'Brush Strokes on Canvas',
      category: 'Brushes'
    };
  }
  if (normalized.includes('universal_modals') || normalized.includes('modal') || normalized.includes('sheet') || normalized.includes('importer')) {
    return {
      sectionId: 'universal_modals',
      sectionTitle: 'Universal Modals & Studios',
      category: 'Modals'
    };
  }
  if (normalized.includes('pro_mode') || normalized.includes('pro_rail') || normalized.includes('pro_') || normalized.includes('rail')) {
    return {
      sectionId: 'pro_mode',
      sectionTitle: 'Pro Mode (5-Mode Rail Studio)',
      category: 'Pro Mode'
    };
  }
  if (normalized.includes('play_mode') || normalized.includes('play_') || normalized.includes('dock') || normalized.includes('popout')) {
    return {
      sectionId: 'play_mode',
      sectionTitle: 'Play Mode (Touch & Quick Tools)',
      category: 'Play Mode'
    };
  }
  return {
    sectionId: 'miscellaneous',
    sectionTitle: 'Miscellaneous & System Checks',
    category: 'Checks & Tests'
  };
}

const allFiles = [];

function scanDir(dir, rel = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const itemRel = path.join(rel, entry.name);
    if (entry.isDirectory()) {
      scanDir(full, itemRel);
    } else if (entry.isFile() && /\.(png|jpg|jpeg|webp)$/i.test(entry.name)) {
      const { sectionId, sectionTitle, category } = categorize(itemRel);
      const stat = fs.statSync(full);
      const urlPath = `/screenshots/${itemRel.replace(/\\/g, '/')}`;
      allFiles.push({
        id: 'img_' + Math.random().toString(36).substr(2, 9),
        filename: entry.name,
        relPath: itemRel.replace(/\\/g, '/'),
        url: urlPath,
        title: titleFromFilename(entry.name),
        sectionId,
        sectionTitle,
        category,
        sizeBytes: stat.size,
        updatedAt: stat.mtime.toISOString()
      });
    }
  }
}

scanDir(SCREENSHOTS_DIR);

const sections = [
  {
    id: 'play_mode',
    title: 'Play Mode (Touch & Quick Tools)',
    description: 'Touch-friendly tool dock, shape popouts, quick brush sizes, and toybox sheets',
    items: allFiles.filter(f => f.sectionId === 'play_mode')
  },
  {
    id: 'pro_mode',
    title: 'Pro Mode (5-Mode Rail Studio)',
    description: 'Select & Transform, Draw, Create 3D Primitives, Deform, Layers, and Illumination',
    items: allFiles.filter(f => f.sectionId === 'pro_mode')
  },
  {
    id: 'universal_modals',
    title: 'Universal Modals & Studios',
    description: 'DNA Inspector, 3D Model Importer, Export, AR Viewer, Scaffolding, Raycasting',
    items: allFiles.filter(f => f.sectionId === 'universal_modals')
  },
  {
    id: 'brush_strokes',
    title: 'Brush Strokes on Canvas',
    description: 'Real live brush strokes (Clay, Volume, Move, Inflate, Pinch, Neon, etc.)',
    items: allFiles.filter(f => f.sectionId === 'brush_strokes')
  },
  {
    id: 'miscellaneous',
    title: 'Miscellaneous & System Checks',
    description: 'Screen size verifications, diagnostics, sandbox variations, camera checks',
    items: allFiles.filter(f => f.sectionId === 'miscellaneous')
  }
];

const manifest = {
  generatedAt: new Date().toISOString(),
  totalScreenshots: allFiles.length,
  sections,
  allFiles
};

fs.writeFileSync(OUT_PUBLIC, JSON.stringify(manifest, null, 2));
fs.writeFileSync(OUT_MOODBOARD, JSON.stringify(manifest, null, 2));

console.log(`Manifest created! Total: ${allFiles.length} screenshots indexed across ${sections.length} sections.`);
