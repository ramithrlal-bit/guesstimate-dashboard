const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/data-metric="healthcare_[^"]+"/g) || [];
const keys = [...new Set(match.map(s => s.replace('data-metric="', '').replace('"', '')))];
console.log('HTML Keys Count:', keys.length);
console.log(keys.join('\n'));
