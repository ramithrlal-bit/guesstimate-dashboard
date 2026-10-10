const fs = require('fs');

const registryPath = './lib/core/registry.js';
const content = fs.readFileSync(registryPath, 'utf8');

// Find all quickcommerce_ keys I just added (17 of them)
const toDelete = [
    "quickcommerce_market_size_gmv_2024", "quickcommerce_market_cagr_2025_2030",
    "quickcommerce_monthly_transacting_users", "quickcommerce_average_order_frequency_month",
    "quickcommerce_average_delivery_time", "quickcommerce_average_order_value",
    "quickcommerce_market_share_blinkit", "quickcommerce_market_share_instamart",
    "quickcommerce_market_share_zepto", "quickcommerce_total_dark_stores",
    "quickcommerce_category_share_fmcg", "quickcommerce_category_share_fresh",
    "quickcommerce_contribution_online_grocery", "quickcommerce_customer_retention",
    "quickcommerce_delivery_cost_per_order", "quickcommerce_contribution_margin",
    "quickcommerce_tier_2_3_penetration"
];

const registry = require('../lib/core/registry.js');

for (const k of toDelete) {
    delete registry[k];
    if (registry.metrics) {
        delete registry.metrics[k];
    }
}

const fileContent = '// lib/core/registry.js\n// Source Governance Registry\n// Only metrics explicitly defined here, matching the exact domain, can be ingested.\n\nmodule.exports = ' + JSON.stringify(registry, null, 4) + ';\n';
fs.writeFileSync(registryPath, fileContent);
console.log('Cleaned registry.js');
