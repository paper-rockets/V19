import fs from 'fs';

const code = fs.readFileSync('workview_code.js', 'utf8');

function searchMatches(pattern) {
  const matches = [...code.matchAll(pattern)];
  console.log(`Matches for ${pattern}:`, matches.length);
  for (const m of matches.slice(0, 5)) {
    console.log(code.slice(Math.max(0, m.index - 150), m.index + 250));
    console.log('-----------------------------------');
  }
}

searchMatches(/file_url/g);
searchMatches(/api\/gallery\/work/g);
