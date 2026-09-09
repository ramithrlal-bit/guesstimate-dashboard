const https = require('https');

https.get('https://www.rbi.org.in/Scripts/WSSViewDetail.aspx?TYPE=Section&PARAM1=1', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        const links = data.match(/href="([^"]+)"/ig);
        if (links) {
           console.log(links.slice(0, 50));
        }
    });
}).on('error', e => console.error(e));
