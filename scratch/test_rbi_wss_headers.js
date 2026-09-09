const https = require('https');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
  }
};

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
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
    const links = res.data.match(/href="([^"]+)"/ig)?.filter(l => l.toLowerCase().includes('excel') || l.toLowerCase().includes('.xlsx') || l.toLowerCase().includes('.xls') || l.toLowerCase().includes('csv')) || [];
    console.log('Data Links:', links);
  })
  .catch(console.error);
