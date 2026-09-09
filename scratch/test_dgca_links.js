const https = require('https');

https.get('https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/inventory/statistics/statistics.jsp', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const matches = data.match(/href="([^"]+)"[^>]*>([^<]+)/ig);
        if (matches) {
            console.log("Passenger/Traffic links:");
            console.log(matches.filter(m => m.toLowerCase().includes('traffic') || m.toLowerCase().includes('passenger') || m.toLowerCase().includes('domestic')).slice(0, 30));
        }
    });
}).on('error', e => console.error(e));
