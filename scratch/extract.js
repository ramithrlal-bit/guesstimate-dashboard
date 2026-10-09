const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /data-metric="([^"]+)"/g;
let match;
const metrics = new Set();
while ((match = regex.exec(html)) !== null) {
  if (match[1].startsWith('digital_')) {
    metrics.add(match[1]);
  }
}
console.log(Array.from(metrics));
