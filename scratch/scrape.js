const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function scrape() {
    // 1. DataReportal
    let url = 'https://datareportal.com/reports/digital-2024-india';
    let res = await fetch(url);
    if (!res.ok) console.error("DR 2024 failed", res.status);
    let html = await res.text();
    let $ = cheerio.load(html);
    let text = $('body').text().replace(/\s+/g, ' ');
    
    // Look for numbers related to Youtube, Instagram, etc
    let matches = text.match(/.{0,50}(YouTube|Instagram|Facebook|LinkedIn|Snapchat|X|social media user identities).{0,50}/gi);
    console.log("=== DataReportal ===");
    if (matches) {
        matches.slice(0, 30).forEach(m => console.log(m));
    }

    // 2. Counterpoint
    url = 'https://www.counterpointresearch.com/insights/india-smartphone-share/';
    res = await fetch(url);
    html = await res.text();
    $ = cheerio.load(html);
    text = $('body').text().replace(/\s+/g, ' ');
    matches = text.match(/.{0,50}(smartphone|feature phone).{0,50}/gi);
    console.log("=== Counterpoint ===");
    if (matches) {
        matches.slice(0, 30).forEach(m => console.log(m));
    }

    // 3. GSMA (find valid URL)
    url = 'https://www.gsma.com/en/newsroom/press-release/india-to-become-the-second-largest-smartphone-market/';
    res = await fetch(url);
    console.log("GSMA old URL status:", res.status);
    // Let's just search the GSMA site maybe or general GSMA india unique mobile subscribers
}

scrape().catch(console.error);
