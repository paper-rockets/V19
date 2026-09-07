import fs from 'fs';

async function searchBundle() {
  const res = await fetch('https://gallery.feather.art/assets/WorkView-aMEM2U2Q.js');
  const js = await res.text();

  function findTerms(terms) {
    for (const term of terms) {
      let idx = 0;
      let count = 0;
      while ((idx = js.indexOf(term, idx)) !== -1) {
        count++;
        if (count <= 3) {
          console.log(`Match for "${term}":`, js.slice(Math.max(0, idx - 100), idx + 200));
        }
        idx += term.length;
      }
      console.log(`Total for "${term}":`, count);
    }
  }

  findTerms(['WebGLRenderer', 'Scene', 'Camera', 'FTHR', 'feather', 'decode', 'buffer']);
}

searchBundle().catch(console.error);
