import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

async function captureFooterPreviews() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load via localhost dev server or local HTML file
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // 1. Desktop 1440px Viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  const desktopFooter = await page.$('.footer-signature-editorial');
  if (desktopFooter) {
    const desktopScreenshot = await desktopFooter.screenshot();
    const artDesktop = path.resolve('C:/Users/rian.silva/.gemini/antigravity/brain/e8114441-0fc5-4251-bdf2-8caab9bec4b5/media__footer_desktop_1440.png');
    fs.writeFileSync(artDesktop, desktopScreenshot);
    console.log(`Saved desktop footer screenshot to ${artDesktop}`);
  } else {
    console.error('Desktop footer element not found!');
  }

  // 2. Mobile 390px Viewport
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileFooter = await page.$('.footer-signature-editorial');
  if (mobileFooter) {
    const mobileScreenshot = await mobileFooter.screenshot();
    const artMobile = path.resolve('C:/Users/rian.silva/.gemini/antigravity/brain/e8114441-0fc5-4251-bdf2-8caab9bec4b5/media__footer_mobile_390.png');
    fs.writeFileSync(artMobile, mobileScreenshot);
    console.log(`Saved mobile footer screenshot to ${artMobile}`);
  } else {
    console.error('Mobile footer element not found!');
  }

  await browser.close();
}

captureFooterPreviews().catch(err => { console.error(err); process.exit(1); });
