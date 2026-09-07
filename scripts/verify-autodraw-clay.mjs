import { chromium } from 'playwright';

async function run() {
  console.log('Testing Auto-Draw Bot on the Clay Brushes board...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('pageerror', (err) => {
    console.error('Browser page error:', err);
    errors.push(err.message);
  });

  await page.goto('http://localhost:3000/sandbox3.html', {
    waitUntil: 'domcontentloaded',
    timeout: 15000,
  });

  await page.waitForTimeout(2000);

  // Select "Clay (24)" scope
  console.log('Selecting "Clay (24)" scope...');
  await page.click('button:has-text("Clay (24)")');
  await page.waitForTimeout(400);

  // Set Speed to 4x (timelapse)
  console.log('Selecting 4x speed...');
  await page.click('button:has-text("4x")');
  await page.waitForTimeout(400);

  // Click "Start Auto-Draw"
  console.log('Clicking "Start Auto-Draw"...');
  await page.click('button:has-text("Start Auto-Draw")');

  // Wait for countdown (3s) + drawing 3 strokes (~2s at 4x)
  await page.waitForTimeout(5000);

  await page.screenshot({ path: 'screenshots/autodraw_clay_progress.png' });
  console.log('Captured screenshots/autodraw_clay_progress.png');

  await browser.close();

  if (errors.length > 0) {
    console.error('Encountered page errors:', errors);
    process.exit(1);
  }

  console.log('Clay Auto-Draw verified successfully!');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
