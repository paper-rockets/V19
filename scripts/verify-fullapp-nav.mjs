import { chromium, devices } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1. Play Mode Desktop Test
  console.log('--- Play Mode Verification ---');
  const contextPlay = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pagePlay = await contextPlay.newPage();
  await pagePlay.addInitScript(() => {
    localStorage.setItem('remix3d.uiMode', 'play');
    localStorage.setItem('mody_active_controller', 'navigator');
  });
  await pagePlay.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await pagePlay.waitForSelector('#nv', { timeout: 15000 });
  await pagePlay.waitForTimeout(2000);

  const playUiMode = await pagePlay.$eval('#nv', el => el.getAttribute('data-ui-mode'));
  console.log('Play mode attribute:', playUiMode);

  // Open menu in Play Mode
  const tabPlay = await pagePlay.$('#nv-tab');
  if (tabPlay) await tabPlay.click();
  await pagePlay.waitForTimeout(600);

  const playLookBtn = await pagePlay.$eval('#nv-look', el => el.textContent.trim());
  const playTurnBtn = await pagePlay.$eval('#nv-turn', el => el.textContent.trim());
  const playFooter = await pagePlay.$eval('.nv-sec:last-child', el => el.textContent.trim());
  console.log('Play Mode look button text:', playLookBtn);
  console.log('Play Mode turn button text:', playTurnBtn);
  console.log('Play Mode footer text:', playFooter);

  await pagePlay.screenshot({ path: 'screenshots/verify_fullapp_play_menu.png' });
  console.log('Saved Play Mode menu screenshot: screenshots/verify_fullapp_play_menu.png');
  await contextPlay.close();

  // 2. Pro Mode Desktop Test
  console.log('--- Pro Mode Verification ---');
  const contextPro = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pagePro = await contextPro.newPage();
  await pagePro.addInitScript(() => {
    localStorage.setItem('remix3d.uiMode', 'pro');
    localStorage.setItem('mody_active_controller', 'navigator');
  });
  await pagePro.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await pagePro.waitForSelector('#nv', { timeout: 15000 });
  await pagePro.waitForTimeout(2000);

  const proUiMode = await pagePro.$eval('#nv', el => el.getAttribute('data-ui-mode'));
  console.log('Pro mode attribute:', proUiMode);

  // Open menu in Pro Mode
  const tabPro = await pagePro.$('#nv-tab');
  if (tabPro) await tabPro.click();
  await pagePro.waitForTimeout(600);

  const proOrbitBtn = await pagePro.$eval('#nv-look', el => el.textContent.trim());
  const proRotateBtn = await pagePro.$eval('#nv-turn', el => el.textContent.trim());
  const proNumExists = await pagePro.$('#nv-num');
  const proNumText = proNumExists ? await pagePro.$eval('#nv-num', el => el.textContent.trim()) : 'MISSING';
  const proFooter = await pagePro.$eval('.nv-sec:last-child', el => el.textContent.trim());
  console.log('Pro Mode orbit button text:', proOrbitBtn);
  console.log('Pro Mode rotate button text:', proRotateBtn);
  console.log('Pro Mode num readout text:', proNumText);
  console.log('Pro Mode footer text:', proFooter);

  await pagePro.screenshot({ path: 'screenshots/verify_fullapp_pro_menu.png' });
  console.log('Saved Pro Mode menu screenshot: screenshots/verify_fullapp_pro_menu.png');
  await contextPro.close();

  // 3. Mobile Viewport Test (iPhone 14) in Pro Mode
  console.log('--- Mobile Pro Mode Test (iPhone 14) ---');
  const iPhone = devices['iPhone 14'];
  const contextMobile = await browser.newContext({ ...iPhone });
  const pageMobile = await contextMobile.newPage();
  await pageMobile.addInitScript(() => {
    localStorage.setItem('remix3d.uiMode', 'pro');
    localStorage.setItem('mody_active_controller', 'navigator');
  });
  await pageMobile.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await pageMobile.waitForSelector('#nv', { timeout: 15000 });
  await pageMobile.waitForTimeout(1500);

  const tabMobile = await pageMobile.$('#nv-tab');
  if (tabMobile) await tabMobile.click();
  await pageMobile.waitForTimeout(600);

  await pageMobile.screenshot({ path: 'screenshots/verify_fullapp_mobile_pro.png' });
  console.log('Saved Mobile Pro Mode screenshot: screenshots/verify_fullapp_mobile_pro.png');
  await contextMobile.close();

  await browser.close();
  console.log('All verifications completed successfully!');
})();
