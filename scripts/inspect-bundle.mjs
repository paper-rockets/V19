import fs from 'fs';

async function inspectBundle() {
  console.log('Fetching Feather bundle...');
  const res = await fetch('https://gallery.feather.art/assets/index-C4iq9Zv7.js');
  const js = await res.text();
  console.log('Bundle length:', js.length);

  // Search for FTHR or feather file reading
  const idx = js.indexOf('FTHR');
  console.log('FTHR index:', idx);
  if (idx !== -1) {
    console.log('Context around FTHR:', js.slice(Math.max(0, idx - 200), idx + 800));
  }

  // Look for stroke, curve, geometry, or protobuf / msgpack / zip
  const matches = js.match(/[a-zA-Z0-9_$]+\.decompress|[a-zA-Z0-9_$]+\.inflate|pako|fflate|protobuf|flatbuffers/gi);
  console.log('Compression / format matches:', [...new Set(matches)]);
}

inspectBundle().catch(console.error);
