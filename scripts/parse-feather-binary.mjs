import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('feather_model.feather');
console.log('Total length:', buf.length);
console.log('Magic:', buf.toString('utf8', 0, 4)); // FTHR
const v1 = buf.readUInt32LE(4);
const v2 = buf.readUInt32LE(8);
console.log('Uint32 at offset 4:', v1);
console.log('Uint32 at offset 8:', v2);

// Let's test if there is a zlib / gzip / deflate stream starting somewhere in the first 100 bytes
for (let offset = 4; offset < 64; offset++) {
  try {
    const slice = buf.subarray(offset);
    const unzipped = zlib.inflateSync(slice);
    console.log(`Successfully inflated with zlib.inflateSync at offset ${offset}! Uncompressed length:`, unzipped.length);
    fs.writeFileSync('feather_unzipped.bin', unzipped);
    // Check if unzipped is text/JSON
    const textSample = unzipped.toString('utf8', 0, 500);
    console.log('Unzipped text sample:\n', textSample);
    break;
  } catch (e) {
    // continue
  }
}

for (let offset = 4; offset < 64; offset++) {
  try {
    const slice = buf.subarray(offset);
    const unzipped = zlib.inflateRawSync(slice);
    console.log(`Successfully inflated with zlib.inflateRawSync at offset ${offset}! Uncompressed length:`, unzipped.length);
    fs.writeFileSync('feather_unzipped_raw.bin', unzipped);
    const textSample = unzipped.toString('utf8', 0, 500);
    console.log('Unzipped raw text sample:\n', textSample);
    break;
  } catch (e) {
    // continue
  }
}
