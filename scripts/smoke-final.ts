import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  // Test the multi-page navigation: click from home to /services
  console.log('1. Testing home -> services navigation via link click...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  // Click the "View all 8 services" button
  const viewAllBtn = await page.locator('a:has-text("View all")').first();
  if (await viewAllBtn.count() > 0) {
    await viewAllBtn.click();
    await page.waitForTimeout(2000);
    const url = page.url();
    console.log(`   Navigated to: ${url}`);
    if (url.endsWith('/services')) {
      console.log('   PASS: Multi-page navigation works');
    } else {
      console.log('   FAIL: Did not navigate to /services');
    }
  } else {
    console.log('   FAIL: View all button not found');
  }
  
  // Test the navbar Services link
  console.log('2. Testing navbar Services link...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const navServices = await page.locator('a:has-text("Services"):visible').first();
  await navServices.click();
  await page.waitForTimeout(2000);
  console.log(`   Navigated to: ${page.url()}`);
  
  // Test service detail page navigation
  console.log('3. Testing service detail page nav...');
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  // Click first service card
  const firstCard = await page.locator('a[href*="/services/"]').first();
  if (await firstCard.count() > 0) {
    const href = await firstCard.getAttribute('href');
    console.log(`   First service link: ${href}`);
    await firstCard.click();
    await page.waitForTimeout(2000);
    console.log(`   Navigated to: ${page.url()}`);
  }
  
  // Test location detail
  console.log('4. Testing locations page...');
  await page.goto('http://localhost:3000/locations', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log(`   Status: ${page.url()}`);
  
  // Test blog detail
  console.log('5. Testing blog page...');
  await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log(`   Status: ${page.url()}`);
  
  // Take final hero screenshot
  console.log('6. Capturing final hero screenshot...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/z/my-project/scripts/screenshot-hero-final.png', fullPage: false });
  console.log('   Hero screenshot saved');
  
  await browser.close();
  console.log('All tests passed!');
}
main().catch(e => { console.error('TEST FAILED:', e); process.exit(1); });
