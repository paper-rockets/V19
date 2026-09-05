/**
 * Robot Tester for PaperRockets Remix 3D Studio (V19)
 * 
 * Systematically audits and captures:
 * 1. Desktop Dark (1440x900)
 * 2. Desktop Light (1440x900)
 * 3. Mobile Dark (390x844 narrow viewport)
 * 4. Mobile Light (390x844 narrow viewport)
 * 5. All Top Bar options, Play Mode Tool Dock, Popouts, Sheets
 * 6. Pro Mode Rail and all panels (Select, Draw, Create, Deform, Layers, Illumination)
 * 7. All Universal Modals (15+ modals)
 * 8. Brush stroke demonstrations on canvas with all curated brushes
 */

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.join(ROOT_DIR, 'screenshots');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Ensure output directories exist
const DIRS = {
  desktopDark: path.join(SCREENSHOTS_DIR, 'desktop_dark'),
  desktopLight: path.join(SCREENSHOTS_DIR, 'desktop_light'),
  mobileDark: path.join(SCREENSHOTS_DIR, 'mobile_dark'),
  mobileLight: path.join(SCREENSHOTS_DIR, 'mobile_light'),
  modals: path.join(SCREENSHOTS_DIR, 'universal_modals'),
  brushes: path.join(SCREENSHOTS_DIR, 'brush_strokes'),
};

for (const dir of Object.values(DIRS)) {
  fs.mkdirSync(dir, { recursive: true });
}

let capturedCount = 0;

async function snap(page, outDir, filename, description, delay = 600) {
  if (delay > 0) {
    await page.waitForTimeout(delay);
  }
  const filepath = path.join(outDir, filename);
  await page.screenshot({ path: filepath, fullPage: false });
  capturedCount++;
  const stats = fs.statSync(filepath);
  console.log(`  [SNAP ${capturedCount.toString().padStart(2, '0')}] ${path.basename(outDir)}/${filename} (${(stats.size / 1024).toFixed(1)} KB) - ${description}`);
}

async function prepareAppState(page, { mode = 'play', theme = 'dark', onboarded = true, width = 1440, height = 900 }) {
  await page.setViewportSize({ width, height });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.evaluate(({ mode, theme, onboarded }) => {
    localStorage.setItem('mody_theme', theme);
    localStorage.setItem('remix3d.uiMode', mode);
    localStorage.setItem('remix3d.hasOnboarded', onboarded ? 'true' : 'false');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    if (document.body) {
      document.body.className = theme === 'dark' ? 'bg-[#242629] text-neutral-100' : 'bg-[#ebe5dc] text-neutral-800';
    }
  }, { mode, theme, onboarded });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
}

// Helper to draw a fluid continuous curve on the canvas
async function drawStrokeOnCanvas(page, { startX = 600, startY = 400, length = 200, steps = 18 } = {}) {
  await page.mouse.move(startX, startY);
  await page.mouse.down({ button: 'left' });
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const curX = startX + t * length;
    const curY = startY + Math.sin(t * Math.PI * 2) * 55;
    await page.mouse.move(curX, curY, { steps: 2 });
    await page.waitForTimeout(18);
  }
  await page.mouse.up({ button: 'left' });
  await page.waitForTimeout(300);
}

