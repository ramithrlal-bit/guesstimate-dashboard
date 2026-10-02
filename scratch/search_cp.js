const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function run() {
    const q = 'site:counterpointresearch.com "installed base" India smartphone feature phone';
    const r = await fetch('https://html.duckduckgo.com/html/?q=' + encodeURIComponent(q));
    if (!r.ok) return console.log('failed', r.status);
    const html = await r.text();
    const $ = cheerio.load(html);
    $('.result__snippet').each((i, el) => console.log($(el).text()));
}
run();
