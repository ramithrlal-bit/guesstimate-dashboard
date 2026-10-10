const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
    await page.goto('https://html.duckduckgo.com/html/?q=site:pib.gov.in+"Third+Advance+Estimates"+"2025-26"');
    const links = await page.$$eval('a.result__url', els => els.map(e => e.href));
    console.log(links);
    await browser.close();
})();
