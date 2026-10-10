require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    const { data: obsData, error } = await supabase.from('observations').select('id, metric_id').like('metric_id', 'agri_%');
    if (error) console.error(error);
    console.log('Observations found:', obsData ? obsData.length : 0);
})();
