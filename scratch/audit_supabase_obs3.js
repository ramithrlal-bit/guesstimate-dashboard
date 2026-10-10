require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    const { data: metrics } = await supabase.from('metrics').select('id, metric_id, unit, name').in('metric_id', ['agri_total_foodgrain_production', 'healthcare_govt_expenditure_share', 'ecommerce_e_commerce_market_size_2025']);
    const metricMap = {};
    metrics.forEach(m => metricMap[m.id] = m);

    const { data: obs } = await supabase
        .from('observations')
        .select('*')
        .in('metric_id', metrics.map(m => m.id));
    
    obs.forEach(o => o.metric_key = metricMap[o.metric_id].metric_id);
    console.log(JSON.stringify(obs, null, 2));
})();
