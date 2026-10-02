const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function scrape() {
    let searchUrl = 'https://lite.duckduckgo.com/lite/';
    let res = await fetch(searchUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0' },
        body: 'q=site:gsma.com "India" "unique mobile subscribers"'
    });
    let html = await res.text();
    let $ = cheerio.load(html);
    $('.result-snippet').each((i, el) => {
        console.log($(el).text().trim());
        let href = $(el).parent().parent().find('.result-url').text().trim();
        console.log(href);
    });
}
scrape().catch(console.error);
