import { chromium } from 'playwright';
import fs from 'fs';

async function testNature() {
  console.log('Testing pure nature terrain engine...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.message}`);
  });

  const startTime = Date.now();
  await page.goto('http://localhost:3000/fablecities/index.html', { waitUntil: 'domcontentloaded' });

  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(500);
    const ready = await page.evaluate(() => window.__game?.ready);
    if (ready) {
      console.log(`Pure Nature ready in ${(Date.now() - startTime) / 1000}s!`);
      break;
    }
  }

  // Check stats
  const info = await page.evaluate(() => {
    const game = window.__game;
    const terrain = game?.world?.terrain;
    const trees = terrain?.api?.treeCount?.() ?? 0;
    const buildings = game?.world?.buildings?.list?.length ?? 0;
    const roads = game?.world?.roads?.segments?.size ?? 0;
    const camera = game?.cameraController?.getView?.() ?? null;
    const loadedModules = Object.keys(game?.modules || {});
    return {
      ready: game?.ready,
      trees,
      buildings,
      roads,
      loadedModules,
      camera
    };
  });

  console.log('Scene Info:', JSON.stringify(info, null, 2));

  // Capture canvas dataURL
  await page.waitForTimeout(1000);
  const dataUrl = await page.evaluate(() => {
    const canvas = document.getElementById('game');
    return canvas ? canvas.toDataURL('image/png') : null;
  });

  if (dataUrl && dataUrl.startsWith('data:image/png;base64,')) {
    const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync('public/fablecities/screenshot_pure_nature.png', Buffer.from(base64, 'base64'));
    fs.writeFileSync('fablecities/screenshot_pure_nature.png', Buffer.from(base64, 'base64'));
    console.log('Saved screenshot_pure_nature.png');
  }

  await browser.close();
}

testNature().catch(console.error);
