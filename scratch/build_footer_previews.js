import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. Desktop Footer Render (1440x360 SVG)
const desktopSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 360" width="1440" height="360">
  <!-- Deep Petroleum Background -->
  <rect width="1440" height="360" fill="#0D2933"/>

  <g transform="translate(120, 64)">
    <!-- Left Column: Brand & Tagline -->
    <g transform="translate(0, 0)">
      <!-- Symbol -->
      <g transform="translate(0, 0)">
        <rect width="36" height="36" rx="8" fill="#0D2933"/>
        <path d="M 18 4 L 31 18 L 18 31 L 4 18 Z" fill="#9FC3B3"/>
        <path d="M 18 11 L 23 16 L 23 23 L 18 18 L 13 23 L 13 16 Z" fill="#0D2933"/>
      </g>
      
      <!-- Titles -->
      <text x="50" y="21" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="17" font-weight="800" letter-spacing="2">MARUAN RAMOS VAZ</text>
      <text x="50" y="36" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">ENFERMEIRO</text>

      <!-- Tagline -->
      <text x="0" y="84" fill="#9FC3B3" font-family="Georgia, serif" font-style="italic" font-size="19">“Conhecimento para cuidar. Presença para acolher.”</text>
    </g>

    <!-- Right Column: Navigation -->
    <g transform="translate(860, 0)">
      <text x="0" y="14" fill="#9CA3AF" font-family="-apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="2">ATENDIMENTOS</text>
      
      <!-- Nav Item 1 -->
      <text x="0" y="46" fill="#F0F4F5" font-family="-apple-system, sans-serif" font-size="15" font-weight="600">Curativos</text>
      <text x="320" y="46" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="14">↗</text>
      <line x1="0" y1="56" x2="335" y2="56" stroke="#22424D" stroke-width="1"/>

      <!-- Nav Item 2 -->
      <text x="0" y="82" fill="#F0F4F5" font-family="-apple-system, sans-serif" font-size="15" font-weight="600">Passagem de Sonda</text>
      <text x="320" y="82" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="14">↗</text>
      <line x1="0" y1="92" x2="335" y2="92" stroke="#22424D" stroke-width="1"/>

      <!-- Nav Item 3 -->
      <text x="0" y="118" fill="#F0F4F5" font-family="-apple-system, sans-serif" font-size="15" font-weight="600">Acompanhamento</text>
      <text x="320" y="118" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="14">↗</text>
      <line x1="0" y1="128" x2="335" y2="128" stroke="#22424D" stroke-width="1"/>
    </g>
  </g>

  <!-- Single Discreet Hairline Separator -->
  <line x1="120" y1="240" x2="1320" y2="240" stroke="#1E3E48" stroke-width="1"/>

  <!-- Level 2: Bottom Metadata -->
  <g transform="translate(120, 285)">
    <text x="0" y="0" fill="#7E9DA6" font-family="-apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">GOIÂNIA · APARECIDA DE GOIÂNIA</text>
    <text x="1200" y="0" fill="#7E9DA6" font-family="-apple-system, sans-serif" font-size="12" text-anchor="end">© 2026 Maruan Ramos Vaz. Todos os direitos reservados.</text>
  </g>
</svg>`;

// 2. Mobile Footer Render (390x520 SVG)
const mobileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 520" width="390" height="520">
  <!-- Deep Petroleum Background -->
  <rect width="390" height="520" fill="#0D2933"/>

  <g transform="translate(24, 48)">
    <!-- Brand Section -->
    <g transform="translate(0, 0)">
      <g transform="translate(0, 0)">
        <rect width="32" height="32" rx="7" fill="#0D2933"/>
        <path d="M 16 4 L 28 16 L 16 28 L 4 16 Z" fill="#9FC3B3"/>
        <path d="M 16 10 L 21 15 L 21 21 L 16 16 L 11 21 L 11 15 Z" fill="#0D2933"/>
      </g>

      <text x="44" y="18" fill="#FFFFFF" font-family="-apple-system, sans-serif" font-size="15" font-weight="800" letter-spacing="1.8">MARUAN RAMOS VAZ</text>
      <text x="44" y="32" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">ENFERMEIRO</text>

      <text x="0" y="74" fill="#9FC3B3" font-family="Georgia, serif" font-style="italic" font-size="17">“Conhecimento para cuidar. Presença para acolher.”</text>
    </g>

    <!-- Hairline 1 -->
    <line x1="0" y1="120" x2="342" y2="120" stroke="#1E3E48" stroke-width="1"/>

    <!-- Navigation Section -->
    <g transform="translate(0, 150)">
      <text x="0" y="0" fill="#9CA3AF" font-family="-apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="2">ATENDIMENTOS</text>

      <text x="0" y="34" fill="#F0F4F5" font-family="-apple-system, sans-serif" font-size="15" font-weight="600">Curativos</text>
      <text x="325" y="34" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="14">↗</text>
      <line x1="0" y1="44" x2="342" y2="44" stroke="#1E3E48" stroke-width="1"/>

      <text x="0" y="74" fill="#F0F4F5" font-family="-apple-system, sans-serif" font-size="15" font-weight="600">Passagem de Sonda</text>
      <text x="325" y="74" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="14">↗</text>
      <line x1="0" y1="84" x2="342" y2="84" stroke="#1E3E48" stroke-width="1"/>

      <text x="0" y="114" fill="#F0F4F5" font-family="-apple-system, sans-serif" font-size="15" font-weight="600">Acompanhamento</text>
      <text x="325" y="114" fill="#9FC3B3" font-family="-apple-system, sans-serif" font-size="14">↗</text>
      <line x1="0" y1="124" x2="342" y2="124" stroke="#1E3E48" stroke-width="1"/>
    </g>

    <!-- Hairline 2 -->
    <line x1="0" y1="335" x2="342" y2="335" stroke="#1E3E48" stroke-width="1"/>

    <!-- Level 2: Metadata -->
    <g transform="translate(0, 375)">
      <text x="0" y="0" fill="#7E9DA6" font-family="-apple-system, sans-serif" font-size="11" font-weight="700" letter-spacing="1.2">GOIÂNIA · APARECIDA DE GOIÂNIA</text>
      <text x="0" y="30" fill="#7E9DA6" font-family="-apple-system, sans-serif" font-size="12">© 2026 Maruan Ramos Vaz. Todos os direitos reservados.</text>
    </g>
  </g>
</svg>`;

async function renderFooterImages() {
  // Render Desktop PNG
  const deskBuffer = await sharp(Buffer.from(desktopSvg)).png().toBuffer();
  const artDesktop = path.resolve('C:/Users/rian.silva/.gemini/antigravity/brain/e8114441-0fc5-4251-bdf2-8caab9bec4b5/media__footer_desktop_1440.png');
  fs.writeFileSync(artDesktop, deskBuffer);
  console.log(`Saved desktop footer image to ${artDesktop}`);

  // Render Mobile PNG
  const mobBuffer = await sharp(Buffer.from(mobileSvg)).png().toBuffer();
  const artMobile = path.resolve('C:/Users/rian.silva/.gemini/antigravity/brain/e8114441-0fc5-4251-bdf2-8caab9bec4b5/media__footer_mobile_390.png');
  fs.writeFileSync(artMobile, mobBuffer);
  console.log(`Saved mobile footer image to ${artMobile}`);
}

renderFooterImages().catch(err => { console.error(err); process.exit(1); });
