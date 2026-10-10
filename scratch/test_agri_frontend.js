const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    await page.goto('https://guesstimate-dashboard.vercel.app/', { waitUntil: 'networkidle2' });
    
    await new Promise(r => setTimeout(r, 4000));
    
    const results = await page.$$eval('[data-metric^="agri_"]', elements => {
        return elements.map(el => ({
            id: el.getAttribute('data-metric'),
            text: el.innerText
        }));
    });
    
    console.log(JSON.stringify(results, null, 2));
    await browser.close();
})();
