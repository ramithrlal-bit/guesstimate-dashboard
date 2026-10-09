const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const lines = html.split('\n');

let inFintech = false;
const metrics = [];

for (const line of lines) {
  if (line.includes('<section class="sec" id="fintech"')) {
    inFintech = true;
  }
  if (inFintech && line.includes('<section class="sec"') && !line.includes('id="fintech"')) {
    inFintech = false; // Next section
  }
  
  if (inFintech) {
    // extract data-metric="something"
    const match = line.match(/data-metric="([^"]+)"/g);
    if (match) {
      for (const m of match) {
        metrics.push(m.replace('data-metric="', '').replace('"', ''));
      }
    }
  }
}

console.log(metrics.join('\n'));
