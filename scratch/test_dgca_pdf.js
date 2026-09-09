const https = require('https');

https.get('https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/InventoryList/airOperation/certification/scheduled/sch-oper.pdf', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const pdfMatches = data.match(/src="([^"]+)"/ig);
        console.log("Status:", res.statusCode);
        console.log("Found SRCs:");
        if (pdfMatches) {
            console.log(pdfMatches.filter(s => s.toLowerCase().includes('.pdf') || s.toLowerCase().includes('pdf')));
        }
        
        // Also check if data contains the raw PDF bytes
        if (data.includes('%PDF-')) {
            console.log('File is a raw PDF.');
        } else {
            console.log('File is HTML.');
        }
    });
}).on('error', e => console.error(e));
