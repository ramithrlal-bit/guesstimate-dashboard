const fs = require('fs');
let content = fs.readFileSync('lib/core/registry.js', 'utf8');
content = content.replace(
/agri_total_foodgrain_production: \{\s*approved_domain: null,\s*extraction_method: 'MANUAL_NO_RELIABLE_SOURCE',\s*expected_unit: 'MT',\s*min_value: 0,\s*max_value: 2000\s*\}/g,
`agri_total_foodgrain_production: {
        approved_domain: 'pib.gov.in',
        extraction_method: 'AUTO_PIB_REGEX',
        expected_unit: 'MT',
        min_value: 0,
        max_value: 2000
    }`
);
content = content.replace(
/healthcare_govt_expenditure_share: \{\s*approved_domain: null,\s*extraction_method: 'MANUAL_NO_RELIABLE_SOURCE',\s*expected_unit: '%',\s*min_value: 0,\s*max_value: 100\s*\}/g,
`healthcare_govt_expenditure_share: {
        approved_domain: 'pib.gov.in',
        extraction_method: 'AUTO_PIB_REGEX',
        expected_unit: '%',
        min_value: 0,
        max_value: 100
    }`
);
content = content.replace(
/ecommerce_e_commerce_market_size_2025: \{\s*approved_domain: 'unknown',\s*extraction_method: 'LIVE_COMPANY',\s*expected_unit: 'unknown',\s*min_value: 0,\s*max_value: 1000000000000\s*\}/g,
`ecommerce_e_commerce_market_size_2025: {
        approved_domain: 'bain.com',
        extraction_method: 'AUTO_BAIN_REGEX',
        expected_unit: 'Billion USD',
        min_value: 0,
        max_value: 10000
    }`
);
fs.writeFileSync('lib/core/registry.js', content, 'utf8');
console.log('Done');
