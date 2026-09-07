import { chromium } from 'playwright';

async function extractThreeScene() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://gallery.feather.art/works/g5oou4i', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);

  const sceneInfo = await page.evaluate(() => {
    let foundScene = null;
    const meshesSummary = [];

    const appEl = document.querySelector('#app');
    function searchObj(obj, depth = 0, seen = new Set()) {
      if (!obj || depth > 6 || seen.has(obj)) return;
      seen.add(obj);

      if (obj.isScene || (obj.type === 'Scene' && Array.isArray(obj.children))) {
        foundScene = obj;
        return;
      }

      for (const k of Object.keys(obj)) {
        try {
          const val = obj[k];
          if (val && typeof val === 'object') {
            if (val.isScene || (val.type === 'Scene' && Array.isArray(val.children))) {
              foundScene = val;
              return;
            }
            searchObj(val, depth + 1, seen);
            if (foundScene) return;
          }
        } catch (_) {}
      }
    }

    if (appEl && appEl.__vue_app__) {
      searchObj(appEl.__vue_app__);
    }

    if (!foundScene) {
      for (const k of Object.keys(window)) {
        try {
          const val = window[k];
          if (val && typeof val === 'object') {
            searchObj(val, 0);
            if (foundScene) break;
          }
        } catch (_) {}
      }
    }

    let meshCount = 0;
    if (foundScene) {
      foundScene.traverse((child) => {
        if (child.isMesh) {
          meshCount++;
          const geom = child.geometry;
          meshesSummary.push({
            name: child.name,
            vertexCount: geom ? geom.attributes?.position?.count : 0,
            hasColor: !!geom?.attributes?.color,
            color: child.material?.color ? '#' + child.material.color.getHexString() : null,
          });
        }
      });
    }

    return {
      foundScene: !!foundScene,
      meshCount,
      sampleMeshes: meshesSummary.slice(0, 20),
    };
  });

  console.log('Scene Info:', JSON.stringify(sceneInfo, null, 2));
  await browser.close();
}

extractThreeScene().catch(console.error);
