require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    // 1. Update the registry metric
    await supabase.from('metrics').update({ approved_domain: 'pib.gov.in' }).eq('metric_id', 'healthcare_govt_expenditure_share');
    // 2. Set the observation to verified
    await supabase.from('observations').update({ verification_status: 'verified' }).eq('metric_id', 'b6d8adc0-8959-4d94-803a-06d9850c46dd');
    console.log('Fixed healthcare observation and metric');
})();
