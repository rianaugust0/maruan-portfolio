import fs from 'fs';
import path from 'path';

const routes = [
  { name: 'Home', file: 'dist/index.html' },
  { name: 'Curativos', file: 'dist/curativos-domiciliares-goiania/index.html' },
  { name: 'Sondagem', file: 'dist/passagem-de-sonda-goiania/index.html' },
  { name: 'Acompanhamento', file: 'dist/acompanhamento-de-enfermagem-goiania/index.html' }
];

console.log('=== STARTING AUTOMATED AUDIT OF BUILT HTML ROUTES ===\n');

let totalErrors = 0;

for (const r of routes) {
  console.log(`[AUDIT] Checking ${r.name} (${r.file})...`);
  if (!fs.existsSync(r.file)) {
    console.error(`  ❌ ERROR: File does not exist: ${r.file}`);
    totalErrors++;
    continue;
  }

  const content = fs.readFileSync(r.file, 'utf-8');

  // 1. Check title and description
  const titleMatch = content.match(/<title>(.*?)<\/title>/);
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/);
  console.log(`  ✓ Title: ${titleMatch ? titleMatch[1] : 'MISSING'}`);
  console.log(`  ✓ Meta Description: ${descMatch ? descMatch[1] : 'MISSING'}`);

  // 2. Check H1
  const h1Match = content.match(/<h1[\s\S]*?<\/h1>/);
  console.log(`  ✓ H1 Present: ${!!h1Match}`);

  // 3. Check for fragile links like href="#" or ../index.html
  if (content.includes('href="#"') || content.includes('../index.html')) {
    console.error(`  ❌ ERROR: Fragile link found in ${r.name}`);
    totalErrors++;
  } else {
    console.log(`  ✓ No fragile href="#" or ../index.html links`);
  }

  // 4. Check WhatsApp links count and structure
  const waLinks = [...content.matchAll(/href="(https:\/\/wa\.me\/5527997740754\?text=.*?)"/g)];
  console.log(`  ✓ WhatsApp CTAs found: ${waLinks.length}`);

  // 5. Check data-cta attributes
  const dataCtas = [...content.matchAll(/data-cta="(.*?)"/g)];
  console.log(`  ✓ Event taxonomy data-cta attributes found: ${dataCtas.length}`);

  // 6. Check images missing width/height
  const imgTags = [...content.matchAll(/<img\s+([^>]*?)>/g)];
  let imgMissingDim = 0;
  for (const img of imgTags) {
    const attrs = img[1];
    if (!attrs.includes('width=') || !attrs.includes('height=')) {
      imgMissingDim++;
    }
  }
  if (imgMissingDim > 0) {
    console.error(`  ❌ ERROR: ${imgMissingDim} image(s) missing width/height attributes in ${r.name}`);
    totalErrors++;
  } else {
    console.log(`  ✓ All ${imgTags.length} image(s) have width and height specified`);
  }

  // 7. Check landmarks (<main>, <header>, <footer>)
  const hasMain = content.includes('<main>');
  const hasHeader = content.includes('<header');
  const hasFooter = content.includes('<footer');
  console.log(`  ✓ Landmarks: header=${hasHeader}, main=${hasMain}, footer=${hasFooter}\n`);
}

console.log(`=== AUDIT COMPLETE. Total Errors: ${totalErrors} ===`);
if (totalErrors > 0) process.exit(1);
