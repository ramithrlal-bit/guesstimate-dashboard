require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    // Quarantine ecommerce observation by marking it unverified
    await supabase.from('observations').update({ verification_status: 'unverified' }).eq('metric_id', 'bb23ab75-e499-47e0-8e7b-065c0e7e1c17');
    console.log('Quarantined e-commerce observation');
})();
