const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

async function run() {
    const r = await fetch('https://www.counterpointresearch.com/insights/india-smartphone-share/', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (!r.ok) {
        console.log('failed', r.status);
        return;
    }
    const html = await r.text();
    const $ = cheerio.load(html);
    const text = $('body').text().replace(/\s+/g, ' ');
    fs.writeFileSync('scratch/cp_text.txt', text);
    console.log('Saved to scratch/cp_text.txt');
}
run();
