import { chromium } from 'playwright';

async function run() {
  console.log('Launching browser to verify Sandbox 3...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('pageerror', (err) => {
    console.error('Browser page error:', err);
    errors.push(err.message);
  });

  console.log('Navigating to http://localhost:3000/sandbox3.html...');
  const response = await page.goto('http://localhost:3000/sandbox3.html', {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });

  console.log('HTTP Status:', response.status());
  if (response.status() !== 200) {
    throw new Error(`Failed to load sandbox3.html, status: ${response.status()}`);
  }

  // Wait for WebGL engine and strokes to render
  await page.waitForTimeout(3500);

  // 1. All View (Canvas Board + 3D Model)
  await page.screenshot({ path: 'screenshots/sandbox3_all_view.png' });
  console.log('Captured screenshots/sandbox3_all_view.png');

  // 2. Click "3D Model"
  console.log('Clicking "3D Model"...');
  await page.click('button:has-text("3D Model")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/sandbox3_bust_zoom.png' });
  console.log('Captured screenshots/sandbox3_bust_zoom.png');

  // 3. Click "Clay (8)"
  console.log('Clicking "Clay (8)"...');
  await page.click('button:has-text("Clay (8)")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/sandbox3_clay_brushes.png' });
  console.log('Captured screenshots/sandbox3_clay_brushes.png');

  // 4. Click "Patterns (6)"
  console.log('Clicking "Patterns (6)"...');
  await page.click('button:has-text("Patterns (6)")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/sandbox3_patterns.png' });
  console.log('Captured screenshots/sandbox3_patterns.png');

  // 5. Click "3D Tilt"
  console.log('Clicking "3D Tilt"...');
  await page.click('button:has-text("3D Tilt")');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/sandbox3_3d_tilt.png' });
  console.log('Captured screenshots/sandbox3_3d_tilt.png');

  // 6. Click "? What This App Does" to verify the non-technical guide
  console.log('Opening Guide Panel...');
  await page.click('button:has-text("? What This App Does")');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/sandbox3_guide_open.png' });
  console.log('Captured screenshots/sandbox3_guide_open.png');

  await browser.close();

  if (errors.length > 0) {
    console.error('Encountered page errors:', errors);
    process.exit(1);
  }

  console.log('Sandbox 3 verified successfully with zero errors!');
}

run().catch((err) => {
  console.error('Verification script failed:', err);
  process.exit(1);
});
