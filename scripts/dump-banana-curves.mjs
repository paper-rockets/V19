import { chromium } from 'playwright';
import fs from 'fs';

async function dumpBananaData() {
  console.log('Connecting to https://gallery.feather.art/works/g5oou4i ...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://gallery.feather.art/works/g5oou4i', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const data = await page.evaluate(() => {
    const BN = window.BookNote;
    if (!BN) return { error: 'No window.BookNote found' };

    const curveGroups = BN.shared.getCurveGroupsWithCurves();
    const store = BN.store;

    return {
      storeKeys: Object.keys(store || {}),
      stage: store?.stage,
      groupsCount: curveGroups ? curveGroups.length : 0,
      groups: curveGroups ? curveGroups.map(g => ({
        id: g.id,
        visibility: g.visibility,
        curveCount: g.curves?.length || 0,
        sampleCurve: g.curves && g.curves[0] ? {
          keys: Object.keys(g.curves[0]),
          color: g.curves[0].color,
          pointsCount: g.curves[0].points?.length,
          samplePoint: g.curves[0].points ? g.curves[0].points[0] : null,
          strokeWidth: g.curves[0].strokeWidth,
          brush: g.curves[0].brush,
          material: g.curves[0].material,
        } : null,
      })) : [],
    };
  });

  console.log('Banana Data Dump Summary:', JSON.stringify(data, null, 2).slice(0, 1500));
  fs.writeFileSync('banana_extracted_summary.json', JSON.stringify(data, null, 2));

  // Now extract all curves and points!
  const allCurves = await page.evaluate(() => {
    const BN = window.BookNote;
    if (!BN) return null;
    return BN.shared.getCurveGroupsWithCurves();
  });

  if (allCurves) {
    fs.writeFileSync('banana_all_curves.json', JSON.stringify(allCurves, null, 2));
    console.log(`Successfully extracted ${allCurves.length} curve groups to banana_all_curves.json!`);
    let totalCurves = 0;
    let totalPoints = 0;
    for (const g of allCurves) {
      if (g.curves) {
        totalCurves += g.curves.length;
        for (const c of g.curves) {
          if (c.points) totalPoints += c.points.length;
        }
      }
    }
    console.log(`Total curves: ${totalCurves}, Total points: ${totalPoints}`);
  }

  await browser.close();
}

dumpBananaData().catch(console.error);
