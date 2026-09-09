const https = require('https');
const url = 'https://www.rbi.org.in/Scripts/WSSDisplay.aspx';

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Look for Excel or CSV links
    const matches = data.match(/href="([^"]+\.(?:xls|xlsx|csv))"/ig) || [];
    console.log('Found links:', matches.slice(0, 10));
    console.log('Data length:', data.length);
  });
}).on('error', (e) => {
  console.error('Error:', e);
});
