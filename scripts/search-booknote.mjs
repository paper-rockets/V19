import fs from 'fs';

const code = fs.readFileSync('workview_code.js', 'utf8');

const matches = [...code.matchAll(/BookNote/g)];
console.log('Matches for BookNote:', matches.length);
for (const m of matches) {
  console.log(code.slice(Math.max(0, m.index - 200), m.index + 350));
  console.log('---------------------------------');
}
