const https = require('https');

https.get('https://data.rbi.org.in', (res) => {
  console.log('Status Code:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Data length:', data.length));
}).on('error', (e) => {
  console.error('Error:', e);
});
