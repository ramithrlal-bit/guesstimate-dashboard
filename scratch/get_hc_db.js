const registry = require('../lib/core/registry.js');
const keys = Object.keys(registry.metrics || {}).filter(k => k.startsWith('healthcare_'));
console.log('Registry HC keys count:', keys.length);

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    const { data: metricsData } = await supabase.from('metrics').select('metric_id').like('metric_id', 'healthcare_%');
    const dbKeys = metricsData.map(r => r.metric_id);
    console.log('Supabase HC keys count:', dbKeys.length);
    if (keys.length !== dbKeys.length) {
        console.log('Mismatch:', keys.filter(k => !dbKeys.includes(k)));
    }
})();
