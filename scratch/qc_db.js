require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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

(async () => {
    for (const [k, v] of Object.entries(qcMetrics)) {
        const payload = {
            metric_id: k,
            name: v.name,
            category: "Quick Commerce",
            unit: v.unit,
            format_template: v.template
        };
        const { error } = await supabase.from('metrics').upsert(payload, { onConflict: 'metric_id' });
        if (error) {
            console.error('Error inserting', k, error);
        } else {
            console.log('Inserted', k);
        }
    }
})();