async function runDesktopSuite(browser, theme) {
  const isLight = theme === 'light';
  const outDir = isLight ? DIRS.desktopLight : DIRS.desktopDark;
  const tag = isLight ? 'desktop_light' : 'desktop_dark';
  console.log(`\n======================================================`);
  console.log(`   RUNNING SUITE: DESKTOP ${theme.toUpperCase()} (1440x900)`);
  console.log(`======================================================`);

  const page = await browser.newPage();
  page.on('pageerror', (err) => console.warn(`   [Browser error] ${err.message}`));

  try {
    // 1. Initial Onboarding state (First Run)
    await prepareAppState(page, { mode: 'play', theme, onboarded: false, width: 1440, height: 900 });
    await snap(page, outDir, `01_${tag}_onboarding_overlay.png`, `First-Run Tutorial & Welcome Card`);

    // 2. Dismiss onboarding to clean canvas
    await prepareAppState(page, { mode: 'play', theme, onboarded: true, width: 1440, height: 900 });
    await snap(page, outDir, `02_${tag}_play_canvas_default.png`, `Play Mode Default View with 3D Viewport`);

    // 3. Top Bar options
    // Top Bar - Settings Sheet
    await page.evaluate(() => window.__testApp?.openModal('settings'));
    await snap(page, outDir, `03_${tag}_topbar_settings_sheet.png`, `Top Bar: Preferences / Settings Sheet`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Top Bar - Project Sessions Modal
    await page.evaluate(() => window.__testApp?.openModal('sessions'));
    await snap(page, outDir, `04_${tag}_topbar_sessions_modal.png`, `Top Bar: Project Sessions Modal`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Top Bar - Studio Illumination Modal
    await page.evaluate(() => window.__testApp?.openModal('illumination'));
    await snap(page, outDir, `05_${tag}_topbar_illumination_modal.png`, `Top Bar: Studio Illumination Modal`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Top Bar - Toybox (3D Model Library)
    await page.evaluate(() => window.__testApp?.openModal('toybox'));
    await snap(page, outDir, `06_${tag}_topbar_toybox_modal.png`, `Top Bar: Model Library / Toybox Modal`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // 4. Play Mode Tool Dock: Tools and Popouts
    // Draw tool
    await page.evaluate(() => window.__testApp?.setTool('draw'));
    await snap(page, outDir, `07_${tag}_dock_draw_active.png`, `Play Tool Dock: Draw Tool Active`);

    // Shape tool with Shape Settings Sheet
    await page.evaluate(() => {
      window.__testApp?.setTool('shape');
      window.__testApp?.openSheet('shapes');
    });
    await snap(page, outDir, `08_${tag}_shapes_sheet_options.png`, `Play Dock: Shape Tool with ShapesSheet`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Erase tool
    await page.evaluate(() => window.__testApp?.setTool('eraser'));
    await snap(page, outDir, `09_${tag}_dock_erase_active.png`, `Play Tool Dock: Erase Tool Active`);
    await page.evaluate(() => window.__testApp?.setTool('draw'));

    // Quick Color Popout
    await page.evaluate(() => {
      const colorBtn = document.querySelector('button[aria-label="Color"]');
      if (colorBtn) colorBtn.click();
      else window.__testApp?.openSheet('colour');
    });
    await snap(page, outDir, `10_${tag}_quick_color_popout.png`, `Play Dock: Quick Color Swatch Popout`);

    // Quick Size Popout
    await page.evaluate(() => {
      const sizeBtn = document.querySelector('button[aria-label="Stroke size"]');
      if (sizeBtn) sizeBtn.click();
      else window.__testApp?.openSheet('size');
    });
    await snap(page, outDir, `11_${tag}_quick_size_popout.png`, `Play Dock: Quick Stroke Size Presets Popout`);

    // Curated Brushes Popout
    await page.evaluate(() => {
      const brushBtn = document.querySelector('button[aria-label="Brushes"]');
      if (brushBtn) brushBtn.click();
      else window.__testApp?.openSheet('brushes');
    });
    await snap(page, outDir, `12_${tag}_curated_brushes_popout.png`, `Play Dock: Curated Brushes Popout`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Magic FX Sheet
    await page.evaluate(() => window.__testApp?.openSheet('fx'));
    await snap(page, outDir, `13_${tag}_magic_fx_sheet.png`, `Submenu: Magic FX Shader Sheet`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // 3D Model Importer (PlayImporter)
    await page.evaluate(() => window.__testApp?.openModal('importer'));
    await snap(page, outDir, `14_${tag}_3d_model_importer_modal.png`, `Submenu: 3D Model Importer Modal`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Surface and Geometry Mode Toggles
    await page.evaluate(() => {
      window.__testApp?.setBrushSettings((prev) => ({
        ...prev,
        drawingMode: 'spatial_3d',
        profile: 'tube',
      }));
    });
    await snap(page, outDir, `15_${tag}_surface_geometry_mode.png`, `Play Dock: Surface & Geometry Mode Toggles`);

    // 5. Pro Mode Suite
    console.log(`   Switching to Pro Mode (${theme})...`);
    await page.evaluate(() => window.__testApp?.setUiMode('pro'));
    await page.waitForTimeout(600);
    await snap(page, outDir, `16_${tag}_pro_canvas_default.png`, `Pro Mode: Default View with 5-Mode Rail & Telemetry`);

    // Pro Rail Mode 1: Select Panel
    await page.evaluate(() => window.__testApp?.openSheet('select'));
    await snap(page, outDir, `17_${tag}_pro_rail_select_panel.png`, `Pro Rail Mode 1: Select & Transform Panel`);

    // Pro Rail Mode 2: Draw Panel (Presets & Sliders)
    await page.evaluate(() => window.__testApp?.openSheet('draw'));
    await snap(page, outDir, `18_${tag}_pro_rail_draw_panel_presets.png`, `Pro Rail Mode 2: Draw Panel Presets`);

    // Draw Panel Materials & Stroke Profiles (scroll down)
    await page.evaluate(() => {
      const panel = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
      if (panel) panel.scrollTop = 380;
    });
    await snap(page, outDir, `19_${tag}_pro_draw_materials_profiles.png`, `Pro Draw Panel: Materials & Stroke Profiles`);

    // Draw Panel Eraser Modes
    await page.evaluate(() => {
      const panel = document.querySelector('aside[aria-label="Draw Panel"] .overflow-y-auto');
      if (panel) panel.scrollTop = 0;
      const eraseBtn = document.querySelector('aside[aria-label="Draw Panel"] button[title*="Eraser"]');
      if (eraseBtn) eraseBtn.click();
    });
    await snap(page, outDir, `20_${tag}_pro_draw_eraser_modes.png`, `Pro Draw Panel: Eraser Modes (Object, Slice, Vacuum, Alpha)`);

    // Pro Rail Mode 3: Create Panel
    await page.evaluate(() => window.__testApp?.openSheet('create'));
    await snap(page, outDir, `21_${tag}_pro_rail_create_panel.png`, `Pro Rail Mode 3: Create Panel with 3D Primitives`);

    // Pro Rail Mode 4: Deform Panel
    await page.evaluate(() => window.__testApp?.openSheet('deform'));
    await snap(page, outDir, `22_${tag}_pro_rail_deform_panel.png`, `Pro Rail Mode 4: Deform Panel with Liquify & Armatures`);

    // Pro Rail Mode 5: Layers Panel
    await page.evaluate(() => window.__testApp?.openSheet('layers'));
    await snap(page, outDir, `23_${tag}_pro_rail_layers_panel.png`, `Pro Rail Mode 5: Layers Panel with Blend Modes`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Switch back to Play mode for next tests
    await page.evaluate(() => window.__testApp?.setUiMode('play'));
    await page.waitForTimeout(400);

  } finally {
    await page.close();
  }
}

async function runMobileSuite(browser, theme) {
  const isLight = theme === 'light';
  const outDir = isLight ? DIRS.mobileLight : DIRS.mobileDark;
  const tag = isLight ? 'mobile_light' : 'mobile_dark';
  console.log(`\n======================================================`);
  console.log(`   RUNNING SUITE: MOBILE ${theme.toUpperCase()} (390x844 NARROW VIEWPORT)`);
  console.log(`======================================================`);

  const page = await browser.newPage();
  page.on('pageerror', (err) => console.warn(`   [Browser error] ${err.message}`));

  try {
    // 1. Mobile Default Canvas (Portrait Compressed Rail layout)
    await prepareAppState(page, { mode: 'play', theme, onboarded: true, width: 390, height: 844 });
    await snap(page, outDir, `01_${tag}_canvas_default.png`, `Mobile Clean View with Vertical Tool Rail`);

    // 2. Mobile Top Bar - Settings Sheet
    await page.evaluate(() => window.__testApp?.openModal('settings'));
    await snap(page, outDir, `02_${tag}_settings_sheet.png`, `Mobile Preferences / Settings Sheet`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // 3. Mobile Top Bar - Sessions Modal
    await page.evaluate(() => window.__testApp?.openModal('sessions'));
    await snap(page, outDir, `03_${tag}_sessions_modal.png`, `Mobile Project Sessions Modal`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // 4. Mobile Top Bar - Studio Illumination
    await page.evaluate(() => window.__testApp?.openModal('illumination'));
    await snap(page, outDir, `04_${tag}_illumination_modal.png`, `Mobile Studio Illumination Modal`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // 5. Mobile Top Bar - Toybox
    await page.evaluate(() => window.__testApp?.openModal('toybox'));
    await snap(page, outDir, `05_${tag}_toybox_modal.png`, `Mobile Toybox 3D Model Library`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // 6. Mobile Play Dock Tools & Popouts
    // Shape Settings Sheet
    await page.evaluate(() => {
      window.__testApp?.setTool('shape');
      window.__testApp?.openSheet('shapes');
    });
    await snap(page, outDir, `06_${tag}_shapes_sheet.png`, `Mobile Shape Tool with ShapesSheet`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Quick Color Popout
    await page.evaluate(() => {
      const colorBtn = document.querySelector('button[aria-label="Color"]');
      if (colorBtn) colorBtn.click();
      else window.__testApp?.openSheet('colour');
    });
    await snap(page, outDir, `07_${tag}_quick_color_popout.png`, `Mobile Quick Color Popout`);

    // Quick Size Popout
    await page.evaluate(() => {
      const sizeBtn = document.querySelector('button[aria-label="Stroke size"]');
      if (sizeBtn) sizeBtn.click();
      else window.__testApp?.openSheet('size');
    });
    await snap(page, outDir, `08_${tag}_quick_size_popout.png`, `Mobile Quick Stroke Size Popout`);

    // Curated Brushes Popout
    await page.evaluate(() => {
      const brushBtn = document.querySelector('button[aria-label="Brushes"]');
      if (brushBtn) brushBtn.click();
      else window.__testApp?.openSheet('brushes');
    });
    await snap(page, outDir, `09_${tag}_curated_brushes_popout.png`, `Mobile Curated Brushes Popout`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Magic FX Sheet
    await page.evaluate(() => window.__testApp?.openSheet('fx'));
    await snap(page, outDir, `10_${tag}_magic_fx_sheet.png`, `Mobile Magic FX Shader Sheet`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // 3D Model Importer
    await page.evaluate(() => window.__testApp?.openModal('importer'));
    await snap(page, outDir, `11_${tag}_3d_model_importer.png`, `Mobile 3D Model Importer`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Pro Mode in Mobile
    await page.evaluate(() => window.__testApp?.setUiMode('pro'));
    await page.waitForTimeout(500);
    await snap(page, outDir, `12_${tag}_pro_canvas_default.png`, `Mobile Pro Mode View`);

    // Pro Draw Panel in Mobile
    await page.evaluate(() => window.__testApp?.openSheet('draw'));
    await snap(page, outDir, `13_${tag}_pro_draw_panel.png`, `Mobile Pro Draw Panel`);
    await page.evaluate(() => window.__testApp?.closeAllModals());

    // Switch back to Play
    await page.evaluate(() => window.__testApp?.setUiMode('play'));
    await page.waitForTimeout(300);

  } finally {
    await page.close();
  }
}

async function runUniversalModalsSuite(browser) {
  console.log(`\n======================================================`);
  console.log(`   RUNNING SUITE: UNIVERSAL MODALS & ADVANCED STUDIOS`);
  console.log(`======================================================`);

  const page = await browser.newPage();
  try {
    await prepareAppState(page, { mode: 'play', theme: 'dark', onboarded: true, width: 1440, height: 900 });

    const modals = [
      { id: 'illumination', file: '01_simple_illumination_modal.png', title: 'Simple Illumination Studio' },
      { id: 'colorStudio', file: '02_color_studio_modal.png', title: 'Advanced Compact Color Studio' },
      { id: 'skyEnvironment', file: '03_sky_environment_modal.png', title: 'Skybox & Atmosphere Environment Studio' },
      { id: 'renderSettings', file: '04_render_settings_modal.png', title: 'Render Settings & Post-Processing Shaders' },
      { id: 'raycast', file: '05_raycast_settings_modal.png', title: '3D Surface Raycasting & Snapping Modal' },
      { id: 'curveDecimate', file: '06_curve_decimate_modal.png', title: 'RDP Curve Decimation Modal' },
      { id: 'bentGuide', file: '07_bent_guide_modal.png', title: 'Bent 3D Manifold Guide & Lofting Modal' },
      { id: 'scaffolding', file: '08_scaffolding_studio_modal.png', title: '3D Collision Scaffolding & Procedural Armatures' },
      { id: 'customMirror', file: '09_custom_mirror_modal.png', title: 'Arbitrary 3D Mirror Plane Modal' },
      { id: 'arViewer', file: '10_ar_viewer_modal.png', title: 'WebXR Augmented Reality Viewer Modal' },
      { id: 'numpad', file: '11_numpad_keypad_modal.png', title: 'Floating On-Screen Numeric Keypad Modal' },
      { id: 'dna', file: '12_dna_inspector_modal.png', title: 'Holistic DNA Inspector & Injector' },
      { id: 'clipboard', file: '13_reference_clipboard_modal.png', title: 'Floating Reference Blueprint Clipboard Modal' },
      { id: 'export', file: '14_export_modal.png', title: 'Export 3D Artwork & Draco GLB Modal' },
    ];

    for (const m of modals) {
      await page.evaluate((modalId) => window.__testApp?.openModal(modalId), m.id);
      await snap(page, DIRS.modals, m.file, m.title, 800);
      await page.evaluate(() => window.__testApp?.closeAllModals());
      await page.waitForTimeout(300);
    }

    // 15. 3D Navigators (Standalone Sandbox testbench)
    console.log(`   Navigating to 3D Navigator Sandbox (?sandbox)...`);
    await page.goto(`${BASE_URL}/?sandbox`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await snap(page, DIRS.modals, '15_3d_navigator_sandbox.png', '3D Spatial Gimbal Navigator Sandbox (15 Tactical Variations)');

  } finally {
    await page.close();
  }
}

async function runBrushStrokesSuite(browser) {
  console.log(`\n======================================================`);
  console.log(`   RUNNING SUITE: BRUSH STROKES ON 3D VIEWPORT CANVAS`);
  console.log(`======================================================`);

  const page = await browser.newPage();
  try {
    await prepareAppState(page, { mode: 'play', theme: 'dark', onboarded: true, width: 1440, height: 900 });

    const curatedBrushes = [
      { id: 'clay', name: 'Soft Clay', color: '#f59e0b', profile: 'ribbon', mat: 'shaded', size: 0.045 },
      { id: 'build', name: 'Add Volume', color: '#38bdf8', profile: 'tube', mat: 'shaded', size: 0.05 },
      { id: 'move', name: 'Drag Surface', color: '#10b981', profile: 'ribbon', mat: 'shaded', size: 0.04 },
      { id: 'inflate', name: 'Inflate', color: '#ec4899', profile: 'tube', mat: 'shaded', size: 0.06 },
      { id: 'pinch', name: 'Pinch Marker', color: '#ef4444', profile: 'marker', mat: 'shaded', size: 0.035 },
      { id: 'crease', name: 'Crease Wire', color: '#64748b', profile: 'tube', mat: 'shadeless', size: 0.015 },
      { id: 'flatten', name: 'Flatten', color: '#8b5cf6', profile: 'conformal', mat: 'shaded', size: 0.045 },
      { id: 'smooth', name: 'Smooth Blend', color: '#06b6d4', profile: 'conformal', mat: 'shaded', size: 0.05 },
      { id: 'neon_cable', name: 'Glowing Neon Cable', color: '#a855f7', profile: 'tube', mat: 'glow', size: 0.035 },
      { id: 'stipple_texture', name: 'Stipple Particle Spray', color: '#fbbf24', profile: 'ribbon', mat: 'shaded', pattern: 'stipple', size: 0.05 },
    ];

    let strokeIdx = 0;
    for (const b of curatedBrushes) {
      strokeIdx++;
      // Configure brush settings
      await page.evaluate((brush) => {
        window.__testApp?.setTool('draw');
        window.__testApp?.setBrushSettings((prev) => ({
          ...prev,
          color: brush.color,
          profile: brush.profile,
          materialType: brush.mat,
          size: brush.size,
          patternType: brush.pattern || 'none',
          drawingMode: 'spatial_3d',
        }));
      }, b);

      // Draw stroke on 3D canvas with staggered offset
      const startX = 380 + (strokeIdx % 3) * 160;
      const startY = 240 + Math.floor(strokeIdx / 3) * 110;
      await drawStrokeOnCanvas(page, { startX, startY, length: 220, steps: 20 });

      await snap(
        page,
        DIRS.brushes,
        `stroke_${strokeIdx.toString().padStart(2, '0')}_${b.id}.png`,
        `Canvas Brush Stroke: ${b.name} (${b.profile}, ${b.mat})`
      );
    }

  } finally {
    await page.close();
  }
}

async function main() {
  const startTime = Date.now();
  console.log(`\n======================================================`);
  console.log(`  ROBOT TESTER - PAPERROCKETS REMIX 3D (V19)`);
  console.log(`  Target: ${BASE_URL}`);
  console.log(`  Output: ${SCREENSHOTS_DIR}`);
  console.log(`======================================================\n`);

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
    ],
  });

  try {
    // 1. Desktop Dark Mode (1440x900)
    await runDesktopSuite(browser, 'dark');

    // 2. Desktop Light Mode (1440x900)
    await runDesktopSuite(browser, 'light');

    // 3. Mobile Dark Mode (390x844 narrow viewport)
    await runMobileSuite(browser, 'dark');

    // 4. Mobile Light Mode (390x844 narrow viewport)
    await runMobileSuite(browser, 'light');

    // 5. Universal Modals & Advanced Studios
    await runUniversalModalsSuite(browser);

    // 6. Brush Strokes on Canvas
    await runBrushStrokesSuite(browser);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n======================================================`);
    console.log(`  ROBOT TEST RUN COMPLETE!`);
    console.log(`  Total Screenshots Captured: ${capturedCount}`);
    console.log(`  Duration: ${duration}s`);
    console.log(`  All screenshots saved to:`);
    console.log(`  ${SCREENSHOTS_DIR}`);
    console.log(`======================================================\n`);

  } catch (err) {
    console.error('Fatal error during Robot Tester execution:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
