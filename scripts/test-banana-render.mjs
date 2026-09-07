import { chromium } from 'playwright';
import fs from 'fs';

async function testBananaRender() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  await page.goto('http://127.0.0.1:3000/sandbox3.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  const bananaJson = fs.readFileSync('banana_all_curves.json', 'utf8');

  const renderStats = await page.evaluate((json) => {
    const raw = JSON.parse(json);
    const allCurves = [...raw[0].curves, ...raw[1].curves];
    const eng = window.__STUDIO_ENGINE__;
    if (!eng) return { error: 'No engine' };

    // Clear existing strokes
    eng.clearAllStrokes();

    // Set stage background to Feather sky blue
    if (eng.scene) {
      eng.scene.background.set('#9edcff');
    }

    // Hide board plane and bust mesh
    if (eng.modelRoot) {
      eng.modelRoot.traverse((child) => {
        if (child.isMesh) child.visible = false;
      });
    }

    // Set camera to Feather's position & focus
    eng.setTargetPosition(0.207, 6.282, -0.495);
    eng.setCameraView(-2.122, 1.143, 22.0, true);

    let renderedCount = 0;
    allCurves.forEach((curve, idx) => {
      const r = Math.round(curve.color[0]);
      const g = Math.round(curve.color[1]);
      const b = Math.round(curve.color[2]);
      const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');

      const points = curve.points.map(p => ({
        position: { x: p.x, y: p.y, z: p.z },
        normal: { x: 0, y: 1, z: 0 },
        surfaceOffset: 0.003,
        pressure: 1.0,
        isSurfaceHit: true,
        time: performance.now()
      }));

      const isFlat = curve.materialStyle?.type === 'FLAT';

      eng.recreateStrokeFromDescriptor({
        id: 'feather_banana_' + idx + '_' + curve.id,
        layerId: 'default_layer',
        tool: 'brush',
        points: points,
        settings: {
          size: curve.size,
          opacity: 1.0,
          color: hex,
          roughness: 0.45,
          metalness: 0.05,
          emissiveIntensity: 0,
          pressureSensitivity: false,
          archSegments: 5,
          domeFactor: 0.2,
          surfaceOffset: 0.003,
          taperLength: 0.04,
          silhouetteClamping: false,
          stencilMasking: false,
          smoothingAlgorithm: 'streamline',
          smoothingStrength: 0.7,
          materialType: isFlat ? 'shadeless' : 'shaded',
          profile: 'ribbon',
          patternType: 'none',
          patternScale: 4.0,
          patternIntensity: 0.8,
          patternAngle: 45,
          patternContrast: 1.0,
          chiselAngle: 45,
          aspectRatio: 3.5
        },
        createdAt: Date.now()
      });
      renderedCount++;
    });

    eng.markDirty();
    return { success: true, renderedCount };
  }, bananaJson);

  console.log('Render stats:', renderStats);

  // Wait for render
  await page.waitForTimeout(2000);

  // Save screenshot
  await page.screenshot({ path: 'screenshots/banana_studio_render.png' });
  console.log('Saved screenshot to screenshots/banana_studio_render.png');

  await browser.close();
}

testBananaRender().catch(console.error);
