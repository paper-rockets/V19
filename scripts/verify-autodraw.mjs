import { chromium } from 'playwright';

async function run() {
  console.log('Launching browser to verify Auto-Draw Bot in Sandbox 3...');
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

  if (response.status() !== 200) {
    throw new Error(`Failed to load sandbox3.html, status: ${response.status()}`);
  }

  await page.waitForTimeout(2500);

  // Take screenshot 1: Initial state with Bot Control Dock
  await page.screenshot({ path: 'screenshots/autodraw_initial.png' });
  console.log('Captured screenshots/autodraw_initial.png');

  // Select 3D Model Scope (5 strokes) to verify fast live drawing
  console.log('Selecting "3D Model (5)" scope...');
  await page.click('button:has-text("3D Model (5)")');
  await page.waitForTimeout(500);

  // Set Speed to 2x
  console.log('Selecting 2x speed...');
  await page.click('button:has-text("2x")');
  await page.waitForTimeout(500);

  // Click "Start Auto-Draw"
  console.log('Clicking "Start Auto-Draw"...');
  await page.click('button:has-text("Start Auto-Draw")');

  // Screenshot 2: Countdown overlay (3.. 2.. 1..)
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/autodraw_countdown.png' });
  console.log('Captured screenshots/autodraw_countdown.png');

  // Wait for countdown to finish and bot to begin drawing (countdown is 3s)
  await page.waitForTimeout(3000);

  // Screenshot 3: Active drawing in progress with Stylus cursor visible
  await page.screenshot({ path: 'screenshots/autodraw_drawing_active.png' });
  console.log('Captured screenshots/autodraw_drawing_active.png');

  // Wait for 3D model strokes to progress
  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'screenshots/autodraw_bust_sculpted.png' });
  console.log('Captured screenshots/autodraw_bust_sculpted.png');

  await browser.close();

  if (errors.length > 0) {
    console.error('Encountered page errors:', errors);
    process.exit(1);
  }

  console.log('Auto-Draw Bot verified successfully with zero errors!');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
