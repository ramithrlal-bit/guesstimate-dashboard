const fs = require('fs');

for (const f of ['poc_agri.js', 'poc_healthcare.js', 'poc_ecommerce.js']) {
    let content = fs.readFileSync(`lib/connectors/${f}`, 'utf8');
    content = content.replace(/period_label:\s*[^,]+,/, `$& \n        period_end: '2025-12-31',`);
    fs.writeFileSync(`lib/connectors/${f}`, content);
}
