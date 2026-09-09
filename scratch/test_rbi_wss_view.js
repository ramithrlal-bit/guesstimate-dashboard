const https = require('https');

https.get('https://www.rbi.org.in/Scripts/WSSViewDetail.aspx?TYPE=Section&PARAM1=1', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log(data.substring(0, 1000));
        
        // Find links
        const links = data.match(/href="([^"]+)"/g);
        if (links) {
           console.log('Links found:', links.length);
           console.log(links.filter(l => l.includes('EXCEL') || l.includes('WSSViewDetail') || l.includes('WSSDisplay')).slice(0, 20));
        }
    });
}).on('error', e => console.error(e));
