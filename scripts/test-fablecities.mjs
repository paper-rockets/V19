import { chromium } from 'playwright';
import fs from 'fs';

async function testTerrainAndBuildings() {
  console.log('Testing Terrain & Buildings Only (Game Parts Removed)...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  page.on('console', msg => {
    const txt = msg.text();
    if (!txt.includes('texParameter') && !txt.includes('ReadPixels')) {
      console.log(`[CONSOLE] ${txt}`);
    }
  });

  page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.message}`);
  });

  await page.goto('http://localhost:3000/fablecities/index.html', { waitUntil: 'domcontentloaded' });

  // Poll until loading is finished and game is ready
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(1000);
    const info = await page.evaluate(() => {
      const g = window.__game;
      const statusEl = document.getElementById('loading-status');
      const barEl = document.getElementById('loading-bar');
      const loadingEl = document.getElementById('loading');
      return {
        ready: g?.ready,
        modules: g?.moduleStatus ? Object.keys(g.moduleStatus) : [],
        status: statusEl?.textContent || '',
        barWidth: barEl?.style.width || '',
        loadingHidden: loadingEl?.classList.contains('hidden'),
        hasStartMenu: !!document.querySelector('.fm-stage'),
        buildingsCount: g?.world?.buildings?.list?.length || 0,
        errors: g?.errors || [],
      };
    });

    console.log(`[${i+1}s] ready=${info.ready}, loadingHidden=${info.loadingHidden}, status="${info.status}", bar=${info.barWidth}, buildings=${info.buildingsCount}`);

    if (info.ready && info.loadingHidden) {
      console.log('SUCCESS! Terrain & Buildings are live on screen! Buildings count:', info.buildingsCount);
      break;
    }
  }

  await page.waitForTimeout(2000);
  const screenshotPath = 'public/fablecities/screenshot_terrain_buildings.png';
  try {
    const dataUrl = await page.evaluate(() => {
      const c = document.getElementById('game');
      return c ? c.toDataURL('image/png') : null;
    });
    if (dataUrl && dataUrl.startsWith('data:image/png;base64,')) {
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync(screenshotPath, Buffer.from(base64, 'base64'));
      console.log(`Saved screenshot to ${screenshotPath} (Size: ${fs.statSync(screenshotPath).size} bytes)`);
    } else {
      console.warn('dataUrl was not valid base64 png, taking fallback screenshot...');
      await page.screenshot({ path: screenshotPath, timeout: 5000, animations: 'disabled' });
      console.log(`Saved fallback screenshot to ${screenshotPath} (Size: ${fs.statSync(screenshotPath).size} bytes)`);
    }
  } catch (err) {
    console.error('Screenshot error:', err.message);
  }

  await browser.close();
}

testTerrainAndBuildings().catch(console.error);
