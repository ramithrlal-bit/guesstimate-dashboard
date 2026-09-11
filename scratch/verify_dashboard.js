const puppeteer = require('puppeteer');

async function verify() {
    const url = 'file:///C:/Users/ramit/OneDrive/Desktop/guesstimate-dashboard/index.html';
    console.log(`Launching Puppeteer to open ${url}...`);
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        console.log('Page loaded');
        
        // Wait a bit just in case
        await new Promise(r => setTimeout(r, 2000));
        
        // Extract the metrics
        const metrics = await page.evaluate(() => {
            const results = {};
            const keys = [
                'digital_internet_users',
                'digital_rural_internet_users',
                'digital_urban_internet_users',
                'digital_internet_penetration'
            ];
            
            for (const key of keys) {
                const el = document.querySelector(`[data-metric="${key}"]`);
                if (el) {
                    results[key] = el.innerText.trim();
                } else {
                    results[key] = 'NOT FOUND';
                }
            }
            return results;
        });
        
        console.log('Extracted metrics:', metrics);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await browser.close();
    }
}

verify();
