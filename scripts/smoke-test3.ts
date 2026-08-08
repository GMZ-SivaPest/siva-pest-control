import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  console.log('Testing home...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Scroll through the page to trigger reveal animations
  const heights = [200, 500, 800, 1200, 1600, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
  for (const h of heights) {
    await page.evaluate((y) => window.scrollTo(0, y), h);
    await page.waitForTimeout(400);
  }
  // Back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/home/z/my-project/scripts/screenshot-home-full-v2.png', fullPage: true });
  console.log('Full screenshot saved');
  
  // Also capture mid-page section
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/home/z/my-project/scripts/screenshot-services-teaser.png', fullPage: false });
  console.log('Services teaser screenshot saved');
  
  await browser.close();
  console.log('Done.');
}
main().catch(e => { console.error(e); process.exit(1); });
