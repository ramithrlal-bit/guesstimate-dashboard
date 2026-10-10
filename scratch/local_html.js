const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/data-metric="quickcommerce_[^"]+"/g);
console.log('Local Matches:', match ? match.length : 0);
