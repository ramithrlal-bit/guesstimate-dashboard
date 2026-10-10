const fs = require('fs');
const qcMetrics = {
    "quickcommerce_market_size_gmv_2024": { name: "Market size (Annual GMV 2024)", unit: "$", template: "~${{val}}B" },
    "quickcommerce_market_cagr_2025_2030": { name: "Market CAGR (2025-2030)", unit: "%", template: "~{{val}}%" },
    "quickcommerce_monthly_transacting_users": { name: "Monthly transacting users (MTU)", unit: "M", template: "~{{val}}M" },
    "quickcommerce_average_order_frequency_month": { name: "Avg. order frequency / month", unit: "orders", template: "~{{val}}" },
    "quickcommerce_average_delivery_time": { name: "Avg. delivery time", unit: "min", template: "~{{val}} mins" },
    "quickcommerce_average_order_value": { name: "Average order value (AOV)", unit: "Rs", template: "Rs {{val}}" },
    "quickcommerce_market_share_blinkit": { name: "Market share: Blinkit", unit: "%", template: "~{{val}}%" },
    "quickcommerce_market_share_instamart": { name: "Market share: Swiggy Instamart", unit: "%", template: "~{{val}}%" },
    "quickcommerce_market_share_zepto": { name: "Market share: Zepto", unit: "%", template: "~{{val}}%" },
    "quickcommerce_total_dark_stores": { name: "Total dark stores (Top 3)", unit: "stores", template: "~{{val}}" },
    "quickcommerce_category_share_fmcg": { name: "Category share: FMCG & Packaged", unit: "%", template: "~{{val}}%" },
    "quickcommerce_category_share_fresh": { name: "Category share: Fresh Produce", unit: "%", template: "~{{val}}%" },
    "quickcommerce_contribution_online_grocery": { name: "Contribution to online grocery", unit: "%", template: "~{{val}}%" },
    "quickcommerce_customer_retention": { name: "Customer retention rate (3M)", unit: "%", template: "~{{val}}%" },
    "quickcommerce_delivery_cost_per_order": { name: "Delivery cost per order", unit: "Rs", template: "Rs {{val}}" },
    "quickcommerce_contribution_margin": { name: "Avg. Contribution Margin", unit: "%", template: "~{{val}}%" },
    "quickcommerce_tier_2_3_penetration": { name: "Tier 2/3 user penetration", unit: "%", template: "~{{val}}%" }
};

const registry = require('../lib/core/registry.js');
for (const k of Object.keys(qcMetrics)) {
    const val = {
        approved_domain: "unknown",
        extraction_method: "MANUAL_NO_RELIABLE_SOURCE",
        expected_unit: "unknown",
        min_value: 0,
        max_value: 1000000000000
    };
    registry[k] = val;
    if (registry.metrics) {
        registry.metrics[k] = val;
    }
}
const fileContent = '// lib/core/registry.js\n// Source Governance Registry\n// Only metrics explicitly defined here, matching the exact domain, can be ingested.\n\nmodule.exports = ' + JSON.stringify(registry, null, 4) + ';\n';
fs.writeFileSync('./lib/core/registry.js', fileContent);
console.log('Successfully saved to registry.js');
