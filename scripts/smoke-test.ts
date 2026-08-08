import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  const tests = [
    { name: 'home', url: 'http://localhost:3000/' },
    { name: 'services', url: 'http://localhost:3000/services' },
    { name: 'service-detail', url: 'http://localhost:3000/services/cockroach-gel-treatment' },
    { name: 'blog', url: 'http://localhost:3000/blog' },
    { name: 'contact', url: 'http://localhost:3000/contact' },
    { name: 'about', url: 'http://localhost:3000/about' },
  ];
  
  for (const t of tests) {
    console.log(`Testing ${t.name}...`);
    const res = await page.goto(t.url, { waitUntil: 'networkidle', timeout: 20000 });
    console.log(`  Status: ${res?.status()}`);
    await page.screenshot({ path: `/home/z/my-project/scripts/screenshot-${t.name}.png`, fullPage: false });
    console.log(`  Screenshot saved`);
  }
  
  await browser.close();
  console.log('All tests done.');
}
main().catch(e => { console.error(e); process.exit(1); });
