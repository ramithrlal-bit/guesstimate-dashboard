const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function scrape() {
  const res = await fetch('https://www.iamai.in/knowledge-centre');
  const html = await res.text();
  const $ = cheerio.load(html);
  $('a').each((i, e) => {
    const h = $(e).attr('href');
    if (h && h.toLowerCase().includes('internet')) {
      console.log(h);
    }
  });
}
scrape().catch(console.error);
