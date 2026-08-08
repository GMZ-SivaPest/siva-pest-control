import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  console.log('Testing home with full wait...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  // Wait for hero image to load
  await page.waitForTimeout(3000);
  // Scroll a bit to trigger reveal animations
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/z/my-project/scripts/screenshot-home-v2.png', fullPage: false });
  console.log('Home screenshot saved');

  // Also take a full-page screenshot
  await page.screenshot({ path: '/home/z/my-project/scripts/screenshot-home-full.png', fullPage: true });
  console.log('Home full screenshot saved');
  
  await browser.close();
  console.log('Done.');
}
main().catch(e => { console.error(e); process.exit(1); });
