import { chromium } from 'playwright';

async function run() {
  console.log('Inspecting https://gallery.feather.art/works/g5oou4i ...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('/api/') || url.endsWith('.json') || url.endsWith('.feather') || url.endsWith('.glb')) {
      console.log('API/Data Request:', url);
    }
  });

  try {
    await page.goto('https://gallery.feather.art/works/g5oou4i', {
      waitUntil: 'networkidle',
      timeout: 25000,
    });
  } catch (e) {
    console.warn('Navigation timeout or error, proceeding to capture:', e.message);
  }

  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/feather_banana.png' });
  console.log('Captured screenshots/feather_banana.png');

  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
