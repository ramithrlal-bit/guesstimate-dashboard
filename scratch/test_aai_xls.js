const https = require('https');

https.get('https://www.aai.aero/en/business-opportunities/aai-traffic-news', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const hrefs = data.match(/href="([^"]+)"/ig) || [];
        const xlsFiles = hrefs.filter(h => 
            h.toLowerCase().includes('.xls') || 
            h.toLowerCase().includes('.csv')
        ).map(h => h.replace(/href="/i, '').replace('"', ''));
        console.log(`Found ${xlsFiles.length} XLS/CSV file links.`);
        if (xlsFiles.length > 0) {
            console.log(xlsFiles);
        }
    });
}).on('error', e => console.error('Error:', e));
