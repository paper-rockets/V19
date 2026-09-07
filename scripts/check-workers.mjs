import { chromium } from 'playwright';

async function checkWorkers() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('worker', (worker) => {
    console.log('Worker created:', worker.url());
  });

  page.on('console', (msg) => {
    console.log('PAGE LOG:', msg.text());
  });

  await page.goto('https://gallery.feather.art/works/g5oou4i', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const frames = page.frames();
  console.log('Frames count:', frames.length);
  for (const f of frames) {
    console.log('Frame URL:', f.url());
  }

  await browser.close();
}

checkWorkers().catch(console.error);
