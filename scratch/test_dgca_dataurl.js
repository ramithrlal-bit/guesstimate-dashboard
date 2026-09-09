const https = require('https');

https.get('https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/inventory/statistics/statistics.jsp', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const matches = data.match(/data-url="([^"]+)"/g);
        if (matches) {
            console.log('Total data-urls:', matches.length);
            const filtered = matches.filter(m => m.toLowerCase().includes('traffic') || m.toLowerCase().includes('passenger') || m.toLowerCase().includes('stat') || m.toLowerCase().includes('domes'));
            console.log('Filtered:', filtered.length);
            console.log(filtered.slice(0, 50).join('\n'));
        }
    });
}).on('error', e => console.error(e));
