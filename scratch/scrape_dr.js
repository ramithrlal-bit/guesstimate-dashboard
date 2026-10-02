const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

async function run() {
    const r = await fetch('https://datareportal.com/reports/digital-2026-india');
    if (!r.ok) {
        console.log('failed', r.status);
        return;
    }
    const html = await r.text();
    const $ = cheerio.load(html);
    const text = $('body').text().replace(/\s+/g, ' ');
    fs.writeFileSync('scratch/dr_text.txt', text);
    console.log('Saved to scratch/dr_text.txt');
}
run();
