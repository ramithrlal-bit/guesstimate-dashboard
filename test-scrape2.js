const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function testHtml(url, name) {
    try {
        console.log(`\n--- Fetching HTML: ${name} ---`);
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        const text = $('body').text().replace(/\s+/g, ' ');
        
        if (name === 'Counterpoint') {
            const context = text.match(/.{0,100}million.{0,100}/gi) || [];
            console.log('Counterpoint Snippet million:', context.slice(0, 5));
            const context2 = text.match(/.{0,100}650.{0,100}/gi) || [];
            console.log('Counterpoint Snippet 650:', context2.slice(0, 5));
            const context3 = text.match(/.{0,100}700.{0,100}/gi) || [];
            console.log('Counterpoint Snippet 700:', context3.slice(0, 5));
        }
    } catch(err) {
        console.error(`Error for ${name}:`, err.message);
    }
}

async function run() {
    await testHtml('https://counterpointresearch.com/en/reports/india-smartphone-installed-base-and-replacement-cycle-by-brand-by-price-band', 'Counterpoint');
}

run();
