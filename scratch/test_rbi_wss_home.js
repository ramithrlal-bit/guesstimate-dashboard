const https = require('https');

https.get('https://www.rbi.org.in/Scripts/WSSDisplay.aspx', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    if (res.headers.location) {
        console.log("Redirects to:", res.headers.location);
    }
    console.log("Data length:", data.length);
    console.log("Preview:", data.substring(0, 300));
  });
}).on('error', e => console.error(e));
