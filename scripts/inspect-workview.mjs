async function inspectWorkView() {
  const res = await fetch('https://gallery.feather.art/assets/WorkView-aMEM2U2Q.js');
  const js = await res.text();
  console.log('WorkView length:', js.length);

  const featherIdx = js.indexOf('.feather');
  console.log('.feather index:', featherIdx);
  if (featherIdx !== -1) {
    console.log(js.slice(featherIdx - 200, featherIdx + 600));
  }

  // Check imports or libraries in WorkView
  const imports = js.match(/import\(.*?\)/g);
  console.log('Dynamic imports in WorkView:', imports);
}

inspectWorkView().catch(console.error);
