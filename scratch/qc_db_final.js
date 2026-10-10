require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const qcMetrics = {
    "quickcommerce_quick_commerce_gmv_fy25_2025": { name: "Quick commerce GMV, FY25/2025", unit: "$", template: "~${{val}}B" },
    "quickcommerce_projected_gmv_2027_28": { name: "Projected GMV, 2027–28", unit: "$", template: "~${{val}}B" },
    "quickcommerce_yoy_gmv_growth_2025": { name: "YoY GMV growth, 2025", unit: "%", template: "~{{val}}%" },
    "quickcommerce_monthly_transacting_users": { name: "Monthly transacting users", unit: "M", template: "{{val}}M" },
    "quickcommerce_typical_delivery_promise": { name: "Typical delivery promise", unit: "min", template: "{{val}} min" },
    "quickcommerce_share_of_online_grocery_gmv_overtook_e_grocery": { name: "Share of online grocery GMV", unit: "%", template: "~{{val}}%" },
    "quickcommerce_average_order_value": { name: "Average order value", unit: "Rs", template: "Rs {{val}}" },
    "quickcommerce_orders_per_user_per_month": { name: "Orders per user per month", unit: "orders", template: "{{val}}" },
    "quickcommerce_typical_dark_store_size": { name: "Typical dark store size", unit: "sq ft", template: "~{{val}} sq ft" },
    "quickcommerce_skus_per_dark_store": { name: "SKUs per dark store", unit: "SKUs", template: "{{val}}" },
    "quickcommerce_fastest_expanding_categories": { name: "Fastest-expanding categories", unit: "text", template: "{{val}}" },
    "quickcommerce_where_80_of_gmv_is_concentrated_today": { name: "Where ~80%+ of GMV is concentrated today", unit: "text", template: "{{val}}" },
    "quickcommerce_contribution_margin_leading_players_2025": { name: "Contribution margin, leading players (2025)", unit: "text", template: "{{val}}" },
    "quickcommerce_delivery_partners_top_platform_peak": { name: "Delivery partners, top platform (peak)", unit: "partners", template: "~{{val}}+" },
    "quickcommerce_cities_with_active_dark_store_networks": { name: "Cities with active dark-store networks", unit: "cities", template: "{{val}}" },
    "quickcommerce_blinkit_market_share": { name: "Blinkit GMV share", unit: "%", template: "~{{val}}%" },
    "quickcommerce_blinkit_dark_stores": { name: "Blinkit Dark stores", unit: "stores", template: "~{{val}}" },
    "quickcommerce_zepto_market_share": { name: "Zepto GMV share", unit: "%", template: "~{{val}}%" },
    "quickcommerce_zepto_dark_stores": { name: "Zepto Dark stores", unit: "stores", template: "~{{val}}" },
    "quickcommerce_instamart_market_share": { name: "Swiggy Instamart GMV share", unit: "%", template: "~{{val}}%" },
    "quickcommerce_instamart_dark_stores": { name: "Swiggy Instamart Dark stores", unit: "stores", template: "~{{val}}" },
    "quickcommerce_customer_retention_3_months": { name: "Customer retention (3 months)", unit: "%", template: "~{{val}}%" },
    "quickcommerce_delivery_cost_per_order": { name: "Delivery cost per order", unit: "Rs", template: "~Rs {{val}}" }
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
