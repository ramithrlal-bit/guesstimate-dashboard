const https = require('https');

function fetchAndSearch(url) {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            const hrefs = data.match(/href="([^"]+\.pdf)"/ig) || [];
            console.log(`\n--- AAI Traffic News ---`);
            console.log(`Status: ${res.statusCode}`);
            console.log(`Found ${hrefs.length} PDF links.`);
            console.log(hrefs.slice(0, 10));
        });
    }).on('error', e => console.error(`Error:`, e));
}

fetchAndSearch('https://www.aai.aero/en/business-opportunities/aai-traffic-news');
