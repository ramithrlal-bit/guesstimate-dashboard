const https = require('https');
const options = {
    hostname: 'www.amfiindia.com',
    path: '/',
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const matches = data.match(/href="([^"]+)"/ig) || [];
        const uniqueLinks = Array.from(new Set(matches.map(l => l.replace(/href="|\"/ig, ''))));
        console.log('Research links:', uniqueLinks.filter(l => l.toLowerCase().includes('research') || l.toLowerCase().includes('aum') || l.toLowerCase().includes('data')));
    });
});
req.end();
