const registry = require('../lib/core/registry.js');
const evKeys = Object.keys(registry.metrics || {}).filter(k => k.startsWith('ev_'));
console.log('Registry EV keys:', evKeys.join(', '));

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    const { data: metricsData } = await supabase.from('metrics').select('metric_id').like('metric_id', 'ev_%');
    const dbKeys = metricsData.map(r => r.metric_id);
    console.log('Supabase EV keys:', dbKeys.join(', '));
})();
