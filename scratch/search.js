const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function search() {
    try {
        const query = encodeURIComponent('site:npci.org.in/uploads/ filetype:pdf upi statistics');
        const url = `https://html.duckduckgo.com/html/?q=${query}`;
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
        });
        const html = await res.text();
        const $ = cheerio.load(html);
        const links = [];
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.includes('npci.org.in') && href.toLowerCase().includes('.pdf')) {
                // Duckduckgo URLs are often wrapped, e.g. //duckduckgo.com/l/?uddg=https://...
                let actualUrl = href;
                if (href.includes('uddg=')) {
                    actualUrl = decodeURIComponent(href.split('uddg=')[1].split('&')[0]);
                }
                links.push(actualUrl);
            }
        });
        console.log("Found links:");
        console.log(links);
    } catch(e) {
        console.error(e);
    }
}
search();
