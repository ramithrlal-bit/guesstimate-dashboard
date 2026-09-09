const https = require('https');

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = new URL(redirectUrl, url).toString();
        }
        return resolve(fetchUrl(redirectUrl));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
};

fetchUrl('https://www.rbi.org.in/Scripts/WSSDisplay.aspx')
  .then(res => {
    console.log('Final Status Code:', res.status);
    console.log('Final Data Length:', res.data.length);
    const links = res.data.match(/href="([^"]+)"/ig)?.filter(l => l.toLowerCase().includes('excel') || l.toLowerCase().includes('.xlsx') || l.toLowerCase().includes('.xls') || l.toLowerCase().includes('csv')) || [];
    console.log('Data Links:', links);
  })
  .catch(console.error);
