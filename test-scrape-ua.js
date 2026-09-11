const pdf = require('pdf-parse');
const cheerio = require('cheerio');

async function testFetch(url, name) {
    try {
        console.log(`\n--- Fetching: ${name} ---`);
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        console.log(`Status: ${res.status}`);
        if (!res.ok) return;
        
        if (url.endsWith('.pdf')) {
            const buffer = await res.arrayBuffer();
            const data = await pdf(Buffer.from(buffer));
            console.log(`Length: ${data.text.length} chars`);
            console.log(data.text.substring(0, 100));
        } else {
            const html = await res.text();
            console.log(`HTML Length: ${html.length} chars`);
            const $ = cheerio.load(html);
            console.log($('title').text());
        }
    } catch(err) {
        console.error(`Error for ${name}:`, err.message);
    }
}

async function run() {
    await testFetch('https://www.indiadigitalsummit.in/wp-content/uploads/2026/01/Internet-in-India-2025-Press-Release-Final.pdf', 'IAMAI');
    await testFetch('https://www.ericsson.com/en/press-releases/2/2026/ericsson-mobility-report-indias-5g-subscriptions-to-reach-1-1-billion-by-2031', 'Ericsson Mobility');
    await testFetch('https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/newsroom/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf', 'FICCI-EY M&E');
}

run();
