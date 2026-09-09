const https = require('https');

https.get('https://www.aai.aero/en/business-opportunities/aai-traffic-news', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const hrefs = data.match(/href="([^"]+)"/ig) || [];
        const files = hrefs.filter(h => 
            h.toLowerCase().includes('.pdf') || 
            h.toLowerCase().includes('.xls') || 
            h.toLowerCase().includes('.xlsx') ||
            h.toLowerCase().includes('.csv')
        ).map(h => h.replace(/href="/i, '').replace('"', ''));
        console.log(`Found ${files.length} file links.`);
        console.log(files.slice(0, 30));
    });
}).on('error', e => console.error('Error:', e));
