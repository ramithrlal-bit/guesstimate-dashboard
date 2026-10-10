const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pib.gov.in/PressReleasePage.aspx?PRID=2132263');
    const text = await page.$eval('body', el => el.innerText);
    console.log(text.substring(0, 1000));
    await browser.close();
})();
