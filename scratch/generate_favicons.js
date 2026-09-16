import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

// 1. Define SVG Content for Favicon (Dark Background + Sage Mineral "M" Diamond)
const svgDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="96" fill="#0D2933"/>
  <!-- Diamond Base with Negative-Space M Geometry -->
  <g fill="#9FC3B3">
    <!-- Left Wing of M in Diamond -->
    <path d="M 256 72 L 420 236 L 360 296 L 256 192 L 152 296 L 92 236 Z" />
    <!-- Bottom Anchor of Diamond -->
    <path d="M 256 244 L 340 328 L 256 412 L 172 328 Z" />
  </g>
</svg>`;

// Alternative SVG design option 2: Solid Diamond with Inner Architectural M Cutout
const svgDarkOpt2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="100" fill="#0D2933"/>
  <!-- Outer Diamond Contour -->
  <path d="M 256 64 L 448 256 L 256 448 L 64 256 Z" fill="#9FC3B3"/>
  <!-- Inner Cutout in Petroleum forming the crisp "M" & central diamond detail -->
  <path d="M 256 160 L 336 240 L 336 336 L 256 256 L 176 336 L 176 240 Z" fill="#0D2933"/>
</svg>`;

// Alternative SVG design option 3: Ultra-clean Monogram Diamond (Subtle M Facets)
const svgDarkOpt3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#0D2933"/>
  <!-- Diamond Shell -->
  <path d="M 256 70 L 442 256 L 256 442 L 70 256 Z" fill="none" stroke="#9FC3B3" stroke-width="28" stroke-linejoin="miter"/>
  <!-- Inner M Architectural Pillars -->
  <path d="M 170 330 L 170 220 L 256 306 L 342 220 L 342 330" fill="none" stroke="#9FC3B3" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

if (!fs.existsSync('./public')) fs.mkdirSync('./public', { recursive: true });
if (!fs.existsSync('./scratch')) fs.mkdirSync('./scratch', { recursive: true });
fs.writeFileSync('./public/favicon.svg', svgDarkOpt2);
fs.writeFileSync('./scratch/favicon_opt1.svg', svgDark);
fs.writeFileSync('./scratch/favicon_opt2.svg', svgDarkOpt2);
fs.writeFileSync('./scratch/favicon_opt3.svg', svgDarkOpt3);

console.log('SVG files generated.');
