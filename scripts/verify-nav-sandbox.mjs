import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  console.log('Navigating to http://localhost:8003...');
  await page.goto('http://localhost:8003', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/nav_sandbox_tool1.png' });
  console.log('Saved screenshots/nav_sandbox_tool1.png');

  // Click Tool 2
  console.log('Clicking Tool 2...');
  await page.click('button[data-id="2"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/nav_sandbox_tool2.png' });
  console.log('Saved screenshots/nav_sandbox_tool2.png');

  // Click Tool 3
  console.log('Clicking Tool 3...');
  await page.click('button[data-id="3"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/nav_sandbox_tool3.png' });
  console.log('Saved screenshots/nav_sandbox_tool3.png');

  // Click Tool 4
  console.log('Clicking Tool 4...');
  await page.click('button[data-id="4"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/nav_sandbox_tool4.png' });
  console.log('Saved screenshots/nav_sandbox_tool4.png');

  // Click Tool 5 (Reactive Test)
  console.log('Clicking Tool 5...');
  await page.click('button[data-id="5"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/nav_sandbox_tool5.png' });
  console.log('Saved screenshots/nav_sandbox_tool5.png');

  // Click Grid compare
  console.log('Clicking Grid compare...');
  await page.click('button[data-id="grid"]');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/nav_sandbox_grid.png' });
  console.log('Saved screenshots/nav_sandbox_grid.png');

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
