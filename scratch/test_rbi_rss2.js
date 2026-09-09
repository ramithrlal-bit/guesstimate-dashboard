const https = require('https');
const url = 'https://www.rbi.org.in/Scripts/rss.aspx';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const xmlLinks = data.match(/href="([^"]+\.xml)"/ig) || [];
    console.log('XML Links found:', xmlLinks);
  });
}).on('error', console.error);
