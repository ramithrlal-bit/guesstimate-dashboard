require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
(async () => {
    await supabase.from('observations').delete().in('metric_id', [
        'agri_total_foodgrain_production',
        'healthcare_govt_expenditure_share',
        'ecommerce_e_commerce_market_size_2025'
    ]);
    console.log('Deleted old observations');
})();
