const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
const startIdx = lines.findIndex(l => l.includes('id="ev"'));
if (startIdx !== -1) {
    let endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('<!-- ============'));
    if (endIdx === -1) endIdx = startIdx + 50;
    console.log(lines.slice(startIdx, endIdx).join('\n'));
} else {
    console.log('No ev section found');
}
