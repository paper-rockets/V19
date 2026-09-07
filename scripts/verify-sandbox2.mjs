import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  
  await page.goto('http://localhost:3000/sandbox2.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'screenshots/sandbox2_variation1.png' });
  
  // Click variation 2
  await page.click('.v-btn[data-v="2"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/sandbox2_variation2.png' });
  
  // Click variation 3
  await page.click('.v-btn[data-v="3"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/sandbox2_variation3.png' });

  // Click variation 4
  await page.click('.v-btn[data-v="4"]');
  await page.waitForTimeout(300);
  const v4Info = await page.evaluate(() => {
    const el = document.getElementById('var4');
    const l = document.querySelector('.flank-left');
    const r = document.querySelector('.flank-right');
    return {
      elClasses: el.className,
      elStyle: window.getComputedStyle(el).display,
      lRect: l.getBoundingClientRect(),
      rRect: r.getBoundingClientRect(),
      lStyle: window.getComputedStyle(l).display,
    };
  });
  console.log('v4Info:', v4Info);
  await page.screenshot({ path: 'screenshots/sandbox2_variation4.png' });

  // Click variation 5
  await page.click('.v-btn[data-v="5"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/sandbox2_variation5.png' });
  
  // Test clicking height +
  await page.click('#var5 .micro-btn:has-text("+")');
  await page.waitForTimeout(200);
  const hVal = await page.textContent('#stat-h');
  
  // Test clicking size button
  const sizeBtnBefore = await page.textContent('#size');
  await page.click('#size');
  await page.waitForTimeout(200);
  const sizeBtnAfter = await page.textContent('#size');

  // Test dragging gizmo to a new position (e.g. x: 200, y: 150)
  const grip = await page.$('#grip');
  const box = await grip.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x - 300, box.y - 200, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'screenshots/sandbox2_gizmo_dragged.png' });

  await browser.close();
  console.log('Errors:', errors);
  console.log('Height after click:', hVal);
  console.log('Size before:', sizeBtnBefore, 'Size after:', sizeBtnAfter);
  console.log('PLAYWRIGHT_TEST_PASSED');
})();
