const https = require('https');

https.get('https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/inventory/statistics/statistics.jsp', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const dataUrlMatches = data.match(/data-url="([^"]+)"[^>]*>([^<]+)/ig);
        if (dataUrlMatches) {
            console.log("Data URLs containing 'air' or 'data':");
            console.log(dataUrlMatches.filter(m => m.toLowerCase().includes('air') || m.toLowerCase().includes('data')).slice(0, 50).join('\n'));
        }
        
        const hrefMatches = data.match(/href="([^"]+)"[^>]*>([^<]+)/ig);
        if (hrefMatches) {
            console.log("Hrefs containing 'air' or 'data':");
            console.log(hrefMatches.filter(m => m.toLowerCase().includes('air') || m.toLowerCase().includes('data')).slice(0, 50).join('\n'));
        }
    });
}).on('error', e => console.error(e));
