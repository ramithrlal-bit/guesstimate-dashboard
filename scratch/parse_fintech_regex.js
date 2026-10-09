const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const lines = html.split('\n');

let inFintech = false;

console.log('Metric | Value | Label');

for (const line of lines) {
  if (line.includes('<section class="sec" id="fintech"')) {
    inFintech = true;
  }
  if (inFintech && line.includes('<section class="sec"') && !line.includes('id="fintech"')) {
    inFintech = false;
  }
  
  if (inFintech) {
    if (line.includes('data-metric="')) {
      const metricMatch = line.match(/data-metric="([^"]+)"/);
      if (!metricMatch) continue;
      const key = metricMatch[1];
      
      let valMatch = line.match(/<span class="v" data-metric="[^"]+">([^<]+)/);
      if (!valMatch) valMatch = line.match(/<span class="v"[^>]*>([^<]+)/);
      const val = valMatch ? valMatch[1] : '';
      
      let labelMatch = line.match(/<span class="l">([^<]+)<\/span>/);
      const label = labelMatch ? labelMatch[1] : '';
      
      console.log(`${key} | ${val} | ${label}`);
    }
  }
}
