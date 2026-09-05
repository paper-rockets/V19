import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

async function verify() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('console', msg => console.log('[BROWSER]', msg.type(), msg.text()));
  page.on('pageerror', err => console.error('[PAGE ERROR]', err));

  console.log('Navigating to http://localhost:3000/moodboard/ ...');
  await page.goto('http://localhost:3000/moodboard/', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });

  await page.waitForTimeout(2000);

  // Check if cards are present
  const cardCount = await page.locator('.mindmap-node').count();
  console.log(`Found ${cardCount} mind map cards on board.`);

  // Check if sections are present
  const sectionCount = await page.locator('.section-frame').count();
  console.log(`Found ${sectionCount} sub-section frames on board.`);

  // Take full overview screenshot
  const screenshotPath = path.join(ROOT_DIR, 'screenshots', 'mindmap_verified.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot saved to ${screenshotPath}`);

  // Test opening a lightbox on first image
  const firstImage = page.locator('.image-preview-wrap').first();
  if (await firstImage.isVisible()) {
    console.log('Testing lightbox modal open...');
    await firstImage.click();
    await page.waitForTimeout(800);
    const lightboxVisible = await page.locator('#lightbox-modal:not(.hidden)').isVisible();
    console.log('Lightbox modal visible:', lightboxVisible);
    
    // Capture lightbox screenshot
    const lightboxSnapPath = path.join(ROOT_DIR, 'screenshots', 'mindmap_lightbox_verified.png');
    await page.screenshot({ path: lightboxSnapPath });
    console.log(`Lightbox screenshot saved to ${lightboxSnapPath}`);

    // Close lightbox
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
  }

  // Test Pen Mode toggle
  console.log('Testing Pen Mode...');
  await page.click('#btn-toggle-draw');
  await page.waitForTimeout(500);
  const penToolbarVisible = await page.locator('#draw-toolbar:not(.hidden)').isVisible();
  console.log('Pen toolbar visible:', penToolbarVisible);

  // Capture pen mode screenshot
  const penSnapPath = path.join(ROOT_DIR, 'screenshots', 'mindmap_pen_mode_verified.png');
  await page.screenshot({ path: penSnapPath });
  console.log(`Pen mode screenshot saved to ${penSnapPath}`);

  await browser.close();
  console.log('All verifications complete!');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
