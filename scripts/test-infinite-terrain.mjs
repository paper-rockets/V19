import { chromium } from 'playwright';
import fs from 'fs';

async function testInfiniteTerrain() {
  console.log('Testing Infinite Procedural Terrain Generator...');
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

  // Check if ready
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(200);
    const ready = await page.evaluate(() => window.__terrain?.ready);
    if (ready) {
      console.log(`Terrain ready in ${(Date.now() - startTime)}ms!`);
      break;
    }
  }

  await page.waitForTimeout(1000);

  // Get initial chunk stats
  const initialStats = await page.evaluate(() => {
    const terrain = window.__terrain;
    const chunkCount = terrain.chunks.chunks.size;
    let waterChunkCount = 0;
    for (const chunk of terrain.chunks.chunks.values()) {
      if (chunk.hasWater) waterChunkCount++;
    }
    const camPos = {
      x: terrain.camera.camera.position.x,
      y: terrain.camera.camera.position.y,
      z: terrain.camera.camera.position.z,
    };
    const target = {
      x: terrain.camera.target.x,
      y: terrain.camera.target.y,
      z: terrain.camera.target.z,
    };
    return { chunkCount, waterChunkCount, camPos, target };
  });

  console.log('Initial stats:', JSON.stringify(initialStats, null, 2));

  // Test pan to trigger infinite chunk streaming
  console.log('Panning camera 500m northward to test infinite streaming...');
  await page.evaluate(() => {
    window.__terrain.camera.pan(0, 300);
  });
  await page.waitForTimeout(500);

  const afterPanStats = await page.evaluate(() => {
    const terrain = window.__terrain;
    const chunkCount = terrain.chunks.chunks.size;
    let waterChunkCount = 0;
    for (const chunk of terrain.chunks.chunks.values()) {
      if (chunk.hasWater) waterChunkCount++;
    }
    const target = {
      x: terrain.camera.target.x,
      y: terrain.camera.target.y,
      z: terrain.camera.target.z,
    };
    return { chunkCount, waterChunkCount, target };
  });

  console.log('After Pan stats:', JSON.stringify(afterPanStats, null, 2));

  // Capture screenshot
  const dataUrl = await page.evaluate(() => {
    const canvas = document.getElementById('game');
    return canvas ? canvas.toDataURL('image/png') : null;
  });

  if (dataUrl && dataUrl.startsWith('data:image/png;base64,')) {
    const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync('public/fablecities/screenshot_infinite_terrain.png', Buffer.from(base64, 'base64'));
    fs.writeFileSync('fablecities/screenshot_infinite_terrain.png', Buffer.from(base64, 'base64'));
    console.log('Saved screenshot_infinite_terrain.png');
  }

  await browser.close();
}

testInfiniteTerrain().catch(console.error);
