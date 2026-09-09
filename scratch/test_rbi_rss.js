const https = require('https');

https.get('https://www.rbi.org.in/Scripts/rss.aspx', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    const links = data.match(/href="([^"]+\.xml)"/ig);
    console.log(links);
  });
}).on('error', e => console.error(e));
