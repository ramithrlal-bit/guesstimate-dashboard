const https = require('https');

https.get('https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/inventory/statistics/statistics.jsp', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  }
}, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        if(res.statusCode === 302 || res.statusCode === 301) { 
            console.log('Location:', res.headers.location); 
        }
        console.log('Length:', data.length);
        console.log(data.substring(0, 1000));
        
        // Look for links to PDFs or Excel files containing traffic or passenger
        const links = data.match(/href="([^"]+)"/ig);
        if (links) {
            console.log("PDF/Excel links:");
            console.log(links.filter(l => l.toLowerCase().includes('.pdf') || l.toLowerCase().includes('.xls') || l.toLowerCase().includes('.csv') || l.toLowerCase().includes('traffic')).slice(0, 20));
        }
    });
}).on('error', e => console.error(e));
