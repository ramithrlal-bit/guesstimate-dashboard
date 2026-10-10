require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const newMetrics = [
    { metric_id: "ecommerce_average_order_value", name: "Average order value (AOV)", category: "E-Commerce", unit: "Rs", format_template: "Rs {{val}}" },
    { metric_id: "ecommerce_annual_online_retail_gmv", name: "Annual online retail GMV", category: "E-Commerce", unit: "$", format_template: "~${{val}}B" },
    { metric_id: "ecommerce_tier_2_3_contribution", name: "Tier 2+ contribution to shoppers", category: "E-Commerce", unit: "%", format_template: "~{{val}}%" },
    { metric_id: "ecommerce_electronics_share", name: "Electronics category share", category: "E-Commerce", unit: "%", format_template: "~{{val}}%" },
    { metric_id: "ecommerce_fashion_lifestyle_share", name: "Fashion & lifestyle share", category: "E-Commerce", unit: "%", format_template: "~{{val}}%" },
    { metric_id: "ecommerce_grocery_share", name: "Online grocery share", category: "E-Commerce", unit: "%", format_template: "~{{val}}%" },
    { metric_id: "ecommerce_bpc_share", name: "Beauty & personal care (BPC)", category: "E-Commerce", unit: "%", format_template: "~{{val}}%" },
    { metric_id: "ecommerce_exports_2025", name: "E-commerce exports", category: "E-Commerce", unit: "$", format_template: "~${{val}}B" },
    { metric_id: "ecommerce_cash_on_delivery_share", name: "Cash on Delivery (COD) share", category: "E-Commerce", unit: "%", format_template: "~{{val}}%" }
];

(async () => {
    for (const m of newMetrics) {
        const { error } = await supabase.from('metrics').upsert(m, { onConflict: 'metric_id' });
        if (error) {
            console.error('Error inserting', m.metric_id, error);
        } else {
            console.log('Inserted', m.metric_id);
        }
    }
})();
