const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
    await page.goto('https://pib.gov.in/PressReleasePage.aspx?PRID=2058791', { waitUntil: 'networkidle2' });
    const text = await page.$eval('body', el => el.innerText);
    console.log(text.substring(0, 3000));
    await browser.close();
})();
