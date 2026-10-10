require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    const { data: mData } = await supabase.from('metrics').select('metric_id').like('metric_id', 'agri_%');
    const dbKeys = mData.map(r => r.metric_id);
    const { data: obsData, error } = await supabase.from('observations').select('id, metric_id').in('metric_id', dbKeys);
    if (error) console.error(error);
    console.log('Observations for Agri keys:', obsData ? obsData.length : 0);
})();
