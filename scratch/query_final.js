require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY);

async function report() {
    const { data: obs, error } = await supabase.from('latest_observations').select('*');
    if (error) { console.error(error); return; }
    
    const dbMap = {};
    for (const o of obs) { dbMap[o.metric_key] = o; }
    
    const fintechMetrics = [
        'upi_vol_annual',
        'upi_val_annual',
        'upi_vol_monthly',
        'fintech_upi_unique_users',
        'fintech_daily_avg_upi_transactions',
        'fintech_yoy_growth_transaction_volume',
        'fintech_total_bank_deposits_2025',
        'fintech_total_bank_credit_2025',
        'fintech_gross_npa_mar_2025_20_yr_low',
        'fintech_psb_profit_fy25',
        'fintech_bank_branches',
        'fintech_atms',
        'fintech_bank_account_holders_jan_dhan',
        'fintech_crar_capital_buffer',
        'fintech_credit_cards',
        'fintech_debit_cards',
        'fintech_mobile_wallet_accounts',
        'fintech_bnpl_users',
        'fintech_monthly_sip_inflow',
        'fintech_fintech_unicorns',
        'fintech_digital_payments_value_2025',
        'bonus_rbi_repo_rate_2026',
        'amfi_total_aum_cr',
        'pop_india_total',
        'trai_telephone_subscribers_total',
        'ev_sales_total',
        'aai_domestic_passengers'
    ];
    
    console.log('| Metric | DB Display Value | DB Period | Automation Status | Source |');
    console.log('|---|---|---|---|---|');
    
    for (const k of fintechMetrics) {
        const o = dbMap[k];
        if (o) {
            console.log('| ' + k + ' | ' + o.display_value + ' | ' + o.period_label + ' | ' + (o.data_type === 'official' ? 'Automated' : 'Manual') + ' | ' + (o.source_url || 'N/A') + ' |');
        } else {
            console.log('| ' + k + ' | NOT FOUND | NOT FOUND | - | - |');
        }
    }
}
report();
