const https = require('https');

function fetchAmfi() {
    const options = {
        hostname: 'www.amfiindia.com',
        path: '/research-information/amfi-monthly',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            console.log(`Status: ${res.statusCode}`);
            const links = data.match(/href="([^"]+)"/ig) || [];
            
            // Look for excel or pdf links
            const dataLinks = links.filter(l => l.toLowerCase().includes('.xlsx') || l.toLowerCase().includes('.xls') || l.toLowerCase().includes('.pdf'));
            console.log(`Found ${dataLinks.length} data links.`);
            console.log(dataLinks.slice(0, 20));
        });
    });

    req.on('error', (e) => {
        console.error('Request error:', e);
    });
    
    req.end();
}

fetchAmfi();
