const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach(l => {
    if (l.includes('<section class="sec"')) {
        console.log(l.trim());
    }
});
