import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

async function testResponsiveCanvas() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  // 1. TEST MOBILE PORTRAIT VIEWPORT (390 x 844)
  console.log('Testing Mobile Viewport (390x844)...');
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });

  await mobilePage.goto('http://localhost:3000/canvas-debugger.html', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileSnapPath = path.join(ROOT_DIR, 'screenshots', 'canvas_debugger_mobile.png');
  await mobilePage.screenshot({ path: mobileSnapPath });
  console.log('Mobile screenshot saved to:', mobileSnapPath);

  // Test Export trigger on mobile
  await mobilePage.click('#btn-export-active-frame');
  await mobilePage.waitForTimeout(600);

  const mobileHandoffSnapPath = path.join(ROOT_DIR, 'screenshots', 'canvas_debugger_mobile_handoff.png');
  await mobilePage.screenshot({ path: mobileHandoffSnapPath });
  console.log('Mobile handoff screenshot saved to:', mobileHandoffSnapPath);
  await mobilePage.close();

  // 2. TEST DESKTOP VIEWPORT (1440 x 900)
  console.log('Testing Desktop Viewport (1440x900)...');
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:3000/canvas-debugger.html', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);

  const desktopSnapPath = path.join(ROOT_DIR, 'screenshots', 'canvas_debugger_desktop.png');
  await desktopPage.screenshot({ path: desktopSnapPath });
  console.log('Desktop screenshot saved to:', desktopSnapPath);
  await desktopPage.close();

  await browser.close();
  console.log('Responsive verification complete!');
}

testResponsiveCanvas().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
