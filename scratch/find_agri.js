const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
const startIdx = lines.findIndex(l => l.includes('id="agriculture"'));
if (startIdx !== -1) {
    let endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('</section>'));
    if (endIdx === -1) endIdx = startIdx + 80;
    console.log(lines.slice(startIdx, endIdx + 1).join('\n'));
} else {
    console.log('No agriculture section found');
}
