const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function scrape() {
    let url = 'https://datareportal.com/reports/digital-2024-india';
    let res = await fetch(url);
    let html = await res.text();
    let $ = cheerio.load(html);
    let text = $('body').text().replace(/\s+/g, ' ');
    
    const platforms = ['Instagram', 'Snapchat', 'X', 'LinkedIn'];
    platforms.forEach(p => {
        let regex = new RegExp(`.{0,50}${p} had (\\d+\\.?\\d*) million.{0,50}`, 'gi');
        let m = text.match(regex);
        if (m) console.log(m.slice(0,2));
    });

    let searchUrl = 'https://html.duckduckgo.com/html/?q=site:gsma.com+"India"+"unique+mobile+subscribers"';
    res = await fetch(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    html = await res.text();
    $ = cheerio.load(html);
    console.log("GSMA Search:");
    $('.result__snippet').each((i, el) => {
        console.log($(el).text());
        console.log($(el).parent().find('.result__url').text());
    });
}
scrape().catch(console.error);
