const fs = require('fs');
const registry = require('../lib/core/registry.js');

const newMetrics = {
    "ecommerce_average_order_value": {
        "approved_domain": "unknown",
        "extraction_method": "MANUAL_NO_RELIABLE_SOURCE",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_annual_online_retail_gmv": {
        "approved_domain": "unknown",
        "extraction_method": "MANUAL_NO_RELIABLE_SOURCE",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_tier_2_3_contribution": {
        "approved_domain": "unknown",
        "extraction_method": "MANUAL_NO_RELIABLE_SOURCE",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_electronics_share": {
        "approved_domain": "unknown",
        "extraction_method": "MANUAL_NO_RELIABLE_SOURCE",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_fashion_lifestyle_share": {
        "approved_domain": "unknown",
        "extraction_method": "MANUAL_NO_RELIABLE_SOURCE",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_grocery_share": {
        "approved_domain": "unknown",
        "extraction_method": "MANUAL_NO_RELIABLE_SOURCE",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_bpc_share": {
        "approved_domain": "unknown",
        "extraction_method": "MANUAL_NO_RELIABLE_SOURCE",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_exports_2025": {
        "approved_domain": "unknown",
        "extraction_method": "MANUAL_NO_RELIABLE_SOURCE",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    },
    "ecommerce_cash_on_delivery_share": {
        "approved_domain": "unknown",
        "extraction_method": "MANUAL_NO_RELIABLE_SOURCE",
        "expected_unit": "unknown",
        "min_value": 0,
        "max_value": 1000000000000
    }
};

for (const [k, v] of Object.entries(newMetrics)) {
    registry[k] = v;
    if (registry.metrics) {
        registry.metrics[k] = v;
    }
}

const fileContent = '// lib/core/registry.js\n// Source Governance Registry\n// Only metrics explicitly defined here, matching the exact domain, can be ingested.\n\nmodule.exports = ' + JSON.stringify(registry, null, 4) + ';\n';
fs.writeFileSync('lib/core/registry.js', fileContent);
console.log('Successfully saved to registry.js');
