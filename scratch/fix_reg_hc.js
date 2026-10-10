const fs = require('fs');
let text = fs.readFileSync('lib/core/registry.js', 'utf8');
text = text.replace(/healthcare_govt_expenditure_share[^]+?approved_domain: null,[^]+?extraction_method: 'MANUAL_NO_RELIABLE_SOURCE'/g, match => {
    return match.replace("approved_domain: null", "approved_domain: 'pib.gov.in'").replace("extraction_method: 'MANUAL_NO_RELIABLE_SOURCE'", "extraction_method: 'AUTO_PIB_REGEX'");
});
fs.writeFileSync('lib/core/registry.js', text);
console.log('Replaced');
