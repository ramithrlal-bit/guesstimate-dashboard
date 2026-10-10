const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/data-metric="ev_[^"]+"/g) || [];
const evKeys = [...new Set(match.map(s => s.replace('data-metric="', '').replace('"', '')))];
console.log(evKeys.join('\n'));
