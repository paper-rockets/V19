import { chromium } from 'playwright';
import fs from 'fs';

async function testBanana() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  await page.goto('http://localhost:3000/sandbox3.html');
  await page.waitForTimeout(2000);

  // Load banana curves from file and execute them inside sandbox
  const bananaJson = fs.readFileSync('banana_all_curves.json', 'utf8');
  
  const result = await page.evaluate((json) => {
    const raw = JSON.parse(json);
    const allCurves = [...raw[0].curves, ...raw[1].curves];

    // Find engine
    let eng = (window).__studioEngine;
    if (!eng) {
      // Find from container or global
      for (const k of Object.keys(window)) {
        if (window[k] && window[k].recreateStrokeFromDescriptor) {
          eng = window[k];
          break;
        }
      }
    }
    return { hasEngine: !!eng, curvesCount: allCurves.length };
  }, bananaJson);

  console.log('Test result:', result);
  await browser.close();
}

testBanana().catch(console.error);
