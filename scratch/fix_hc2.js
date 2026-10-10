require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
(async () => {
    await supabase.from('observations').delete().eq('metric_id', 'healthcare_govt_expenditure_share');
    await supabase.from('metrics').update({ approved_domain: 'pib.gov.in', extraction_method: 'AUTO_PIB_REGEX' }).eq('metric_id', 'healthcare_govt_expenditure_share');
    console.log('Fixed HC');
})();
