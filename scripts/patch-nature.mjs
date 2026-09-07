import fs from 'fs';

const files = [
  'E:\\X\\AiStudio Workflow\\V19\\public\\fablecities\\assets\\index-eKs5Uldr.js',
  'E:\\X\\AiStudio Workflow\\V19\\fablecities\\assets\\index-eKs5Uldr.js'
];

for (const f of files) {
  let text = fs.readFileSync(f, 'utf-8');
  const target = 't.demo=!0,t.seed=1337,t.headless=!0,t.focus=[`terrain`,`environment`,`roads`,`zoning`,`buildings`]';
  const replacement = 't.demo=!1,t.seed=1337,t.headless=!0,t.focus=[`terrain`,`environment`]';
  if (!text.includes(target)) {
    console.error('Target not found in', f);
    continue;
  }
  text = text.replace(target, replacement);
  fs.writeFileSync(f, text, 'utf-8');
  console.log('Successfully patched', f);
}
