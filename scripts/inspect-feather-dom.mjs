import { chromium } from 'playwright';

async function inspectDom() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://gallery.feather.art/works/g5oou4i', { waitUntil: 'networkidle' });

  const result = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const gl = canvas ? canvas.getContext('webgl2') || canvas.getContext('webgl') : null;
    const globals = Object.keys(window).filter(k => !k.startsWith('webkit') && !k.startsWith('on'));
    return {
      canvasExists: !!canvas,
      canvasSize: canvas ? { w: canvas.width, h: canvas.height } : null,
      glRenderer: gl ? gl.getParameter(gl.RENDERER) : null,
      interestingGlobals: globals.filter(k => /feather|viewer|scene|engine|three|app/i.test(k)),
    };
  });

  console.log('Result:', result);
  await browser.close();
}

inspectDom().catch(console.error);
