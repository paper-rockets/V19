import fs from 'fs';

async function fetchWork() {
  console.log('Fetching Feather work JSON...');
  const resMeta = await fetch('https://gallery.feather.art/api/gallery/work/g5oou4i');
  const metaJson = await resMeta.json();
  console.log('Meta JSON:', JSON.stringify(metaJson, null, 2).slice(0, 1000));
  fs.writeFileSync('feather_meta.json', JSON.stringify(metaJson, null, 2));

  console.log('Fetching Feather .feather file...');
  const resFeather = await fetch('https://gallery.feather.art/api/gallery/work/g5oou4i.feather');
  const arrayBuffer = await resFeather.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync('feather_model.feather', buffer);
  console.log('Feather file size:', buffer.length, 'bytes');

  // Check header or if it is a zip / gltf / json / binary
  const header = buffer.slice(0, 16);
  console.log('Header bytes:', header);
  console.log('Header ASCII:', header.toString('utf8'));
}

fetchWork().catch(console.error);
