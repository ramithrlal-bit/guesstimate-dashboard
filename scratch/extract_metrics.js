const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const regex = /data-metric="(ecommerce_[^"]+)"/g;
let match;
const metrics = new Set();
while ((match = regex.exec(content)) !== null) {
    metrics.add(match[1]);
}
console.log(Array.from(metrics).join('\n'));
