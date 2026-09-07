import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.join(ROOT_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser to verify live navigator on http://localhost:3000...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Check Main App on localhost:3000
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.setItem('remix3d.hasOnboarded', 'true');
    localStorage.setItem('mody_theme', 'dark');
    localStorage.removeItem('v19_nv_box_scale');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const nvBox = page.locator('#nv-box');
  const isBoxVisible = await nvBox.isVisible();
  console.log('Is #nv-box visible on live app:', isBoxVisible);

  if (isBoxVisible) {
    const boxRect100 = await nvBox.boundingBox();
    console.log('Box dimensions at 100%:', boxRect100);

    const toggleBtn = page.locator('#nv-size-toggle');
    const toggleText100 = await toggleBtn.innerText();
    console.log('Toggle text at 100%:', toggleText100);

    const acts = page.locator('.nv-acts');
    const actsRect = await acts.boundingBox();
    console.log('Bottom action buttons row dimensions:', actsRect);

    const firstAct = page.locator('.nv-act').first();
    const actRect = await firstAct.boundingBox();
    console.log('Individual action button dimensions (compact ~22-26px):', actRect);

    // Capture main app screenshot at 100%
    const mainScreenPath = path.join(SCREENSHOTS_DIR, 'nav_size_100.png');
    await page.screenshot({ path: mainScreenPath });
    console.log('Saved 100% screenshot:', mainScreenPath);

    // Test toggle click -> 125%
    await toggleBtn.click();
    await page.waitForTimeout(300);
    const toggleText125 = await toggleBtn.innerText();
    const boxRect125 = await nvBox.boundingBox();
    console.log('After 1st toggle click -> Text:', toggleText125, 'Box:', boxRect125);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'nav_size_125.png') });

    // Test toggle click -> 150%
    await toggleBtn.click();
    await page.waitForTimeout(300);
    const toggleText150 = await toggleBtn.innerText();
    const boxRect150 = await nvBox.boundingBox();
    console.log('After 2nd toggle click -> Text:', toggleText150, 'Box:', boxRect150);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'nav_size_150.png') });

    // Test toggle click -> 75%
    await toggleBtn.click();
    await page.waitForTimeout(300);
    const toggleText75 = await toggleBtn.innerText();
    const boxRect75 = await nvBox.boundingBox();
    console.log('After 3rd toggle click -> Text:', toggleText75, 'Box:', boxRect75);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'nav_size_75.png') });

    // Test toggle click -> back to 100%
    await toggleBtn.click();
    await page.waitForTimeout(300);
    const toggleTextReset = await toggleBtn.innerText();
    console.log('After 4th toggle click -> Text:', toggleTextReset);
  }

  // 2. Check Standalone Reference on localhost:3000/navigator-kids-one-box.html
  await page.goto('http://localhost:3000/navigator-kids-one-box.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const standaloneToggle = page.locator('#nv-size-toggle');
  console.log('Standalone toggle button visible:', await standaloneToggle.isVisible());
  if (await standaloneToggle.isVisible()) {
    console.log('Standalone initial toggle text:', await standaloneToggle.innerText());
    await standaloneToggle.click();
    await page.waitForTimeout(300);
    console.log('Standalone after 1st click:', await standaloneToggle.innerText());
  }
  const standaloneScreenPath = path.join(SCREENSHOTS_DIR, 'nav_verification_standalone.png');
  await page.screenshot({ path: standaloneScreenPath });
  console.log('Saved standalone reference screenshot:', standaloneScreenPath);

  await browser.close();
  console.log('Verification completed successfully.');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});

