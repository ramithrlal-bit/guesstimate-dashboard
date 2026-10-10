require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    const { data: obs, error } = await supabase
        .from('observations')
        .select('*')
        .in('metric_id', ['agri_total_foodgrain_production', 'healthcare_govt_expenditure_share', 'ecommerce_e_commerce_market_size_2025'])
        .order('created_at', { ascending: false });
    
    if (error) console.error(error);
    else console.log(JSON.stringify(obs, null, 2));
})();
