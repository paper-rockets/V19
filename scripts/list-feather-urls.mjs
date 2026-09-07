import { chromium } from 'playwright';

async function listScripts() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const urls = [];

  page.on('response', (res) => {
    urls.push(res.url());
  });

  await page.goto('https://gallery.feather.art/works/g5oou4i', { waitUntil: 'networkidle' });
  console.log('All loaded URLs:\n', urls.filter(u => u.includes('feather.art')).join('\n'));
  await browser.close();
}

listScripts().catch(console.error);
