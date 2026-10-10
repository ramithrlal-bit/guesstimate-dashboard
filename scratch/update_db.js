require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ylxxyhkylixdejxakbys.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

(async () => {
    // Update Agri
    await supabase.from('metrics').update({
        approved_domain: 'pib.gov.in',
        extraction_method: 'AUTO_PIB_REGEX'
    }).eq('metric_id', 'agri_total_foodgrain_production');

    // Update Healthcare
    await supabase.from('metrics').update({
        approved_domain: 'pib.gov.in',
        extraction_method: 'AUTO_PIB_REGEX'
    }).eq('metric_id', 'healthcare_govt_expenditure_share');

    // Update E-commerce
    await supabase.from('metrics').update({
        approved_domain: 'bain.com',
        extraction_method: 'AUTO_BAIN_REGEX'
    }).eq('metric_id', 'ecommerce_e_commerce_market_size_2025');

    console.log('Supabase metrics updated');
})();
