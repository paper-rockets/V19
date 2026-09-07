import fs from 'fs';

const js = fs.readFileSync('E:/X/AiStudio Workflow/V19/scripts/../scripts/inspect-workview.mjs'); // wait, let's fetch or save WorkView-aMEM2U2Q.js to file

async function inspect() {
  const res = await fetch('https://gallery.feather.art/assets/WorkView-aMEM2U2Q.js');
  const code = await res.text();
  fs.writeFileSync('workview_code.js', code);

  // Search for .feather in workview_code.js
  const matches = [...code.matchAll(/\.feather/g)];
  console.log('Matches for .feather:', matches.length);
  for (const m of matches) {
    const idx = m.index;
    console.log('--- Context around .feather at', idx, '---');
    console.log(code.slice(Math.max(0, idx - 300), idx + 400));
  }
}

inspect().catch(console.error);
