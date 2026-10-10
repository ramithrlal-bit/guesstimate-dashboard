require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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

(async () => {
    const { error } = await supabase.from('metrics').delete().in('metric_id', toDelete);
    if (error) {
        console.error('Error deleting', error);
    } else {
        console.log('Cleaned supabase');
    }
})();
