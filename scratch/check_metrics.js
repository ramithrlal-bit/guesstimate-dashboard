require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
(async () => {
    const { data, error } = await supabase.from('metrics').select('metric_id').like('metric_id', 'ecommerce_%');
    if (error) console.error(error);
    else console.log('Existing E-commerce metrics:', data.map(d => d.metric_id).join(', '));
})();
