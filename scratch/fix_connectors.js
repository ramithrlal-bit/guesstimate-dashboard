const fs = require('fs');

for (const f of ['poc_agri.js', 'poc_healthcare.js']) {
    let content = fs.readFileSync(`lib/connectors/${f}`, 'utf8');
    content = content.replace(/unitConversion:\s*[^,]+,/, `$& \n        data_type: 'official',`);
    fs.writeFileSync(`lib/connectors/${f}`, content);
}

let ecom = fs.readFileSync('lib/connectors/poc_ecommerce.js', 'utf8');
ecom = ecom.replace(/unitConversion:\s*[^,]+,/, `$& \n        data_type: 'estimate',`);
fs.writeFileSync('lib/connectors/poc_ecommerce.js', ecom);
