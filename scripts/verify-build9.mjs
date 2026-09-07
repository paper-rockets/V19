import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop Test
  console.log('--- Desktop Test ---');
  const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await desktopPage.waitForSelector('#nv-dock', { timeout: 15000 });
  await desktopPage.screenshot({ path: 'screenshots/verify_build9_desktop_initial.png' });

  const desktopTab = await desktopPage.$('#nv-tab');
  await desktopTab.click();
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: 'screenshots/verify_build9_desktop_menu.png' });

  // 2. Mobile Test (iPhone 14)
  console.log('--- Mobile Test (iPhone 14) ---');
  const iPhone = devices['iPhone 14'];
  const mobileContext = await browser.newContext({ ...iPhone });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForSelector('#nv-dock', { timeout: 15000 });
  await mobilePage.screenshot({ path: 'screenshots/verify_build9_mobile_initial.png' });

  const mobileTab = await mobilePage.$('#nv-tab');
  await mobileTab.click();
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: 'screenshots/verify_build9_mobile_menu.png' });

  console.log('Both tests completed successfully');
  await browser.close();
})();
