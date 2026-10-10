require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
(async () => {
    const { data } = await supabase.from('metrics').select('*').eq('metric_id', 'agri_total_foodgrain_production');
    console.log(data);
})();
