const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    // 1. Get Metric IDs
    const { data: metricsData } = await supabase.from('metrics').select('id, metric_id').eq('category', 'Quick Commerce');
    const ids = metricsData.map(r => r.id);
    
    // 2. Check observations
    const { data: obsData } = await supabase.from('observations').select('*').in('metric_id', ids);
    console.log('Total observations in DB for QC:', obsData.length);
    
    // 3. Check latest_observations view
    const { data: latestData } = await supabase.from('latest_observations').select('*').in('id', ids);
    console.log('Total verified latest_observations in DB for QC:', latestData ? latestData.length : 'error/0');
})();
