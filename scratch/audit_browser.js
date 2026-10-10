const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
  await page.goto('https://guesstimate-dashboard.vercel.app/', { waitUntil: 'networkidle2' });
  
  // Wait for the data fetch to complete
  await new Promise(r => setTimeout(r, 2000));
  
  const ecomCards = await page.$$eval('[data-metric^="ecommerce_"]', elements => {
      return elements.map(el => {
          const valueEl = el.querySelector('.value');
          return {
              id: el.getAttribute('data-metric'),
              text: valueEl ? valueEl.innerText.trim() : 'NOT_FOUND'
          };
      });
  });
  
  console.log(JSON.stringify(ecomCards, null, 2));
  await browser.close();
})();
