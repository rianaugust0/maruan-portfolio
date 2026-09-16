import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Primary SVG Design: The Architectural Diamond M
const svgMain = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="108" fill="#0D2933"/>
  <!-- Diamond Shape -->
  <path d="M 256 68 L 444 256 L 256 444 L 68 256 Z" fill="#9FC3B3"/>
  <!-- Negative Space M Cutout in Petroleum -->
  <path d="M 256 168 L 332 244 L 332 340 L 256 264 L 180 340 L 180 244 Z" fill="#0D2933"/>
</svg>`;

const svgInverted = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="108" fill="#F5F6F2"/>
  <!-- Diamond Shape -->
  <path d="M 256 68 L 444 256 L 256 444 L 68 256 Z" fill="#0D2933"/>
  <!-- Negative Space M Cutout in Off-White -->
  <path d="M 256 168 L 332 244 L 332 340 L 256 264 L 180 340 L 180 244 Z" fill="#F5F6F2"/>
</svg>`;

async function generateFavicons() {
  if (!fs.existsSync('./public')) fs.mkdirSync('./public', { recursive: true });

  // 1. Write SVG
  fs.writeFileSync('./public/favicon.svg', svgMain);
  console.log('Saved public/favicon.svg');

  // 2. Generate PNGs using Sharp
  const sizes = [
    { file: 'favicon-16x16.png', size: 16 },
    { file: 'favicon-32x32.png', size: 32 },
    { file: 'apple-touch-icon.png', size: 180 },
    { file: 'android-chrome-512x512.png', size: 512 }
  ];

  for (const s of sizes) {
    const pngBuffer = await sharp(Buffer.from(svgMain))
      .resize(s.size, s.size)
      .png()
      .toBuffer();
    fs.writeFileSync(`./public/${s.file}`, pngBuffer);
    console.log(`Generated public/${s.file} (${s.size}x${s.size})`);
  }

  // Copy favicon-32x32.png to favicon.ico
  fs.copyFileSync('./public/favicon-32x32.png', './public/favicon.ico');
  console.log('Generated public/favicon.ico');

  // 3. Create a high-res Visual Preview Card (800x600 PNG) demonstrating the proposed design in 512px, 32px, and 16px
  const previewSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 720" width="880" height="720">
    <rect width="880" height="720" rx="16" fill="#111827"/>
    
    <!-- Title Section -->
    <text x="48" y="56" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="24" font-weight="700">PROPOSTA DE FAVICON · MARUAN RAMOS VAZ</text>
    <text x="48" y="88" fill="#9CA3AF" font-family="-apple-system, sans-serif" font-size="14">Losango geométrico autoral em tom Sálvia Mineral (#9FC3B3) sobre fundo Petróleo Profundo (#0D2933),</text>
    <text x="48" y="108" fill="#9CA3AF" font-family="-apple-system, sans-serif" font-size="14">esculpindo sutilmente a letra "M" através do espaço negativo interno.</text>

    <!-- Card 1: Main High-Res Emblem -->
    <rect x="48" y="140" width="372" height="260" rx="12" fill="#1F2937" stroke="#374151" stroke-width="1"/>
    <text x="72" y="176" fill="#E5E7EB" font-family="-apple-system, sans-serif" font-size="15" font-weight="600">1. ÍCONE PRINCIPAL (512px / Retina)</text>

    <g transform="translate(154, 200)">
      <rect width="160" height="160" rx="34" fill="#0D2933"/>
      <path d="M 80 21 L 138 80 L 80 138 L 21 80 Z" fill="#9FC3B3"/>
      <path d="M 80 52 L 103 76 L 103 106 L 80 82 L 57 106 L 57 76 Z" fill="#0D2933"/>
    </g>

    <!-- Card 2: Inverted Light Emblem -->
    <rect x="460" y="140" width="372" height="260" rx="12" fill="#1F2937" stroke="#374151" stroke-width="1"/>
    <text x="484" y="176" fill="#E5E7EB" font-family="-apple-system, sans-serif" font-size="15" font-weight="600">2. VERSÃO INVERTIDA (Fundo Claro)</text>

    <g transform="translate(566, 200)">
      <rect width="160" height="160" rx="34" fill="#F5F6F2"/>
      <path d="M 80 21 L 138 80 L 80 138 L 21 80 Z" fill="#0D2933"/>
      <path d="M 80 52 L 103 76 L 103 106 L 80 82 L 57 106 L 57 76 Z" fill="#F5F6F2"/>
    </g>

    <!-- Card 3: Real Browser Tab Simulation (16x16 & 32x32) -->
    <rect x="48" y="428" width="784" height="244" rx="12" fill="#1F2937" stroke="#374151" stroke-width="1"/>
    <text x="72" y="464" fill="#E5E7EB" font-family="-apple-system, sans-serif" font-size="15" font-weight="600">3. SIMULAÇÃO EM ABAS REAIS DO NAVEGADOR (16x16px e 32x32px)</text>

    <!-- Dark Tab (16x16) -->
    <rect x="72" y="492" width="340" height="40" rx="8" fill="#1E293B" stroke="#334155"/>
    <g transform="translate(86, 504)">
      <rect width="16" height="16" rx="3.5" fill="#0D2933"/>
      <path d="M 8 2 L 14 8 L 8 14 L 2 8 Z" fill="#9FC3B3"/>
      <path d="M 8 5 L 10 7 L 10 10 L 8 8 L 6 10 L 6 7 Z" fill="#0D2933"/>
    </g>
    <text x="112" y="517" fill="#E2E8F0" font-family="-apple-system, sans-serif" font-size="13" font-weight="500">Maruan Ramos Vaz — Enfermeiro...</text>
    <text x="72" y="552" fill="#9CA3AF" font-family="-apple-system, sans-serif" font-size="12">Aba Escura (16x16px — Alta Legibilidade)</text>

    <!-- Light Tab (16x16) -->
    <rect x="460" y="492" width="340" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0"/>
    <g transform="translate(474, 504)">
      <rect width="16" height="16" rx="3.5" fill="#0D2933"/>
      <path d="M 8 2 L 14 8 L 8 14 L 2 8 Z" fill="#9FC3B3"/>
      <path d="M 8 5 L 10 7 L 10 10 L 8 8 L 6 10 L 6 7 Z" fill="#0D2933"/>
    </g>
    <text x="500" y="517" fill="#0F172A" font-family="-apple-system, sans-serif" font-size="13" font-weight="500">Maruan Ramos Vaz — Enfermeiro...</text>
    <text x="460" y="552" fill="#9CA3AF" font-family="-apple-system, sans-serif" font-size="12">Aba Clara (16x16px — Contraste Elevado)</text>

    <!-- Retina Desktop Tab (32x32) -->
    <rect x="72" y="580" width="728" height="52" rx="8" fill="#0F172A" stroke="#334155"/>
    <g transform="translate(88, 590)">
      <rect width="32" height="32" rx="7" fill="#0D2933"/>
      <path d="M 16 4 L 28 16 L 16 28 L 4 16 Z" fill="#9FC3B3"/>
      <path d="M 16 10 L 21 15 L 21 21 L 16 16 L 11 21 L 11 15 Z" fill="#0D2933"/>
    </g>
    <text x="132" y="611" fill="#F1F5F9" font-family="-apple-system, sans-serif" font-size="14" font-weight="600">Maruan Ramos Vaz — Enfermeiro Particular em Goiânia</text>
    <text x="640" y="611" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="12" font-weight="600">Display Retina / 32px</text>
  </svg>`;

  const previewBuffer = await sharp(Buffer.from(previewSvg))
    .png()
    .toBuffer();

  const artifactPath = path.resolve('C:/Users/rian.silva/.gemini/antigravity/brain/e8114441-0fc5-4251-bdf2-8caab9bec4b5/media__favicon_preview.png');
  fs.writeFileSync(artifactPath, previewBuffer);
  console.log(`Saved artifact preview image to ${artifactPath}`);
}

generateFavicons().catch(err => { console.error(err); process.exit(1); });
