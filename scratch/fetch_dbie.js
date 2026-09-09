const https = require('https');
const fs = require('fs');

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
};

async function run() {
  try {
    const res = await fetchUrl('https://data.rbi.org.in/');
    fs.writeFileSync('scratch/rbi_home.html', res.data);
    console.log('Saved rbi_home.html, status:', res.status);
    
    // Check for JSON or CSV APIs mentioned in the HTML
    const apiLinks = res.data.match(/href="([^"]+)"/g)?.filter(l => l.toLowerCase().includes('api') || l.toLowerCase().includes('json') || l.toLowerCase().includes('csv') || l.toLowerCase().includes('xml')) || [];
    console.log('API/Data links found:', apiLinks);
  } catch (e) {
    console.error(e);
  }
}

run();
