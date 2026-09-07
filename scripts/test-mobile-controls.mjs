import { chromium, devices } from 'playwright';

async function testMobile() {
  console.log('Testing Mobile Phone Touchscreen Controls...');
  const pixel7 = devices['Pixel 7'];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...pixel7,
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();

  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.message}`);
  });

  await page.goto('http://localhost:3000/fablecities/index.html', { waitUntil: 'domcontentloaded' });
  console.log('Waiting for terrain and buildings to be ready on mobile...');
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(1000);
    const ready = await page.evaluate(() => window.__game?.ready);
    if (ready) {
      console.log(`Ready achieved at ${i+1}s!`);
      break;
    }
  }
  await page.waitForTimeout(2000);

  // Check if Mobile HUD elements exist
  const hudCheck = await page.evaluate(() => {
    return {
      hudExists: !!document.getElementById('fc-mobile-hud'),
      zoomInExists: !!document.getElementById('fc-btn-zoom-in'),
      zoomOutExists: !!document.getElementById('fc-btn-zoom-out'),
      dpadExists: !!document.getElementById('fc-mob-dpad'),
      presetsExists: !!document.getElementById('fc-mob-presets'),
    };
  });
  console.log('HUD check result:', hudCheck);

  // Test Zoom In button
  const distBefore = await page.evaluate(() => window.__game?.cameraController?.desired?.distance || null);
  console.log('Camera distance before zoom:', distBefore);

  console.log('Tapping Zoom In button 5 times...');
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => {
      document.getElementById('fc-btn-zoom-in')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      document.getElementById('fc-btn-zoom-in')?.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    });
    await page.waitForTimeout(60);
  }

  const distAfterZoomIn = await page.evaluate(() => window.__game?.cameraController?.desired?.distance || null);
  console.log('Camera distance after Zoom In:', distAfterZoomIn);

  console.log('Tapping Zoom Out button 8 times...');
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => {
      document.getElementById('fc-btn-zoom-out')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      document.getElementById('fc-btn-zoom-out')?.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    });
    await page.waitForTimeout(60);
  }

  const distAfterZoomOut = await page.evaluate(() => window.__game?.cameraController?.desired?.distance || null);
  console.log('Camera distance after Zoom Out:', distAfterZoomOut);

  // Test Pinch Gesture
  console.log('Simulating 2-finger touch pinch zoom...');
  await page.evaluate(() => {
    const canvas = document.getElementById('game');
    const makeTouch = (id, x, y) => new Touch({ identifier: id, target: canvas, clientX: x, clientY: y });

    const t1 = makeTouch(0, 100, 300);
    const t2 = makeTouch(1, 300, 300);

    canvas.dispatchEvent(new TouchEvent('touchstart', {
      touches: [t1, t2],
      changedTouches: [t1, t2],
      bubbles: true,
      cancelable: true,
    }));

    // Pinch outward (move fingers farther apart: 100->50, 300->350: distance 200 -> 300 => zoom in!)
    const t1Move = makeTouch(0, 50, 300);
    const t2Move = makeTouch(1, 350, 300);

    canvas.dispatchEvent(new TouchEvent('touchmove', {
      touches: [t1Move, t2Move],
      changedTouches: [t1Move, t2Move],
      bubbles: true,
      cancelable: true,
    }));

    canvas.dispatchEvent(new TouchEvent('touchend', {
      touches: [],
      changedTouches: [t1Move, t2Move],
      bubbles: true,
      cancelable: true,
    }));
  });

  const distAfterPinch = await page.evaluate(() => window.__game?.cameraController?.desired?.distance || null);
  console.log('Camera distance after Pinch Zoom In:', distAfterPinch);

  // Test Rotation & Pan buttons
  console.log('Testing Rotation & Pan buttons...');
  const yawBefore = await page.evaluate(() => window.__game?.cameraController?.desired?.yaw);
  await page.evaluate(() => {
    document.getElementById('fc-btn-rot-left')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    document.getElementById('fc-btn-rot-left')?.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
  });
  const yawAfter = await page.evaluate(() => window.__game?.cameraController?.desired?.yaw);
  console.log(`Yaw changed from ${yawBefore} to ${yawAfter}`);

  // Test Pan Up
  const targetZBefore = await page.evaluate(() => window.__game?.cameraController?.desired?.target?.z);
  await page.evaluate(() => {
    document.getElementById('fc-btn-pan-up')?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    document.getElementById('fc-btn-pan-up')?.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
  });
  const targetZAfter = await page.evaluate(() => window.__game?.cameraController?.desired?.target?.z);
  console.log(`Target Z changed from ${targetZBefore} to ${targetZAfter}`);

  // Take screenshot of mobile view with HUD
  try {
    await page.screenshot({ path: 'public/fablecities/screenshot_mobile_hud.png', timeout: 0 });
    console.log('Saved public/fablecities/screenshot_mobile_hud.png');
  } catch (err) {
    console.warn('Screenshot note:', err.message);
  }

  await browser.close();
}

testMobile().catch(console.error);
