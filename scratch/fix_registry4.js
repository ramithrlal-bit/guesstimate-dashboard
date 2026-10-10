const fs = require('fs');
let content = fs.readFileSync('lib/core/registry.js', 'utf8');

content = content.replace(/"approved_domain": null,\s*"extraction_method": "MANUAL_NO_RELIABLE_SOURCE",\s*"expected_unit": "MT",\s*"min_value": 0,\s*"max_value": 2000/, `"approved_domain": "pib.gov.in",
            "extraction_method": "AUTO_PIB_REGEX",
            "expected_unit": "MT",
            "min_value": 0,
            "max_value": 2000`);

content = content.replace(/"approved_domain": null,\s*"extraction_method": "MANUAL_NO_RELIABLE_SOURCE",\s*"expected_unit": "%",\s*"min_value": 0,\s*"max_value": 100/, `"approved_domain": "pib.gov.in",
            "extraction_method": "AUTO_PIB_REGEX",
            "expected_unit": "%",
            "min_value": 0,
            "max_value": 100`);

content = content.replace(/"approved_domain": "unknown",\s*"extraction_method": "LIVE_COMPANY",\s*"expected_unit": "unknown",\s*"min_value": 0,\s*"max_value": 1000000000000/, `"approved_domain": "bain.com",
            "extraction_method": "AUTO_BAIN_REGEX",
            "expected_unit": "Billion USD",
            "min_value": 0,
            "max_value": 10000`);
            
fs.writeFileSync('lib/core/registry.js', content, 'utf8');
