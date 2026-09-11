const puppeteer = require('puppeteer');
const fs = require('fs');

async function downloadPdf() {
    const url = 'https://www.indiadigitalsummit.in/wp-content/uploads/2026/01/Internet-in-India-2025-Press-Release-Final.pdf';
    console.log(`Launching Puppeteer to fetch ${url}...`);
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set a normal user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    let buffer;
    try {
        const response = await page.goto(url, { waitUntil: 'networkidle2' });
        console.log('Status:', response.status());
        buffer = await response.buffer();
        console.log(`Downloaded ${buffer.length} bytes`);
        fs.writeFileSync('iamai.pdf', buffer);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await browser.close();
    }
}

downloadPdf();
